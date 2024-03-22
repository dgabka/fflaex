from sqlalchemy import JSON
from sqlalchemy.orm import Mapped, mapped_column

from typing import Any

from db import Base


class FileModel(Base):
    __tablename__ = "files"

    id: Mapped[int] = mapped_column(primary_key=True)
    filepath: Mapped[str] = mapped_column(index=True, unique=True)
    streams: Mapped[dict[str, Any]] = mapped_column(JSON)
    format: Mapped[dict[str, Any]] = mapped_column(JSON)
