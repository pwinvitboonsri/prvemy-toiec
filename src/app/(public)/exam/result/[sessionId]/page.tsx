import { getExamResult } from "@/services/result/getResult";
import { getUserWithProfile } from "@/lib/auth/getUserProfile";
import { ResultClient } from "@/Components/page/exam/result/ResultClient";
import { UserRole } from "@/types/data/library_data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ sessionId: string }>;
}

export default async function ResultPage({ params }: PageProps) {
  const { sessionId } = await params;
  const result = await getExamResult(sessionId);

  const user = await getUserWithProfile();

  if (!result) {
    return notFound();
  }

  return (
    <ResultClient
      result={result}
      userStatus={user?.subscription_tier as UserRole}
    />
  );
}
