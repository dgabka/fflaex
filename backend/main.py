from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from routes import path
from db import Base, engine

Base.metadata.create_all(bind=engine)


app = FastAPI()

app.include_router(path.router)

app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")


@app.get("/{catchall:path}")
async def serve_react_app(catchall: str):
    return FileResponse("frontend/dist/index.html")
