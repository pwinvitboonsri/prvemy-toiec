"use client";

import * as React from "react";
import { cn } from "@/lib/utils/utils";

// Mimic Radix/Shadcn API
export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const SwitchComponent = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, onCheckedChange, onChange, ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      onChange={(e) => {
        onChange?.(e);
        onCheckedChange?.(e.target.checked);
      }}
      className={cn(
        // --- BASE LAYOUT (Shadcn-like behavior, Riso-like look) ---
        "peer inline-flex shrink-0 cursor-pointer items-center appearance-none",
        "transition-all duration-200 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",

        // --- RISO TRACK STYLES ---
        "h-[28px] w-[52px]",
        "border-2 border-foreground bg-muted", // Default: Ink border, Grey background
        "checked:bg-accent", // Active: Yellow background

        // --- RISO THUMB STYLES (Pseudo-element) ---
        "relative",
        "after:pointer-events-none after:absolute after:top-[2px] after:left-[2px]",
        "after:h-[20px] after:w-[20px]",
        "after:bg-foreground", // Default Thumb: Ink Color
        "after:border-2 after:border-transparent", // Placeholder border for sizing consistency
        "after:transition-all after:duration-200 after:cubic-bezier(0.4,0,0.2,1) after:content-['']",

        // --- THUMB CHECKED STATE ---
        // Moves 24px right, turns white with ink border
        "checked:after:translate-x-[24px]",
        "checked:after:bg-background",
        "checked:after:border-foreground",

        // --- HOVER EFFECTS ---
        "hover:shadow-[2px_2px_0px_var(--primary)]", // Hard Blue Shadow on Hover

        className
      )}
      {...props}
    />
  )
);
SwitchComponent.displayName = "SwitchComponent";

export { SwitchComponent };
