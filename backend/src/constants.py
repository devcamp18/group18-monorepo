import os


APP_ENV = os.getenv("APP_ENV", "local")
MONGODB_URI=os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME=os.getenv("DB_NAME", "devcamp")
