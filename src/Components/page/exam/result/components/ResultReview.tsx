import { Star } from "lucide-react";
import { GatekeeperOverlay } from "@/Components/ui/GatekeeperOverlay";
import { CardComponent } from "@/Components/ui/CardComponent";
import { ExamResult } from "@/services/result/getResult";

interface ResultReviewProps {
    detailedReview: ExamResult["detailedReview"];
    isPremium: boolean;
    onUpgrade: () => void;
}

export function ResultReview({ detailedReview, isPremium, onUpgrade }: ResultReviewProps) {
    return (
        <section className="space-y-8">
            <div className="flex items-center gap-4 border-b-2 border-border pb-4">
                <Star size={32} className="text-destructive" />
                <h2 className="font-serif text-3xl font-black uppercase tracking-tight">
                    Detailed Review
                </h2>
            </div>

            <CardComponent
                className="bg-[#111111] h-[600px]"
                noPadding
                enableHover={false}
            >
                <div
                    className="grid grid-areas-[content] w-full h-full"
                    style={{
                        gridTemplateAreas: '"content"',
                    }}
                >
                    <div
                        className={`grid-area-[content] flex flex-col h-full w-full transition-all ${!isPremium ? "blur-2xl opacity-10 pointer-events-none" : ""
                            }`}
                    >
                        {/* Sticky Header */}
                        <div className="sticky top-0 z-10 grid grid-cols-12 bg-[#111111] text-white p-5 font-mono text-xs font-black uppercase tracking-widest shrink-0">
                            <div className="col-span-1">#</div>
                            <div className="col-span-8">Performance Metrics</div>
                            <div className="col-span-3 text-right">Result</div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#111111] [&::-webkit-scrollbar-thumb]:bg-zinc-700 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
                            {detailedReview.map((item, i) => (
                                <div
                                    key={item.questionId}
                                    className="grid grid-cols-12 p-8 border-t-2 border-[#111111] bg-white text-[#111111] items-center hover:bg-[#ffe800] transition-colors group cursor-pointer"
                                >
                                    <div className="col-span-1 font-mono font-black text-xl opacity-20 group-hover:opacity-100">
                                        {item.questionNumber}
                                    </div>
                                    <div className="col-span-8 grid grid-cols-3 gap-4">
                                        <div className="col-span-1">
                                            <p className="text-xs font-bold uppercase text-gray-500">Part</p>
                                            <p className="font-black truncate">{item.partName}</p>
                                        </div>
                                        <div className="col-span-1">
                                            <p className="text-xs font-bold uppercase text-gray-500">Time</p>
                                            <p className="font-mono font-bold">{(item.timeCheck ? item.timeCheck / 1000 : 0).toFixed(1)}s</p>
                                        </div>
                                        <div className="col-span-1">
                                            <p className="text-xs font-bold uppercase text-gray-500">Your Ans</p>
                                            <div className="flex items-center gap-2">
                                                <span className={item.isCorrect ? "text-green-600 font-black" : "text-red-500 font-black"}>
                                                    {item.userOption || "-"}
                                                </span>
                                                {!item.isCorrect && (
                                                    <span className="text-xs text-gray-400 line-through decoration-red-500">
                                                        (Correct: {item.correctOption})
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 text-right">
                                        <span
                                            className={`px-4 py-2 text-xs font-black riso-border ${!item.isCorrect
                                                ? "bg-[#ff3333] text-white "
                                                : "bg-[#1d3b88] text-white "
                                                }`}
                                        >
                                            {!item.isCorrect ? "FAIL" : "PASS"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {!isPremium && (
                        <div className="grid-area-[content] w-full h-full relative z-20">
                            <GatekeeperOverlay
                                badge="ACCESS DENIED"
                                title="Review Mode Locked"
                                description="Detailed transcripts, answer justifications, and correct answers require a premium subscription."
                                onUpgrade={onUpgrade}
                            />
                        </div>
                    )}
                </div>
            </CardComponent>
        </section>
    );
}
