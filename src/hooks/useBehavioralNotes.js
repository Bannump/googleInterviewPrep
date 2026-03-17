import { useState, useEffect, useCallback, useRef } from 'react';
import { STORAGE_KEYS } from '../data/questions';
import { BEHAVIORAL_PROMPTS } from '../data/behavioral';
import { useAuth } from '../contexts/AuthContext';
import {
  getUserProgress,
  saveBehavioralNotes as saveBehavioralNotesFirestore,
  saveCustomBehavioralPrompts as saveCustomBehavioralPromptsFirestore,
} from '../lib/userProgress';

const emptyStar = () => ({ situation: '', task: '', action: '', result: '' });

const defaultNotes = (customPrompts = []) =>
  [...BEHAVIORAL_PROMPTS, ...customPrompts].reduce((acc, prompt) => {
    acc[prompt] = emptyStar();
    return acc;
  }, {});

function loadNotesLocal(customPrompts = []) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BEHAVIORAL_NOTES);
    const def = defaultNotes(customPrompts);
    if (!raw) return def;
    const parsed = JSON.parse(raw);
    return { ...def, ...parsed };
  } catch {
    return defaultNotes(customPrompts);
  }
}

function saveNotesLocal(notes) {
  try {
    localStorage.setItem(STORAGE_KEYS.BEHAVIORAL_NOTES, JSON.stringify(notes));
  } catch (_) {}
}

function loadCustomPromptsLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_BEHAVIORAL_PROMPTS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCustomPromptsLocal(prompts) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_BEHAVIORAL_PROMPTS, JSON.stringify(prompts));
  } catch (_) {}
}

export function useBehavioralNotes() {
  const { user } = useAuth();
  const [customPrompts, setCustomPrompts] = useState(loadCustomPromptsLocal);
  const [notes, setNotes] = useState(() => {
    const custom = loadCustomPromptsLocal();
    return loadNotesLocal(custom) ?? defaultNotes(custom);
  });
  const firestoreLoadDone = useRef(false);

  const allPrompts = [...BEHAVIORAL_PROMPTS, ...customPrompts];

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
        const custom = Array.isArray(data?.customBehavioralPrompts) ? data.customBehavioralPrompts : [];
        setCustomPrompts(custom);
        const def = defaultNotes(custom);
        const loaded = data?.behavioralNotes && typeof data.behavioralNotes === 'object'
          ? { ...def, ...data.behavioralNotes }
          : def;
        setNotes(loaded);
      } catch (_) {
        if (!cancelled) {
          setCustomPrompts([]);
          setNotes(defaultNotes());
        }
      } finally {
        if (!cancelled) firestoreLoadDone.current = true;
      }
    })();
    return () => { cancelled = true; };
  }, [user?.uid]);

  // Persist notes: localStorage when no user, Firestore when user (after initial load)
  useEffect(() => {
    if (!user) {
      saveNotesLocal(notes);
      return;
    }
    if (!firestoreLoadDone.current) return;
    saveBehavioralNotesFirestore(user.uid, notes).catch(() => {});
  }, [user, notes]);

  // Persist custom prompts: localStorage when no user, Firestore when user (after initial load)
  useEffect(() => {
    if (!user) {
      saveCustomPromptsLocal(customPrompts);
      return;
    }
    if (!firestoreLoadDone.current) return;
    saveCustomBehavioralPromptsFirestore(user.uid, customPrompts).catch(() => {});
  }, [user, customPrompts]);

  const setNote = useCallback((prompt, field, value) => {
    setNotes((prev) => ({
      ...prev,
      [prompt]: {
        ...(prev[prompt] ?? emptyStar()),
        [field]: value,
      },
    }));
  }, []);

  const addCustomPrompt = useCallback((text) => {
    const trimmed = (text || '').trim();
    if (!trimmed) return;
    setCustomPrompts((prev) => {
      if (prev.includes(trimmed)) return prev;
      return [...prev, trimmed];
    });
    setNotes((prev) => ({
      ...prev,
      [trimmed]: emptyStar(),
    }));
  }, []);

  const removeCustomPrompt = useCallback((prompt) => {
    setCustomPrompts((prev) => prev.filter((p) => p !== prompt));
    setNotes((prev) => {
      const next = { ...prev };
      delete next[prompt];
      return next;
    });
  }, []);

  return {
    prompts: allPrompts,
    customPrompts,
    notes,
    setNote,
    addCustomPrompt,
    removeCustomPrompt,
  };
}
