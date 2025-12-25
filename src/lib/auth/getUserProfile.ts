import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

// Define the return type (combines Auth User + Profile Data)
export type UserWithProfile = {
  id: string;
  email?: string;
  subscription_tier?: "free" | "silver" | "gold" | "platinum";
  subscription_status?: "active" | "inactive" | "past_due";
  // Add other profile fields here as needed
} | null;

export const getUserWithProfile = cache(async (): Promise<UserWithProfile> => {
  const supabase = await createClient();

  // 1. Get Auth User
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // 2. Get Profile Data
  // Assuming you have a 'profiles' table linked by 'id'
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier, subscription_status")
    .eq("id", user.id)
    .single();

  // 3. Merge & Return
  // If no profile exists yet (edge case), return basic auth info with defaults
  return {
    id: user.id,
    email: user.email,
    subscription_tier: profile?.subscription_tier || "free",
    subscription_status: profile?.subscription_status || "inactive",
  };
});
