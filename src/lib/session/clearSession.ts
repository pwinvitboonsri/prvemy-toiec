// src/lib/session/clearSession.ts
import { useSessionStore } from "@/store/session/useSessionStore";

export function clearSession() {
  useSessionStore.getState().clearSession();
  localStorage.removeItem("supabase.session");
}
