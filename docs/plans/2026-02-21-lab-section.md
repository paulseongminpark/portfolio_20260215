# UI Lab 섹션 + 자동 스크린샷 구현 플랜

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** monet-lab 실험을 자동 스크린샷으로 캡처해 포트폴리오 "Lab" 섹션에 텍스트+이미지로 기록한다.

**Architecture:** monet-lab에 Playwright 스크린샷 스크립트를 추가해 실험별 PNG를 portfolio/public/lab/에 저장한다. 포트폴리오 seed.ts에 'Lab' 카테고리와 섹션을 추가하고, Page.tsx에 Lab 렌더링 블록을 추가한다. content/lab.md에 실험 기록을 마크다운으로 작성한다.

**Tech Stack:** Playwright, TypeScript, React, Vite

---

### Task 1: monet-lab Playwright 스크린샷 스크립트

**Files:**
- Create: `C:\dev\01_projects\04_monet-lab\playwright.config.ts`
- Create: `C:\dev\01_projects\04_monet-lab\scripts\screenshot.ts`

**Step 1: Playwright 설치**

```bash
cd C:/dev/01_projects/04_monet-lab
npm install -D @playwright/test
npx playwright install chromium
```

**Step 2: playwright.config.ts 생성**

`C:\dev\01_projects\04_monet-lab\playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:5173',
  },
})
```

**Step 3: scripts/screenshot.ts 생성**

`C:\dev\01_projects\04_monet-lab\scripts\screenshot.ts`:

```typescript
import { chromium } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const PORTFOLIO_PUBLIC_LAB = path.resolve(
  __dirname,
  '../../02_portfolio/public/lab'
)

async function main() {
  // 출력 폴더 생성
  fs.mkdirSync(PORTFOLIO_PUBLIC_LAB, { recursive: true })

  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1280, height: 800 })

  await page.goto('http://localhost:5173')

  // 사이드바의 실험 버튼 목록 수집
  const buttons = page.locator('div.fixed button')
  const count = await buttons.count()

  console.log(`Found ${count} experiments`)

  for (let i = 0; i < count; i++) {
    const btn = buttons.nth(i)
    const label = (await btn.textContent())?.trim() ?? `exp-${i}`
    await btn.click()
    await page.waitForTimeout(800) // 애니메이션 대기

    // 버튼 텍스트를 파일명으로 변환 (소문자, 공백→하이픈)
    const filename = label.toLowerCase().replace(/\s+/g, '-') + '.png'
    const outPath = path.join(PORTFOLIO_PUBLIC_LAB, filename)

    await page.screenshot({ path: outPath, fullPage: false })
    console.log(`✅ ${filename} → ${outPath}`)
  }

  await browser.close()
  console.log('Done.')
}

main().catch(console.error)
```

**Step 4: package.json에 screenshot 스크립트 추가**

`package.json`의 `scripts`에 추가:
```json
"screenshot": "npx ts-node --esm scripts/screenshot.ts"
```

실제로는 `ts-node` 대신 Playwright의 Node API를 직접 사용하므로 tsx로 실행:
```json
"screenshot": "node --import tsx/esm scripts/screenshot.ts"
```

tsx 설치:
```bash
cd C:/dev/01_projects/04_monet-lab
npm install -D tsx
```

**Step 5: 커밋**

```bash
cd C:/dev/01_projects/04_monet-lab
git add .
git commit -m "[monet-lab] Playwright 스크린샷 스크립트 추가"
```

---

### Task 2: 포트폴리오 public/lab 폴더 생성

**Files:**
- Create: `C:\dev\01_projects\02_portfolio\public\lab\.gitkeep`

**Step 1: 폴더 + .gitkeep 생성**

```bash
mkdir -p C:/dev/01_projects/02_portfolio/public/lab
touch C:/dev/01_projects/02_portfolio/public/lab/.gitkeep
```

**Step 2: 커밋**

```bash
cd C:/dev/01_projects/02_portfolio
git add public/lab/.gitkeep
git commit -m "[portfolio] public/lab 폴더 생성"
```

---

### Task 3: 포트폴리오 seed.ts에 Lab 카테고리 + 섹션 추가

**Files:**
- Modify: `C:\dev\01_projects\02_portfolio\src\shared\seed.ts`

**Step 1: Category 타입에 'Lab' 추가**

현재:
```typescript
export type Category = 'About' | 'System' | 'Work' | 'Writing' | 'Resume' | 'Contact';
```

변경:
```typescript
export type Category = 'About' | 'System' | 'Work' | 'Writing' | 'Resume' | 'Contact' | 'Lab';
```

**Step 2: sections 배열 끝에 Lab 섹션 추가**

`contact-1` 섹션 다음에 추가:
```typescript
  {
    id: 'lab-ui',
    category: 'Lab',
    eyebrow: 'Ongoing',
    title: 'UI Lab',
    shortTitle: 'UI Lab',
    description: 'monet-registry 컴포넌트를 실험하고 포트폴리오 UI를 진화시키는 과정을 기록합니다.',
    heroRatio: '16:9'
  }
```

**Step 3: 빌드 확인**

```bash
cd C:/dev/01_projects/02_portfolio
npm run build
```

Expected: 타입 오류 없이 성공

**Step 4: 커밋**

```bash
cd C:/dev/01_projects/02_portfolio
git add src/shared/seed.ts
git commit -m "[portfolio] Lab 카테고리 + UI Lab 섹션 추가"
```

---

### Task 4: Page.tsx에 Lab 카테고리 렌더링 추가

**Files:**
- Modify: `C:\dev\01_projects\02_portfolio\src\ui3\Page.tsx`

