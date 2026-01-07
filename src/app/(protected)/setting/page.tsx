"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

// Components (These must exist in your project from the previous steps)
import { SettingsSidebar } from "@/Components/page/setting/SettingsSidebar";
import { ProfileTab } from "@/Components/page/setting/ProfileTab";
import { PreferencesTab } from "@/Components/page/setting/PreferencesTab";
import { SecurityTab } from "@/Components/page/setting/SecurityTab";

type Tab = "profile" | "preferences" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main className="max-w-5xl mx-auto relative z-10 mt-12 px-4 pb-24 font-sans text-foreground">
      {/* Page Header */}
      <div className="mb-8 flex items-end gap-4 border-b-2 border-foreground pb-4">
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          Settings
        </h1>
        <span className="font-mono text-sm mb-2 opacity-60">
          / USER_PREFERENCES_V1.0
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar (3 Cols) */}
        <div className="md:col-span-3">
          <SettingsSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
          />
        </div>

        {/* Right Content Area (9 Cols) */}
        <div className="md:col-span-9">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "preferences" && <PreferencesTab />}
          {activeTab === "security" && <SecurityTab />}
        </div>
      </div>
    </main>
  );
}
