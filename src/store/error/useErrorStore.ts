import { create } from "zustand";
import type { AppError } from "@/types/error";

type ErrorState = {
  errors: AppError[];
  addError: (error: AppError) => void;
  removeError: (id: string) => void;
  removeFieldError: (field: string) => void; // ✅
  removeLocationErrors: (location: string) => void; // ✅
  getFieldError: (field: string) => AppError | undefined; // ✅
  clearErrors: () => void;
};

export const useErrorStore = create<ErrorState>((set, get) => ({
  errors: [],
  addError: (error) =>
    set((state) => ({
      errors: [error, ...state.errors.filter((e) => e.id !== error.id)],
    })),
  removeError: (id) =>
    set((state) => ({
      errors: state.errors.filter((e) => e.id !== id),
    })),
  removeFieldError: (field) =>
    set((state) => ({
      errors: state.errors.filter((e) => e.field !== field),
    })),
  removeLocationErrors: (location) =>
    set((state) => ({
      errors: state.errors.filter((e) => e.location !== location),
    })),
  getFieldError: (field) => {
    return get().errors.find((e) => e.field === field);
  },
  clearErrors: () => set({ errors: [] }),
}));
