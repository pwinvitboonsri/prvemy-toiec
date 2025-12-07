"use client";

import { ArrowRight } from "lucide-react";

interface ActionCardProps {
  onEnterLobby: () => void;
}

export function ActionCard({ onEnterLobby }: ActionCardProps) {
  return (
    <div className="relative z-20 shrink-0 overflow-hidden border-2 border-[#111111] bg-white shadow-[8px_8px_0px_#111111]">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b-2 border-[#111111] bg-[#111111] px-6 py-3 text-white">
        <span className="text-xs font-black uppercase tracking-wider">
          Mission Status: READY
        </span>
        <div className="h-3 w-3 animate-pulse rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center gap-6 p-8 md:flex-row">
        <div className="flex-1">
          <h2 className="mb-2 text-3xl font-black uppercase leading-none text-[#111111]">
            Initialize Mission
          </h2>
          <p className="max-w-sm font-mono text-xs leading-relaxed opacity-60 text-[#111111]">
            Configure test parameters and launch simulation.
            <br />
            <span className="text-[#1d3b88]">Est. Duration: 2h 00m</span>
          </p>
        </div>

        {/* CTA Button */}
        <div className="w-full md:w-auto">
          <button
            onClick={onEnterLobby}
            className="group flex w-full items-center justify-center gap-2 border-2 border-[#111111] bg-[#111111] px-6 py-4 text-sm font-black uppercase text-white shadow-[4px_4px_0px_#111111] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] active:translate-y-0 active:shadow-none md:w-auto"
          >
            Enter Lobby <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}