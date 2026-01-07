import React, { useState, useEffect, useRef } from "react";
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
  Volume2,
  Flag
} from "lucide-react";
import { cn } from "@/utils/utils";
import { SwitchComponent as Switch } from "@/Components/ui/SwitchComponent";
import { LobbySettings } from "@/types/feature/exam";
import { Button } from "@/Components/ui/button/Button";

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
  settings: LobbySettings;
  onSettingsChange: React.Dispatch<React.SetStateAction<LobbySettings>>;
  onAudioCheck: (checked: boolean) => void;
  isAudioVerified: boolean;
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
interface ModeTabProps {
  active: boolean;
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  isLast?: boolean;
}

const ModeTab = React.memo(function ModeTab({ active, icon: Icon, label, onClick, isLast = false }: ModeTabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex h-12 items-center justify-center gap-2 border-2 border-foreground text-xs font-black uppercase transition-all active:scale-[0.98]",
        !isLast ? "border-r-0 md:border-r-2" : "border-l-0",
        active
          ? "bg-[#ffe800] text-black shadow-[inset_3px_3px_0px_rgba(0,0,0,0.1)]"
          : "bg-background text-foreground hover:bg-muted"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
});

interface SpeedPillProps {
  active: boolean;
  value: string;
  onClick: () => void;
  disabled: boolean;
}

const SpeedPill = React.memo(function SpeedPill({ active, value, onClick, disabled }: SpeedPillProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "border-2 border-foreground px-2 py-1 text-[10px] font-bold transition-all active:scale-95",
        active
          ? "bg-foreground text-background"
          : "bg-background text-foreground opacity-50 hover:opacity-100",
        disabled && "cursor-not-allowed opacity-30 hover:opacity-30 bg-muted"
      )}
    >
      {value}
    </button>
  );
});

