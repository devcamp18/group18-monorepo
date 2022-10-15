from typing import List
from injector import inject

from src.driver.session import SessionManager
from .model import User


class UserRepository:
    @inject
    def __init__(self, session_manager: SessionManager) -> None:
        self.session_manager = session_manager

    def get_user_by_id(self, user_id: str) -> User:
        database = self.session_manager.get_database()
        user = database["user"].find_one({"_id": user_id})
        if user is not None:
            return user

        raise Exception("User not found")

    def get_user_all(self) -> List[User]:
        database = self.session_manager.get_database()
        users = database["user"].find(limit=100)

        return list(users)
