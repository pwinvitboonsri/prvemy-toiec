
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getUserWithProfile } from "@/lib/auth/getUserProfile";
import {
    BookDetailData,
    ManifestItem,
    CustomUser,
    UserRole,
} from "@/types/data/library_data";
import { BookDetailClient } from "@/Components/page/books/detail/BookDetailClient";
import { FlightRecordsFetcher } from "@/Components/page/books/detail/features/flight-records/FlightRecordsFetcher";
import { Suspense } from "react";
import { SkeletonComponent } from "@/Components/ui/SkeletonComponent";

interface BookDetailFetcherProps {
    id: string;
}

export async function BookDetailFetcher({ id }: BookDetailFetcherProps) {
    const supabase = await createClient();

    // 1. Parallel Data Fetching
    const [userResult, bookResult, partsResult] = await Promise.all([
        getUserWithProfile(),
        supabase
            .from("books")
            .select(`*, user_purchases!left (user_id)`)
            .eq("id", id)
            .single(),
        supabase
            .from("parts")
            .select(`id, part_number, title, question_groups(questions(count))`)
            .eq("book_id", id)
            .order("part_number"),
    ]);

    const rawUser = userResult;
    const user = rawUser as unknown as CustomUser | null;

    const { data: book, error } = bookResult;
    const { data: partsData } = partsResult;

    // 2. Determine User Tier
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

    // Handle Book Errors
    if (error || !book) {
        console.error("Book not found:", error);
        notFound();
    }

    // 3. Process Manifest
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

    // 4. Check for Active Session (Fast)
    let activeSessionId = null;

    if (user) {
        const { data: activeSession } = await supabase
            .from("exam_sessions")
            .select("id")
            .eq("book_id", id)
            .eq("user_id", user.id)
            .eq("status", "in_progress")
            .maybeSingle();

        if (activeSession) {
            activeSessionId = activeSession.id;
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
        lastSessionId: activeSessionId,
        globalStats: {
            avgScore: Number(book.avg_total_score) || 0,
            avgListening: Number(book.avg_listening_score) || 0,
            avgReading: Number(book.avg_reading_score) || 0,
            totalTakers: Number(book.total_test_takers) || 0,
            updatedAt: book.stats_updated_at || null,
        },
        manifest,
    };

    return (
        <BookDetailClient
            book={bookData}
            flightRecordsSlot={
                <Suspense fallback={<SkeletonComponent className="h-[18rem] bg-white border-2 border-dashed" rounded={false} />}>
                    <FlightRecordsFetcher
                        bookId={book.id}
                        userId={user?.id}
                        userRole={userTier}
                        globalStats={bookData.globalStats}
                        difficulty={bookData.difficulty}
                    />
                </Suspense>
            }
        />
    );
}
