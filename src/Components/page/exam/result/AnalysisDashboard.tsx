"use client";

import { useState } from "react";
import { ExamResult } from "@/services/result/getResult";
import { cn } from "@/utils/utils";
import {
    Lock,
    Download,
    Bookmark,
    Check,
    RotateCcw,
    ArrowRight,
    Unlock,
    PlayCircle,
    ChevronDown,
    ChevronUp,
    Link,
    Grid,
    FileText,
} from "lucide-react";
import { CardComponent } from "@/Components/ui/CardComponent";
import { Button } from "@/Components/ui/button/Button";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisDashboardProps {
    result: ExamResult;
    isFreeMode: boolean;
}

export function AnalysisDashboard({ result, isFreeMode }: AnalysisDashboardProps) {
    const [activeTab, setActiveTab] = useState<"review" | "analysis" | "vocab">("review");

    return (
        <div className="flex flex-col h-full w-full">

            {/* HEADER */}
            <div className="bg-gray-100 p-4 border-b-2 border-[#1a1a1a] flex justify-between items-center shrink-0">
                <h3 className="font-black text-lg uppercase tracking-tight flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#2d3e75]" /> Detailed Analysis
                </h3>
                <button className="bg-white border border-gray-400 px-2 py-1 text-[10px] font-bold uppercase hover:bg-[#e4c446] transition-colors">
                    PDF Export
                </button>
            </div>

            {/* TABS */}
            <div className="flex pl-[2px] bg-[#f0f0f0] border-b-2 border-[#1a1a1a] shrink-0">
                {isFreeMode ? (
                    <button className="px-5 py-3 font-black uppercase text-[0.75rem] bg-white text-[#1a1a1a] border-r border-[#ddd] shadow-[inset_0_3px_0_#2d3e75] cursor-default">
                        Restricted Data
                    </button>
                ) : (
                    <>
                        <TabButton label="Review Mistakes" active={activeTab === "review"} onClick={() => setActiveTab("review")} />
                        <TabButton label="Performance" active={activeTab === "analysis"} onClick={() => setActiveTab("analysis")} />
                        <TabButton label="Vocabulary" active={activeTab === "vocab"} onClick={() => setActiveTab("vocab")} />
                    </>
                )}
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 bg-white relative overflow-hidden flex flex-col">

                {/* 1. FREE USER LOCK */}
                {isFreeMode && (
                    <div className="absolute inset-0 z-20 bg-white flex flex-col p-6">
                        <div className="filter blur-sm opacity-40 select-none pointer-events-none flex-1 space-y-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-12 bg-gray-100 w-full border border-gray-200"></div>
                            ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="bg-[#e4c446] border-2 border-[#1a1a1a] p-6 text-center shadow-[8px_8px_0px_#1a1a1a] max-w-xs transform -rotate-1">
                                <Lock className="w-8 h-8 mx-auto mb-3 text-[#1a1a1a]" />
                                <h2 className="font-black text-lg uppercase mb-2">Classified Data</h2>
                                <p className="font-mono text-xs mb-4 leading-relaxed font-bold opacity-80">
                                    Unlock deep analysis and review your mistakes with Pro access.
                                </p>
                                <Button className="w-full py-3 bg-[#1a1a1a] text-white font-black uppercase text-xs hover:bg-[#2d3e75] border-0 rounded-none shadow-md">
                                    Unlock Full Access
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. PRO USER CONTENT */}
                {!isFreeMode && (
                    <div className="flex flex-col h-full overflow-y-auto custom-scroll">
                        {activeTab === 'review' && (
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-4">
                                    <div>
                                        <h3 className="font-black text-2xl uppercase tracking-tight">Detailed Review</h3>
                                        <p className="font-mono text-xs opacity-60 mt-1">Filtering by: <span className="underline font-bold text-[#d13a3a]">Incorrect Answers</span></p>
                                    </div>
                                </div>
                                {/* Mock Review Item */}
                                <div className="flex items-start gap-3 p-4 border-b border-dashed border-gray-300 hover:bg-[#f8fafc] transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-[#fee2e2] text-[#991b1b] border-2 border-[#991b1b] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">101</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <p className="text-[10px] font-black uppercase text-gray-400">Part 5</p>
                                            <span className="text-[10px] font-mono text-[#d13a3a] bg-red-50 px-2 rounded">Missed</span>
                                        </div>
                                        <p className="text-sm font-bold text-[#1a1a1a] mb-2 font-mono">Sample question text...</p>
                                        <div className="flex gap-4 text-xs font-mono bg-gray-50 p-2 border border-gray-200 rounded items-center">
                                            <span className="text-red-600 line-through opacity-70">A) wrong</span>
                                            <span className="text-green-700 font-bold flex items-center gap-1"><Check className="w-3 h-3" /> B) correct</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'analysis' && (
                            <div className="p-6 flex flex-col items-center justify-center h-full">
                                <p className="font-mono text-xs text-gray-400">Performance Analysis Placeholder</p>
                            </div>
                        )}

                        {activeTab === 'vocab' && (
                            <div className="p-6 flex flex-col items-center justify-center h-full">
                                <p className="font-mono text-xs text-gray-400">Vocabulary Placeholder</p>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "padding-12px-20px font-black uppercase text-[0.75rem] px-5 py-3 border-r border-[#ddd] transition-all",
                active ? "bg-white text-[#1a1a1a] shadow-[inset_0_3px_0_#2d3e75]" : "bg-[#f0f0f0] text-[#666] hover:bg-white hover:text-[#1a1a1a]"
            )}
        >
            {label}
        </button>
    )
}