"use client";

import { useState } from "react";
import {
  Target,
  Wrench,
  Lock,
  FileText,
  Monitor,
  ClipboardCheck,
  Check,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SwitchComponent as Switch } from "@/Components/ui/SwitchComponent";
import { Button } from "@/Components/ui/Button/Button";
import { Checkbox } from "@/Components/ui/Checkbox";

// --- INLINED SUB-COMPONENTS ---

interface SpeedPillProps {
  active: boolean;
  disabled?: boolean;
  value: string;
  isPremium?: boolean;
  onClick: () => void;
}

function SpeedPill({
  active,
  disabled,
  value,
  isPremium,
  onClick,
}: SpeedPillProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative border-2 border-foreground px-3 py-1 text-xs font-bold cursor-pointer transition-all",
        active
          ? "bg-foreground text-background"
          : "bg-background hover:bg-accent",
        disabled &&
          "opacity-60 cursor-not-allowed bg-muted text-muted-foreground hover:bg-muted"
      )}
    >
      {value}
      {isPremium && (
        <div className="absolute -top-1.5 -right-1.5 bg-accent text-foreground border border-foreground rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px]">
          <Crown className="w-2 h-2" />
        </div>
      )}
    </button>
  );
}

interface PartCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function PartCheckbox({ label, checked, onChange }: PartCheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group select-none">
      <div
        className={cn(
          "w-5 h-5 border-2 border-foreground flex items-center justify-center transition-colors relative shadow-[2px_2px_0px_var(--foreground)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none",
          checked ? "bg-primary" : "bg-background group-hover:bg-accent"
        )}
      >
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={onChange}
        />
        {checked && (
          <Check
            className="w-4 h-4 text-primary-foreground absolute -top-0.5 -left-0.5"
            strokeWidth={4}
          />
        )}
      </div>
      <span className="text-[11px] font-black uppercase tracking-wide">
        {label}
      </span>
    </label>
  );
}

function ModeTab({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 py-2.5 text-center font-bold text-xs uppercase border-2 border-foreground flex items-center justify-center gap-2 transition-all",
        active
          ? "bg-accent shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)]"
          : "bg-background hover:bg-accent/20"
      )}
    >
      <Icon className="w-3 h-3" />
      {label}
    </button>
  );
}

// --- MAIN SETUP CONSOLE COMPONENT ---

export function SetupConsole() {
  const [mode, setMode] = useState<"simulation" | "practice">("simulation");
  const [scope, setScope] = useState<"full" | "custom">("full");
  const [speed, setSpeed] = useState(1.0);
  const [timer, setTimer] = useState(120);

  // State for custom parts selection
  const [selectedParts, setSelectedParts] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7,
  ]);

  const togglePart = (part: number) => {
    if (selectedParts.includes(part)) {
      setSelectedParts(selectedParts.filter((p) => p !== part));
    } else {
      setSelectedParts([...selectedParts, part]);
    }
  };

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

        {/* Scope Toggles */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setScope("full")}
            className={cn(
              "flex-1 border-2 border-foreground text-xs font-bold uppercase py-3 transition-all shadow-[2px_2px_0px_var(--foreground)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-none",
              scope === "full"
                ? "bg-foreground text-background"
                : "bg-background hover:bg-accent"
            )}
          >
            Full Test
          </button>
          <button
            onClick={() => setScope("custom")}
            disabled={mode === "simulation"} // Lock in sim mode
            className={cn(
              "flex-1 border-2 border-foreground text-xs font-bold uppercase py-3 transition-all shadow-[2px_2px_0px_var(--foreground)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-none",
              scope === "custom"
                ? "bg-foreground text-background"
                : "bg-background hover:bg-accent",
              mode === "simulation" &&
                "opacity-50 cursor-not-allowed shadow-none"
            )}
          >
            Custom Parts
          </button>
        </div>

        {/* Custom Part Selector Area */}
        {scope === "custom" && (
          <div className="p-4 bg-muted/30 border-2 border-dashed border-foreground animate-in fade-in zoom-in-95">
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {[1, 2, 3, 4, 5, 6, 7].map((p) => (
                <label
                  key={p}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                >
                  <Checkbox
                    checked={selectedParts.includes(p)}
                    onChange={() => togglePart(p)}
                    // Use the reusable Riso Checkbox here
                  />
                  <span className="text-[11px] font-black uppercase tracking-wide group-hover:text-primary transition-colors">
                    Part {p}
                  </span>
                </label>
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
          <div className="flex items-center justify-between h-[42px] border-2 border-foreground px-3 bg-background">
            <span className="text-xs font-bold">Show Answer</span>
            <Switch disabled={mode === "simulation"} />
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
              className="w-8 h-8 border-2 border-foreground bg-background flex items-center justify-center font-bold hover:bg-destructive hover:text-white disabled:opacity-50 transition-colors"
            >
              -
            </button>
            <div className="border-y-2 border-foreground px-4 h-8 flex items-center justify-center font-mono font-bold min-w-[80px] bg-background">
              {timer} min
            </div>
            <button
              disabled={mode === "simulation"}
              className="w-8 h-8 border-2 border-foreground bg-background flex items-center justify-center font-bold hover:bg-primary hover:text-white disabled:opacity-50 transition-colors"
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
      <div className="bg-muted border-2 border-foreground p-4 flex-1 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative Corner */}
        <div
          className="absolute top-0 right-0 w-4 h-4 bg-foreground"
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        ></div>

        <div>
          <div className="flex justify-between items-center border-b-2 border-dashed border-foreground/20 pb-2 mb-3">
            <h4 className="font-bold text-xs uppercase flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4" /> Pre-Flight Check
            </h4>
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 border border-green-300 shadow-sm">
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
          <Button className="w-full bg-foreground text-background hover:bg-primary hover:text-white shadow-[4px_4px_0px_var(--primary)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all h-12">
            INITIALIZE TEST
          </Button>
        </div>
      </div>
    </div>
  );
}
