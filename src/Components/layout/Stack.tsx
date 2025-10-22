"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type StackProps = {
  children: React.ReactNode;
  className?: string;
  gap?: string; // tailwind value e.g., 'gap-4'
};

export function Stack({ children, className, gap = "gap-4" }: StackProps) {
  return <div className={cn("flex flex-col", gap, className)}>{children}</div>;
}
