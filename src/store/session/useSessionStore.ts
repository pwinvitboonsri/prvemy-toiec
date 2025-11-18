import { create } from "zustand";
import type { SessionData } from "@/types/session";
import { supabase } from "@/utils/supabase/client";
import { storeSession } from "@/lib/session/storeSession";
import { clearSession as clearStoredSession } from "@/lib/session/clearSession";

type SessionState = {
  session: SessionData | null;
  setSession: (session: SessionData) => void;
  clearSession: () => void;
  refreshSession: () => Promise<void>;
};

export const useSessionStore = create<SessionState>((set, get) => ({
  session: null,

  setSession: (session) => {
    set({ session });
  },

  clearSession: () => {
    set({ session: null });
    clearStoredSession();
  },

  refreshSession: async () => {
    const session = get().session;

    if (!session?.refreshToken) {
      console.warn("No refresh token found");
      return;
    }

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: session.refreshToken,
    });

    if (error || !data.session) {
      console.error("❌ Failed to refresh token", error?.message);
      get().clearSession();
      return;
    }

    const newSession = data.session;

    const refreshedSession: SessionData = {
      accessToken: newSession.access_token,
      refreshToken: newSession.refresh_token,
      expiresAt: newSession.expires_at
        ? newSession.expires_at * 1000
        : Date.now() + 30 * 1000,
      // : Date.now() + 7 * 24 * 60 * 60 * 1000,
      user: {
        id: newSession.user.id,
        email: newSession.user.email ?? "",
        role: newSession.user.role ?? "user",
      },
    };

    set({ session: refreshedSession });
    storeSession(refreshedSession, true); // persist after refresh
  },
}));
