"use client";

import * as React from "react";

import { AlertComponent } from "@/Components/ui/AlertComponent";
import { useErrorStore } from "@/store/error/useErrorStore";
import type { ErrorSource } from "@/types/error";

const AUTO_DISMISS_MS = 5000;
const EXIT_BUFFER_MS = 300;

type TimerId = ReturnType<typeof setTimeout> | undefined;

const variantBySource: Record<ErrorSource, "default" | "destructive"> = {
  client: "default",
  server: "destructive",
  supabase: "destructive",
  auth: "destructive",
  form: "default",
  network: "destructive",
  unexpected: "destructive",
};

export function GlobalErrorAlerts() {
  const errors = useErrorStore((state) => state.errors);
  const removeError = useErrorStore((state) => state.removeError);

  const scheduleRemoval = React.useCallback(
    (id: string, delay = EXIT_BUFFER_MS): TimerId => {
      if (typeof window === "undefined") {
        removeError(id);
        return undefined;
      }

      return window.setTimeout(() => {
        removeError(id);
      }, delay);
    },
    [removeError]
  );

  const autoDismissTimersRef = React.useRef<Record<string, TimerId>>({});

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    errors.forEach((error) => {
      if (error.autoDismiss && !autoDismissTimersRef.current[error.id]) {
        const timer = scheduleRemoval(
          error.id,
          AUTO_DISMISS_MS + EXIT_BUFFER_MS
        );

        autoDismissTimersRef.current[error.id] = timer;
      }
    });

    const activeIds = new Set(errors.map((error) => error.id));

    Object.entries(autoDismissTimersRef.current).forEach(([id, timer]) => {
      if (!activeIds.has(id)) {
        if (typeof window !== "undefined" && typeof timer === "number") {
          window.clearTimeout(timer);
        }
        delete autoDismissTimersRef.current[id];
      }
    });
  }, [errors, removeError, scheduleRemoval]);

  React.useEffect(() => {
    return () => {
      if (typeof window === "undefined") {
        autoDismissTimersRef.current = {};
        return;
      }

      Object.values(autoDismissTimersRef.current).forEach((timer) => {
        if (typeof timer === "number") {
          window.clearTimeout(timer);
        }
      });
      autoDismissTimersRef.current = {};
    };
  }, []);

  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed top-0 right-0 z-[1000] flex flex-col items-end gap-3 p-4">
      <div className="flex w-full max-w-sm flex-col items-stretch gap-3">
        {errors.map((error) => (
          <AlertComponent
            key={error.id}
            variant={variantBySource[error.source] ?? "default"}
            title={error.title}
            description={error.message}
            className="pointer-events-auto"
            isClosable
            timeout={error.autoDismiss ? AUTO_DISMISS_MS : undefined}
            onDismiss={({ reason }) => {
              if (reason === "manual") {
                scheduleRemoval(error.id);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
