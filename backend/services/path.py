from sqlalchemy import select
from sqlalchemy.orm import Session

from models.path import PathModel
from schemas.path import PathDto, PathCreationDto


def get_all(db: Session):
    return db.scalars(select(PathModel)).all()


def get_by_id(db: Session, id: int) -> PathModel:

    result = db.get_one(PathModel, id)

    return result


def create(db: Session, path: PathCreationDto) -> PathModel:
    db_path = PathModel(**path.model_dump())
    db.add(db_path)
    db.commit()
    db.refresh(db_path)
    return db_path
