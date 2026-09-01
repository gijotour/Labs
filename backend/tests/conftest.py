"""백엔드 테스트 공통 설정.

main 을 import 하는 순간 database.py 가 DATABASE_URL 을 읽어 엔진을 만들고
models.Base.metadata.create_all() 이 실행된다. 따라서 import 보다 먼저
테스트용 DB 를 환경변수에 꽂아야 운영 DB(gijo.db)를 건드리지 않는다.
"""
import os
import sys
import tempfile
from pathlib import Path

import pytest

BACKEND_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_DIR))

_TMP_DB = Path(tempfile.gettempdir()) / "gijo_test.db"
if _TMP_DB.exists():
    _TMP_DB.unlink()
os.environ["DATABASE_URL"] = f"sqlite:///{_TMP_DB.as_posix()}"

from fastapi.testclient import TestClient  # noqa: E402

import main  # noqa: E402


@pytest.fixture(scope="session")
def app():
    return main.app


@pytest.fixture()
def client(app):
    with TestClient(app) as c:
        yield c
