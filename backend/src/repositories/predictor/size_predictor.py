from typing import Optional, Tuple
import matplotlib.pyplot as plt
import torch
import cv2
from torchvision import transforms
import numpy as np

from .utils import letterbox,non_max_suppression_kpt, output_to_keypoint, non_max_suppression
from src.constants import MODEL_DETECTION_PATH, MODEL_KEYPOINT_PATH


class BodySizePredictor:
    def __init__(self):
        device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

        # Initialize Keypoint Model
        print(MODEL_KEYPOINT_PATH)
        weigths_keypoint = torch.load(MODEL_KEYPOINT_PATH, map_location=device)
        self.model_keypoint = weigths_keypoint['model']
        _ = self.model_keypoint.float().eval()

        if torch.cuda.is_available():
            self.model_keypoint.half().to(device)


        # Initialize Detection Model
        weigths_detection = torch.load(MODEL_DETECTION_PATH, map_location=device)
        self.model_detection = weigths_detection['model']
        _ = self.model_detection.float().eval()

        if torch.cuda.is_available():
            self.model_detection.half().to(device)

    def get_top_position(self, image: torch.Tensor):
        with torch.no_grad():
            output, _ = self.model_detection(image)
            pred = non_max_suppression(output)
            for obj in pred[0]:
                if obj[5]==0:
                    return int(obj[0]), int(obj[1])

    def get_keypoints(self, image: torch.Tensor):
        with torch.no_grad():
            output, _ = self.model_keypoint(image)
            output = non_max_suppression_kpt(output, 0.25, 0.65, nc=self.model_keypoint.yaml['nc'], nkpt=self.model_keypoint.yaml['nkpt'], kpt_label=True)
            output = output_to_keypoint(output)
            kpts = output[0, 7:].T
            steps=3
            num_kpts = len(kpts) // steps

            left_shoulder = (0,0)
            right_shoulder = (0,0)
            left_ankle = (0,0)
            right_ankle = (0,0)
            left_hip = (0,0)
            right_hip = (0,0)

            for kid in range(num_kpts):
                if kid in [0,1,2,3,4,13,14,7,8,9,10]:
                    continue
                x_coord, y_coord = kpts[steps * kid], kpts[steps * kid + 1]
                if kid == 5:
                    right_shoulder = (x_coord, y_coord)
                
                if kid==6:
                    left_shoulder = (x_coord, y_coord)
                
                if kid== 11:
                    left_hip = (x_coord, y_coord)
                
                if kid== 12:
                    right_hip = (x_coord, y_coord)

                if kid==16:
                    left_ankle = (x_coord, y_coord)
                
                if kid==16:
                    right_ankle = (x_coord, y_coord)
                
            return right_shoulder,left_shoulder, right_hip, left_hip, right_ankle, left_ankle

    def get_image_from_path(self, img_path) -> torch.Tensor:
        image = cv2.imread(img_path)
        image = letterbox(image, 960, stride=64, auto=True)[0]
        image = transforms.ToTensor()(image)
        image = torch.tensor(np.array([image.numpy()]))

        return image

    def get_image_from_bytes(self, img_bytes: bytes) -> torch.Tensor:
        nparr = np.fromstring(img_bytes, np.uint8)
        img_np = cv2.imdecode(nparr, cv2.CV_LOAD_IMAGE_COLOR)
        image = letterbox(image, 960, stride=64, auto=True)[0]

        return img_np

    def calculate(self, person_height: int = 165, image_bytes: Optional[bytes] = None, image_path: Optional[str] = None) -> Tuple[int, int]:
        image: torch.Tensor
        if image_bytes is not None:
            image = self.get_image_from_bytes(image_bytes)

        if image_bytes is not None:
            image = self.get_image_from_bytes(image_bytes)
    
        top_position =  self.get_top_position(image)
        right_shoulder,left_shoulder, right_hip, left_hip, right_ankle, left_ankle = self.get_keypoints(image)
        px_per_cm = abs(top_position[1] - right_ankle[1]) / person_height

        width_body = abs(left_shoulder[0] - right_shoulder[0])*1.5/px_per_cm
        height_body = -0.0018*pow(width_body,3) + 0.2681*pow(width_body,2) - 12.092*width_body + 231.79
        
        return width_body, height_body
