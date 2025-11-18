// types/session.ts
export type SessionData = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: {
    id: string;
    email: string;
    role: string;
  };
};
