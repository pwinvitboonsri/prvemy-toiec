"use client";

import { useState } from "react";
import { cn } from "@/utils/utils";
import { CardComponent } from "@/Components/ui/CardComponent";
import { Clock, HelpCircle, BarChart } from "lucide-react";

interface BookCoverProps {
  title?: string;
  description?: string;
  questionCount?: number;
  duration?: number;
  difficulty?: string;
}

export function BookCover({
  title = "ETS Simulation",
  description = "Official Guide",
  questionCount = 200,
  duration = 120,
  difficulty = "HARD",
}: BookCoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Extract a short code from title for the visual cover (e.g., "ETS Test 1" -> "ETS", "01")
  // Simple heuristic for display purposes
  const titleWords = title.split(" ");
  const bigText = titleWords[0]?.substring(0, 3).toUpperCase() || "ETS";
  const numberText = title.match(/\d+/)?.[0] || "01";

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <CardComponent
        className={cn(
          "relative aspect-[3/4] w-full max-w-full",
          "bg-[#1d3b88] border-foreground",
          "!h-auto"
        )}
        enableHover={false}
        noPadding={true}
      >
        <div className="relative h-full  overflow-hidden ">
          {/* --- DEFAULT COVER --- */}
          <div className="relative h-full ">
            <div className="absolute bottom-0 left-0 top-0 z-20 w-3 md:w-4 border-r border-foreground bg-black/20"></div>

            <div
              className={cn(
                "relative z-10 flex h-full flex-col items-center justify-center text-white mix-blend-screen transition-all duration-300",
                isHovered ? "blur-[2px] opacity-50" : "blur-0 opacity-100"
              )}
            >
              <div className="mb-4 border-4 border-white p-4 md:p-6 text-center">
                <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tighter">
                  {bigText}
                </h2>
                <h2 className="text-6xl md:text-8xl font-black leading-none tracking-tighter">
                  {numberText}
                </h2>
              </div>
              {/* DESCRIPTION DISPLAY */}
              <p className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.2em]  pt-2 text-center p-3">
                {description}
              </p>
            </div>

            <div
              className="absolute inset-0 pointer-events-none opacity-30 z-0"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)",
                backgroundSize: "6px 6px",
              }}
            ></div>
          </div>

          {/* --- DETAILS OVERLAY --- */}
          <div
            className={cn(
              "absolute inset-0 z-30 flex flex-col bg-card text-card-foreground transition-transform duration-300",
              isHovered ? "translate-y-0" : "translate-y-full"
            )}
          >
            <div className="flex-1 flex flex-col p-3">
              <div className="space-y-1 shrink-0">
                <h3 className="text-2xl md:text-3xl font-black uppercase leading-none">
                  Book Details
                </h3>
                <span className="font-mono text-[10px] md:text-xs text-[#1d3b88] uppercase tracking-wide block">
                  Configuration Spec
                </span>
                <div className="h-0.5 w-full bg-foreground mt-2"></div>
              </div>

              <div className="flex-1 flex flex-col justify-end space-y-4 font-mono text-xs md:text-sm font-bold py-4">
                <div className="flex items-end justify-between border-b-2 border-dashed border-foreground/20 pb-2">
                  <span className="flex items-center gap-2 opacity-60">
                    <HelpCircle className="w-4 h-4" /> Questions
                  </span>
                  <span className="text-lg">{questionCount}</span>
                </div>
                <div className="flex items-end justify-between border-b-2 border-dashed border-foreground/20 pb-2">
                  <span className="flex items-center gap-2 opacity-60">
                    <Clock className="w-4 h-4" /> Duration
                  </span>
                  <span className="text-lg">{duration}m</span>
                </div>
                <div className="flex items-end justify-between border-b-2 border-dashed border-foreground/20 pb-2">
                  <span className="flex items-center gap-2 opacity-60">
                    <BarChart className="w-4 h-4" /> Difficulty
                  </span>
                  <span className="text-lg text-[#1d3b88]">{difficulty}</span>
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <div className="bg-[#ffe800] py-3 px-4 text-center text-[10px] md:text-xs font-black uppercase tracking-widest border-t-2 border-foreground text-black">
                Contains 2 Listening / 3 Reading Sections
              </div>
            </div>
          </div>
        </div>
      </CardComponent>
    </div>
  );
}
