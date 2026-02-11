import { useEffect, useRef } from 'react';
import { type Category } from '../../shared/seed';
import { type WorkKey } from '../../content/work';

const WORK_HASH_PREFIX = '#work=';

function getWorkKeyFromHash(): WorkKey | null {
  const h = window.location.hash || '';
  if (!h.startsWith(WORK_HASH_PREFIX)) return null;
  const v = decodeURIComponent(h.slice(WORK_HASH_PREFIX.length));
  if (v === 'empty-house' || v === 'skin-diary' || v === 'pmcc') return v;
  return null;
}

interface ReturnState {
  tab: 'All' | Category;
  expanded: Category[];
  scrollY: number;
}

export function useWorkRouting(args: {
  activeWork: WorkKey | null;
  setActiveWork: (key: WorkKey | null) => void;
  activeWorkRef: React.RefObject<WorkKey | null>;
  activeTab: 'All' | Category;
  setActiveTab: (tab: 'All' | Category) => void;
  expandedGroups: Set<Category>;
  setExpandedGroups: (groups: Set<Category>) => void;
  returnState: ReturnState | null;
  setReturnState: (rs: ReturnState | null) => void;
  setPendingScrollId: (id: string | null) => void;
  forceScrollTo: (y: number) => void;
  defaultExpanded: Category[];
}) {
  const {
    setActiveWork, activeWorkRef,
    activeTab, setActiveTab,
    expandedGroups, setExpandedGroups,
    returnState, setReturnState,
    setPendingScrollId, forceScrollTo, defaultExpanded,
  } = args;

  const returnStateRef = useRef<ReturnState | null>(null);
  useEffect(() => {
    returnStateRef.current = returnState;
  }, [returnState]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const openWorkDetail = (key: WorkKey, opts?: { skipHistory?: boolean }) => {
    if (!activeWorkRef.current) {
      setReturnState({
        tab: activeTab,
        expanded: Array.from(expandedGroups),
        scrollY: window.scrollY,
      });
    }

    setActiveWork(key);
    setActiveTab('Work');
    setExpandedGroups(new Set(['Work']));
    setPendingScrollId(null);

    if (!opts?.skipHistory) {
      window.history.pushState(
        { view: 'work-detail', key },
        '',
        `${window.location.pathname}${window.location.search}${WORK_HASH_PREFIX}${encodeURIComponent(key)}`,
      );
    }

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const closeWorkDetailInternal = (opts?: { skipHistory?: boolean }) => {
    const rs = returnStateRef.current;

    setActiveWork(null);
    setPendingScrollId(null);

    if (opts?.skipHistory) {
      // do nothing
    }

    if (rs) {
      setActiveTab(rs.tab);
      setExpandedGroups(new Set(rs.expanded));
      setReturnState(null);

      requestAnimationFrame(() => {
        forceScrollTo(rs.scrollY);
      });

      return;
    }

    setActiveTab('All');
    setExpandedGroups(new Set(defaultExpanded));
    setReturnState(null);

    requestAnimationFrame(() => {
      forceScrollTo(0);
    });
  };

  const requestCloseWorkDetail = () => {
    if (window.location.hash.startsWith(WORK_HASH_PREFIX) && returnStateRef.current) {
      window.history.back();
      return;
    }

    if (window.location.hash.startsWith(WORK_HASH_PREFIX)) {
      window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`);
    }
    closeWorkDetailInternal({ skipHistory: true });
  };

  // ✅ 초기 진입: 해시에 work가 있으면 상세 모드로 시작
  useEffect(() => {
    const key = getWorkKeyFromHash();
    if (!key) return;

    setReturnState({
      tab: 'All',
      expanded: defaultExpanded,
      scrollY: 0,
    });

    openWorkDetail(key, { skipHistory: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ 브라우저 back/forward 동기화
  useEffect(() => {
    const onPopState = () => {
      const key = getWorkKeyFromHash();
      if (key) {
        openWorkDetail(key, { skipHistory: true });
        return;
      }

      if (activeWorkRef.current) {
        closeWorkDetailInternal({ skipHistory: true });
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { openWorkDetail, requestCloseWorkDetail };
}
