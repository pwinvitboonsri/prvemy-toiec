import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { GatekeeperOverlay } from "@/Components/ui/GatekeeperOverlay";
import { CardComponent } from "@/Components/ui/CardComponent";

interface ResultAnalyticsProps {
    scoreData: {
        parts: Array<{ name: string; score: number; label: string }>;
    };
    isPremium: boolean;
    onUpgrade: () => void;
}

export function ResultAnalytics({ scoreData, isPremium, onUpgrade }: ResultAnalyticsProps) {
    return (
        <section className="space-y-8">
            <div className="flex items-center gap-4 border-b-2 border-border pb-4">
                <BarChart3 size={32} className="text-primary" />
                <h2 className="font-serif text-3xl font-black uppercase tracking-tight">
                    Sectional Analytics
                </h2>
            </div>

            <CardComponent
                className="bg-card min-h-[400px] h-auto"
                noPadding
            >
                <div
                    className="grid grid-areas-[content] w-full h-full"
                    style={{
                        gridTemplateAreas: '"content"',
                    }}
                >
                    <div
                        className={`grid-area-[content] w-full h-full grid grid-cols-1 md:grid-cols-2 gap-0 transition-all ${!isPremium ? "blur-2xl opacity-10 pointer-events-none" : ""
                            }`}
                    >
                        <div className="p-10 border-r-2 border-border space-y-8 bg-background/40">
                            <h3 className="font-mono font-black uppercase text-xs">
                                Accuracy Breakdown
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                {scoreData.parts.map((part, i) => (
                                    <div key={i} className="flex items-center gap-6">
                                        <div className="font-mono text-xs font-black w-10 text-center bg-foreground text-background py-1">
                                            {part.name}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between font-mono text-[10px] font-bold uppercase opacity-60">
                                                <span>{part.label}</span>
                                                <span>{part.score}%</span>
                                            </div>
                                            <div className="h-4 border-2 border-border bg-card overflow-hidden p-[2px]">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${part.score}%` }}
                                                    className={`h-full ${part.score < 50 ? "bg-destructive" : "bg-primary"
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex-1 p-10 border-b-2 border-border bg-foreground text-[#ffe800] flex flex-col justify-center">
                                <p className="font-mono text-xs font-black uppercase mb-2 opacity-60">
                                    Personal Best
                                </p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-7xl font-black">820</span>
                                    <span className="text-xl font-mono opacity-50 font-black">
                                        PTS
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1 p-10 bg-card flex flex-col justify-center">
                                <p className="font-mono text-xs font-black uppercase mb-2 opacity-40">
                                    Global Average
                                </p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-7xl font-black">645</span>
                                    <span className="text-xl font-mono opacity-20 font-black">
                                        AVG
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {!isPremium && (
                        <div className="grid-area-[content] w-full h-full relative z-20">
                            <GatekeeperOverlay
                                badge="LOCKED"
                                title="Analytics Restricted"
                                description="Persistent history tracking and sectional data are reserved for premium members. Upgrade to track your performance growth."
                                onUpgrade={onUpgrade}
                            />
                        </div>
                    )}
                </div>
            </CardComponent>
        </section>
    );
}
