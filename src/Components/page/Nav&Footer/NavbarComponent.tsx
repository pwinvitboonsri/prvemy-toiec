"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { RippleButtonComponent as Button } from "@/Components/ui/Button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
} from "@/Components/ui/shadcn-lib/drawer";
import { ThemeToggleButtonComponent } from "@/Components/ui/ThemeToggleComponent";

const isAuthenticated = false;

const guestLinks = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "Demo Test", href: "/test/demo" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const authLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Goal", href: "/goal" },
  { label: "Bookmark", href: "/bookmark" },
  { label: "Shop", href: "/shop" },
  { label: "Test", href: "/test" },
  { label: "Book List", href: "/books" },
  { label: "Setting", href: "/setting" },
];

export function NavbarComponent({ className }: { className?: string }) {
  const pathname = usePathname();
  const links = isAuthenticated ? authLinks : guestLinks;

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-[95vw] px-6 py-3 border-b border-white/10 backdrop-blur-xl shadow-md rounded-[28px] mx-auto mt-4 bg-white/10 dark:bg-black/20",
        className
      )}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-wide text-primary">
          PRVEMY -<span className="text-destructive">TOIEC</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative transition hover:text-primary",
                pathname === link.href
                  ? "text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-[#da1e37] after:to-[#e01e37] after:rounded-full"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-2 items-center">
          <ThemeToggleButtonComponent className="h-8 w-8" />
          {isAuthenticated ? (
            <>
              <Link href="/notifications" className="text-sm">
                🔔
              </Link>
              <Link href="/setting" className="text-sm">
                👤
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" variant="outline">
                  Register Free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Drawer */}
        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col gap-4 px-6 py-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium transition hover:text-primary",
                      pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2">
                  {isAuthenticated ? (
                    <>
                      <Link href="/notifications">🔔 Notifications</Link>
                      <Link href="/setting">👤 Profile</Link>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost">Login</Button>
                      <Button variant="outline">Register Free</Button>
                    </>
                  )}
                </div>
                <div className="pt-4 border-t border-border mt-2 flex justify-start">
                  <ThemeToggleButtonComponent className="h-8 w-8" />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  );
}
