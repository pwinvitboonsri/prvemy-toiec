"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils";

// --- RISO BUTTON VARIANTS ---
// Updated to match Riso-OS HTML prototype exactly.

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-black uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 border-2 border-[#111111]",
  {
    variants: {
      variant: {
        // 1. PRIMARY:
        // Static: Flat Blue
        // Hover: Lifts Up + Shadow
        // Active (Mobile Click): Turns Dark (Ink) + Flat for feedback
        // FIX: active:duration-0 ensures instant snap on click
        default:
          "bg-[#1d3b88] text-white shadow-none transition-all duration-200 hover:bg-[#1d3b88] hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] active:bg-[#111111] active:translate-x-0 active:translate-y-0 active:shadow-none active:duration-0",

        // 2. DESTRUCTIVE: (Updated to match 'Restricted' badge style)
        // Static: White Background, Red Border, Red Text
        // Hover: Lifts Up, Fills Red, White Text, Black Shadow
        // Active: Dark Red Background, Flat
        destructive:
          "bg-white border-[#ff3333] text-[#ff3333] shadow-none transition-all duration-200 hover:bg-[#ff3333] hover:text-red hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] active:bg-[#cc0000] active:text-red active:translate-x-0 active:translate-y-0 active:shadow-none active:duration-0",

        // 3. OUTLINE / SECONDARY:
        // Static: White w/ Border
        // Hover: Lifts Up + Ink Bg + Shadow
        // Active: Grey Bg + Flat
        outline:
          "bg-white text-[#111111] shadow-none transition-all duration-200 hover:bg-[#111111] hover:text-white hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] active:bg-[#e2e2e2] active:text-[#111111] active:translate-x-0 active:translate-y-0 active:shadow-none active:duration-0",

        // 4. GHOST:
        // Static: Transparent
        // Hover: Yellow Bg
        // Active: Darker Yellow
        ghost:
          "border-transparent bg-transparent text-[#111111] shadow-none transition-all duration-200 hover:bg-[#ffe800] hover:border-[#111111] active:bg-[#e6d200] active:border-transparent active:duration-0",

        // 5. LINK:
        link: "text-[#111111] underline-offset-4 hover:underline border-none shadow-none bg-transparent hover:bg-transparent px-0 h-auto",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-12 w-12",
        "icon-sm": "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
