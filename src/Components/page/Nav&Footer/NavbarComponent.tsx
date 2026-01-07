"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, User as UserIcon, Search } from "lucide-react";
import { cn } from "@/utils/utils";
import { ThemeToggleButtonComponent } from "@/Components/ui/ThemeToggleComponent";
import type { User } from "@supabase/supabase-js";
import { GUEST_NAV_LINKS, AUTH_NAV_LINKS } from "../../../../config/route";
import { Button } from "@/Components/ui/button";

interface NavbarProps {
  className?: string;
  user: User | null;
}

export function NavbarComponent({ className, user }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isAuthenticated = !!user;
  const links = isAuthenticated ? AUTH_NAV_LINKS : GUEST_NAV_LINKS;

  return (
    <>
      {/* TOP STRIP (Decorative / Utility) - Hidden on Mobile (< 1024px) */}
      <div className="w-full bg-background border-b-2 border-foreground py-1 px-4 hidden lg:flex justify-between items-center text-[10px] font-mono uppercase tracking-widest opacity-60">
        <span>SYS: RISO_OS_V3.5</span>
        <span className="flex items-center gap-4">
          <span>SERVER: ONLINE</span>
          <span>LOC: BANGKOK, TH</span>
        </span>
      </div>

      <nav
        className={cn(
          "sticky top-0 z-50 w-full border-b-2 border-foreground bg-background transition-all font-sans",
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* --- LOGO SECTION --- */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="group no-underline flex items-center gap-3"
              >
                {/* Logo Box */}
                <div className="w-10 h-10 bg-primary flex items-center justify-center text-primary-foreground font-black text-xl border-2 border-foreground shadow-[4px_4px_0px_var(--foreground)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
                  P
                </div>
                {/* Text Logo */}
                <div className="flex flex-col leading-none">
                  <span className="text-2xl font-black tracking-tighter uppercase text-foreground">
                    PRVEMY<span className="text-destructive">/TOIEC</span>
                  </span>
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] text-foreground/60">
                    INTELLIGENT SYSTEM
                  </span>
                </div>
              </Link>
            </div>

            {/* --- DESKTOP NAV LINKS --- */}
            {/* Changed md:flex to lg:flex so it stays hidden until 1024px */}
            <div className="hidden lg:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs font-bold font-mono uppercase tracking-widest transition-all decoration-2 underline-offset-4",
                    pathname === link.href
                      ? "text-primary underline"
                      : "text-foreground hover:text-destructive hover:underline opacity-70 hover:opacity-100"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* --- DESKTOP ACTIONS --- */}
            {/* Changed md:flex to lg:flex */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Search Icon (Decorative) */}
              <button className="p-2 hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>

              <div className="h-8 w-[2px] bg-foreground/20 mx-2"></div>

              <ThemeToggleButtonComponent className="h-12 w-12 border-2 border-foreground rounded-none hover:bg-accent shadow-[2px_2px_0px_var(--foreground)] active:shadow-none transition-all" />

              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link href="/notifications">
                    <Button
                      variant="outline"
                      size="icon"
                      className="shadow-[2px_2px_0px_var(--foreground)]"
                    >
                      <Bell className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/setting">
                    <Button
                      variant="default"
                      size="icon"
                      className="shadow-[2px_2px_0px_var(--foreground)] bg-primary text-white hover:bg-destructive"
                    >
                      <UserIcon className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="font-mono font-bold uppercase text-xs hover:bg-accent hover:text-foreground"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-foreground text-background border-2 border-foreground font-bold uppercase text-xs tracking-wide shadow-[4px_4px_0px_var(--primary)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none">
                      Register Free
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* --- MOBILE MENU TOGGLE --- */}
            {/* Changed md:hidden to lg:hidden so it shows up on screens < 1024px */}
            <div className="lg:hidden flex items-center gap-4">
              <ThemeToggleButtonComponent className="h-9 w-9 border-2 border-foreground rounded-none" />
              <Button
                variant="outline"
                size="icon"
                className="border-2 border-foreground rounded-none hover:bg-accent h-10 w-10 shadow-[2px_2px_0px_var(--foreground)]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* --- MOBILE DRAWER --- */}
        {/* Changed md:hidden to lg:hidden so it's visible on screens < 1024px */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-foreground bg-background absolute top-full left-0 w-full shadow-2xl z-40 animate-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col p-6 gap-6">
              {/* Mobile Links */}
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-2xl font-black uppercase tracking-tighter transition-colors flex items-center gap-2",
                      pathname === link.href
                        ? "text-primary pl-4 border-l-4 border-primary"
                        : "text-foreground hover:text-destructive"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="h-[2px] bg-foreground/10 my-2"></div>

              {/* Mobile Auth Actions */}
              <div className="grid grid-cols-1 gap-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/notifications"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start font-mono"
                      >
                        <Bell className="mr-2 h-4 w-4" /> NOTIFICATIONS
                      </Button>
                    </Link>
                    <Link
                      href="/setting"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start font-mono"
                      >
                        <UserIcon className="mr-2 h-4 w-4" /> PROFILE SETTINGS
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full font-mono">
                        LOGIN
                      </Button>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-destructive text-white font-mono shadow-[4px_4px_0px_var(--foreground)]">
                        REGISTER
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Footer Decorative */}
              <div className="flex justify-between items-end pt-4 opacity-50 font-mono text-[10px]">
                <span>EST. 2025</span>
                <span>PRVEMY-TOEIC®</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
