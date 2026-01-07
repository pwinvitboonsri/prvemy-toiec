// app/not-found.tsx
"use client";

import { useRouter } from "next/navigation";
import { RippleButtonComponent } from "@/Components/ui/button/RippleButtonComponent";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center justify-center px-6 py-16 bg-background text-foreground">
      <div className="max-w-xl w-full flex flex-col gap-6 items-center text-center">
        <h1 className="text-4xl font-extrabold text-destructive tracking-tight">
          404
        </h1>
        <p className="text-lg text-muted-foreground">
          This page could not be found.
        </p>

        <RippleButtonComponent
          variant="destructive"
          onClick={() => router.push("/")}
        >
          Go Home
        </RippleButtonComponent>
      </div>
    </div>
  );
}
