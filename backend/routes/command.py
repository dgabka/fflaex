from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db import SessionLocal
from schemas.command import CommandRunSchema, CommandType


router = APIRouter(prefix="/api/command")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
async def run_command(command: CommandRunSchema, db: Session = Depends(get_db)):
    match command.type:
        case CommandType.scan_library:
            pass
        case _:
            raise HTTPException(status_code=400, detail="Command cannot be processed")
