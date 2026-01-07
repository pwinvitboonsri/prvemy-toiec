"use client";

import { useEffect, useRef, useState } from "react";
import { useExamStore } from "@/store/exam/exam-store";
import { ExamInterface } from "./ExamInterface";
import { ExamManifest } from "@/types/feature/exam";
import { Loader2 } from "lucide-react";

import { LobbySettings } from "@/types/feature/exam";

interface ExamSessionWrapperProps {
  manifest: ExamManifest;
  initialAnswers?: Record<string, string>;
  sessionId?: string | null;
  userTier?: string;
  settings?: LobbySettings;
}

export function ExamSessionWrapper({ manifest, initialAnswers, sessionId, userTier, settings }: ExamSessionWrapperProps) {
  const initialize = useExamStore((state) => {
    return state.initialize;
  });
  const [isReady, setIsReady] = useState(false);
  const initializedRef = useRef(false);

  // Override manifest duration if custom time limit is set
  const effectiveManifest = {
    ...manifest,
    duration: settings?.time_limit ? settings.time_limit * 60 : manifest.duration
    // Note: Manifest usually checks units (minutes vs seconds). 
    // ExamManifest duration is "Minutes". Setting.time_limit is "Minutes".
    // Wait, types says: duration: number; // Minutes
    // LobbySettings: time_limit: number; // Minutes
    // So no * 60 needed if both are minutes.
    // But page.tsx init logic used * 60 for currentState.timer?
    // Check page.tsx: "timer: settings.time_limit * 60".
    // Correct.
    // Manifest duration implies minutes usually.
  };

  // Correction: duration in manifest is usually minutes.
  // LobbySettings time_limit is minutes.
  // So effectiveManifest duration should be `settings.time_limit || manifest.duration`.

  useEffect(() => {
    if (!initializedRef.current) {
      // Use effectiveManifest
      initialize({
        ...manifest,
        duration: settings?.time_limit || manifest.duration
      }, initialAnswers, sessionId);
      initializedRef.current = true;
      setIsReady(true);
    }
  }, [manifest, initialAnswers, sessionId, initialize, settings]);

  if (!isReady) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#e8e6df] text-[#1a1a1a]">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#2d3e75]" />
        <h2 className="font-black uppercase tracking-widest">Loading Mission Data...</h2>
      </div>
    );
  }

  // Pass userTier to interface
  return <ExamInterface userTier={userTier} settings={settings} />;
}
