"use client";

import { InputComponent } from "@/Components/ui/InputComponent";
import { Checkbox } from "@/Components/ui/shadcn-lib/checkbox";
import Link from "next/link";

export function SignInForm() {
  return (
    <form className="space-y-4 flex flex-col">
      <InputComponent id="email" type="email" label="Email" required />
      <InputComponent id="password" type="password" label="Password" required />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
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
