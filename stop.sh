#!/bin/bash
# GIJO TOUR - 모든 서버 종료 스크립트
# 사용법: ./stop.sh

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_DIR="$PROJECT_DIR/logs"

echo "🛑 GIJO TOUR 서버 종료 중..."

# PID 파일로 종료
if [ -f "$LOG_DIR/backend.pid" ]; then
    kill $(cat "$LOG_DIR/backend.pid") 2>/dev/null && echo "  ⚙️  백엔드 서버 종료"
    rm "$LOG_DIR/backend.pid"
fi

if [ -f "$LOG_DIR/frontend.pid" ]; then
    kill $(cat "$LOG_DIR/frontend.pid") 2>/dev/null && echo "  🌐 프론트엔드 서버 종료"
    rm "$LOG_DIR/frontend.pid"
fi

# 혹시 남은 포트 정리
fuser -k 5173/tcp 2>/dev/null
fuser -k 8000/tcp 2>/dev/null

echo "✅ 모든 서버 종료 완료"
