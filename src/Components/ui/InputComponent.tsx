"use client";

import * as React from "react";
import { cn } from "@/lib/utils/utils";

// --- RISO SKELETON ---
// Matches the "Ink" color with low opacity for a rougher loading look
const SkeletonComponent = ({
  className,
  width,
  height,
}: {
  className?: string;
  width?: string | number;
  height?: string | number;
}) => (
  <div
    className={cn(
      "animate-pulse bg-foreground/10 border-2 border-transparent", // specific riso tweak
      className
    )}
    style={{ width, height }}
  />
);

// --- MAIN INPUT COMPONENT ---

type FormInputProps = {
  id: string;
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  loading?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function InputComponent({
  id,
  label,
  description,
  error,
  className,
  loading = false,
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-1.5 w-full font-sans">
      {/* 1. LABEL SECTION */}
      <div className="flex justify-between items-end">
        {label &&
          (loading ? (
            <SkeletonComponent width="40%" height="1rem" />
          ) : (
            <label
              htmlFor={id}
              className="font-mono text-xs font-bold uppercase tracking-wider text-primary"
            >
              {label}
            </label>
          ))}
      </div>

      {/* 2. INPUT SECTION */}
      {loading ? (
        <SkeletonComponent
          height="3rem"
          className="w-full border-dashed border-foreground/20"
        />
      ) : (
        <div className="relative group">
          <input
            id={id}
            className={cn(
              // --- BASE RISO STYLES ---
              "flex h-12 w-full px-4 py-2",
              "bg-background text-foreground", // Paper bg, Ink text
              "border-2 border-foreground", // Thick Ink Border
              "font-mono text-sm placeholder:text-foreground/30",

              // --- FOCUS STATE (The Signature Hard Yellow Shadow) ---
              "focus:outline-none focus:border-foreground focus:bg-background",
              "focus:shadow-[4px_4px_0px_var(--accent)]", // Hard Yellow Shadow
              "transition-all duration-100 ease-out",

              // --- ERROR STATE (Red Border + Red Shadow) ---
              error &&
                "border-destructive text-destructive focus:shadow-[4px_4px_0px_var(--destructive)] placeholder:text-destructive/40",

              className
            )}
            {...props}
          />

          {/* Decorative corner marker if error exists (Brutalist detail) */}
          {error && (
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-transparent border-r-destructive pointer-events-none" />
          )}
        </div>
      )}

      {/* 3. FOOTER SECTION (Description/Error) */}
      {!loading && (
        <div className="min-h-[1.25rem]">
          {error ? (
            <p className="font-mono text-[10px] font-bold text-destructive uppercase tracking-wide flex items-center gap-1 animate-in slide-in-from-left-1">
              <span>[!]</span> {error}
            </p>
          ) : description ? (
            <p className="font-mono text-[10px] text-muted-foreground opacity-70">
              {description}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
