import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { getUserWithProfile } from "@/lib/auth/getUserProfile";

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();
  const { sessionId, answers } = body;

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  // 1. Auth Check
  const user = await getUserWithProfile();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Fetch Session & Verify Ownership
  const { data: session, error: sessionError } = await supabase
    .from("exam_sessions")
    .select("book_id, user_id")
    .eq("id", sessionId)
    .single();

  if (sessionError || !session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  if (session.user_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // --- HYBRID MODE LOGIC ---
  // Check if user is on a paid tier (Silver, Gold, Platinum)
  const isPaidUser = ["silver", "gold", "platinum", "premium"].includes(
    user.subscription_tier || ""
  );

  // 3. PERSIST USER ANSWERS (Conditional)
  // Only save detailed response rows for Paid Users.
  // Free users get "Compute Only" (Score calculated below, but answers not saved).
  if (isPaidUser && answers && Object.keys(answers).length > 0) {
    const responseRows = Object.entries(answers).map(([qId, option]) => ({
      user_id: user.id,
      session_id: sessionId,
      question_id: qId,
      selected_option: String(option).trim(),
      updated_at: new Date().toISOString(),
    }));

    // Upsert to handle potential conflicts with background sync
    const { error: saveError } = await supabase
      .from("user_responses")
      .upsert(responseRows, { onConflict: "session_id, question_id" });

    if (saveError) {
      console.error("Error saving responses during submit:", saveError);
    }
  }

  // 4. Fetch Correct Answers from DB
  const { data: correctAnswers } = await supabase
    .from("questions")
    .select(
      `
       id, 
       correct_option, 
       question_groups!inner (
         parts!inner ( part_number, book_id )
       )
    `
    )
    .eq("question_groups.parts.book_id", session.book_id);

  // 5. Grading Logic
  let listeningCorrect = 0;
  let readingCorrect = 0;
  let listeningTotal = 0;
  let readingTotal = 0;
  
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;

  correctAnswers?.forEach((q: any) => {
    // Determine Part Type
    const group = Array.isArray(q.question_groups) ? q.question_groups[0] : q.question_groups;
    const part = Array.isArray(group?.parts) ? group.parts[0] : group?.parts;
    const partNum = part?.part_number || 0;
    const isListening = partNum <= 4;

    if (isListening) listeningTotal++;
    else readingTotal++;

    // Check user answer
    // For Free users, we grade from the JSON payload since DB might be empty
    const userVal = answers?.[q.id] ? String(answers[q.id]).trim().toUpperCase() : null;
    const correctVal = q.correct_option ? String(q.correct_option).trim().toUpperCase() : null;

    if (!userVal) {
      skippedCount++;
    } else if (userVal === correctVal) {
      correctCount++;
      if (isListening) listeningCorrect++;
      else readingCorrect++;
    } else {
      incorrectCount++;
    }
  });

  // 6. Calculate Scaled Score (MVP)
  // Scale to 495 per section. 
  const scoreL = listeningTotal > 0 ? Math.round((listeningCorrect / listeningTotal) * 495) : 5;
  const scoreR = readingTotal > 0 ? Math.round((readingCorrect / readingTotal) * 495) : 5;
  const total = scoreL + scoreR;

  // 7. Save Final Result to Session
  // We ALWAYS update the session status/score so the user sees their result immediately,
  // even if we didn't save their granular answers history.
  const { error: updateError } = await supabase
    .from("exam_sessions")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
      score_listening: scoreL,
      score_reading: scoreR,
      total_score: total,
    })
    .eq("id", sessionId);

  if (updateError) {
    return NextResponse.json(
      { error: "Failed to save results" },
      { status: 500 }
    );
  }

  return NextResponse.json({ 
    success: true, 
    score: total,
    counts: { correct: correctCount, incorrect: incorrectCount, skipped: skippedCount }
  });
}