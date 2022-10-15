import os


APP_ENV = os.getenv("APP_ENV", "local")
MONGODB_URI=os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME=os.getenv("DB_NAME", "devcamp")
SENTRY_DSN=os.getenv("SENTRY_DSN", "https://b23387e6505a4b93b664589aae5fb23a@o1187373.ingest.sentry.io/4503989375205376")

# predictor
MODEL_DETECTION_PATH = os.getenv("MODEL_DETECTION_PATH", "model/yolov7-tiny.pt")
MODEL_KEYPOINT_PATH = os.getenv("MODEL_KEYPOINT_PATH", "model/yolov7-w6-pose.pt")

