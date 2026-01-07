"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, CheckCircle2, ArrowRight, AlertTriangle } from "lucide-react";
import { Button } from "@/Components/ui/button/Button";

// --- CONTENT COMPONENT ---
function VerifyContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const isSuccess = message === "email-success";
  const isError = message === "auth-code-error";

  return (
    <div className="bg-card border-2 border-border shadow-[8px_8px_0px_var(--primary)] hover:shadow-[12px_12px_0px_var(--destructive)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 p-12 relative overflow-hidden w-full text-center space-y-8">
      {/* --- ICON BADGE --- */}
      <div className="mx-auto w-24 h-24 bg-accent border-2 border-border flex items-center justify-center shadow-[4px_4px_0px_var(--foreground)] rotate-3 transition-transform duration-500 hover:rotate-6">
        {isSuccess ? (
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        ) : isError ? (
          <AlertTriangle className="w-12 h-12 text-destructive" />
        ) : (
          <Mail className="w-12 h-12 text-accent-foreground" />
        )}
      </div>

      {/* --- CONTENT --- */}
      <div className="space-y-4">
        <h1 className="text-3xl font-black font-sans tracking-tighter uppercase leading-none">
          {isSuccess
            ? "IDENTITY\nVERIFIED"
            : isError
              ? "VERIFICATION\nFAILED"
              : "TRANSMISSION\nSENT"}
        </h1>

        <div
          className={`h-1 w-16 mx-auto ${isSuccess
            ? "bg-green-600"
            : isError
              ? "bg-destructive"
              : "bg-primary"
            }`}
        ></div>

        <p className="font-mono text-xs opacity-70 leading-relaxed px-2 uppercase">
          {isSuccess
            ? "ACCESS GRANTED. SECURE CONNECTION ESTABLISHED. WELCOME TO THE NETWORK."
            : isError
              ? "INVALID OR EXPIRED TOKEN. THE LINK MAY BE BROKEN OR ALREADY USED. PLEASE TRY AGAIN."
              : "A VERIFICATION SIGNAL HAS BEEN DISPATCHED TO YOUR INBOX. CONFIRM LINK TO INITIALIZE IDENTITY."}
        </p>
      </div>

      {/* --- ACTION BUTTON / STATUS --- */}
      {isSuccess ? (
        <div className="pt-4 border-t-2 border-border animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Link href="/" className="w-full block">
            <Button className="w-full bg-foreground text-background hover:bg-primary hover:text-white">
              ENTER HOME <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      ) : isError ? (
        <div className="pt-4 border-t-2 border-border animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Link href="/login" className="w-full block">
            <Button
              variant="outline"
              className="w-full hover:bg-destructive hover:text-white"
            >
              RETURN TO LOGIN
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-destructive font-bold animate-pulse">
          <div className="w-2 h-2 bg-destructive rounded-full"></div>
          AWAITING_CONFIRMATION...
        </div>
      )}
    </div>
  );
}

// --- PAGE WRAPPER ---
export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:justify-start md:pt-24 p-4 relative overflow-hidden font-sans text-foreground">
      {/* --- BACKGROUND DECORATIONS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-64 bg-accent border-y-4 border-border z-0 flex items-center justify-center overflow-hidden -skew-y-6 origin-center">
          <div
            className="w-full h-full opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, currentColor 0, currentColor 2px, transparent 0, transparent 10px)",
            }}
          ></div>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-primary border-t-4 border-border opacity-90 z-0 translate-y-10 skew-y-3"></div>
      </div>

      {/* --- CARD CONTAINER --- */}
      <div className="relative z-10 w-full max-w-md">
        {/* Floating Badge */}
        <div className="absolute -top-8 -left-8 z-20 hidden md:block animate-bounce duration-[3000ms]">
          <div className="bg-destructive text-destructive-foreground font-mono text-xs font-bold px-3 py-1 border-2 border-border shadow-[4px_4px_0px_var(--primary)] -rotate-6">
            STATUS: SYSTEM_MSG
          </div>
        </div>

        {/* SUSPENSE BOUNDARY */}
        <Suspense
          fallback={
            <div className="bg-card border-2 border-border p-12 text-center font-mono animate-pulse">
              INITIALIZING_INTERFACE...
            </div>
          }
        >
          <VerifyContent />
        </Suspense>

        {/* Decorative Bottom Tag */}
        <div className="mt-4 flex justify-between font-mono text-[10px] px-2 opacity-70 font-bold">
          <span>SYS: RISO_OS</span>
          <span>ENCRYPTION: MAX</span>
        </div>
      </div>
    </div>
  );
}
