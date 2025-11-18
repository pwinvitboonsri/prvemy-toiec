import { useSessionStore } from "@/store/session/useSessionStore";
import type { SessionData } from "@/types/session";

export function loadSessionFromStorage() {
  const raw = localStorage.getItem("supabase.session");
  if (!raw) return;

  try {
    const session: SessionData = JSON.parse(raw);

    if (Date.now() > session.expiresAt) {
      // expired — clear storage
      localStorage.removeItem("supabase.session");
      return;
    }

    useSessionStore.getState().setSession(session);
  } catch {
    localStorage.removeItem("supabase.session");
  }
}
