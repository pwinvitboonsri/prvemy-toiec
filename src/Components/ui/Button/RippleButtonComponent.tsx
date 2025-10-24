"use client";

import * as React from "react";
import { RippleButton } from "@/Components/ui/shadcn-io/ripple-button";
import type { ComponentProps } from "react";

type RippleButtonComponentProps = ComponentProps<typeof RippleButton>;

export function RippleButtonComponent({
  children,
  variant = "default",
  size = "default",
  disabled = false,
  className,
  rippleClassName,
  transition,
  scale,
  onClick,
  ...props
}: RippleButtonComponentProps) {
  return (
    <RippleButton
      variant={variant}
      size={size}
      disabled={disabled}
      className={className}
      rippleClassName={rippleClassName}
      transition={transition}
      scale={scale}
      onClick={onClick}
      {...props}
    >
      {children}
    </RippleButton>
  );
}
