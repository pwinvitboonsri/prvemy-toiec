"use client";

import { useState, useEffect } from "react";
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
  ShoppingCart,
  LogIn,
  Zap,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { SwitchComponent as Switch } from "@/Components/ui/SwitchComponent";

// --- Types ---
export type AccessType = "guest" | "free" | "premium" | "one-time";
export type UserStatus = "guest" | "free" | "premium";

interface SetupConsoleProps {
  // Config passed from parent
  accessState: {
    state: string;
    title?: string;
    message?: string;
    icon?: any;
    variant?: "default" | "destructive" | "outline" | "ghost" | "link";
  };
}

// --- CONSTANTS ---
const PART_DETAILS: Record<number, string> = {
  1: "Photographs",
  2: "Q&A",
  3: "Conversations",
  4: "Talks",
  5: "Sentences",
  6: "Text Completion",
  7: "Reading Comp",
};

// --- Sub-components for Riso UI ---
function ModeTab({ active, icon: Icon, label, onClick, isLast = false }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex h-12 items-center justify-center gap-2 border-2 border-[#111111] text-xs font-black uppercase transition-all active:scale-[0.98]",
        !isLast ? "border-r-0 md:border-r-2" : "border-l-0",
        active
          ? "bg-[#ffe800] text-[#111111] shadow-[inset_3px_3px_0px_rgba(0,0,0,0.1)]"
          : "bg-white text-[#111111] hover:bg-gray-50"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

function SpeedPill({ active, value, onClick, disabled }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "border-2 border-[#111111] px-2 py-1 text-[10px] font-bold transition-all active:scale-95",
        active
          ? "bg-[#111111] text-white"
          : "bg-white text-[#111111] opacity-50 hover:opacity-100",
        disabled && "cursor-not-allowed opacity-30 hover:opacity-30 bg-gray-100"
      )}
    >
      {value}
    </button>
  );
}

