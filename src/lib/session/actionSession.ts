import { storeSession } from "@/lib/session/storeSession";
import type { SessionData } from "@/types/session";

type ActionSessionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { session: any };
  rememberMe: boolean;
  setSession: (session: SessionData) => void;
  redirect: (path: string) => void;
};

export const actionSession = ({
  data,
  rememberMe,
  setSession,
  redirect,
}: ActionSessionProps) => {
  if (!data?.session) return;

  const { access_token, refresh_token, expires_at, user } = data.session;

  const session: SessionData = {
    accessToken: access_token,
    refreshToken: rememberMe ? refresh_token : null, // ✅ key logic
    // expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // fallback: 7 days
    expiresAt: Date.now() + 30 * 1000, // fallback: 7 days

    user: {
      id: user.id,
      email: user.email ?? "",
      role: user.role ?? "user",
    },
  };

  setSession(session);
  storeSession(session); // ✅ always store
  redirect("/");
};
