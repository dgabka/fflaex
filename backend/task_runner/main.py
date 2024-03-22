import asyncio
import re

import json

from fastapi.encoders import jsonable_encoder
from sqlalchemy.dialects.sqlite import insert as sqlite_upsert
from shlex import quote

from db import SessionLocal
from models.file import FileModel
from message_bus import Topic, message_bus

ffmpeg_queue = asyncio.Queue()


async def ffmpeg_worker():
    while True:
        f = await ffmpeg_queue.get()
        print(f)
        process = await asyncio.create_subprocess_shell(
            f"ffmpeg -v warning -progress /dev/stdout -i {quote(f['filepath'])} -map 0 -c copy -metadata fflaex=true -y output.mkv",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )

        while process.returncode is None and process.stdout:
            line = str(await process.stdout.readline())
            if line.startswith("b'out_time="):
                match = re.search(
                    ".*=-?(?P<h>[0-9]+):(?P<m>[0-9]+):(?P<s>[0-9]+).*", line
                )
                if match is None:
                    continue
                seconds = (
                    int(match.group("h")) * 3600
                    + int(match.group("m")) * 60
                    + int(match.group("s"))
                )
                progress = int(seconds / int(f["duration"].split(".")[0]) * 100)
                message_bus.publish(Topic.ENCODING_PROGRESS, progress)
                print(f"Progress: {progress}%")


ffprobe_queue = asyncio.Queue()


async def upsertFile(filepath: str, data):
    with SessionLocal() as session:
        stmt = sqlite_upsert(FileModel).values(
            filepath=filepath,
            streams=data["streams"],
            format=data["format"],
        )

        stmt = stmt.on_conflict_do_update(
            index_elements=[FileModel.filepath],
            set_=dict(streams=stmt.excluded.streams, format=stmt.excluded.format),
        )

        result = session.scalars(stmt.returning(FileModel)).one().to_dict()
        session.commit()
        message_bus.publish(Topic.LIBRARY_ITEM_UPDATED, jsonable_encoder(result))


async def ffprobe_worker():
    while True:
        file = await ffprobe_queue.get()
        process = await asyncio.create_subprocess_shell(
            f'ffprobe -v quiet -print_format json -show_streams -show_format "{file}"',
            stdout=asyncio.subprocess.PIPE,
        )
        await process.wait()
        data, _ = await process.communicate()
        json_parsed = json.loads(data)

        await upsertFile(file, json_parsed)
