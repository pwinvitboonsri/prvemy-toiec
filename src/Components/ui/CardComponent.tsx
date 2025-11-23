"use client";

import * as React from "react";

// --- MOCK UTILS (To ensure standalone functionality) ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// --- RISO SKELETON COMPONENT ---
// Replaces standard skeleton with a style that matches the ink/paper theme
const SkeletonComponent = ({
  className,
  width,
  height,
}: {
  className?: string;
  width?: string | number;
  height?: string | number;
}) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--riso-ink)]/10", // Low opacity ink color
        className
      )}
      style={{ width, height }}
    />
  );
};

// --- MAIN CARD COMPONENT ---

type FormCardProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  loading?: boolean;
};

export function CardComponent({
  title,
  description,
  actionLabel,
  onActionClick,
  children,
  footer,
  className,
  loading = false,
}: FormCardProps) {
  return (
    <div
      className={cn(
        // Riso Box Model: Paper background, Ink Border, Hard Blue Shadow
        "flex flex-col w-full max-w-md h-[70vh]",
        "bg-[var(--riso-paper)] border-2 border-[var(--riso-ink)]",
        "shadow-[8px_8px_0px_var(--riso-blue)]",
        "transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px]", // Subtle lift effect
        className
      )}
    >
      {/* --- HEADER SECTION --- */}
      <div className="p-6 border-b-2 border-[var(--riso-ink)] bg-[var(--riso-paper)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            {loading ? (
              <>
                <SkeletonComponent height="1.5rem" width="60%" />
                <SkeletonComponent height="1rem" width="80%" />
              </>
            ) : (
              <>
                {/* Title: Uppercase Display Font */}
                <h3 className="text-2xl font-black uppercase tracking-tight text-[var(--riso-ink)] leading-none">
                  {title}
                </h3>
                {/* Description: Monospace for "Technical/Document" feel */}
                {description && (
                  <p className="font-mono text-xs text-[var(--riso-blue)] opacity-80 uppercase tracking-wide">
                    {description}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Action Button (Link Style) */}
          {!loading && actionLabel && onActionClick && (
            <button
              onClick={onActionClick}
              className="text-xs font-bold uppercase underline decoration-2 underline-offset-4 text-[var(--riso-ink)] hover:text-[var(--riso-red)] hover:decoration-[var(--riso-red)] transition-colors shrink-0"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      {/* flex-1 allows this area to stretch/scroll if needed */}
      <div className="flex-1 p-6 overflow-y-auto">
        {loading ? (
          <div className="space-y-4">
            <SkeletonComponent height="3rem" width="100%" />
            <SkeletonComponent height="3rem" width="100%" />
            <SkeletonComponent height="8rem" width="100%" />
          </div>
        ) : (
          children
        )}
      </div>

      {/* --- FOOTER SECTION --- */}
      {footer && (
        <div className="p-6 border-t-2 border-[var(--riso-ink)] bg-[var(--riso-paper)]">
          {loading ? (
            <div className="flex flex-col gap-2">
              <SkeletonComponent height="2.5rem" width="100%" />
              <SkeletonComponent
                height="1rem"
                width="60%"
                className="mx-auto"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full [&>*]:w-full">
              {footer}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
