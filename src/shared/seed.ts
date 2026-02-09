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
    id: 'safety-1',
    category: 'Work',
    eyebrow: 'January 2026',
    title: 'Safety 1',
    shortTitle: 'S1',
    description: 'Safety placeholder content',
    heroRatio: '16:9'
  },
  {
    id: 'safety-2',
    category: 'Work',
    eyebrow: 'December 2025',
    title: 'Safety 2',
    shortTitle: 'S2',
    description: 'Safety placeholder content',
    heroRatio: '16:9'
  },
  {
    id: 'safety-3',
    category: 'Work',
    eyebrow: 'December 2025',
    title: 'Safety 3',
    shortTitle: 'S3',
    description: 'Safety placeholder content',
    heroRatio: '16:9'
  },
  {
    id: 'safety-4',
    category: 'Work',
    eyebrow: 'November 2025',
    title: 'Safety 4',
    shortTitle: 'S4',
    description: 'Safety placeholder content',
    heroRatio: '16:9'
  },
  {
    id: 'safety-5',
    category: 'Work',
    eyebrow: 'October 2025',
    title: 'Safety 5',
    shortTitle: 'S5',
    description: 'Safety placeholder content',
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
