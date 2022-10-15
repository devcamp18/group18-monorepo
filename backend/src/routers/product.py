from fastapi import APIRouter, Request


from src.specs.product import (
    GetProductResponse,
    GetProductAllResponse,
)
from src.services import ProductService
from src.di import injector

_product_service = injector.get(ProductService)
router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get("", response_model=GetProductAllResponse)
def get_users(request: Request):
    users = _product_service.get_product_all()
    return GetProductAllResponse(
        status="success",
        message="Successfully retrieved products",
        data=users
    )


@router.get("/{id}", response_model=GetProductResponse)
def get_user_by_id(id: str, request: Request):
    user = _product_service.get_product_by_id(id)
    return GetProductResponse(
        status="success",
        message="Successfully retrieved product",
        data=user
    )
