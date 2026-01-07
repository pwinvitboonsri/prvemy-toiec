import { createClient } from "@/lib/supabase/server";
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

  // Check if user is on a paid tier (Silver, Gold, Platinum)
  const isPaidUser = ["silver", "gold", "platinum", "premium"].includes(
    user.subscription_tier || ""
  );

  // 3. PERSIST USER ANSWERS (Conditional)
  // Only save detailed response rows for Paid Users.
  if (isPaidUser && answers && Object.keys(answers).length > 0) {
    const responseRows = Object.entries(answers).map(([qId, option]) => ({
      user_id: user.id,
      session_id: sessionId,
      question_id: qId,
      selected_option: String(option).trim(),
      updated_at: new Date().toISOString(),
      // We do not set is_correct here. 
    }));

    // Upsert to handle potential conflicts with background sync
    const { error: saveError } = await supabase
      .from("user_responses")
      .upsert(responseRows, { onConflict: "session_id, question_id" });

    if (saveError) {
      console.error("Error saving responses during submit:", saveError);
    }
  }

  // 4. PERFORM GRADING (Snapshot vs Ledger)
  // We do this in API now to ensure reliability and debuggability.
  
  // A. Fetch Session Snapshot & Existing Responses
  const { data: sessionData, error: sessionFetchError } = await supabase
    .from("exam_sessions")
    .select("test_snapshot, book_id, user_id, status") // status check
    .eq("id", sessionId)
    .single();

  if (sessionFetchError || !sessionData?.test_snapshot) {
     console.error("Snapshot missing for grading:", sessionId);
     return NextResponse.json({ error: "Grading failed: Snapshot missing" }, { status: 500 });
  }

  // B. Fetch All Explict User Responses (The Ledger)
  const { data: userResponses, error: responseFetchError } = await supabase
    .from("user_responses")
    .select("question_id, selected_option, is_guessed, is_flagged, time_taken_ms")
    .eq("session_id", sessionId);

  if (responseFetchError) {
      console.error("Error fetching ledger for grading:", responseFetchError);
  }

  const responsesMap = new Map<string, any>();
  userResponses?.forEach((r) => {
      responsesMap.set(r.question_id, r);
  });

  // C. Calculate Results
  let listeningCorrect = 0;
  let readingCorrect = 0;
  let listeningTotal = 0;
  let readingTotal = 0;
  
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;

  const detailedReview: any[] = [];
  const snapshot = sessionData.test_snapshot as any[];

  snapshot.forEach((item) => {
      const qId = item.question_id;
      const pNum = Number(item.part_number);
      const correctOpt = String(item.correct_option).trim().toUpperCase();
      
      // Determine Section
      if (pNum <= 4) listeningTotal++;
      else readingTotal++;

      // User Response
      const userResp = responsesMap.get(qId);
      const userOpt = userResp?.selected_option ? String(userResp.selected_option).trim().toUpperCase() : null;
      let isCorrect = false;

      if (!userOpt) {
          skippedCount++;
          isCorrect = false;
      } else if (userOpt === correctOpt) {
          correctCount++;
          isCorrect = true;
          if (pNum <= 4) listeningCorrect++;
          else readingCorrect++;
      } else {
          incorrectCount++;
          isCorrect = false;
      }

      // Add to Detailed Review Report
      detailedReview.push({
          questionId: qId,
          questionNumber: item.question_number,
          partNumber: pNum,
          correctOption: correctOpt,
          userOption: userOpt,
          isCorrect: isCorrect,
          isGuessed: userResp?.is_guessed || false,
          isFlagged: userResp?.is_flagged || false,
          timeCheck: userResp?.time_taken_ms || 0
      });
  });

  // D. Calculate Scaled Scores (Proportional)
  // Each question is worth approx 4.95 points (495 / 100).
  // If a section has 0 questions (not enabled), score should be 0.
  // Otherwise, floor at 5 (standard TOEIC min) and cap at 495.
  const POINTS_PER_QUESTION = 4.95;
  
  const rawScoreL = Math.ceil(listeningCorrect * POINTS_PER_QUESTION);
  const rawScoreR = Math.ceil(readingCorrect * POINTS_PER_QUESTION);

  // Only apply min score of 5 if the section actually had questions
  const scoreL = listeningTotal > 0 ? Math.max(5, Math.min(495, rawScoreL)) : 0;
  const scoreR = readingTotal > 0 ? Math.max(5, Math.min(495, rawScoreR)) : 0;
  
  const totalScore = scoreL + scoreR;

  const finalResultsJson = {
      summary: {
          correct: correctCount,
          incorrect: incorrectCount,
          skipped: skippedCount,
          listening_score: scoreL,
          reading_score: scoreR,
          total_score: totalScore
      },
      detailedReview: detailedReview
  };

  // 5. Update Session (Finalize)
  // STRATEGY: Two-Step Update to bypass potential DB Trigger interference.
  // The trigger only fires when status changes to 'completed'.
  
  // Step 1: Mark as completed (Trigger may run and calculate wrong scores, we ignore it)
  const { error: statusUpdateError } = await supabase
    .from("exam_sessions")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("id", sessionId);

  if (statusUpdateError) {
    console.error("Failed to update status to completed:", statusUpdateError);
    // Don't return yet, try to save results anyway? Or fail?
    // If status doesn't update, user might retry.
    // Let's return error to see it in network tab if usage.
    return NextResponse.json({ error: "Failed to finalize session status: " + statusUpdateError.message }, { status: 500 });
  }

  // Step 2: Save our computed results (Status doesn't change, so trigger WON'T run)
  // This ensures our API-calculated scores are the final authority.
  const { error: updateError } = await supabase
    .from("exam_sessions")
    .update({
      score_listening: scoreL,
      score_reading: scoreR,
      total_score: totalScore,
      final_results_json: finalResultsJson
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
    message: "Session completed. Results are being calculated by the Ledger."
  });
}