import { AuthFormLayout } from "@/Components/page/auth/AuthFormLayout";
import { SignInForm } from "@/Components/page/auth/SignInForm";
import { RippleButtonComponent } from "@/Components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { SiLine } from "react-icons/si";

export default function LoginPage() {
  return (
    <AuthFormLayout
      title="Sign In"
      bottomText="Don't have an account?"
      bottomLinkText="Create one →"
      bottomLinkHref="/auth/register"
      footer={
        <>
          <div className="space-y-2">
            <RippleButtonComponent className="w-full">
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
        </>
      }
    >
      <SignInForm />
    </AuthFormLayout>
  );
}
