from fastapi import APIRouter, Request


from src.specs.user import (
    GetUserResponse,
    GetUserAllResponse,
    LoginRequest,
)
from src.services import UserService
from src.di import injector

_user_service = injector.get(UserService)
router = APIRouter()


@router.get("/users", response_model=GetUserAllResponse)
def get_users(request: Request):
    users = _user_service.get_user_all()
    return GetUserAllResponse(
        status="success",
        message="Successfully retrieved users",
        data=users
    )


@router.get("/users/{id}", response_model=GetUserResponse)
def get_user_by_id(id: str, request: Request):
    user = _user_service.get_user_by_id(id)
    return GetUserResponse(
        status="success",
        message="Successfully retrieved user",
        data=user
    )

@router.post("/login", response_model=GetUserResponse)
def login(spec: LoginRequest):
    user = _user_service.login(spec)
    return GetUserResponse(
        status="success",
        message="Success Login",
        data=user
    )
