#!/bin/bash
# GIJO TOUR - 모든 서버 시작 스크립트
# 사용법: ./start.sh

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_DIR="$PROJECT_DIR/logs"
mkdir -p "$LOG_DIR"

echo "🚀 GIJO TOUR 서버 시작 중..."

# 1. 기존 프로세스 정리
echo "  기존 프로세스 정리..."
fuser -k 5173/tcp 2>/dev/null
fuser -k 8000/tcp 2>/dev/null
sleep 1

# 2. FastAPI 백엔드 서버 시작 (포트 8000)
echo "  ⚙️  FastAPI 백엔드 시작 (포트 8000)..."
cd "$PROJECT_DIR"
source venv/bin/activate
cd backend
nohup uvicorn main:app --host 0.0.0.0 --port 8000 > "$LOG_DIR/backend.log" 2>&1 &
echo $! > "$LOG_DIR/backend.pid"
echo "     PID: $(cat $LOG_DIR/backend.pid) | 로그: logs/backend.log"

# 3. SPA 프론트엔드 서버 시작 (포트 5173)
echo "  🌐 SPA 프론트엔드 시작 (포트 5173)..."
cd "$PROJECT_DIR"
nohup python3 spa_server.py > "$LOG_DIR/frontend.log" 2>&1 &
echo $! > "$LOG_DIR/frontend.pid"
echo "     PID: $(cat $LOG_DIR/frontend.pid) | 로그: logs/frontend.log"

sleep 2
echo ""
echo "✅ 모든 서버 시작 완료!"
echo "   프론트엔드: http://localhost:5173/gijotour"
echo "   백엔드 API: http://localhost:8000/docs"
