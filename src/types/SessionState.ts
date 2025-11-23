import { SessionData } from "@/types/session";

export type SessionState = {
  session: SessionData | null;
  isSessionLoaded: boolean;
  setSession: (session: SessionData) => void;
  clearSession: () => void;
  refreshSession: () => Promise<void>;
};
