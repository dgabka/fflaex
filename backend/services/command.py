from sqlalchemy import delete, select
from sqlalchemy.orm import Session
from glob import glob
import os

from models.file import FileModel
from models.path import PathModel
from task_runner.main import ffprobe_queue, ffmpeg_queue


async def scan_library(db: Session):
    filepaths = set()
    existing_files = db.scalars(select(FileModel)).all()

    for f in existing_files:
        if os.path.isfile(f.filepath):
            filepaths.add(f.filepath)
        else:
            db.execute(delete(FileModel).where(FileModel.id == f.id))
            db.commit()

    paths = db.scalars(select(PathModel)).all()
    print("Trying to get paths")

    for path in paths:
        filepaths.update(scan_path(path))

    for file in filepaths:
        ffprobe_queue.put_nowait(file)


def scan_path(path: PathModel) -> set[str]:
    extentions = ["mkv", "mp4"]
    glob_pattern_base = f"{path.path}/**/*." if bool(path.include_subdirs) else "*."
    patterns = map(lambda ext: f"{glob_pattern_base}{ext}", extentions)

    result = set()

    for p in patterns:
        result.update(set(glob(p)))

    return result


async def run_ffmpeg(session: Session, id: int):
    file = session.get_one(FileModel, id)
    ffmpeg_queue.put_nowait(
        {"filepath": file.filepath, "duration": file.format["duration"]}
    )
