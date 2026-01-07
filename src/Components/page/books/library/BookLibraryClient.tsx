"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  PlayCircle,
  FolderOpen,
  Tag,
  Book,
} from "lucide-react";
import { cn } from "@/utils/utils";
import { LibraryBookCard } from "./BookCard";
import { LibraryBook, UserRole } from "@/types/data/library_data";

interface BookLibraryClientProps {
  initialBooks: LibraryBook[];
  currentUserRole: UserRole; // Passed from server session
}

export function BookLibraryClient({
  initialBooks,
  currentUserRole,
}: BookLibraryClientProps) {
  // --- STATE ---
  const [activeCategory, setActiveCategory] = useState("All Archives");
  const [searchQuery, setSearchQuery] = useState("");

  // --- FILTERS ---
  const filteredBooks = initialBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.id.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesCategory = true;
    if (activeCategory === "Simulation")
      matchesCategory = book.category === "ETS";
    if (activeCategory === "Vocabulary")
      matchesCategory =
        book.category === "VOCAB" || book.category === "GRAMMAR";

    return matchesSearch && matchesCategory;
  });

  const counts = {
    all: initialBooks.length,
    sim: initialBooks.filter((b) => b.category === "ETS").length,
    vocab: initialBooks.filter(
      (b) => b.category === "VOCAB" || b.category === "GRAMMAR"
    ).length,
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground relative">
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

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start p-4 md:p-8 relative z-10">
        {/* --- LEFT SIDEBAR --- */}
        <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-30">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-1 text-foreground">
              Library
            </h1>
            <p className="font-mono text-xs opacity-60 text-muted-foreground">
              / BOOK_INDEX_V3
            </p>
          </div>

          <nav className="flex flex-col gap-1">
            <div className="text-[0.65rem] font-black uppercase text-muted-foreground mb-3 pl-2 tracking-wider">
              Classification
            </div>

            <NavButton
              label="All Archives"
              count={counts.all}
              active={activeCategory === "All Archives"}
              onClick={() => setActiveCategory("All Archives")}
              icon={FolderOpen}
            />
            <NavButton
              label="Simulation"
              count={counts.sim}
              active={activeCategory === "Simulation"}
              onClick={() => setActiveCategory("Simulation")}
              icon={Book}
            />
            <NavButton
              label="Vocabulary"
              count={counts.vocab}
              active={activeCategory === "Vocabulary"}
              onClick={() => setActiveCategory("Vocabulary")}
              icon={Tag}
            />

            <div className="h-6"></div>

            <div className="text-[0.65rem] font-black uppercase text-muted-foreground mb-3 pl-2 tracking-wider">
              Personal
            </div>
            <button className="flex items-center justify-between w-full px-4 py-2.5 font-bold uppercase text-[0.8rem] border-2 border-transparent text-primary hover:bg-muted hover:border-primary transition-all text-left">
              <span className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4" /> Active
              </span>
              <span className="font-mono">2</span>
            </button>
          </nav>
        </aside>

        {/* --- RIGHT CONTENT --- */}
        <section className="lg:col-span-9 space-y-8">
          {/* SEARCH & FILTER BAR */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 h-[50px] bg-white dark:bg-neutral-800 border-2 border-foreground shadow-[4px_4px_0px_rgba(0,0,0,0.1)] flex items-center px-4 gap-3">
              <Search className="w-5 h-5 opacity-40 text-foreground" />
              <input
                type="text"
                placeholder="Search mission ID, title, or tag..."
                className="bg-transparent border-none outline-none w-full font-mono text-sm text-foreground placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="h-[50px] bg-white dark:bg-neutral-800 border-2 border-foreground shadow-[4px_4px_0px_rgba(0,0,0,0.1)] px-4 font-black uppercase text-[0.8rem] flex items-center gap-2 hover:bg-muted text-foreground">
              Sort: Newest First
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* BOOK GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <LibraryBookCard
                  key={book.id}
                  book={book}
                  userRole={currentUserRole}
                />
              ))
            ) : (
              <div className="col-span-full h-64 flex flex-col items-center justify-center opacity-50">
                <p className="font-mono text-lg font-bold">No Records Found</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

// Helper Sub-component for Nav Buttons
function NavButton({ label, count, active, onClick, icon: Icon }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-between w-full px-4 py-2.5 font-bold uppercase text-[0.8rem] border-2 transition-all text-left mb-1",
        active
          ? "bg-foreground text-background border-foreground shadow-[4px_4px_0px_var(--primary)]" // Use css var for shadow color override? Or text-primary
          : "bg-transparent border-transparent text-foreground hover:bg-muted hover:border-foreground hover:shadow-[2px_2px_0px_currentColor]"
      )}
    >
      <span className="flex items-center gap-2">
        {Icon && (
          <Icon
            className={cn("w-4 h-4", active ? "opacity-100" : "opacity-50")}
          />
        )}
        {label}
      </span>
      <span className="font-mono opacity-50">
        {count.toString().padStart(2, "0")}
      </span>
    </button>
  );
}
