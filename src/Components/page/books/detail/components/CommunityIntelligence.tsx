import React from "react";
import { Users, Crosshair, RefreshCcw } from "lucide-react";
import { CardComponent } from "@/Components/ui/CardComponent";
import { cn } from "@/utils/utils";

interface CommunityIntelligenceProps {
    avgScore: number;
    totalTakers: number;
    updatedAt: string | null;
}

export function CommunityIntelligence({
    avgScore,
    totalTakers,
    updatedAt,
}: CommunityIntelligenceProps) {
    // 1. Handle Low Data Scenario
    if (totalTakers < 5 || !avgScore) {
        return (
            <CardComponent className="bg-[#111111] text-white overflow-hidden relative" noPadding>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />
                <div className="p-6 relative z-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-gray-400">
                        <div className="p-2 bg-white/5 rounded-full">
                            <Users size={18} className="text-gray-500" />
                        </div>
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-0.5">
                                Community Stats
                            </h3>
                            <p className="text-sm font-bold text-gray-300">
                                Not enough data to show averages yet.
                            </p>
                        </div>
                    </div>
                    <div className="text-[10px] font-mono font-bold text-gray-600 bg-black/40 px-2 py-1 rounded">
                        PENDING
                    </div>
                </div>
            </CardComponent>
        );
    }

    // 2. Format Date
    const lastUpdated = updatedAt
        ? new Date(updatedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })
        : "Recently";

    // 3. Render Active Stats
    return (
        <CardComponent className="bg-[#111111] text-white overflow-hidden relative group" noPadding>
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />

            {/* HEADER */}
            <div className="p-6 pb-2 relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#ffe800]">
                    <Users size={16} />
                    <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-widest">
                            Community Stats
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 mt-0.5">
                            Based on other students' performance
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-gray-500 uppercase">
                    <RefreshCcw size={10} />
                    <span>Updated: {lastUpdated}</span>
                </div>
            </div>

            {/* METRICS GRID */}
            <div className="p-6 pt-4 relative z-10 grid grid-cols-2 gap-8">

                {/* Metric 1: Total Agents */}
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                        Total Participants
                    </span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white leading-none">
                            {totalTakers.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-gray-600 uppercase">
                            Students
                        </span>
                    </div>
                </div>

                {/* Metric 2: Avg Score */}
                <div className="flex flex-col gap-1 border-l border-white/10 pl-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                        Average Score
                    </span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-[#ffe800] leading-none">
                            {Math.round(avgScore)}
                        </span>
                        <span className="text-xs font-bold text-gray-600 uppercase">
                            / 990
                        </span>
                    </div>
                </div>
            </div>
            {/* FOOTER BAR */}
            <div className="h-1 w-full bg-white/5 mt-0 relative">
                <div
                    className="absolute top-0 left-0 h-full bg-[#ffe800] transition-all duration-1000"
                    style={{ width: `${(avgScore / 990) * 100}%` }}
                />
            </div>
        </CardComponent>
    );
}
