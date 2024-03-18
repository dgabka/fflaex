from enum import StrEnum, auto
from typing import Optional
from pydantic import BaseModel, PastDatetime, StrictBool, PositiveInt


# class ScanOptionsDto(BaseModel):
#     pass


class EncodeOptionsDto(BaseModel):
    id: PositiveInt
