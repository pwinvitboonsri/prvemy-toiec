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
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (rememberME: boolean) => void;
  reset: () => void;
};

export const useSignInStore = create<SignIn>((set) => ({
  email: "",
  password: "",
  rememberME: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setRememberMe: (rememberME) => set({ rememberME }),
  reset: () => set({ email: "", password: "" }),
}));
