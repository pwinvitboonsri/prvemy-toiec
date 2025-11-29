"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";

export function FooterComponent({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        // CHANGED: Now uses standard background/foreground.
        // Added 'border-t-4 border-foreground' for that heavy ink look.
        "w-full bg-background text-foreground py-16 border-t-4 border-foreground font-sans",
        className
      )}
    >
      {/* Main Grid Container */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* --- COLUMN 1: BRANDING --- */}
        <div className="space-y-6">
          <div>
            {/* Logo Text */}
            <h4 className="text-foreground font-black uppercase tracking-wider text-xl mb-2 flex items-center gap-2">
              <div className="w-4 h-4 bg-primary shadow-[2px_2px_0px_var(--foreground)]"></div>
              PROJECT/UI
            </h4>
            <div className="h-1 w-12 bg-destructive"></div>
          </div>

          <p className="font-mono text-xs opacity-70 leading-relaxed tracking-wide text-foreground">
            MODULAR LEARNING SYSTEM.
            <br />
            VERSION 3.5.0
            <br />
            BANGKOK, TH.
          </p>

          {/* Decorative System Status Dots - Updated borders to be visible on light bg */}
          <div className="flex gap-3 pt-2">
            <div className="w-3 h-3 bg-primary border-2 border-foreground"></div>
            <div className="w-3 h-3 bg-destructive border-2 border-foreground"></div>
            <div className="w-3 h-3 bg-accent border-2 border-foreground"></div>
          </div>
        </div>

        {/* --- COLUMN 2: MODULES --- */}
        <div>
          <h4 className="text-sm font-black uppercase mb-6 tracking-widest text-foreground border-b-2 border-foreground/10 pb-2 inline-block">
            Modules
          </h4>
          <ul className="font-mono text-xs space-y-3 opacity-80">
            <li>
              <Link
                href="/books"
                className="hover:text-destructive transition-colors uppercase tracking-wider flex items-center gap-2 group"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive font-bold">
                  {">"}
                </span>
                Books
              </Link>
            </li>
            <li>
              <Link
                href="/test/demo"
                className="hover:text-destructive transition-colors uppercase tracking-wider flex items-center gap-2 group"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive font-bold">
                  {">"}
                </span>
                Demo Test
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="hover:text-destructive transition-colors uppercase tracking-wider flex items-center gap-2 group"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive font-bold">
                  {">"}
                </span>
                Shop Assets
              </Link>
            </li>
          </ul>
        </div>

        {/* --- COLUMN 3: SUPPORT --- */}
        <div>
          <h4 className="text-sm font-black uppercase mb-6 tracking-widest text-foreground border-b-2 border-foreground/10 pb-2 inline-block">
            System
          </h4>
          <ul className="font-mono text-xs space-y-3 opacity-80">
            <li>
              <Link
                href="/about"
                className="hover:text-primary transition-colors uppercase tracking-wider"
              >
                About / Manifest
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors uppercase tracking-wider"
              >
                Contact Support
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="hover:text-primary transition-colors uppercase tracking-wider"
              >
                Documentation
              </Link>
            </li>
            <li>
              <Link
                href="/status"
                className="hover:text-primary transition-colors uppercase tracking-wider"
              >
                Server Status
              </Link>
            </li>
          </ul>
        </div>

        {/* --- COLUMN 4: CONNECT --- */}
        <div>
          <h4 className="text-sm font-black uppercase mb-6 tracking-widest text-foreground border-b-2 border-foreground/10 pb-2 inline-block">
            Connect
          </h4>

          {/* Social Links - Updated to Outline Style (Riso) */}
          <div className="flex gap-4 mb-8">
            <Link
              href="https://github.com"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center border-2 border-foreground hover:bg-foreground hover:text-background shadow-[2px_2px_0px_var(--foreground)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center border-2 border-foreground hover:bg-primary hover:text-white hover:border-primary shadow-[2px_2px_0px_var(--foreground)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center border-2 border-foreground hover:bg-accent hover:text-foreground hover:border-foreground shadow-[2px_2px_0px_var(--foreground)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Twitter className="w-5 h-5" />
            </Link>
          </div>

          <p className="font-mono text-[10px] opacity-50 uppercase tracking-widest">
            EST. 2025 — PRIVATE
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-foreground pt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[10px] opacity-60 uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} PRVEMY SYSTEM. ALL RIGHTS RESERVED.
          </div>

          <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest opacity-60 font-bold">
            <Link
              href="/privacy"
              className="hover:text-destructive transition-colors hover:underline decoration-2"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-destructive transition-colors hover:underline decoration-2"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="hover:text-destructive transition-colors hover:underline decoration-2"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
