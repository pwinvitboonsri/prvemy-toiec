"use client";

import { Lock, Crown, Clock, ShoppingBag, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/Button/Button";
import Link from "next/link";
import { BookAccess, Book, BookCardProps } from "@/types/book";

export function BookCard({ book, userRole }: BookCardProps) {
  // --- 2. ACCESS LOGIC ---

  const roleHierarchy: Record<string, number> = {
    guest: 0,
    user: 1,
    premium: 2,
  };

  const accessHierarchy: Record<BookAccess, number> = {
    guest: 0,
    free: 1,
    premium: 2,
    "one-time-buy": 99, // 99 means no role automatically unlocks it (needs isOwned)
  };

  const userLevel = roleHierarchy[userRole] || 0;
  const requiredLevel = accessHierarchy[book.access];

  // Unlock if: User role is high enough OR they own the specific book
  const hasAccess = userLevel >= requiredLevel || book.isOwned === true;
  const isLocked = !hasAccess;

  // --- 3. VISUAL STYLES ---

  const bookColorStyles: Record<string, string> = {
    blue: "bg-primary text-primary-foreground border-foreground",
    red: "bg-destructive text-destructive-foreground border-foreground",
    yellow: "bg-accent text-accent-foreground border-foreground",
    white: "bg-background text-foreground border-foreground",
    black: "bg-foreground text-background border-foreground",
    green: "bg-green-600 text-white border-foreground",
    purple: "bg-purple-600 text-white border-foreground",
    slate: "bg-slate-600 text-white border-foreground",
  };

  const renderBadge = () => {
    // Priority 1: Owned
    if (book.isOwned) {
      return (
        <span className="absolute top-3 right-3 bg-green-500 text-white border-2 border-foreground px-2 py-0.5 text-[10px] font-black uppercase shadow-sm z-20 flex items-center gap-1">
          <Check className="w-3 h-3" strokeWidth={4} /> Owned
        </span>
      );
    }
    // Priority 2: Early Access
    if (book.isEarlyAccess) {
      return (
        <span className="absolute top-3 right-3 bg-blue-200 text-blue-900 border-2 border-foreground px-2 py-0.5 text-[10px] font-black uppercase shadow-sm z-20">
          Early Access
        </span>
      );
    }
    // Priority 3: Access Type
    if (book.access === "premium") {
      return (
        <span className="absolute top-3 right-3 bg-accent text-accent-foreground border-2 border-foreground px-2 py-0.5 text-[10px] font-black uppercase shadow-sm z-20 flex items-center gap-1">
          <Crown className="w-3 h-3" /> Premium
        </span>
      );
    }
    if (book.access === "one-time-buy") {
      return (
        <span className="absolute top-3 right-3 bg-foreground text-background border-2 border-foreground px-2 py-0.5 text-[10px] font-black uppercase shadow-sm z-20 flex items-center gap-1">
          <ShoppingBag className="w-3 h-3" />{" "}
          {book.price ? `$${book.price}` : "Paid"}
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

  const coverBgClass = bookColorStyles[book.color] || bookColorStyles.white;

  return (
    <div className="group relative flex flex-col border-2 border-foreground bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_var(--primary)] h-full">
      {/* --- 1. COVER STAGE --- */}
      <div
        className={cn(
          "relative aspect-square w-full border-b-2 border-foreground flex items-center justify-center overflow-hidden",
          book.access === "premium" ? "bg-accent/10" : "bg-background"
        )}
      >
        {renderBadge()}

        {/* --- THE BOOK GRAPHIC --- */}
        <div
          className={cn(
            "w-32 h-40 border-2 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_var(--foreground)] transition-transform duration-300 group-hover:scale-105 z-10 relative",
            coverBgClass
          )}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/10 border-r border-black/10"></div>

          <span className="font-black text-3xl uppercase leading-none z-10">
            {book.category}
          </span>
          <span className="font-mono text-[10px] mt-1 opacity-80 z-10 uppercase tracking-widest truncate w-full px-2">
            {book.id}
          </span>
        </div>

        {/* Halftone Texture */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "6px 6px",
          }}
        ></div>

        {/* --- LOCK OVERLAY --- */}
        {isLocked && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
            <div
              className={cn(
                "p-3 border-2 border-foreground shadow-lg transform rotate-2 flex flex-col items-center",
                book.access === "premium"
                  ? "bg-accent text-accent-foreground"
                  : "bg-foreground text-background"
              )}
            >
              {book.access === "premium" ? (
                <Crown className="mb-1 h-5 w-5" />
              ) : (
                <Lock className="mb-1 h-5 w-5" />
              )}
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {book.access === "premium"
                  ? "Premium Only"
                  : book.access === "one-time-buy"
                  ? "Purchase Required"
                  : "Login Required"}
              </span>
            </div>
          </div>
        )}

        {/* Early Access Overlay */}
        {book.isEarlyAccess && !isLocked && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
            <div className="bg-background text-primary p-3 border-2 border-primary shadow-lg text-center">
              <Clock className="mx-auto mb-1 h-5 w-5" />
              <span className="text-[10px] font-bold uppercase block">
                Opens {book.releaseDate}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* --- 2. INFO SECTION --- */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-lg font-black uppercase leading-tight tracking-tight">
          {book.title}
        </h3>
        <p className="mb-4 font-mono text-xs opacity-60 line-clamp-2">
          {book.subtitle}
        </p>

        <div className="mt-auto">
          {/* Progress bar if owned/free, otherwise stats */}
          {(book.access === "free" || book.isOwned) && !isLocked ? (
            <div className="w-full h-1.5 bg-muted border border-foreground/20">
              <div className="h-full bg-primary w-1/3"></div>
            </div>
          ) : (
            <div className="flex gap-2">
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
          )}
        </div>
      </div>

      {/* --- 3. ACTION BUTTON --- */}
      {isLocked || book.isEarlyAccess ? (
        <Button
          variant="ghost"
          className={cn(
            "w-full rounded-none border-t-2 border-x-0 border-b-0 border-foreground h-12 font-black uppercase tracking-widest text-xs",
            isLocked &&
              "bg-muted text-muted-foreground hover:bg-muted cursor-not-allowed"
          )}
          disabled
        >
          {/* Dynamic Button Text based on Lock Type */}
          {book.isEarlyAccess
            ? "Pre-Order"
            : book.access === "one-time-buy"
            ? `Buy Now $${book.price}`
            : "Locked"}
        </Button>
      ) : (
        <Button
          asChild
          variant="default"
          className="w-full rounded-none border-t-2 border-x-0 border-b-0 border-foreground hover:bg-primary hover:text-primary-foreground h-12 font-black uppercase tracking-widest text-xs"
        >
          <Link href={`/books/${book.id}`}>
            {book.isOwned || book.access === "free"
              ? "Open Book"
              : "Start Test"}
          </Link>
        </Button>
      )}
    </div>
  );
}
