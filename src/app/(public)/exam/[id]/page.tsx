import { createClient } from "@/lib/supabase/server";
import { getExamContent } from "@/services/exam/getExamContent";
import { ExamSessionWrapper } from "@/Components/page/exam/ExamSessionWrapper";
import { notFound, redirect } from "next/navigation";
import { getUserWithProfile } from "@/lib/auth/getUserProfile";

type CustomUser = {
  id: string;
  email?: string;
  subscription_tier?: string;
  subscription_status?: string;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ExamPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const manifest = await getExamContent(id);

  if (!manifest) {
    return notFound();
  }

  const rawUser = await getUserWithProfile();
  const user = rawUser as unknown as CustomUser | null;

  const initialAnswers = {};
  let sessionId: string | null = null;
  let userTier = "guest"; // Default

  // Settings to pass down
  let lobbySettings: any = undefined;

  if (user) {
    userTier = user.subscription_tier || "free"; // Get tier

    const { data: session } = await supabase
      .from("exam_sessions")
      .select("id, settings")
      .eq("book_id", id)
      .eq("user_id", user.id)
      .eq("status", "in_progress")
      .order("started_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (session) {
      console.log("🔄 Resuming Session:", session.id);
      sessionId = session.id;

      // --- APPLY SETTINGS TO MANIFEST ---
      // If we have custom settings, we might need to filter the manifest parts
      const settings = session.settings as any; // Cast as LobbySettings
      lobbySettings = settings;

      if (settings?.parts_enabled) {
        const partsToInclude = new Set(settings.parts_enabled);

        // Create Map of Part UUID -> Part Number (1-7)
        const partIdToNumber = new Map<string, number>();
        manifest.parts.forEach((p: any) => {
          partIdToNumber.set(p.id, p.part_number);
        });

        // Filter manifest parts
        manifest.parts = manifest.parts.filter((p: any) => partsToInclude.has(p.part_number));

        // Filter flatQuestions using the Map
        manifest.flatQuestions = manifest.flatQuestions.filter((q: any) => {
          const pNum = partIdToNumber.get(q.partId);
          return pNum && partsToInclude.has(pNum);
        });

        // Re-index flatQuestions
        manifest.flatQuestions.forEach((q: any, i: number) => {
          q.index = i;
        });
      }
    }
    else {
      // ⛔ NO SESSION FOUND -> Redirect to Book Detail to Initialize
      return redirect(`/books/${id}`);
    }
  }

  return (
    <ExamSessionWrapper
      manifest={manifest}
      initialAnswers={initialAnswers}
      sessionId={sessionId}
      userTier={userTier}
      settings={lobbySettings} // Pass settings
    />
  );
}