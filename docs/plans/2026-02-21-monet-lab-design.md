# monet-lab 실험 환경 설계

_Date: 2026-02-21_

## 목적

monet-registry(https://github.com/monet-design/monet-registry) 컴포넌트를 자유롭게 탐색하고 수정/조합 실험하기 위한 독립 플레이그라운드 구축. 포트폴리오(02_portfolio)는 건드리지 않음.

## 위치

`C:\dev\01_projects\04_monet-lab`

## 기술 스택

- Vite + React + TypeScript
- Tailwind CSS 4
- shadcn/ui (컴포넌트 레지스트리 연동)
- pnpm

## 프로젝트 구조

```
04_monet-lab/
├── src/
│   ├── experiments/        ← 실험별 폴더
│   │   └── hero-01/
│   │       └── index.tsx
│   ├── App.tsx             ← 실험 목록 + 전환 UI
│   ├── main.tsx
│   └── components/ui/      ← shadcn 기본 컴포넌트
├── package.json
├── tailwind.config.ts
└── vite.config.ts
```

## 실험 워크플로우

1. monet.design에서 컴포넌트 발견
2. `npx shadcn@latest add <url>` 또는 코드 복사
3. `src/experiments/<name>/` 폴더에 추가
4. `App.tsx` 목록에 등록
5. 브라우저에서 확인 + 자유 수정

## 성공 기준

- `pnpm dev` 로컬 실행 가능
- shadcn 컴포넌트 정상 설치 확인
- 첫 실험 컴포넌트(예: Hero 섹션) 동작 확인
