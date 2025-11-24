import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// --- RISO BUTTON VARIANTS ---
// This replaces the standard Shadcn styles with your Brutalist/Retro logic.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 border-2 border-foreground",
  {
    variants: {
      variant: {
        // Primary: Red Background, Hard Ink Shadow
        default:
          "bg-destructive text-destructive-foreground shadow-[4px_4px_0px_var(--foreground)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-foreground",

        // Secondary: Paper Background, Blue Text, Blue Shadow
        secondary:
          "bg-background text-primary hover:bg-primary hover:text-primary-foreground shadow-[4px_4px_0px_var(--primary)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]",

        // Outline: Transparent, Dynamic Colored Shadows on Hover
        outline:
          "bg-transparent text-foreground shadow-[2px_2px_0px_var(--primary)] hover:shadow-[2px_2px_0px_var(--destructive)] hover:-translate-y-[1px] hover:-translate-x-[1px]",

        // Ghost: Minimal, Yellow Highlight on Hover
        ghost:
          "border-transparent shadow-none hover:bg-accent hover:border-foreground hover:text-accent-foreground",

        // Link: Underlined, Mono Font
        link: "border-none shadow-none text-foreground underline decoration-2 underline-offset-4 hover:text-destructive font-mono normal-case px-0 h-auto",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-12 w-12", // Square for icons
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
