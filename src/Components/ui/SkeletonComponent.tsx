"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton as BaseSkeleton } from "./shadcn-lib/skeleton";

export type SkeletonComponentProps = {
  /** Width of the skeleton (Tailwind or numeric pixels) */
  width?: string | number;
  /** Height of the skeleton (Tailwind or numeric pixels) */
  height?: string | number;
  /** Optional extra Tailwind classes */
  className?: string;
  /** Rounded style (default true) */
  rounded?: boolean;
};

export function SkeletonComponent({
  width = "100%",
  height = "1rem",
  className,
  rounded = true,
}: SkeletonComponentProps) {
  return (
    <BaseSkeleton
      className={cn(rounded && "rounded-md", className)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
}
