"use client";

import * as React from "react";
import { Badge } from "@/Components/ui/primitives/badge";
import type { VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";

type BadgeVariant = VariantProps<typeof Badge>["variant"];

type BadgeComponentProps = {
  label: React.ReactNode;
  icon?: LucideIcon;
  variant?: BadgeVariant;
  className?: string;
};

export function BadgeComponent({
  label,
  icon: Icon,
  variant = "default",
  className,
}: BadgeComponentProps) {
  return (
    <Badge variant={variant} className={className}>
      {Icon && <Icon className="mr-1 h-4 w-4" />}
      {label}
    </Badge>
  );
}
