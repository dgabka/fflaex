from pydantic import BaseModel


class PathBaseDto(BaseModel):
    path: str
    include_subdirs: bool


class PathCreationDto(PathBaseDto):
    pass


class PathDto(PathBaseDto):
    id: int

    class Config:
        from_attributes = True
