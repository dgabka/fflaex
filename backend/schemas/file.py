from typing import Any
from pydantic import BaseModel


class FileDto(BaseModel):
    id: int
    filepath: str
    streams: dict[str, Any]
    format: dict[str, Any]