export function SetupConsole({ accessState }: SetupConsoleProps) {
  // --- Local State for Settings ---
  const [mode, setMode] = useState<"simulation" | "practice">("simulation");
  const [scope, setScope] = useState<"full" | "custom">("full");
  const [timer, setTimer] = useState(120);
  const [speed, setSpeed] = useState(1.0);
  const [view, setView] = useState<"paper" | "computer">("paper");

  // New State for Selected Parts
  // Default to all selected, but this tracks user preference for 'Custom' mode
  const [selectedParts, setSelectedParts] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7,
  ]);

  const isSim = mode === "simulation";
  const isAllowed = accessState.state === "allowed";

  // Handler for toggling parts
  const togglePart = (partNum: number) => {
    if (scope === "full") return; // Cannot toggle in full mode

    setSelectedParts((prev) => {
      if (prev.includes(partNum)) {
        // Prevent unchecking the last remaining part (optional UX choice)
        if (prev.length === 1) return prev;
        return prev.filter((p) => p !== partNum);
      } else {
        return [...prev, partNum].sort((a, b) => a - b);
      }
    });
  };

  // Effect: When switching to 'full', auto-select everything.
  useEffect(() => {
    if (scope === "full") {
      setSelectedParts([1, 2, 3, 4, 5, 6, 7]);
    }
  }, [scope]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* --- CONTENT AREA (Scrollable) --- */}
      <div className="flex-1 overflow-y-auto">
        {isAllowed ? (
          /* ALLOWED STATE: Show Settings Form */
          <div className="grid grid-cols-1 gap-8 p-4 md:p-8 md:grid-cols-12">
            {/* --- LEFT COL: OPS --- */}
            <div className="space-y-8 border-r-0 border-dashed border-[#111111]/20 pr-0 md:col-span-7 md:border-r-2 md:pr-8">
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
                    onClick={() => {
                      setMode("simulation");
                      setScope("full");
                      setSpeed(1.0);
                    }}
                  />
                  <ModeTab
                    active={mode === "practice"}
                    icon={Wrench}
                    label="Practice"
                    onClick={() => setMode("practice")}
                    isLast
                  />
                </div>
                <p
                  className={cn(
                    "mt-2 font-mono text-[10px]",
                    isSim ? "text-[#1d3b88]" : "text-[#111111]"
                  )}
                >
                  {isSim
                    ? "*Strict timing. No pausing. Full Test only."
                    : "*Custom settings enabled."}
                </p>
              </div>

              {/* 2. Scope */}
              <div
                className={cn(
                  "transition-opacity duration-200",
                  isSim && "opacity-50 pointer-events-none"
                )}
              >
                <div className="mb-3 flex items-end justify-between">
                  <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                    <Layers className="h-3 w-3" /> Mission Scope
                  </h4>
                  <div className="flex gap-3 text-[10px] font-bold">
                    <button
                      onClick={() => setScope("full")}
                      className={cn(
                        "transition-colors",
                        scope === "full"
                          ? "text-[#1d3b88] underline decoration-[#1d3b88] decoration-2 underline-offset-4"
                          : "text-gray-400 hover:text-[#111111]"
                      )}
                    >
                      Full Battery
                    </button>
                    <button
                      onClick={() => setScope("custom")}
                      className={cn(
                        "transition-colors",
                        scope === "custom"
                          ? "text-[#1d3b88] underline decoration-[#1d3b88] decoration-2 underline-offset-4"
                          : "text-gray-400 hover:text-[#111111]"
                      )}
                    >
                      Custom
                    </button>
                  </div>
                </div>

                {/* Visual Grid Mockup */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Listening Column */}
                  <div className="space-y-1">
                    <span className="mb-1 block text-[8px] font-bold uppercase text-gray-400">
                      Listening
                    </span>
                    {[1, 2, 3, 4].map((p) => {
                      const isChecked = selectedParts.includes(p);
                      return (
                        <button
                          key={p}
                          onClick={() => togglePart(p)}
                          disabled={scope === "full"}
                          className={cn(
                            "flex w-full items-center gap-2 border border-gray-200 p-2 transition-all hover:bg-gray-50 active:scale-[0.99]",
                            scope === "full" &&
                              "cursor-not-allowed bg-gray-50 opacity-100",
                            !isChecked &&
                              scope !== "full" &&
                              "opacity-50 hover:opacity-100"
                          )}
                        >
                          <div
                            className={cn(
                              "h-4 w-4 border-2 border-[#111111] relative shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transition-colors flex items-center justify-center shrink-0",
                              isChecked ? "bg-[#1d3b88]" : "bg-white"
                            )}
                          >
                            {isChecked && (
                              <Check
                                className="text-white w-3 h-3"
                                strokeWidth={4}
                              />
                            )}
                          </div>
                          <div className="flex flex-col items-start leading-none">
                            <span
                              className={cn(
                                "text-[10px] font-bold uppercase",
                                isChecked ? "text-[#111111]" : "text-gray-400"
                              )}
                            >
                              Part {p}
                            </span>
                            <span className="text-[9px] mt-1 font-mono text-gray-500 uppercase tracking-tight">
                              {PART_DETAILS[p]}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Reading Column */}
                  <div className="space-y-1">
                    <span className="mb-1 block text-[8px] font-bold uppercase text-gray-400">
                      Reading
                    </span>
                    {[5, 6, 7].map((p) => {
                      const isChecked = selectedParts.includes(p);
                      return (
                        <button
                          key={p}
                          onClick={() => togglePart(p)}
                          disabled={scope === "full"}
                          className={cn(
                            "flex w-full items-center gap-2 border border-gray-200 p-2 transition-all hover:bg-gray-50 active:scale-[0.99]",
                            scope === "full" &&
                              "cursor-not-allowed bg-gray-50 opacity-100",
                            !isChecked &&
                              scope !== "full" &&
                              "opacity-50 hover:opacity-100"
                          )}
                        >
                          <div
                            className={cn(
                              "h-4 w-4 border-2 border-[#111111] relative shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transition-colors flex items-center justify-center shrink-0",
                              isChecked ? "bg-[#1d3b88]" : "bg-white"
                            )}
                          >
                            {isChecked && (
                              <Check
                                className="text-white w-3 h-3"
                                strokeWidth={4}
                              />
                            )}
                          </div>
                          <div className="flex flex-col items-start leading-none">
                            <span
                              className={cn(
                                "text-[10px] font-bold uppercase",
                                isChecked ? "text-[#111111]" : "text-gray-400"
                              )}
                            >
                              Part {p}
                            </span>
                            <span className="text-[9px] mt-1 font-mono text-gray-500 uppercase tracking-tight">
                              {PART_DETAILS[p]}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT COL: ENV --- */}
            <div className="space-y-6 md:col-span-5">
              <div className="space-y-4">
                <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                  <Sliders className="h-3 w-3" /> Environment
                </h4>
                {/* Timer */}
                <div className="flex items-center justify-between border border-gray-200 bg-gray-50 p-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
                    Time Limit{" "}
                    {isSim && <Lock className="h-3 w-3 text-[#ff3333]" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={isSim}
                      onClick={() => setTimer((t) => Math.max(0, t - 5))}
                      className="flex h-6 w-6 items-center justify-center border border-[#111111] bg-white font-bold hover:bg-[#111111] hover:text-white disabled:opacity-30 transition-colors"
                    >
                      -
                    </button>
                    <span className="min-w-[40px] text-center font-mono text-xs font-bold text-[#111111]">
                      {timer}m
                    </span>
                    <button
                      disabled={isSim}
                      onClick={() => setTimer((t) => t + 5)}
                      className="flex h-6 w-6 items-center justify-center border border-[#111111] bg-white font-bold hover:bg-[#111111] hover:text-white disabled:opacity-30 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Audio Speed */}
                <div className="flex items-center justify-between border border-gray-200 bg-gray-50 p-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
                    Audio Speed{" "}
                    {isSim && <Lock className="h-3 w-3 text-[#ff3333]" />}
                  </div>
                  <div className="flex gap-1">
                    {[1.0, 1.2, 1.5].map((val) => (
                      <SpeedPill
                        key={val}
                        active={speed === val}
                        value={`${val.toFixed(1)}x`}
                        onClick={() => setSpeed(val)}
                        disabled={isSim}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* BLOCKED STATE: Gatekeeper UI */
          <div className="flex h-full flex-col items-center justify-center p-12 text-center">
            <div
              className={cn(
                "mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#111111] shadow-[4px_4px_0px_#111111]",
                accessState.variant === "destructive"
                  ? "bg-[#ff3333] text-white"
                  : "bg-[#ffe800] text-[#111111]"
              )}
            >
              {accessState.icon && <accessState.icon className="h-8 w-8" />}
            </div>
            <h2 className="mb-2 text-3xl font-black uppercase text-[#111111]">
              {accessState.title}
            </h2>
            <p className="max-w-xs font-mono text-sm text-gray-500 mb-8">
              {accessState.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
