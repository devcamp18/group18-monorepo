import uuid
from pydantic import BaseModel, Field


class Product(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    description: str = Field(...)
    price: float = Field(...)
    img_url: str = Field(...)
    rating: float = Field(...)

    class Config:
        allow_population_by_field_name = True
