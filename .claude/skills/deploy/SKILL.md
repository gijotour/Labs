---
name: deploy
description: GIJO Labs 프로젝트를 프로덕션에 배포한다. 프론트엔드(Netlify)와 백엔드(Railway)는 GitHub main 브랜치 푸시로 자동 배포되므로, 이 스킬은 빌드 검증 → main 동기화 → 푸시 → 배포 결과 확인까지를 담당한다. "배포해줘", "deploy", "프로덕션 반영", "라이브 올려줘" 요청 시 사용.
---

# GIJO Labs 배포

## 배포 아키텍처

이 저장소는 **Git 푸시 기반 자동 배포**다. 배포 명령어를 직접 실행하는 것이 아니라, `main` 브랜치에 푸시하면 Netlify와 Railway가 각각 감지해서 빌드·배포한다.

| 대상 | 플랫폼 | 트리거 | 설정 파일 |
|---|---|---|---|
| 프론트엔드 (React/Vite) | Netlify | `main` 푸시 | `netlify.toml` |
| 백엔드 (FastAPI) | Railway | `main` 푸시 중 `backend/**` 변경 시 | `railway.json` |

- **저장소**: `git@github.com:gijotour/Labs.git`
- **GitHub Actions 없음** — `.github/workflows` 디렉터리가 존재하지 않는다. CI 체크를 기다리지 말 것.
- **Netlify**: `npm run build` → `dist` 퍼블리시, `/*` → `/index.html` 200 리다이렉트(SPA 라우팅)
- **Railway**: RAILPACK 빌더, `cd backend && uvicorn main:app`, 헬스체크 `/health`

### 배포 전 품질 게이트

`main` 푸시 전에 네 가지를 모두 통과시킨다. 하나라도 실패하면 푸시하지 않는다.

```
npm run lint     # 현재 3 errors 잔존 (미사용 변수, P3 항목) — 신규 오류만 차단한다
npm run build    # 반드시 통과
npm test         # vitest — 프론트
cd backend && .venv/Scripts/python -m pytest -q   # 백엔드
```

`pytest`의 `test_api_contract.py`는 프론트가 호출하는 API 경로가 백엔드에 실제로
존재하는지 정적으로 대조한다. **이 테스트가 실패하면 배포하면 안 된다.**
과거에 `/api/guides`·`/api/users`가 배포 백엔드에 없어 관리자 화면이 죽은 적이 있다.

### 필수 환경변수 (Netlify)

`.env.example` 참고. **빌드 시점에 주입**되므로 값을 바꾸면 재배포가 필요하다.

| 키 | 용도 | 미설정 시 |
|---|---|---|
| `VITE_KAKAO_CHANNEL_URL` | 카톡 상담 버튼 | 버튼이 렌더되지 않음 |
| `VITE_KAKAO_OPENCHAT_URL` | 매칭 신청 시 카톡 전달 | 신청은 되지만 카톡 창이 안 열림 |

배포 전 Netlify에 두 값이 등록돼 있는지 확인할 것. 미설정이어도 빌드는 통과하지만 전환 동선이 조용히 사라진다.

### 이 환경의 제약

- `netlify` CLI, `railway` CLI **미설치**. 설치 없이는 CLI로 배포 상태를 조회할 수 없다. 없다고 임의로 설치하지 말고, 사용자에게 대시보드 확인을 요청할 것.
- `gh` CLI는 사용 가능(v2.96.0) — GitHub 푸시 결과 확인에 사용.
- 작업 디렉터리는 **git worktree**다 (`.git`이 파일이며 `/Users/t/orca/Labs/.git/worktrees/...`를 가리킴). 브랜치는 `main`, `클루드`, `안티그래비티`가 공존한다.

---

## 배포 절차

### 1단계 — 현재 상태 파악

```bash
git status --short
git branch --show-current
git rev-list --left-right --count origin/main...HEAD
```

- 작업 트리가 더러우면 **먼저 사용자에게 커밋 여부를 확인**한다. 임의로 커밋하지 말 것.
- `origin/main...HEAD` 결과가 `0	0`이면 이미 동기화된 상태 → 배포할 새 변경이 없다. 사용자에게 알리고 중단한다.

### 2단계 — 빌드 검증 (필수)

```bash
npm run build
```

- **반드시 통과해야 한다.** 실패하면 배포를 중단하고 오류를 먼저 수정한다. Netlify는 같은 명령을 실행하므로, 로컬에서 실패하면 프로덕션에서도 실패한다.
- 정상 시 `dist/index.html`, `dist/assets/*` 생성. 참고 소요 시간 ~0.5초.

