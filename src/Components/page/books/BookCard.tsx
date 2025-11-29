"use client";

import { Lock, Crown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/Button/Button";

export type BookAccess = "guest" | "free" | "premium";

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  category: string; // e.g., 'ETS', 'VOCAB'
  access: BookAccess;
  isEarlyAccess?: boolean;
  releaseDate?: string;
  questions?: number;
  time?: string;
  color?: "blue" | "red" | "yellow" | "white"; // For the cover background
}

interface BookCardProps {
  book: Book;
  userRole: "guest" | "user" | "premium"; // 'user' means logged in but free
}

export function BookCard({ book, userRole }: BookCardProps) {
  // 1. Determine Access Status
  const roleHierarchy = { guest: 0, user: 1, premium: 2 };
  const accessHierarchy = { guest: 0, free: 1, premium: 2 };

  const hasAccess = roleHierarchy[userRole] >= accessHierarchy[book.access];
  const isLocked = !hasAccess;

  // 2. Resolve Colors (Mapping Riso Vars to Tailwind classes)
  const bgColors = {
    blue: "bg-primary text-primary-foreground",
    red: "bg-destructive text-destructive-foreground",
    yellow: "bg-accent text-accent-foreground",
    white: "bg-background text-foreground",
  };

  // 3. Render Badge
  const renderBadge = () => {
    if (book.isEarlyAccess) {
      return (
        <span className="absolute top-3 right-3 bg-blue-200 text-blue-900 border-2 border-foreground px-2 py-0.5 text-[10px] font-black uppercase shadow-sm z-20">
          Early Access
        </span>
      );
    }
    if (book.access === "premium") {
      return (
        <span className="absolute top-3 right-3 bg-accent text-accent-foreground border-2 border-foreground px-2 py-0.5 text-[10px] font-black uppercase shadow-sm z-20 flex items-center gap-1">
          <Crown className="w-3 h-3" /> Premium
        </span>
      );
    }
    if (book.access === "guest") {
      return (
        <span className="absolute top-3 right-3 bg-green-300 text-green-900 border-2 border-foreground px-2 py-0.5 text-[10px] font-black uppercase shadow-sm z-20">
          Free
        </span>
      );
    }
    return null;
  };

  return (
    <div className="group relative flex flex-col border-2 border-foreground bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_var(--primary)]">
      {/* --- COVER SECTION --- */}
      <div className="relative aspect-square w-full border-b-2 border-foreground overflow-hidden">
        {renderBadge()}

        {/* Card Art */}
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center p-6 text-center transition-transform duration-300 group-hover:scale-105",
            bgColors[book.color || "white"],
            // Add a subtle pattern overlay
            "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')]"
          )}
        >
          <span className="font-black text-4xl uppercase leading-none tracking-tighter">
            {book.category}
          </span>
          <span className="mt-1 font-mono text-xs uppercase tracking-widest opacity-80">
            {book.id}
          </span>
        </div>

        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
            <div
              className={cn(
                "flex flex-col items-center border-2 border-foreground p-3 shadow-lg transform rotate-2",
                book.access === "premium"
                  ? "bg-accent text-accent-foreground"
                  : "bg-foreground text-background"
              )}
            >
              {book.access === "premium" ? (
                <Crown className="mb-1 h-6 w-6" />
              ) : (
                <Lock className="mb-1 h-6 w-6" />
              )}
              <span className="text-[10px] font-bold uppercase">
                {book.access === "premium" ? "Premium Only" : "Login Required"}
              </span>
            </div>
          </div>
        )}

        {/* Early Access Overlay */}
        {book.isEarlyAccess && !isLocked && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
            <div className="flex flex-col items-center border-2 border-blue-600 bg-white p-3 text-blue-600 shadow-lg">
              <Clock className="mb-1 h-6 w-6" />
              <span className="text-[10px] font-bold uppercase">
                Opens {book.releaseDate}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* --- INFO SECTION --- */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-lg font-black uppercase leading-tight tracking-tight">
          {book.title}
        </h3>
        <p className="mb-4 font-mono text-xs opacity-60">{book.subtitle}</p>

        {/* Meta Tags */}
        <div className="mt-auto flex gap-2">
          {book.questions && (
            <span className="border border-foreground px-1.5 py-0.5 text-[10px] font-bold uppercase opacity-70">
              {book.questions} Qs
            </span>
          )}
          {book.time && (
            <span className="border border-foreground px-1.5 py-0.5 text-[10px] font-bold uppercase opacity-70">
              {book.time}
            </span>
          )}
        </div>
      </div>

      {/* --- ACTION BUTTON --- */}
      <Button
        variant={isLocked ? "ghost" : "default"}
        className={cn(
          "w-full rounded-none border-t-2 border-x-0 border-b-0 border-foreground",
          isLocked &&
            "bg-muted text-muted-foreground hover:bg-muted cursor-not-allowed"
        )}
        disabled={isLocked || !!book.isEarlyAccess}
      >
        {isLocked ? "Locked" : book.isEarlyAccess ? "Pre-Order" : "Start Now"}
      </Button>
    </div>
  );
}
