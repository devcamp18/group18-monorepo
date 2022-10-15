from pymongo import MongoClient

from src.constants import (
    MONGODB_URI,
    DB_NAME,
)


class SessionManager:
    def __init__(self) -> None:
        self.client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
        self.database = self.client[DB_NAME]

    def get_client(self):
        return self.client

    def get_database(self):
        return self.database
