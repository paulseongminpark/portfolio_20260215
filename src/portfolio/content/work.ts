import mcpMemoryRaw from './MCP_MEMORY_DETAIL_KO.md?raw';
import emptyHouseRaw from './EMPTY_HOUSE_CPS_DETAIL_KO.md?raw';
import skinDiaryRaw from './SKIN_DIARY_DETAIL_KO.md?raw';
import pmccRaw from './PMCC_DETAIL_KO.md?raw';

export type WorkKey = 'mcp-memory' | 'empty-house' | 'skin-diary' | 'pmcc';

export const workRawMap: Record<WorkKey, string> = {
  'mcp-memory': mcpMemoryRaw,
  'empty-house': emptyHouseRaw,
  'skin-diary': skinDiaryRaw,
  pmcc: pmccRaw,
};
