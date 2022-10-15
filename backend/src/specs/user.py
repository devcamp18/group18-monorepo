from typing import List, Optional
from pydantic import BaseModel

from src.response import BaseResponse
from src.models import User


class GetUserResponse(BaseResponse):
    data: Optional[User]


class GetUserAllResponse(BaseResponse):
    data: List[User]


class LoginRequest(BaseModel):
    email: str


class LoginResponse(BaseResponse):
    data: Optional[User]
