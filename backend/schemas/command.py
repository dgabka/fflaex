from enum import Enum, auto
from pydantic import BaseModel, PastDatetime, StrictBool


class Command(Enum):
    scan_library = auto()


class CommandBaseSchema(BaseModel):
    command: Command


class CommandRunSchema(CommandBaseSchema):
    pass


class CommandCompleteSchema(CommandBaseSchema):
    completed_at: PastDatetime
    success: StrictBool
