"""프론트엔드 API 경로가 백엔드에 실제로 존재하는지 검증하는 테스트."""

import os
import re
from pathlib import Path

from fastapi import FastAPI


def test_frontend_api_paths_exist_in_backend(app: FastAPI) -> None:
    """프론트엔드가 호출하는 API 경로가 백엔드에 실제로 존재하는지 정적으로 대조한다."""
    # 저장소 루트를 구한다. 이 파일 기준 parents[2] 가 루트다.
    root = Path(__file__).resolve().parents[2]
    
    # 루트/src 아래의 모든 .js 와 .jsx 파일을 읽는다.
    src_dir = root / "src"
    js_files = src_dir.rglob("*.js")
    jsx_files = src_dir.rglob("*.jsx")
    all_files = list(js_files) + list(jsx_files)
    
    # 각 파일 텍스트에서 정규식으로 API 경로 리터럴을 전부 뽑는다.
    frontend_paths = set()
    file_map = {}
    
    for file_path in all_files:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # 패턴: /api/ 로 시작해서 따옴표(작은따옴표, 큰따옴표, 백틱)를 만나기 전까지의 문자열.
        # 예: '/api/guides'  `${API_URL}/api/upload`  `/api/guides/${id}`
        pattern = r'/api/[^"\']*(?=["\'])'
        matches = re.findall(pattern, content)
        
        for match in matches:
            # 템플릿 표현식은 경로 파라미터로 간주해 {param} 으로 치환한다.
            normalized = re.sub(r'\$\{[^}]+\}', '{param}', match)
            # 끝에 붙은 슬래시는 제거한다.
            normalized = normalized.rstrip('/')
            frontend_paths.add(normalized)
            file_map[normalized] = file_path.name
            
    # 프론트에서 경로를 하나도 못 찾으면(추출 0건) 실패시킨다.
    if not frontend_paths:
        raise AssertionError("프론트엔드에서 API 경로를 찾지 못했습니다. 정규식이 깨졌을 수 있습니다.")
    
    # main.app.routes 를 순회해 각 라우트의 path 를 모은다.
    backend_paths = set()
    
    for route in app.routes:
        if hasattr(route, 'path'):
            # FastAPI 의 경로 파라미터 표기 {guide_id} 등도 {param} 으로 정규화한다.
            normalized = re.sub(r'\{[^}]+\}', '{param}', route.path)
            backend_paths.add(normalized)
    
    # 3)에서 모은 경로 중 4)에 없는 것이 하나라도 있으면 실패시킨다.
    missing_paths = frontend_paths - backend_paths
    
    if missing_paths:
        # 실패 메시지에는 누락된 경로 목록과, 그 경로가 등장한 파일명을 함께 출력한다.
        error_msg = "다음 API 경로들이 백엔드에 존재하지 않습니다:\n"
        for path in sorted(missing_paths):
            error_msg += f"  {path} (파일: {file_map[path]})\n"
        raise AssertionError(error_msg.strip())
