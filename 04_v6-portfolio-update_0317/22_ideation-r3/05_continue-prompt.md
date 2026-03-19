# 포트폴리오 UI 폴리싱 — 이어서

## 세션 목표
R3 코드 반영 완료 상태에서 UI 폴리싱 7개 항목 순차 수정 중.

## 배경
/restore → portfolio 04_v6-portfolio-update_0317 파이프라인 복구

## 현재 상태
- R3 텍스트 초안 전체 확정 (01_full-draft.md)
- 코드 반영 완료 (index.tsx 재작성, 빌드 성공)
- UI 폴리싱 7개 중 **1번 완료, 2번 진행 중**

### 확정 구조
```
Hero: Paul Seongmin Park / Designing AI Operations.
01 · About
02 · Why I Build AI
03 · Journey
04 · Work (6카드)
05 · Now (Memory / Flow / Loop)
06 · Forward
07 · Contact
```

## 남은 작업 (02_ui-polish-plan.md 참조)
1. ~~여백 축소~~ ✅
2. **타이포 위계** — 섹션 라벨 완료, ProseBlock 첫 문단(17→20px, 500→600) + 간격(16→20px) 미적용
3. Hero 강화
4. 섹션 구분
5. Now 구조감
6. TOC 위치
7. TOC 밀도

하나 수정 → 사용자 확인 → 다음. 순서대로.

## 참고 파일
- 파이프라인 index: 04_v6-portfolio-update_0317/00_index.md
- 전체 텍스트: 22_ideation-r3/01_full-draft.md
- UI 계획: 22_ideation-r3/02_ui-polish-plan.md
- 현재 코드: src/portfolio/index.tsx + portfolio.css
