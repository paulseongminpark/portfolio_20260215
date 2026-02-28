# Tech Review System

**AI·빅테크·신기술 뉴스를 매일 추적하고, 산업·직무 관점 인사이트로 가공하는 개인 퍼블리싱 시스템.**

## 운영 구조

- **Perplexity**: 실시간 뉴스 수집 (AI·빅테크·신기술 키워드 추적)
- **Claude Code**: /research 스킬로 인사이트 추출 및 Smart Brevity 포맷 작성
- **Jekyll**: Markdown → 정적 HTML 빌드 (로컬 작성 → GitHub Push)
- **GitHub Actions**: 매일 자동 빌드 및 Pages 배포
- **GitHub Pages**: 호스팅 + CDN + feed.json API 제공

## 콘텐츠 포맷 (Smart Brevity)

- **1글 1인사이트**: 단일 주제에 집중, 분산 없이
- **200자 이내**: 핵심만 압축하여 밀도를 높임
- **산업·직무 관점**: 단순 뉴스 요약이 아닌 의미 해석
- **매일 1포스트**: 꾸준한 트래킹과 맥락 누적
- **키워드 태그**: AI / 빅테크 / 신기술 / 산업 동향

## 자동화 파이프라인

- **수집**: Perplexity 실시간 검색 → 원문 확보
- **작성**: /research 스킬 → Claude 인사이트 추출
- **커밋**: commit-writer 에이전트 → 메시지 자동 생성
- **배포**: GitHub Actions → Pages 자동 빌드 (push 트리거)
- **연동**: feed.json → 포트폴리오 실시간 카드 (최신 3개)

## 기술 스택

- **Jekyll**: 정적 사이트 생성기 (Ruby 기반)
- **GitHub Pages**: 무료 호스팅 + 글로벌 CDN
- **GitHub Actions**: CI/CD 파이프라인 (자동 빌드)
- **gh CLI**: PR·이슈 관리 (GitHub MCP 없이 터미널로)
- **feed.json**: RSS 대체 경량 API (포트폴리오 연동용)

## 현황 & 지표

- **운영 시작**: 2025년 12월
- **포스트 형식**: Smart Brevity (짧고 날카롭게)
- **추적 키워드**: AI 에이전트, 빅테크 전략, 신기술, 산업 동향
- **아카이브**: keywords-log.md (키워드 이력 관리)
- **포트폴리오 연동**: 실시간 최신 포스트 3개 자동 표시

## 다음 방향

- **월간 리포트**: 키워드 트렌드 집계 및 시각화
- **카테고리 확장**: AI / 빅테크 / 스타트업 / 정책
- **자동 발행**: Claude Code → GitHub Actions 풀 자동화
- **독자 연동**: RSS → 이메일 뉴스레터 시스템
- **AI 요약**: 주간 핵심 포스트 자동 큐레이션
