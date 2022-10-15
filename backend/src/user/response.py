from typing import List

from src.response import BaseResponse
from .model import User


class GetUserResponse(BaseResponse):
    data: User


class GetUserAllResponse(BaseResponse):
    data: List[User]
