"""프론트엔드 API 경로가 백엔드에 존재하는지 검증하는 테스트."""

import re
from pathlib import Path

import pytest

from conftest import app

# 프론트엔드에서 사용하는 API 경로를 추출하는 정규식
PATH_RE = re.compile(r'/api/[A-Za-z0-9_\-/]*(?:\$\{[^}]*\}[A-Za-z0-9_\-/]*)*')

def _iter_source_files(root):
    """src 아래의 .js 와 .jsx 파일을 돌려준다. 테스트 파일은 제외한다.

    테스트 파일에는 예시 URL 리터럴이 들어 있어 실제 호출로 오인된다.
    """
    for pattern in ('src/**/*.js', 'src/**/*.jsx'):
        for file_path in root.glob(pattern):
            if '.test.' in file_path.name or '.spec.' in file_path.name:
                continue
            yield file_path

def extract_paths_from_js_files(root: Path) -> set:
    """src 디렉토리 아래의 모든 JS/X 파일에서 API 경로를 추출한다."""
    paths = set()
    for file_path in _iter_source_files(root):
        content = file_path.read_text(encoding='utf-8', errors='replace')
        found_paths = PATH_RE.findall(content)
        for path in found_paths:
            # 템플릿 표현식을 {param}으로 치환
            normalized = re.sub(r'\$\{[^}]*\}', '{param}', path)
            # 끝의 '/' 제거 (단 '/api'인 경우는 그대로 둔다)
            if normalized != '/api':
                normalized = normalized.rstrip('/')
            paths.add(normalized)
    return paths

def normalize_backend_path(path: str) -> str:
    """백엔드 경로를 정규화한다."""
    # 파라미터를 {param}으로 치환
    normalized = re.sub(r'\{[^}]*\}', '{param}', path)
    # 끝의 '/' 제거 (단 '/api'인 경우는 그대로 둔다)
    if normalized != '/api':
        normalized = normalized.rstrip('/')
    return normalized

@pytest.fixture
def frontend_paths():
    """프론트엔드에서 사용하는 API 경로 집합을 반환한다."""
    root = Path(__file__).resolve().parents[2]
    return extract_paths_from_js_files(root)

@pytest.fixture
def backend_paths(app):
    """백엔드에서 제공하는 API 경로 집합을 반환한다."""
    paths = set()
    for route in app.routes:
        path = getattr(route, 'path', None)
        if path and path.startswith('/api'):
            paths.add(normalize_backend_path(path))
    return paths

def test_frontend_api_paths_exist_in_backend(frontend_paths, backend_paths):
    """프론트엔드 API 경로가 백엔드에 존재하는지 검증한다."""
    if not frontend_paths:
        pytest.fail('정규식이 깨졌다')
    
    missing_paths = frontend_paths - backend_paths
    if missing_paths:
        # 누락된 경로와 그 경로가 나온 파일명을 함께 출력
        missing_details = []
        root = Path(__file__).resolve().parents[2]
        for path in missing_paths:
            # 해당 경로가 나온 파일들을 찾기
            files = []
            for file_path in _iter_source_files(root):
                content = file_path.read_text(encoding='utf-8', errors='replace')
                if path in content:
                    files.append(str(file_path.relative_to(root)))
            missing_details.append(f"{path} ({', '.join(files)})")
        pytest.fail(f"백엔드에 존재하지 않는 프론트엔드 API 경로:\n" + '\n'.join(missing_details))
