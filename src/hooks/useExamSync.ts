"use client";

import { useEffect, useRef, useState } from "react";
import { useExamStore } from "@/store/exam/exam-store";

const DEBOUNCE_DELAY = 2000; // Sync 2s after last answer change

export function useExamSync(userTier: string = "guest") {
  const { sessionId, answers, flags, guessed, questionTimes, manifest } = useExamStore();
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

    if (!sessionId || !manifest) return;
    
    // Create a fingerprint of the current state to avoid redundant syncs
    // We include flags and guesses now as well
    const currentStateFingerprint = JSON.stringify({ answers, flags, guessed });
    
    if (currentStateFingerprint === lastSyncedAnswers.current || Object.keys(answers).length === 0) {
        return;
    }

    setSyncStatus("syncing");

    try {
      // Construct rich payload
      const responses = Object.entries(answers).map(([qId, option]) => {
          // Find question in manifest to check correctness
          // This is a bit expensive O(N) but N is small (200) and this is debounced/async
          let question;
          for (const part of manifest.parts) {
              for (const group of part.groups) {
                  const found = group.questions.find(q => q.id === qId);
                  if (found) {
                      question = found;
                      break;
                  }
              }
              if (question) break;
          }

          const isCorrect = question?.correct_answer === option;

          return {
              question_id: qId,
              selected_option: option,
              is_guessed: guessed[qId] || false,
              is_flagged: flags[qId] || false,
              time_taken_ms: questionTimes[qId] || 0,
              is_correct: isCorrect
          };
      });

      const res = await fetch("/api/exam/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, responses }),
      });

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.details || "Sync failed");
      }

      lastSyncedAnswers.current = currentStateFingerprint;
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
  }, [answers, flags, guessed, sessionId, canSyncToCloud]);

  // 2. Emergency Sync
  useEffect(() => {
    const handleUnload = () => {
        const { answers, flags, guessed, questionTimes, manifest } = useExamStore.getState();

        if (canSyncToCloud && sessionId && Object.keys(answers).length > 0 && manifest) {
            // Duplicate logic for close hook - simpler version
            const responses = Object.entries(answers).map(([qId, option]) => {
                let question;
                for (const part of manifest.parts) {
                    for (const group of part.groups) {
                        const found = group.questions.find(q => q.id === qId);
                        if (found) { question = found; break; }
                    }
                    if (question) break;
                }
                const isCorrect = question?.correct_answer === option;

                return {
                    question_id: qId,
                    selected_option: option,
                    is_guessed: guessed[qId] || false,
                    is_flagged: flags[qId] || false,
                    time_taken_ms: questionTimes[qId] || 0,
                    is_correct: isCorrect
                };
            });

            fetch('/api/exam/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, responses }),
                keepalive: true
            });
        }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [sessionId, canSyncToCloud]);

  return { syncStatus, forceSync: syncData };
}