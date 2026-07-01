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

class Video(Base):
    __tablename__ = "videos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    category = Column(String)
    designer_name = Column(String)
    thumbnail = Column(String) # Path to image
    video_url = Column(String)
    views = Column(String)
