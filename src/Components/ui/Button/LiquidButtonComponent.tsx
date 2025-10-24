"use client";

import * as React from "react";
import { LiquidButton } from "../shadcn-io/liquid-button";
import type { ComponentProps, ReactNode } from "react";

type LiquidButtonComponentProps = {
  children: ReactNode;
} & ComponentProps<typeof LiquidButton>;

export function LiquidButtonComponent({
  children,
  variant = "default",
  size = "default",
  disabled = false,
  className,
  ...props
}: LiquidButtonComponentProps) {
  return (
    <LiquidButton
      variant={variant}
      size={size}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </LiquidButton>
  );
}
