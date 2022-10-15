from typing import List

from .base import BaseResponse
from src.models import Product


class GetProductResponse(BaseResponse):
    data: Product


class GetProductAllResponse(BaseResponse):
    data: List[Product]
