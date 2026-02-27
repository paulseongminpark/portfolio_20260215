---
name: sync
description: STATE.md 갱신 + LOG append + git commit + push
user-invocable: true
allowed-tools: Read, Edit, Bash
---

## Steps
1. context/STATE.md 읽기
2. 이번 세션 작업 반영 (완료/다음/막힌것 갱신)
3. 날짜 업데이트
4. LOG append (중앙 로그, 읽기 금지, echo만):
   ```
   LOG="/c/dev/01_projects/01_orchestration/context/logs/$(date '+%Y-%m-%d').md"
   printf "\n## $(date '+%Y-%m-%d %H:%M') [portfolio] Claude Code\n- 작업 요약\n" >> "$LOG"
   ```
5. git add context/ && git commit -m "[portfolio] STATE 갱신" && git push

## LOG 규칙
- 중앙 로그: 01_orchestration/context/logs/ (portfolio에서도 여기에 기록)
- 읽기 절대 금지. echo append만.
- 시간: 시스템 시간 $(date '+%Y-%m-%d %H:%M')

## Output
DONE: STATE 갱신 + push 완료
URL: https://paulseongminpark.github.io/portfolio_20260215/context/STATE.md
