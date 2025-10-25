"use client";

import * as React from "react";
import { Input } from "@/Components/ui/shadcn-lib/input";
import { Label } from "@/Components/ui/shadcn-lib/label";
import { cn } from "@/lib/utils";

type FormInputProps = {
  id: string;
  label?: string;
  description?: string;
  error?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function InputComponent({
    id,
    label,
    description,
    error,
    className,
    ...props
  }: FormInputProps) {
    return (
      <div className="space-y-1 w-full">
        {label && (
          <Label htmlFor={id} className="text-sm font-medium">
            {label}
          </Label>
        )}
  
        <Input
          id={id}
          className={cn(
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        />
  
        {description && !error && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
  
        {error && (
          <p className="text-xs text-destructive font-medium">{error}</p>
        )}
      </div>
    );
  }