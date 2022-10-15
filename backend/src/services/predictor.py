from injector import inject

from src.specs.predictor import (
    BodySizeResponse,
    GetBodySizePredictorRequest,
)
from src.repositories import BodySizePredictor


class PredictorService:
    @inject
    def __init__(self, body_predictor: BodySizePredictor) -> None:
        self.body_predictor = body_predictor

    def predict_body(self, spec: GetBodySizePredictorRequest) -> BodySizeResponse:
        # width, length = self.body_predictor.calculate(
        #     person_height=spec.height,
        #     image_bytes=spec.image_string,
        # )

        return BodySizeResponse(
            width=1,
            length=1,
        )
