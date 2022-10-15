from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from src.response import BaseResponse
from src.user.response import GetUserResponse, GetUserAllResponse
from src.user.service import UserService
from src.driver.session import SessionManager
from .di import injector

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.on_event("startup")
def startup():
    session_manager = injector.get(SessionManager)
    client = session_manager.get_client()

    print("[Startup] Connecting to the MongoDB database ..")
    print(client.server_info())
    print("[Startup] Connected to the MongoDB database!")


@app.on_event("shutdown")
def shutdown():
    client = injector.get(SessionManager).get_client()
    print("[Shutdown] Disconnecting from the MongoDB database ..")
    client.close()
    print("[Shutdown] Disconnected from the MongoDB database!")


@app.exception_handler(Exception)
def unicorn_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content=str(exc),
    )


@app.get("/ping")
async def ping():
    return {"message": "pong"}


@app.get("/users", response_model=GetUserAllResponse)
def get_users(request: Request):
    user_service = injector.get(UserService)
    users = user_service.get_user_all()
    return GetUserAllResponse(
        status="success",
        message="Successfully retrieved users",
        data=users
    )


@app.get("/users/{id}", response_model=GetUserResponse)
def get_users(id: str, request: Request):
    user_service = injector.get(UserService)
    user = user_service.get_user_by_id(id)
    return GetUserResponse(
        status="success",
        message="Successfully retrieved user",
        data=user
    )
