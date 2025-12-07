"use client";

import { cn } from "@/lib/utils";

export function BookCover() {
  return (
    <div className="group relative aspect-[3/4] w-full cursor-pointer transition-transform duration-200 hover:-translate-y-1">
      {/* Container with Blue Background */}
      <div className="relative h-full w-full overflow-hidden border-2 border-[#111111] bg-[#1d3b88] shadow-[6px_6px_0px_#111111]">
        
        {/* Spine Visual (Left side) */}
        <div className="absolute bottom-0 left-0 top-0 z-20 w-3 border-r border-[#111111] bg-black/20"></div>

        {/* Content Container (Mix Blend Screen for Riso effect) */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-[#f2f0e9] mix-blend-screen">
          <div className="mb-2 border-4 border-[#f2f0e9] p-4 text-center">
            <h2 className="text-5xl font-black leading-none">ETS</h2>
            <h2 className="text-7xl font-black leading-none">24</h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest">
            Official Guide
          </p>
        </div>

        {/* Texture Overlay (Halftone) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 z-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "6px 6px",
          }}
        ></div>
      </div>
    </div>
  );
}