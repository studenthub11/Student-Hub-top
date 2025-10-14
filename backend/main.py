from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from student_hub_backend.routers import auth, users
from student_hub_backend.database import get_db, engine
from student_hub_backend.models import Base
from student_hub_backend.config import settings

# Create all tables (for initial setup, Alembic will handle migrations later)
# Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
)

# CORS Middleware
origins = [
    "http://localhost",
    "http://localhost:3000", # React frontend
    "http://localhost:8000", # FastAPI dev server
    # Add your Vercel frontend URL here when deployed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/users", tags=["Users"])

@app.get("/")
async def root():
    return {"message": "Welcome to The Student Hub Backend API!"}

# Sentry integration (optional, uncomment if Sentry DSN is provided)
# if settings.SENTRY_DSN:
#     import sentry_sdk
#     sentry_sdk.init(
#         dsn=settings.SENTRY_DSN,
#         traces_sample_rate=1.0,
#         profiles_sample_rate=1.0,
#     )

