"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/Components/ui/shadcn-lib/card";
import { cn } from "@/lib/utils";

type FormCardProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function CardComponent({
  title,
  description,
  actionLabel,
  onActionClick,
  children,
  footer,
  className,
}: FormCardProps) {
  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">
                {description}
              </CardDescription>
            )}
          </div>
          {actionLabel && onActionClick && (
            <CardAction>
              <button
                onClick={onActionClick}
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                {actionLabel}
              </button>
            </CardAction>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">{children}</CardContent>

      {footer && (
        <CardFooter className="flex flex-col gap-2 w-full [&>*]:w-full">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
