"use client";

import { useEffect, useState } from "react";
import { ExamResult } from "@/services/result/getResult";
import { cn } from "@/utils/utils";
import { FileCheck, Target, Headphones, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ScoreCardProps {
    result: ExamResult;
    isFreeMode: boolean;
    onOpenDossier: () => void;
    isOpen: boolean;
}

export function ScoreCard({ result, isFreeMode, onOpenDossier, isOpen }: ScoreCardProps) {
    const [scoreAnimated, setScoreAnimated] = useState(0);
    const [listeningAnimated, setListeningAnimated] = useState(0);
    const [readingAnimated, setReadingAnimated] = useState(0);

    useEffect(() => {
        const duration = 1000;
        const steps = 60;
        const interval = duration / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = Math.min(currentStep / steps, 1);
            const ease = 1 - (1 - progress) * (1 - progress);

            setScoreAnimated(Math.floor(ease * result.totalScore));
            setListeningAnimated(Math.floor(ease * result.listeningScore));
            setReadingAnimated(Math.floor(ease * result.readingScore));

            if (currentStep >= steps) clearInterval(timer);
        }, interval);

        return () => clearInterval(timer);
    }, [result]);

    return (
        <div className="w-full md:w-[420px] bg-white border-[3px] border-[#111111] relative z-20 transition-all duration-600 shrink-0 flex flex-col h-full">
            {/* HEADER */}
            <div className="bg-[#111111] text-white p-4 flex justify-between items-center border-b-2 border-[#2d3e75] shrink-0">
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#e4c446]" />
                    <span className="font-black uppercase tracking-widest text-sm" id="header-title">
                        {isFreeMode ? "Estimation" : "Mission Debrief"}
                    </span>
                </div>
                <span className={cn(
                    "font-mono text-xs opacity-80 px-2 py-1 rounded",
                    isFreeMode ? "bg-red-100 text-red-600 font-black" : "bg-white/20 text-white"
                )}>
                    {isFreeMode ? "UNSAVED" : "SAVED"}
                </span>
            </div>

            <div className="p-8 flex-1 flex flex-col">
                {/* BIG SCORE */}
                <div className="flex flex-col items-center justify-center p-8 bg-[#f8fafc] border-2 border-[#111111] mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: "radial-gradient(#d4d4d4 1px, transparent 1px)", backgroundSize: "4px 4px" }}></div>

                    <p className="text-[10px] font-bold uppercase text-gray-500 mb-2 tracking-widest relative z-10">Total Score</p>
                    <h1 className="text-7xl font-black text-[#2d3e75] tracking-tighter leading-none relative z-10">{scoreAnimated}</h1>
                    <div className="w-12 h-1 bg-[#111111] my-3 relative z-10"></div>
                    <p className="font-mono text-xs font-bold text-gray-400 relative z-10">MAX 990</p>
                </div>

                {/* BREAKDOWN */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="border-2 border-[#111111] p-4 text-center">
                        <span className="text-[10px] font-bold uppercase mb-1 text-gray-500 block">Listening</span>
                        <span className="text-2xl font-black text-[#2d3e75]">{listeningAnimated}</span>
                    </div>
                    <div className="border-2 border-[#111111] p-4 text-center">
                        <span className="text-[10px] font-bold uppercase mb-1 text-gray-500 block">Reading</span>
                        <span className="text-2xl font-black text-[#d13a3a]">{readingAnimated}</span>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-auto space-y-3">
                    <button
                        onClick={onOpenDossier}
                        className="w-full p-4 bg-[#2d3e75] text-white font-black uppercase text-sm border-2 border-[#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 group active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#2d3e75]"
                    >
                        <span>{isOpen ? "Close Mission Dossier" : "Open Mission Dossier"}</span>
                        <BookOpen className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    </button>

                    <Link
                        href={`/books/${result.bookId}`}
                        className="w-full p-4 bg-white text-[#111111] font-black uppercase text-sm border-2 border-[#111111] hover:bg-gray-50 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 group active:translate-x-0 active:translate-y-0 active:shadow-none"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Return to Book
                    </Link>
                </div>
            </div>
        </div>
    );
}