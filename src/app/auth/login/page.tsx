"use client";

import { useState } from "react";
import { AuthFormLayout } from "@/Components/page/auth/AuthFormLayout";
import { SignInForm } from "@/Components/page/auth/SignInForm";
import { useSignInStore } from "@/store/auth/useSignInStore";
import { useErrorStore } from "@/store/error/useErrorStore";
import { signInWithEmail } from "@/lib/auth/actions";
import { useSessionStore } from "@/lib/store/auth/useSessionStore";
import { RippleButtonComponent } from "@/Components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { SiLine } from "react-icons/si";
import { validateLoginInput } from "./utils/signinValidation";
import { actionSession } from "@/lib/session/actionSession";
import { useSessionStore } from "@/store/session/useSessionStore";
import { useRedirect } from "@/lib/utils/redirect";

export default function LoginPage() {
  const { email, password, rememberME } = useSignInStore();
  const addError = useErrorStore((state) => state.addError);
  const clearErrors = useErrorStore((state) => state.clearErrors);
  const redirect = useRedirect();

  const [isLoading, setLoading] = useState(false);

  const handleSignIn = async () => {
    clearErrors();

    const validation = validateLoginInput(email, password);

    if (!validation.valid) {
      addError({
        id: crypto.randomUUID(),
        source: "form",
        title: validation.errorTitle ?? "Invalid credentials",
        message:
          validation.errorMessage ??
          "Please double-check your email and password.",
        field: validation.field, // ✅ important
        location: "LoginPage",
        timestamp: Date.now(),
        autoDismiss: false,
      });
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await signInWithEmail(email, password);

      if (error) {
        addError({
          id: crypto.randomUUID(),
          source: "auth",
          title: "Login failed",
          message: error.message,
          field: "form",
          location: "LoginPage",
          timestamp: Date.now(),
          autoDismiss: true,
        });
        return;
      }

      if (data.session) {
        actionSession({
          data,
          rememberMe: rememberME,
          setSession: useSessionStore.getState().setSession,
          redirect,
        });
      }
    } catch (err: any) {
      addError({
        id: crypto.randomUUID(),
        source: "auth",
        title: "Unexpected error",
        message: err?.message || "Something went wrong. Try again.",
        location: "LoginPage",
        timestamp: Date.now(),
        autoDismiss: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormLayout
      title="Sign In"
      bottomText="Don't have an account?"
      bottomLinkText="Create one →"
      bottomLinkHref="/auth/register"
      footer={
        <div className="space-y-2">
          <RippleButtonComponent
            className="w-full"
            onClick={handleSignIn}
            disabled={isLoading}
          >
            Sign In
          </RippleButtonComponent>

          <div className="relative text-center my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative z-10 text-xs uppercase text-muted-foreground bg-background px-2">
              Or continue with
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <RippleButtonComponent>
              <FcGoogle className="h-4 w-4 mr-2" />
              Google
            </RippleButtonComponent>
            <RippleButtonComponent>
              <FaFacebook className="h-4 w-4 mr-2 text-[#1877F2]" />
              Facebook
            </RippleButtonComponent>
            <RippleButtonComponent>
              <SiLine className="h-4 w-4 mr-2 text-[#00C300]" />
              Line
            </RippleButtonComponent>
          </div>
        </div>
      }
    >
      <SignInForm />
    </AuthFormLayout>
  );
}
