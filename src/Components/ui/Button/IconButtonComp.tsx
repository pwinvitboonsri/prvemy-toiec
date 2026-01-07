"use client";

import * as React from "react";
import type { Transition } from "framer-motion";
import { IconButton } from "@/Components/ui/effects/icon-button";

type IconButtonComponentProps = {
  icon: React.ElementType;
  defaultActive?: boolean;
  animate?: boolean;
  size?: "sm" | "default" | "md" | "lg";
  color?: [number, number, number]; // RGB
  transition?: Transition;
  className?: string;
  onChange?: (active: boolean) => void;
};

export function IconButtonComponent({
  icon,
  defaultActive = false,
  animate = true,
  size = "default",
  color = [59, 130, 246],
  transition = { type: "spring", stiffness: 300, damping: 15 },
  className,
  onChange,
}: IconButtonComponentProps) {
  const [active, setActive] = React.useState(defaultActive);

  const handleClick = () => {
    const next = !active;
    setActive(next);
    onChange?.(next);
  };

  return (
    <IconButton
      icon={icon}
      active={active}
      animate={animate}
      size={size}
      color={color}
      transition={transition}
      className={className}
      onClick={handleClick}
    />
  );
}
