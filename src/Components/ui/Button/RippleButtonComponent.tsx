"use client";

import * as React from "react";
import type { ComponentProps } from "react";
import { RippleButton } from "@/Components/ui/shadcn-io/ripple-button";
import { SkeletonComponent } from "@/Components/ui/SkeletonComponent";

type RippleButtonComponentProps = ComponentProps<typeof RippleButton> & {
  loading?: boolean;
};

export function RippleButtonComponent({
  children,
  loading = false,
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
  if (loading) {
    return (
      <SkeletonComponent
        height="2.5rem"
        width="100%"
        className="inline-block"
        rounded
      />
    );
  }

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
