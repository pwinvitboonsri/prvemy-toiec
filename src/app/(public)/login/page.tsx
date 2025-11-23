"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useErrorStore } from "@/store/error/useErrorStore";
import { signInWithEmail } from "@/lib/auth/actions";

// UI Components
// import { AuthLayout } from "@/Components/layout/AuthLayout";
import { SignInForm } from "@/Components/page/auth/SignInForm";
import { InputComponent } from "@/Components/ui/InputComponent";
import { RippleButtonComponent } from "@/Components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { SiLine } from "react-icons/si";

export default function LoginPage() {
  // 1. Logic Hook: Handles the server action state automatically
  const [state, action, isPending] = useActionState(signInWithEmail, undefined);
  const addError = useErrorStore((s) => s.addError);

  // 2. Error Handling: Watches for errors returned by the server
  useEffect(() => {
    if (state?.error) {
      addError({
        id: crypto.randomUUID(),
        source: "auth",
        title: "Login Failed",
        message: state.error,
        field: "form",
        location: "LoginPage",
        timestamp: Date.now(),
        autoDismiss: true,
      });
    }
  }, [state?.error, addError]);

  return (
    <SignInForm>
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>

      {/* FORM: Directly visible here. No hidden components. */}
      <form action={action} className="space-y-4 mt-8">
        <InputComponent
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          label="Email"
          required
          disabled={isPending}
        />

        <div className="space-y-1">
          <InputComponent
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            label="Password"
            required
            disabled={isPending}
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <RippleButtonComponent
          className="w-full font-bold uppercase tracking-wide"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Signing In..." : "Sign In"}
        </RippleButtonComponent>
      </form>

      {/* DIVIDER */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {/* SOCIALS (Placeholders) */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          className="flex items-center justify-center h-10 border rounded-md hover:bg-muted transition"
        >
          <FcGoogle className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center h-10 border rounded-md hover:bg-muted transition"
        >
          <FaFacebook className="h-5 w-5 text-[#1877F2]" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center h-10 border rounded-md hover:bg-muted transition"
        >
          <SiLine className="h-5 w-5 text-[#00C300]" />
        </button>
      </div>

      {/* FOOTER */}
      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </SignInForm>
  );
}
