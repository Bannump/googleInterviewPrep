import { useState, useEffect, useCallback, useRef } from 'react';
import {
  INITIAL_QUESTIONS,
  getDefaultProgress,
  loadProgress,
  saveProgress,
  loadActiveTimer,
  saveActiveTimer,
} from '../data/questions';
import { useAuth } from '../contexts/AuthContext';
import {
  getUserProgress,
  saveDsaProgress as saveDsaProgressFirestore,
  saveActiveTimer as saveActiveTimerFirestore,
} from '../lib/userProgress';

function mergeProgress(saved, defaults) {
  if (!saved || !Array.isArray(saved) || saved.length !== defaults.length) return defaults;
  const byId = new Map(saved.map((p) => [p.id, p]));
  return defaults.map((d) => {
    const s = byId.get(d.id);
    return s
      ? { id: d.id, completed: s.completed, timeSpent: s.timeSpent ?? 0, runningSince: null }
      : { ...d, runningSince: null };
  });
}

export function useDsaProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState(() => {
    const defaults = getDefaultProgress();
    const saved = loadProgress();
    const savedTimer = loadActiveTimer();
    let merged = saved && Array.isArray(saved) && saved.length === defaults.length
      ? mergeProgress(saved, defaults)
      : defaults;
    if (savedTimer?.id != null && savedTimer?.startedAt != null) {
      merged = merged.map((p) =>
        p.id === savedTimer.id ? { ...p, runningSince: savedTimer.startedAt } : { ...p, runningSince: null }
      );
    }
    return merged;
  });
  const [activeTimer, setActiveTimerState] = useState(() => loadActiveTimer());
  const firestoreLoadDone = useRef(false);

  // Load from Firestore when user signs in
  useEffect(() => {
    if (!user?.uid) {
      firestoreLoadDone.current = false;
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const data = await getUserProgress(user.uid);
        if (cancelled) return;
        const defaults = getDefaultProgress();
        const merged = data?.dsaProgress
          ? mergeProgress(data.dsaProgress, defaults)
          : defaults;
        let withTimer = merged;
        const timer = data?.activeTimer;
        if (timer?.id != null && timer?.startedAt != null) {
          withTimer = merged.map((p) =>
            p.id === timer.id ? { ...p, runningSince: timer.startedAt } : { ...p, runningSince: null }
          );
        }
        setProgress(withTimer);
        setActiveTimerState(timer ?? null);
      } catch (_) {
        if (!cancelled) {
          setProgress(getDefaultProgress());
          setActiveTimerState(null);
        }
      } finally {
        if (!cancelled) firestoreLoadDone.current = true;
      }
    })();
    return () => { cancelled = true; };
  }, [user?.uid]);

  // Persist: localStorage when no user, Firestore when user (after initial load)
  useEffect(() => {
    if (!user) {
      saveProgress(progress);
      return;
    }
    if (!firestoreLoadDone.current) return;
    saveDsaProgressFirestore(user.uid, progress).catch(() => {});
  }, [user, progress]);

  useEffect(() => {
    if (!user) {
      saveActiveTimer(activeTimer);
      return;
    }
    if (!firestoreLoadDone.current) return;
    saveActiveTimerFirestore(user.uid, activeTimer).catch(() => {});
  }, [user, activeTimer]);

  const getProgressById = useCallback(
    (id) => progress.find((p) => p.id === id) ?? { completed: false, timeSpent: 0, runningSince: null },
    [progress]
  );

  const toggleComplete = useCallback((id) => {
    setProgress((prev) =>
      prev.map((p) => (p.id === id ? { ...p, completed: !p.completed, runningSince: null } : p))
    );
    setActiveTimerState((prev) => (prev && prev.id === id ? null : prev));
  }, []);

  const startTimer = useCallback((id) => {
    const now = Date.now();
    setProgress((prev) =>
      prev.map((p) => (p.id === id ? { ...p, runningSince: now } : { ...p, runningSince: null }))
    );
    setActiveTimerState({ id, startedAt: now });
  }, []);

  const pauseTimer = useCallback((id) => {
    setProgress((prev) => {
      return prev.map((p) => {
        if (p.id !== id || !p.runningSince) return p;
        const elapsed = Math.floor((Date.now() - p.runningSince) / 1000);
        return { ...p, timeSpent: p.timeSpent + elapsed, runningSince: null };
      });
    });
    setActiveTimerState((prev) => (prev && prev.id === id ? null : prev));
  }, []);

  const finishTimer = useCallback((id) => {
    setProgress((prev) => {
      return prev.map((p) => {
        if (p.id !== id) return { ...p, runningSince: null };
        const elapsed = p.runningSince ? Math.floor((Date.now() - p.runningSince) / 1000) : 0;
        return {
          ...p,
          timeSpent: p.timeSpent + elapsed,
          runningSince: null,
          completed: true,
        };
      });
    });
    setActiveTimerState((prev) => (prev && prev.id === id ? null : prev));
  }, []);

  const resetQuestion = useCallback((id) => {
    setProgress((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, completed: false, timeSpent: 0, runningSince: null } : p
      )
    );
    setActiveTimerState((prev) => (prev && prev.id === id ? null : prev));
  }, []);

  const completedCount = progress.filter((p) => p.completed).length;
  const total = INITIAL_QUESTIONS.length;

  return {
    progress,
    getProgressById,
    toggleComplete,
    startTimer,
    pauseTimer,
    finishTimer,
    resetQuestion,
    activeTimer,
    completedCount,
    total,
  };
}
