import React from "react";
import { createClient } from "@/lib/supabase/server";
import { getUserWithProfile } from "@/lib/auth/getUserProfile";
import { redirect, notFound } from "next/navigation";
import { HistoryClient } from "@/Components/page/books/history/HistoryClient";
import { UserRole } from "@/types/data/library_data";

export default async function HistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: bookId } = await params;
  const user = await getUserWithProfile();

  if (!user) {
    redirect("/login");
  }

  const supabase = await createClient();

  // 1. Fetch Book Details (Title, etc.)
  const { data: book, error: bookError } = await supabase
    .from("books")
    .select("title, avg_total_score")
    .eq("id", bookId)
    .single();

  if (bookError || !book) {
    return notFound();
  }

  // 2. Fetch Sessions for this Book + User
  const { data: sessions, error: sessionError } = await supabase
    .from("exam_sessions")
    .select("id, started_at, status, total_score, score_listening, score_reading, settings")
    .eq("book_id", bookId)
    .eq("user_id", user.id)
    .order("started_at", { ascending: false });

  if (sessionError) {
    console.error("Error fetching sessions:", sessionError);
    // Continue with empty sessions or handle error UI
  }

  return (
    <HistoryClient
      bookId={bookId}
      bookTitle={book.title}
      sessions={sessions || []}
      userStatus={user.subscription_tier as UserRole}
      avgBookScore={book.avg_total_score}
    />
  );
}
