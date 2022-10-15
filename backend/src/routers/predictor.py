from fastapi import APIRouter, File, Form, UploadFile

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


@router.post("/files")
def predict_body_size(
    file: bytes = File(), fileb: UploadFile = File(), token: str = Form()
):
    return {
        "file_size": len(file),
        "token": token,
        "fileb_content_type": fileb.content_type,
    }


@router.post("", response_model=GetBodySizePredictorResponse)
def predict_body_size(spec: GetBodySizePredictorRequest):
    result = _predictor_service.predict_body(spec)

    return GetBodySizePredictorResponse(
        status="success",
        message="Success Predict Body Size",
        data=result,
    )
