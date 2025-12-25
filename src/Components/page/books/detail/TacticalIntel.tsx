"use client";

import { ScanEye, Lock } from "lucide-react";
import { Button } from "@/Components/ui/Button/Button";
import { CardComponent } from "@/Components/ui/CardComponent";

interface TacticalIntelProps {
  isLocked?: boolean;
}

export function TacticalIntel({ isLocked = false }: TacticalIntelProps) {
  return (
    <CardComponent
      // 1. Configure Side Tag (Yellow/Restricted)
      sideLabel="RESTRICTED"
      sideLabelVariant="warning" // Uses the Yellow style
      // 2. Container Styling
      className="h-full min-h-[280px] w-full max-w-full overflow-visible z-10 bg-white"
      enableHover={false}
    >
      <div className="flex flex-col h-full -m-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#111111] bg-gray-50 p-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#111111] p-1.5 text-white">
              <ScanEye className="h-4 w-4" />
            </div>
            <span className="text-sm font-black uppercase tracking-wider text-[#111111]">
              Tactical Intel
            </span>
          </div>
          <span className="font-mono text-[10px] opacity-50">REF: V-2024</span>
        </div>

        {/* Content Area */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          {isLocked ? (
            /* LOCKED STATE */
            <div className="relative flex flex-1 flex-col items-center justify-center bg-gray-100 p-5">
              {/* Background Redacted Effect */}
              <div className="absolute inset-0 space-y-4 overflow-hidden p-8 opacity-10 pointer-events-none select-none flex flex-col justify-center">
                <div className="h-3 w-full bg-black"></div>
                <div className="h-3 w-3/4 bg-black"></div>
                <div className="h-3 w-5/6 bg-black"></div>
                <div className="h-3 w-full bg-black"></div>
                <div className="h-3 w-1/2 bg-black"></div>
                <div className="h-3 w-full bg-black"></div>
              </div>

              {/* Lock Badge */}
              <div className="relative z-10 max-w-[240px] border-2 border-[#ffe800] bg-white p-6 text-center shadow-[4px_4px_0px_#111111]">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#111111] bg-[#ffe800]">
                  <Lock className="h-6 w-6 text-[#111111]" />
                </div>
                <h5 className="mb-2 text-sm font-black uppercase text-[#111111]">
                  Classified Data
                </h5>
                <p className="mb-4 font-mono text-[10px] leading-tight text-gray-500">
                  Advanced threat analysis and keyword recon available for
                  Premium Agents only.
                </p>
                <Button
                  variant="default" // Using default (Ink) style which matches the design
                  size="sm"
                  className="w-full h-auto py-3 text-[10px] font-bold uppercase rounded-none border-0 shadow-none hover:shadow-none hover:bg-[#1d3b88]"
                >
                  Upgrade Clearance
                </Button>
              </div>
            </div>
          ) : (
            /* UNLOCKED STATE */
            <div className="flex flex-1 flex-col justify-center space-y-8 p-6">
              {/* Row 1: Threat Level & Global */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase text-gray-400">
                    Threat Level
                  </p>
                  <div className="mb-1 flex gap-1 h-3">
                    <div className="h-full w-full bg-[#111111]"></div>
                    <div className="h-full w-full bg-[#111111]"></div>
                    <div className="h-full w-full border-2 border-[#111111] bg-[#ffe800]"></div>
                    <div className="h-full w-full border-2 border-[#111111] bg-white"></div>
                  </div>
                  <div className="flex justify-between font-mono text-[8px] uppercase opacity-60">
                    <span>Low</span>
                    <span className="font-bold text-[#111111]">Medium</span>
                    <span>High</span>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase text-gray-400">
                    Global Avg.
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-[#1d3b88] leading-none tracking-tighter">
                      715
                    </span>
                    <span className="text-xs font-bold text-gray-400">pts</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-gray-100">
                    <div
                      className="h-full bg-[#1d3b88]"
                      style={{ width: "72%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Row 2: Vocabulary */}
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase text-gray-400">
                  High-Value Vocabulary
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { w: "Acquisition", c: "bg-[#ff3333]" },
                    { w: "Itinerary", c: "bg-[#1d3b88]" },
                    { w: "Liability", c: "bg-[#ffe800]" },
                    { w: "Dividend", c: "bg-gray-400" },
                  ].map((item) => (
                    <div
                      key={item.w}
                      className="flex cursor-help items-center gap-3 border-2 border-[#111111] bg-white px-3 py-2 font-mono text-xs hover:bg-gray-50 transition-colors"
                    >
                      <div className={`h-2 w-2 rounded-full ${item.c}`}></div>
                      {item.w}
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 3: Pace */}
              <div className="flex gap-0 border-2 border-[#111111]">
                <div className="shrink-0 w-20 bg-[#111111] p-2 text-center text-white flex flex-col justify-center">
                  <span className="block text-[8px] uppercase opacity-60 mb-0.5">
                    Pace
                  </span>
                  <span className="block text-2xl font-black leading-none">
                    45s
                  </span>
                  <span className="block text-[8px] opacity-60 mt-0.5">
                    / Q
                  </span>
                </div>
                <div className="flex-1 bg-[#ffe800]/20 p-3 font-mono text-[10px] flex items-center">
                  <p className="leading-tight opacity-80">
                    <strong>NOTE:</strong> Heavy focus on email threads in Part
                    7.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CardComponent>
  );
}
