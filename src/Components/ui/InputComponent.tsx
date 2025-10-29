"use client";

import * as React from "react";
import { Input } from "@/Components/ui/shadcn-lib/input";
import { Label } from "@/Components/ui/shadcn-lib/label";
import { SkeletonComponent } from "@/Components/ui/SkeletonComponent"; // 👈 import your custom skeleton
import { cn } from "@/lib/utils";

type FormInputProps = {
  id: string;
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  loading?: boolean; // 👈 new
} & React.InputHTMLAttributes<HTMLInputElement>;

export function InputComponent({
  id,
  label,
  description,
  error,
  className,
  loading = false,
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-1 w-full">
      {/* Label or its Skeleton */}
      {label &&
        (loading ? (
          <SkeletonComponent width="30%" height="1rem" />
        ) : (
          <Label htmlFor={id} className="text-sm font-medium">
            {label}
          </Label>
        ))}

      {/* Input or its Skeleton */}
      {loading ? (
        <SkeletonComponent height="2.5rem" className="w-full" />
      ) : (
        <Input
          id={id}
          className={cn(
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        />
      )}

      {/* Description or Error — only if not loading */}
      {!loading && description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {!loading && error && (
        <p className="text-xs text-destructive font-medium">{error}</p>
      )}
    </div>
  );
}
