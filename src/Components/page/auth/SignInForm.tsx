"use client";

import Image from "next/image";
import Link from "next/link";
import RightPhoto from "@/assets/photo/0f7901bdde99e71fb762f31ebcbead3c.jpg";

export function SignInForm({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full font-sans text-slate-900 antialiased">
      {/* LEFT SIDE: The Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo Header */}
          <div className="text-center">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tighter uppercase">
                PRVEMY<span className="text-red-600">-TOEIC</span>
              </span>
            </Link>
          </div>

          {/* The Actual Form (Children) goes here */}
          {children}
        </div>
      </div>

      {/* RIGHT SIDE: The Image (Hidden on mobile) */}
      <div className="hidden lg:block w-1/2 relative bg-black">
        <Image
          src={RightPhoto}
          alt="Background"
          fill
          priority
          className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-10 left-10 text-white p-4">
          <p className="text-xl font-bold">Master your goals.</p>
        </div>
      </div>
    </div>
  );
}
