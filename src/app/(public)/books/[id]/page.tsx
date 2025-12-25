import { createClient } from "@/utils/supabase/server";
import { BookDetailClient } from "@/Components/page/books/detail/BookDetailClient";
import { notFound } from "next/navigation";
import { getUserWithProfile } from "@/lib/auth/getUserProfile";
import {
  BookDetailData,
  ManifestItem,
  CustomUser,
  UserRole,
} from "@/types/library-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const rawUser = await getUserWithProfile();
  const user = rawUser as unknown as CustomUser | null;

  let userTier: UserRole = "guest";
  if (user) {
    userTier = "free";
    if (user.subscription_status === "active") {
      const tier = user.subscription_tier;
      if (tier === "platinum") {
        userTier = "platinum";
      } else if (["gold", "silver", "premium"].includes(tier || "")) {
        userTier = "premium";
      }
    }
  }

  // 2. Fetch Book Metadata
  const { data: book, error } = await supabase
    .from("books")
    .select(`*, user_purchases!left (user_id)`)
    .eq("id", id)
    .eq("user_purchases.user_id", user?.id)
    .single();

  if (error || !book) {
    console.error("Book not found:", error);
    notFound();
  }

  // 3. Fetch Exam Manifest
  const { data: partsData } = await supabase
    .from("parts")
    .select(`id, part_number, title, question_groups(questions(count))`)
    .eq("book_id", id)
    .order("part_number");

  const manifest: ManifestItem[] = (partsData || []).map((part: any) => {
    const totalQuestions = part.question_groups.reduce(
      (sum: number, group: any) => {
        const qCount = group.questions?.[0]?.count || 0;
        return sum + qCount;
      },
      0
    );

    return {
      partId: part.id,
      number: part.part_number,
      title: part.title,
      questionCount: totalQuestions,
    };
  });
  const totalBookQuestions = manifest.reduce(
    (sum, item) => sum + item.questionCount,
    0
  );

  // 4. Fetch User History (Dynamic Logic)
  let bestScore: number | null = null;
  let listeningScore: number | null = null;
  let readingScore: number | null = null;
  let scoreTrend: number[] = [];
  let sessionsCount = 0;
  let activeSessionId = null;

  if (user) {
    // Fetch ALL sessions for this book
    const { data: sessions, error: sessionError } = await supabase
      .from("exam_sessions")
      .select(
        "id, total_score, status, score_listening, score_reading, started_at"
      )
      .eq("book_id", id)
      .eq("user_id", user.id)
      .order("started_at", { ascending: false }); // Newest first

    if (sessionError) {
      console.error("Error fetching sessions:", sessionError);
    }

    if (sessions && sessions.length > 0) {
      sessionsCount = sessions.length;

      const completedSessions = sessions.filter(
        (s) => s.status === "completed" && s.total_score !== null
      );

      if (completedSessions.length > 0) {
        // Find session with MAX total_score
        const bestSession = completedSessions.reduce((max, s) =>
          s.total_score! > max.total_score! ? s : max
        );

        bestScore = bestSession.total_score;
        listeningScore = bestSession.score_listening;
        readingScore = bestSession.score_reading;

        // Calculate Trend: Sort chronologically (Oldest -> Newest) and take last 5
        scoreTrend = [...completedSessions]
          .sort(
            (a, b) =>
              new Date(a.started_at).getTime() -
              new Date(b.started_at).getTime()
          )
          .map((s) => s.total_score as number)
          .slice(-5);
      }

      // Check for Resume
      const latestSession = sessions[0];
      if (latestSession.status === "in_progress") {
        activeSessionId = latestSession.id;
      }
    }
  }

  // 5. Compute Logic
  const now = new Date();
  const earlyAccessDate = book.early_access_until
    ? new Date(book.early_access_until)
    : null;
  const isEarlyAccessLocked = earlyAccessDate
    ? earlyAccessDate > now && userTier !== "platinum"
    : false;
  const isOwned =
    book.user_purchases &&
    Array.isArray(book.user_purchases) &&
    book.user_purchases.length > 0;

  let actionState: BookDetailData["actionState"] = "start";

  if (!user && !book.is_guest_accessible) {
    actionState = "login_required";
  } else if (activeSessionId) {
    actionState = "resume";
  } else if (isEarlyAccessLocked) {
    actionState = "locked_time";
  } else if (userTier === "free") {
    const isFreeTierContent =
      book.one_time_price_id === "price_free_tier" || book.is_guest_accessible;
    const isPaidContent =
      book.one_time_price_id && book.one_time_price_id !== "price_free_tier";

    if (isPaidContent && !isOwned) actionState = "locked_price";
    else if (!isFreeTierContent && !isPaidContent && !isOwned)
      actionState = "upgrade_required";
  }

  const bookData: BookDetailData = {
    id: book.id,
    title: book.title,
    description: book.description || "Official ETS Simulation",
    coverUrl: book.cover_image_url,
    questionCount: totalBookQuestions > 0 ? totalBookQuestions : 200,
    duration: 120,
    difficulty: "HARD",
    accessType: book.one_time_price_id
      ? "one-time"
      : book.is_guest_accessible
      ? "guest"
      : "premium",
    price: book.one_time_price_id === "price_basic_199" ? 199 : null,
    releaseDate: earlyAccessDate ? earlyAccessDate.toLocaleDateString() : null,
    userStatus: userTier,
    actionState,
    bestScore,
    listeningScore,
    readingScore,
    scoreTrend,
    sessionsCount,
    lastSessionId: activeSessionId,
    manifest,
  };

  return <BookDetailClient book={bookData} />;
}
