"use client";

import { useState } from "react";
import { BookHeader } from "@/Components/page/books/detail/BookHeader";
import { LobbyModal } from "@/Components/page/books/detail/LobbyModal";
import { BookCover } from "@/Components/page/books/detail/BookCover";
import { ManifestList } from "@/Components/page/books/detail/ManifestList";
import { ActionCard } from "@/Components/page/books/detail/ActionCard";
import { FlightRecords } from "@/Components/page/books/detail/FlightRecords";
import { TacticalIntel } from "@/Components/page/books/detail/TacticalIntel";

export default function BookDetailPage() {
  const [isLobbyOpen, setIsLobbyOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background pb-24 font-sans text-foreground relative">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "6px 6px",
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 mt-8">
        <BookHeader />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-5 flex flex-col gap-8">
            <BookCover />
            <ManifestList />
          </div>
          <div className="md:col-span-7 flex flex-col gap-6">
            <ActionCard onEnterLobby={() => setIsLobbyOpen(true)} />
            <FlightRecords />
            <TacticalIntel />
          </div>
        </div>
      </div>
      <LobbyModal isOpen={isLobbyOpen} onClose={() => setIsLobbyOpen(false)} />
    </main>
  );
}
