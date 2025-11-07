"use client";

import { InputComponent } from "@/Components/ui/InputComponent";
import { Checkbox } from "@/Components/ui/shadcn-lib/checkbox";
import Link from "next/link";
import { useSignInStore } from "@/lib/store/useSignInStore";

export function SignInForm() {
  const {
    email,
    password,
    rememberME,
    error,
    setEmail,
    setPassword,
    setRememberMe,
  } = useSignInStore();
  console.log("🚀 ~ SignInForm ~ error:", error);

  return (
    <form className="space-y-4 flex flex-col">
      <InputComponent
        id="email"
        type="email"
        label="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputComponent
        id="password"
        type="password"
        label="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={rememberME}
            onCheckedChange={(e: boolean) => setRememberMe(e)}
          />
          <label htmlFor="remember" className="text-sm">
            Remember me
          </label>
        </div>
        <Link href="#" className="text-sm text-primary hover:underline">
          Forgot Password?
        </Link>
      </div>
    </form>
  );
}
