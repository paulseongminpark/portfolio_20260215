# 포트폴리오 — 이어서

## 세션 목표
Work 온톨로지 섹션 구성 + 남은 UI 폴리싱 (5-7)

## 완료 (2026-03-19)
- UI 폴리싱 1-4: 여백, 타이포, Hero, 섹션 구분
- 훅 하이라이트: 15px/600 + PMCC 주황 배경 (글자만)
- 비대칭 패딩: 48px top / 16px bottom
- 본문 간격: 6px (훅→본문 16px)
- 텍스트 수정: Why 마지막, Journey/Forward 훅, Work 서사, Now/Forward 강화
- TOC: 13px/11px, 하위항목 기본 접힘+자동 펼침
- Now 서브라벨: 주황 하이라이트
- 커밋: cf4021a

## 남은 작업
1. **Work 온톨로지 섹션 구성** — 가장 중요. 03_text-only.md의 Work 서사를 코드에 반영 + 시각적 구조
2. **5번 Now 구조감** — Memory/Flow/Loop 간 여백/구분 정리 (라벨은 하이라이트 완료)
3. **6번 TOC 위치** — 현재 padding 120px 32px. 추가 조정 필요할 수 있음
4. **7번 TOC 밀도** — 구현 완료 (기본 접힘). 확인만
5. **01_full-draft.md SoT 동기화** — 03_text-only.md 수정분을 01_full-draft.md에도 반영

## 확정 디자인 시스템
```
SectionLabel    13px / 600 / uppercase / #999
Hook            15px / 600 / #333 + rgba(249,115,22,0.18) 하이라이트
Body            15px / 400 / #333 / 간격 6px
Now 서브라벨    15px / 600 / #333 + 주황 하이라이트 (Hook과 동일)
섹션 패딩       48px top / 16px bottom (비대칭)
카드 섹션       paddingTop: 56px (Work/Now/Forward)
```

## 참고 파일
- 전체 텍스트: 03_text-only.md (최신 SoT)
- 원본 draft: 01_full-draft.md (부분 동기화 필요)
- 코드: src/portfolio/index.tsx + portfolio.css
