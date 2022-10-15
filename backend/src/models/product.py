import uuid
from typing import List, Optional
from pydantic import BaseModel, Field


class ProductSize(BaseModel):
    name: str
    width: float
    length: float


class Product(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str
    description: str
    price: float
    img_url: str
    rating: float
    sizes: Optional[List[ProductSize]] = None

    class Config:
        allow_population_by_field_name = True
