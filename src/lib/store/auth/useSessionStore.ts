"use client";

import { supabase } from "@/utils/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";

export type SessionWithExpiry = Session & { expiresAt: number };

type StoredSession = {
  session: SessionWithExpiry | null;
  rememberMe: boolean;
};

type SessionState = {
  session: SessionWithExpiry | null;
  rememberMe: boolean;
  isHydrating: boolean;
  isRefreshing: boolean;
  setSession: (session: Session | null, rememberMe?: boolean) => void;
  clearSession: () => void;
  initializeSession: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const SESSION_KEY = "app.session";
const REMEMBER_ME_KEY = "app.rememberMe";

function normalizeSession(session: Session | null): SessionWithExpiry | null {
  if (!session) return null;

  const expiresAtSeconds = session.expires_at ?? Math.floor(Date.now() / 1000);
  return {
    ...session,
    expiresAt: expiresAtSeconds * 1000,
  };
}

function isSessionExpired(session: SessionWithExpiry | null): boolean {
  if (!session) return true;
  return Date.now() >= session.expiresAt;
}

export function storeSession(session: SessionWithExpiry | null, rememberMe: boolean) {
  if (typeof window === "undefined") return;

  localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify(rememberMe));

  if (!rememberMe || !session) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function loadSessionFromStorage(): StoredSession {
  if (typeof window === "undefined") {
    return { session: null, rememberMe: false };
  }

  const rememberMe = JSON.parse(localStorage.getItem(REMEMBER_ME_KEY) ?? "false");
  const storedSession = localStorage.getItem(SESSION_KEY);

  if (!storedSession) {
    return { session: null, rememberMe };
  }

  try {
    const parsed = JSON.parse(storedSession) as SessionWithExpiry;
    return { session: normalizeSession(parsed), rememberMe };
  } catch (error) {
    console.error("Failed to parse stored session", error);
    return { session: null, rememberMe };
  }
}

export const useSessionStore = create<SessionState>((set, get) => ({
  session: null,
  rememberMe: false,
  isHydrating: false,
  isRefreshing: false,

  setSession: (session, rememberOverride) => {
    const normalizedSession = normalizeSession(session);
    const rememberMe = rememberOverride ?? get().rememberMe;

    set({ session: normalizedSession, rememberMe });
    storeSession(normalizedSession, rememberMe);
  },

  clearSession: () => {
    set({ session: null, rememberMe: false });

    if (typeof window !== "undefined") {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(REMEMBER_ME_KEY);
    }
  },

  initializeSession: async () => {
    if (typeof window === "undefined") return;

    set({ isHydrating: true });

    const { session: storedSession, rememberMe } = loadSessionFromStorage();
    set({ rememberMe });

    if (!storedSession) {
      set({ isHydrating: false });
      return;
    }

    set({ session: storedSession });

    if (rememberMe && isSessionExpired(storedSession)) {
      await get().refreshSession();
      set({ isHydrating: false });
      return;
    }

    set({ isHydrating: false });
  },

  refreshSession: async () => {
    const state = get();
    const activeSession = state.session ?? loadSessionFromStorage().session;

    if (!activeSession?.refresh_token) {
      state.clearSession();
      return;
    }

    set({ isRefreshing: true });

    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: activeSession.refresh_token,
      });

      if (error || !data.session) {
        state.clearSession();
        return;
      }

      state.setSession(data.session, state.rememberMe);
    } catch (error) {
      console.error("Failed to refresh session", error);
      state.clearSession();
    } finally {
      set({ isRefreshing: false });
    }
  },
}));
