"use client";

import { InputComponent } from "@/Components/ui/InputComponent";
import { Button } from "@/Components/ui/button/Button";

export function SecurityTab() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Password Section */}
      <section className="bg-card border-2 border-foreground p-6 relative">
        <div className="absolute -top-3 left-4 bg-foreground text-background px-3 py-1 text-[10px] font-bold border-2 border-foreground uppercase shadow-[2px_2px_0px_var(--accent)]">
          Security Clearance
        </div>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputComponent
              id="new-password"
              type="password"
              label="New Password"
              placeholder="••••••••"
            />
            <InputComponent
              id="confirm-password"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              className="bg-background hover:bg-foreground hover:text-background"
            >
              Update Password
            </Button>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="border-2 border-destructive p-6 bg-destructive/5 border-dashed">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-black text-destructive uppercase text-lg">
              Danger Zone
            </h3>
            <p className="font-mono text-xs opacity-60 mt-1">
              THIS_ACTION_CANNOT_BE_UNDONE
            </p>
          </div>
          <Button className="bg-background text-destructive border-destructive hover:bg-destructive hover:text-white shadow-[4px_4px_0px_var(--foreground)] hover:shadow-none">
            Delete Account
          </Button>
        </div>
      </section>
    </div>
  );
}
