"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { UserWithProfile } from "@/lib/auth/getUserProfile";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: UserWithProfile;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: UserWithProfile;
}) {
  const [user, setUser] = useState<UserWithProfile>(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ✅ FIX 1: Sync Server State to Client State
  // When the server re-fetches user data (after login/navigation), update the local state.
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // ✅ FIX 2: Handle "Sign In" Client-Side
      if (
        event === "SIGNED_IN" &&
        session?.user &&
        session.user.id !== user?.id
      ) {
        // Option A: Force a server refresh to get the full profile
        router.refresh();

        // Option B: Optimistically update basic user data (faster, but no profile tier yet)
        // setUser({ ...session.user, subscription_tier: 'free' });
      }

      // Handle "Sign Out"
      if (event === "SIGNED_OUT") {
        setUser(null);
        router.refresh(); // Clear server cache too
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id, router]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
