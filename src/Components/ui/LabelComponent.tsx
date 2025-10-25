"use client";

import * as React from "react";
import { Label } from "@/Components/ui/shadcn-lib/label";
import { cn } from "@/lib/utils";

export type LabelComponentProps = React.ComponentPropsWithoutRef<typeof Label>;

export function LabelComponent({ className, ...props }: LabelComponentProps) {
  return <Label className={cn(className)} {...props} />;
}
