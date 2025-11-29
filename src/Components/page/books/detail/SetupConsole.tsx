"use client";

import { useState } from "react";
import {
  Target,
  Wrench,
  Lock,
  FileText,
  Monitor,
  ClipboardCheck,
} from "lucide-react";
import { SpeedPill, PartCheckbox, ModeTab } from "./DetailComponents";
import { SwitchComponent } from "@/Components/ui/SwitchComponent";
import { Button } from "@/Components/ui/Button/Button";

export function SetupConsole() {
  const [mode, setMode] = useState<"simulation" | "practice">("simulation");
  const [scope, setScope] = useState<"full" | "custom">("full");
  const [speed, setSpeed] = useState(1.0);
  const [timer, setTimer] = useState(120);

  return (
    <div className="bg-card border-2 border-foreground p-6 min-h-[600px] flex flex-col">
      {/* 1. OPERATION MODE */}
      <div className="mb-6">
        <label className="block text-[10px] font-bold uppercase mb-2 text-muted-foreground">
          Operation Mode
        </label>
        <div className="flex">
          <ModeTab
            active={mode === "simulation"}
            icon={Target}
            label="Simulation"
            onClick={() => {
              setMode("simulation");
              setScope("full");
            }}
          />
          <ModeTab
            active={mode === "practice"}
            icon={Wrench}
            label="Practice"
            onClick={() => setMode("practice")}
          />
        </div>
        <p className="font-mono text-[10px] mt-2 text-primary">
          {mode === "simulation"
            ? "*Strict timing. No pausing. Standard speed."
            : "*Custom settings enabled."}
        </p>
      </div>

      {/* 2. TEST SCOPE */}
      <div className="pt-4 border-t-2 border-dashed border-foreground/20 mb-6">
        <label className="block text-[10px] font-bold uppercase mb-2 text-muted-foreground">
          Test Scope
        </label>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setScope("full")}
            className={`flex-1 border-2 border-foreground text-xs font-bold uppercase py-2 transition-colors ${
              scope === "full"
                ? "bg-foreground text-background"
                : "bg-background hover:bg-accent"
            }`}
          >
            Full Test
          </button>
          <button
            onClick={() => setScope("custom")}
            disabled={mode === "simulation"} // Lock in sim mode
            className={`flex-1 border-2 border-foreground text-xs font-bold uppercase py-2 transition-colors ${
              scope === "custom"
                ? "bg-foreground text-background"
                : "bg-background hover:bg-accent"
            } ${mode === "simulation" ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Custom Parts
          </button>
        </div>

        {/* Custom Part Selector */}
        {scope === "custom" && (
          <div className="p-3 bg-muted border-2 border-dashed border-foreground animate-in fade-in zoom-in-95">
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((p) => (
                <PartCheckbox
                  key={p}
                  label={`Part ${p}`}
                  checked={true}
                  onChange={() => {}}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. ENVIRONMENT CONTROLS */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-[10px] font-bold uppercase mb-2 text-muted-foreground flex items-center gap-1">
            View Mode{" "}
            {mode === "simulation" && (
              <Lock className="w-3 h-3 text-destructive" />
            )}
          </label>
          <div className="flex">
            <ModeTab
              active={true}
              icon={FileText}
              label="Paper"
              onClick={() => {}}
            />
            <ModeTab
              active={false}
              icon={Monitor}
              label="Screen"
              onClick={() => {}}
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase mb-2 text-muted-foreground flex items-center gap-1">
            Instant Feedback{" "}
            {mode === "simulation" && (
              <Lock className="w-3 h-3 text-destructive" />
            )}
          </label>
          <div className="flex items-center justify-between h-[38px] border-2 border-foreground px-3 bg-background">
            <span className="text-xs font-bold">Show Answer</span>
            <SwitchComponent disabled={mode === "simulation"} />
          </div>
        </div>
      </div>

      {/* 4. TIMER & AUDIO */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase flex items-center gap-2">
            Timer Limit{" "}
            {mode === "simulation" && (
              <Lock className="w-3 h-3 text-destructive" />
            )}
          </div>
          <div className="flex items-center">
            <button
              disabled={mode === "simulation"}
              className="w-8 h-8 border-2 border-foreground bg-background flex items-center justify-center font-bold hover:bg-destructive hover:text-white disabled:opacity-50"
            >
              -
            </button>
            <div className="border-y-2 border-foreground px-4 h-8 flex items-center justify-center font-mono font-bold min-w-[80px] bg-background">
              {timer} min
            </div>
            <button
              disabled={mode === "simulation"}
              className="w-8 h-8 border-2 border-foreground bg-background flex items-center justify-center font-bold hover:bg-primary hover:text-white disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase flex items-center gap-2">
            Audio Speed{" "}
            {mode === "simulation" && (
              <Lock className="w-3 h-3 text-destructive" />
            )}
          </div>
          <div className="flex gap-2">
            <SpeedPill
              active={speed === 1.0}
              value="1.0x"
              onClick={() => setSpeed(1.0)}
            />
            <SpeedPill
              active={speed === 1.2}
              value="1.2x"
              isPremium
              disabled={mode === "simulation"}
              onClick={() => setSpeed(1.2)}
            />
            <SpeedPill
              active={speed === 1.5}
              value="1.5x"
              isPremium
              disabled={mode === "simulation"}
              onClick={() => setSpeed(1.5)}
            />
          </div>
        </div>
      </div>

      {/* 5. PRE-FLIGHT CHECK */}
      <div className="bg-muted border-2 border-foreground p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center border-b-2 border-dashed border-foreground/20 pb-2 mb-3">
            <h4 className="font-bold text-xs uppercase flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4" /> Pre-Flight Check
            </h4>
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 border border-green-300">
              READY
            </span>
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center text-primary">
              <span className="font-bold uppercase">Mission Profile:</span>
              <span className="font-black">ETS 2024 / TEST 01</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70">Est. Finish:</span>
              <span className="font-bold">approx. 14:30</span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full bg-foreground text-background hover:bg-primary hover:text-white">
            INITIALIZE TEST
          </Button>
        </div>
      </div>
    </div>
  );
}
