"use client";

import { User } from "@supabase/supabase-js";
import NextLink from "next/link";
import { Button } from "@/Components/ui/Button/Button";
import { Headphones, User as UserIcon, ArrowRight } from "lucide-react";

export function WelcomeHeader({ user }: { user: User | null }) {
  if (user) {
    // --- LOGGED IN VIEW ---
    return (
      <section className="bg-card border-2 border-foreground p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[4px_4px_0px_var(--primary)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--destructive)] transition-all">
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* Avatar Placeholder */}
            <div className="w-16 h-16 border-2 border-foreground bg-background flex items-center justify-center overflow-hidden">
              {/* You can replace src with user.user_metadata.avatar_url */}
              <span className="font-black text-2xl uppercase">
                {user.email?.charAt(0)}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground text-[10px] font-mono font-bold px-2 py-0.5 border-2 border-foreground">
              LVL 4
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              Good Morning, {user.user_metadata.full_name || "Candidate"}
            </h1>
            <p className="font-mono text-sm mt-1 opacity-70 uppercase">
              READY_TO_CRUSH_GOALS?
            </p>
          </div>
        </div>

        {/* Resume Card */}
        <div className="w-full md:w-auto bg-background border-2 border-foreground p-4 flex items-center gap-4 min-w-[320px]">
          <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center shrink-0 border-2 border-foreground">
            <Headphones className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs font-mono mb-1 uppercase font-bold">
              <span>ETS 2024 Test 2</span>
              <span>12/30</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full border-2 border-foreground h-3 p-[1px]">
              <div className="bg-primary h-full w-[40%]"></div>
            </div>
            <button className="text-xs font-bold uppercase hover:text-destructive mt-1 flex items-center gap-1 transition-colors">
              Resume Session <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // --- GUEST VIEW ---
  return (
    <section className="bg-accent border-2 border-foreground p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[4px_4px_0px_var(--foreground)]">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-foreground bg-background flex items-center justify-center">
            <UserIcon className="w-8 h-8 text-foreground opacity-50" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            Welcome, Future Master
          </h1>
          <p className="font-mono text-sm mt-1 opacity-70 uppercase">
            JOIN_10,000+_STUDENTS_TODAY
          </p>
        </div>
      </div>

      <div className="w-full md:w-auto flex items-center gap-4">
        <div className="flex-1 md:text-right">
          <p className="text-sm font-bold uppercase mb-2">
            Start your journey today
          </p>
          <NextLink href="/register">
            <Button className="w-full md:w-auto bg-foreground text-background hover:bg-destructive">
              Start Free Trial
            </Button>
          </NextLink>
        </div>
      </div>
    </section>
  );
}
