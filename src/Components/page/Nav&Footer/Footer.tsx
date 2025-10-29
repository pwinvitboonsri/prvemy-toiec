"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Facebook, Github, Instagram } from "lucide-react";

export function FooterComponent({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "w-full border-t backdrop-blur-md bg-white/10 dark:bg-black/20 border-white/10 shadow-inner px-6 py-6 mt-12",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo and Copyright */}
        <div className="text-sm text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} prvemy — All rights reserved.
        </div>

        {/* Middle: Links */}
        <div className="flex gap-4 text-sm">
          <Link
            href="/privacy"
            className="hover:text-primary transition text-muted-foreground"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-primary transition text-muted-foreground"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="hover:text-primary transition text-muted-foreground"
          >
            Contact
          </Link>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-3">
          <Link href="https://github.com" target="_blank">
            <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition" />
          </Link>
          <Link href="https://facebook.com" target="_blank">
            <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary transition" />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary transition" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
