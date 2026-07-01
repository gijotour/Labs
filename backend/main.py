from fastapi import FastAPI, Depends, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi.staticfiles import StaticFiles
import shutil
import os
import uuid
from dotenv import load_dotenv

load_dotenv()

import models
import schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="GIJO Tour API")

# Enable CORS for the frontend (Vite dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure uploads directory exists
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount uploads to be served statically
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.get("/api/proposals", response_model=list[schemas.ProposalResponse])
def get_proposals(db: Session = Depends(get_db)):
    return db.query(models.Proposal).all()

@app.post("/api/proposals", response_model=schemas.ProposalResponse)
def create_proposal(proposal: schemas.ProposalCreate, db: Session = Depends(get_db)):
    db_proposal = models.Proposal(**proposal.model_dump())
    db.add(db_proposal)
    db.commit()
    db.refresh(db_proposal)
    return db_proposal

@app.get("/api/videos", response_model=list[schemas.VideoResponse])
def get_videos(db: Session = Depends(get_db)):
    return db.query(models.Video).all()

@app.post("/api/videos", response_model=schemas.VideoResponse)
def create_video(
    title: str = Form(...),
    category: str = Form(...),
    designer_name: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Save the file
    ext = file.filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # 이미지 URL 생성 (환경변수가 있으면 사용, 없으면 로컬 주소 사용)
    backend_url = os.getenv("BACKEND_URL", "http://localhost:8000")
    thumbnail_url = f"{backend_url}/uploads/{filename}"
    
    db_video = models.Video(
        title=title,
        category=category,
        designer_name=designer_name,
        thumbnail=thumbnail_url,
        video_url="",
        views="0"
    )
    db.add(db_video)
    db.commit()
    db.refresh(db_video)
    return db_video

@app.post("/api/upload")
def upload_image(file: UploadFile = File(...)):
    ext = file.filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    backend_url = os.getenv("BACKEND_URL", "http://localhost:8000")
    return {"url": f"{backend_url}/uploads/{filename}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
