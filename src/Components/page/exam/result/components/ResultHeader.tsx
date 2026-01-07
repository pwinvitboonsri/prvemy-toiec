import React from "react";
import { Button } from "@/Components/ui/Button";
import { Download, Share2, Crown, Trophy, Target, Zap, Clock, Sliders, Monitor } from "lucide-react";
import { CardComponent } from "@/Components/ui/CardComponent";

interface ResultHeaderProps {
    scoreData: {
        total: number;
        listening: number;
        reading: number;
    };
    bookTitle?: string;
    settings?: any; // LobbySettings
}

export function ResultHeader({
    scoreData,
    settings,
}: ResultHeaderProps) {
    if (!settings && !scoreData) return null;

    return (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Main Result Card */}
            <div className="lg:col-span-8 flex flex-col gap-8">
                {/* Book Title Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-4 border-[#111111] pb-6">
                    <div>
                        <span className="font-mono text-xs font-bold bg-[#ffe800] px-2 py-1 mb-2 inline-block border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
                            EXAM RESULTS
                        </span>
                        <h1 className="font-serif text-3xl md:text-5xl font-black uppercase italic leading-none text-[#111111]">
                            ETS BOOK TEST 1
                        </h1>
                    </div>
                </div>

                {/* Mission Config Summary */}
                {settings && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="border-2 border-[#111111] p-3 flex flex-col gap-1 bg-[#f9f9f9] shadow-[4px_4px_0px_#111111] transition-transform hover:-translate-y-1">
                            <span className="text-[9px] font-black uppercase text-gray-500 flex items-center gap-2 border-b-2 border-dashed border-[#111111]/10 pb-2 mb-1">
                                <Monitor size={12} className="text-[#111111]" /> Mode
                            </span>
                            <span className="text-sm font-black uppercase text-primary tracking-tight">
                                {settings.mode || "Standard"}
                            </span>
                        </div>
                        <div className="border-2 border-[#111111] p-3 flex flex-col gap-1 bg-white shadow-[4px_4px_0px_#111111] transition-transform hover:-translate-y-1">
                            <span className="text-[9px] font-black uppercase text-gray-500 flex items-center gap-2 border-b-2 border-dashed border-[#111111]/10 pb-2 mb-1">
                                <Clock size={12} className="text-[#111111]" /> Time Limit
                            </span>
                            <span className="text-sm font-black font-mono">
                                {settings.time_limit}m
                            </span>
                        </div>
                        <div className="border-2 border-[#111111] p-3 flex flex-col gap-1 bg-white shadow-[4px_4px_0px_#111111] transition-transform hover:-translate-y-1">
                            <span className="text-[9px] font-black uppercase text-gray-500 flex items-center gap-2 border-b-2 border-dashed border-[#111111]/10 pb-2 mb-1">
                                <Zap size={12} className="text-[#111111]" /> Audio Speed
                            </span>
                            <span className="text-sm font-black font-mono">
                                {settings.audio_speed}x
                            </span>
                        </div>
                        <div className="border-2 border-[#111111] p-3 flex flex-col gap-1 bg-[#f9f9f9] shadow-[4px_4px_0px_#111111] transition-transform hover:-translate-y-1">
                            <span className="text-[9px] font-black uppercase text-gray-500 flex items-center gap-2 border-b-2 border-dashed border-[#111111]/10 pb-2 mb-1">
                                <Sliders size={12} className="text-[#111111]" /> Config
                            </span>
                            <div className="flex gap-2 pt-1">
                                {settings.hardcore_flags?.no_skip && (
                                    <span className="px-1.5 py-0.5 bg-[#ff3333] text-white text-[9px] font-bold uppercase border border-[#111111]">NoSkip</span>
                                )}
                                {settings.hardcore_flags?.no_review && (
                                    <span className="px-1.5 py-0.5 bg-[#ff3333] text-white text-[9px] font-bold uppercase border border-[#111111]">NoRev</span>
                                )}
                                {!settings.hardcore_flags?.no_skip && !settings.hardcore_flags?.no_review && (
                                    <span className="text-xs font-mono opacity-50 font-bold text-gray-400">Standard</span>
                                )}
                            </div>
                        </div>
                        {settings.focus_notes && (
                            <div className="col-span-2 lg:col-span-4 border-2 border-dashed border-[#111111]/30 p-4 bg-[#fffff0] relative mt-6">
                                {/* Tape effect */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#ffe800]/50 -rotate-2 border-l border-r border-[#111111]" />

                                <span className="text-[9px] font-black uppercase text-gray-400 flex items-center gap-2 mb-2">
                                    Focus Notes
                                </span>
                                <p className="text-sm font-handwriting font-bold text-[#111111] italic leading-relaxed">
                                    &quot;{settings.focus_notes}&quot;
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <CardComponent
                    className="bg-[#ffe800] text-[#111111] min-h-[250px] relative h-auto"
                    noPadding
                >
                    <div className="p-8 md:p-12 flex flex-col justify-center h-full relative z-10">


                        {/* Target Score Feedback - Only show if target_score is set */}
                        {settings?.target_score > 0 && (
                            <div className="absolute top-6 right-6 md:top-10 md:right-12 z-20">
                                <TargetScoreFeedback score={scoreData.total} target={settings.target_score} />
                            </div>
                        )}

                        <h1 className="font-serif text-lg font-bold uppercase tracking-widest mb-4 opacity-70 italic">
                            Final Estimated Score
                        </h1>
                        <div className="flex items-baseline gap-4 mb-2">
                            <span className="text-8xl md:text-9xl font-black tracking-tighter leading-none stroke-current"
                                style={{
                                    textShadow: "4px 4px 0px #ffffff"
                                }}>
                                {scoreData.total}
                            </span>
                            <span className="text-2xl font-black opacity-50 font-mono">
                                /990
                            </span>
                        </div>

                        {/* Target Score - Only show if target_score is set */}
                        {settings?.target_score > 0 && (
                            <div className="border-t-4 border-[#111111]/20 mt-6 pt-6 inline-flex flex-col gap-1">
                                <span className="font-mono text-xs font-bold uppercase tracking-wider opacity-60">Target Goal</span>
                                <span className="font-serif text-3xl font-black italic">
                                    {settings.target_score}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Background Pattern */}
                    <div className="absolute right-0 top-0 h-full w-1/3 opacity-5 pointer-events-none">
                        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/20 to-transparent" />
                    </div>
                </CardComponent>

                {/* Question Summary Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <CardComponent
                        noPadding
                        scrollable={false}
                        className="bg-[#111111] text-white p-6 relative overflow-hidden h-auto group hover:bg-[#1a1a1a] transition-colors border-none">
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <span className="font-mono text-xs font-bold text-[#ffe800] px-2 py-0.5 border border-[#ffe800] uppercase">Listening</span>
                                <Crown size={20} className="text-[#ffe800]" />
                            </div>
                            <div className="text-5xl font-black mb-1">{scoreData.listening}</div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Section Score</div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 text-[#ffe800]/5 text-9xl font-black leading-none select-none group-hover:scale-110 transition-transform duration-500">L</div>
                    </CardComponent>

                    <CardComponent
                        noPadding
                        scrollable={false}
                        className="bg-white text-[#111111] p-6 relative overflow-hidden h-auto group hover:bg-gray-50 transition-colors border-2">
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <span className="font-mono text-xs font-bold bg-[#111111] text-white px-2 py-0.5 uppercase">Reading</span>
                                <Target size={20} />
                            </div>
                            <div className="text-5xl font-black mb-1">{scoreData.reading}</div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Section Score</div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 text-[#111111]/5 text-9xl font-black leading-none select-none group-hover:scale-110 transition-transform duration-500">R</div>
                    </CardComponent>
                </div>
            </div>

            {/* Sidebar Actions */}
            <aside className="lg:col-span-4 flex flex-col gap-8">
                <CardComponent
                    noPadding
                    scrollable={false}
                    className="bg-white relative flex flex-col border-4  h-auto overflow-hidden">
                    <div className="bg-[#111111] text-white p-4 flex items-center justify-between border-b-4 border-[#111111]">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider">Evaluation</span>
                        <div className="flex gap-1">
                            <div className="size-3 rounded-full bg-[#ff3333] border border-white/20" />
                            <div className="size-3 rounded-full bg-[#ffe800] border border-white/20" />
                            <div className="size-3 rounded-full bg-[#00cc66] border border-white/20" />
                        </div>
                    </div>

                    <div className="p-10 flex flex-col h-auto relative">
                        <div className="absolute inset-0 opacity-10 perforated pointer-events-none" />
                        <Trophy className="mb-8 text-[#ffe800] size-14 relative z-10" />
                        <h2 className="font-serif text-4xl font-black uppercase italic leading-none mb-4 relative z-10">
                            RANK_S
                        </h2>
                        <p className="font-mono text-[12px] font-bold opacity-80 leading-relaxed border-l-4 border-[#ffe800] pl-6 py-2 uppercase relative z-10">
                            Data suggests a high level of proficiency in international
                            business contexts. Reliable competency rating.
                            Data suggests a high level of proficiency in international
                            business contexts. Reliable competency rating.
                            Data suggests a high level of proficiency in international
                            business contexts. Reliable competency rating.
                            Data suggests a high level of proficiency in international
                            business contexts. Reliable competency rating.
                            Data suggests a high level of proficiency in international
                            business contexts. Reliable competency rating.
                            Data suggests a high level of proficiency in international
                            business contexts. Reliable competency rating.
                            Data suggests a high level of proficiency in international
                            business contexts. Reliable competency rating.
                        </p>

                        <div className="mt-auto pt-12 space-y-4 relative z-10 w-full">
                            <Button className="w-full bg-[#ffe800] text-[#111111] hover:bg-[#ffe800]/90 border-2 gap-3">
                                <Download size={20} /> CERTIFICATE
                            </Button>
                            <Button variant="outline" className="w-full bg-card text-card-foreground gap-3">
                                <Share2 size={16} /> SHARE RESULTS
                            </Button>
                        </div>
                    </div>
                </CardComponent>
            </aside>
        </section >
    );
}

function TargetScoreFeedback({ score, target }: { score: number; target: number }) {
    // Calculate percent but cap at 100% for display/logic logic as per user request
    const rawPercent = Math.round((score / target) * 100);
    const percent = Math.min(100, rawPercent);

    let msg = "KEEP PUSHING";
    let colorClass = "text-white bg-[#111111]";
    let rotation = "rotate-0";

    // Granular Feedback Tiers (0-100% Range)
    if (percent >= 100) {
        msg = "GOAL SMASHED!";
        colorClass = "text-white bg-green-600";
        rotation = "-rotate-6";
    } else if (percent >= 98) {
        msg = "LEGENDARY";
        colorClass = "text-white bg-purple-600";
        rotation = "rotate-6";
    } else if (percent >= 95) {
        msg = "OUTSTANDING";
        colorClass = "text-white bg-emerald-500";
        rotation = "rotate-2";
    } else if (percent >= 90) {
        msg = "SO CLOSE!";
        colorClass = "text-[#111111] bg-[#ffe800]";
        rotation = "-rotate-3";
    } else if (percent >= 85) {
        msg = "EXCELLENT";
        colorClass = "text-white bg-pink-500";
        rotation = "rotate-2";
    } else if (percent >= 80) {
        msg = "GREAT JOB";
        colorClass = "text-white bg-blue-600";
        rotation = "-rotate-2";
    } else if (percent >= 70) {
        msg = "GOOD PACE";
        colorClass = "text-white bg-cyan-600";
        rotation = "rotate-3";
    } else if (percent >= 60) {
        msg = "MAKING MOVES";
        colorClass = "text-white bg-orange-500";
        rotation = "-rotate-1";
    } else if (percent >= 50) {
        msg = "HALFWAY THERE";
        colorClass = "text-white bg-indigo-500";
        rotation = "rotate-1";
    } else if (percent >= 40) {
        msg = "ON TRACK";
        colorClass = "text-white bg-teal-600";
        rotation = "-rotate-2";
    } else if (percent >= 30) {
        msg = "WARMING UP";
        colorClass = "text-white bg-gray-600";
        rotation = "rotate-2";
    }

    return (
        <div className={`
            flex flex-col items-center justify-center 
            p-4 border-4 border-[#111111] shadow-[4px_4px_0px_#111111] 
            ${colorClass} ${rotation} transition-transform hover:scale-110
            min-w-[140px] md:min-w-[180px]
        `}>
            <span className="font-serif text-lg md:text-xl font-black uppercase leading-none text-center">
                {msg}
            </span>
            <span className="font-mono text-xs md:text-sm font-bold opacity-80 mt-1 border-t-2 border-current pt-1 w-full text-center">
                {percent}% OF TARGET
            </span>
        </div>
    );
}
