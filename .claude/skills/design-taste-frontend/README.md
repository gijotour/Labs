# design-taste-frontend (taste-skill)

이 스킬은 외부 저장소에서 가져온 것이다. 직접 수정하지 말고, 업스트림을 갱신해서 다시 복사할 것.

| 항목 | 값 |
|---|---|
| 업스트림 | https://github.com/Leonxlnx/taste-skill |
| 원본 경로 | `skills/taste-skill/SKILL.md` |
| 설치 이름 | `design-taste-frontend` (v2, experimental) |
| 가져온 커밋 | `e988add20dab0fa97d7a76781c48961c8184288e` (2026-07-23) |
| 라이선스 | MIT — `LICENSE` 참조 |

## 갱신 방법

```bash
git clone --depth 1 https://github.com/Leonxlnx/taste-skill /tmp/taste-skill
cp /tmp/taste-skill/skills/taste-skill/SKILL.md .claude/skills/design-taste-frontend/SKILL.md
```

업스트림에는 다른 스킬 12개(`gpt-taste`, `image-to-code`, `redesign-existing-projects`,
`minimalist-ui`, `industrial-brutalist-ui`, `high-end-visual-design`,
`full-output-enforcement`, `stitch-design-taste`, `brandkit`,
`imagegen-frontend-web`, `imagegen-frontend-mobile`, `design-taste-frontend-v1`)도 있다.
필요하면 같은 방식으로 `.claude/skills/<설치 이름>/SKILL.md` 에 추가한다.
