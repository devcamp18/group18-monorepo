from typing import List
from injector import inject

from src.specs.user import LoginRequest
from src.models import User
from src.repositories import UserRepository


class UserService:
    @inject
    def __init__(self, user_repo: UserRepository) -> None:
        self.user_repo = user_repo

    def get_user_by_id(self, user_id: str) -> User:
        user = self.user_repo.get_user_by_id(user_id)
        
        return user

    def get_user_all(self) -> List[User]:
        users = self.user_repo.get_user_all()

        return users

    def login(self, spec: LoginRequest) -> User:
        users = self.user_repo.get_user_by_email(spec.email)

        return users