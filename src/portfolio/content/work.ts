import mcpMemoryRaw from './MCP_MEMORY_DETAIL_KO.md?raw';
import contextEngineeringRaw from './CONTEXT_ENGINEERING_DETAIL_KO.md?raw';
import emptyHouseRaw from './EMPTY_HOUSE_CPS_DETAIL_KO.md?raw';
import skinDiaryRaw from './SKIN_DIARY_DETAIL_KO.md?raw';
import pmccRaw from './PMCC_DETAIL_KO.md?raw';
import techReviewRaw from './TECH_REVIEW_DETAIL_KO.md?raw';

export type WorkKey = 'mcp-memory' | 'context-engineering' | 'empty-house' | 'skin-diary' | 'pmcc' | 'tech-review';

export const workRawMap: Record<WorkKey, string> = {
  'mcp-memory': mcpMemoryRaw,
  'context-engineering': contextEngineeringRaw,
  'empty-house': emptyHouseRaw,
  'skin-diary': skinDiaryRaw,
  pmcc: pmccRaw,
  'tech-review': techReviewRaw,
};
