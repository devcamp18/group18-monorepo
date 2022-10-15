import uuid
from typing import Optional
from pydantic import BaseModel, Field


class User(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    email: str = Field(...)
    profile_url: str = Field(...)
    width: Optional[float] = Field(...)
    length: Optional[float] = Field(...)

    class Config:
        allow_population_by_field_name = True
