from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db import SessionLocal
from schemas.command import EncodeOptionsDto
from services.command import scan_library, run_ffmpeg


router = APIRouter(prefix="/api/command")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/scan")
async def scan(db: Session = Depends(get_db)):
    await scan_library(db)
    return {"message": "started executing task"}


@router.post("/encode")
async def encode(options: EncodeOptionsDto, session: Session = Depends(get_db)):
    await run_ffmpeg(session, options.id)
    return {"message": "started executing task"}
