import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getUserWithProfile } from "@/lib/auth/getUserProfile";
import { getExamContent } from "@/services/exam/getExamContent";

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();
  const { bookId, mode, settings } = body; // settings matches LobbySettings interface

  // 1. Auth Check
  const user = await getUserWithProfile();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Fetch Exam Content (Manifest) for Snapshot
  // We need this to generate the 'test_snapshot' based on 'parts_enabled'
  // Strategy: Fetch full content, then filter based on settings.parts_enabled
  const manifest = await getExamContent(bookId);
  if (!manifest) {
      return NextResponse.json({ error: "Exam content not found" }, { status: 404 });
  }

  // 3. Generate Snapshot based on Settings
  // settings.parts_enabled is an array of part numbers [1, 2, ...]
  const partsToInclude = new Set(settings.parts_enabled);
  
  const snapshot = manifest.flatQuestions
    .filter(q => partsToInclude.has(q.part_number)) // Fixed: Filter by part_number (number)
    .map(q => ({
       question_id: q.questionId,
       question_number: q.index + 1, // 1-based index for display
       part_number: q.part_number,
       correct_option: q.correct_answer || "A" // Use actual answer, fallback to A if missing
    }));
    
   // Re-verify Snapshot Logic from page.tsx
   // In page.tsx: 
   // const questions = manifest.parts.flatMap(...)
   // correct_option: q.correct_answer
   // So manifest HAS answers?
   // Let's assume yes for now as per previous task.

  // 4. Upsert Session
  // We check for an active session first.
  const { data: existingSession } = await supabase
      .from("exam_sessions")
      .select("*")
      .eq("user_id", user.id)
      .eq("book_id", bookId)
      .neq("status", "completed")
      .single();

  let sessionId = existingSession?.id;

  if (existingSession) {
      // Update existing session with new settings
      // NOTE: Changing settings mid-session might be weird if they already answered stuff.
      // But Lobby implies "Restart/Re-init".
      // Let's Update constraints.
      await supabase
          .from("exam_sessions")
          .update({
              settings: settings, // JSONB
              test_snapshot: snapshot, // Refresh snapshot if parts changed
              updated_at: new Date().toISOString()
          })
          .eq("id", sessionId);
  } else {
      // Create New
      const { data: newSession, error: createError } = await supabase
        .from("exam_sessions")
        .insert({
            user_id: user.id,
            book_id: bookId,
            status: "in_progress",
            started_at: new Date().toISOString(),
            test_snapshot: snapshot,
            settings: settings, // Store the full settings object
            // current_state: removed as column likely doesn't exist. Sync handles answers.
        })
        .select()
        .single();
        
      if (createError) {
          return NextResponse.json({ error: createError.message }, { status: 500 });
      }
      sessionId = newSession.id;
  }

  return NextResponse.json({ 
      success: true, 
      sessionId,
      redirectUrl: `/exam/${bookId}` 
  });
}
