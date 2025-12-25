"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/utils";

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <div className="relative inline-flex items-center justify-center w-5 h-5 group">
    {/* Native Input (Hidden but accessible) */}
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        "peer appearance-none h-5 w-5 shrink-0",
        "border-2 border-foreground bg-background", // Base Riso Style
        "cursor-pointer transition-all duration-200",

        // Focus State
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",

        // Checked State (Blue Background)
        "checked:bg-primary checked:border-primary",

        // Disabled State
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted disabled:border-muted-foreground/50",

        // HOVER: Hard Shadow Pop (Riso Effect)
        "hover:shadow-[2px_2px_0px_var(--destructive)] hover:-translate-y-[1px] hover:-translate-x-[1px] disabled:hover:shadow-none disabled:hover:translate-x-0",

        className
      )}
      {...props}
    />

    {/* Check Icon (Overlay) */}
    <Check
      className={cn(
        "pointer-events-none absolute w-3.5 h-3.5 text-primary-foreground opacity-0 transition-opacity duration-200",
        // Show when peer (input) is checked
        "peer-checked:opacity-100"
      )}
      strokeWidth={4} // Thicker stroke for brutalist look
    />
  </div>
));
Checkbox.displayName = "Checkbox";

export { Checkbox };
