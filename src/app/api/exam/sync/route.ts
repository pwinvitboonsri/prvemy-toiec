import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getUserWithProfile } from "@/lib/auth/getUserProfile";

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();
  const { sessionId, responses } = body;

  if (!sessionId || !responses || !Array.isArray(responses)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // 1. Auth Check
  const user = await getUserWithProfile();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Prepare Data for Batch Upsert
  // Payload expected: { question_id, selected_option, is_guessed, is_flagged, time_taken_ms, is_correct }
  const responseRows = responses.map((r: any) => ({
    user_id: user.id,
    session_id: sessionId,
    question_id: r.question_id,
    selected_option: String(r.selected_option),
    is_correct: r.is_correct, // REMOVED: Database Trigger handles grading now
    is_guessed: r.is_guessed,
    is_flagged: r.is_flagged,
    time_taken_ms: r.time_taken_ms,
    updated_at: new Date().toISOString(),
  }));

  if (responseRows.length === 0) {
    return NextResponse.json({ success: true, count: 0 });
  }

  // 3. Upsert to Supabase
  const { error } = await supabase
    .from("user_responses")
    .upsert(responseRows, { onConflict: "session_id, question_id" });

  if (error) {
    console.error("❌ DB Sync Error:", error.message);
    return NextResponse.json({ error: "Sync failed", details: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, count: responseRows.length });
}