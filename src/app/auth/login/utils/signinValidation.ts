type ValidationResult = {
  valid: boolean;
  errorTitle?: string;
  errorMessage?: string;
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
    };
  }

  if (!email) {
    return {
      valid: false,
      errorTitle: "Missing Email",
      errorMessage: "Please enter your email address.",
    };
  }

  // ✅ Email format check (simple regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      valid: false,
      errorTitle: "Invalid Email",
      errorMessage: "Please enter a valid email address.",
    };
  }

  if (!password) {
    return {
      valid: false,
      errorTitle: "Missing Password",
      errorMessage: "Please enter your password.",
    };
  }

  return { valid: true };
}
