// lib/session/loadSessionFromStorage.ts
import { useSessionStore } from "@/store/session/useSessionStore";
import { getStoredSession } from "./getStoredSession";
import { clearSession } from "./clearSession";

export function loadSessionFromStorage() {
  const stored = getStoredSession();

  if (!stored) return;

  const now = Date.now();

  if (stored.expiresAt < now) {
    clearSession(); // remove from Zustand + localStorage
    return;
  }

  useSessionStore.getState().setSession(stored);
}
