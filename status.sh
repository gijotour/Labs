#!/bin/bash
# GIJO TOUR - 상태 확인 스크립트
# 사용법: ./status.sh

echo "📊 GIJO TOUR 서버 상태 점검"
echo "================================="

# 프론트엔드 체크
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/ 2>/dev/null)
if [ "$STATUS" = "200" ]; then
    echo "  ✅ 프론트엔드 (5173): 정상 [HTTP $STATUS]"
    echo "     👉 http://localhost:5173/gijotour"
else
    echo "  ❌ 프론트엔드 (5173): 오류 또는 꺼짐 [HTTP $STATUS]"
fi

# 백엔드 체크
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/proposals 2>/dev/null)
if [ "$STATUS" = "200" ]; then
    echo "  ✅ 백엔드 API (8000): 정상 [HTTP $STATUS]"
    echo "     👉 http://localhost:8000/docs"
else
    echo "  ❌ 백엔드 API (8000): 오류 또는 꺼짐 [HTTP $STATUS]"
fi

echo "================================="
