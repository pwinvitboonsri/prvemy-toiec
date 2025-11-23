import { AuthFormLayout } from "@/Components/page/auth/AuthFormLayout";
import { SignUpForm } from "@/Components/page/auth/SignUpForm";
import { RippleButtonComponent } from "@/Components/ui/Button";

export default function RegisterPage() {
  return (
    <AuthFormLayout
      title="Create Account"
      bottomText="Already have an account?"
      bottomLinkHref="/login"
      bottomLinkText="Sign in →"
      footer={
        <RippleButtonComponent className="w-full">
          Register
        </RippleButtonComponent>
      }
    >
      <SignUpForm />
    </AuthFormLayout>
  );
}
