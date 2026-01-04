"use client";

import React, { useState } from "react";
import {
  Trophy,
  ArrowLeft,
  Share2,
  Download,
  BarChart3,
  Zap,
  Star,
  Home,
  ShieldCheck,
  ShieldAlert,
  Maximize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GatekeeperOverlay } from "@/Components/ui/GatekeeperOverlay";
import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import { ExamResult } from "@/lib/api/result/getResult";

// Mock data for parts - in a real implementation this should come from the API
const MOCK_PARTS_DATA = [
  { name: "P1", score: 90, label: "Photographs" },
  { name: "P2", score: 85, label: "Question-Response" },
  { name: "P3", score: 60, label: "Conversations" },
  { name: "P4", score: 70, label: "Talks" },
  { name: "P5", score: 55, label: "Incomplete Sentences" },
  { name: "P6", score: 40, label: "Text Completion" },
  { name: "P7", score: 45, label: "Reading Comp" },
];

interface ResultClientProps {
  result: ExamResult | null;
}

export function ResultClient({ result }: ResultClientProps) {
  // Use mock state if result is null (should reflect 0/empty state usually)
  const scoreData = {
    total: result?.totalScore ?? 0,
    listening: result?.listeningScore ?? 0,
    reading: result?.readingScore ?? 0,
    parts: MOCK_PARTS_DATA,
  };

  // In a real app, this might come from result.isFullAnalysisAvailable or user subscription
  const [isPremium, setIsPremium] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#ffe800] overflow-x-hidden">
      {/* 
         Note: Global styles for .riso-shadow-*, .riso-border, .grain-overlay, .halftone 
         are defined in globals.css 
      */}

      {/* NAVIGATION */}
      <nav className="sticky top-0 h-16 bg-background border-b-2 border-border flex items-center justify-between px-4 md:px-8 z-50">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-mono font-bold uppercase text-xs md:text-sm hover:text-primary transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Test Details</span>
        </Link>
        <div className="flex items-center gap-4">
          <span
            className={cn(
              "px-2 py-0.5 text-[10px] font-black riso-border hidden sm:block",
              isPremium ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground"
            )}
          >
            {isPremium ? "PREMIUM ACCESS" : "FREE TIER"}
          </span>
          <Link
            href="/dashboard"
            className="riso-border bg-card p-2 riso-shadow-ink transition-all hover:-translate-y-0.5 text-card-foreground"
            aria-label="Home"
          >
            <Home size={20} />
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-20 pb-40">
        {/* HERO SECTION: Balanced Spacing */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <header className="riso-border bg-[#ffe800] p-8 md:p-12 riso-shadow-blue flex flex-col justify-center min-h-[250px] relative text-[#111111]">
              <div className="absolute top-0 right-0 bg-[#111111] text-white px-4 py-1 font-mono text-xs">
                OFFICIAL REPORT
              </div>
              <h1 className="font-serif text-lg font-bold uppercase tracking-widest mb-4 opacity-70 italic">
                Final Estimated Score
              </h1>
              <div className="flex items-baseline gap-4">
                <span className="text-8xl md:text-9xl font-black leading-none">
                  {scoreData.total}
                </span>
                <span className="text-2xl md:text-4xl font-mono font-black opacity-30">
                  / 990
                </span>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="riso-border bg-card p-8 riso-shadow-ink flex flex-col justify-between min-h-[200px]">
                <div>
                  <p className="font-mono text-[11px] uppercase font-black text-primary mb-2 tracking-widest">
                    Listening Section
                  </p>
                  <p className="text-6xl font-black">{scoreData.listening}</p>
                </div>
                <div className="w-full bg-foreground/5 h-4 mt-6 riso-border p-[2px]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(scoreData.listening / 495) * 100}%` }}
                    className="bg-primary h-full"
                  />
                </div>
              </div>

              <div className="riso-border bg-card p-8 riso-shadow-ink flex flex-col justify-between min-h-[200px]">
                <div>
                  <p className="font-mono text-[11px] uppercase font-black text-destructive mb-2 tracking-widest">
                    Reading Section
                  </p>
                  <p className="text-6xl font-black">{scoreData.reading}</p>
                </div>
                <div className="w-full bg-foreground/5 h-4 mt-6 riso-border p-[2px]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(scoreData.reading / 495) * 100}%` }}
                    className="bg-destructive h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 flex flex-col">
            <div className="riso-border bg-primary text-primary-foreground p-10 riso-shadow-ink flex-1 flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 perforated pointer-events-none" />
              <Trophy className="mb-8 text-[#ffe800] size-14 relative z-10" />
              <h2 className="font-serif text-4xl font-black uppercase italic leading-none mb-4 relative z-10">
                RANK_S
              </h2>
              <p className="font-mono text-[12px] font-bold opacity-80 leading-relaxed border-l-4 border-[#ffe800] pl-6 py-2 uppercase relative z-10">
                Data suggests a high level of proficiency in international
                business contexts. Reliable competency rating.
              </p>

              <div className="mt-auto pt-12 space-y-4 relative z-10">
                <button className="w-full bg-[#ffe800] text-[#111111] border-2 border-[#111111] py-4 font-black flex items-center justify-center gap-3 riso-shadow-ink transition-all hover:-translate-y-1 cursor-pointer">
                  <Download size={20} /> CERTIFICATE
                </button>
                <button className="w-full bg-card text-card-foreground border-2 border-[#111111] py-3 font-black text-xs uppercase flex items-center justify-center gap-3 riso-shadow-ink transition-all hover:-translate-y-1 cursor-pointer">
                  <Share2 size={16} /> SHARE RESULTS
                </button>
              </div>
            </div>
          </aside>
        </section>

        {/* SECTIONAL ANALYTICS: Clean Grid Stacking */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 border-b-2 border-border pb-4">
            <BarChart3 size={32} className="text-primary" />
            <h2 className="font-serif text-3xl font-black uppercase tracking-tight">
              Sectional Analytics
            </h2>
          </div>

          <div
            className="grid grid-areas-[content] w-full riso-border bg-card min-h-[400px]"
            style={{
              gridTemplateAreas: '"content"',
            }}
          >
            <div
              className={`grid-area-[content] w-full h-full grid grid-cols-1 md:grid-cols-2 gap-0 transition-all ${
                !isPremium ? "blur-2xl opacity-10 pointer-events-none" : ""
              }`}
            >
              <div className="p-10 border-r-2 border-border space-y-8 bg-background/40">
                <h3 className="font-mono font-black uppercase text-xs">
                  Accuracy Breakdown
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {scoreData.parts.map((part, i) => (
                    <div key={i} className="flex items-center gap-6">
                      <div className="font-mono text-xs font-black w-10 text-center bg-foreground text-background py-1">
                        {part.name}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between font-mono text-[10px] font-bold uppercase opacity-60">
                          <span>{part.label}</span>
                          <span>{part.score}%</span>
                        </div>
                        <div className="h-4 border-2 border-border bg-card overflow-hidden p-[2px]">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${part.score}%` }}
                            className={`h-full ${
                              part.score < 50 ? "bg-destructive" : "bg-primary"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex-1 p-10 border-b-2 border-border bg-foreground text-[#ffe800] flex flex-col justify-center">
                  <p className="font-mono text-xs font-black uppercase mb-2 opacity-60">
                    Personal Best
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-7xl font-black">820</span>
                    <span className="text-xl font-mono opacity-50 font-black">
                      PTS
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-10 bg-card flex flex-col justify-center">
                  <p className="font-mono text-xs font-black uppercase mb-2 opacity-40">
                    Global Average
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-7xl font-black">645</span>
                    <span className="text-xl font-mono opacity-20 font-black">
                      AVG
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {!isPremium && (
              <div className="grid-area-[content] w-full h-full">
                <GatekeeperOverlay
                  badge="LOCKED"
                  title="Analytics Restricted"
                  description="Persistent history tracking and sectional data are reserved for premium members. Upgrade to track your performance growth."
                  onUpgrade={() => setIsPremium(true)}
                />
              </div>
            )}
          </div>
        </section>

        {/* ITEM REVIEW */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 border-b-2 border-border pb-4">
            <Star size={32} className="text-destructive" />
            <h2 className="font-serif text-3xl font-black uppercase tracking-tight">
              Detailed Review
            </h2>
          </div>

          <div
            className="grid grid-areas-[content] w-full riso-border bg-[#111111] min-h-[450px]"
            style={{
              gridTemplateAreas: '"content"',
            }}
          >
            <div
              className={`grid-area-[content] transition-all w-full ${
                !isPremium ? "blur-2xl opacity-10 pointer-events-none" : ""
              }`}
            >
              <div className="grid grid-cols-12 bg-[#111111] text-white p-5 font-mono text-xs font-black uppercase tracking-widest">
                <div className="col-span-2">#</div>
                <div className="col-span-7">Skill Category</div>
                <div className="col-span-3 text-right">Result</div>
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 p-8 border-t-2 border-[#111111] bg-white text-[#111111] items-center hover:bg-[#ffe800] transition-colors group cursor-pointer"
                >
                  <div className="col-span-2 font-mono font-black text-2xl opacity-20 group-hover:opacity-100">
                    15{i}
                  </div>
                  <div className="col-span-7">
                    <p className="text-base font-black uppercase tracking-tight">
                      Inference & Logical Connections
                    </p>
                  </div>
                  <div className="col-span-3 text-right">
                    <span
                      className={`px-4 py-2 text-xs font-black riso-border ${
                        i % 2 === 0
                          ? "bg-[#ff3333] text-white shadow-[3px_3px_0_#111111]"
                          : "bg-[#1d3b88] text-white shadow-[3px_3px_0_#111111]"
                      }`}
                    >
                      {i % 2 === 0 ? "FAIL" : "PASS"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {!isPremium && (
              <div className="grid-area-[content] w-full h-full">
                <GatekeeperOverlay
                  badge="ACCESS DENIED"
                  title="Review Mode Locked"
                  description="Detailed transcripts, answer justifications, and correct answers require a premium subscription."
                  onUpgrade={() => setIsPremium(true)}
                />
              </div>
            )}
          </div>
        </section>
      </main>

      {/* STICKY FOOTER CTA */}
      <AnimatePresence>
        {!isPremium && (
          <motion.footer
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 inset-x-0 bg-[#ffe800] border-t-4 border-[#111111] z-[100] p-6 flex justify-center text-[#111111]"
          >
            <div className="max-w-6xl w-full flex items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="bg-[#111111] p-3 shadow-[4px_4px_0_#1d3b88] hidden md:block">
                  <Zap size={24} fill="#ffe800" />
                </div>
                <p className="text-lg font-black uppercase tracking-tight">
                  Unlock Benchmarks {"&"} Explanations
                </p>
              </div>
              <button
                onClick={() => setIsPremium(true)}
                className="bg-[#111111] text-[#ffe800] px-10 py-4 font-black uppercase text-sm riso-border riso-shadow-red transition-all hover:-translate-y-1 cursor-pointer"
              >
                GO_PREMIUM
              </button>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>

      {/* DEV TOGGLE */}
      <div className="fixed bottom-8 left-8 z-[110] flex flex-col gap-2 pointer-events-none">
        <button
          onClick={() => setIsPremium(!isPremium)}
          className={cn(
            "pointer-events-auto riso-border p-4 riso-shadow-ink flex items-center gap-4 transition-all hover:-translate-y-1 active:translate-y-0 cursor-pointer",
            isPremium
              ? "bg-primary text-primary-foreground"
              : "bg-destructive text-destructive-foreground"
          )}
        >
          {isPremium ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
          <span className="font-black text-xs uppercase tracking-widest">
            {isPremium ? "PREMIUM MODE" : "FREE MODE"}
          </span>
        </button>
      </div>

      <button className="fixed bottom-8 right-8 z-40 bg-card riso-border p-4 riso-shadow-ink md:riso-shadow-blue hover:scale-110 transition-transform cursor-pointer text-card-foreground">
        <Maximize2 size={24} />
      </button>
    </div>
  );
}