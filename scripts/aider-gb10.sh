#!/usr/bin/env bash
# Aider ↔ GB10(DGX Spark)의 qwen3-coder-30b-a3b 연결 래퍼
#
# 전제 (한 번만):
#   1) GB10에 코더 서버 기동
#      ssh gb10 'cd ~/gijo-as/server && setsid nohup ./llama.cpp-next/build/bin/llama-server \
#        -m models/qwen3-coder-30b-a3b/qwen3-coder-30b-a3b.gguf --alias qwen3-coder-30b-a3b \
#        -ngl -1 --ctx-size 32768 --parallel 1 --host 127.0.0.1 --port 8090 --jinja \
#        > /tmp/llama-coder-8090.log 2>&1 < /dev/null &'
#   2) SSH 터널 (외부 노출 없이 로컬로만 끌어옴)
#      ssh -f -N -L 127.0.0.1:8090:127.0.0.1:8090 gb10
#
# 사용:  ./scripts/aider-gb10.sh "지시문" 파일1 파일2 ...
set -euo pipefail

# Windows 콘솔이 cp949라 UTF-8을 강제하지 않으면 한글 출력에서 죽는다
export PYTHONUTF8=1
export PYTHONIOENCODING=utf-8

export OPENAI_API_BASE="http://127.0.0.1:8090/v1"
export OPENAI_API_KEY="local-no-key-needed"

MSG="$1"; shift

aider \
  --model openai/qwen3-coder-30b-a3b \
  --no-show-model-warnings \
  --no-gitignore \
  --no-pretty \
  --no-stream \
  --map-tokens 1024 \
  --yes \
  --message "$MSG" \
  "$@"
