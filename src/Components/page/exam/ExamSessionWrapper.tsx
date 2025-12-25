"use client";

import { useEffect, useRef, useState } from "react";
import { useExamStore } from "@/store/exam/exam-store";
import { ExamInterface } from "./ExamContext";
import { ExamManifest } from "@/types/exam";
import { Loader2 } from "lucide-react";

interface ExamSessionWrapperProps {
  manifest: ExamManifest;
  initialAnswers?: Record<string, string>;
  sessionId?: string | null;
  userTier?: string; // <--- New prop
}

export function ExamSessionWrapper({ manifest, initialAnswers, sessionId, userTier }: ExamSessionWrapperProps) {
  const initialize = useExamStore((state) => state.initialize);
  const [isReady, setIsReady] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      initialize(manifest, initialAnswers, sessionId);
      initializedRef.current = true;
      setIsReady(true);
    }
  }, [manifest, initialAnswers, sessionId, initialize]);

  if (!isReady) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#e8e6df] text-[#1a1a1a]">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#2d3e75]" />
        <h2 className="font-black uppercase tracking-widest">Loading Mission Data...</h2>
      </div>
    );
  }

  // Pass userTier to interface
  return <ExamInterface userTier={userTier} />;
}