```bash
npm run lint
```

- **차단 조건이 아니다.** 현재 `no-unused-vars` 계열 오류가 20개 남아 있는 상태로 운영 중이다. 새로 늘어난 오류가 있으면 보고만 하고, 기존 오류 때문에 배포를 멈추지 말 것.

### 3단계 — main으로 반영

현재 브랜치가 `main`이 아니면, 사용자에게 **머지 방식을 확인한 뒤** 진행한다. 브랜치 전략을 임의로 결정하지 말 것.

```bash
git checkout main
git merge <작업브랜치>
git push origin main
```

현재 브랜치가 이미 `main`이면 바로:

```bash
git push origin main
```

> ⚠️ worktree에서는 다른 worktree가 점유한 브랜치로 `checkout`이 불가능하다. 실패하면 `git worktree list`로 어느 경로가 해당 브랜치를 쓰는지 확인하고, 머지를 그쪽에서 하도록 안내한다.

### 4단계 — 배포 결과 확인

푸시 직후:

```bash
git log --oneline -1 origin/main
git rev-list --left-right --count origin/main...HEAD   # 0	0 이어야 정상
```

그 다음 **실제 배포 반영은 CLI로 확인할 수 없으므로** 사용자에게 다음을 안내한다:

- **Netlify 대시보드** — 빌드 로그와 배포 상태
- **Railway 대시보드** — `backend/**`를 건드린 경우에만 재배포됨. 헬스체크 `/health`가 200이어야 배포 성공으로 처리됨
  (DB를 조회하지 않는 전용 엔드포인트다. 이전에는 `/api/proposals`를 썼다)
- 프로덕션 URL이 알려져 있으면 `curl -s -o /dev/null -w "%{http_code}" <URL>`로 응답 코드 확인

배포 완료를 **확인 없이 단정하지 말 것.** 푸시까지 완료했다면 "푸시 완료, Netlify/Railway 자동 배포 진행 중"이라고 사실대로 보고한다.

---

## 로컬 확인 (배포 전 눈으로 볼 때)

```bash
npm run dev              # Vite 개발 서버 → http://localhost:5173
npm run preview          # 빌드 결과물 확인 (프로덕션과 동일)
```

주요 경로: `/` (Labs 랜딩) · `/security` · `/llm` · `/gijotour/*` (투어 앱)

> `start.sh` / `stop.sh` / `status.sh`는 **Linux 전용**이다. `fuser` 명령과 `venv/` 경로를 쓰기 때문에 macOS에서는 동작하지 않는다. macOS에서는 위의 npm 스크립트를 쓸 것. `start_server.sh`는 `/home/john/...` 하드코딩 경로라 사용 불가.

---

## 트러블슈팅

**빌드는 되는데 배포 후 새로고침 시 404**
→ SPA 리다이렉트 문제. `netlify.toml`의 `/*` → `/index.html` 200 규칙이 살아있는지 확인.

**백엔드 배포가 안 됨**
→ Railway는 `watchPatterns: ["backend/**"]`라서 프론트엔드만 바꾼 커밋에는 반응하지 않는다. 정상 동작이다.

**Railway 배포가 실패로 표시됨**
→ 헬스체크 `/api/proposals`가 200을 반환하지 못하면 실패 처리된다. DB 연결(`backend/database.py`) 및 환경변수를 먼저 확인.

**푸시가 거부됨 (non-fast-forward)**
→ `git fetch origin && git log --oneline origin/main -5`로 원격에 무엇이 들어왔는지 확인한 뒤, 사용자에게 리베이스/머지 방침을 묻는다. `--force`는 사용하지 말 것.

---

## 알려진 이슈 (배포와 별개, 기회 될 때 정리)

- `src/assets/logo.png`가 **1.6MB**로 번들에 그대로 들어간다. 전체 JS(324KB)의 5배 — 첫 로딩 성능에 직접 영향.
- `src/App.jsx:34`에 디버그용 `console.log`가 프로덕션까지 나간다.
- `README.md`가 Vite 기본 템플릿 그대로다.
- 백엔드는 `backend/`(FastAPI) 하나뿐이다. 공존하던 Node 백엔드 `server/`는 제거됐다.
  두 백엔드가 같은 `DATABASE_URL`에 서로 다른 `proposals` 스키마를 만들던 충돌이 있었다.
