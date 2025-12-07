"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, ChevronRight, BarChart2 } from "lucide-react";
import { LobbyModal } from "@/Components/page/books/detail/LobbyModal";

// Import sub-components
import { BookCover } from "@/Components/page/books/detail/BookCover";
import { ManifestList } from "@/Components/page/books/detail/ManifestList";
import { ActionCard } from "@/Components/page/books/detail/ActionCard";
import { FlightRecords } from "@/Components/page/books/detail/FlightRecords";
import { TacticalIntel } from "@/Components/page/books/detail/TacticalIntel";

export default function BookDetailPage() {
  const [isLobbyOpen, setIsLobbyOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background pb-24 font-sans text-foreground relative">
      
      {/* Background Texture */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-10" style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "6px 6px" }}></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 mt-8">
        
        {/* --- 1. HEADER --- */}
        <div className="mb-8">
           <div className="flex items-center gap-2 text-xs font-mono opacity-60 mb-2 uppercase">
              <Link href="/books" className="hover:underline hover:text-primary">Library</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="font-bold">ETS 2024</span>
           </div>
           
           <div className="border-b-2 border-foreground pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                 ETS Simulation Test 01
              </h1>
              <span className="bg-green-300 text-green-900 border-2 border-foreground px-3 py-1 text-xs font-black uppercase shadow-sm inline-flex items-center gap-2 whitespace-nowrap">
                 <Lock className="w-3 h-3" /> Guest Access
              </span>
           </div>
        </div>

        {/* --- 2. MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
           
           {/* LEFT COLUMN (5 Cols) */}
           <div className="md:col-span-5 flex flex-col gap-8">
              <BookCover />
              <ManifestList />
           </div>

           {/* RIGHT COLUMN (7 Cols) */}
           <div className="md:col-span-7 flex flex-col gap-6">
              
              {/* A. MISSION STATUS CARD */}
              <ActionCard onEnterLobby={() => setIsLobbyOpen(true)} />

              {/* B. FLIGHT RECORDS (LOCKED) */}
              <FlightRecords />

              {/* C. TACTICAL INTEL (LOCKED) */}
              {/* We pass isLocked={true} to show the yellow classified overlay by default */}
              <TacticalIntel isLocked={true} />

           </div>

        </div>

      </div>

      {/* --- THE MODAL (Opens SetupConsole) --- */}
      <LobbyModal isOpen={isLobbyOpen} onClose={() => setIsLobbyOpen(false)} />

    </main>
  );
}