"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Facebook, Github, Instagram } from "lucide-react";

export function FooterComponent({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        // RISO STYLING: Ink Background, Paper Text, Thick Blue Top Border
        "w-full bg-foreground text-background py-12 border-t-4 border-primary font-sans",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* --- COLUMN 1: BRANDING --- */}
        <div className="space-y-4">
          <h4 className="text-accent font-black uppercase tracking-wider text-lg">
            PRVEMY-TOEIC
          </h4>
          <p className="font-mono text-xs opacity-70 leading-relaxed">
            Modular learning system.
            <br />
            Version 3.5.0
            <br />
            Bangkok, TH.
          </p>
          <p className="font-mono text-xs opacity-50 pt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* --- COLUMN 2: MODULES --- */}
        <div>
          <h4 className="text-sm font-bold uppercase mb-4 tracking-wide text-primary-foreground/80">
            Modules
          </h4>
          <ul className="font-mono text-xs space-y-2 opacity-80">
            <li>
              <Link
                href="/books"
                className="hover:text-destructive hover:underline transition-colors"
              >
                Books
              </Link>
            </li>
            <li>
              <Link
                href="/test/demo"
                className="hover:text-destructive hover:underline transition-colors"
              >
                Demo Test
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="hover:text-destructive hover:underline transition-colors"
              >
                Shop
              </Link>
            </li>
          </ul>
        </div>

        {/* --- COLUMN 3: SUPPORT --- */}
        <div>
          <h4 className="text-sm font-bold uppercase mb-4 tracking-wide text-primary-foreground/80">
            Support
          </h4>
          <ul className="font-mono text-xs space-y-2 opacity-80">
            <li>
              <Link
                href="/about"
                className="hover:text-destructive hover:underline transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-destructive hover:underline transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-destructive hover:underline transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-destructive hover:underline transition-colors"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* --- COLUMN 4: SOCIAL & SYSTEM STATUS --- */}
        <div>
          <h4 className="text-sm font-bold uppercase mb-4 tracking-wide text-primary-foreground/80">
            Connect
          </h4>

          {/* Social Icons */}
          <div className="flex gap-4 mb-6">
            <Link
              href="https://github.com"
              target="_blank"
              className="hover:text-accent transition-transform hover:-translate-y-1"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              className="hover:text-primary transition-transform hover:-translate-y-1"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-destructive transition-transform hover:-translate-y-1"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>

          {/* Little Riso Color Squares (Decorative) */}
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-primary border border-background/20"></div>
            <div className="w-3 h-3 bg-destructive border border-background/20"></div>
            <div className="w-3 h-3 bg-accent border border-background/20"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
