"use client";

import { BarChart2, Lock, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { CardComponent } from "@/Components/ui/CardComponent";
import { Button } from "@/Components/ui/Button/Button";
import Link from "next/link";

interface FlightRecordsProps {
  bookId: string; // Added for routing
  userRole?: "guest" | "free" | "premium";
  bestScore?: number | null;
  sessionsCount?: number;
  listeningScore?: number | null;
  readingScore?: number | null;
  scoreTrend?: number[];
}

export function FlightRecords({
  bookId,
  userRole = "free",
  bestScore = null,
  sessionsCount = 0,
  listeningScore = 0,
  readingScore = 0,
  scoreTrend = [],
}: FlightRecordsProps) {
  const isGuest = userRole === "guest";

  // Sanitize scoreTrend to ensure only valid numbers
  const validScoreTrend = Array.isArray(scoreTrend)
    ? scoreTrend.filter((s) => typeof s === "number" && !isNaN(s))
    : [];

  // Calculate Trend Change (Last Score - Previous Score)
  let trendChange = 0;
  if (validScoreTrend.length >= 2) {
    trendChange =
      validScoreTrend[validScoreTrend.length - 1] -
      validScoreTrend[validScoreTrend.length - 2];
  } else if (validScoreTrend.length === 1) {
    trendChange = validScoreTrend[0];
  }

  // Debug log to verify data reception
  console.log("FlightRecords scoreTrend:", validScoreTrend);

  return (
    <CardComponent
      sideLabel="CONFIDENTIAL"
      className="h-full min-h-[18rem] w-full max-w-full overflow-visible z-10 bg-white"
      footerClassName="bg-white border-dashed"
      footer={
        <Link
          href={`/books/${bookId}/history`}
          className="flex items-center justify-between w-full group"
        >
          <span className="font-mono text-xs font-bold uppercase text-gray-500 transition-colors tracking-wider">
            Access Full Dossier
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            asChild
            className="h-8 w-8 rounded-none border-2 transition-all"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Link>
      }
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h4 className="mb-2 flex items-center gap-3 text-3xl font-black uppercase leading-none text-[#111111]">
              Flight Records
              <BarChart2 className="h-6 w-6 text-[#1d3b88]" />
            </h4>
            <span className="font-mono text-xs opacity-60">
              PERSONAL DATABASE • ID: BK-1024
            </span>
          </div>
          {!isGuest && (
            <div className="hidden border border-[#111111] bg-[#ffe800] px-2 py-1 text-[10px] font-bold text-[#111111] md:block">
              {sessionsCount} SORTIES
            </div>
          )}
        </div>

        <div className="relative flex flex-1 flex-col">
          {isGuest ? (
            /* GUEST STATE */
            <div className="relative mb-6 flex flex-1 flex-col justify-center border-2 border-dashed border-gray-300 bg-gray-50/50 p-6">
              <div className="absolute inset-0 flex flex-col justify-center gap-4 px-8 opacity-20 blur-sm filter pointer-events-none select-none">
                <div className="flex h-12 w-full items-end justify-between">
                  <div className="h-full w-4 bg-gray-400"></div>
                  <div className="h-1/2 w-4 bg-gray-400"></div>
                  <div className="h-3/4 w-4 bg-gray-400"></div>
                  <div className="h-1/4 w-4 bg-gray-400"></div>
                  <div className="h-full w-4 bg-gray-400"></div>
                </div>
                <div className="h-2 w-full bg-gray-300"></div>
              </div>
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                <div className="mb-2 flex items-center gap-2 border-2 border-[#ff3333] bg-white px-6 py-3">
                  <Lock className="h-4 w-4 text-[#ff3333]" />
                  <span className="text-xs font-black uppercase tracking-widest text-[#ff3333]">
                    Restricted
                  </span>
                </div>
                <span className="font-mono text-[10px] text-gray-500">
                  Login to unlock analytics
                </span>
              </div>
            </div>
          ) : (
            /* USER STATE */
            <div className="mb-6 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-3 items-end">
              {/* Personal Best */}
              <div className="col-span-1 border-r-0 border-dashed border-gray-200 pr-0 lg:border-r-2 lg:pr-4">
                <p className="mb-1 text-[10px] font-bold uppercase text-gray-400">
                  Personal Best
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black text-[#1d3b88] leading-none">
                    {bestScore ?? 0}
                  </span>
                  <span className="text-xs font-bold text-gray-400">/ 990</span>
                </div>
                {bestScore !== null && bestScore > 0 && (
                  <div className="mt-2 inline-block border border-green-200 bg-green-50 px-1 font-mono text-[10px] text-green-600">
                    {bestScore >= 800
                      ? "▲ Top 10%"
                      : bestScore >= 600
                        ? "▲ Top 30%"
                        : "— Avg."}
                  </div>
                )}
              </div>

              {/* Score Trend */}
              <div className="col-span-1 flex flex-col justify-between lg:col-span-2">
                <div className="mb-4">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase text-gray-400">
                      Score Trend
                    </p>
                    <span
                      className={cn(
                        "font-mono text-[10px]",
                        trendChange >= 0 ? "text-[#1d3b88]" : "text-[#ff3333]"
                      )}
                    >
                      {trendChange > 0 ? "+" : ""}
                      {trendChange}pts
                    </span>
                  </div>
                  {/* Dynamic Bar Graph */}
                  <div className="flex h-12 w-full items-end gap-1">
                    {validScoreTrend.length > 0
                      ? validScoreTrend.map((score, idx) => {
                        const heightPct = Math.max((score / 990) * 100, 5); // Min 5% height for visibility
                        return (
                          <div
                            key={idx}
                            className="flex-1 bg-gray-300 transition-colors relative group rounded-t-sm"
                            style={{ height: `${heightPct}%` }}
                            title={`Score: ${score}`}
                          ></div>
                        );
                      })
                      : // Placeholder bars if no history
                      [40, 50, 45, 60, 85].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gray-200 h-full opacity-50 rounded-t-sm"
                        ></div>
                      ))}
                  </div>
                </div>
                {/* L/R Balance */}
                <div>
                  <div className="mb-1 flex justify-between text-[8px] font-bold uppercase text-gray-400">
                    <span>L: {listeningScore}</span>
                    <span>R: {readingScore}</span>
                  </div>
                  <div className="flex h-1.5 w-full border border-gray-200 bg-gray-100 overflow-hidden">
                    <div
                      className="h-full bg-[#1d3b88]"
                      style={{ width: `${(listeningScore || 0) / 4.95}%` }} // Approx % of 990 half
                    ></div>
                    <div
                      className="h-full bg-[#ff3333]"
                      style={{ width: `${(readingScore || 0) / 4.95}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CardComponent>
  );
}
