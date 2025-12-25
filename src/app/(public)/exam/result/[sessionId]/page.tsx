import { getExamResult } from "@/lib/api/result/getResult";
import { ResultClient } from "@/Components/page/exam/result/ResultClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ sessionId: string }>;
}

export default async function ResultPage({ params }: PageProps) {
  const { sessionId } = await params;
  const result = await getExamResult(sessionId);
  console.log("🚀 ~ ResultPage ~ result:", result)

  if (!result) {
    return notFound();
  }

  return <ResultClient result={result} />;
}
