"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Flag,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";

interface ExamFooterProps {
  onNext: () => void;
  onPrev: () => void;
  onMark: () => void;
  isMarked: boolean;
  audioSrc?: string;
}

export function ExamFooter({
  onNext,
  onPrev,
  onMark,
  isMarked,
  audioSrc,
}: ExamFooterProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Auto-play when audio source changes
  useEffect(() => {
    if (audioSrc && audioRef.current && !hasPlayed) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Autoplay blocked:", e));
    }
  }, [audioSrc, hasPlayed]);

  // Handle Time Update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setHasPlayed(true); // Mark as played so it can't be replayed
  };

  return (
    <footer className="h-16 md:h-20 bg-white border-t-2 border-[#111111] flex items-center justify-between px-3 md:px-8 shrink-0 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] relative gap-2">
      {/* Audio Logic: Always rendered if src exists, but controlled */}
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          // Removed controls attribute to prevent user interaction
        />
      )}

      {/* PREV (Visible on Mobile now) */}
      <button
        onClick={onPrev}
        className="flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:gap-2 bg-white border-2 border-[#111111] md:px-5 md:py-2.5 rounded-full md:rounded-none font-black uppercase text-xs hover:border-[#1d3b88] hover:text-[#1d3b88] transition-all shadow-[2px_2px_0px_#d4d4d4] md:shadow-[4px_4px_0px_#d4d4d4] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        title="Previous Question"
      >
        <ArrowLeft className="w-5 h-5 md:w-4 md:h-4" />
        <span className="hidden md:inline">Prev</span>
      </button>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* RIGHT CONTROLS */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mark Button */}
        <button
          onClick={onMark}
          className={cn(
            "flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 rounded transition-colors",
            isMarked
              ? "text-[#ff3333] bg-red-50"
              : "text-gray-400 hover:text-[#111111]"
          )}
          title="Mark Question"
        >
          <Flag className={cn("w-5 h-5", isMarked && "fill-current")} />
          <span className="hidden md:inline text-xs font-black uppercase ml-2">
            Mark
          </span>
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="flex items-center justify-center bg-[#111111] text-white border-2 border-[#111111] w-10 h-10 rounded-full md:w-auto md:h-auto md:rounded-none md:px-6 md:py-3 font-black uppercase text-xs hover:bg-[#1d3b88] hover:border-[#1d3b88] transition-all shadow-[2px_2px_0px_#1d3b88] md:shadow-[4px_4px_0px_#1d3b88] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        >
          <ArrowRight className="w-5 h-5 md:hidden" />
          <span className="hidden md:flex items-center gap-2">
            Next <ArrowRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </footer>
  );
}
