#!/usr/bin/env bash
# Aider ↔ GB10(DGX Spark) 로컬 모델 연결 래퍼
#
# 모델 구성 (상세는 .aider.model.settings.yml 의 모델별 api_base):
#   main  openai/qwen3-coder-30b-a3b   127.0.0.1:8090   코딩 튜닝 MoE, 실제 편집
#   weak  openai/qwen38-flash-next     127.0.0.1:18080  요약·커밋 메시지
#   → weak 를 분리하지 않으면 요약 부하가 편집 서버 슬롯과 경합해 실패한다.
#
# 전제 (세션당 한 번):
#   1) 코더 서버 기동 (GB10)
#      ssh gb10 'cd ~/gijo-as/server && setsid nohup ./llama.cpp-next/build/bin/llama-server \
#        -m models/qwen3-coder-30b-a3b/qwen3-coder-30b-a3b.gguf --alias qwen3-coder-30b-a3b \
#        -ngl -1 --ctx-size 32768 --parallel 1 --host 127.0.0.1 --port 8090 --jinja \
#        > /tmp/llama-coder-8090.log 2>&1 < /dev/null &'
#   2) 터널 (외부 노출 없이 로컬로만 끌어옴)
#      ssh -f -N -L 127.0.0.1:8090:127.0.0.1:8090 gb10     # 코더
#      ssh -f -N -L 127.0.0.1:18080:127.0.0.1:8080 gb10    # 메인 서비스(weak)
#
# 사용:  ./scripts/aider-gb10.sh "지시문" 파일1 파일2 ... [--read 참조파일]
set -euo pipefail

# Windows 콘솔이 cp949라 UTF-8을 강제하지 않으면 한글 출력에서 죽는다
export PYTHONUTF8=1
export PYTHONIOENCODING=utf-8

# litellm 이 openai/* 를 호출하려면 키가 비어 있으면 안 된다 (값 자체는 무시됨)
export OPENAI_API_KEY="${OPENAI_API_KEY:-local-no-key-needed}"

# 엔드포인트 사전 점검 — 터널이 끊긴 채로 돌리면 원인 찾기 어려운 에러가 난다
for ep in 8090 18080; do
  if ! curl -s -m 5 "http://127.0.0.1:${ep}/health" >/dev/null 2>&1; then
    echo "오류: 127.0.0.1:${ep} 응답 없음. SSH 터널을 확인하라 (위 주석 참조)." >&2
    exit 1
  fi
done

MSG="$1"; shift

aider \
  --model openai/qwen3-coder-30b-a3b \
  --no-show-model-warnings \
  --no-gitignore \
  --no-pretty \
  --no-stream \
  --map-tokens 1024 \
  --yes-always \
  --message "$MSG" \
  "$@"
