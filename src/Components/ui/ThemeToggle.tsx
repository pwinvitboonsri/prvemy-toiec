"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  ThemeToggleButton,
  useThemeTransition,
} from "@/Components/ui/shadcn-io/theme-toggle-button";

const ThemeToggleButtonPolygon = () => {
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
    <div className="flex items-center justify-center p-8">
      <ThemeToggleButton
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onClick={handleThemeToggle}
        variant="polygon"
      />
    </div>
  );
};

export default ThemeToggleButtonPolygon;
