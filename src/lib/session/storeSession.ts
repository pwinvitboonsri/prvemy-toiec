// lib/session/storeSession.ts
import type { SessionData } from "@/types/session";

const SESSION_KEY = "supabase.session";

export const storeSession = (session: SessionData, persist: boolean = true) => {
  if (persist && typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
};
