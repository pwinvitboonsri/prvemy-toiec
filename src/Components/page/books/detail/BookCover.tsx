"use client";

export function BookCover() {
  return (
    <div className="relative aspect-[3/4] w-full flex flex-col items-center justify-center overflow-hidden border-2 border-foreground bg-primary text-background shadow-[6px_6px_0px_var(--foreground)] transition-transform duration-200 hover:-translate-y-1 group cursor-pointer">
      {/* Spine Visual */}
      <div className="absolute bottom-0 left-0 top-0 w-3 border-r border-foreground bg-black/20 z-10"></div>

      {/* Content */}
      <div className="relative z-10 text-center p-6 mix-blend-screen">
        <div className="mb-4 border-4 border-background p-4">
          <h2 className="text-5xl font-black leading-none">ETS</h2>
          <h2 className="text-7xl font-black leading-none">24</h2>
        </div>
        <p className="font-mono text-sm font-bold uppercase tracking-widest">
          Official Guide
        </p>
      </div>

      {/* Texture Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "6px 6px",
        }}
      ></div>
    </div>
  );
}
