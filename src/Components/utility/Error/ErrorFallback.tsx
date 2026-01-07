"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RippleButtonComponent } from "@/Components/ui/button/RippleButtonComponent";

type ErrorFallbackProps = {
  error?: Error;
  resetErrorBoundary?: () => void;
};

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const router = useRouter();

  const handleReset = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground px-6 py-16 flex items-center justify-center">
      <div className="max-w-xl w-full flex flex-col gap-8 items-center text-center">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-destructive tracking-tight">
          Oops! Something went wrong
        </h1>

        {/* Error Box */}
        <div className="bg-muted border border-border rounded-lg w-full max-h-[300px] overflow-auto p-4 text-left shadow-md">
          <p className="text-sm font-semibold text-destructive mb-2">
            {error?.message || "An unexpected error occurred."}
          </p>
          <pre className="whitespace-pre-wrap text-xs text-muted-foreground font-mono leading-snug">
            {error?.stack || "No stack trace available."}
          </pre>
        </div>

        {/* Retry */}
        <RippleButtonComponent variant="destructive" onClick={handleReset}>
          Try again
        </RippleButtonComponent>
      </div>
    </div>
  );
}
