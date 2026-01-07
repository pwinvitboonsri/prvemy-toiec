"use client";

import * as React from "react";
import type { ComponentProps } from "react";
import { RippleButton } from "@/Components/ui/effects/ripple-button";
import { Spinner } from "../spinner";

type RippleButtonComponentProps = ComponentProps<typeof RippleButton> & {
  loading?: boolean;
};

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
      {disabled && <Spinner />}
      {children}
    </RippleButton>
  );
}
