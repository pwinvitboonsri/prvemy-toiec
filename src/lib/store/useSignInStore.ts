// stores/useAuthStore.ts
import { create } from "zustand";

type SignInError = {
  title: string;
  message: string;
} | null;

type SignIn = {
  email: string;
  password: string;
  rememberME: boolean;
  error: SignInError;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (rememberME: boolean) => void;
  setError: (error: SignInError) => void;
  reset: () => void;
};

export const useSignInStore = create<SignIn>((set) => ({
  email: "",
  password: "",
  rememberME: false,
  error: null,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setRememberMe: (rememberME) => set({ rememberME }),
  setError: (error) => set({ error }),
  reset: () => set({ email: "", password: "" }),
}));
