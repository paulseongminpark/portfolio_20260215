import emptyHouseRaw from '../EMPTY_HOUSE_CPS_DETAIL_KO.md?raw';
import skinDiaryRaw from '../SKIN_DIARY_DETAIL_KO.md?raw';
import pmccRaw from '../PMCC_DETAIL_KO.md?raw';

export type WorkKey = 'empty-house' | 'skin-diary' | 'pmcc';

export const workRawMap: Record<WorkKey, string> = {
  'empty-house': emptyHouseRaw,
  'skin-diary': skinDiaryRaw,
  'pmcc': pmccRaw,
};
