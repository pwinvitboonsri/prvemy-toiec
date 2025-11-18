// useFieldError.ts
import { useErrorStore } from "@/store/error/useErrorStore";

export function useFieldError(field: string) {
  const errors = useErrorStore((state) => state.errors);
  const removeFieldError = useErrorStore((state) => state.removeFieldError);
  const error = errors.find((e) => e.field === field);

  return {
    error,
    clear: () => removeFieldError(field),
  };
}

