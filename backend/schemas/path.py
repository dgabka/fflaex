from pydantic import BaseModel


class PathBaseSchema(BaseModel):
    path: str
    include_subdirs: bool


class PathCreateSchema(PathBaseSchema):
    pass


class PathSchema(PathBaseSchema):
    id: int

    class Config:
        from_attributes = True
