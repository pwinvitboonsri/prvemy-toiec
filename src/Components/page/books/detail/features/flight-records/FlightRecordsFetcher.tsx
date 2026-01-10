import { createClient } from "@/lib/supabase/server";
import { FlightRecords } from "./FlightRecords";

interface FlightRecordsFetcherProps {
    bookId: string;
    userId?: string;
    userRole: "guest" | "free" | "premium" | "platinum";
    globalStats?: {
        avgScore: number;
        totalTakers: number;
        avgListening: number;
        avgReading: number;
        updatedAt: string | null;
    };
    difficulty?: "EASY" | "MEDIUM" | "HARD";
}

export async function FlightRecordsFetcher({
    bookId,
    userId,
    userRole,
    globalStats,
    difficulty,
}: FlightRecordsFetcherProps) {
    const emptyStats = {
        bestScore: null,
        sessionsCount: 0,
        listeningScore: null,
        readingScore: null,
        scoreTrend: [],
    };

    // If no user, just return the component in "Guest" mode (it handles empty data)
    if (!userId) {
        return <FlightRecords
            bookId={bookId}
            userRole="guest"
            simulationData={emptyStats}
            practiceData={emptyStats}
        />;
    }

    const supabase = await createClient();

    // Fetch ALL sessions for this book
    const { data: sessions, error } = await supabase
        .from("exam_sessions")
        .select(
            "id, total_score, status, score_listening, score_reading, started_at, settings"
        )
        .eq("book_id", bookId)
        .eq("user_id", userId)
        .order("started_at", { ascending: false });

    if (error) {
        console.error("Error fetching sessions in component:", error);
        // On error, show empty state or handle gracefully
        const emptyStats = {
            bestScore: null,
            sessionsCount: 0,
            listeningScore: null,
            readingScore: null,
            scoreTrend: [],
        };
        return <FlightRecords
            bookId={bookId}
            userRole={userRole !== "platinum" ? userRole : "premium"}
            simulationData={emptyStats}
            practiceData={emptyStats}
        />;
    }

    // Helper to calculate stats
    const calculateStats = (sessionList: typeof sessions) => {
        let bestScore: number | null = null;
        let listeningScore: number | null = null;
        let readingScore: number | null = null;
        let scoreTrend: number[] = [];
        const sessionsCount = sessionList?.length || 0;

        if (sessionList && sessionsCount > 0) {
            const completedSessions = sessionList.filter(
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
        }

        return {
            bestScore,
            sessionsCount,
            listeningScore,
            readingScore,
            scoreTrend
        };
    };

    // Split sessions by mode
    // Default to 'practice' if mode is missing, unless explicitly 'simulation'
    const simSessions = sessions?.filter(s => s.settings?.mode === 'simulation') || [];
    const practiceSessions = sessions?.filter(s => s.settings?.mode !== 'simulation') || [];

    const simulationStats = calculateStats(simSessions);
    const practiceStats = calculateStats(practiceSessions);

    return (
        <FlightRecords
            bookId={bookId}
            userRole={userRole !== "platinum" ? userRole : "premium"}
            simulationData={simulationStats}
            practiceData={practiceStats}
            globalStats={globalStats}
            difficulty={difficulty}
        />
    );
}
