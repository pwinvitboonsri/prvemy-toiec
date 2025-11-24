"use client";

import React, { useActionState, useEffect } from "react";
import Link from "next/link";
import { useErrorStore } from "@/store/error/useErrorStore";
import { signInWithEmail } from "@/lib/auth/actions";

// Global UI Components
import { InputComponent } from "@/Components/ui/InputComponent";
import { Button } from "@/Components/ui/Button/Button";

export default function LoginPage() {
  // 1. Logic Hooks
  const [state, action, isPending] = useActionState(signInWithEmail, undefined);
  const addError = useErrorStore((s) => s.addError);

  // 2. Error Handling
  useEffect(() => {
    if (state?.error) {
      addError({
        id: crypto.randomUUID(),
        source: "auth",
        title: "AUTH_ERROR",
        message: state.error,
        field: "form",
        location: "LoginPage",
        timestamp: Date.now(),
        autoDismiss: true,
      });
    }
  }, [state?.error, addError]);

  return (
    // LAYOUT FIX: Changed 'justify-center' to 'md:justify-start md:pt-24'
    // This anchors the card to the top-center, preventing "jumping" when switching to the taller Register form.
    <div className="min-h-screen flex flex-col items-center justify-center md:justify-start md:pt-24 p-4 relative overflow-hidden font-sans text-foreground">
      {/* --- BACKGROUND DECORATIONS --- */}
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

      {/* --- LOGIN CARD CONTAINER --- */}
      <div className="relative z-10 w-full max-w-md">
        {/* Floating Badge */}
        <div className="absolute -top-8 -left-8 z-20 hidden md:block animate-bounce duration-[3000ms]">
          <div className="bg-destructive text-destructive-foreground font-mono text-xs font-bold px-3 py-1 border-2 border-border shadow-[4px_4px_0px_var(--primary)] -rotate-6">
            SECURE_ACCESS
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-card border-2 border-border shadow-[8px_8px_0px_var(--primary)] hover:shadow-[12px_12px_0px_var(--destructive)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 p-8 relative overflow-hidden w-full">
          {/* Header Section */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-block border-2 border-border px-2 py-0.5 font-mono text-[10px] mb-2 bg-accent text-accent-foreground hover:bg-destructive hover:text-white transition-colors"
            >
              RETURN_TO_BASE
            </Link>

            <h1
              className="text-5xl font-black mb-2 glitch-text font-sans tracking-tighter"
              data-text="LOGIN"
            >
              LOGIN
            </h1>
            <p className="font-mono text-xs opacity-60 text-primary font-bold">
              {">"} ENTER CREDENTIALS TO PROCEED_
            </p>
          </div>

          {/* Logic Form */}
          <form action={action} className="space-y-6">
            <InputComponent
              id="email"
              name="email"
              type="email"
              label="USER_ID // EMAIL"
              placeholder="name@example.com"
              required
              disabled={isPending}
            />

            <div>
              <InputComponent
                id="password"
                name="password"
                type="password"
                label="PASSCODE // KEY"
                placeholder="••••••••"
                required
                disabled={isPending}
              />
              <div className="flex justify-end mt-2">
                <Link href="/forgot-password">
                  <span className="bg-transparent text-foreground underline decoration-2 underline-offset-4 hover:text-destructive font-mono text-xs cursor-pointer">
                    Forgot_Code?
                  </span>
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "AUTHENTICATING..." : "AUTHENTICATE"}
              </Button>
            </div>
          </form>

          {/* Footer / Register Link */}
          <div className="mt-8 pt-6 border-t-2 border-border text-center">
            <p className="font-mono text-xs mb-3">NEW_USER_DETECTED?</p>
            <Link href="/register" className="w-full block">
              <Button type="button" variant="secondary" className="w-full">
                Initialize Registration
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Bottom Tag */}
        <div className="mt-4 flex justify-between font-mono text-[10px] px-2 opacity-70 font-bold">
          <span>SYS: RISO_OS</span>
          <span>ENCRYPTION: MAX</span>
        </div>
      </div>
    </div>
  );
}
