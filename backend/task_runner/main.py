import asyncio
import time
import subprocess
import re

import json

from sqlalchemy import insert, select
from shlex import quote

from db import SessionLocal
from models.file import FileModel
from event_bus import message_bus

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
                message_bus.publish(progress)
                print(f"Progress: {progress}%")


ffprobe_queue = asyncio.Queue()


def writeOrUpdateFile(filepath: str, data):
    with SessionLocal() as session:
        result = session.scalar(select(FileModel).where(FileModel.filepath == filepath))
        if result is None:
            file = FileModel(
                filepath=filepath,
                streams=data["streams"],
                format=data["format"],
            )
            session.add(file)
        else:
            result.streams = data["streams"]
            result.format = data["format"]
        session.commit()


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

        writeOrUpdateFile(file, json_parsed)

        print(json_parsed["format"]["tags"])
