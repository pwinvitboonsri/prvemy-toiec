"use client";

import { useState } from "react";
import { SwitchComponent } from "@/Components/ui/SwitchComponent";

export function PreferencesTab() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <section className="bg-card border-2 border-foreground p-6 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="absolute -top-3 left-4 bg-accent text-accent-foreground px-3 py-1 text-[10px] font-bold border-2 border-foreground uppercase shadow-[2px_2px_0px_var(--foreground)]">
        System Controls
      </div>

      <div className="mt-6 space-y-6">
        {/* Theme Toggle */}
        <label className="flex items-center justify-between border-b-2 border-dashed border-foreground/20 pb-6 cursor-pointer group">
          <div>
            <h3 className="font-bold text-sm uppercase group-hover:text-primary transition-colors">
              Dark Mode
            </h3>
            <p className="font-mono text-xs opacity-60 mt-1">
              INVERT_COLORS_FOR_NIGHT_OPS
            </p>
          </div>
          <SwitchComponent checked={darkMode} onCheckedChange={setDarkMode} />
        </label>

        {/* Notifications Toggle */}
        <label className="flex items-center justify-between border-b-2 border-dashed border-foreground/20 pb-6 cursor-pointer group">
          <div>
            <h3 className="font-bold text-sm uppercase group-hover:text-primary transition-colors">
              Email Notifications
            </h3>
            <p className="font-mono text-xs opacity-60 mt-1">
              WEEKLY_PROGRESS_REPORTS
            </p>
          </div>
          <SwitchComponent
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </label>

        {/* Language Select (Custom Riso Style) */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h3 className="font-bold text-sm uppercase">Language</h3>
            <p className="font-mono text-xs opacity-60 mt-1">INTERFACE_TEXT</p>
          </div>
          <select className="bg-background border-2 border-foreground px-4 py-2 font-bold text-sm cursor-pointer shadow-[2px_2px_0px_var(--foreground)] outline-none hover:bg-accent transition-colors">
            <option>English (US)</option>
            <option>Thai (TH)</option>
            <option>Japanese (JP)</option>
          </select>
        </div>
      </div>
    </section>
  );
}
