"use client";

import { useState } from "react";
import Link from "next/link";
import { BookCover } from "@/Components/page/books/detail/components/BookCover";
import { ManifestList } from "@/Components/page/books/detail/components/ManifestList";
import { ActionCard } from "@/Components/page/books/detail/components/ActionCard";
import { FlightRecords } from "@/Components/page/books/detail/features/flight-records/FlightRecords";

import { LobbyModal } from "@/Components/page/books/detail/features/lobby/LobbyModal";
import type { BookDetailData } from "@/types/data/library_data";

interface Props {
  book: BookDetailData;
  flightRecordsSlot?: React.ReactNode;
}

export function BookDetailClient({ book, flightRecordsSlot }: Props) {
  const [isLobbyOpen, setIsLobbyOpen] = useState(false);

  const handleAction = () => {
    if (book.actionState === "start" || book.actionState === "resume") {
      setIsLobbyOpen(true);
    } else if (book.actionState === "login_required") {
      console.log("Redirect to Login");
    } else if (book.actionState === "locked_price") {
      console.log("Open Payment Modal");
    }
  };

  const getBadges = () => {
    if (book.actionState === "resume") {
      return (
        <span className="bg-primary text-primary-foreground border-2 border-foreground px-3 py-1 text-xs font-black uppercase shadow-sm">
          Resume Session
        </span>
      );
    }
    if (book.accessType === "guest") {
      return (
        <span className="bg-muted text-muted-foreground border-2 border-foreground px-3 py-1 text-xs font-black uppercase shadow-sm">
          Guest Access
        </span>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.08] z-0"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "6px 6px",
          color: "hsl(var(--foreground))",
        }}
      ></div>
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.15] z-50 mix-blend-multiply"
        style={{
          filter: "contrast(120%) brightness(100%)",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono opacity-60 mb-2 uppercase text-foreground">
            <Link href="/books" className="hover:underline">
              Library
            </Link>
            <span>/</span>
            <span className="font-bold">{book.title}</span>
          </div>

          <div className="border-b-2 border-foreground pb-6">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4 text-foreground">
              {book.title}
            </h1>
            <div className="flex gap-3">{getBadges()}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* LEFT COL */}
          <div className="md:col-span-5 flex flex-col gap-8 md:sticky md:top-8 h-fit">
            <BookCover
              title={book.title}
              description={book.description}
              questionCount={book.questionCount}
              duration={book.duration}
              difficulty={book.difficulty}
            />
            {/* Pass the dynamic manifest items */}
            <ManifestList items={book.manifest} />
          </div>

          {/* RIGHT COL */}
          <div className="md:col-span-7 flex flex-col gap-8 h-full">
            <ActionCard onEnterLobby={handleAction} />



            {/* CONNECTED REAL DATA TO FLIGHT RECORDS */}
            {flightRecordsSlot ? (
              flightRecordsSlot
            ) : (
              // Fallback if slot not provided (mostly for backwards compat or tests)
              <FlightRecords
                bookId={book.id}
                userRole={
                  ["platinum", "gold", "silver"].includes(book.userStatus)
                    ? "premium"
                    : (book.userStatus as "guest" | "free" | "premium")
                }
                simulationData={{
                  bestScore: null,
                  sessionsCount: 0,
                  listeningScore: null,
                  readingScore: null,
                  scoreTrend: []
                }}
                practiceData={{
                  bestScore: book.bestScore ?? null,
                  sessionsCount: book.sessionsCount ?? 0,
                  listeningScore: book.listeningScore ?? null,
                  readingScore: book.readingScore ?? null,
                  scoreTrend: book.scoreTrend ?? []
                }}
                globalStats={book.globalStats}
                difficulty={book.difficulty}
              />
            )}


          </div>
        </div>
      </div>

      <LobbyModal
        bookId={book.id}
        isOpen={isLobbyOpen}
        onClose={() => setIsLobbyOpen(false)}
        bookAccess={book.accessType}
        userStatus={
          ["platinum", "gold", "silver"].includes(book.userStatus)
            ? "premium"
            : (book.userStatus as "guest" | "free" | "premium")
        }
        isOwned={book.actionState === "start" || book.actionState === "resume"}
        price={book.price || 199}
        releaseDate={book.releaseDate || undefined}
      />
    </div>
  );
}
