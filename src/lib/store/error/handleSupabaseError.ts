import type { AuthError, PostgrestError } from "@supabase/supabase-js";

import { useErrorStore } from "@/lib/store/error/useErrorStore";
import type { AppError } from "@/types/error";

const SUPABASE_ERROR_TITLE = "Supabase Error";

export function handleSupabaseError(
  error: PostgrestError | AuthError,
  context?: string
) {
  const { addError } = useErrorStore.getState();

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);
  const timestamp = new Date().toISOString();
  const details =
    "details" in error && error.details
      ? `${error.message} (${error.details})`
      : error.message;

  const appError: AppError = {
    id,
    source: "supabase",
    title: context ? `${SUPABASE_ERROR_TITLE}: ${context}` : SUPABASE_ERROR_TITLE,
    message: details ?? "Unexpected Supabase error",
    page: context,
    timestamp,
    autoDismiss: false,
  };

  addError(appError);
}
