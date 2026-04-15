import { useState, useEffect, useCallback, useRef } from 'react';
import { STORAGE_KEYS } from '../data/questions';
import { BEHAVIORAL_PROMPTS } from '../data/behavioral';
import { useAuth } from '../contexts/AuthContext';
import {
  getUserProgress,
  saveBehavioralNotes as saveBehavioralNotesFirestore,
  saveCustomBehavioralPrompts as saveCustomBehavioralPromptsFirestore,
  saveBehavioralPromptOrder as saveBehavioralPromptOrderFirestore,
  saveDeletedBehavioralPrompts as saveDeletedBehavioralPromptsFirestore,
} from '../lib/userProgress';

const emptyStar = () => ({ situation: '', task: '', action: '', result: '', storyFlow: '' });

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

function loadOrderLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BEHAVIORAL_PROMPT_ORDER);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function saveOrderLocal(order) {
  try {
    localStorage.setItem(STORAGE_KEYS.BEHAVIORAL_PROMPT_ORDER, JSON.stringify(order));
  } catch (_) {}
}

function loadDeletedPresetsLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DELETED_BEHAVIORAL_PROMPTS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveDeletedPresetsLocal(deleted) {
  try {
    localStorage.setItem(STORAGE_KEYS.DELETED_BEHAVIORAL_PROMPTS, JSON.stringify(deleted));
  } catch (_) {}
}

/** Merge saved order with current preset + custom; drops invalid entries, appends missing. */
function applyOrder(savedOrder, customPrompts, deletedPresets = []) {
  const deletedSet = new Set(deletedPresets);
  const presetSet = new Set(BEHAVIORAL_PROMPTS.filter((p) => !deletedSet.has(p)));
  const customSet = new Set(customPrompts);
  const valid = (p) => presetSet.has(p) || customSet.has(p);
  const order = (savedOrder && Array.isArray(savedOrder) ? savedOrder : []).filter(valid);
  for (const p of BEHAVIORAL_PROMPTS) if (!deletedSet.has(p) && !order.includes(p)) order.push(p);
  for (const p of customPrompts) if (!order.includes(p)) order.push(p);
  return order;
}

export function useBehavioralNotes() {
  const { user } = useAuth();
  const [customPrompts, setCustomPrompts] = useState(loadCustomPromptsLocal);
  const [savedOrder, setSavedOrder] = useState(loadOrderLocal);
  const [deletedPresets, setDeletedPresets] = useState(loadDeletedPresetsLocal);
  const [notes, setNotes] = useState(() => {
    const custom = loadCustomPromptsLocal();
    return loadNotesLocal(custom) ?? defaultNotes(custom);
  });
  const firestoreLoadDone = useRef(false);

  const prompts = applyOrder(savedOrder, customPrompts, deletedPresets);

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
        const order = Array.isArray(data?.behavioralPromptOrder) ? data.behavioralPromptOrder : null;
        setSavedOrder(order);
        const deleted = Array.isArray(data?.deletedBehavioralPrompts) ? data.deletedBehavioralPrompts : [];
        setDeletedPresets(deleted);
        const def = defaultNotes(custom);
        const loaded = data?.behavioralNotes && typeof data.behavioralNotes === 'object'
          ? { ...def, ...data.behavioralNotes }
          : def;
        setNotes(loaded);
      } catch (_) {
        if (!cancelled) {
          setCustomPrompts([]);
          setSavedOrder(null);
          setDeletedPresets([]);
          setNotes(defaultNotes());
        }
      } finally {
        if (!cancelled) firestoreLoadDone.current = true;
      }
    })();
    return () => { cancelled = true; };
  }, [user?.uid]);

  // Persist notes
  useEffect(() => {
    if (!user) { saveNotesLocal(notes); return; }
    if (!firestoreLoadDone.current) return;
    saveBehavioralNotesFirestore(user.uid, notes).catch(() => {});
  }, [user, notes]);

  // Persist custom prompts
  useEffect(() => {
    if (!user) { saveCustomPromptsLocal(customPrompts); return; }
    if (!firestoreLoadDone.current) return;
    saveCustomBehavioralPromptsFirestore(user.uid, customPrompts).catch(() => {});
  }, [user, customPrompts]);

  // Persist order
  useEffect(() => {
    if (!user) { saveOrderLocal(prompts); return; }
    if (!firestoreLoadDone.current) return;
    saveBehavioralPromptOrderFirestore(user.uid, prompts).catch(() => {});
  }, [user, prompts]);

  // Persist deleted presets
  useEffect(() => {
    if (!user) { saveDeletedPresetsLocal(deletedPresets); return; }
    if (!firestoreLoadDone.current) return;
    saveDeletedBehavioralPromptsFirestore(user.uid, deletedPresets).catch(() => {});
  }, [user, deletedPresets]);

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

  /** Delete any prompt — custom or preset. */
  const deletePrompt = useCallback((prompt) => {
    const isCustom = customPrompts.includes(prompt);
    if (isCustom) {
      setCustomPrompts((prev) => prev.filter((p) => p !== prompt));
    } else {
      // Mark preset as deleted so it's filtered out of the list
      setDeletedPresets((prev) => prev.includes(prompt) ? prev : [...prev, prompt]);
    }
    // Remove from saved order and notes either way
    setSavedOrder((prev) => (prev && Array.isArray(prev) ? prev.filter((p) => p !== prompt) : null));
    setNotes((prev) => {
      const next = { ...prev };
      delete next[prompt];
      return next;
    });
  }, [customPrompts]);

  const reorderPrompts = useCallback((fromIndex, toIndex) => {
    setSavedOrder((prev) => {
      const list = prev && Array.isArray(prev) ? [...prev] : [...BEHAVIORAL_PROMPTS, ...customPrompts];
      const merged = applyOrder(list, customPrompts, deletedPresets);
      if (fromIndex < 0 || fromIndex >= merged.length || toIndex < 0 || toIndex >= merged.length) return list;
      const [item] = merged.splice(fromIndex, 1);
      merged.splice(toIndex, 0, item);
      return merged;
    });
  }, [customPrompts, deletedPresets]);

  const renamePrompt = useCallback((oldPrompt, newText) => {
    const newPrompt = (newText || '').trim();
    if (!newPrompt || newPrompt === oldPrompt) return;
    const isCustom = customPrompts.includes(oldPrompt);
    if (isCustom) {
      setCustomPrompts((prev) => prev.map((p) => (p === oldPrompt ? newPrompt : p)));
    } else {
      // Treat renamed preset as: delete old preset, add new custom prompt
      setDeletedPresets((prev) => prev.includes(oldPrompt) ? prev : [...prev, oldPrompt]);
      setCustomPrompts((prev) => prev.includes(newPrompt) ? prev : [...prev, newPrompt]);
    }
    setSavedOrder((prev) =>
      prev && Array.isArray(prev) ? prev.map((p) => (p === oldPrompt ? newPrompt : p)) : null
    );
    setNotes((prev) => {
      const next = { ...prev };
      next[newPrompt] = prev[oldPrompt] ?? emptyStar();
      delete next[oldPrompt];
      return next;
    });
  }, [customPrompts]);

  return {
    prompts,
    customPrompts,
    notes,
    setNote,
    addCustomPrompt,
    deletePrompt,
    reorderPrompts,
    renamePrompt,
  };
}
