"use client";

import { User } from "@supabase/supabase-js";
import {
  Target,
  Flag,
  BrainCircuit,
  Library,
  Layers,
  History,
  Star,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- WIDGET 1: GOAL TRACKER ---
export function GoalTracker({ user }: { user: User | null }) {
  if (!user) {
    // GUEST: Roadmap
    return (
      <div className="bg-card border-2 border-foreground overflow-hidden h-full flex flex-col">
        <div className="px-6 py-4 border-b-2 border-foreground flex justify-between items-center bg-background shrink-0">
          <h3 className="font-black text-lg uppercase flex items-center gap-2">
            <Target className="w-5 h-5" /> Your Roadmap
          </h3>
          <div className="text-[10px] font-bold uppercase bg-foreground text-background px-2 py-1">
            How it works
          </div>
        </div>
        <div className="p-8 bg-background relative flex flex-col md:flex-row justify-between gap-8 md:gap-0 flex-1 items-center">
          {/* Dashed Line */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 border-t-2 border-dashed border-foreground/30 -z-0 transform -translate-y-1/2"></div>

          {/* Steps */}
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="flex flex-row md:flex-col items-center gap-3 md:text-center group cursor-pointer z-10 relative"
            >
              <div className="w-12 h-12 bg-background text-foreground rounded-full flex items-center justify-center border-2 border-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="font-black text-lg">{step}</span>
              </div>
              <span className="text-[10px] font-bold uppercase bg-background px-1 border border-foreground">
                Step {step}
              </span>
            </div>
          ))}
          <div className="flex flex-row md:flex-col items-center gap-3 md:text-center group cursor-pointer z-10 relative">
            <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center border-2 border-foreground shadow-[4px_4px_0px_var(--foreground)]">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase bg-background px-1 border border-foreground">
              Goal
            </span>
          </div>
        </div>
      </div>
    );
  }

  // USER: Specific Goals
  return (
    <div className="bg-card border-2 border-foreground overflow-hidden h-full flex flex-col">
      <div className="px-6 py-4 border-b-2 border-foreground flex justify-between items-center bg-accent/20 shrink-0">
        <h3 className="font-black text-lg uppercase flex items-center gap-2">
          <Target className="w-5 h-5" /> Target: 800+
        </h3>
        <div className="text-xs font-mono font-bold uppercase">
          EXAM: OCT 24 (12 DAYS LEFT)
        </div>
      </div>
      <div className="p-6 grid md:grid-cols-2 gap-8 flex-1">
        {/* Prediction Score */}
        <div className="space-y-4 md:border-r-2 md:border-foreground md:border-dashed md:pr-8 h-full flex flex-col justify-center">
          <p className="font-mono text-xs font-bold opacity-60 uppercase">
            Current Prediction
          </p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-black">650</span>
            <span className="text-sm font-mono mb-2 opacity-60">/ 990</span>
            <span className="text-xs font-bold bg-accent text-accent-foreground px-2 py-1 border border-foreground mb-1 ml-auto">
              +45 PTS
            </span>
          </div>
        </div>
        {/* Breakdown */}
        <div className="space-y-4 h-full flex flex-col justify-center">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 uppercase">
              <span>Listening</span>
              <span className="font-bold">350/495</span>
            </div>
            <div className="w-full border-2 border-foreground h-3 p-[1px]">
              <div className="bg-primary h-full w-[70%]"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 uppercase">
              <span>Reading</span>
              <span className="font-bold text-destructive">300/495</span>
            </div>
            <div className="w-full border-2 border-foreground h-3 p-[1px]">
              <div className="bg-destructive h-full w-[60%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- WIDGET 2: RECOMMENDATION / PLACEMENT ---
export function RecWidget({ user }: { user: User | null }) {
  const isGuest = !user;

  return (
    <div
      className={cn(
        "relative overflow-hidden group transition-all duration-300 flex flex-col border-2 border-foreground h-full",
        isGuest
          ? "bg-background shadow-[4px_4px_0px_var(--foreground)]"
          : "bg-primary text-primary-foreground shadow-[4px_4px_0px_var(--foreground)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--accent)]"
      )}
    >
      {/* Header Strip */}
      <div className="relative z-20 flex justify-between items-center p-4 border-b-2 border-current/20 bg-black/5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent"></div>
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest opacity-80">
            {isGuest ? "Placement" : "Suggestion Engine"}
          </span>
        </div>
        {user && (
          <span className="bg-background text-foreground border-2 border-foreground text-[10px] font-bold uppercase py-1 px-2 shadow-[2px_2px_0px_var(--foreground)]">
            SMART PICK
          </span>
        )}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start p-6 md:p-8 flex-1">
        <div
          className={cn(
            "w-14 h-14 border-2 flex items-center justify-center shrink-0 shadow-[4px_4px_0px_var(--foreground)] transition-colors",
            isGuest
              ? "bg-foreground text-background border-background"
              : "bg-background text-primary border-background"
          )}
        >
          {isGuest ? (
            <Flag className="w-8 h-8" />
          ) : (
            <BrainCircuit className="w-8 h-8" />
          )}
        </div>

        <div className="flex-1 w-full flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-black mb-3 uppercase leading-none tracking-tight">
            {isGuest ? "Discover Your Level" : "Mastering Prepositions"}
          </h3>
          <p className="font-mono text-sm mb-6 leading-relaxed opacity-90 max-w-xl">
            {isGuest
              ? "Not sure where to start? Take our rapid placement test (15 min) to get a personalized study roadmap."
              : "You missed 3 questions on 'at/in/on'. We generated a 10-question drill to fix this glitch in your matrix."}
          </p>
          <div>
            <button
              className={cn(
                "px-6 py-3 text-sm font-black border-2 transition-colors shadow-[4px_4px_0px_var(--foreground)] uppercase active:shadow-none active:translate-y-1",
                isGuest
                  ? "bg-foreground text-background border-foreground hover:bg-destructive"
                  : "bg-background text-primary border-background hover:bg-accent hover:text-foreground hover:border-foreground"
              )}
            >
              {isGuest ? "Take Test" : "Start Drill (5 min)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- WIDGET 3: TOOLS LIBRARY ---
export function ToolsLibrary() {
  return (
    <div className="bg-card border-2 border-foreground p-6 h-full flex flex-col">
      <h3 className="font-mono text-sm font-bold mb-4 opacity-60 uppercase shrink-0">
        Tools_Library
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
        <ToolCard icon={Library} title="Library" sub="12 Items" />
        <ToolCard
          icon={Layers}
          title="Flashcards"
          sub="Review Due"
          notify={45}
        />
        <ToolCard icon={History} title="Mistakes" sub="128 Saved" />
        <ToolCard icon={Star} title="Favorites" sub="Quick Access" />
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ToolCard({
  icon: Icon,
  title,
  sub,
  notify,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
  sub: string;
  notify?: number;
}) {
  return (
    <button className="bg-background border-2 border-foreground p-4 text-left group relative hover:bg-primary hover:text-white transition-colors shadow-[2px_2px_0px_var(--foreground)] hover:shadow-[4px_4px_0px_var(--destructive)] hover:-translate-y-0.5 h-full flex flex-col justify-between">
      {notify && (
        <div className="absolute top-2 right-2 bg-destructive text-white text-[10px] font-bold px-1.5 border border-foreground">
          {notify}
        </div>
      )}
      <div className="w-8 h-8 border-2 border-foreground flex items-center justify-center mb-3 bg-card group-hover:bg-accent text-foreground">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <span className="block font-bold text-sm uppercase">{title}</span>
        <span className="font-mono text-xs opacity-60 group-hover:opacity-100 uppercase">
          {sub}
        </span>
      </div>
    </button>
  );
}
