"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// --- ICONS (Inline for stability) ---
const Icons = {
  X: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Info: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  ),
  AlertCircle: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  ),
};

type AlertComponentProps = {
  variant?: "default" | "destructive";
  icon?: React.ElementType;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  timeout?: number;
  isClosable?: boolean;
  positionTop?: boolean;
  invert?: boolean; // Kept for API compatibility, though Riso handles contrast differently
  onDismiss?: (event: { reason: "timeout" | "manual" }) => void;
};

export function AlertComponent({
  variant = "default",
  icon: IconProp,
  title,
  description,
  className,
  timeout,
  isClosable = true,
  positionTop = true,
  onDismiss,
}: AlertComponentProps) {
  const [visible, setVisible] = React.useState(true);

  const handleDismiss = React.useCallback(
    (reason: "timeout" | "manual") => {
      setVisible(false);
      onDismiss?.({ reason });
    },
    [onDismiss]
  );

  React.useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => handleDismiss("timeout"), timeout);
      return () => clearTimeout(timer);
    }
  }, [handleDismiss, timeout]);

  // Resolve Icon
  const Icon =
    IconProp || (variant === "destructive" ? Icons.AlertCircle : Icons.Info);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="alert"
          initial={{
            opacity: 0,
            y: -20,
            x: positionTop ? "-50%" : 0,
            rotateX: 90,
          }}
          animate={{
            opacity: 1,
            y: 0,
            x: positionTop ? "-50%" : 0,
            rotateX: 0,
          }}
          exit={{
            opacity: 0,
            y: -20,
            scale: 0.9,
            transition: { duration: 0.2 },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={clsx(
            "z-[100] w-full max-w-md fixed px-4",
            positionTop ? "top-6 left-1/2" : "bottom-6 right-6",
            className
          )}
        >
          <div
            className={clsx(
              // Base Riso Box Styles
              "relative w-full p-4 border-2 border-[var(--riso-ink)] shadow-[6px_6px_0px_var(--riso-ink)]",
              // Variants
              variant === "destructive"
                ? "bg-[var(--riso-red)] text-white"
                : "bg-[var(--riso-paper)] text-[var(--riso-ink)]"
            )}
          >
            {/* Header Section */}
            <div className="flex items-start gap-3">
              <div
                className={clsx(
                  "mt-0.5 flex-shrink-0",
                  variant === "destructive"
                    ? "text-white"
                    : "text-[var(--riso-blue)]"
                )}
              >
                <Icon />
              </div>

              <div className="flex-1 pr-6">
                <h5
                  className={clsx(
                    "mb-1 font-black uppercase tracking-wide text-sm",
                    variant === "destructive"
                      ? "text-white"
                      : "text-[var(--riso-ink)]"
                  )}
                >
                  {title}
                </h5>

                {description && (
                  <div
                    className={clsx(
                      "text-xs font-mono leading-relaxed opacity-90",
                      variant === "destructive"
                        ? "text-white/90"
                        : "text-[var(--riso-ink)]/80"
                    )}
                  >
                    {description}
                  </div>
                )}
              </div>
            </div>

            {/* Close Button */}
            {isClosable && (
              <button
                onClick={() => handleDismiss("manual")}
                className={clsx(
                  "absolute top-2 right-2 p-1 transition-transform hover:scale-110 active:translate-y-0.5",
                  variant === "destructive"
                    ? "text-white hover:text-[var(--riso-yellow)]"
                    : "text-[var(--riso-ink)] hover:text-[var(--riso-red)]"
                )}
                aria-label="Close alert"
              >
                <Icons.X />
              </button>
            )}

            {/* Decorative Corner (Riso Detail) */}
            <div
              className={clsx(
                "absolute bottom-0 right-0 w-3 h-3 border-t-2 border-l-2",
                variant === "destructive"
                  ? "border-white bg-[var(--riso-yellow)]"
                  : "border-[var(--riso-ink)] bg-[var(--riso-blue)]"
              )}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
