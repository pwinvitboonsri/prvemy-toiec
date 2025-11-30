"use client";

import Link from "next/link";
import { ChevronRight, Lock } from "lucide-react";

export function BookHeader() {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-mono opacity-60 mb-2 uppercase">
        <Link href="/books" className="hover:underline hover:text-primary">
          Library
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-bold">ETS 2024</span>
      </div>

      {/* Title and Status Badge */}
      <div className="border-b-2 border-foreground pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
          ETS Simulation Test 01
        </h1>
        <span className="bg-green-300 text-green-900 border-2 border-foreground px-3 py-1 text-xs font-black uppercase shadow-sm inline-flex items-center gap-2 whitespace-nowrap">
          <Lock className="w-3 h-3" /> Guest Access
        </span>
      </div>
    </div>
  );
}
