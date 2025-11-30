"use client";

import { BarChart2, Lock } from "lucide-react";

export function FlightRecords() {
  return (
    <div className="border-2 border-foreground bg-muted/20 relative overflow-hidden flex-1 min-h-[200px] flex flex-col group cursor-pointer hover:shadow-[8px_8px_0px_var(--primary)] transition-all">
      {/* Right-side Folder Tab (Decorative) */}
      <div className="absolute -right-3 top-8 bottom-8 w-4 bg-foreground rounded-r-md flex items-center justify-center border-l border-background shadow-sm z-0">
        <span className="text-[8px] font-bold text-background transform rotate-90 whitespace-nowrap tracking-widest opacity-80">
          CONFIDENTIAL
        </span>
      </div>

      {/* Header */}
      <div className="p-6 border-b-2 border-foreground flex justify-between items-start bg-background z-10 relative">
        <div>
          <h3 className="font-black text-xl uppercase flex items-center gap-2 mb-1">
            Flight Records <BarChart2 className="w-5 h-5 text-primary" />
          </h3>
          <span className="font-mono text-[10px] opacity-50 block">
            PERSONAL DATABASE • ID: BK-1024
          </span>
        </div>
        <div className="hidden group-hover:block bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 border border-foreground">
          4 SORTIES
        </div>
      </div>

      {/* Blurred Content Area */}
      <div className="relative flex-1 p-6 bg-muted/5 z-10">
        {/* Abstract Bar Chart Visualization */}
        <div className="filter blur-sm opacity-30 select-none pointer-events-none flex items-end justify-between h-24 gap-4 px-4 mb-6">
          <div className="w-1/5 bg-foreground h-[40%]"></div>
          <div className="w-1/5 bg-foreground h-[60%]"></div>
          <div className="w-1/5 bg-primary h-[80%]"></div>
          <div className="w-1/5 bg-foreground h-[30%]"></div>
          <div className="w-1/5 bg-foreground h-[50%]"></div>
        </div>
        <div className="space-y-3 filter blur-sm opacity-30">
          <div className="h-2 w-full bg-foreground/10 rounded-full"></div>
          <div className="h-2 w-3/4 bg-foreground/10 rounded-full"></div>
        </div>

        {/* Locked Overlay Badge */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-background border-2 border-destructive p-4 shadow-[4px_4px_0px_var(--foreground)] text-center transform -rotate-2 group-hover:rotate-0 transition-transform">
            <div className="flex justify-center mb-2">
              <Lock className="w-6 h-6 text-destructive" />
            </div>
            <h4 className="font-black text-destructive uppercase text-sm tracking-widest">
              Restricted
            </h4>
            <p className="font-mono text-[10px] text-foreground/60 mt-1">
              Login to unlock analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
