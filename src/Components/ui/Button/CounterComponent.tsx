"use client";

import * as React from "react";
import { Counter } from "@/Components/ui/shadcn-io/counter";

type CounterComponentProps = {
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
};

export function CounterComponent({
  defaultValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onChange,
  className,
}: CounterComponentProps) {
  const [number, setNumber] = React.useState(defaultValue);

  const handleSetNumber = (next: number) => {
    const clamped = Math.min(Math.max(next, min), max);
    setNumber(clamped);
    onChange?.(clamped);
  };

  return (
    <Counter
      number={number}
      setNumber={(next) =>
        handleSetNumber(number + step * Math.sign(next - number))
      }
      className={className}
    />
  );
}
