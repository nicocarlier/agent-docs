from fastapi import FastAPI
from app.api.routes import router as api_router
from fastapi.middleware.cors import CORSMiddleware
from app.db import init_db, reset_db
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "https://agent-docs.com",
        "https://agent-docs.vercel.app",
        "https://agent-docs.vercel.app/api"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    if os.getenv("ENV") == "dev":
        await reset_db()
    else:
        await init_db()

app.include_router(api_router, prefix="/api")