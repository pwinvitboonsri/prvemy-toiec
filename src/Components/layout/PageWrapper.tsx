// components/layout/page-wrapper.tsx
import { cn } from "@/lib/utils";
import React from "react";

type PageWrapperProps = {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean; // optional flag to disable padding
};

export function PageWrapper({
  children,
  className,
  noPadding = false,
}: PageWrapperProps) {
  return (
    <div
      className={cn(
        "w-full max-w-6xl mx-auto",
        noPadding ? "" : "px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
