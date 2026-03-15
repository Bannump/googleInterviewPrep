import { useState, useEffect, useCallback, useRef } from 'react';
import { STORAGE_KEYS } from '../data/questions';
import { BEHAVIORAL_PROMPTS } from '../data/behavioral';
import { useAuth } from '../contexts/AuthContext';
import { getUserProgress, saveBehavioralNotes as saveBehavioralNotesFirestore } from '../lib/userProgress';

const defaultNotes = () =>
  BEHAVIORAL_PROMPTS.reduce((acc, prompt) => {
    acc[prompt] = { situation: '', task: '', action: '', result: '' };
    return acc;
  }, {});

function loadNotesLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BEHAVIORAL_NOTES);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const def = defaultNotes();
    return { ...def, ...parsed };
  } catch {
    return null;
  }
}

function saveNotesLocal(notes) {
  try {
    localStorage.setItem(STORAGE_KEYS.BEHAVIORAL_NOTES, JSON.stringify(notes));
  } catch (_) {}
}

export function useBehavioralNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState(() => loadNotesLocal() ?? defaultNotes());
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
        const def = defaultNotes();
        const loaded = data?.behavioralNotes && typeof data.behavioralNotes === 'object'
          ? { ...def, ...data.behavioralNotes }
          : def;
        setNotes(loaded);
      } catch (_) {
        if (!cancelled) setNotes(defaultNotes());
      } finally {
        if (!cancelled) firestoreLoadDone.current = true;
      }
    })();
    return () => { cancelled = true; };
  }, [user?.uid]);

  // Persist: localStorage when no user, Firestore when user (after initial load)
  useEffect(() => {
    if (!user) {
      saveNotesLocal(notes);
      return;
    }
    if (!firestoreLoadDone.current) return;
    saveBehavioralNotesFirestore(user.uid, notes).catch(() => {});
  }, [user, notes]);

  const setNote = useCallback((prompt, field, value) => {
    setNotes((prev) => ({
      ...prev,
      [prompt]: {
        ...(prev[prompt] ?? { situation: '', task: '', action: '', result: '' }),
        [field]: value,
      },
    }));
  }, []);

  return { prompts: BEHAVIORAL_PROMPTS, notes, setNote };
}
