from sqlalchemy import Boolean, Column, Integer, String

from db import Base


class PathModel(Base):
    __tablename__ = "path_settings"

    id = Column(Integer, primary_key=True)
    path = Column(String, index=True)
    include_subdirs = Column(Boolean)
