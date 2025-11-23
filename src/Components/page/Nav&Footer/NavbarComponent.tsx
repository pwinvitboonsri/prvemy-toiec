"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggleButtonComponent } from "@/Components/ui/ThemeToggleComponent";
import type { User } from "@supabase/supabase-js";
import { GUEST_NAV_LINKS, AUTH_NAV_LINKS } from "../../../../config/route";

// --- CUSTOM RISO COMPONENT STYLES ---

// Local Riso Button Component to match the specific brutalist design
// Uses standard Tailwind colors (blue-600, red-600, yellow-300) to match your mock
const RisoButton = ({
  variant = "primary",
  size = "default",
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  size?: "default" | "sm" | "icon";
}) => {
  let baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap font-bold transition-all focus:outline-none border-2 border-black active:translate-x-[1px] active:translate-y-[1px] active:shadow-none";

  // Size variants
  if (size === "sm") baseStyles += " h-8 px-3 text-xs";
  else if (size === "icon") baseStyles += " h-9 w-9";
  else baseStyles += " h-10 px-4 text-sm";

  // Style variants
  if (variant === "ghost") {
    baseStyles +=
      " border-transparent shadow-none hover:bg-yellow-300 hover:border-black text-black";
  } else if (variant === "outline") {
    baseStyles +=
      " bg-transparent text-black shadow-[2px_2px_0px_#2563eb] hover:shadow-[2px_2px_0px_#dc2626] hover:translate-x-[-1px] hover:translate-y-[-1px]";
  } else {
    // Default/Primary
    baseStyles +=
      " bg-blue-600 text-white shadow-[2px_2px_0px_black] hover:bg-red-600";
  }

  return (
    <button className={cn(baseStyles, className)} {...props}>
      {children}
    </button>
  );
};

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
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b-2 border-black bg-white transition-all font-sans",
        className
      )}
    >
      <div className="flex justify-between items-center h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-2 group no-underline">
          <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white font-black border-2 border-black shadow-[2px_2px_0px_black] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
            P
          </div>
          <span className="text-lg font-black tracking-tighter uppercase text-black">
            PRVEMY<span className="text-red-600">-TOIEC</span>
          </span>
        </Link>

        {/* --- DESKTOP LINKS --- */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-bold font-mono uppercase tracking-widest transition-all decoration-2 underline-offset-4 no-underline",
                pathname === link.href
                  ? "text-blue-600 underline"
                  : "text-black hover:text-red-600 hover:underline opacity-70 hover:opacity-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* --- DESKTOP ACTIONS --- */}
        <div className="hidden md:flex gap-3 items-center">
          {/* Theme Toggle - Styled to match Riso */}
          <div className="border-2 border-black hover:bg-yellow-300 shadow-[2px_2px_0px_black] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
            <ThemeToggleButtonComponent className="h-9 w-9 rounded-none border-none" />
          </div>

          {isAuthenticated ? (
            <>
              <Link
                href="/notifications"
                className="w-9 h-9 flex items-center justify-center border-2 border-black hover:bg-yellow-300 shadow-[2px_2px_0px_black] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all text-black"
              >
                <Bell className="w-4 h-4" />
              </Link>
              <Link
                href="/setting"
                className="w-9 h-9 flex items-center justify-center border-2 border-black bg-blue-600 text-white shadow-[2px_2px_0px_black] hover:bg-red-600 transition-colors"
              >
                <UserIcon className="w-4 h-4" />
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <RisoButton
                  variant="ghost"
                  size="sm"
                  className="font-mono font-bold uppercase text-xs hover:bg-yellow-300 hover:text-black text-black"
                >
                  Login
                </RisoButton>
              </Link>
              <Link href="/register">
                <RisoButton
                  size="sm"
                  className="bg-black text-white border-2 border-black font-bold uppercase text-xs tracking-wide shadow-[3px_3px_0px_#2563eb] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none"
                >
                  Register Free
                </RisoButton>
              </Link>
            </>
          )}
        </div>

        {/* --- MOBILE DRAWER TRIGGER --- */}
        <div className="md:hidden flex items-center gap-2">
          <div className="border-2 border-black rounded-none h-8 w-8 flex items-center justify-center">
            <ThemeToggleButtonComponent className="h-full w-full rounded-none border-none" />
          </div>
          <RisoButton
            variant="ghost"
            size="icon"
            className="border-2 border-black rounded-none hover:bg-yellow-300 h-8 w-8 p-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </RisoButton>
        </div>
      </div>

      {/* --- MOBILE DRAWER CONTENT --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t-2 border-black bg-white absolute top-full left-0 w-full shadow-xl z-40">
          <div className="flex flex-col gap-6 px-6 py-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)} // Close on click
                className={cn(
                  "text-xl font-black uppercase tracking-tight transition-colors no-underline",
                  pathname === link.href
                    ? "text-blue-600 pl-4 border-l-4 border-blue-600"
                    : "text-black hover:text-red-600"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="h-px bg-black opacity-20 my-2"></div>

            <div className="flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/notifications"
                    className="flex items-center gap-2 font-mono font-bold text-sm text-black no-underline"
                  >
                    <Bell className="w-4 h-4" /> NOTIFICATIONS
                  </Link>
                  <Link
                    href="/setting"
                    className="flex items-center gap-2 font-mono font-bold text-sm text-black no-underline"
                  >
                    <UserIcon className="w-4 h-4" /> PROFILE
                  </Link>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/login" className="block w-full">
                    <RisoButton className="w-full border-2 border-black bg-transparent text-black font-bold uppercase shadow-[2px_2px_0px_black] active:shadow-none active:translate-y-[2px]">
                      Login
                    </RisoButton>
                  </Link>
                  <Link href="/register" className="block w-full">
                    <RisoButton className="w-full border-2 border-black bg-red-600 text-white font-bold uppercase shadow-[2px_2px_0px_black] active:shadow-none active:translate-y-[2px]">
                      Register
                    </RisoButton>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
