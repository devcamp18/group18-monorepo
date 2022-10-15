import sys

sys.path.insert(0, './yolov7')

MODEL_DETECTION_PATH = "model/yolov7-tiny.pt"
MODEL_KEYPOINT_PATH = "model/yolov7-w6-pose.pt"
EXAMPLE_IMG = "test_data/example_1.jpg"
PERSON_HEIGHT = 165 #in cm

from src.entity.size_predictor import BodySizePredictor

def main():
    body_size_predictor = BodySizePredictor(MODEL_DETECTION_PATH, MODEL_KEYPOINT_PATH)
    width, height = body_size_predictor.calculate(EXAMPLE_IMG, PERSON_HEIGHT)
    print(f"Width : {width}")
    print(f"Height : {height}")
    
if __name__ == '__main__':
    main()
