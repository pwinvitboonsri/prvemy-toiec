"use client";

import * as React from "react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/Components/ui/shadcn-lib/alert";
import { XIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

type AlertComponentProps = {
  variant?: "default" | "destructive";
  icon?: LucideIcon;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  timeout?: number;
  isClosable?: boolean;
  positionTop?: boolean;
  invert?: boolean; // NEW: for color invert toggle
};

export function AlertComponent({
  variant = "default",
  icon: Icon,
  title,
  description,
  className,
  timeout,
  isClosable = false,
  positionTop = false,
  invert = true,
}: AlertComponentProps) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => setVisible(false), timeout);
      return () => clearTimeout(timer);
    }
  }, [timeout]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="alert"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={clsx(
            "z-50 w-full max-w-md px-4",
            positionTop && "fixed top-6 left-1/2 -translate-x-1/2",
            className
          )}
        >
          <Alert
            variant={variant}
            className={clsx(
              "relative shadow-lg pr-10 border",
              invert && [
                "bg-white text-black border-neutral-300",
                "dark:bg-neutral-900 dark:text-white dark:border-neutral-700",
              ]
            )}
          >
            {Icon && <Icon className="h-5 w-5" />}
            <AlertTitle>{title}</AlertTitle>
            {description && <AlertDescription>{description}</AlertDescription>}
            {isClosable && (
              <button
                onClick={() => setVisible(false)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition"
                aria-label="Close alert"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
