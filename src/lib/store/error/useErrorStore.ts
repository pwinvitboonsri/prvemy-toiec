import { create } from "zustand";

import type { AppError } from "@/types/error";

type ErrorState = {
  errors: AppError[];
  addError: (error: AppError) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
};

export const useErrorStore = create<ErrorState>((set) => ({
  errors: [],
  addError: (error) =>
    set((state) => ({
      errors: [error, ...state.errors.filter((item) => item.id !== error.id)],
    })),
  removeError: (id) =>
    set((state) => ({
      errors: state.errors.filter((error) => error.id !== id),
    })),
  clearErrors: () => set({ errors: [] }),
}));
