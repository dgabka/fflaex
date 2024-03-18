from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from db import Base


class PathModel(Base):
    __tablename__ = "path_settings"

    id: Mapped[int] = mapped_column(primary_key=True)
    path: Mapped[str] = mapped_column(index=True)
    include_subdirs: Mapped[bool]
