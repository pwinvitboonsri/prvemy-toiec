"use client";

import { useEffect, useRef, useState } from "react";
import { useExamStore } from "@/store/exam/exam-store";

const DEBOUNCE_DELAY = 2000; // Sync 2s after last answer change

export function useExamSync(userTier: string = "guest") {
  const { sessionId, answers } = useExamStore();
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "error">("idle");
  
  const lastSyncedAnswers = useRef<string>(""); 
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to check if syncing is allowed for this user
  const canSyncToCloud = ["silver", "gold", "platinum", "premium"].includes(userTier);

  const syncData = async () => {
    // 1. If not a paid user, we skip cloud sync entirely.
    // Zustand persist middleware handles LocalStorage automatically.
    if (!canSyncToCloud) {
        return; 
    }

    if (!sessionId) return;
    
    const currentAnswersString = JSON.stringify(answers);
    
    if (currentAnswersString === lastSyncedAnswers.current || Object.keys(answers).length === 0) {
        return;
    }

    setSyncStatus("syncing");

    try {
      const res = await fetch("/api/exam/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, answers }),
      });

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.details || "Sync failed");
      }

      lastSyncedAnswers.current = currentAnswersString;
      setSyncStatus("idle");
    } catch (error) {
      console.error("Auto-sync error:", error);
      setSyncStatus("error");
    }
  };

  // 1. Debounced Sync (Only runs for Premium Users)
  useEffect(() => {
    if (!canSyncToCloud || !sessionId) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      syncData();
    }, DEBOUNCE_DELAY);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, sessionId, canSyncToCloud]);

  // 2. Emergency Sync
  useEffect(() => {
    const handleUnload = () => {
        if (canSyncToCloud && sessionId && Object.keys(answers).length > 0) {
            fetch('/api/exam/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, answers }),
                keepalive: true
            });
        }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [answers, sessionId, canSyncToCloud]);

  return { syncStatus, forceSync: syncData };
}