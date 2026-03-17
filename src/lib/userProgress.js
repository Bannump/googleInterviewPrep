import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION = 'users';

export async function getUserProgress(uid) {
  const ref = doc(db, COLLECTION, uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function saveUserProgress(uid, data) {
  const ref = doc(db, COLLECTION, uid);
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function saveDsaProgress(uid, progress) {
  await saveUserProgress(uid, { dsaProgress: progress });
}

export async function saveActiveTimer(uid, payload) {
  await saveUserProgress(uid, { activeTimer: payload ?? null });
}

export async function saveBehavioralNotes(uid, notes) {
  await saveUserProgress(uid, { behavioralNotes: notes });
}

export async function saveCustomBehavioralPrompts(uid, prompts) {
  await saveUserProgress(uid, { customBehavioralPrompts: prompts });
}
