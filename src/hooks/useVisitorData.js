import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'yc-learning-visitor';

function generateUUID() {
  return crypto.randomUUID();
}

function getInitialData() {
  const now = new Date().toISOString();
  return {
    visitorId: generateUUID(),
    firstVisit: now,
    visitCount: 1,
    lastVisit: now,
    chapters: {},
  };
}

export default function useVisitorData() {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          visitCount: parsed.visitCount + 1,
          lastVisit: new Date().toISOString(),
        };
      }
    } catch {
      // corrupted data, start fresh
    }
    return getInitialData();
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage full or unavailable
    }
  }, [data]);

  const toggleChapter = useCallback((chapterId) => {
    setData((prev) => {
      const current = prev.chapters[chapterId];
      const isCompleted = current?.completed;
      return {
        ...prev,
        chapters: {
          ...prev.chapters,
          [chapterId]: {
            completed: !isCompleted,
            completedAt: !isCompleted ? new Date().toISOString() : null,
          },
        },
      };
    });
  }, []);

  const completedCount = Object.values(data.chapters).filter(
    (ch) => ch.completed
  ).length;
  const progress = Math.round((completedCount / 6) * 100);

  return { data, toggleChapter, completedCount, progress };
}
