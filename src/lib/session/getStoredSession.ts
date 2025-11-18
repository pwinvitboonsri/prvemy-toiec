// src/lib/session/getStoredSession.ts
import type { SessionData } from "@/store/session/useSessionStore";

export function getStoredSession(): SessionData | null {
  const raw = localStorage.getItem("supabase.session");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
