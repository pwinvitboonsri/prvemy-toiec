"use client";

import { Flame, Check, Sparkles, ArrowRight } from "lucide-react";

// --- WIDGET 4: MOTIVATION ---
export function MotivationWidget() {
  return (
    <div className="bg-card border-2 border-foreground p-6 h-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 text-destructive font-black text-xl uppercase">
            <Flame className="w-6 h-6 fill-destructive" />5 Days
          </div>
          <p className="font-mono text-xs opacity-60 uppercase">
            Top 15% This Week
          </p>
        </div>
      </div>

      {/* Streak Bubbles */}
      <div className="flex justify-between items-center mb-6 px-1 flex-1">
        {["M", "T", "W"].map((d) => (
          <div key={d} className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] font-bold">{d}</span>
            <div className="w-8 h-8 border-2 border-foreground bg-foreground text-background flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
          </div>
        ))}
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] font-bold">T</span>
          <div className="w-10 h-10 border-2 border-foreground bg-accent flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_var(--foreground)]">
            YOU
          </div>
        </div>
      </div>

      {/* Next Reward */}
      <div className="bg-background border-2 border-foreground p-3 text-center shrink-0">
        <p className="text-xs font-bold uppercase mb-2">
          Next Reward: 7-Day Badge
        </p>
        <div className="w-full border-2 border-foreground h-3 p-[1px] mb-1">
          <div className="bg-destructive h-full w-[71%]"></div>
        </div>
      </div>
    </div>
  );
}

// --- WIDGET 5: CAMPAIGN / PROMO ---
export function CampaignWidget() {
  return (
    <div className="bg-foreground text-background p-6 relative overflow-hidden group cursor-pointer border-2 border-foreground shadow-[4px_4px_0px_var(--destructive)] transition-transform hover:-translate-y-1 h-full flex flex-col justify-center">
      <div className="relative z-10">
        <div className="mb-3 inline-flex items-center gap-2 bg-accent text-foreground px-2 py-1 text-[10px] font-bold border border-background">
          <Sparkles className="w-3 h-3" />
          PREMIUM
        </div>
        <h3 className="mb-2 text-xl font-black uppercase">Unlock Analytics</h3>
        <p className="mb-4 font-mono text-xs text-background/80">
          See exactly why you fail Part 7. AI Breakdown included.
        </p>
        <div className="flex items-center text-sm font-bold text-accent group-hover:gap-2 transition-all uppercase">
          View Plans <ArrowRight className="ml-1 w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

// --- WIDGET 6: FEED ---
export function CommunityFeed() {
  return (
    <div className="bg-card border-2 border-foreground overflow-hidden h-full flex flex-col">
      <div className="px-5 py-3 border-b-2 border-foreground flex justify-between items-center bg-background shrink-0">
        <h3 className="font-black text-sm uppercase">Activity Feed</h3>
        <button className="text-[10px] font-bold uppercase hover:text-primary">
          Clear
        </button>
      </div>
      <div className="flex-1 bg-background/50">
        {/* Item 1 */}
        <div className="p-4 border-b-2 border-foreground border-dashed hover:bg-background transition flex gap-3">
          <div className="mt-1 w-2 h-2 bg-primary border border-foreground shrink-0"></div>
          <div>
            <p className="font-mono text-[10px] opacity-50 mb-1 uppercase">
              02:00 PM
            </p>
            <p className="text-sm font-bold leading-tight mb-2">
              Test Result Ready: 710 Score
            </p>
            <button className="text-[10px] font-bold border border-foreground px-2 py-1 hover:bg-foreground hover:text-background uppercase transition-colors">
              View Report
            </button>
          </div>
        </div>
        {/* Item 2 */}
        <div className="p-4 border-b-2 border-foreground border-dashed hover:bg-background transition flex gap-3">
          <div className="mt-1 w-2 h-2 bg-accent border border-foreground shrink-0"></div>
          <div>
            <p className="font-mono text-[10px] opacity-50 mb-1 uppercase">
              YESTERDAY
            </p>
            <p className="text-sm font-bold leading-tight">
              Weekly Goal Achieved 🏆
            </p>
          </div>
        </div>
        {/* Item 3 */}
        <div className="p-4 hover:bg-background transition flex gap-3">
          <div className="mt-1 w-2 h-2 bg-destructive border border-foreground shrink-0"></div>
          <div>
            <p className="font-mono text-[10px] opacity-50 mb-1 uppercase">
              2 DAYS AGO
            </p>
            <p className="text-sm font-bold leading-tight">
              New Speaking Module
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
