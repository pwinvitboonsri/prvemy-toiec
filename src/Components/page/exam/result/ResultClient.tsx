"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Home,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/utils";
import { ExamResult } from "@/services/result/getResult";
import { ResultHeader } from "./components/ResultHeader";
import { ResultAnalytics } from "./components/ResultAnalytics";
import { ResultReview } from "./components/ResultReview";
import { ResultStickyFooter } from "./components/ResultStickyFooter";

import { PRICING } from "../../../../../config/constant";
import { UserRole } from "@/types/data/library_data";

interface ResultClientProps {
  result: ExamResult | null;
  userStatus: UserRole;
}

export function ResultClient({ result, userStatus }: ResultClientProps) {
  // Use dynamic data from result or fallbacks
  const scoreData = {
    total: result?.totalScore ?? 0,
    listening: result?.listeningScore ?? 0,
    reading: result?.readingScore ?? 0,
    parts: result?.sectionAnalytics ?? [],
    summary: {
      correct: result?.correctCount ?? 0,
      incorrect: result?.incorrectCount ?? 0,
      skipped: result?.skippedCount ?? 0,
    }
  };

  // Dynamic Premium check base on User Role
  const [isPremium, setIsPremium] = useState(
    userStatus === PRICING.TIER_NAMES.PLATINUM ||
    userStatus === "premium" ||
    userStatus === PRICING.TIER_NAMES.GOLD ||
    userStatus === PRICING.TIER_NAMES.SILVER
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#ffe800] overflow-x-hidden">
      {/* NAVIGATION */}
      <nav className="sticky top-0 h-16 bg-background border-b-2 border-border flex items-center justify-between px-4 md:px-8 z-50">
        <Link
          href={result?.bookId ? `/books/${result.bookId}` : "/dashboard"}
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
        <ResultHeader
          scoreData={scoreData}
          bookTitle={result?.bookTitle || "Exam Result"}
          settings={result?.settings}
        />
        <ResultAnalytics
          scoreData={scoreData}
          isPremium={isPremium}
          onUpgrade={() => setIsPremium(true)}
        />
        <ResultReview
          detailedReview={result?.detailedReview || []}
          isPremium={isPremium}
          onUpgrade={() => setIsPremium(true)}
        />
      </main>

      <ResultStickyFooter
        isPremium={isPremium}
        onUpgrade={() => setIsPremium(true)}
      />
    </div>
  );
}