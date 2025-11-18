// src/lib/session/storeSession.ts
import type { SessionData } from "@/store/session/useSessionStore";

export function storeSession(session: SessionData, rememberMe: boolean) {
  if (rememberMe) {
    localStorage.setItem("supabase.session", JSON.stringify(session));
  }
}
