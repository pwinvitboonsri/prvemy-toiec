"use client";

import { BarChart2, Lock, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlightRecordsProps {
  userRole?: "guest" | "free" | "premium";
}

export function FlightRecords({ userRole = "free" }: FlightRecordsProps) {
  const isGuest = userRole === "guest";

  return (
    <div className="group relative flex min-h-[16rem] flex-col justify-between overflow-visible border-2 border-[#111111] bg-white transition-all hover:shadow-[8px_8px_0px_#1d3b88]">
      
      {/* Right-side Folder Tab (Confidential) */}
      <div className="absolute -right-3 bottom-8 top-8 z-0 flex w-4 items-center justify-center rounded-r-md border-l border-white bg-[#111111] shadow-sm">
        <span className="whitespace-nowrap text-[8px] font-bold tracking-widest text-white rotate-90 transform">
          CONFIDENTIAL
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-6 pb-0">
        {/* Header */}
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h4 className="mb-1 flex items-center gap-2 text-xl font-black uppercase leading-none text-[#111111]">
              Flight Records
              <BarChart2 className="h-5 w-5 text-[#1d3b88]" />
            </h4>
            <span className="font-mono text-xs opacity-60">PERSONAL DATABASE • ID: BK-1024</span>
          </div>
          {!isGuest && (
            <div className="hidden border border-[#111111] bg-[#ffe800] px-2 py-1 text-[10px] font-bold text-[#111111] md:block">
              4 SORTIES
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="relative mt-2 flex flex-1 flex-col mb-4">
          {isGuest ? (
            /* GUEST STATE (Blurred + Locked) */
            <div className="relative flex flex-1 flex-col justify-center border-2 border-dashed border-gray-400 bg-gray-50 p-4">
              {/* Blurred Background Elements */}
              <div className="pointer-events-none select-none opacity-40 blur-sm filter">
                <div className="mb-4 flex h-16 items-end justify-between px-4">
                  <div className="h-10 w-4 bg-gray-300"></div>
                  <div className="h-14 w-4 bg-gray-400"></div>
                  <div className="h-8 w-4 bg-gray-300"></div>
                  <div className="h-16 w-4 bg-[#1d3b88]"></div>
                  <div className="h-12 w-4 bg-gray-400"></div>
                </div>
                <div className="mb-2 h-2 w-full rounded-full bg-gray-200"></div>
                <div className="h-2 w-3/4 rounded-full bg-gray-200"></div>
              </div>

              {/* Locked Overlay */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                <div className="mb-1 flex items-center gap-2 border-2 border-[#ff3333] bg-white px-4 py-2 shadow-[4px_4px_0px_#1d3b88]">
                  <Lock className="h-4 w-4 text-[#ff3333]" />
                  <span className="text-xs font-black uppercase text-[#ff3333] tracking-wider">Restricted</span>
                </div>
                <span className="font-mono text-[10px] text-gray-500">Login to unlock analytics</span>
              </div>
            </div>
          ) : (
            /* USER STATE (Stats) */
            <div className="mt-4 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Personal Best */}
              <div className="col-span-1 border-r-0 border-dashed border-gray-200 pr-0 lg:border-r-2 lg:pr-4">
                <p className="mb-1 text-[10px] font-bold uppercase text-gray-400">Personal Best</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#1d3b88]">850</span>
                  <span className="text-xs font-bold text-gray-400">/ 990</span>
                </div>
                <div className="mt-2 inline-block border border-green-200 bg-green-50 px-1 font-mono text-[10px] text-green-600">
                  ▲ Top 15%
                </div>
              </div>

              {/* Mini Trend Graph */}
              <div className="col-span-1 flex flex-col justify-between lg:col-span-2">
                <div className="mb-4">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase text-gray-400">Score Trend</p>
                    <span className="font-mono text-[10px] text-[#1d3b88]">+45pts</span>
                  </div>
                  <div className="flex h-12 w-full items-end gap-1">
                    <div className="h-[40%] flex-1 bg-gray-100 hover:bg-[#1d3b88]"></div>
                    <div className="h-[50%] flex-1 bg-gray-100 hover:bg-[#1d3b88]"></div>
                    <div className="h-[45%] flex-1 bg-gray-100 hover:bg-[#1d3b88]"></div>
                    <div className="h-[60%] flex-1 bg-gray-200 hover:bg-[#1d3b88]"></div>
                    <div className="h-[85%] flex-1 bg-[#1d3b88] shadow-sm"></div>
                  </div>
                </div>
                {/* L/R Balance */}
                <div>
                  <div className="mb-1 flex justify-between text-[8px] font-bold uppercase text-gray-400">
                    <span>L: 425</span>
                    <span>R: 425</span>
                  </div>
                  <div className="flex h-1.5 w-full border border-gray-200">
                    <div className="h-full w-[50%] bg-[#1d3b88]"></div>
                    <div className="h-full w-[50%] bg-[#ff3333]"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Link (Access) */}
      <div className="relative z-10 flex items-center justify-between border-t-2 border-dashed border-[#111111] p-4 bg-white">
        <span className="font-mono text-xs font-bold uppercase text-gray-500 transition-colors group-hover:text-[#1d3b88] tracking-wider">
          Access Full Dossier
        </span>
        <div className="flex h-8 w-8 items-center justify-center border-2 border-[#111111] bg-white transition-all group-hover:-translate-y-1 group-hover:shadow-[2px_2px_0px_#111111]">
          <ArrowUpRight className="h-4 w-4 text-[#111111]" />
        </div>
      </div>
    </div>
  );
}