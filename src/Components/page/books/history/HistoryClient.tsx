"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  FileText,
  Play,
  Clock,
  Lock,
  ShieldCheck,
  Layout,
  Trophy,
  Home,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/utils";
import { useExamStore } from "@/store/exam/exam-store";
import { Button } from "@/Components/ui/button/Button";
import { CardComponent } from "@/Components/ui/CardComponent";
import { HistoryDashboard } from "./HistoryDashboard";
import { PRICING } from "../../../../../config/constant";
import { UserRole } from "@/types/data/library_data";

interface HistorySession {
  id: string;
  started_at: string;
  status: "in_progress" | "completed" | "abandoned";
  total_score: number | null;
  score_listening: number | null;
  score_reading: number | null;
  settings: any;
}

interface HistoryClientProps {
  bookId: string;
  bookTitle: string;
  sessions: HistorySession[];
  userStatus: UserRole;
}

export function HistoryClient({
  bookId,
  bookTitle,
  sessions,
  userStatus,
}: HistoryClientProps) {
  const router = useRouter();
  // Mock premium for now based on status, can be toggled by dev button
  const [isPremiumMode, setIsPremiumMode] = useState(
    userStatus === PRICING.TIER_NAMES.PLATINUM ||
    userStatus === "premium" ||
    userStatus === PRICING.TIER_NAMES.GOLD ||
    userStatus === PRICING.TIER_NAMES.SILVER
  );

  const totalAttempts = sessions.length;
  const initializeExam = useExamStore((state) => state.initialize);

  const handleResume = (sessionId: string) => {
    // We don't have the full manifest here, but typically the exam runner 
    // will fetch the manifest based on the bookId/sessionId. 
    // The critical part is setting the sessionId in the store to signal a resume.

    // However, the store's initialize expects a manifest. 
    // A clearer pattern might be to just set the sessionId if your runner page handles fetching.
    // For now, let's assume navigating to the runner with the sessionId param is sufficient,
    // OR we set the sessionId in the store to be safe.

    useExamStore.setState({ sessionId });
    router.push(`/test/${bookId}`); // Assuming runner is at /test/[bookId] or similar
  };

  const EmptyState = () => {
    return (
      <CardComponent
        className="min-h-[20rem] items-center justify-center border-dashed h-auto"
        noPadding
      >
        <div className="flex flex-col items-center gap-6 p-20">
          <Layout size={64} className="opacity-20" />
          <h2 className="font-serif text-2xl font-black uppercase tracking-tighter text-center">
            NO MISSION DATA FOUND.
            <br />
            COMMENCE FIRST SORTIE.
          </h2>
        </div>
      </CardComponent>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#ffe800] overflow-x-hidden">
      <main className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-10 pb-40">
        {/* HERO SECTION: 60:30 SIDE-BY-SIDE RATIO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-stretch">
          {/* LEFT: MISSION HISTORY (60%) */}
          <div className="lg:col-span-8 flex">
            <CardComponent
              className="riso-border bg-[#ffe800] text-[#111111] flex-1 relative overflow-hidden h-auto min-h-0"
              noPadding
            >
              <Link href={`/books/${bookId}`} className="block w-full h-full hover:opacity-80 transition-opacity">
                <div className="flex flex-col justify-center p-5 md:p-6 w-full h-full relative">
                  <div className="absolute top-0 right-0 bg-[#111111] text-white px-3 py-0.5 font-mono text-[8px] font-black tracking-widest uppercase">
                    LOG_ARCHIVE
                  </div>

                  <div className="flex flex-col gap-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity size={14} className="opacity-40" />
                      <h1 className="font-serif text-[10px] font-bold uppercase tracking-widest opacity-60 italic">
                        Sortie History
                      </h1>
                    </div>
                    <span className="text-2xl md:text-3xl font-black leading-tight uppercase tracking-tighter">
                      {bookTitle}
                    </span>
                    <span className="font-mono text-[9px] font-black opacity-30 mt-1 uppercase tracking-tighter">
                      VOL_ID: {bookId}
                    </span>
                  </div>
                </div>
              </Link>
            </CardComponent>
          </div>

          {/* RIGHT: STATS (30%) */}
          <aside className="lg:col-span-4 flex">
            <CardComponent
              className="riso-border bg-primary text-primary-foreground flex-1 relative overflow-hidden h-auto min-h-0"
              noPadding
            >
              <div className="flex flex-row items-center justify-between gap-4 p-5 md:p-6 w-full h-full relative">
                <div className="absolute inset-0 opacity-10 perforated pointer-events-none" />
                <div className="flex flex-col gap-0 relative z-10">
                  <span className="font-mono text-[9px] font-bold opacity-60 uppercase tracking-widest">
                    Total Attempts
                  </span>
                  <span className="text-4xl font-black leading-none">
                    {totalAttempts}
                  </span>
                </div>
                <Trophy className="text-[#ffe800] size-10 relative z-10 opacity-80" />
              </div>
            </CardComponent>
          </aside>
        </section>

        {/* PERFORMANCE DASHBOARD */}
        <HistoryDashboard sessions={sessions} />

        {/* SEARCH & FILTER */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-10 flex riso-border bg-card overflow-hidden group transition-all">
            <div className="bg-foreground text-background p-3 flex items-center px-4">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="SEARCH BY MISSION ID..."
              className="flex-1 px-4 py-2 font-mono font-bold text-xs outline-none placeholder:opacity-20 uppercase tracking-widest bg-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <Button variant="outline" className="w-full h-full bg-card hover:bg-[#ffe800] hover:text-[#111111] gap-3">
              <Filter size={16} /> Sort_Log
            </Button>
          </div>
        </section>

        {/* MISSION LOG */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b-2 border-border pb-3">
            <FileText size={24} className="text-primary" />
            <h2 className="font-serif text-xl font-black uppercase tracking-tight">
              Mission Records
            </h2>
          </div>

          {sessions.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="riso-border bg-foreground overflow-hidden">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 p-3 font-mono text-[8px] font-black uppercase tracking-widest text-background/40">
                <div className="col-span-3">Mission / Timestamp</div>
                <div className="col-span-2 text-center">Category</div>
                <div className="col-span-4 text-center">Score Metrics</div>
                <div className="col-span-3 text-right">Operation</div>
              </div>

              {sessions.map((session) => {
                const isInProgress = session.status === "in_progress";
                const dateStr = new Date(session.started_at).toLocaleString('en-US', {
                  month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
                }).replace(',', ' //');

                const isSimulation = session.settings?.mode === 'simulation';

                return (
                  <div
                    key={session.id}
                    className="grid grid-cols-1 md:grid-cols-12 p-4 md:p-5 border-t-2 border-border bg-card items-center group relative transition-all duration-200 hover:z-20 hover:shadow-[4px_4px_0px_#111111] hover:translate-y-[-2px]"
                  >
                    {/* Mission */}
                    <div className="col-span-1 md:col-span-3 mb-3 md:mb-0">
                      <div className="font-mono font-black text-base mb-0.5 tracking-tighter group-hover:text-primary transition-colors truncate">
                        {session.id.slice(0, 8).toUpperCase()}...
                      </div>
                      <div className="font-mono text-[8px] font-bold opacity-40 uppercase tracking-widest">
                        {dateStr}
                      </div>
                    </div>

                    {/* Mode */}
                    <div className="col-span-1 md:col-span-2 flex justify-center mb-3 md:mb-0">
                      <span className="riso-border px-2 py-0.5 font-mono font-black text-[9px] tracking-widest uppercase bg-muted">
                        {isSimulation ? "Simulation" : "Practice"}
                      </span>
                    </div>

                    {/* Score */}
                    <div className="col-span-1 md:col-span-4 flex justify-center mb-4 md:mb-0">
                      {!isInProgress && session.total_score !== null ? (
                        <div className="flex items-center gap-5">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black">
                              {session.total_score}
                            </span>
                            <span className="font-mono text-[8px] font-bold opacity-30 tracking-widest uppercase">
                              pts
                            </span>
                          </div>
                          <div className="flex gap-3 border-l-2 border-border/10 pl-3 font-mono text-[8px] font-black uppercase tracking-tighter">
                            <div className="flex flex-col">
                              <span className="opacity-40">LC</span>
                              <span className="text-primary">
                                {session.score_listening}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="opacity-40">RC</span>
                              <span className="text-destructive">
                                {session.score_reading}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-foreground text-[#ffe800] px-3 py-1 riso-border">
                          <Clock size={12} className="animate-pulse" />
                          <span className="font-mono font-black text-[8px] uppercase tracking-widest">
                            Active_Session
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 md:col-span-3 flex justify-end">
                      {isInProgress ? (
                        <Button
                          onClick={() => handleResume(session.id)}
                          className="w-full md:w-auto bg-[#ffe800] text-[#111111] hover:bg-[#ffe800]/90 border-2"
                          size="sm"
                        >
                          <Play size={14} fill="currentColor" /> Resume
                        </Button>
                      ) : (
                        <div className="flex gap-2 w-full md:w-auto">
                          {isPremiumMode ? (
                            <Button asChild variant="default" size="sm" className="w-full md:w-auto">
                              <Link href={`/exam/result/${session.id}`}>
                                Review
                              </Link>
                            </Button>
                          ) : (
                            <Button asChild variant="outline" size="sm" className="w-full md:w-auto bg-card text-card-foreground">
                              <Link href={`/exam/result/${session.id}`}>
                                Summary
                              </Link>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* PREMIUM PROMPT */}
        {!isPremiumMode && (
          <CardComponent
            className="bg-[#111111] text-white border-none h-[10%]"
            noPadding
          >
            <div className="relative p-6 md:p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-10 perforated pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
                <div className="bg-[#ffe800] p-4 riso-border transform -rotate-2 text-[#111111]">
                  <Lock size={32} />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-serif text-xl font-black uppercase tracking-tight text-[#ffe800]">
                    Unlock Analysis Intel
                  </h3>
                  <p className="font-mono text-[10px] opacity-60 leading-relaxed uppercase tracking-widest text-gray-300">
                    Upgrade for deep-dive transcript data and AI feedback for all past missions.
                  </p>
                </div>
                <Button
                  className="w-full md:w-auto px-8 py-3 h-auto text-base hover:translate-y-[-2px] bg-[#ffe800] text-[#111111] hover:bg-[#ffe800] hover:text-[#111111]"
                  onClick={() => setIsPremiumMode(true)}
                >
                  UPGRADE
                </Button>
              </div>
            </div>
          </CardComponent>
        )}
      </main>

      {/* DEV TOGGLE */}
      {/* <div className="fixed bottom-6 left-6 z-[110] flex flex-col gap-2 pointer-events-none">
        <Button
          onClick={() => setIsPremiumMode(!isPremiumMode)}
          className={cn(
            "pointer-events-auto flex items-center gap-3",
            isPremiumMode
              ? "bg-primary text-primary-foreground"
              : "bg-destructive text-destructive-foreground"
          )}
        >
          {isPremiumMode ? <ShieldCheck size={16} /> : <Lock size={16} />}
          <span className="font-black text-[9px] uppercase tracking-widest">
            {isPremiumMode ? "PREMIUM_ON" : "GUEST_MODE"}
          </span>
        </Button>
      </div> */}

      <footer className="max-w-6xl mx-auto pb-12 mt-6 px-4 opacity-20">
        <div className="flex justify-between font-mono text-[8px] font-black uppercase tracking-[0.3em] border-t-2 border-border pt-4">
          <span>Sys: TOEIC_ARCHIVE_V2</span>
          <span>© 2024</span>
        </div>
      </footer>
    </div>
  );
}
