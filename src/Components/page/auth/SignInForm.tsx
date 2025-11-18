"use client";

import { InputComponent } from "@/Components/ui/InputComponent";
import { Checkbox } from "@/Components/ui/shadcn-lib/checkbox";
import Link from "next/link";
import { useSignInStore } from "@/store/auth/useSignInStore";
import { useFieldError } from "@/hooks/useFieldError"; // ✅ import

export function SignInForm() {
  const { email, password, rememberME, setEmail, setPassword, setRememberMe } =
    useSignInStore();

  const { error: emailError, clear: clearEmailError } = useFieldError("email");
  const { error: passwordError, clear: clearPasswordError } =
    useFieldError("password");

  return (
    <form className="space-y-4 flex flex-col">
      <InputComponent
        id="email"
        type="email"
        label="Email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (emailError) clearEmailError(); // ✅ clear on change
        }}
        error={emailError?.message} // ✅ pass to input
      />

      <InputComponent
        id="password"
        type="password"
        label="Password"
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (passwordError) clearPasswordError(); // ✅ clear on change
        }}
        error={passwordError?.message} // ✅ pass to input
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
