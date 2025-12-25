import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { getUserWithProfile } from "@/lib/auth/getUserProfile";

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();
  const { sessionId, answers } = body;

  if (!sessionId || !answers) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // 1. Auth Check
  const user = await getUserWithProfile();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Prepare Data for Batch Upsert
  const responseRows = Object.entries(answers).map(([qId, option]) => ({
    user_id: user.id,
    session_id: sessionId,
    question_id: qId,
    selected_option: String(option),
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