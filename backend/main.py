from contextlib import asynccontextmanager
from operator import call
from typing import Any, Callable
from fastapi import FastAPI, Request, WebSocket
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette import EventSourceResponse

import asyncio
import uvicorn

from event_bus import message_bus
from routes import path, command, file
from db import Base, engine
from task_runner.main import ffmpeg_worker, ffprobe_worker

Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    asyncio.create_task(ffmpeg_worker())
    asyncio.create_task(ffprobe_worker())
    yield


app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(path.router)
app.include_router(command.router)
app.include_router(file.router)


@app.get("/stream")
async def message_stream(request: Request):
    async def event_generator():
        while True:
            if await request.is_disconnected():
                break

            if message_bus.has_messages():
                yield message_bus.get_message()

            await asyncio.sleep(1)

    # fixme: it works, but would be nice to resolve the error
    return EventSourceResponse(event_generator())


app.mount("/assets", StaticFiles(directory="../frontend/dist/assets"), name="assets")


@app.get("/{catchall:path}")
async def serve_react_app(catchall: str):
    return FileResponse("../frontend/dist/index.html")



if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, log_level="info")
