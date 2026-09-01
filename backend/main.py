from fastapi import FastAPI, Depends, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi.staticfiles import StaticFiles
import shutil
import os
import uuid
from datetime import datetime, timezone
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

@app.get("/api/matching-requests", response_model=list[schemas.MatchingRequestResponse])
def get_matching_requests(db: Session = Depends(get_db)):
    """관리자 화면에서 접수된 매칭 신청을 최신순으로 조회한다."""
    return db.query(models.MatchingRequest).order_by(models.MatchingRequest.id.desc()).all()

@app.post("/api/matching-requests", response_model=schemas.MatchingRequestResponse)
def create_matching_request(payload: schemas.MatchingRequestCreate, db: Session = Depends(get_db)):
    """랜딩 페이지의 고객 매칭 신청을 접수한다."""
    db_request = models.MatchingRequest(
        **payload.model_dump(),
        status="접수",
        created_at=datetime.now(timezone.utc).isoformat(timespec="seconds"),
    )
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request

@app.patch("/api/matching-requests/{request_id}", response_model=schemas.MatchingRequestResponse)
def update_matching_request(
    request_id: int,
    payload: schemas.MatchingRequestStatusUpdate,
    db: Session = Depends(get_db),
):
    db_request = db.query(models.MatchingRequest).filter(models.MatchingRequest.id == request_id).first()
    if db_request is None:
        raise HTTPException(status_code=404, detail="Matching request not found")
    db_request.status = payload.status
    db.commit()
    db.refresh(db_request)
    return db_request

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

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/guides", response_model=list[schemas.GuideResponse])
def get_guides(db: Session = Depends(get_db)):
    return db.query(models.Guide).order_by(models.Guide.id.desc()).all()

@app.post("/api/guides", response_model=schemas.GuideResponse)
def create_guide(guide: schemas.GuideCreate, db: Session = Depends(get_db)):
    db_guide = models.Guide(**guide.model_dump())
    db.add(db_guide)
    db.commit()
    db.refresh(db_guide)
    return db_guide

@app.patch("/api/guides/{guide_id}", response_model=schemas.GuideResponse)
def update_guide(
    guide_id: int,
    guide: schemas.GuideUpdate,
    db: Session = Depends(get_db),
):
    db_guide = db.query(models.Guide).filter(models.Guide.id == guide_id).first()
    if db_guide is None:
        raise HTTPException(status_code=404, detail="Guide not found")
    
    # Update only provided fields
    update_data = guide.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_guide, key, value)
    
    db.commit()
    db.refresh(db_guide)
    return db_guide

@app.delete("/api/guides/{guide_id}")
def delete_guide(guide_id: int, db: Session = Depends(get_db)):
    db_guide = db.query(models.Guide).filter(models.Guide.id == guide_id).first()
    if db_guide is None:
        raise HTTPException(status_code=404, detail="Guide not found")
    db.delete(db_guide)
    db.commit()
    return {"ok": True}

@app.get("/api/users", response_model=list[schemas.UserCrmResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.UserCrm).order_by(models.UserCrm.id.desc()).all()

@app.post("/api/users", response_model=schemas.UserCrmResponse)
def create_user(user: schemas.UserCrmCreate, db: Session = Depends(get_db)):
    db_user = models.UserCrm(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.patch("/api/users/{user_id}", response_model=schemas.UserCrmResponse)
def update_user(
    user_id: int,
    user: schemas.UserCrmUpdate,
    db: Session = Depends(get_db),
):
    db_user = db.query(models.UserCrm).filter(models.UserCrm.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update only provided fields
    update_data = user.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

@app.delete("/api/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.UserCrm).filter(models.UserCrm.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"ok": True}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
