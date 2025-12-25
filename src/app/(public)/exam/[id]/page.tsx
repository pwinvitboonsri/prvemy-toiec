import { createClient } from "@/utils/supabase/server";
import { getExamContent } from "@/lib/api/exam/getExamContent";
import { ExamSessionWrapper } from "@/Components/page/exam/ExamSessionWrapper";
import { notFound } from "next/navigation";
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

  let initialAnswers = {};
  let sessionId: string | null = null;
  let userTier = "guest"; // Default

  if (user) {
    userTier = user.subscription_tier || "free"; // Get tier

    const { data: session } = await supabase
      .from("exam_sessions")
      .select("id")
      .eq("book_id", id)
      .eq("user_id", user.id)
      .eq("status", "in_progress")
      .order("started_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (session) {
      console.log("🔄 Resuming Session:", session.id);
      sessionId = session.id;
    }
    else {
      console.log("🆕 Creating New Session for:", id);
      const { data: newSession, error } = await supabase
        .from("exam_sessions")
        .insert({
          user_id: user.id,
          book_id: id,
          status: "in_progress",
          started_at: new Date().toISOString(),
          settings: { mode: "simulation" }
        })
        .select("id")
        .single();

      if (newSession) {
        sessionId = newSession.id;
      }
    }
  }

  return (
    <ExamSessionWrapper
      manifest={manifest}
      initialAnswers={initialAnswers}
      sessionId={sessionId}
      userTier={userTier} // <--- Pass tier
    />
  );
}