**현재 상황 파악 필요:**
Page.tsx는 `DEFAULT_EXPANDED`와 `categories` 배열로 탭/그룹을 구성한다.
`groupedSections`은 categories 기반으로 자동 생성된다.
Lab 카테고리의 렌더링 블록을 JSX에 추가해야 한다.

**Step 1: DEFAULT_EXPANDED에 'Lab' 추가**

현재:
```typescript
const DEFAULT_EXPANDED: Category[] = ['About', 'System', 'Work', 'Writing', 'Resume', 'Contact'];
```

변경:
```typescript
const DEFAULT_EXPANDED: Category[] = ['About', 'System', 'Work', 'Writing', 'Resume', 'Contact', 'Lab'];
```

**Step 2: content/lab.md import 추가**

파일 상단 import 블록에 추가:
```typescript
import labRaw from '../content/lab.md?raw';
```

**Step 3: Page.tsx JSX에서 'lab-ui' 섹션 렌더링 블록 추가**

Page.tsx의 JSX 렌더링 부분에서 다른 섹션들이 렌더링되는 패턴을 확인한 후,
`lab-ui` 섹션에 대한 렌더링 블록을 추가한다.

렌더링 형태 (이미지 + 텍스트 블록):
```tsx
{/* Lab 섹션 */}
{(activeTab === 'All' || activeTab === 'Lab') &&
  groupedSections['Lab']?.map((sec) => (
    <section key={sec.id} id={sec.id} className="...">
      <div className="lab-content">
        <LabRenderer raw={labRaw} />
      </div>
    </section>
  ))
}
```

실제 구현은 Page.tsx의 기존 섹션 렌더링 패턴을 그대로 따른다.
기존에 Work 섹션이나 Writing 섹션이 렌더링되는 방식을 참고해 동일한 레이아웃 컨테이너를 사용한다.

**Step 4: LabRenderer 컴포넌트 생성 (또는 인라인 처리)**

`src/ui3/components/LabRenderer.tsx`:

```tsx
interface LabRendererProps {
  raw: string
}

export function LabRenderer({ raw }: LabRendererProps) {
  // ## 헤더로 섹션 분리
  const sections = raw.split(/^## /m).filter(Boolean)

  return (
    <div className="lab-entries">
      {sections.map((block, i) => {
        const lines = block.split('\n')
        const title = lines[0].trim()
        const rest = lines.slice(1).join('\n').trim()

        // ![alt](./lab/filename.png) 패턴 추출
        const imgMatch = rest.match(/!\[.*?\]\((.*?)\)/)
        const imgSrc = imgMatch ? imgMatch[1] : null
        const text = rest.replace(/!\[.*?\]\(.*?\)/g, '').trim()

        return (
          <div key={i} className="lab-entry">
            <h3>{title}</h3>
            <p>{text}</p>
            {imgSrc && (
              <img
                src={imgSrc.replace('./lab/', '/lab/')}
                alt={title}
                style={{ width: '100%', borderRadius: 8, marginTop: 12 }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
```

**Step 5: 빌드 확인**

```bash
cd C:/dev/01_projects/02_portfolio
npm run build
```

Expected: 오류 없이 성공

**Step 6: 커밋**

```bash
cd C:/dev/01_projects/02_portfolio
git add src/ui3/Page.tsx src/ui3/components/LabRenderer.tsx
git commit -m "[portfolio] Lab 섹션 렌더링 추가"
```

---

### Task 5: hero-1 스크린샷 캡처 + lab.md 첫 항목 작성

**Files:**
- Create: `C:\dev\01_projects\02_portfolio\public\lab\hero-1.png` (스크립트로 생성)
- Create: `C:\dev\01_projects\02_portfolio\src\content\lab.md`

**Step 1: monet-lab dev 서버 실행 (별도 터미널)**

```bash
cd C:/dev/01_projects/04_monet-lab
npm run dev
```

서버가 http://localhost:5173에서 실행 중인지 확인.

**Step 2: 스크린샷 스크립트 실행**

새 터미널에서:
```bash
cd C:/dev/01_projects/04_monet-lab
npm run screenshot
```

Expected:
```
Found 1 experiments
✅ hero-1.png → C:\dev\01_projects\02_portfolio\public\lab\hero-1.png
Done.
```

**Step 3: 스크린샷 확인**

```bash
ls C:/dev/01_projects/02_portfolio/public/lab/
```

Expected: `hero-1.png` 존재

**Step 4: content/lab.md 생성**

`C:\dev\01_projects\02_portfolio\src\content\lab.md`:

```markdown
## Hero 1 — 2026-02-21
monet-registry의 첫 실험. Landingfolio 스타일 히어로 섹션으로 Framer Motion 애니메이션과 Lucide React 아이콘을 사용한다. Tailwind CSS 4 + shadcn/ui 환경에서 그대로 동작 확인.

![hero-1](./lab/hero-1.png)
```

**Step 5: 빌드 확인**

```bash
cd C:/dev/01_projects/02_portfolio
npm run build
```

**Step 6: 커밋**

```bash
cd C:/dev/01_projects/02_portfolio
git add public/lab/hero-1.png src/content/lab.md
git commit -m "[portfolio] UI Lab hero-1 스크린샷 + 첫 문서화"
```

---

## 완료 기준

- [ ] `npm run screenshot` 실행 시 portfolio/public/lab/에 PNG 생성
- [ ] 포트폴리오 dev 서버에서 Lab 탭 + UI Lab 섹션 표시
- [ ] hero-1 스크린샷 + 텍스트 렌더링 확인
