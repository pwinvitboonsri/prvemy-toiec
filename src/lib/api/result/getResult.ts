import { createClient } from "@/utils/supabase/server";

export interface ExamResult {
  id: string;
  bookId: string; // Added bookId
  bookTitle: string;
  totalScore: number;
  listeningScore: number;
  readingScore: number;
  completedAt: string;
  status: string;
  // Real Stats (Nullable if data not saved)
  correctCount: number | null;
  incorrectCount: number | null;
  skippedCount: number | null;
  totalQuestions: number;
  // Feature Flag
  isFullAnalysisAvailable: boolean;
}

export async function getExamResult(
  sessionId: string
): Promise<ExamResult | null> {
  const supabase = await createClient();

  // 1. Fetch Basic Session Info
  const { data: session, error: sessionError } = await supabase
    .from("exam_sessions")
    .select(
      `
      id,
      book_id,
      total_score,
      score_listening,
      score_reading,
      completed_at,
      status,
      books ( title )
    `
    )
    .eq("id", sessionId)
    .single();

  if (sessionError || !session) {
    console.error("Error fetching session:", sessionError);
    return null;
  }

  // 2. Parallel Fetch: User Answers & Correct Answer Key
  const [userResponsesResponse, questionsResponse] = await Promise.all([
    supabase
      .from("user_responses")
      .select("question_id, selected_option")
      .eq("session_id", sessionId),

    supabase
      .from("questions")
      .select(
        `
       id, 
       correct_option,
       question_groups!inner (
         parts!inner ( book_id )
       )
    `
      )
      .eq("question_groups.parts.book_id", session.book_id),
  ]);

  const userResponses = userResponsesResponse.data || [];
  const correctKey = questionsResponse.data || [];
  const totalQuestions = correctKey.length;

  // 3. Logic: Determine if we have full data
  const hasResponseData = userResponses.length > 0;

  // 4. Calculate Stats in Real-Time
  let correctCount = 0;
  let incorrectCount = 0;

  if (hasResponseData) {
    const answerMap = new Map(
      userResponses.map((r) => [
        r.question_id,
        String(r.selected_option).trim().toUpperCase(),
      ])
    );

    correctKey.forEach((question) => {
      const userAnswer = answerMap.get(question.id);
      const correctAnswer = String(question.correct_option)
        .trim()
        .toUpperCase();

      if (userAnswer) {
        if (userAnswer === correctAnswer) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });
  }

  const skippedCount = hasResponseData
    ? totalQuestions - (correctCount + incorrectCount)
    : null;

  const finalCorrect = hasResponseData ? correctCount : null;
  const finalIncorrect = hasResponseData ? incorrectCount : null;

  const bookData = Array.isArray(session.books)
    ? session.books[0]
    : session.books;

  return {
    id: session.id,
    bookId: session.book_id, // Return bookId
    bookTitle: bookData?.title || "Unknown Mission",
    totalScore: session.total_score || 0,
    listeningScore: session.score_listening || 0,
    readingScore: session.score_reading || 0,
    completedAt: session.completed_at,
    status: session.status,
    correctCount: finalCorrect,
    incorrectCount: finalIncorrect,
    skippedCount: skippedCount,
    totalQuestions,
    isFullAnalysisAvailable: hasResponseData,
  };
}