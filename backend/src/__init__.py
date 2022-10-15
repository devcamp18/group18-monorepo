from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import sentry_sdk
from sentry_sdk.integrations.starlette import StarletteIntegration
from sentry_sdk.integrations.fastapi import FastApiIntegration

from src.driver.session import SessionManager
from src.routers import (
    user_router,
    product_router,
    predictor_router,
)
from .di import injector
from .exceptions import BaseException
from .constants import (
    SENTRY_DSN,
    APP_ENV,
)

app = FastAPI()

sentry_sdk.init(
    dsn=SENTRY_DSN,
    integrations=[
        StarletteIntegration(),
        FastApiIntegration(),
    ],
    environment=APP_ENV,
    send_default_pii=True,
    attach_stacktrace=True,
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production,
    traces_sample_rate=0.5,
)

app.include_router(user_router)
app.include_router(product_router)
app.include_router(predictor_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.on_event("startup")
def startup():
    client = injector.get(SessionManager).get_client()
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
def unicorn_exception_handler(request: Request, exc: BaseException):
    code = getattr(exc, "code", 500)
    message = getattr(exc, "message", str(exc))
    print(code, message)
    return JSONResponse(
        status_code=code,
        content=message,
    )


@app.get("/ping")
async def ping():
    return {"message": "pong"}
