"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/Components/ui/shadcn-lib/select";
import { SkeletonComponent } from "@/Components/ui/SkeletonComponent";

type SelectOption = {
  label: string;
  value: string;
};

type SelectGroupType = {
  groupLabel?: string;
  options: SelectOption[];
};

type SelectComponentProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[] | SelectGroupType[];
  className?: string;
  grouped?: boolean;
  loading?: boolean; // 👈 New
};

export function SelectComponent({
  placeholder = "Select an option",
  value,
  onChange,
  options,
  className,
  grouped = false,
  loading = false,
}: SelectComponentProps) {
  if (loading) {
    return (
      <div className={className}>
        <SkeletonComponent height="2.5rem" className="w-full mb-2" />
      </div>
    );
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {grouped
          ? (options as SelectGroupType[]).map((group, idx) => (
              <SelectGroup key={idx}>
                {group.groupLabel && (
                  <SelectLabel>{group.groupLabel}</SelectLabel>
                )}
                {group.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))
          : (options as SelectOption[]).map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
      </SelectContent>
    </Select>
  );
}
