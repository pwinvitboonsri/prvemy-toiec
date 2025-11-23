"use client";

import * as React from "react";

// --- MOCK UTILS ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// --- RISO SKELETON ---
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
    className={cn("animate-pulse bg-[var(--riso-ink)]/10", className)}
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
      {/* LABEL SECTION */}
      <div className="flex justify-between items-end">
        {label &&
          (loading ? (
            <SkeletonComponent width="40%" height="0.75rem" />
          ) : (
            <label
              htmlFor={id}
              className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--riso-blue)]"
            >
              {label}
            </label>
          ))}
      </div>

      {/* INPUT SECTION */}
      {loading ? (
        <SkeletonComponent height="3rem" className="w-full" />
      ) : (
        <div className="relative">
          <input
            id={id}
            className={cn(
              // Base Riso Styles
              "flex h-12 w-full px-4 py-2",
              "bg-[var(--riso-paper)] text-[var(--riso-ink)]",
              "border-2 border-[var(--riso-ink)]",
              "font-mono text-sm placeholder:text-[var(--riso-ink)]/30",
              // Focus State (Hard Yellow Shadow)
              "focus:outline-none focus:border-[var(--riso-ink)] focus:bg-white",
              "focus:shadow-[4px_4px_0px_var(--riso-yellow)]",
              "transition-all duration-100 ease-out",
              // Error State (Red Border + Red Shadow)
              error &&
                "border-[var(--riso-red)] text-[var(--riso-red)] focus:shadow-[4px_4px_0px_var(--riso-red)] placeholder:text-[var(--riso-red)]/40",
              className
            )}
            {...props}
          />
          {/* Decorative corner marker if error exists */}
          {error && (
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-transparent border-r-[var(--riso-red)] pointer-events-none" />
          )}
        </div>
      )}

      {/* FOOTER SECTION (Description/Error) */}
      {!loading && (
        <div className="min-h-[1.25rem]">
          {error ? (
            <p className="font-mono text-[10px] font-bold text-[var(--riso-red)] uppercase tracking-wide flex items-center gap-1">
              <span>[!]</span> {error}
            </p>
          ) : description ? (
            <p className="font-mono text-[10px] text-[var(--riso-ink)] opacity-60">
              {description}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
