"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  ThemeToggleButton,
  useThemeTransition,
} from "@/Components/ui/effects/theme-toggle-button";

type Props = {
  className?: string;
};

export const ThemeToggleButtonComponent = ({ className }: Props) => {
  const { setTheme, resolvedTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = useCallback(() => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    startTransition(() => {
      setTheme(newTheme);
    });
  }, [resolvedTheme, setTheme, startTransition]);

  if (!mounted) return null;

  return (
    <ThemeToggleButton
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onClick={handleThemeToggle}
      variant="polygon"
      className={className}
    />
  );
};
