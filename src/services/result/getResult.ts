import { LobbySettings } from "@/types/feature/exam";
import { createClient } from "@/lib/supabase/server";

export interface ExamResult {
  id: string;
  bookId: string;
  bookTitle: string;
  totalScore: number;
  listeningScore: number;
  readingScore: number;
  completedAt: string;
  status: string;
  settings?: LobbySettings;
  // Real Stats
  correctCount: number | null;
  incorrectCount: number | null;
  skippedCount: number | null;
  totalQuestions: number;
  // Feature Flag
  isFullAnalysisAvailable: boolean;
  // New Dynamic Data
  sectionAnalytics: Array<{
    name: string; // e.g. "P1"
    label: string; // e.g. "Photographs"
    score: number; // Percentage 0-100
  }>;
  detailedReview: Array<{
    questionId: string;
    questionNumber: number;
    partName: string;
    isCorrect: boolean;
    isGuessed: boolean;
    userOption?: string | null;
    correctOption?: string;
    isFlagged?: boolean;
    timeCheck?: number;
  }>;
}

const PART_LABELS: Record<number, string> = {
  1: "Photographs",
  2: "Question-Response",
  3: "Conversations",
  4: "Talks",
  5: "Incomplete Sentences",
  6: "Text Completion",
  7: "Reading Comprehension"
};

export async function getExamResult(
  sessionId: string
): Promise<ExamResult | null> {
  const supabase = await createClient();

  // 1. Fetch Session Info & Final Results JSON
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
      settings,
      final_results_json,
      books ( title )
    `
    )
    .eq("id", sessionId)
    .single();

  if (sessionError || !session) {
    console.error("Error fetching session:", sessionError);
    return null;
  }

  // ... (Rest of logic remains same until return)

  // 2. Parse final_results_json
  // If not present (legacy sessions), we might return limited info or null.
  // For now, we assume it's there for new sessions.
  const finalResults = session.final_results_json;
  const summary = finalResults?.summary;
  const reviewList = finalResults?.detailedReview || [];

  // 3. Map to ExamResult
  
  // Transform Detailed Review
  const detailedReview: ExamResult["detailedReview"] = reviewList.map((item: any) => ({
    questionId: item.questionId,
    questionNumber: item.questionNumber,
    partName: PART_LABELS[item.partNumber] || `Part ${item.partNumber}`,
    isCorrect: item.isCorrect,
    isGuessed: item.isGuessed,
    userOption: item.userOption,
    correctOption: item.correctOption,
    isFlagged: item.isFlagged,
    timeCheck: item.timeCheck
  }));

  const bookData = Array.isArray(session.books)
    ? session.books[0]
    : session.books;

  // Calculate Section Analytics from the JSON Data
  const partStats = new Map<number, { total: number; correct: number }>();
  // Use enabled parts from settings if available, otherwise default to all parts (1-7)
  const enabledParts = session.settings?.parts_enabled || [1, 2, 3, 4, 5, 6, 7];
  
  for (const pNum of enabledParts) {
    partStats.set(pNum, { total: 0, correct: 0 });
  }

  reviewList.forEach((item: any) => {
    const pNum = item.partNumber;
    // Only count stats for parts that are initialized (enabled)
    // Though technically reviewList shouldn't contain disabled parts if exam init worked correctly
    const stats = partStats.get(pNum);
    if (stats) {
      stats.total++;
      if (item.isCorrect) stats.correct++;
    }
  });

  const sectionAnalytics = Array.from(partStats.entries()).map(([num, data]) => ({
    name: `P${num}`,
    label: PART_LABELS[num] || `Part ${num}`,
    score: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
  })).sort((a, b) => parseInt(a.name.slice(1)) - parseInt(b.name.slice(1))); // Ensure sorted by part number

  // Fallback for summary if missing (shouldn't happen with new logic)
  const totalQuestions = summary ? (summary.correct + summary.incorrect + summary.skipped) : reviewList.length;

  return {
    id: session.id,
    bookId: session.book_id,
    bookTitle: bookData?.title || "Unknown Mission",
    totalScore: session.total_score || 0,
    listeningScore: session.score_listening || 0,
    readingScore: session.score_reading || 0,
    completedAt: session.completed_at,
    status: session.status,
    settings: session.settings as LobbySettings, // Add settings mapping
    correctCount: summary?.correct ?? null,
    incorrectCount: summary?.incorrect ?? null,
    skippedCount: summary?.skipped ?? null,
    totalQuestions: totalQuestions,
    isFullAnalysisAvailable: !!finalResults,
    sectionAnalytics,
    detailedReview
  };
}