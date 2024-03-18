from sqlalchemy import select
from sqlalchemy.orm import Session

from models.file import FileModel


def get_all(session: Session):
    return session.scalars(select(FileModel)).all()


def get_by_id(session: Session, id: int) -> FileModel:
    return session.get_one(FileModel, id)
