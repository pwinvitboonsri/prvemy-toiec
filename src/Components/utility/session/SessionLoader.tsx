// src/Components/utility/Session/SessionLoader.tsx
"use client";

import { useEffect } from "react";
import { loadSessionFromStorage } from "@/lib/session/loadSessionFromStorage";

export function SessionLoader() {
  useEffect(() => {
    loadSessionFromStorage();
  }, []);

  return null;
}
