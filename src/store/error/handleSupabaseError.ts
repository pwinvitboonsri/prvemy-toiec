import type { AuthError, PostgrestError } from "@supabase/supabase-js";
import { useErrorStore } from "./useErrorStore";
import type { AppError } from "@/types/api/error";

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

  // Remember to use Date.now() from the previous fix
  const timestamp = Date.now();

  const details =
    "details" in error && error.details
      ? `${error.message} (${error.details})`
      : error.message;

  const appError: AppError = {
    id,
    source: "supabase",
    title: context
      ? `${SUPABASE_ERROR_TITLE}: ${context}`
      : SUPABASE_ERROR_TITLE,
    message: details ?? "Unexpected Supabase error",
    timestamp,
    autoDismiss: false,
  };

  addError(appError);
}
