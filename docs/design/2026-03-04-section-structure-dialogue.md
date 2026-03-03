# 포트폴리오 섹션 구조 설계 — 대화 기록
> 2026-03-04 | Paul + Claude 세션

---

## 핵심 결정 요약

### 섹션 구조 (확정)
```
01 · About
02 · How I Think     ← Why (원칙, 4카드만, 짧고 강하게)
03 · How I Build     ← How (HOW I AI 전체 + 온톨로지 + Context Flow + Evolution + Obsidian)
04 · Work            ← 결과물 (Empty House / Skin Diary / PMCC)
05 · Writing         ← 미학적 배경 + Tech Review (현재진행형)
06 · Contact
```

### 이전 구조 대비 변경
- 02·System 분리 → 02 Why / 03 How
- TR(04) → Writing(05)에 통합
- Obsidian 비중 대폭 축소 (큰 섹션 → 한 단락)

---

## 대화 흐름 (요점)

**How I Work 타이틀 결정**
- P: "how i operate" 위계가 안 맞는 것 같다
- C: p12-h2(36~48px) vs HOW I AI wd-eyebrow(12px) — 위계 역전 문제
- P: "how i work" + subtitle "그리고 왜 이 방식인가." 결정

**Obsidian 위치**
- P: HOW I AI, Context Flow, Evolution, Obsidian까지 위계를 잡고 싶다
- C: Obsidian = 시각화 레이어 중 하나, 온톨로지가 핵심 기술
- P: Obsidian은 시각화 레이어 + Living Docs 소통창구 역할
- 결론: 03 How I Build 마지막에 한 단락만 유지

**온톨로지 섹션**
- P: localhost:7676에서 온톨로지/Graph RAG/벡터DB 구축 중
- C: Datasette/pyvis/Obsidian Graph View → 추후 실제 온톨로지 다이어그램으로 교체
- 결론: 03·How I Build에서 온톨로지가 핵심, 자리 확보 후 추후 별도 설계 세션

**TR 위치**
- P: TR을 Work에 넣을지 Writing에 넣을지 고민
- C: "독자가 TR을 볼 때 '만든 것'으로 보길 원해, '어떻게 생각하는지 일부'로 보길 원해?"
- P: "만들고 있구나, 트래킹하고 있구나 정도" = 현재진행형 활동
- 결론: Writing 섹션으로 이동

**02 섹션 분리**
- C: 02가 4카드 + HOW I AI 전체 + 온톨로지 + Obsidian = 너무 큼
- 해결: Why(02)와 How(03)로 분리 → TR이 Writing으로 옮겨서 섹션 수 유지 (5개)
- 흐름: 누구인가 → 왜 이렇게 생각하는가 → 어떻게 만들었나 → 뭘 만들었나 → 지금 뭘 하나 → 연락

---

## 미결 사항

- [ ] HOW I AI 섹션 내부 세부 내용 파악 (compact 후 다음 세션)
- [ ] 온톨로지 섹션 설계 (별도 brainstorming 세션)
- [ ] HOW I AI 내부 위계 정리 (Context Flow / E2E / Evolution 레벨)
- [ ] Obsidian 한 단락 내용 확정
- [ ] 02·How I Think / 03·How I Build 실제 구현

---

## 카드 내용 (확정)

**Connection**
"무언가를 배울 때, 항목으로 기억하는 것보다 어디서 왜 나왔는지가 더 오래 남았다. 하나의 사건에도 여러 각도가 보인다 — 배경, 결정, 실패, 통찰. 이것들이 따로 저장되면 흩어진다. 아이디어 하나가 생기면, 어디서 왔는지, 무엇과 연결되는지를 먼저 본다. 이 습관을 시스템으로 옮겼다. 26개 노드 타입, 33개 관계 타입 — 무슨 일이 있었고, 어떤 판단을 했으며, 어디서 틀렸는지를 연결로 쌓는다. 기억이 아니라 사고 구조의 외부화다."

**Context as Currency**
"대화를 시작할 때마다 같은 맥락을 처음부터 설명해야 한다면, 생각이 아니라 기억에 에너지를 쓰게 된다. 그 낭비를 없애기 위해 맥락 자체를 구조화했다. 필요한 순간에 정확히 필요한 것만 꺼낸다 — 세션 시작 비용을 88% 줄였다."

**Structure over Willpower**
"세션이 끊기면 기억도 끊길 수 있다는 걸 안다. 그래서 기억력에 기대지 않기로 했다. 자동 Hook부터 수동 체크포인트까지 4단계 안전망을 만들었다. 의지가 아니라 구조가 기억한다."

**Governance**
"시스템을 만들었다고 끝이 아니다. 새 도구가 나오고, 더 나은 방식이 생기고, 기존 구조가 낡아진다. 중요한 건 무엇을 쓰느냐보다 어떻게 통제할 것인가 — 그래서 거버넌스가 먼저다. 시스템은 만드는 것, 거버넌스는 운영하는 것이다."
