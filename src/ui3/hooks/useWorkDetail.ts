import { useMemo } from 'react';
import { parseWorkDetail } from '../../shared/parseWorkDetail';
import { type WorkKey, workRawMap } from '../../content/work';

export function useWorkDetail(activeWork: WorkKey | null) {
  const parsedWork = useMemo(() => {
    if (!activeWork) return null;
    return parseWorkDetail(workRawMap[activeWork]);
  }, [activeWork]);

  const heroSubtitle = useMemo(() => {
    if (!activeWork) return '';
    const raw = workRawMap[activeWork];
    const match = raw.match(/### Hero 바로 아래 짧은 2문장\s*\n+([\s\S]*?)(?=\n---|\n## \d)/);
    if (!match) return '';
    return match[1].trim();
  }, [activeWork]);

  return { parsedWork, heroSubtitle };
}
