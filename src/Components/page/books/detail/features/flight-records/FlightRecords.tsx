"use client";

import { useState } from "react";
import { BarChart2, Lock, ArrowUpRight, Award, Crosshair } from "lucide-react";
import { cn } from "@/utils/utils";
import { CardComponent } from "@/Components/ui/CardComponent";
import { Button } from "@/Components/ui/Button";
import Link from "next/link";

export interface FlightRecordStats {
  bestScore: number | null;
  sessionsCount: number;
  listeningScore: number | null;
  readingScore: number | null;
  scoreTrend: number[];
}

interface FlightRecordsProps {
  bookId: string;
  userRole?: "guest" | "free" | "premium";
  simulationData: FlightRecordStats;
  practiceData: FlightRecordStats;
  globalStats?: {
    avgScore: number;
    totalTakers: number;
    avgListening: number;
    avgReading: number;
    updatedAt: string | null;
  };
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  statsUpdatedAt?: string;
}

// Required Allman Style for the new calculation
const calculateSectorDelta = (personal: number, community: number) => {
  const delta = personal - community;
  return delta > 0 ? `+${delta}` : `${delta}`;
}

interface SectorAnalyticsProps {
  personal: { listening: number; reading: number; };
  community: { avgListening: number; avgReading: number; };
}

