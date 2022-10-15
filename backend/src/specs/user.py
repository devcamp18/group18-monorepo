from typing import List
from pydantic import BaseModel

from src.response import BaseResponse
from src.models import User


class GetUserResponse(BaseResponse):
    data: User


class GetUserAllResponse(BaseResponse):
    data: List[User]


class LoginRequest(BaseModel):
    email: str


class LoginResponse(BaseResponse):
    data: User
