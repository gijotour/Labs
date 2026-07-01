import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

# Railway에서는 DATABASE_URL 환경변수가 자동으로 주입됨
# 로컬 개발 시 SQLite 사용
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./gijo.db")

# Railway PostgreSQL URL은 postgres:// 형태로 오는데 SQLAlchemy는 postgresql:// 필요
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# SQLite는 check_same_thread 옵션 필요, PostgreSQL은 불필요
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
