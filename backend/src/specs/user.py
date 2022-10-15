from typing import List, Optional
from pydantic import BaseModel

from .base import BaseResponse
from src.models import User


class GetUserResponse(BaseResponse):
    data: Optional[User]


class GetUserAllResponse(BaseResponse):
    data: List[User]


class CreateUserRequest(BaseModel):
    email: str
    name: str
    profile_url: str


class CreateUserResponse(BaseResponse):
    data: User


class LoginRequest(BaseModel):
    email: str


class LoginResponse(BaseResponse):
    data: Optional[User]
