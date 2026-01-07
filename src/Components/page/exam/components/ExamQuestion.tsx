import { cn } from "@/utils/utils";
import { X } from "lucide-react";

interface ExamQuestionProps {
    question: any; // Typed better in real app
    answers: Record<string, string>;
    eliminated: Record<string, string[]>;
    onAnswer: (questionId: string, answerKey: string) => void;
    onEliminate: (questionId: string, answerKey: string) => void;
}

export function ExamQuestion({
    question,
    answers,
    eliminated,
    onAnswer,
    onEliminate
}: ExamQuestionProps) {

    return (
        <div className="mb-12 pl-6 border-l-4 border-[#2d3e75] max-w-2xl mx-auto lg:mx-0">
            <span className="inline-block bg-[#eef2ff] text-[#2d3e75] text-[10px] font-black uppercase px-2 py-1 mb-4 rounded-sm tracking-wider">
                Question {question.question_number}
            </span>

            <div className="flex items-baseline gap-4 mb-8">
                <span className="font-mono text-2xl font-bold text-[#2d3e75]">{question.question_number}.</span>
                <div>
                    <p className="font-bold text-xl leading-relaxed text-[#1a1a1a]">{question.text}</p>
                </div>
            </div>

            <div className="space-y-3">
                {question.options.map((opt: any) => {
                    const isSelected = answers[question.id] === opt.key;
                    const isEliminated = eliminated[question.id]?.includes(opt.key);

                    return (
                        <div
                            key={opt.key}
                            onClick={() => !isEliminated && onAnswer(question.id, opt.key)}
                            className={cn(
                                "flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all relative group",
                                isSelected
                                    ? "bg-[#eff6ff] border-[#2d3e75] shadow-[4px_4px_0px_rgba(45,62,117,0.1)] translate-x-1"
                                    : "border-gray-200 hover:bg-gray-50 hover:border-gray-300",
                                isEliminated && "opacity-40 bg-gray-50 cursor-default border-transparent hover:border-transparent hover:bg-gray-50"
                            )}
                        >
                            <div className={cn("flex items-center gap-5 flex-1", isEliminated && "line-through decoration-[#d13a3a] decoration-2 text-gray-400")}>
                                <div className={cn(
                                    "w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-lg transition-transform shadow-sm",
                                    isSelected ? "bg-[#2d3e75] border-[#2d3e75] text-white scale-105" : "bg-white border-gray-300 text-gray-500 group-hover:border-gray-400",
                                    isEliminated && "bg-transparent border-gray-200 text-gray-300 shadow-none"
                                )}>
                                    {opt.key}
                                </div>
                                <span className="font-medium text-base md:text-lg">{opt.text}</span>
                            </div>

                            <button
                                onClick={(e) => { e.stopPropagation(); onEliminate(question.id, opt.key); }}
                                className={cn(
                                    "w-8 h-8 flex items-center justify-center rounded-md hover:bg-red-50 text-gray-300 hover:text-[#d13a3a] transition-colors",
                                    isEliminated && "text-[#d13a3a] bg-red-50 hover:bg-red-100"
                                )}
                                title={isEliminated ? "Restore Answer" : "Eliminate Answer"}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
