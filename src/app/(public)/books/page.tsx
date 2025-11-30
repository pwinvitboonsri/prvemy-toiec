"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { type Book } from "@/types/book";
import { BookCard } from "@/Components/page/books/BookCard";
import { Button } from "@/Components/ui/Button/Button";
import { cn } from "@/lib/utils";

// --- MOCK DATA (Ideally fetched from DB) ---
const ALL_BOOKS: Book[] = [
  // SCENARIO 1: The "Guest Hook"
  // DB: is_guest_accessible = true
  // UI: Show "Guest Friendly" badge. No Lock.
  {
    id: "TEST-01",
    title: "ETS Simulation 2024 (Test 1)",
    subtitle: "Official Format • Guest Allowed",
    category: "ETS",
    access: "guest",
    questions: 200,
    time: "2h",
    color: "blue",
    description: "Try our full simulation mode without logging in.",
  },

  // SCENARIO 2: The "Premium Gate" (Standard Subscription)
  // DB: early_access_until = NULL, min_tier = 1
  // UI: Show Lock Icon for Free users. Unlocked for Subs.
  {
    id: "TEST-02",
    title: "ETS Simulation 2024 (Test 2)",
    subtitle: "Advanced Difficulty",
    category: "ETS",
    access: "premium",
    questions: 200,
    time: "2h",
    color: "red",
    description: "Challenging questions for high scorers.",
  },

  // SCENARIO 3: The "Early Access" (FOMO Strategy)
  // DB: early_access_until = Future Date
  // UI: "Early Access" Badge. Locked for Basic Subs, Unlocked for Pro.
  {
    id: "TEST-03",
    title: "ETS Simulation 2025 (Beta)",
    subtitle: "Sneak Peek • New Format",
    category: "ETS",
    access: "premium",
    isEarlyAccess: true,
    releaseDate: "Dec 15",
    questions: 200,
    time: "2h",
    color: "purple",
    description: "Available now for Pro Tier. Public release in 2 weeks.",
  },

  // SCENARIO 4: The "Micro-Transaction" (Not Bought)
  // DB: one_time_price_id = 'price_xxx', user_purchases = null
  // UI: Show "Buy for ฿199" button.
  {
    id: "BIZ-PACK-01",
    title: "Business Email Mastery",
    subtitle: "Special Training Pack",
    category: "BIZ",
    access: "one-time-buy",
    price: 199,
    questions: 50,
    time: "45m",
    color: "yellow",
    description: "Master Part 6 & 7 business vocabulary.",
  },

  // SCENARIO 5: The "Micro-Transaction" (Already Bought)
  // DB: one_time_price_id = 'price_xxx', user_purchases = FOUND
  // UI: Show "Start" (No price tag).
  {
    id: "BIZ-PACK-02",
    title: "Office Meeting Vocabulary",
    subtitle: "Special Training Pack",
    category: "BIZ",
    access: "one-time-buy",
    isOwned: true, // <--- User already paid
    price: 199,
    questions: 50,
    time: "45m",
    color: "green",
    description: "You own this pack.",
  },

  // SCENARIO 6: The "Free Resource" (Retention)
  // DB: is_guest_accessible = false, min_tier = 0
  // UI: Requires Login, but no payment.
  {
    id: "VOC-101",
    title: "600 Essential Words",
    subtitle: "Daily Vocabulary Booster",
    category: "VOC",
    access: "free",
    questions: 600,
    color: "white",
    description: "Log in to track your progress.",
  },

  // SCENARIO 7: The "Drill Mode" (Short content)
  // DB: part_number = 5 only
  // UI: Shows "15m" instead of "2h". Good for quick study.
  {
    id: "GRAM-01",
    title: "Grammar Speed Drill",
    subtitle: "Part 5 Rapid Fire",
    category: "GRAM",
    access: "free",
    questions: 30,
    time: "10m",
    color: "slate",
    description: "Quick grammar fixes for your coffee break.",
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
        <div className="mb-10 flex flex-wrap items-center gap-4 border-2 border-foreground bg-background p-4 shadow-[4px_4px_0px_var(--foreground)]">
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
