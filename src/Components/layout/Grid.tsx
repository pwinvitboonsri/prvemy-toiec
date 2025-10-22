import { cn } from "@/lib/utils";
import React from "react";

type GridProps = {
  children: React.ReactNode;
  cols?: number; // e.g., 3 → md:grid-cols-3
  gap?: string; // e.g., gap-4, gap-x-6 gap-y-10
  className?: string;
};

export function Grid({
  children,
  cols = 3,
  gap = "gap-6",
  className,
}: GridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2", // Mobile = 1, sm = 2
        `md:grid-cols-${cols}`,
        gap,
        className
      )}
    >
      {children}
    </div>
  );
}
