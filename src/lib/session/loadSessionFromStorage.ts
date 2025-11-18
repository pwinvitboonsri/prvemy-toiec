import { useSessionStore } from "@/store/session/useSessionStore";
import type { SessionData } from "@/types/session";

export async function loadSessionFromStorage() {
  const raw = localStorage.getItem("supabase.session");
  if (!raw) return;

  try {
    const session: SessionData = JSON.parse(raw);

    // If not expired, just set it
    if (Date.now() < session.expiresAt) {
      useSessionStore.getState().setSession(session);
      return;
    }

    // If expired but refreshToken exists, try refreshing
    if (session.refreshToken) {
      useSessionStore.getState().setSession(session); // temporarily set it to access refreshToken
      await useSessionStore.getState().refreshSession(); // refresh in place
    } else {
      // No refresh token — clear it
      localStorage.removeItem("supabase.session");
    }
  } catch (error) {
    console.error("⚠️ Failed to load session:", error);
    localStorage.removeItem("supabase.session");
  }
}
