import homeContentRaw from '../content/HOME_INTRO_TO_RELATION_KO.md?raw';

export type Category = 'About' | 'System' | 'Work' | 'Writing' | 'Resume' | 'Contact';

export interface Section {
  id: string;
  category: Category;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  heroRatio: string;
}

const extractBoldText = (text: string, marker: string): string => {
  const regex = new RegExp(`${marker}[\\s\\S]*?\\*\\*([\\s\\S]*?)\\*\\*`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
};

const introText = extractBoldText(homeContentRaw, '# 1\\) Intro');
const backgroundText = extractBoldText(homeContentRaw, '\\*\\*Background\\*\\*');
const directionText = extractBoldText(homeContentRaw, '\\*\\*Direction\\*\\*');

export const sections: Section[] = [
  {
    id: 'research-1',
    category: 'About',
    eyebrow: 'Introduction',
    title: 'Intro',
    shortTitle: 'Intro',
    description: introText,
    heroRatio: '16:9'
  },
  {
    id: 'research-2',
    category: 'About',
    eyebrow: 'About',
    title: 'Background',
    shortTitle: 'Background',
    description: backgroundText,
    heroRatio: '16:9'
  },
  {
    id: 'research-3',
    category: 'About',
    eyebrow: 'About',
    title: 'Direction',
    shortTitle: 'Direction',
    description: directionText,
    heroRatio: '16:9'
  },
  {
    id: 'product-1',
    category: 'System',
    eyebrow: 'January 2026',
    title: 'Operating Principles',
    shortTitle: 'Principles',
    description: 'Product placeholder content',
    heroRatio: '16:9'
  },
  {
    id: 'product-2',
    category: 'System',
    eyebrow: 'December 2025',
    title: 'Flow',
    shortTitle: 'Flow',
    description: 'Product placeholder content',
    heroRatio: '16:9'
  },
  {
    id: 'system-time',
    category: 'System',
    eyebrow: 'System',
    title: 'Framework / Time',
    shortTitle: 'Framework / Time',
    description: 'Time placeholder content',
    heroRatio: '16:9'
  },
  {
    id: 'system-sensation',
    category: 'System',
    eyebrow: 'System',
    title: 'Framework / Sensation',
    shortTitle: 'Framework / Sensation',
    description: 'Sensation placeholder content',
    heroRatio: '16:9'
  },
  {
    id: 'system-relation',
    category: 'System',
    eyebrow: 'System',
    title: 'Framework / Relation',
    shortTitle: 'Framework / Relation',
    description: 'Relation placeholder content',
    heroRatio: '16:9'
  },
 {
  id: 's1',
  category: 'Work',
  eyebrow: 'June 2025',
  title: 'Empty House CPS',
  shortTitle: 'Empty House',
  description: '빈집 문제를 사람이 떠나서 생긴 결과로만 단정 짓는 기존 정책들의 설명이 의문이었습니다. 인구·상권·교통 데이터의 관계를 구조화해, 개입 우선순위를 판단할 수 있는 시스템을 설계했습니다.',
  heroRatio: '16:9'
},
{
  id: 's2',
  category: 'Work',
  eyebrow: 'August 2025',
  title: 'Skin Diary AI',
  shortTitle: 'Skin Diary AI',
  description: '피부를 숫자로만 평가하는 방식으로는 지금 무엇을 해야 하는지 알 수 없다는 점이 답답했습니다. 피부 상태를 둘러싼 사용자 맥락들 -날씨, 환경, 피부 기록- 을 결합해 지금 무엇을 해야 하는지 판단하는 행동 제안 시스템을 개발했습니다.',
  heroRatio: '16:9'
},
{
  id: 's3',
  category: 'Work',
  eyebrow: '2023–2026',
  title: 'PMCC',
  shortTitle: 'PMCC',
  description: '함께 달려도 사람들 사이가 좀처럼 가까워지지 않는 게 언제나 아쉬웠습니다. 관계가 시작되는 순간과 규칙이 필요하다고 느껴, 대화의 흐름과 참여 방식을 직접 설계했습니다.',
  heroRatio: '16:9'
},
  {
    id: 'writing-1',
    category: 'Writing',
    eyebrow: 'January 2026',
    title: 'Writing 1',
    shortTitle: 'W1',
    description: 'Writing placeholder content',
    heroRatio: '16:9'
  },
  {
    id: 'resume-1',
    category: 'Resume',
    eyebrow: 'Updated 2026',
    title: 'Resume',
    shortTitle: 'Resume',
    description: 'Resume placeholder content',
    heroRatio: '16:9'
  },
  {
    id: 'contact-1',
    category: 'Contact',
    eyebrow: 'Get in touch',
    title: 'Contact',
    shortTitle: 'Contact',
    description: 'Contact placeholder content',
    heroRatio: '16:9'
  }
];
