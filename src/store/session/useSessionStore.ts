import { create } from "zustand";

type SessionUser = {
  id: string;
  email: string;
  role: string;
};

export type SessionData = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: SessionUser;
};

type SessionState = {
  session: SessionData | null;
  setSession: (session: SessionData) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  clearSession: () => set({ session: null }),
}));
