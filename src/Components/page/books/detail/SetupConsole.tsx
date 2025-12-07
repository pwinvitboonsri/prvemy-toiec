"use client";

import { useState } from "react";
import {
  Target,
  Wrench,
  Lock,
  Layers,
  FileText,
  Monitor,
  Sliders,
  Eye,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SwitchComponent as Switch } from "@/Components/ui/SwitchComponent";

// --- Sub-components for Riso UI ---

function ModeTab({
  active,
  icon: Icon,
  label,
  onClick,
  isLast = false
}: {
  active: boolean;
  icon: any;
  label: string;
  onClick: () => void;
  isLast?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex h-12 items-center justify-center gap-2 border-2 border-[#111111] text-xs font-bold uppercase transition-all",
        // Remove left border if it's the second item to prevent double borders
        !isLast ? "border-r-0 md:border-r-2" : "border-l-0", 
        active
          ? "bg-[#ffe800] shadow-[inset_3px_3px_0px_rgba(0,0,0,0.1)]"
          : "bg-white hover:bg-gray-50"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

function SpeedPill({ active, value, onClick, disabled }: { active: boolean; value: string; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "border-2 border-[#111111] px-2 py-1 text-[10px] font-bold transition-colors",
        active ? "bg-[#111111] text-white" : "bg-white opacity-50 hover:opacity-100",
        disabled && "cursor-not-allowed opacity-30 hover:opacity-30"
      )}
    >
      {value}
    </button>
  );
}

export function SetupConsole() {
  const [mode, setMode] = useState<"simulation" | "practice">("simulation");
  const [scope, setScope] = useState<"full" | "custom">("full");
  const [timer, setTimer] = useState(120);
  const [speed, setSpeed] = useState(1.0);
  const [view, setView] = useState<"paper" | "computer">("paper");

  const isSim = mode === "simulation";

  return (
    <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-12">
      
      {/* --- LEFT COL: OPERATIONAL PARAMETERS (7 cols) --- */}
      <div className="space-y-8 border-r-0 border-dashed border-gray-200 pr-0 md:col-span-7 md:border-r-2 md:pr-8">
        
        {/* 1. Operation Mode */}
        <div>
          <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
            <Target className="h-3 w-3" /> Operation Mode
          </h4>
          <div className="flex">
            <ModeTab
              active={mode === "simulation"}
              icon={Target}
              label="Simulation"
              onClick={() => { setMode("simulation"); setScope("full"); setSpeed(1.0); }}
            />
            <ModeTab
              active={mode === "practice"}
              icon={Wrench}
              label="Practice"
              onClick={() => setMode("practice")}
              isLast
            />
          </div>
          <p className={cn("mt-2 font-mono text-[10px]", isSim ? "text-[#1d3b88]" : "text-[#111111]")}>
            {isSim ? "*Strict timing. No pausing. Full Test only." : "*Custom settings enabled."}
          </p>
        </div>

        {/* 2. Mission Scope */}
        <div className={cn("transition-opacity duration-200", isSim && "opacity-50 pointer-events-none")}>
          <div className="mb-3 flex items-end justify-between">
            <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
              <Layers className="h-3 w-3" /> Mission Scope
            </h4>
            <div className="flex gap-2 text-[10px] font-bold">
              <button 
                onClick={() => setScope("full")}
                className={cn(scope === "full" ? "text-[#1d3b88] underline decoration-[#1d3b88] decoration-2" : "text-gray-400 hover:text-[#111111]")}
              >
                Full Battery
              </button>
              <button 
                 onClick={() => setScope("custom")}
                 className={cn(scope === "custom" ? "text-[#1d3b88] underline decoration-[#1d3b88] decoration-2" : "text-gray-400 hover:text-[#111111]")}
              >
                Custom
              </button>
            </div>
          </div>

          {/* Part Grid Visual */}
          <div className={cn("grid grid-cols-2 gap-2 transition-opacity", scope === "full" && "opacity-50 pointer-events-none")}>
             <div className="space-y-1">
                <span className="mb-1 block text-[8px] font-bold uppercase text-gray-400">Listening</span>
                {[1,2,3,4].map(p => (
                    <div key={p} className="flex items-center gap-2 border border-gray-200 p-2 opacity-60">
                         <div className="h-4 w-4 border-2 border-[#111111] bg-[#1d3b88] relative"><Check className="text-white w-3 h-3 absolute top-0 left-0" strokeWidth={4} /></div>
                         <span className="text-xs font-bold">Part {p}</span>
                    </div>
                ))}
             </div>
             <div className="space-y-1">
                <span className="mb-1 block text-[8px] font-bold uppercase text-gray-400">Reading</span>
                {[5,6,7].map(p => (
                    <div key={p} className="flex items-center gap-2 border border-gray-200 p-2 opacity-60">
                         <div className="h-4 w-4 border-2 border-[#111111] bg-[#1d3b88] relative"><Check className="text-white w-3 h-3 absolute top-0 left-0" strokeWidth={4} /></div>
                         <span className="text-xs font-bold">Part {p}</span>
                    </div>
                ))}
             </div>
          </div>
        </div>
        
        {/* Practice Only Controls */}
        {!isSim && (
             <div className="space-y-4 pt-2 animate-in fade-in">
                <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase text-gray-500">View Mode</label>
                    <div className="flex">
                        <button onClick={() => setView("paper")} className={cn("flex-1 border-2 border-[#111111] p-2 text-xs font-bold uppercase flex items-center justify-center gap-2", view === "paper" ? "bg-[#ffe800]" : "bg-white")}>
                            <FileText className="w-3 h-3"/> Paper
                        </button>
                        <button onClick={() => setView("computer")} className={cn("flex-1 border-2 border-l-0 border-[#111111] p-2 text-xs font-bold uppercase flex items-center justify-center gap-2", view === "computer" ? "bg-[#ffe800]" : "bg-white")}>
                            <Monitor className="w-3 h-3"/> Screen
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between border-2 border-[#111111] bg-white px-3 py-2">
                    <span className="flex items-center gap-2 text-xs font-bold uppercase">Show Answer</span>
                    <Switch />
                </div>
             </div>
        )}

      </div>

      {/* --- RIGHT COL: ENVIRONMENTAL CONDITIONS (5 cols) --- */}
      <div className="space-y-6 md:col-span-5">
        
        <div className="space-y-4">
            <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                <Sliders className="h-3 w-3" /> Environment
            </h4>

            {/* Timer */}
            <div className="flex items-center justify-between border border-gray-200 bg-gray-50 p-2">
                <div className="flex items-center gap-2 text-xs font-bold">
                    Time Limit {isSim && <Lock className="h-3 w-3 text-[#ff3333]" />}
                </div>
                <div className="flex items-center gap-2">
                    <button disabled={isSim} onClick={() => setTimer(t => Math.max(0, t - 5))} className="flex h-6 w-6 items-center justify-center border border-[#111111] bg-white font-bold hover:bg-gray-100 disabled:opacity-30">-</button>
                    <span className="min-w-[40px] text-center font-mono text-xs font-bold">{timer}m</span>
                    <button disabled={isSim} onClick={() => setTimer(t => t + 5)} className="flex h-6 w-6 items-center justify-center border border-[#111111] bg-white font-bold hover:bg-gray-100 disabled:opacity-30">+</button>
                </div>
            </div>

            {/* Audio Speed */}
            <div className="flex items-center justify-between border border-gray-200 bg-gray-50 p-2">
                <div className="flex items-center gap-2 text-xs font-bold">
                    Audio Speed {isSim && <Lock className="h-3 w-3 text-[#ff3333]" />}
                </div>
                <div className="flex gap-1">
                    <SpeedPill active={speed === 1.0} value="1.0x" onClick={() => setSpeed(1.0)} disabled={isSim} />
                    <SpeedPill active={speed === 1.2} value="1.2x" onClick={() => setSpeed(1.2)} disabled={isSim} />
                    <SpeedPill active={speed === 1.5} value="1.5x" onClick={() => setSpeed(1.5)} disabled={isSim} />
                </div>
            </div>
            
            {/* Ambience */}
            <div className="flex items-center justify-between border border-gray-200 bg-gray-50 p-2">
                <span className="text-xs font-bold">Acoustics</span>
                <select disabled className="cursor-pointer border border-[#111111] bg-white px-2 py-1 text-[10px] font-bold outline-none disabled:opacity-50">
                    <option>Studio (Silent)</option>
                    <option>Exam Hall</option>
                    <option>Cafe</option>
                </select>
            </div>
        </div>

        <div className="space-y-4">
            <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                <Eye className="h-3 w-3" /> Visual & Logic
            </h4>
            
            {/* Font Size */}
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">Text Size</span>
                <div className="flex border border-[#111111]">
                    <button className="bg-[#111111] px-3 py-1 text-xs font-bold text-white">A</button>
                    <button className="bg-white px-3 py-1 text-sm font-bold hover:bg-gray-50">A+</button>
                </div>
            </div>
            
            {/* Mechanics */}
            <div className="space-y-2">
                <label className="group flex cursor-pointer items-center justify-between">
                    <span className="text-xs font-bold transition-colors group-hover:text-[#1d3b88]">Shuffle Questions</span>
                    <Switch disabled />
                </label>
            </div>
        </div>

      </div>
    </div>
  );
}