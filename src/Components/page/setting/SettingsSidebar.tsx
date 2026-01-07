"use client";

import { User, Sliders, Shield, LogOut } from "lucide-react";
import { cn } from "@/utils/utils";

type Tab = "profile" | "preferences" | "security";

interface SettingsSidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onLogout?: () => void;
}

export function SettingsSidebar({
  activeTab,
  setActiveTab,
  onLogout,
}: SettingsSidebarProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const NavButton = ({
    tab,
    icon: Icon,
    label,
  }: {
    tab: Tab;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    label: string;
  }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={cn(
        "flex items-center gap-3 p-3 w-full text-left font-bold uppercase border-2 transition-all duration-100",
        activeTab === tab
          ? "bg-foreground text-background border-foreground shadow-[4px_4px_0px_var(--primary)]"
          : "bg-transparent text-foreground border-transparent hover:bg-accent hover:border-foreground hover:shadow-[2px_2px_0px_var(--foreground)] hover:-translate-y-0.5"
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="space-y-2">
      <NavButton tab="profile" icon={User} label="Profile" />
      <NavButton tab="preferences" icon={Sliders} label="Preferences" />
      <NavButton tab="security" icon={Shield} label="Security" />
      <div className="h-8" /> {/* Spacer */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 p-3 w-full text-left font-bold uppercase border-2 border-transparent text-destructive hover:bg-destructive hover:text-white hover:border-foreground transition-all duration-100"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
}
