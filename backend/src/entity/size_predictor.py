import matplotlib.pyplot as plt
import torch
import cv2
from torchvision import transforms
import numpy as np

from utils import letterbox
from utils import non_max_suppression_kpt
# from utils.general import non_max_suppression_kpt
# from utils.plots import output_to_keypoint

class BodySizePredictor():
    def __init__(self, model_detection_path, model_keypoint_path):
        device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        

        # Initialize Keypoint Model
        weigths_keypoint = torch.load(model_keypoint_path, map_location=device)
        self.model_keypoint = weigths_keypoint['model']
        _ = self.model_keypoint.float().eval()

        if torch.cuda.is_available():
            self.model_keypoint.half().to(device)


        # Initialize Detection Model
        weigths_detection = torch.load(model_detection_path, map_location=device)
        self.model_detection = weigths_detection['model']
        _ = self.model_detection.float().eval()

        if torch.cuda.is_available():
            self.model_detection.half().to(device)

    def get_top_position(self, img_path):
        image = cv2.imread(img_path)
        image = letterbox(image, 960, stride=64, auto=True)[0]
        image_ = image.copy()
        image = transforms.ToTensor()(image)
        image = torch.tensor(np.array([image.numpy()]))
        with torch.no_grad():
            output, _ = self.model_detection(image)
            pred = non_max_suppression(output)
            for obj in pred[0]:
                if obj[5]==0:
                    return int(obj[0]), int(obj[1])

    def get_keypoints(self, img_path):
        image = cv2.imread(img_path)
        image = letterbox(image, 960, stride=64, auto=True)[0]
        image_ = image.copy()
        image = transforms.ToTensor()(image)
        image = torch.tensor(np.array([image.numpy()]))
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
            
    def calculate(self, img_path, person_height):
        top_position =  self.get_top_position(img_path)
        right_shoulder,left_shoulder, right_hip, left_hip, right_ankle, left_ankle = self.get_keypoints(img_path)
        px_per_cm = abs(top_position[1] - right_ankle[1])/165

        width_body = abs(left_shoulder[0] - right_shoulder[0])*1.5/px_per_cm
        height_body = -0.0018*pow(width_body,3) + 0.2681*pow(width_body,2) - 12.092*width_body + 231.79
        
        return width_body, height_body