"use client";

import { useEffect, useRef } from "react";
import { X, Flag, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/utils/utils";
import { useExamStore } from "@/store/exam/exam-store";

export function ExamDrawer() {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Connect to Store
  const {
    manifest,
    isDrawerOpen,
    toggleDrawer,
    currentIndex,
    jumpTo,
    answers,
    flags,
  } = useExamStore();

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleDrawer(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [toggleDrawer]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        isDrawerOpen
      ) {
        toggleDrawer(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDrawerOpen, toggleDrawer]);

  if (!manifest) return null;

  // Calculate Stats
  const total = manifest.flatQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.keys(flags).filter((k) => flags[k]).length;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] transition-opacity duration-300",
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer Panel - Left Side Configuration */}
      <aside
        ref={drawerRef}
        className={cn(
          "fixed top-0 left-0 h-full w-full sm:w-[400px] bg-white z-[101]  transform transition-transform duration-300 ease-out border-r-2 border-[#111111] flex flex-col",
          // Changed to slide from left (-translate-x-full)
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b-2 border-[#111111] bg-gray-50 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-black uppercase text-xl text-[#111111]">
              Mission Map
            </h2>
            <div className="flex gap-4 text-xs font-mono mt-1 opacity-70">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {answeredCount}/{total}{" "}
                Done
              </span>
              <span className="flex items-center gap-1 text-red-600">
                <Flag className="w-3 h-3 fill-current" /> {flaggedCount} Flagged
              </span>
            </div>
          </div>
          <button
            onClick={() => toggleDrawer(false)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Grid Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Legend */}
          <div className="flex gap-4 mb-6 text-[10px] uppercase font-bold text-gray-400 justify-center">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-[#111111] bg-white rounded-full"></div>{" "}
              Current
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#111111] rounded-full"></div> Done
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-100 border border-red-500 rounded-full"></div>{" "}
              Flag
            </div>
          </div>

          {/* Question Grid */}
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
            {manifest.flatQuestions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const isAnswered = !!answers[q.questionId];
              const isFlagged = !!flags[q.questionId];

              return (
                <button
                  key={q.questionId}
                  onClick={() => {
                    jumpTo(idx);
                    // Optional: Close drawer on selection on mobile
                    if (window.innerWidth < 640) toggleDrawer(false);
                  }}
                  className={cn(
                    "relative h-12 w-full flex items-center justify-center font-mono text-sm font-bold border transition-all duration-200 rounded",
                    // 1. Current Question Style (Highest Priority border)
                    isCurrent
                      ? "border-2 border-[#111111] bg-white z-10 translate-x-[-2px] translate-y-[-2px]"
                      : "border-transparent bg-gray-50 hover:bg-gray-100 text-gray-400",

                    // 2. Answered Style
                    !isCurrent && isAnswered && "bg-[#111111] text-white",

                    // 3. Flagged Style (Overlay)
                    isFlagged &&
                    !isCurrent &&
                    "bg-red-50 text-red-600 border border-red-200"
                  )}
                >
                  {/* Use idx + 1 for question number */}
                  {idx + 1}

                  {/* Flag Icon Overlay */}
                  {isFlagged && (
                    <div className="absolute -top-1 -right-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full border border-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
          <button
            onClick={() => toggleDrawer(false)}
            className="w-full py-3 bg-[#111111] text-white font-black uppercase text-xs hover:bg-[#1d3b88] transition-colors"
          >
            Return to Mission
          </button>
        </div>
      </aside>
    </>
  );
}
