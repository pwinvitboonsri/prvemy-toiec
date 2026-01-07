"use client";

import { Timer, Menu } from "lucide-react";

interface ExamHUDProps {
  onToggleDrawer: () => void;
  timeLeft: string;
  progress: number;
  section: string;
  onSubmit?: () => void; // Added optional prop
}

export function ExamHUD({
  onToggleDrawer,
  timeLeft,
  progress,
  section,
  onSubmit,
}: ExamHUDProps) {
  return (
    <header className="h-14 md:h-16 bg-[#1a1a1a] text-white flex items-center justify-between px-3 md:px-6 border-b-4 border-[#2d3e75] shrink-0 z-50 gap-2 md:gap-4">
      {/* LEFT: Branding & Menu */}
      <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
        <button
          onClick={onToggleDrawer}
          className="w-9 h-9 flex items-center justify-center border border-white/20 rounded hover:bg-white/10 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Icon (Yellow Box) */}
        <div className="w-8 h-8 bg-[#e4c446] flex items-center justify-center font-black text-[#1a1a1a] text-sm border border-white shrink-0">
          P
        </div>

        {/* Section Info (Compact) */}
        <div className="flex flex-col leading-tight">
          <span className="text-[9px] font-mono opacity-60 uppercase tracking-wider hidden sm:block">
            Current Section
          </span>
          <span className="text-sm font-bold text-white whitespace-nowrap">
            {section}
          </span>
        </div>
      </div>

      {/* CENTER: Progress (Hidden on mobile, visible on desktop) */}
      <div className="hidden lg:flex flex-col gap-1 w-64 mx-4">
        <div className="flex justify-between text-[10px] font-mono opacity-60 uppercase">
          <span>Mission Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2d3e75] to-[#4ade80]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* RIGHT: Timer & Submit */}
      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        <div className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 bg-white/10 border border-white/20 rounded font-mono font-bold text-[#e4c446] text-xs md:text-sm">
          <Timer className="w-3 h-3 md:w-4 md:h-4" />
          <span>{timeLeft}</span>
        </div>
        <button
          onClick={onSubmit}
          className="bg-[#d13a3a] text-white px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-black uppercase hover:bg-white hover:text-[#d13a3a] transition-colors border border-[#d13a3a] shadow-sm"
        >
          Submit
        </button>
      </div>
    </header>
  );
}
