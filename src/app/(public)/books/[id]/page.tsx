"use client";

import Link from "next/link";
import { ChevronRight, Flag, ScanEye, Lightbulb } from "lucide-react";
// import { SetupConsole } from "@/Components/books/detail/SetupConsole";
import { SetupConsole } from "@/Components/page/books/detail/SetupConsole";

// Mock Manifest Data
const MANIFEST_ITEMS = [
  { id: "01", type: "Photographs", count: 6 },
  { id: "02", type: "Q&A", count: 25 },
  { id: "03", type: "Conversations", count: 39 },
  { id: "04", type: "Talks", count: 30 },
  { id: "05", type: "Sentences", count: 30 },
  { id: "06", type: "Completion", count: 16 },
  { id: "07", type: "Reading Comp", count: 54 },
];

export default function BookDetailPage() {
  return (
    <main className="min-h-screen bg-background pb-24 font-sans text-foreground relative">
      {/* Background Texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "6px 6px",
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 mt-8">
        {/* 1. HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono opacity-60 mb-2 uppercase">
            <Link href="/books" className="hover:underline hover:text-primary">
              Library
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-bold">ETS 2024</span>
          </div>
          <div className="border-b-2 border-foreground pb-6">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
              ETS Simulation Test 01
            </h1>
            {/* Badges */}
            <div className="flex gap-3">
              <span className="bg-accent text-accent-foreground border-2 border-foreground px-2 py-1 text-[10px] font-bold uppercase shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                Official Guide
              </span>
              <span className="bg-background text-foreground border-2 border-foreground px-2 py-1 text-[10px] font-bold uppercase">
                200 Questions
              </span>
            </div>
          </div>
        </div>

        {/* 2. MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-8">
            {/* BOOK COVER */}
            <div className="aspect-[3/4] bg-primary border-2 border-foreground relative flex items-center justify-center shadow-[6px_6px_0px_var(--foreground)] group">
              {/* Spine Visual */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20 border-r border-foreground"></div>

              <div className="text-center p-8 text-background mix-blend-screen">
                <div className="border-4 border-background p-6 mb-4">
                  <h2 className="text-6xl font-black leading-none">ETS</h2>
                  <h2 className="text-8xl font-black leading-none">24</h2>
                </div>
                <p className="font-mono text-sm uppercase tracking-widest">
                  Official Guide
                </p>
              </div>

              {/* Texture Overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none"></div>
            </div>

            {/* MANIFEST (SYLLABUS) */}
            <div className="bg-card border-2 border-foreground p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-accent opacity-80 -rotate-1 shadow-sm border border-foreground/20"></div>

              <div className="flex justify-between items-end mb-4 border-b-2 border-foreground pb-2">
                <h3 className="font-black text-xl uppercase">Manifest</h3>
                <span className="font-mono text-xs">200 Qs</span>
              </div>

              <div className="space-y-0 text-sm font-mono">
                <div className="grid grid-cols-12 gap-2 text-[10px] font-bold uppercase opacity-60 mb-2">
                  <div className="col-span-2">#</div>
                  <div className="col-span-8">Type</div>
                  <div className="col-span-2 text-right">Qty</div>
                </div>
                {MANIFEST_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-2 py-2 border-b border-dashed border-foreground/20 last:border-0 hover:bg-accent/10 transition-colors"
                  >
                    <div className="col-span-2 opacity-60">{item.id}</div>
                    <div className="col-span-8 font-bold uppercase">
                      {item.type}
                    </div>
                    <div className="col-span-2 text-right">{item.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (7 cols) */}
          <div className="md:col-span-7 flex flex-col gap-8">
            {/* TABS (Visual Only for now) */}
            <div className="flex pl-2 items-end">
              <button className="px-6 py-3 font-black uppercase text-sm border-2 border-foreground border-b-0 bg-background relative z-10 pb-4 -mb-[2px]">
                Setup Console
              </button>
              <button className="px-6 py-3 font-black uppercase text-sm border-2 border-transparent bg-muted text-muted-foreground hover:bg-accent/20 hover:text-foreground transition-colors">
                Mission Logs
              </button>
            </div>

            {/* SETUP CONSOLE COMPONENT */}
            <SetupConsole />

            {/* TACTICAL INTEL */}
            <div className="bg-card border-2 border-foreground p-5 relative overflow-hidden min-h-[180px]">
              <div className="absolute -right-4 -bottom-8 text-[10rem] font-black opacity-5 pointer-events-none select-none">
                ?
              </div>

              <div className="flex justify-between items-center mb-4 border-b-2 border-dashed border-foreground/30 pb-2">
                <div className="flex items-center gap-2">
                  <ScanEye className="w-4 h-4 text-primary" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    Tactical Intel
                  </span>
                </div>
                <span className="text-[10px] font-mono opacity-50">
                  REF: V-2024
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-bold uppercase mb-2 opacity-60">
                    Primary Targets
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Corporate Finance", "Travel", "Personnel"].map((tag) => (
                      <span
                        key={tag}
                        className="border border-foreground px-2 py-1 text-[10px] font-bold uppercase bg-background hover:bg-accent cursor-default transition-colors shadow-[2px_2px_0px_rgba(0,0,0,0.1)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-accent/20 p-3 border border-foreground flex gap-3 items-start">
                  <Lightbulb className="w-4 h-4 text-foreground mt-0.5 shrink-0 fill-background" />
                  <p className="text-[10px] font-bold leading-relaxed">
                    <span className="uppercase block mb-1 opacity-60">
                      Examiner&apos;s Note:
                    </span>
                    Part 7 in this test contains heavy double-passage questions
                    focused on email threads. Watch your time closely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
