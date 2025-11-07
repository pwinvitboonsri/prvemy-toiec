"use client";

import { useState } from "react";
import { AuthFormLayout } from "@/Components/page/auth/AuthFormLayout";
import { SignInForm } from "@/Components/page/auth/SignInForm";
import { useSignInStore } from "@/lib/store/useSignInStore";
import { signInWithEmail } from "@/lib/auth/actions";
import { RippleButtonComponent } from "@/Components/ui/Button";
import { AlertComponent } from "@/Components/ui/AlertComponent";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { SiLine } from "react-icons/si";
import { AlertCircle } from "lucide-react";
import { validateLoginInput } from "./utils/signinValidation";

export default function LoginPage() {
  const { email, password, error, setError } = useSignInStore();

  const [isLoading, setLoading] = useState(false);

  const handleSignIn = async () => {
    const validation = validateLoginInput(email, password);

    if (!validation.valid) {
      setError({
        title: validation.errorTitle!,
        message: validation.errorMessage!,
      });
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const { data, error } = await signInWithEmail(email, password);

      if (error) {
        setError({
          title: "Login failed",
          message: error.message,
        });
        return;
      }

      // ✅ success: navigate, toast, etc.
      console.log("Login success", data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError({
        title: "Unexpected error",
        message: err?.message || "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <AlertComponent
          icon={AlertCircle}
          variant="destructive"
          key={error.title + error.message}
          title={error.title}
          description={error.message}
          isClosable
          positionTop
          timeout={5000}
        />
      )}

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
    </>
  );
}
