import { createClient } from "@/utils/supabase/server";
import { WelcomeHeader } from "@/Components/page/home/WelcomeHeader";
import {
  GoalTracker,
  RecWidget,
  ToolsLibrary,
} from "@/Components/page/home/LearningWidgets";
import {
  MotivationWidget,
  CampaignWidget,
  CommunityFeed,
} from "@/Components/page/home/CommunityWidgets";

export default async function Home() {
  const supabase = await createClient();

  // 1. Fetch User Server-Side
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="max-w-7xl mx-auto relative z-10 mt-12 px-4 pb-24 font-sans text-foreground">
      {/* MAIN GRID CONTAINER
          - We use a single grid for EVERYTHING to enforce strict row alignment.
          - gap-6 matches your Riso spacing.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* --- ROW 1: WELCOME HEADER (Full Width) --- */}
        <div className="lg:col-span-12">
          <WelcomeHeader user={user} />
        </div>

        {/* --- ROW 2: TARGET & STREAK --- */}
        {/* Left: Goal/Target (8 Cols) */}
        <div className="lg:col-span-8 h-full">
          <GoalTracker user={user} />
        </div>

        {/* Right: Streak/Motivation (4 Cols) */}
        <div className="lg:col-span-4 h-full">
          <MotivationWidget />
        </div>

        {/* --- ROW 3: SUGGEST ENGINE & UNLOCK --- */}
        {/* Left: Recommendation (8 Cols) */}
        <div className="lg:col-span-8 h-full">
          <RecWidget user={user} />
        </div>

        {/* Right: Campaign/Unlock (4 Cols) */}
        <div className="lg:col-span-4 h-full">
          <CampaignWidget />
        </div>

        {/* --- ROW 4: TOOLS & FEED --- */}
        {/* Left: Tools Library (8 Cols) */}
        <div className="lg:col-span-8 h-full">
          <ToolsLibrary />
        </div>

        {/* Right: Activity Feed (4 Cols) */}
        <div className="lg:col-span-4 h-full">
          <CommunityFeed />
        </div>
      </div>
    </main>
  );
}
