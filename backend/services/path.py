from sqlalchemy.orm import Session

from models.path import PathModel
from schemas.path import PathSchema, PathCreateSchema


def get_all(db: Session) -> list[PathModel]:
    return db.query(PathModel).all()


def get_by_id(db: Session, id: int) -> PathModel:
    return db.query(PathModel).filter(PathModel.id == id).first()


def create(db: Session, path: PathCreateSchema) -> PathModel:
    db_path = PathModel(**path.model_dump())
    db.add(db_path)
    db.commit()
    db.refresh(db_path)
    return db_path
