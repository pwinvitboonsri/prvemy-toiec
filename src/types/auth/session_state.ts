import { SessionData } from "@/types/auth/session";

export type SessionState = {
  session: SessionData | null;
  isSessionLoaded: boolean;
  setSession: (session: SessionData) => void;
  clearSession: () => void;
  refreshSession: () => Promise<void>;
};
