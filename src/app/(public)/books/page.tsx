"use client";

import { useState } from "react";
import { Search } from "lucide-react";
// import { BookCard, type Book } from "@/Components/books/BookCard";
import { BookCard, type Book } from "@/Components/page/books/BookCard";
import { Button } from "@/Components/ui/Button/Button";
import { cn } from "@/lib/utils";

// --- MOCK DATA (Ideally fetched from DB) ---
const ALL_BOOKS: Book[] = [
  {
    id: "TEST-01",
    title: "ETS Simulation 01",
    subtitle: "Official Format • 2024",
    category: "ETS",
    access: "guest",
    questions: 200,
    time: "2h",
    color: "blue",
  },
  {
    id: "VOC-101",
    title: "Vocabulary Booster",
    subtitle: "600 Essential Words",
    category: "VOC",
    access: "free",
    questions: 600,
    color: "white",
  },
  {
    id: "TEST-02",
    title: "ETS Simulation 02",
    subtitle: "Advanced Difficulty",
    category: "ETS",
    access: "premium",
    questions: 200,
    time: "2h",
    color: "red",
  },
  {
    id: "BIZ-READ",
    title: "Business Reading",
    subtitle: "Advanced Topics",
    category: "BIZ",
    access: "premium",
    color: "yellow",
  },
  {
    id: "TEST-03",
    title: "ETS Simulation 03",
    subtitle: "Coming Soon",
    category: "ETS",
    access: "premium",
    isEarlyAccess: true,
    releaseDate: "Dec 1",
    color: "white",
  },
  {
    id: "GRAM-01",
    title: "Grammar Intensive",
    subtitle: "Part 5 & 6 Drills",
    category: "GRAM",
    access: "free",
    questions: 50,
    color: "white",
  },
];

export default function BooksPage() {
  // In a real app, you'd fetch the user role via Supabase
  const userRole = "user"; // Try changing to 'guest' or 'premium' to see different locks
  const [filter, setFilter] = useState("all");

  return (
    <main className="min-h-screen bg-background pb-24 font-sans text-foreground">
      {/* 1. BACKGROUND TEXTURES */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "6px 6px",
        }}
      ></div>

      <div className="relative z-10 mx-auto mt-12 max-w-7xl px-4">
        {/* 2. HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-6 border-b-2 border-foreground pb-6 md:flex-row md:items-end">
          <div>
            <span className="mb-2 block font-mono text-xs opacity-60">
              / ARCHIVE_INDEX_V1
            </span>
            <h1 className="text-6xl font-black uppercase leading-none tracking-tighter">
              Library
            </h1>
          </div>

          <div className="flex gap-8 text-right">
            <div>
              <span className="block text-2xl font-black">08</span>
              <span className="text-[10px] font-bold uppercase opacity-60">
                Total Books
              </span>
            </div>
            <div>
              <span className="block text-2xl font-black text-primary">02</span>
              <span className="text-[10px] font-bold uppercase opacity-60">
                In Progress
              </span>
            </div>
          </div>
        </div>

        {/* 3. STICKY FILTER BAR */}
        <div className="sticky top-22 z-40 mb-10 flex flex-wrap items-center gap-4 border-2 border-foreground bg-background p-4 shadow-[4px_4px_0px_var(--foreground)]">
          <div className="mr-auto flex items-center gap-2 bg-muted px-3 py-2 border-2 border-foreground w-full md:w-64">
            <Search className="h-4 w-4 opacity-50" />
            <input
              type="text"
              placeholder="Search title or ID..."
              className="w-full bg-transparent font-mono text-sm outline-none placeholder:text-foreground/50"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            {["all", "tests", "vocab", "my books"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={cn(
                  "border-2 px-4 py-1.5 text-xs font-bold uppercase transition-all whitespace-nowrap",
                  filter === tab
                    ? "border-foreground bg-foreground text-background shadow-[2px_2px_0px_var(--primary)]"
                    : "border-transparent text-foreground hover:underline decoration-2 underline-offset-4 decoration-destructive"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 4. BOOK GRID */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ALL_BOOKS.map((book) => (
            <BookCard key={book.id} book={book} userRole={userRole} />
          ))}
        </div>
      </div>
    </main>
  );
}
