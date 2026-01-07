import { Headphones } from "lucide-react";

interface ExamStimulusProps {
    group: any; // Ideally this should be typed with the actual Group type from your store/types
    currentQ: any;
    hasAudio: boolean;
}

export function ExamStimulus({ group, currentQ, hasAudio }: ExamStimulusProps) {
    if (group.stimulus_image_url) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="bg-white p-4 shadow-[12px_12px_0px_rgba(0,0,0,0.1)] border-2 border-[#1a1a1a] rotate-1 max-w-md w-full transition-transform hover:rotate-0">
                    <div className="aspect-[4/3] bg-gray-200 mb-4 overflow-hidden border border-gray-400 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={group.stimulus_image_url}
                            alt="Stimulus"
                            className="w-full h-full object-cover grayscale contrast-125"
                        />
                    </div>
                    <div className="flex justify-between items-center font-mono text-xs">
                        <strong>FIG {currentQ.question_number}</strong>
                        <span className="opacity-50">PHOTOGRAPH</span>
                    </div>
                </div>
            </div>
        );
    }

    if (group.stimulus_text) {
        return (
            <div className="flex justify-center w-full">
                <div className="bg-white p-8 md:p-12 w-full max-w-2xl shadow-[8px_8px_0px_rgba(0,0,0,0.1)] border-2 border-[#1a1a1a] min-h-[500px] font-serif leading-loose text-gray-800">
                    {group.title && (
                        <div className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase py-2 px-3 mb-6 inline-block font-sans tracking-wide">
                            {group.title}
                        </div>
                    )}
                    <div
                        className="prose prose-sm md:prose-base prose-p:mb-4 prose-p:text-justify max-w-none font-serif"
                        dangerouslySetInnerHTML={{ __html: group.stimulus_text }}
                    />
                </div>
            </div>
        );
    }

    if (hasAudio) {
        return (
            <div className="w-full max-w-md text-center flex flex-col items-center justify-center h-full mx-auto">
                <div className="w-32 h-32 border-4 border-[#1a1a1a] rounded-full flex items-center justify-center mb-6 bg-[#f2f0e9] shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
                    <Headphones className="w-16 h-16 text-[#1a1a1a]" />
                </div>
                <h2 className="text-3xl font-black uppercase mb-2 tracking-tight">Audio Only</h2>
                <p className="font-mono text-xs opacity-60">Refer to the audio player below.</p>
                {group.title && (
                    <div className="mt-6 bg-[#ffe800] text-[#111111] text-xs font-bold px-4 py-2 border-2 border-[#111111] uppercase tracking-widest shadow-sm">
                        {group.title}
                    </div>
                )}
            </div>
        );
    }

    return null;
}
