from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import SessionLocal

from schemas.path import PathSchema, PathCreateSchema
from services import path as path_service

router = APIRouter(prefix="/api/path")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[PathSchema])
async def get_all_paths(db: Session = Depends(get_db)):
    db_paths = path_service.get_all(db)
    if db_paths is None:
        raise HTTPException(status_code=404, detail="No paths found")


@router.get("/{id}", response_model=PathSchema)
async def get_path_by_id(id: int, db: Session = Depends(get_db)):
    db_path = path_service.get_by_id(db, id)
    if db_path is None:
        raise HTTPException(status_code=404, detail="Path not found")
    return db_path


@router.post("/", response_model=PathSchema)
async def add_new_path(path: PathCreateSchema, db: Session = Depends(get_db)):
    db_path = path_service.create(db, path)
    if db_path is None:
        raise HTTPException(status_code=400, detail="Cannot create path")
    return db_path


# @router.get("/")
# async def scan_all_paths:
