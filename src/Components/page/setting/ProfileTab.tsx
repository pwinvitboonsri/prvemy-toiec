"use client";

import { Camera, Lock } from "lucide-react";
import { InputComponent } from "@/Components/ui/InputComponent";
import { Button } from "@/Components/ui/Button";

export function ProfileTab() {
  return (
    <section className="bg-card border-2 border-foreground p-6 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Decor: ID Card Label */}
      <div className="absolute -top-3 left-4 bg-primary text-primary-foreground px-3 py-1 text-[10px] font-bold border-2 border-foreground uppercase shadow-[2px_2px_0px_var(--foreground)]">
        Identity Card
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-32 h-32 border-2 border-foreground p-1 bg-background shadow-[4px_4px_0px_rgba(0,0,0,0.1)] group cursor-pointer">
            <div className="w-full h-full bg-accent/20 border border-foreground flex items-center justify-center overflow-hidden">
              {/* Placeholder for Avatar Image */}
              <span className="font-black text-4xl text-foreground/20">JD</span>
            </div>
            <div className="absolute inset-0 bg-foreground/80 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity font-bold text-xs uppercase gap-1">
              <Camera className="w-4 h-4" /> Upload
            </div>
          </div>
          <span className="font-mono text-[10px] opacity-60 uppercase">
            Max 2MB (JPG/PNG)
          </span>
        </div>

        {/* Fields Section */}
        <div className="flex-1 space-y-6">
          <InputComponent
            id="display-name"
            label="Display Name"
            placeholder="John Doe"
            defaultValue="John Doe"
          />

          <div className="relative">
            <InputComponent
              id="email"
              label="Email Address"
              defaultValue="john.doe@example.com"
              disabled
              className="bg-muted text-muted-foreground cursor-not-allowed"
            />
            <Lock className="absolute right-3 top-9 w-4 h-4 text-foreground/40" />
            <p className="font-mono text-[10px] mt-1 text-primary">
              *Contact support to change email
            </p>
          </div>

          <div className="pt-2">
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
