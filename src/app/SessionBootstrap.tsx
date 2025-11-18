"use client";

import { useEffect } from "react";
import { useSessionStore } from "@/lib/store/auth/useSessionStore";

export function SessionBootstrap() {
  const initializeSession = useSessionStore((state) => state.initializeSession);

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return null;
}
