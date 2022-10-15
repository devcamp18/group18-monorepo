from typing import List, Optional
from injector import inject
from fastapi.encoders import jsonable_encoder

from src.driver.session import SessionManager
from src.models import User
from src.specs.user import UpdateClothSizeRequest
from src.exceptions import BaseException


class UserRepository:
    @inject
    def __init__(self, session_manager: SessionManager) -> None:
        self.session_manager = session_manager

    def get_user_by_id(self, user_id: str) -> Optional[User]:
        database = self.session_manager.get_database()
        user = database["user"].find_one({"_id": user_id})
        return user

    def get_user_by_email(self, email: str) -> Optional[User]:
        database = self.session_manager.get_database()
        user = database["user"].find_one({"email": email})
        return user

    def get_user_all(self) -> List[User]:
        database = self.session_manager.get_database()
        users = database["user"].find(limit=100)

        return list(users)

    def create(self, user: User) -> User:
        database = self.session_manager.get_database()
        user = jsonable_encoder(user)

        user = database["user"].insert_one(user)
        result_user = database["user"].find_one({"_id": user.inserted_id})

        return result_user

    def update_clothes_size(self, user_id: str, spec: UpdateClothSizeRequest) -> Optional[User]:
        database = self.session_manager.get_database()
        updated_result = database["user"].update_one(
            {"_id":user_id},
            {'$set': {'width': spec.width, 'length': spec.length}},
            upsert=True
        )

        if updated_result.modified_count == 0:
            raise BaseException(message="User not found", code=404)

        user = database["user"].find_one({"_id": user_id})

        return user
