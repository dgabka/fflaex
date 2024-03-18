import asyncio
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db import SessionLocal
from services import file as file_service


router = APIRouter(prefix="/api/file")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("")
async def get_all_files(db: Session = Depends(get_db)):
    files = file_service.get_all(db)
    if files is None:
        raise HTTPException(status_code=404, detail="No files found")
    return files


@router.get("/{id}")
async def get_file_by_id(id: int, db: Session = Depends(get_db)):
    file = file_service.get_by_id(db, id)
    if file is None:
        raise HTTPException(status_code=404, detail="No files found")
    await asyncio.sleep(2)
    return file
