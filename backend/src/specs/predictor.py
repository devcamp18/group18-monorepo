from pydantic import BaseModel

from .base import BaseResponse


class BodySizeResponse(BaseModel):
    width: float
    length: float


class GetBodySizePredictorResponse(BaseResponse):
    data: BodySizeResponse


class GetBodySizePredictorRequest(BaseModel):
    height: float
    image_string: str
