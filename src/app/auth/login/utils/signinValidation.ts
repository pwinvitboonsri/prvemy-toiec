// src/app/auth/login/utils/signinValidation.ts

export type ValidationResult = {
  valid: boolean;
  errorTitle?: string;
  errorMessage?: string;
  field?: string; // ✅ new
};

export function validateLoginInput(
  email: string,
  password: string
): ValidationResult {
  if (!email && !password) {
    return {
      valid: false,
      errorTitle: "Missing Information",
      errorMessage: "Please enter your email and password.",
      field: "form",
    };
  }

  if (!email) {
    return {
      valid: false,
      errorTitle: "Missing Email",
      errorMessage: "Please enter your email address.",
      field: "email",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      valid: false,
      errorTitle: "Invalid Email",
      errorMessage: "Please enter a valid email address.",
      field: "email",
    };
  }

  if (!password) {
    return {
      valid: false,
      errorTitle: "Missing Password",
      errorMessage: "Please enter your password.",
      field: "password",
    };
  }

  return { valid: true };
}
