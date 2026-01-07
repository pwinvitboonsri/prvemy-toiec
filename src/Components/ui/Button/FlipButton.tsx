"use client";

import * as React from "react";
import { FlipButton } from "@/Components/ui/effects/flip-button";

type FlipButtonComponentProps = {
  frontText?: string;
  backText?: string;
  from?: "top" | "bottom" | "left" | "right";
  onClick?: () => void;
  className?: string;
};

export function FlipButtonComponent({
  frontText = "Get Started",
  backText = "Let's Go! 🚀",
  from = "top",
  onClick,
  className,
}: FlipButtonComponentProps) {
  return (
    <div className="flex items-center justify-center">
      <FlipButton
        frontText={frontText}
        backText={backText}
        from={from}
        className={className}
        onClick={onClick}
      />
    </div>
  );
}
