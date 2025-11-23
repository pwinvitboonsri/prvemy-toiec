"use client";

import { useEffect } from "react";
import { loadSessionFromStorage } from "@/lib/session/loadSessionFromStorage";

export const SessionLoader = () => {
  useEffect(() => {
    loadSessionFromStorage();
  }, []);

  return null;
};
