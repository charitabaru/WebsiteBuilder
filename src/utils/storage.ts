import { BuilderState } from "@/contexts/BuilderContext";

// utils/storage.ts
const STORAGE_KEY = 'builder-state';

export const loadState = (): BuilderState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn('Failed to load state from localStorage', err);
    return undefined;
  }
};

export const saveState = (state: BuilderState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.warn('Failed to save state to localStorage', err);
  }
};