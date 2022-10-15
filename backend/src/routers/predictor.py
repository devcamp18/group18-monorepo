from fastapi import APIRouter, File, Form

from src.specs.predictor import (
    GetBodySizePredictorRequest,
    GetBodySizePredictorResponse,
)
from src.services import PredictorService
from src.di import injector

_predictor_service = injector.get(PredictorService)
router = APIRouter(
    prefix="/predictor",
    tags=["Predictor"]
)


@router.post("", response_model=GetBodySizePredictorResponse)
def predict_body_size(spec: GetBodySizePredictorRequest):
    result = _predictor_service.predict_body(spec)

    return GetBodySizePredictorResponse(
        status="success",
        message="Success Predict Body Size",
        data=result,
    )


@router.post("/file", response_model=GetBodySizePredictorResponse)
def predict_body_size(file: bytes = File(), height: float = Form(...)):
    result = _predictor_service.predict_body_file(height, file)

    return GetBodySizePredictorResponse(
        status="success",
        message="Success Predict Body Size",
        data=result,
    )