// Required Allman Style for the Analytics Component
const SectorAnalytics = ({ personal, community }: SectorAnalyticsProps) => {
  const lPercent = Math.min((personal.listening / 495) * 100, 100);
  const lAvgPercent = Math.min((community.avgListening / 495) * 100, 100);

  const rPercent = Math.min((personal.reading / 495) * 100, 100);
  const rAvgPercent = Math.min((community.avgReading / 495) * 100, 100);

  return (
    <div className="space-y-4 w-full">
      {/* Listening Sector */}
      <div>
        <div className="flex justify-between text-[9px] font-bold uppercase mb-1">
          <span className="text-[#1d3b88]">Listening</span>
          <div className="flex gap-2">
            <span className="text-gray-400">Avg: {Math.round(community.avgListening)}</span>
            <span className={cn(
              personal.listening >= community.avgListening ? "text-green-600" : "text-red-500"
            )}>
              {calculateSectorDelta(personal.listening, Math.round(community.avgListening))}
            </span>
          </div>
        </div>
        <div className="h-4 w-full bg-gray-100 relative overflow-visible rounded-sm">
          {/* Community Bar (Bottom Layer) */}
          <div
            className="h-full bg-gray-200 absolute left-0 top-0 rounded-sm"
            style={{ width: `${lAvgPercent}%` }}
          ></div>
          {/* Personal Bar (Top Layer - Riso Blue) */}
          <div
            className="h-full bg-[#1d3b88]/80 absolute left-0 top-0 rounded-sm transition-all duration-500 z-10"
            style={{ width: `${lPercent}%` }}
          ></div>
          {/* Community Notch (Needle) */}
          <div
            className="h-6 w-0.5 bg-black absolute top-1/2 -translate-y-1/2 z-20"
            style={{ left: `${lAvgPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Reading Sector */}
      <div>
        <div className="flex justify-between text-[9px] font-bold uppercase mb-1">
          <span className="text-[#ff3333]">Reading</span>
          <div className="flex gap-2">
            <span className="text-gray-400">Avg: {Math.round(community.avgReading)}</span>
            <span className={cn(
              personal.reading >= community.avgReading ? "text-green-600" : "text-red-500"
            )}>
              {calculateSectorDelta(personal.reading, Math.round(community.avgReading))}
            </span>
          </div>
        </div>
        <div className="h-4 w-full bg-gray-100 relative overflow-visible rounded-sm">
          {/* Community Bar (Bottom Layer) */}
          <div
            className="h-full bg-gray-200 absolute left-0 top-0 rounded-sm"
            style={{ width: `${rAvgPercent}%` }}
          ></div>
          {/* Personal Bar (Top Layer - Riso Red) */}
          <div
            className="h-full bg-[#ff3333]/80 absolute left-0 top-0 rounded-sm transition-all duration-500 z-10"
            style={{ width: `${rPercent}%` }}
          ></div>
          {/* Community Notch (Needle) */}
          <div
            className="h-6 w-0.5 bg-black absolute top-1/2 -translate-y-1/2 z-20"
            style={{ left: `${rAvgPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

interface MissionBestProps {
  score: number | null;
  avg: number;
  sessionsCount: number;
  activeTab: "simulation" | "practice";
}

// Required Allman Style for MissionBest
const MissionBest = ({ score, avg, sessionsCount, activeTab }: MissionBestProps) => {
  return (
    <div className="col-span-1 border-r-0 border-dashed border-gray-200 pr-0 lg:border-r-2 lg:pr-6 h-full flex flex-col justify-end">
      <div className="flex justify-between items-center mb-1">
        <p className="text-[10px] font-bold uppercase text-gray-400">
          Mission Best
        </p>
        <div className="border border-foreground bg-white dark:bg-neutral-800 px-1.5 py-0.5 text-[9px] font-bold text-foreground">
          {sessionsCount} {activeTab === "simulation" ? "TESTS" : "SESSIONS"}
        </div>
      </div>

      <div className="flex items-baseline gap-1 relative">
        <span className={cn(
          "text-6xl font-black leading-none transition-colors",
          activeTab === "simulation" ? "text-[#1d3b88]" : "text-foreground"
        )}>
          {score ?? 0}
        </span>
        {activeTab === "simulation" && <span className="text-xs font-bold text-gray-400">/ 990</span>}
      </div>

      {activeTab === "simulation" && (
        <div className="mt-2 flex items-center gap-2">
          <div className="text-[10px] font-mono text-gray-400">
            AVG: <span className="font-bold text-foreground">{Math.round(avg)}</span>
          </div>
          <div className={cn(
            "flex items-center text-[10px] font-bold px-1 py-0.5",
            (score || 0) >= avg ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"
          )}>
            {(score || 0) >= avg ? "▲" : "▼"}
            {calculateSectorDelta(score || 0, Math.round(avg))} pts
          </div>
        </div>
      )}
    </div>
  );
}

interface TrendAnalysisProps {
  data: number[];
  avg: number;
  bestScore: number | null;
  trendChange: number;
  activeTab: "simulation" | "practice";
  chartCeiling: number;
}

// Required Allman Style for TrendAnalysis
const TrendAnalysis = ({ data, avg, bestScore, trendChange, activeTab, chartCeiling }: TrendAnalysisProps) => {
  return (
    <div className="w-full flex flex-col justify-end h-full">
      <div className="mb-2">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase text-gray-400">
            Trend Analysis
            <span className="ml-2 text-[8px] opacity-50 font-mono text-gray-400">
              (MAX SCALE: {chartCeiling})
            </span>
          </p>
          {activeTab === "simulation" && (
            <span
              className={cn(
                "font-mono text-[10px]",
                trendChange >= 0 ? "text-[#1d3b88]" : "text-[#ff3333]"
              )}
            >
              {trendChange > 0 ? "+" : ""}
              {trendChange}pts
            </span>
          )}
        </div>

        {activeTab === "simulation" ? (
          /* SIMULATION: BAR GRAPH WITH COMMUNITY BASELINE */
          <div className="relative h-32 w-[calc(100%+3rem)] -mx-6 mt-4 px-6">
            {/* Baseline Line */}
            {avg > 0 && (
              <div
                className="absolute left-0 w-full z-0 border-t border-dashed border-yellow-600/60 flex justify-end items-end px-6"
                style={{ bottom: `${(avg / chartCeiling) * 100}%` }}
              >
                {/* <span className="text-[8px] font-mono font-bold text-yellow-700 bg-yellow-50 px-1 -mb-2.5 mr-0 shadow-sm border border-yellow-100">
                  AVG
                </span> */}
              </div>
            )}

            <div className="flex h-full w-full items-end gap-3 relative z-10">
              {data.length > 0
                ? data.map((score, idx) => {
                  const heightPct = Math.max((score / chartCeiling) * 100, 2); // Min 2% height
                  const isAbove = score >= avg;
                  const isHigh = heightPct > 80; // Threshold for swapping tooltip position

                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col justify-end group h-full relative"
                    >
                      <div
                        className={cn(
                          "w-full transition-all duration-500 rounded-t-sm relative hover:opacity-90 flex justify-center",
                          isAbove ? "bg-[#1d3b88]" : "bg-orange-400",
                          score === bestScore ? "ring-2 ring-offset-2 ring-[#1d3b88]" : ""
                        )}
                        style={{ height: `${heightPct}%` }}
                      >
                        {/* Tooltip on Hover */}
                        <div className={cn(
                          "absolute bg-black text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none",
                          isHigh ? "top-2" : "-top-7"
                        )}>
                          {score}
                        </div>
                      </div>
                    </div>
                  );
                })
                : [40, 50, 45, 60, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gray-100 h-full opacity-50 rounded-t-sm"
                  ></div>
                ))}
            </div>
          </div>
        ) : (
          /* PRACTICE: VERTICAL LOG */
          <div className="flex flex-col h-24 overflow-y-auto w-full pr-1 space-y-1 scrollbar-thin scrollbar-thumb-gray-200">
            {data.length > 0 ? (
              data.slice().reverse().map((score, i) => (
                <div key={i} className="flex items-center justify-between border-b border-dashed border-gray-200 py-1.5 last:border-0 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#1d3b88]"></div>
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-tight">
                      #{data.length - i}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-foreground">
                    {score}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full opacity-40">
                <span className="text-[10px] font-mono uppercase">No Data Logged</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function FlightRecords({
  bookId,
  userRole = "free",
  simulationData,
  practiceData,
  globalStats,
  difficulty = "HARD", // Default backup
  statsUpdatedAt,
}: FlightRecordsProps) {
  console.log("🚀 ~ FlightRecords ~ globalStats:", globalStats)

  const isGuest = userRole === "guest";
  const [activeTab, setActiveTab] = useState<"simulation" | "practice">("simulation");

  // Select data based on active tab
  const currentData = activeTab === "simulation" ? simulationData : practiceData;

  const {
    bestScore,
    sessionsCount,
    listeningScore,
    readingScore,
    scoreTrend,
  } = currentData;

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

  // Calculate Dynamic Chart Ceiling
  const maxScoreInTrend = Math.max(...validScoreTrend, globalStats?.avgScore || 0);
  let chartCeiling = 990;
  if (maxScoreInTrend < 300) chartCeiling = 300;
  else if (maxScoreInTrend < 600) chartCeiling = 600;

  // Last Update Formatting
  const lastUpdateText = (statsUpdatedAt || globalStats?.updatedAt)
    ? new Date(statsUpdatedAt || globalStats?.updatedAt || "").toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    : "Just Now";

  // Debug log to verify data reception
  console.log(`FlightRecords [${activeTab}] scoreTrend:`, validScoreTrend, "Ceiling:", chartCeiling);

  return (
    <CardComponent
      sideLabel="MISSION PROFILE"
      className="h-full min-h-[18rem] w-full max-w-full overflow-hidden z-10 bg-white dark:bg-neutral-900 relative"
      footerClassName="bg-white dark:bg-neutral-900 border-dashed"
      footer={
        <Link
          href={`/books/${bookId}/history`}
          className="flex items-center justify-between w-full group"
        >
          <span className="font-mono text-xs font-bold uppercase text-gray-500 transition-colors tracking-wider">
            Full Flight Log
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
      {/* Grid Texture Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>

      <div className="absolute top-2 right-2 flex flex-col items-end pointer-events-none z-0 opacity-10">
        <span className="font-mono text-[8px] uppercase">LAST_SYNC: {new Date().toISOString().split('T')[0].replace(/-/g, '.')}</span>
        <span className="font-mono text-[8px] uppercase">AGENTS_SAMPLED: {globalStats?.totalTakers || '00'}</span>
      </div>

      <div className="flex flex-col h-full relative z-10">
        {/* Header */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h4 className="flex items-center gap-2 text-2xl font-black uppercase leading-none text-foreground lg:text-3xl">
                Performance Analytics
              </h4>
            </div>
            <div className="flex items-center gap-3">
              {/* Status Badge */}
              <div className={cn(
                "px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white rounded-sm",
                (bestScore || 0) >= (globalStats?.avgScore || 0) ? "bg-[#1d3b88]" : "bg-[#ff3333]"
              )}>
                {(bestScore || 0) >= (globalStats?.avgScore || 0) ? "ELITE" : "RECRUIT"}
              </div>
              <span className="font-mono text-[10px] opacity-60 lg:text-xs uppercase">
                {(bestScore || 0) >= (globalStats?.avgScore || 0) ? "Mission Status: Above Community Baseline" : "Mission Status: Below Community Baseline"}
              </span>
            </div>
          </div>

          {/* TABS & Last Update */}
          {!isGuest && (
            <div className="flex flex-col items-end gap-1">
              <div className="text-[10px] font-mono text-gray-400 uppercase tracking-tight">
                Commu Last Update: <span className="text-foreground font-bold">{lastUpdateText}</span>
              </div>
              <div className="flex w-full items-center justify-between rounded-sm border border-gray-200 bg-gray-50 p-1 lg:w-auto gap-1">
                <button
                  onClick={() => setActiveTab("simulation")}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all rounded-sm lg:flex-none border",
                    activeTab === "simulation"
                      ? "bg-[#ffe800] border-[#ffe800] text-black shadow-sm"
                      : "bg-transparent border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Award size={12} />
                  Full Test
                </button>
                <button
                  onClick={() => setActiveTab("practice")}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all rounded-sm lg:flex-none border",
                    activeTab === "practice"
                      ? "bg-white border-gray-300 text-foreground shadow-sm"
                      : "bg-transparent border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Crosshair size={12} />
                  Practice
                </button>
              </div>
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
                <div className="mb-2 flex items-center gap-2 border-2 border-[#ff3333] bg-card px-6 py-3">
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
            /* USER STATE - REFERENCE LAYOUT (Split + Stacked) */
            <div className="mb-6 flex flex-1 flex-col gap-8 h-full">

              {/* TOP ROW: Metrics Split (Mission Best | Sector Analytics) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end h-auto">
                {/* COL 1: Mission Best */}
                <MissionBest
                  score={bestScore}
                  avg={globalStats?.avgScore || 0}
                  sessionsCount={sessionsCount}
                  activeTab={activeTab}
                />

                {/* COL 2: Sector Analytics */}
                <div className="h-full flex flex-col justify-end">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase text-gray-400">
                      Sector Analytics
                    </p>
                  </div>

                  {activeTab === "simulation" ? (
                    (globalStats && globalStats.totalTakers >= 5) ? (
                      <SectorAnalytics
                        personal={{ listening: listeningScore || 0, reading: readingScore || 0 }}
                        community={{ avgListening: globalStats.avgListening, avgReading: globalStats.avgReading }}
                      />
                    ) : (
                      <div className="h-20 flex items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50">
                        <span className="text-[10px] font-mono font-bold text-gray-400 animate-pulse">
                          COLLECTING SECTOR DATA...
                        </span>
                      </div>
                    )
                  ) : (
                    <div className="h-20 flex items-center justify-center opacity-40">
                      <span className="text-[10px] font-mono text-gray-400">Sector analysis unavailable in Practice Mode</span>
                    </div>
                  )}
                </div>
              </div>

              {/* BOTTOM ROW: Trend Analysis (Full Width) */}
              <div className="flex-1 min-h-[10rem] w-full h-full border-t-2 border-dashed border-gray-100 pt-6">
                <TrendAnalysis
                  data={validScoreTrend}
                  avg={globalStats?.avgScore || 0}
                  bestScore={bestScore}
                  trendChange={trendChange}
                  activeTab={activeTab}
                  chartCeiling={chartCeiling}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </CardComponent>
  );
}