export const SetupConsole = React.memo(function SetupConsole({
  accessState,
  settings,
  onSettingsChange,
  onAudioCheck,
  isAudioVerified
}: SetupConsoleProps) {
  const isSim = settings.mode === "simulation";
  const isAllowed = accessState.state === "allowed";

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAudioTest = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/test-signal.mp3"); // Ensure this path exists or handle missing
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (audioRef.current) {
      setIsPlaying(true);
      audioRef.current.currentTime = 0; // Restart if playing
      audioRef.current.play()
        .catch(e => {
          console.error("Audio Playback Failed:", e);
          setIsPlaying(false);
        });
    }
  };

  // Wrap handlers in useCallback to ensure stability
  const handleModeChange = React.useCallback((newMode: "simulation" | "practice") => {
    onSettingsChange((prev) => {
      if (newMode === "simulation") {
        return {
          ...prev,
          mode: "simulation",
          time_limit: 120,
          audio_speed: 1.0,
          parts_enabled: [1, 2, 3, 4, 5, 6, 7],
          hardcore_flags: { no_skip: false, no_review: false }
        };
      } else {
        return {
          ...prev,
          mode: "practice"
        };
      }
    });
  }, [onSettingsChange]);

  const togglePart = React.useCallback((partNum: number) => {
    onSettingsChange((prev) => {
      if (prev.mode === "simulation") return prev;

      const currentParts = prev.parts_enabled;
      let newParts: number[];

      if (currentParts.includes(partNum)) {
        if (currentParts.length === 1) return prev; // Prevent empty
        newParts = currentParts.filter(p => p !== partNum);
      } else {
        newParts = [...currentParts, partNum].sort((a, b) => a - b);
      }

      // Recalculate time limit logic... (Simplified for functional update)
      // We can duplicate the logic safely here as it relies on 'newParts'
      let newTime = 0;
      const hasListening = newParts.some(p => p <= 4);
      const hasReading = newParts.some(p => p >= 5);
      if (hasListening) newTime += 45;
      if (hasReading) newTime += 75;

      return {
        ...prev,
        parts_enabled: newParts,
        time_limit: newTime
      };
    });
  }, [onSettingsChange]);

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* --- CONTENT AREA (Scrollable) --- */}
      <div className="flex-1 overflow-y-auto">
        {isAllowed ? (
          /* ALLOWED STATE: Show Settings Form */
          <div className="grid grid-cols-1 gap-8 p-4 md:p-8 md:grid-cols-12">

            {/* --- LEFT COL: OPS --- */}
            <div className="space-y-8 border-r-0 border-dashed border-border pr-0 md:col-span-7 md:border-r-2 md:pr-8">

              {/* 1. Operation Mode */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground">
                  <Target className="h-3 w-3" /> Operation Mode
                </h4>
                <div className="flex">
                  <ModeTab
                    active={settings.mode === "simulation"}
                    icon={Target}
                    label="Simulation"
                    onClick={() => handleModeChange("simulation")}
                  />
                  <ModeTab
                    active={settings.mode === "practice"}
                    icon={Wrench}
                    label="Practice"
                    onClick={() => handleModeChange("practice")}
                    isLast
                  />
                </div>
                <p
                  className={cn(
                    "mt-2 font-mono text-[10px]",
                    isSim ? "text-primary" : "text-foreground"
                  )}
                >
                  {isSim
                    ? "*Strict timing. No pausing. Full Test only."
                    : "*Custom settings enabled."}
                </p>
              </div>

              {/* 2. Scope (Parts) */}
              <div
                className={cn(
                  "transition-opacity duration-200",
                  isSim && "opacity-50 pointer-events-none"
                )}
              >
                <div className="mb-3 flex items-end justify-between">
                  <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground">
                    <Layers className="h-3 w-3" /> Mission Scope
                  </h4>
                  {!isSim && (
                    <button
                      onClick={() => onSettingsChange(prev => ({ ...prev, parts_enabled: [1, 2, 3, 4, 5, 6, 7], time_limit: 120 }))}
                      className="text-[10px] font-bold text-[#1d3b88] hover:underline"
                    >
                      Select All
                    </button>
                  )}
                </div>

                {/* Visual Grid Mockup */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Listening Column */}
                  <div className="space-y-1">
                    <span className="mb-1 block text-[8px] font-bold uppercase text-gray-400">
                      Listening
                    </span>
                    {[1, 2, 3, 4].map((p) => {
                      const isChecked = settings.parts_enabled.includes(p);
                      return (
                        <button
                          key={p}
                          onClick={() => togglePart(p)}
                          disabled={isSim}
                          className={cn(
                            "flex w-full items-center gap-2 border border-border p-2 transition-all hover:bg-muted active:scale-[0.99]",
                            isSim && "cursor-not-allowed bg-muted opacity-100",
                            !isChecked && !isSim && "opacity-50 hover:opacity-100"
                          )}
                        >
                          <div
                            className={cn(
                              "h-4 w-4 border-2 border-foreground relative shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transition-colors flex items-center justify-center shrink-0",
                              isChecked ? "bg-primary" : "bg-background"
                            )}
                          >
                            {isChecked && <Check className="text-primary-foreground w-3 h-3" strokeWidth={4} />}
                          </div>
                          <div className="flex flex-col items-start leading-none">
                            <span className={cn("text-[10px] font-bold uppercase", isChecked ? "text-foreground" : "text-muted-foreground")}>
                              Part {p}
                            </span>
                            <span className="text-[9px] mt-1 font-mono text-muted-foreground uppercase tracking-tight">
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
                      const isChecked = settings.parts_enabled.includes(p);
                      return (
                        <button
                          key={p}
                          onClick={() => togglePart(p)}
                          disabled={isSim}
                          className={cn(
                            "flex w-full items-center gap-2 border border-border p-2 transition-all hover:bg-muted active:scale-[0.99]",
                            isSim && "cursor-not-allowed bg-muted opacity-100",
                            !isChecked && !isSim && "opacity-50 hover:opacity-100"
                          )}
                        >
                          <div
                            className={cn(
                              "h-4 w-4 border-2 border-foreground relative shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transition-colors flex items-center justify-center shrink-0",
                              isChecked ? "bg-primary" : "bg-background"
                            )}
                          >
                            {isChecked && <Check className="text-primary-foreground w-3 h-3" strokeWidth={4} />}
                          </div>
                          <div className="flex flex-col items-start leading-none">
                            <span className={cn("text-[10px] font-bold uppercase", isChecked ? "text-foreground" : "text-muted-foreground")}>
                              Part {p}
                            </span>
                            <span className="text-[9px] mt-1 font-mono text-muted-foreground uppercase tracking-tight">
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

            {/* --- RIGHT COL: ENV & ELITE --- */}
            <div className="space-y-8 md:col-span-5 flex flex-col">

              {/* Audio Pre-Flight */}
              <div className="p-4 border-2 border-dashed border-border bg-muted/30">
                <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground">
                  <Volume2 className="h-3 w-3" /> Audio Pre-Flight
                </h4>
                <div className="flex flex-col gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAudioTest}
                    className={cn("w-full gap-2", isPlaying && "bg-[#ffe800] text-[#111111] border-[#111111]")}
                  >
                    {isPlaying ? <span className="animate-pulse">Testing Signal...</span> : "Test Audio Signal (3s)"}
                  </Button>
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isAudioVerified}
                      onChange={(e) => onAudioCheck(e.target.checked)}
                      className="w-4 h-4 accent-foreground border-2 border-foreground"
                    />
                    <span className="text-xs font-bold uppercase">I can hear the audio clear</span>
                  </label>
                </div>
              </div>

              {/* Objectives */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                  <Flag className="h-3 w-3" /> Mission Objectives
                </h4>
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-gray-400">Target Score</label>
                    <input
                      type="number"
                      min="5" max="990" step="5"
                      value={settings.target_score || ""}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        onSettingsChange(prev => ({ ...prev, target_score: val }));
                      }}
                      placeholder="Ex: 750"
                      className="border-2 border-foreground p-2 text-sm font-black w-24"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-gray-400">Focus Notes</label>
                    <textarea
                      rows={2}
                      value={settings.focus_notes || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        onSettingsChange(prev => ({ ...prev, focus_notes: val }));
                      }}
                      placeholder="What is your main goal?"
                      className="border-2 border-foreground p-2 text-xs font-mono w-full resize-none bg-background text-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Hardcore & Environment */}
              <div className="space-y-2">
                <h4 className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                  <Monitor className="h-3 w-3" /> Hardcore Flags
                </h4>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Switch
                    checked={settings.hardcore_flags.no_skip}
                    onCheckedChange={(c: boolean) => onSettingsChange(prev => ({
                      ...prev,
                      hardcore_flags: { ...prev.hardcore_flags, no_skip: c }
                    }))}
                  />
                  <span className="text-xs font-bold text-[#FF3333]">No Skipping Possible</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Switch
                    checked={settings.hardcore_flags.no_review}
                    onCheckedChange={(c: boolean) => onSettingsChange(prev => ({
                      ...prev,
                      hardcore_flags: { ...prev.hardcore_flags, no_review: c }
                    }))}
                  />
                  <span className="text-xs font-bold text-[#FF3333]">No Review Backtracking</span>
                </label>
              </div>

              {/* Environment Controls */}
              <div className="space-y-2 pt-4 border-t-2 border-[#111111]/10">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-[#111111] flex items-center gap-2">
                    Time Limit {isSim && <Lock className="h-3 w-3 text-[#ff3333]" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={isSim}
                      onClick={() => onSettingsChange(prev => ({ ...prev, time_limit: Math.max(0, prev.time_limit - 5) }))}
                      className="flex h-5 w-5 items-center justify-center border border-[#111111] bg-white text-xs disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="min-w-[40px] text-center font-mono text-xs font-bold">
                      {settings.time_limit}m
                    </span>
                    <button
                      disabled={isSim}
                      onClick={() => onSettingsChange(prev => ({ ...prev, time_limit: prev.time_limit + 5 }))}
                      className="flex h-5 w-5 items-center justify-center border border-[#111111] bg-white text-xs disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-foreground flex items-center gap-2">
                    Audio Speed {isSim && <Lock className="h-3 w-3 text-[#ff3333]" />}
                  </div>
                  <div className="flex gap-1">
                    {[1.0, 1.2, 1.5].map((val) => (
                      <SpeedPill
                        key={val}
                        active={settings.audio_speed === val}
                        value={`${val.toFixed(1)}x`}
                        onClick={() => onSettingsChange(prev => ({ ...prev, audio_speed: val }))}
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
            <h2 className="mb-2 text-3xl font-black uppercase text-foreground">
              {accessState.title}
            </h2>
            <p className="max-w-xs font-mono text-sm text-muted-foreground mb-8">
              {accessState.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});
