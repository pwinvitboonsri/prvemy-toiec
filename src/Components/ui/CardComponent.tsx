"use client";

import * as React from "react";
import { cn } from "@/utils/utils";

// --- RISO SKELETON COMPONENT ---
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
        "animate-pulse bg-[#111111]/10", // Low opacity ink color
        className
      )}
      style={{ width, height }}
    />
  );
};

// --- MAIN CARD COMPONENT ---

type FormCardProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  footerClassName?: string;
  loading?: boolean;

  // Side Tag Props
  sideLabel?: string;
  sideLabelVariant?: "default" | "warning";

  // Tape Decoration Prop
  taped?: boolean;

  // Interaction Prop
  enableHover?: boolean;

  // Layout Prop
  noPadding?: boolean; // New prop to remove default content padding
  scrollable?: boolean; // New prop to control scroll behavior
};

export function CardComponent({
  title,
  description,
  actionLabel,
  onActionClick,
  children,
  footer,
  className,
  footerClassName,
  loading = false,
  sideLabel,
  sideLabelVariant = "default",
  taped = false,
  enableHover = true,
  noPadding = false, // Defaults to false (padding enabled)
  scrollable = true, // Defaults to true (scroll enabled)
}: FormCardProps) {
  const showHeader =
    loading || title || description || (actionLabel && onActionClick);

  return (
    <div
      className={cn(
        "group relative flex flex-col w-full h-[70vh]",
        "bg-[#f2f0e9] border-2 border-[#111111]",
        "shadow-none transition-all duration-200",

        enableHover &&
        "hover:shadow-[8px_8px_0px_#1d3b88] hover:translate-x-[-2px] hover:translate-y-[-2px]",

        sideLabel || taped ? "overflow-visible" : "overflow-hidden",
        className
      )}
    >
      {/* --- TAPE DECORATION --- */}
      {taped && (
        <div className="absolute -top-3 left-1/2 z-20 h-6 w-24 -translate-x-1/2 -rotate-1 bg-[#ffe800] shadow-sm opacity-90 pointer-events-none"></div>
      )}

      {/* --- SIDE LABEL TAG --- */}
      {sideLabel && (
        <div
          className={cn(
            "absolute -right-6 top-8 z-[-1] flex h-24 w-6 items-center justify-center rounded-r-md border-2 border-l-0 border-[#111111] transition-transform duration-200",
            enableHover && "group-hover:translate-x-[2px]",
            sideLabelVariant === "warning"
              ? "bg-[#ffe800] text-[#111111]"
              : "bg-[#111111] text-white"
          )}
        >
          <span className="whitespace-nowrap text-[8px] font-bold tracking-widest rotate-90 transform uppercase">
            {sideLabel}
          </span>
        </div>
      )}

      {/* --- HEADER SECTION --- */}
      {showHeader && (
        <div className="p-6 border-b-2 border-[#111111] bg-[#f2f0e9] shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              {loading ? (
                <>
                  <SkeletonComponent height="1.5rem" width="60%" />
                  <SkeletonComponent height="1rem" width="80%" />
                </>
              ) : (
                <>
                  {title && (
                    <h3 className="text-2xl font-black uppercase tracking-tight text-[#111111] leading-none">
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p className="font-mono text-xs text-[#1d3b88] opacity-80 uppercase tracking-wide">
                      {description}
                    </p>
                  )}
                </>
              )}
            </div>

            {!loading && actionLabel && onActionClick && (
              <button
                onClick={onActionClick}
                className="text-xs font-bold uppercase underline decoration-2 underline-offset-4 text-[#111111] hover:text-[#ff3333] hover:decoration-[#ff3333] transition-colors shrink-0"
              >
                {actionLabel}
              </button>
            )}
          </div>
        </div>
      )}

      {/* --- CONTENT SECTION --- */}
      <div
        className={cn(
          "flex-1 relative z-10 bg-inherit",
          scrollable ? "overflow-y-auto" : "overflow-visible",
          noPadding ? "p-0" : "p-6" // Conditionally apply padding
        )}
      >
        {loading ? (
          <div className="space-y-4 px-6 pt-6">
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
        <div
          className={cn(
            "p-6 border-t-2 border-[#111111] bg-[#f2f0e9] shrink-0 relative z-10",
            footerClassName
          )}
        >
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
