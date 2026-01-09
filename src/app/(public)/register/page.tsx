"use client";

import React, { useActionState, useEffect } from "react";
import Link from "next/link";
import { useErrorStore } from "@/store/error/useErrorStore";
import { signUpWithEmail } from "@/lib/auth/actions";

// Global UI Components
import { InputComponent } from "@/Components/ui/InputComponent";
// Ensure this path matches where you saved the new Button.tsx
import { Button } from "@/Components/ui/Button/Button";

export default function RegisterPage() {
  // 1. Logic Hooks
  // We use the 'signUpWithEmail' action here
  const [state, action, isPending] = useActionState(signUpWithEmail, undefined);
  const addError = useErrorStore((s) => s.addError);

  // 2. Error Handling
  useEffect(() => {
    if (state?.error) {
      addError({
        id: crypto.randomUUID(),
        source: "auth",
        title: "REGISTRATION_ERROR",
        message: state.error,
        field: "form",
        location: "RegisterPage",
        timestamp: Date.now(),
        autoDismiss: true,
      });
    }
  }, [state?.error, addError]);

  return (
    // LAYOUT FIX: Uses 'md:justify-start md:pt-24' to match Login Page alignment
    <div className="min-h-screen flex flex-col items-center justify-center md:justify-start md:pt-24 p-4 relative overflow-hidden font-sans text-foreground">
      {/* --- BACKGROUND DECORATIONS (Same as Login) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Yellow/Red Diagonal Strip */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-64 bg-accent border-y-4 border-border z-0 flex items-center justify-center overflow-hidden -skew-y-6 origin-center">
          <div
            className="w-full h-full opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, currentColor 0, currentColor 2px, transparent 0, transparent 10px)",
            }}
          ></div>
        </div>

        {/* Blue Secondary Beam */}
        <div className="absolute bottom-0 right-0 w-full h-32 bg-primary border-t-4 border-border opacity-90 z-0 translate-y-10 skew-y-3"></div>
      </div>

      {/* --- REGISTER CARD CONTAINER --- */}
      <div className="relative z-10 w-full max-w-md">
        {/* Floating Badge */}
        <div className="absolute -top-8 -right-8 z-20 hidden md:block animate-bounce duration-[3000ms]">
          <div className="bg-accent text-accent-foreground font-mono text-xs font-bold px-3 py-1 border-2 border-border shadow-[4px_4px_0px_var(--primary)] rotate-3">
            REGISTER
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-card border-2 border-border shadow-[8px_8px_0px_var(--primary)] hover:shadow-[12px_12px_0px_var(--destructive)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 p-8 relative overflow-hidden w-full">
          {/* Header Section */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-block border-2 border-border px-2 py-0.5 font-mono text-[10px] mb-2 bg-background text-foreground hover:bg-primary hover:text-white transition-colors"
            >
              Back to Home
            </Link>

            <h1
              className="text-4xl font-black mb-2 glitch-text font-sans tracking-tighter"
              data-text="CREATE ACCOUNT"
            >
              CREATE ACCOUNT
            </h1>
            <p className="font-mono text-xs opacity-60 text-primary font-bold">
              Create your account
            </p>
          </div>

          {/* Logic Form */}
          <form action={action} className="space-y-6">
            <InputComponent
              id="name"
              name="full_name"
              type="text"
              label="FULL NAME"
              placeholder="John Doe"
              required
              disabled={isPending}
            />

            <InputComponent
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              required
              disabled={isPending}
            />

            <InputComponent
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              required
              disabled={isPending}
            />

            <InputComponent
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              required
              disabled={isPending}
            />

            <div className="pt-2">
              <Button
                type="submit"
                // We use 'destructive' (Red) for the primary action on register
                className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={isPending}
              >
                {isPending ? "Creating account..." : "Sign Up"}
              </Button>
            </div>
          </form>

          {/* Footer / Login Link */}
          <div className="mt-8 pt-6 border-t-2 border-border text-center">
            <p className="font-mono text-xs mb-3">Already have an account?</p>
            <Link href="/login" className="w-full block">
              <Button type="button" variant="outline" className="w-full">
                Access Existing Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Bottom Tag */}
        {/* Decorative Bottom Tag removed */}
      </div>
    </div>
  );
}
