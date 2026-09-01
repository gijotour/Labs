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

class MatchingRequestCreate(BaseModel):
    people: str
    travel_date: str
    contact: str
    budget: str = ""
    purpose: str = ""

class MatchingRequestResponse(MatchingRequestCreate):
    id: int
    status: str
    created_at: Optional[str] = None
    class Config:
        orm_mode = True

class MatchingRequestStatusUpdate(BaseModel):
    status: str

class GuideCreate(BaseModel):
    name: str
    region: str
    role: str
    phone: str
    status: str = "Pending"
    rating: int = 5
    memo: str = ""

class GuideResponse(GuideCreate):
    id: int
    class Config:
        orm_mode = True

class GuideUpdate(BaseModel):
    name: Optional[str] = None
    region: Optional[str] = None
    role: Optional[str] = None
    phone: Optional[str] = None
    status: Optional[str] = None
    rating: Optional[int] = None
    memo: Optional[str] = None
    class Config:
        orm_mode = True

class UserCrmCreate(BaseModel):
    name: str
    type: str = "Customer"
    contact: str
    request: str = ""
    status: str = "Lead"

class UserCrmResponse(UserCrmCreate):
    id: int
    class Config:
        orm_mode = True

class UserCrmUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    contact: Optional[str] = None
    request: Optional[str] = None
    status: Optional[str] = None
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
