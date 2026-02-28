import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import './App.css';

type TypoStyle = 'stack' | 'grid' | 'narrative';

function App() {
  const [typoStyle, setTypoStyle] = useState<TypoStyle>('stack');
  const diagramRef = useRef<HTMLDivElement>(null);

  const downloadPng = () => {
    if (diagramRef.current === null) return;
    toPng(diagramRef.current, { cacheBust: true, backgroundColor: '#F9F6F1' })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `anthropic_typo_${typoStyle}.png`;
        link.href = dataUrl;
        link.click();
      });
  };

  const items = [
    {
      id: 'claude',
      name: 'Claude Code',
      sub: 'Opus 4.6 · 설계자',
      desc: ['유일한 쓰기 권한', '에이전트 체인', '최종 판단', 'verify barrier'],
      stats: ['200K 컨텍스트', '토큰 = 예산'],
    },
    {
      id: 'codex',
      name: 'Codex CLI',
      sub: 'GPT-5.3 · 검증기',
      desc: ['diff 리뷰', '포맷 QA', 'git 히스토리 추출', '세션당 3~5회'],
      stats: ['5시간 롤링 제한', 'codex --bypass-approvals'],
    },
    {
      id: 'gemini',
      name: 'Gemini CLI',
      sub: '3.1 Pro · 추출기',
      desc: ['1M 컨텍스트로 대량 파일 구조화 추출', '웹 검색'],
      stats: ['절대 경로 필수', 'gemini --yolo --sandbox'],
    },
    {
      id: 'perplexity',
      name: 'Perplexity',
      sub: 'sonar-deep-research',
      desc: ['tech-review 소스', 'deep research', 'sonar-pro 폴백'],
      stats: ['API 기반'],
    }
  ];

  const renderTypo = (list: string[]) => {
    if (typoStyle === 'stack') {
      return (
        <div className="typo-stack">
          <div className="main-info">{list[0]}</div>
          <div className="sub-info">{list.slice(1).join(' · ')}</div>
        </div>
      );
    }
    if (typoStyle === 'grid') {
      return (
        <div className="typo-grid">
          {list.map((text, i) => <span key={i} className="grid-item">{text}</span>)}
        </div>
      );
    }
    return (
      <div className="typo-narrative">
        {list.map((text, i) => (
          <span key={i}>
            {i % 2 === 0 ? text : <span className="italic">{text}</span>}
            {i < list.length - 1 ? ', ' : ''}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="main-wrapper">
      <div className="controls">
        <div className="control-section">
          <span className="label">TYPO STRATEGY:</span>
          <div className="btn-group">
            {(['stack', 'grid', 'narrative'] as TypoStyle[]).map(s => (
              <button key={s} className={`nav-btn ${typoStyle === s ? 'active' : ''}`} onClick={() => setTypoStyle(s)}>
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <button className="download-btn" onClick={downloadPng}>Download PNG</button>
      </div>

      <div className="diagram-viewport" ref={diagramRef}>
        <div className="layout-container benchmark">
          <h1 className="section-title">Model Capability Benchmarks</h1>
          <table className="anthropic-table">
            <thead>
              <tr>
                <th>Agent Interface</th>
                <th>Model Engine</th>
                <th>Core Competency</th>
                <th>Constraints / Cost</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td className="td-name">{item.name}</td>
                  <td className="td-sub">{item.sub}</td>
                  <td className="td-desc">{renderTypo(item.desc)}</td>
                  <td className="td-stats">{renderTypo(item.stats)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;