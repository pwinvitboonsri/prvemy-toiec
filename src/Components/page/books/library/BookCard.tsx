"use client";

import Link from "next/link";
import { Lock, Crown, Clock, Check } from "lucide-react";
import { cn } from "@/utils/utils";
import { LibraryBook, UserRole } from "@/types/data/library_data";

interface LibraryBookCardProps {
  book: LibraryBook;
  userRole: UserRole;
}

export function LibraryBookCard({ book, userRole }: LibraryBookCardProps) {
  // --- ACCESS LOGIC ---
  // Added 'platinum' level
  const roleLevels: Record<UserRole, number> = {
    guest: 0,
    free: 1,
    silver: 2,
    gold: 2,
    premium: 2,
    platinum: 3,
  };
  const accessLevels: Record<string, number> = {
    guest: 0,
    free: 1,
    premium: 2,
    "one-time": 99, // 99 means strictly locked unless Owned or Subscription override
  };

  const userLevel = roleLevels[userRole];
  const requiredLevel = accessLevels[book.access];

  // 1. Basic Level Check
  let isUnlocked = userLevel >= requiredLevel;

  // 2. One-Time Buy Check
  // In our logic, 'one-time' is level 99.
  // However, Subscription users (Premium/Platinum) should unlock 'one-time' books automatically (included in sub).
  // Free users see it as locked (buy button shows).
  if (book.access === "one-time") {
    isUnlocked = userRole === "premium" || userRole === "platinum";
  }

  // 3. Early Access Override (The Platinum Rule)
  if (book.isEarlyAccess) {
    // Only Platinum unlocks early access
    isUnlocked = userRole === "platinum";
  }

  // --- STYLE CONFIG ---
  const getBadgeConfig = () => {
    if (book.isEarlyAccess)
      return { text: "Early Access", color: "bg-blue-300 text-black border-foreground" };
    if (book.access === "premium")
      return { text: "Premium", color: "bg-[#ffe800] text-black border-foreground" };
    if (book.access === "one-time")
      return { text: "Store", color: "bg-foreground text-background" };
    if (book.access === "guest")
      return { text: "Guest Free", color: "bg-green-300 text-black border-foreground" };
    return { text: "Standard", color: "bg-muted text-muted-foreground border-foreground" };
  };

  const badge = getBadgeConfig();

  // --- BUTTON TEXT ---
  const getActionText = () => {
    if (book.isEarlyAccess && !isUnlocked)
      return `Available ${book.releaseDate}`;
    if (book.access === "one-time" && !isUnlocked) return "Buy ฿199";
    if (!isUnlocked)
      return userRole === "guest" ? "Login Required" : "Upgrade Required";
    return book.access === "free" ? "Continue" : "Start Test";
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col border-2 border-foreground bg-white dark:bg-neutral-900 transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_currentColor] z-10 text-foreground"
      )}
    >
      {/* --- TOP COVER AREA --- */}
      <div className="relative aspect-square flex items-center justify-center border-b-2 border-foreground bg-muted dark:bg-neutral-800 overflow-hidden">
        {/* Badge */}
        <span
          className={cn(
            "absolute top-3 right-3 px-2 py-1 text-[0.65rem] font-black uppercase border-2 shadow-sm z-20",
            badge.color
          )}
        >
          {badge.text}
        </span>

        {/* Book Graphic */}
        <div
          className={cn(
            "w-32 h-40 border-2 border-foreground flex flex-col items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-105 relative z-10",
            book.coverColor
          )}
        >
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/10 border-r border-foreground/20"></div>
          <div
            className={cn(
              "text-center relative z-10 text-foreground dark:text-black"
            )}
          >
            <span className="block font-black text-3xl leading-none">
              {book.category}
            </span>
            <span className="block font-mono text-[10px] mt-1 opacity-90">
              {book.coverText}
            </span>
          </div>
        </div>

        {/* Background Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "6px 6px",
          }}
        ></div>

        {/* --- OVERLAYS --- */}
        {!isUnlocked && !book.isEarlyAccess && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-[1px]">
            <div className="bg-foreground text-background p-2 border-2 border-background shadow-lg transform -rotate-3">
              <Lock className="w-4 h-4 mx-auto mb-1" />
              <span className="text-[8px] font-bold uppercase block">
                {book.access === "one-time" ? "Shop" : "Locked"}
              </span>
            </div>
          </div>
        )}

        {book.isEarlyAccess && !isUnlocked && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-[1px]">
            <div className="bg-card text-primary p-2 border-2 border-primary shadow-lg">
              <Clock className="w-4 h-4 mx-auto mb-1" />
              <span className="text-[8px] font-bold uppercase block">
                {book.releaseDate}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* --- INFO CONTENT --- */}
      <div className="flex-1 p-5 flex flex-col gap-3 text-center">
        <div>
          <h3 className="font-black text-lg uppercase leading-tight text-foreground mb-1">
            {book.title}
          </h3>
          <p className="font-mono text-xs opacity-60 text-muted-foreground">
            {book.subtitle}
          </p>
        </div>

        {/* Progress or Metadata */}
        <div className="mt-auto">
          {isUnlocked && book.progress !== undefined ? (
            <div className="w-full h-2 bg-muted border border-foreground rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${book.progress}%` }}
              ></div>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="border border-foreground bg-muted px-2 py-0.5 text-[10px] font-bold uppercase text-foreground">
                {book.questionCount
                  ? `${book.questionCount} Qs`
                  : "Full Series"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* --- ACTION BUTTON --- */}
      {isUnlocked ? (
        <Link
          href={`/books/${book.id}`}
          className="w-full p-4 font-black uppercase text-xs text-center border-t-2 border-foreground hover:bg-foreground hover:text-background transition-colors text-foreground"
        >
          {getActionText()}
        </Link>
      ) : (
        <button
          disabled
          className="w-full p-4 font-black uppercase text-xs text-center border-t-2 border-foreground bg-muted text-muted-foreground cursor-not-allowed"
        >
          {getActionText()}
        </button>
      )}
    </div>
  );
}
