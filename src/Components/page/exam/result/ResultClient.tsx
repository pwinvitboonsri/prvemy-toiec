"use client";

import { useState } from "react";
import { ExamResult } from "@/lib/api/result/getResult";
import { cn } from "@/lib/utils/utils";
import { ScoreCard } from "./ScoreCard";
import { AnalysisDashboard } from "./AnalysisDashboard";

interface ResultClientProps {
  result: ExamResult;
}

export function ResultClient({ result }: ResultClientProps) {
  const isFreeMode = result.isFullAnalysisAvailable;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#e8e6df] font-sans text-[#1a1a1a] flex flex-col p-4 overflow-x-hidden justify-center">

      {/* STAGE CONTAINER */}
      <div className={cn(
        "flex items-center justify-center min-h-[80vh] perspective-[2000px] transition-all duration-500 ease-in-out px-4",
      )}>

        <div className={cn(
          "relative flex transform-style-3d transition-transform duration-600 cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          isOpen ? "w-[1000px] md:translate-x-0" : "w-[420px]"
        )}>

          {/* PAGE 1: LEFT (Score Card) */}
          <div className={cn(
            "relative w-[420px] bg-white z-20 shrink-0 transition-all duration-600",
            isOpen && "shadow-none border-r-0" // Remove right border when open to merge
          )}>
            <ScoreCard
              result={result}
              isFreeMode={isFreeMode}
              onOpenDossier={() => setIsOpen(!isOpen)}
              isOpen={isOpen}
            />
          </div>

          {/* SPINE */}
          <div className={cn(
            "absolute top-0 bottom-0 left-[417px] w-[6px] bg-[#ddd] z-15 origin-left transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}></div>

          {/* PAGE 2: RIGHT (Analysis) */}
          <div className={cn(
            "w-[580px] bg-[#fdfdfd] border-[3px] border-[#111111] border-l-0 absolute top-0 bottom-0 left-[417px] origin-left transition-all duration-600 cubic-bezier(0.25, 0.46, 0.45, 0.94) z-10 flex flex-col shadow-[inset_10px_0_20px_rgba(0,0,0,0.05)]",
            isOpen
              ? "rotate-y-0 opacity-100 pointer-events-auto"
              : "rotate-y-[-179deg] opacity-0 pointer-events-none"
          )}>
            <AnalysisDashboard result={result} isFreeMode={isFreeMode} />
          </div>

        </div>
      </div>

    </div>
  );
}