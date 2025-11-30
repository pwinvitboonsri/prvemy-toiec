"use client";

import { X, Settings2 } from "lucide-react";
import { SetupConsole } from "@/Components/page/books/detail/SetupConsole";
import { useEffect } from "react";

interface LobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LobbyModal({ isOpen, onClose }: LobbyModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="w-full max-w-4xl bg-card border-2 border-foreground shadow-[12px_12px_0px_var(--primary)] relative animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-foreground text-background p-4 flex justify-between items-center border-b-2 border-foreground shrink-0">
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5" />
            <h2 className="text-lg font-black uppercase tracking-wider">
              Mission Lobby
            </h2>
          </div>
          <button
            onClick={onClose}
            className="hover:text-destructive transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-0">
          {/* We render the console here */}
          <SetupConsole />
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-foreground bg-muted flex justify-end gap-4 shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 font-bold uppercase border-2 border-foreground bg-background hover:bg-accent transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
