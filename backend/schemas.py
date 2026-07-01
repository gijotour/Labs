from pydantic import BaseModel
from typing import Optional

class ProposalCreate(BaseModel):
    title: str
    region: str
    price: str
    duration: str
    designer_name: str
    status: str = "Pending"
    description: str = ""

class ProposalResponse(ProposalCreate):
    id: int
    class Config:
        orm_mode = True

class VideoCreate(BaseModel):
    title: str
    category: str
    designer_name: str
    thumbnail: str
    video_url: str = ""
    views: str = "0"

class VideoResponse(VideoCreate):
    id: int
    class Config:
        orm_mode = True
