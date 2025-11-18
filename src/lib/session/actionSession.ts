import { storeSession } from "./storeSession";
import type { SessionData } from "@/types/session";

type ActionSessionProps = {
  data: { session?: any }; // Supabase login response
  rememberMe: boolean;
  setSession: (s: SessionData) => void;
  redirect: (path: string) => void;
};

export const actionSession = ({
  data,
  rememberMe,
  setSession,
  redirect,
}: ActionSessionProps): void => {
  const sessionRaw = data?.session;
  if (!sessionRaw) return;

  const {
    access_token,
    refresh_token,
    expires_at,
    user,
  } = sessionRaw;

  // Defensive checks
  if (!access_token || !refresh_token || !user?.id || !user?.email) {
    console.warn("Invalid session response:", sessionRaw);
    return;
  }

  const session: SessionData = {
    accessToken: access_token,
    refreshToken: refresh_token,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // fallback = 1 week

    user: {
      id: user.id,
      email: user.email,
      role: user.role ?? "user", // fallback role if undefined
    },
  };

  setSession(session);               // 🔁 Zustand (memory)
  storeSession(session, rememberMe); // 💾 Persist if requested
  redirect("/");                     // 🧭 Done
};
