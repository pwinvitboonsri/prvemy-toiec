"use client";

import * as React from "react";

// --- MOCK UTILS ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// --- MAIN LABEL COMPONENT ---

export type LabelComponentProps =
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
  };

export function LabelComponent({
  className,
  children,
  required,
  ...props
}: LabelComponentProps) {
  return (
    <label
      className={cn(
        // Base Typography
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        // Riso Art Style Overrides
        "font-mono text-xs font-bold uppercase tracking-wider",
        "text-[var(--riso-blue)]",
        "mb-1.5 block", // Ensure spacing below label
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-[var(--riso-red)] ml-1">*</span>}
    </label>
  );
}
