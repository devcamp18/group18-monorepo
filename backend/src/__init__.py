from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.drivers.session import SessionManager
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

    print(client.server_info())
    print("Connected to the MongoDB database!")


@app.on_event("shutdown")
def shutdown():
    client = injector.get(SessionManager).get_client()
    client.close()


@app.get("/ping")
async def ping():
    return {"message": "pong"}
