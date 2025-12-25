"use client";

import { useEffect, useState } from "react";
import { useExamStore } from "@/store/exam/exam-store";
import { ExamHUD } from "./ExamHUD";
import { ExamFooter } from "./ExamFooter";
import { ExamDrawer } from "./ExamDrawer";
import { cn } from "@/lib/utils/utils";
import { Headphones, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/Components/ui/Button/Button"; // Check path
import { CardComponent } from "@/Components/ui/CardComponent"; // Check path
import { X, Cloud } from "lucide-react";
import { useExamSync } from "@/hooks/useExamSync";

// Added prop interface
interface ExamInterfaceProps {
  userTier?: string;
}

export function ExamInterface({ userTier = "guest" }: ExamInterfaceProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // --- ZUSTAND STORE ---
  const {
    manifest,
    answers,
    flags,
    eliminated,
    currentIndex,
    secondsRemaining,
    isDrawerOpen,
    getCurrentQuestion,
    setAnswer,
    toggleFlag,
    toggleEliminate,
    nextQuestion,
    prevQuestion,
    jumpTo,
    toggleDrawer,
    decrementTimer,
    sessionId,
    clearSession,
  } = useExamStore();

  // --- ENABLE BACKGROUND SYNC (Hybrid Mode) ---
  // We pass the userTier so the hook knows whether to sync to DB or just use LocalStorage
  const { syncStatus, forceSync } = useExamSync(userTier);

  // --- DERIVED STATE ---
  const { question: currentQ, group: currentGroup } = getCurrentQuestion();

  if (!manifest || !currentQ || !currentGroup) return null;

  // --- TIMER LOGIC ---
  const isTimerRunning = secondsRemaining !== null && secondsRemaining > 0;

  useEffect(() => {
    if (!isTimerRunning) return;
    const intervalId = setInterval(() => {
      decrementTimer();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isTimerRunning, decrementTimer]);

  const formatTime = (totalSeconds: number | null) => {
    if (totalSeconds === null) return "00:00:00";
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const totalQ = manifest.flatQuestions.length;
  const currentPart = manifest.parts.find(p => p.id === currentGroup.part_id);
  const hasAudio = !!currentGroup.stimulus_audio_url;

  // --- ACTIONS ---
  const requestFinishTest = () => {
    if (isSubmitting) return;
    setShowConfirmModal(true);
  };

  const executeFinishTest = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);

    try {
      // 1. Force Sync (only happens if user is Paid)
      await forceSync();

      // 2. Submit for Grading
      const response = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, answers, userTier })
      });

      if (!response.ok) throw new Error("Grading failed");

      // 3. Clear Session Data on success
      clearSession();
      // Explicitly remove the persisted storage to ensure no stale data remains
      if (typeof window !== "undefined") {
        localStorage.removeItem("exam-session-storage");
      }

      // 4. Go to Results
      const resultData = await response.json();
      if (resultData.success) {
        router.push(`/exam/result/${sessionId}`);
      }

    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
      alert("Failed to submit test. Please try again.");
    }
  };

  // --- RENDER HELPERS ---
  const renderStimulus = () => {
    if (currentGroup.stimulus_image_url) {
      return (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="bg-white p-4 shadow-[12px_12px_0px_rgba(0,0,0,0.1)] border-2 border-[#1a1a1a] rotate-1 max-w-md w-full transition-transform hover:rotate-0">
            <div className="aspect-[4/3] bg-gray-200 mb-4 overflow-hidden border border-gray-400 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentGroup.stimulus_image_url} alt="Stimulus" className="w-full h-full object-cover grayscale contrast-125" />
            </div>
            <div className="flex justify-between items-center font-mono text-xs">
              <strong>FIG {currentQ.question_number}</strong>
              <span className="opacity-50">PHOTOGRAPH</span>
            </div>
          </div>
        </div>
      );
    }

    if (currentGroup.stimulus_text) {
      return (
        <div className="flex justify-center w-full">
          <div className="bg-white p-8 md:p-12 w-full max-w-2xl shadow-[8px_8px_0px_rgba(0,0,0,0.1)] border-2 border-[#1a1a1a] min-h-[500px] font-serif leading-loose text-gray-800">
            {currentGroup.title && (
              <div className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase py-2 px-3 mb-6 inline-block font-sans tracking-wide">
                {currentGroup.title}
              </div>
            )}
            <div
              className="prose prose-sm md:prose-base prose-p:mb-4 prose-p:text-justify max-w-none font-serif"
              dangerouslySetInnerHTML={{ __html: currentGroup.stimulus_text }}
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
          {currentGroup.title && (
            <div className="mt-6 bg-[#ffe800] text-[#111111] text-xs font-bold px-4 py-2 border-2 border-[#111111] uppercase tracking-widest shadow-sm">
              {currentGroup.title}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col h-screen bg-[#e8e6df] text-[#1a1a1a] font-sans overflow-hidden relative">

      <div className="fixed inset-0 pointer-events-none opacity-[0.4] z-0" style={{ backgroundImage: "radial-gradient(#d1d1d1 1px, transparent 1px)", backgroundSize: "8px 8px" }}></div>

      <ExamHUD
        onToggleDrawer={() => toggleDrawer(true)}
        timeLeft={formatTime(secondsRemaining)}
        progress={Math.round(((currentIndex + 1) / totalQ) * 100)}
        section={currentPart?.title || "Exam"}
        onSubmit={requestFinishTest}
      />

      {/* Sync Status Indicator (Only show for Paid Users) */}
      {syncStatus === "syncing" && (
        <div className="absolute top-20 right-4 z-50">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-2 py-1 rounded border border-gray-300 shadow-sm text-[10px] font-mono text-gray-500">
            <Cloud className="w-3 h-3 animate-pulse" /> Saving...
          </div>
        </div>
      )}

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden relative z-10">
        <div className="bg-[#dcdcdc] border-r-4 border-[#1a1a1a] overflow-y-auto p-8 lg:p-12 flex flex-col items-center shadow-[inset_-10px_0_20px_rgba(0,0,0,0.05)]">
          {renderStimulus()}
        </div>

        <div className="bg-white overflow-y-auto p-6 md:p-12 pb-32">
          <div className="mb-12 pl-6 border-l-4 border-[#2d3e75] max-w-2xl mx-auto lg:mx-0">
            <span className="inline-block bg-[#eef2ff] text-[#2d3e75] text-[10px] font-black uppercase px-2 py-1 mb-4 rounded-sm tracking-wider">
              Question {currentQ.question_number}
            </span>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-mono text-2xl font-bold text-[#2d3e75]">{currentQ.question_number}.</span>
              <div>
                <p className="font-bold text-xl leading-relaxed text-[#1a1a1a]">{currentQ.text}</p>
              </div>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.key;
                const isEliminated = eliminated[currentQ.id]?.includes(opt.key);

                return (
                  <div
                    key={opt.key}
                    onClick={() => !isEliminated && setAnswer(currentQ.id, opt.key)}
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
                      onClick={(e) => { e.stopPropagation(); toggleEliminate(currentQ.id, opt.key); }}
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
        </div>
      </div>

      <ExamFooter
        onNext={nextQuestion}
        onPrev={prevQuestion}
        onMark={() => toggleFlag(currentQ.id)}
        isMarked={!!flags[currentQ.id]}
        audioSrc={currentGroup.stimulus_audio_url}
      />

      <ExamDrawer />

      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <CardComponent
            className="w-full max-w-sm h-auto bg-white border-2 border-[#111111] shadow-[8px_8px_0px_#ff3333] animate-in zoom-in-95 duration-200"
            noPadding={true}
            enableHover={false}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#ff3333]">
                <AlertTriangle className="w-8 h-8 text-[#ff3333]" />
              </div>
              <h3 className="text-xl font-black uppercase mb-2">Finish Test?</h3>
              <p className="font-mono text-xs text-gray-500 mb-6 leading-relaxed">
                You are about to submit your answers. This action cannot be undone.
                <br />
                <span className="text-[#111111] font-bold">
                  {Object.keys(answers).length} / {totalQ} questions answered.
                </span>
              </p>

              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => setShowConfirmModal(false)}
                  variant="outline"
                  className="border-2 flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={executeFinishTest}
                  variant="destructive"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Confirm Finish"}
                </Button>
              </div>
            </div>
          </CardComponent>
        </div>
      )}

    </div>
  );
}