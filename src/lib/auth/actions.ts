// lib/auth/actions.ts
import { supabase } from "../../../utils/supabase/client";

export async function signInWithEmail(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(email: string, password: string) {
  return await supabase.auth.signUp({ email, password });
}

export async function signInWithMagicLink(email: string) {
  return await supabase.auth.signInWithOtp({ email });
}
