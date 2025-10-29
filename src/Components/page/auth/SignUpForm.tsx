"use client";

import { useState } from "react";
import { InputComponent } from "@/Components/ui/InputComponent";

export function SignUpForm() {
  const [loading, setLoading] = useState(false);

  return (
    <form className="space-y-4">
      <InputComponent id="name" label="Full Name" required />
      <InputComponent id="email" type="email" label="Email" required />
      <InputComponent id="password" type="password" label="Password" required />
      <InputComponent
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        required
      />
    </form>
  );
}
