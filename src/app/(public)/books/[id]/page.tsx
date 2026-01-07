import { Suspense } from "react";
import { BookDetailFetcher } from "@/Components/page/books/detail/BookDetailFetcher";
import { BookDetailSkeleton } from "@/Components/page/books/detail/BookDetailSkeleton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<BookDetailSkeleton />}>
      <BookDetailFetcher id={id} />
    </Suspense>
  );
}
