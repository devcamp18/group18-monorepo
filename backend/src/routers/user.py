from fastapi import APIRouter, Request


from src.specs.user import (
    GetUserResponse,
    GetUserAllResponse,
    LoginRequest,
    CreateUserResponse,
    CreateUserRequest,
    UpdateClothSizeRequest,
)
from src.services import UserService
from src.di import injector

_user_service = injector.get(UserService)
router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get("", response_model=GetUserAllResponse)
def get_users(request: Request):
    users = _user_service.get_user_all()
    return GetUserAllResponse(
        status="success",
        message="Successfully retrieved users",
        data=users
    )


@router.post("", response_model=CreateUserResponse)
def create_user(spec: CreateUserRequest):
    user = _user_service.create(spec)
    return CreateUserResponse(
        status="success",
        message="Success Create User",
        data=user
    )


@router.get("/{id}", response_model=GetUserResponse)
def get_user_by_id(id: str, request: Request):
    user = _user_service.get_user_by_id(id)
    return GetUserResponse(
        status="success",
        message="Successfully retrieved user",
        data=user
    )


@router.post("/{id}/clothes_size", response_model=GetUserResponse)
def post_user_clothes_size(id: str, spec: UpdateClothSizeRequest):
    user = _user_service.post_user_clothes_size(id, spec)
    return GetUserResponse(
        status="success",
        message="Success Update Clothes Size",
        data=user,
    )


@router.post("/login", response_model=GetUserResponse)
def login(spec: LoginRequest):
    user = _user_service.login(spec)
    return GetUserResponse(
        status="success",
        message="Success Login",
        data=user
    )
