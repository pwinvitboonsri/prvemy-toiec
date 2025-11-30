"use client";

import { ArrowRight } from "lucide-react";

interface ActionCardProps {
  onEnterLobby: () => void;
}

export function ActionCard({ onEnterLobby }: ActionCardProps) {
  return (
    <div className="border-2 border-foreground bg-card shadow-[8px_8px_0px_var(--foreground)] overflow-hidden">
      <div className="bg-foreground text-background px-6 py-3 flex justify-between items-center border-b-2 border-foreground">
        <span className="font-black text-xs uppercase tracking-widest">
          Mission Status: READY
        </span>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
      </div>
      <div className="p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-black uppercase leading-none mb-3">
            Initialize Mission
          </h2>
          <p className="font-mono text-xs opacity-60 leading-relaxed max-w-xs">
            Configure test parameters and launch simulation.
            <br />
            <span className="text-primary font-bold">
              Est. Duration: 2h 00m
            </span>
          </p>
        </div>
        <button
          onClick={onEnterLobby}
          className="group relative bg-foreground text-background px-8 py-4 font-black uppercase text-lg border-2 border-foreground hover:bg-primary hover:text-white hover:border-foreground transition-all shadow-[4px_4px_0px_var(--destructive)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          Enter Lobby{" "}
          <ArrowRight className="inline w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
