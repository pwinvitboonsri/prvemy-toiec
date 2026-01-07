"use client";

import { CardComponent } from "@/Components/ui/CardComponent";
import { cn } from "@/utils/utils";
import { Activity, TrendingUp, BarChart2 } from "lucide-react";

interface HistorySession {
    id: string;
    started_at: string;
    status: "in_progress" | "completed" | "abandoned";
    total_score: number | null;
    score_listening: number | null;
    score_reading: number | null;
    settings: any;
}

interface HistoryDashboardProps {
    sessions: HistorySession[];
}

export function HistoryDashboard({ sessions }: HistoryDashboardProps) {
    // 1. Process Data
    const completedSessions = sessions
        .filter((s) => s.status === "completed" && s.total_score !== null)
        .sort(
            (a, b) =>
                new Date(a.started_at).getTime() - new Date(b.started_at).getTime()
        );

    const totalSessions = completedSessions.length;

    if (totalSessions === 0) return null;

    // 2. Calculate Stats
    const totalScoreSum = completedSessions.reduce(
        (sum, s) => sum + (s.total_score || 0),
        0
    );
    const avgScore = Math.round(totalScoreSum / totalSessions);

    const bestScore = completedSessions.reduce(
        (max, s) => Math.max(max, s.total_score || 0),
        0
    );

    const avgListening =
        Math.round(
            completedSessions.reduce((sum, s) => sum + (s.score_listening || 0), 0) /
            totalSessions
        ) || 0;

    const avgReading =
        Math.round(
            completedSessions.reduce((sum, s) => sum + (s.score_reading || 0), 0) /
            totalSessions
        ) || 0;

    // 3. Prepare Trend Data (Last 10 sessions)
    const trendData = completedSessions.slice(-10).map((s) => s.total_score || 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
            {/* LEFT: SUMMARY STATS (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
                <CardComponent className="bg-[#111111] text-white flex-1" noPadding>
                    <div className="p-6 h-full flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="font-mono text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">
                                    Avg. Performance
                                </span>
                                <span className="text-5xl font-black text-[#ffe800] leading-none">
                                    {avgScore}
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="font-mono text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">
                                    Personal Best
                                </span>
                                <span className="text-3xl font-black text-white leading-none">
                                    {bestScore}
                                </span>
                            </div>
                        </div>

                        {/* Proficiency Split */}
                        <div className="mt-8">
                            <div className="flex justify-between text-[9px] font-mono font-black uppercase text-gray-400 mb-2">
                                <span>Listening: {avgListening}</span>
                                <span>Reading: {avgReading}</span>
                            </div>
                            <div className="flex h-2 w-full bg-gray-800 borderborder-gray-700 overflow-hidden">
                                <div
                                    className="h-full bg-[#1d3b88]"
                                    style={{ width: `${(avgListening / 495) * 50 + 25}%` }} // Simplified visual balancing
                                ></div>
                                <div
                                    className="h-full bg-[#ff3333]"
                                    style={{ width: `${(avgReading / 495) * 50 + 25}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </CardComponent>
            </div>

            {/* RIGHT: TREND GRAPH (8 cols) */}
            <div className="lg:col-span-8">
                <CardComponent className="bg-white h-full min-h-[12rem]" noPadding>
                    <div className="p-6 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-6 pb-3">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={16} className="text-[#1d3b88]" />
                                <h3 className="font-serif text-lg font-black uppercase tracking-tight text-[#111111]">
                                    Performance Trajectory
                                </h3>
                            </div>
                            <span className="font-mono text-[9px] font-bold bg-[#f2f0e9] px-2 py-1 uppercase tracking-widest border border-[#111111]">
                                Last {trendData.length} Sorties
                            </span>
                        </div>

                        {/* BAR GRAPH CONTAINER */}
                        <div className="flex-1 flex items-end gap-2 w-full h-full relative">
                            {/* Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                                <div className="w-full h-px bg-[#111111] border-dashed"></div>
                                <div className="w-full h-px bg-[#111111] border-dashed"></div>
                                <div className="w-full h-px bg-[#111111] border-dashed"></div>
                            </div>

                            {trendData.map((score, idx) => {
                                const heightPct = Math.max((score / 990) * 100, 10);
                                return (
                                    <div key={idx} className="flex-1 flex flex-col justify-end group h-full relative z-10">
                                        <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity mb-2 font-mono text-[10px] font-bold bg-[#111111] text-white py-0.5 rounded-sm absolute bottom-full left-1/2 -translate-x-1/2 w-max px-1 pointer-events-none">
                                            {score} pts
                                        </div>
                                        <div
                                            className="w-full bg-[#e2e2e2] hover:bg-[#1d3b88] transition-colors rounded-t-sm relative border-t-2 border-x border-[#111111]/10 group-hover:border-[#1d3b88]"
                                            style={{ height: `${heightPct}%` }}
                                        ></div>
                                        <div className="mt-2 text-center font-mono text-[8px] font-bold text-gray-300 group-hover:text-[#111111]">
                                            {idx + 1}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </CardComponent>
            </div>
        </div>
    );
}
