"use client";

import { useEffect, useState } from "react";
import { useExamStore } from "@/store/exam/exam-store";
import { useExamSync } from "@/hooks/useExamSync";
import { useRouter } from "next/navigation";
import { Cloud } from "lucide-react";
import { ExamHUD } from "./components/ExamHUD";
import { ExamFooter } from "./components/ExamFooter";
import { ExamDrawer } from "./components/ExamDrawer";
import { ExamStimulus } from "./components/ExamStimulus";
import { ExamQuestion } from "./components/ExamQuestion";
import { ExamFinishModal } from "./components/ExamFinishModal";

import { LobbySettings } from "@/types/feature/exam";

interface ExamInterfaceProps {
    userTier?: string;
    settings?: LobbySettings;
}

export function ExamInterface({ userTier = "guest", settings }: ExamInterfaceProps) {
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
        getCurrentQuestion,
        setAnswer,
        toggleFlag,
        toggleEliminate,
        nextQuestion,
        prevQuestion,
        toggleDrawer,
        decrementTimer,
        sessionId,
        clearSession,
    } = useExamStore();

    // --- ENABLE BACKGROUND SYNC (Hybrid Mode) ---
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

    // --- HARDCORE & PRACTICE MODES ---
    // NO SKIP: Disable Next if current question is not answered
    const isAnswered = !!answers[currentQ.id];
    const disableNext = settings?.hardcore_flags?.no_skip ? !isAnswered : false;

    // NO REVIEW: Disable Prev button
    const disablePrev = settings?.hardcore_flags?.no_review ? true : false;

    // AUDIO CONTROLS: Show in Practice Mode
    const showAudioControls = settings?.mode === "practice"; // Or use granular settings check if available?
    // FSD says "Practice Mode: ... Audio Control: Seek Bar"
    // So if mode is practice, show controls.

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
                    <ExamStimulus
                        group={currentGroup}
                        currentQ={currentQ}
                        hasAudio={!!currentGroup.stimulus_audio_url}
                    />
                </div>

                <div className="bg-white overflow-y-auto p-6 md:p-12 pb-32">
                    <ExamQuestion
                        question={currentQ}
                        answers={answers}
                        eliminated={eliminated}
                        onAnswer={setAnswer}
                        onEliminate={toggleEliminate}
                    />
                </div>
            </div>

            <ExamFooter
                onNext={nextQuestion}
                onPrev={prevQuestion}
                onMark={() => toggleFlag(currentQ.id)}
                isMarked={!!flags[currentQ.id]}
                audioSrc={currentGroup.stimulus_audio_url}
                disableNext={disableNext}
                disablePrev={disablePrev}
                showAudioControls={showAudioControls}
            />

            <ExamDrawer />

            <ExamFinishModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={executeFinishTest}
                isSubmitting={isSubmitting}
                answeredCount={Object.keys(answers).length}
                totalCount={totalQ}
            />

        </div>
    );
}
