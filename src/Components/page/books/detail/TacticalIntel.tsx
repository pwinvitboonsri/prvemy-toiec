"use client";

import { Lightbulb, ScanEye, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/Button/Button";

interface TacticalIntelProps {
  isLocked?: boolean;
}

export function TacticalIntel({ isLocked = false }: TacticalIntelProps) {
  return (
    <div className="bg-card border-2 border-foreground p-0 flex flex-col relative overflow-visible h-[40%]">
      {/* --- DECORATIVE: RIGHT SIDE TAB --- */}
      {/* This creates the yellow "Restricted" tab sticking out the side */}
      <div className="absolute -right-3 top-8 bottom-8 w-4 bg-accent rounded-r-md flex items-center justify-center border-l border-foreground shadow-sm z-0">
        <span className="text-[8px] font-bold text-accent-foreground transform rotate-90 whitespace-nowrap tracking-widest opacity-60">
          RESTRICTED
        </span>
      </div>

      {/* --- MAIN CARD CONTAINER --- */}
      <div className="relative z-10 bg-card flex-1 flex flex-col h-full overflow-hidden border-2 border-transparent">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b-2 border-foreground bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="bg-foreground text-background p-1">
              <ScanEye className="w-3 h-3" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider">
              Tactical Intel
            </span>
          </div>
          <div className="flex gap-4">
            <div className="p-2 w-16 text-center text-white shrink-0 bg-zinc-900">
              <span className="block text-[8px] uppercase opacity-60">
                Pace
              </span>
              <span className="block text-lg font-black leading-none">45s</span>
              <span className="block text-[8px] opacity-60">/ Q</span>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        {isLocked ? (
          /* --- LOCKED STATE (Classified) --- */
          <div className="flex-1 relative bg-muted/10 p-6 flex flex-col justify-center items-center min-h-[240px]">
            {/* REDACTED BACKGROUND LINES */}
            <div className="absolute inset-0 p-8 opacity-10 select-none pointer-events-none flex flex-col justify-center gap-4">
              <div className="h-3 w-full bg-foreground/80"></div>
              <div className="h-3 w-3/4 bg-foreground/80"></div>
              <div className="h-3 w-5/6 bg-foreground/80"></div>
              <div className="h-3 w-full bg-foreground/80"></div>
              <div className="h-3 w-1/2 bg-foreground/80"></div>
              <div className="h-3 w-full bg-foreground/80"></div>
            </div>

            {/* LOCK MODAL */}
            <div className="relative z-10 bg-card border-2 border-accent p-6 shadow-[8px_8px_0px_var(--foreground)] text-center max-w-[260px] w-full">
              <div className="w-12 h-12 bg-accent rounded-full border-2 border-foreground flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-accent-foreground" />
              </div>

              <h3 className="font-black uppercase text-lg mb-2 tracking-tight">
                Classified Data
              </h3>

              <p className="font-mono text-[10px] text-muted-foreground leading-tight mb-5">
                Advanced threat analysis and keyword recon available for Premium
                Agents only.
              </p>

              <Button
                variant="default"
                className="w-full h-10 text-[10px] font-bold uppercase border-2 border-transparent hover:border-foreground"
              >
                Upgrade Clearance
              </Button>
            </div>
          </div>
        ) : (
          /* --- UNLOCKED STATE (Actual Data) --- */
          <div
            id="intel-unlocked"
            className="flex flex-col flex-1 justify-center p-5 space-y-6"
          >
            {/* Section 1: Threat Level */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="mb-2 text-[10px] font-bold text-gray-400 uppercase">
                  Threat Level
                </p>
                <div className="flex gap-1 mb-1">
                  <div className="w-full h-2 bg-zinc-900"></div>
                  <div className="w-full h-2 bg-zinc-900"></div>
                  <div className="w-full h-2 bg-yellow-400 border border-zinc-900"></div>
                  <div className="w-full h-2 bg-white border border-zinc-900"></div>
                  <div className="w-full h-2 bg-white border border-zinc-900"></div>
                </div>
                <div className="flex justify-between font-mono text-[8px] uppercase opacity-60">
                  <span>Low</span>
                  <span className="font-bold text-zinc-900">Medium</span>
                  <span>High</span>
                </div>
              </div>

              {/* Section 2: Global Avg */}
              <div>
                <p className="mb-2 text-[10px] font-bold text-gray-400 uppercase">
                  Global Avg.
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-black text-blue-600">715</span>
                  <span className="mb-1 text-[10px] font-bold text-gray-400">
                    pts
                  </span>
                </div>
                <div className="mt-1 w-full h-1 bg-gray-100">
                  <div className="h-full bg-blue-600 w-[72%]"></div>
                </div>
              </div>
            </div>

            {/* Section 3: Topic Composition */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Topic Composition
                </p>
              </div>
              <div className="flex h-4 border shadow-sm border-zinc-900">
                <div
                  className="flex items-center justify-center w-[40%] text-[8px] font-bold text-white bg-blue-600"
                  title="Corporate"
                >
                  CORP 40%
                </div>
                <div
                  className="flex items-center justify-center w-[35%] text-[8px] font-bold text-white bg-red-500"
                  title="Daily Life"
                >
                  DAILY 35%
                </div>
                <div
                  className="flex items-center justify-center w-[25%] text-[8px] font-bold text-zinc-900 bg-yellow-400"
                  title="Travel"
                >
                  TRVL 25%
                </div>
              </div>
            </div>

            {/* Section 4: High-Value Vocabulary */}
            <div>
              <p className="mb-2 text-[10px] font-bold text-gray-400 uppercase">
                High-Value Vocabulary
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className="flex gap-2 items-center px-2 py-1 font-mono text-[10px] bg-white border cursor-help hover:bg-gray-50 border-zinc-900"
                  title="Noun: An asset or object bought or obtained."
                >
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Acquisition
                </div>
                <div
                  className="flex gap-2 items-center px-2 py-1 font-mono text-[10px] bg-white border cursor-help hover:bg-gray-50 border-zinc-900"
                  title="Noun: A planned route or journey."
                >
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  Itinerary
                </div>
                <div
                  className="flex gap-2 items-center px-2 py-1 font-mono text-[10px] bg-white border cursor-help hover:bg-gray-50 border-zinc-900"
                  title="Noun: The state of being responsible for something."
                >
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  Liability
                </div>
                <div
                  className="flex gap-2 items-center px-2 py-1 font-mono text-[10px] bg-white border cursor-help hover:bg-gray-50 border-zinc-900"
                  title="Noun: A sum of money paid regularly by a company."
                >
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  Dividend
                </div>
              </div>
            </div>

            {/* Section 5: Footer / Pace */}
          </div>
        )}
      </div>
    </div>
  );
}
