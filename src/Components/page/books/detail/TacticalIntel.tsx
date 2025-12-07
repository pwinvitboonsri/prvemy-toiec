"use client";

import { ScanEye, Lock } from "lucide-react";
import { Button } from "@/Components/ui/Button/Button";

interface TacticalIntelProps {
  isLocked?: boolean;
}

export function TacticalIntel({ isLocked = false }: TacticalIntelProps) {
  return (
    <div className="relative flex h-full min-h-[280px] flex-col overflow-visible border-2 border-[#111111] bg-white p-0">
      
      {/* Right-side Tab (Restricted - Yellow) */}
      <div className="absolute -right-3 bottom-8 top-8 z-0 flex w-4 items-center justify-center rounded-r-md border-l border-[#111111] bg-[#ffe800] shadow-sm">
        <span className="whitespace-nowrap text-[8px] font-bold tracking-widest text-[#111111] opacity-60 rotate-90 transform">
          RESTRICTED
        </span>
      </div>

      <div className="relative z-10 flex h-full flex-1 flex-col overflow-hidden border-2 border-transparent bg-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#111111] bg-gray-50 p-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#111111] p-1 text-white">
              <ScanEye className="h-3 w-3" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-[#111111]">
              Tactical Intel
            </span>
          </div>
          <span className="font-mono text-[10px] opacity-50">REF: V-2024</span>
        </div>

        {isLocked ? (
          /* LOCKED STATE */
          <div className="relative flex flex-1 flex-col items-center justify-center bg-gray-100 p-5">
            {/* Background Redacted Effect */}
            <div className="absolute inset-0 space-y-3 overflow-hidden p-6 opacity-10 pointer-events-none select-none">
              <div className="h-2 w-full bg-black"></div>
              <div className="h-2 w-3/4 bg-black"></div>
              <div className="h-2 w-5/6 bg-black"></div>
              <div className="h-2 w-full bg-black"></div>
              <div className="h-2 w-1/2 bg-black"></div>
              <div className="h-2 w-full bg-black"></div>
            </div>

            {/* Lock Badge */}
            <div className="relative z-10 max-w-[200px] border-2 border-[#ffe800] bg-white p-4 text-center shadow-[4px_4px_0px_#111111]">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#111111] bg-[#ffe800]">
                <Lock className="h-5 w-5 text-[#111111]" />
              </div>
              <h5 className="mb-1 text-sm font-black uppercase text-[#111111]">Classified Data</h5>
              <p className="mb-3 font-mono text-[10px] leading-tight text-gray-500">
                Advanced threat analysis and keyword recon available for Premium Agents only.
              </p>
              <Button className="w-full h-auto py-2 text-[10px] font-bold uppercase bg-[#111111] text-white hover:bg-[#1d3b88] rounded-none border-0">
                Upgrade Clearance
              </Button>
            </div>
          </div>
        ) : (
          /* UNLOCKED STATE */
          <div className="flex flex-1 flex-col justify-center space-y-6 p-5">
            {/* Row 1: Threat Level & Global */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase text-gray-400">Threat Level</p>
                <div className="mb-1 flex gap-1">
                  <div className="h-2 w-full bg-[#111111]"></div>
                  <div className="h-2 w-full bg-[#111111]"></div>
                  <div className="h-2 w-full border border-[#111111] bg-[#ffe800]"></div>
                  <div className="h-2 w-full border border-[#111111] bg-white"></div>
                </div>
                <div className="flex justify-between font-mono text-[8px] uppercase opacity-60">
                  <span>Low</span>
                  <span className="font-bold text-[#111111]">Medium</span>
                  <span>High</span>
                </div>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase text-gray-400">Global Avg.</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-black text-[#1d3b88]">715</span>
                  <span className="mb-1 text-[10px] font-bold text-gray-400">pts</span>
                </div>
                <div className="mt-1 h-1 w-full bg-gray-100">
                  <div className="h-full bg-[#1d3b88]" style={{ width: "72%" }}></div>
                </div>
              </div>
            </div>

            {/* Row 2: Vocabulary */}
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase text-gray-400">High-Value Vocabulary</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                    {w: "Acquisition", c: "bg-[#ff3333]"}, 
                    {w: "Itinerary", c: "bg-[#1d3b88]"}, 
                    {w: "Liability", c: "bg-[#ffe800]"}, 
                    {w: "Dividend", c: "bg-gray-400"}
                ].map((item) => (
                    <div key={item.w} className="flex cursor-help items-center gap-2 border border-[#111111] bg-white px-2 py-1 font-mono text-[10px] hover:bg-gray-50">
                        <div className={`h-1.5 w-1.5 rounded-full ${item.c}`}></div>
                        {item.w}
                    </div>
                ))}
              </div>
            </div>

            {/* Row 3: Pace */}
            <div className="flex gap-4">
                <div className="shrink-0 w-16 bg-[#111111] p-2 text-center text-white">
                    <span className="block text-[8px] uppercase opacity-60">Pace</span>
                    <span className="block text-lg font-black leading-none">45s</span>
                    <span className="block text-[8px] opacity-60">/ Q</span>
                </div>
                <div className="flex-1 border-l-2 border-[#111111] bg-[#ffe800]/20 p-2 font-mono text-[10px]">
                    <p className="leading-tight opacity-80">
                        <strong>NOTE:</strong> Heavy focus on email threads in Part 7.
                    </p>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}