"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/Components/ui/button/Button";
import { CardComponent } from "@/Components/ui/CardComponent";

interface ActionCardProps {
  onEnterLobby: () => void;
}

export function ActionCard({ onEnterLobby }: ActionCardProps) {
  return (
    <CardComponent
      // Added 'w-full max-w-full' to override the default 'max-w-md' of the CardComponent
      // This ensures it fills the entire right column as seen in the reference.
      className="h-auto w-full max-w-full shrink-0 z-20"
    >
      <div className="flex flex-col h-full -m-6">
        {" "}
        {/* Negative margin to counteract Card padding for full-width header */}
        {/* Custom Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-foreground bg-foreground px-6 py-3 text-background shrink-0">
          <span className="text-xs font-black uppercase tracking-wider">
            Mission Status: READY
          </span>
          <div className="h-3 w-3 animate-pulse rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
        </div>
        {/* Main Content */}
        <div className="flex flex-col items-center gap-6 p-8 md:flex-row flex-1 bg-white dark:bg-neutral-900">
          <div className="flex-1">
            {/* Increased text size to 5xl/6xl to match the reference image */}
            <h2 className="mb-2 text-4xl md:text-5xl font-black uppercase leading-[0.9] text-foreground tracking-tighter">
              Initialize
              <br />
              Mission
            </h2>
            <p className="max-w-sm font-mono text-xs md:text-sm leading-relaxed opacity-60 text-foreground mt-2">
              Configure test parameters and launch simulation.
              <br />
              <span className="text-[#1d3b88] font-bold">
                Est. Duration: 2h 00m
              </span>
            </p>
          </div>

          {/* CTA Button using the reusable component */}
          <div className="w-full md:w-auto">
            <Button
              onClick={onEnterLobby}
              variant="default" // Uses the Primary (Ink/Blue) style
              size="lg"
              className="w-full md:w-auto h-14 text-base px-8" // Ensure large hit area
            >
              Enter Lobby <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </CardComponent>
  );
}
