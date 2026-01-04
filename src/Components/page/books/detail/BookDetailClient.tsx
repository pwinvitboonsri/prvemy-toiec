"use client";

import { useState } from "react";
import Link from "next/link";
import { BookCover } from "@/Components/page/books/detail/BookCover";
import { ManifestList } from "@/Components/page/books/detail/ManifestList";
import { ActionCard } from "@/Components/page/books/detail/ActionCard";
import { FlightRecords } from "@/Components/page/books/detail/FlightRecords";
import { TacticalIntel } from "@/Components/page/books/detail/TacticalIntel";
import { LobbyModal } from "@/Components/page/books/detail/LobbyModal";
import type { BookDetailData } from "@/types/library-data";

interface Props {
  book: BookDetailData;
}

export function BookDetailClient({ book }: Props) {
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
        <span className="bg-yellow-300 text-yellow-900 border-2 border-[#111111] px-3 py-1 text-xs font-black uppercase shadow-sm">
          Resume Session
        </span>
      );
    }
    if (book.accessType === "guest") {
      return (
        <span className="bg-green-300 text-green-900 border-2 border-[#111111] px-3 py-1 text-xs font-black uppercase shadow-sm">
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
          backgroundImage: "radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "6px 6px",
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
          <div className="flex items-center gap-2 text-xs font-mono opacity-60 mb-2 uppercase text-[#111111]">
            <Link href="/books" className="hover:underline">
              Library
            </Link>
            <span>/</span>
            <span className="font-bold">{book.title}</span>
          </div>

          <div className="border-b-2 border-[#111111] pb-6">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4 text-[#111111]">
              {book.title}
            </h1>
            <div className="flex gap-3">{getBadges()}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* LEFT COL */}
          <div className="md:col-span-5 flex flex-col gap-8">
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
            <FlightRecords
              bookId={book.id}
              userRole={
                book.userStatus === "platinum" ? "premium" : book.userStatus
              }
              bestScore={book.bestScore}
              sessionsCount={book.sessionsCount}
              listeningScore={book.listeningScore}
              readingScore={book.readingScore}
              scoreTrend={book.scoreTrend}
            />

            <TacticalIntel
              isLocked={
                book.userStatus === "guest" || book.userStatus === "free"
              }
            />
          </div>
        </div>
      </div>

      <LobbyModal
        bookId={book.id}
        isOpen={isLobbyOpen}
        onClose={() => setIsLobbyOpen(false)}
        bookAccess={book.accessType}
        userStatus={
          book.userStatus === "platinum" ? "premium" : book.userStatus
        }
        isOwned={book.actionState === "start" || book.actionState === "resume"}
        price={book.price || 199}
        releaseDate={book.releaseDate || undefined}
      />
    </div>
  );
}
