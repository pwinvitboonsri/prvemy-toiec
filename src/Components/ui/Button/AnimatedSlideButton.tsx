"use client";

import React from "react";
import { cn } from "@/lib/utils";

type AnimatedSlideButtonProps = {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function AnimatedSlideButton({
  label = "Click Me",
  icon = "🚀",
  className,
  onClick,
}: AnimatedSlideButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-6 py-6 rounded-md flex items-center justify-center group overflow-hidden transition-all duration-300",
        "bg-black text-white dark:bg-white dark:text-black",
        className
      )}
    >
      {/* Label slides out */}
      <span className="group-hover:translate-x-40 transition duration-500 z-10">
        {label}
      </span>

      {/* Icon slides in */}
      <div className="absolute inset-0 -translate-x-40 group-hover:translate-x-0 flex items-center justify-center transition duration-500 z-20 text-white dark:text-black">
        {icon}
      </div>
    </button>
  );
}
