"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type LayoutTag = "section" | "div" | "article" | "main" | "aside";

type SectionProps<T extends LayoutTag = "section"> = {
  as?: T;
  padded?: boolean;
  id?: string;
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export function Section<T extends LayoutTag = "section">({
  as,
  padded = true,
  id,
  className,
  children,
  ...props
}: SectionProps<T>) {
  const Element = as ?? "section";

  return (
    <Element
      id={id}
      className={cn(padded && "py-8 sm:py-12 lg:py-16", className)}
      {...props}
    >
      {children}
    </Element>
  );
}
