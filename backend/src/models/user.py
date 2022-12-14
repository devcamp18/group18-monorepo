import uuid
from typing import Optional
from pydantic import BaseModel, Field, root_validator


class User(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    email: str = Field(...)
    profile_url: str = Field(...)
    has_body_size: bool = False
    width: Optional[float] = 0
    length: Optional[float] = 0

    class Config:
        allow_population_by_field_name = True

    @root_validator
    def check_has_body_size(cls, values) -> dict:

        values["has_body_size"] = not (
            not values["width"] and not values["length"]
        )

        return values
