"use client";

import * as React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/shadcn-lib/card";
import { cn } from "@/lib/utils";

export type CardProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
};

export function CardComponent({
  title,
  description,
  actions,
  content,
  footer,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
}: CardProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)}>
      {(title || description || actions) && (
        <CardHeader className={headerClassName}>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {actions && <CardAction>{actions}</CardAction>}
        </CardHeader>
      )}

      {content && (
        <CardContent className={contentClassName}>{content}</CardContent>
      )}

      {footer && <CardFooter className={footerClassName}>{footer}</CardFooter>}
    </Card>
  );
}
