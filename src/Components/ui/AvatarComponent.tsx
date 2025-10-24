"use client";

import * as React from "react";
import {
  Avatar as BaseAvatar,
  AvatarImage,
  AvatarFallback,
} from "@/Components/ui/shadcn-lib/avatar";
import type { ComponentProps } from "react";

export type AvatarComponentProps = {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
} & ComponentProps<typeof BaseAvatar>;

export function AvatarComponent({
  src,
  alt = "Avatar",
  fallback = "?",
  className,
  imageClassName,
  fallbackClassName,
  ...props
}: AvatarComponentProps) {
  return (
    <BaseAvatar className={className} {...props}>
      <AvatarImage src={src} alt={alt} className={imageClassName} />
      <AvatarFallback className={fallbackClassName}>{fallback}</AvatarFallback>
    </BaseAvatar>
  );
}
