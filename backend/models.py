from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from database import Base

class Designer(Base):
    __tablename__ = "designers"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    name = Column(String)
    role = Column(String) # 'admin' or 'designer'

class Proposal(Base):
    __tablename__ = "proposals"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    region = Column(String)
    price = Column(String)
    duration = Column(String)
    designer_name = Column(String)
    status = Column(String) # 'Pending', 'Active'
    description = Column(String)

class MatchingRequest(Base):
    """고객이 랜딩에서 제출한 1:1 전문가 매칭 신청."""
    __tablename__ = "matching_requests"
    id = Column(Integer, primary_key=True, index=True)
    people = Column(String)          # 동반 인원
    travel_date = Column(String)     # 희망 일정
    budget = Column(String)          # 예산 범위
    purpose = Column(String)         # 희망 테마
    contact = Column(String)         # 연락처
    status = Column(String, default="접수")  # 접수 / 상담중 / 매칭완료 / 취소
    created_at = Column(String)      # ISO 날짜 문자열

class Guide(Base):
    __tablename__ = 'guides'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    region = Column(String)
    role = Column(String)
    phone = Column(String)
    status = Column(String, default='Pending')
    rating = Column(Integer, default=5)
    memo = Column(String)

class UserCrm(Base):
    __tablename__ = 'users_crm'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    type = Column(String, default='Customer')
    contact = Column(String)
    request = Column(String)
    status = Column(String, default='Lead')

class Video(Base):
    __tablename__ = "videos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    category = Column(String)
    designer_name = Column(String)
    thumbnail = Column(String) # Path to image
    video_url = Column(String)
    views = Column(String)
