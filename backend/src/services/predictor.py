from injector import inject

from src.specs.predictor import (
    BodySizeResponse,
    GetBodySizePredictorRequest,
)
from src.repositories import BodySizePredictor


class PredictorService:
    @inject
    def __init__(
        self,
        body_predictor: BodySizePredictor
    ) -> None:
        self.body_predictor = body_predictor

    def predict_body(self, spec: GetBodySizePredictorRequest) -> BodySizeResponse:
        width, length = self.body_predictor.calculate(
            person_height=spec.height,
            image_path="test_data/example_1.jpg",
        )

        return BodySizeResponse(
            width=width,
            length=length,
        )

    def predict_body_file(self, height: float, file: bytes) -> BodySizeResponse:
        width, length = self.body_predictor.calculate(
            person_height=height,
            image_bytes=file,
        )

        return BodySizeResponse(
            width=width,
            length=length,
        )
