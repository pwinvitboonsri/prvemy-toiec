import type { SessionData } from "@/types/session";

const SESSION_KEY = "supabase.session";

export const getStoredSession = (): SessionData | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as SessionData;
  } catch {
    return null;
  }
};
