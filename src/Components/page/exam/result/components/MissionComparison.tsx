import React from "react";
import { CardComponent } from "@/Components/ui/CardComponent";
import { cn } from "@/utils/utils";
import { BarChart, ArrowUp, ArrowDown, Minus } from "lucide-react";

interface MissionComparisonProps {
    userScore: {
        total: number;
        listening: number;
        reading: number;
    };
    globalStats: {
        avgScore: number;
        avgListening: number;
        avgReading: number;
    };
}

export function MissionComparison({ userScore, globalStats }: MissionComparisonProps) {
    if (!globalStats.avgScore) return null;

    const getDiff = (user: number, avg: number) => {
        const diff = user - avg;
        if (diff > 0) return { icon: ArrowUp, color: "text-green-500", text: `+${diff}` };
        if (diff < 0) return { icon: ArrowDown, color: "text-red-500", text: `${diff}` };
        return { icon: Minus, color: "text-gray-500", text: "Same" };
    };

    const totalDiff = getDiff(userScore.total, globalStats.avgScore);

    return (
        <CardComponent className="bg-white border-2 border-border" noPadding>
            <div className="p-6 md:p-8">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#1d3b88] text-white rounded-sm">
                            <BarChart size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#111111]">
                                Score Comparison
                            </h3>
                            <p className="text-xs font-bold text-gray-400">
                                How you performed vs. Global Average
                            </p>
                        </div>
                    </div>
                </div>

                {/* MAIN COMPARISON GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* TOTAL SCORE */}
                    <div className="bg-gray-50 p-4 border-2 border-dashed border-gray-200">
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                            Total Score
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <span className="text-3xl font-black text-[#111111] leading-none block">
                                    {Math.round(userScore.total)}
                                </span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">
                                    Your Score
                                </span>
                            </div>
                            <div className="h-8 w-[1px] bg-gray-300 mx-4" />
                            <div className="text-right">
                                <span className="text-xl font-black text-gray-500 leading-none block">
                                    {Math.round(globalStats.avgScore)}
                                </span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">
                                    Global Avg
                                </span>
                            </div>
                        </div>

                        <div className={cn("mt-4 flex items-center gap-1 text-xs font-black uppercase", totalDiff.color)}>
                            <totalDiff.icon size={14} />
                            <span>{totalDiff.text} pts vs Average</span>
                        </div>
                    </div>

                    {/* LISTENING */}
                    <div className="bg-gray-50 p-4 border border-gray-100">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#1d3b88] mb-2">
                            Listening
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-[#111111]">
                                    {Math.round(userScore.listening)}
                                </span>
                                <span className="text-[9px] font-bold text-gray-400">YOU</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl font-black text-gray-400">
                                    {Math.round(globalStats.avgListening)}
                                </span>
                                <span className="text-[9px] font-bold text-gray-400">AVG</span>
                            </div>
                        </div>
                        {/* Simple visual bar */}
                        <div className="mt-3 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex">
                            <div className="h-full bg-[#1d3b88]" style={{ width: `${(userScore.listening / 495) * 100}%` }} />
                        </div>
                    </div>

                    {/* READING */}
                    <div className="bg-gray-50 p-4 border border-gray-100">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#ff3333] mb-2">
                            Reading
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-[#111111]">
                                    {Math.round(userScore.reading)}
                                </span>
                                <span className="text-[9px] font-bold text-gray-400">YOU</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl font-black text-gray-400">
                                    {Math.round(globalStats.avgReading)}
                                </span>
                                <span className="text-[9px] font-bold text-gray-400">AVG</span>
                            </div>
                        </div>
                        {/* Simple visual bar */}
                        <div className="mt-3 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex">
                            <div className="h-full bg-[#ff3333]" style={{ width: `${(userScore.reading / 495) * 100}%` }} />
                        </div>
                    </div>
                </div>
            </div>
        </CardComponent>
    );
}
