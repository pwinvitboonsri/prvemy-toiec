import { createClient } from "@/utils/supabase/server";
import { ExamManifest, ExamPart } from "@/types/exam";

export async function getExamContent(
  bookId: string
): Promise<ExamManifest | null> {
  const supabase = await createClient();

  // 1. Deep Fetch: Book -> Parts -> Groups -> Questions
  // FIXED: Changed column names to match the database schema (order_index, question_text, etc.)
  const { data: book, error } = await supabase
    .from("books")
    .select(
      `
      id,
      title,
      parts (
        id, part_number, title, instructions,
        question_groups (
          id, 
          passage_text,      
          image_url,        
          audio_url,
          questions (
            id, 
            order_index,      
            question_text, 
            option_a, option_b, option_c, option_d,
            correct_option
          )
        )
      )
    `
    )
    .eq("id", bookId)
    .single();

  if (error || !book) {
    console.error("Error fetching exam content:", error);
    return null;
  }

  // 2. Transform into clean ExamManifest structure
  const parts: ExamPart[] = book.parts
    .sort((a: any, b: any) => a.part_number - b.part_number)
    .map((p: any) => ({
      id: p.id,
      part_number: p.part_number,
      title: p.title,
      instructions: p.instructions || "Select the best answer.",
      groups: p.question_groups
        .map((g: any) => ({
          id: g.id,
          part_id: p.id,
          title: g.title,
          // MAP DB COLUMNS TO FRONTEND NAMES
          stimulus_text: g.passage_text, // DB: passage_text -> UI: stimulus_text
          stimulus_image_url: g.image_url, // DB: image_url -> UI: stimulus_image_url
          stimulus_audio_url: g.audio_url, // DB: audio_url -> UI: stimulus_audio_url

          questions: g.questions
            .sort((a: any, b: any) => a.order_index - b.order_index) // Sort by order_index
            .map((q: any) => ({
              id: q.id,
              group_id: g.id,
              question_number: q.order_index, // Map order_index to question_number
              text: q.question_text, // Map question_text to text

              // COMBINE SEPARATE OPTION COLUMNS INTO ONE ARRAY
              options: [
                { key: "A", text: q.option_a },
                { key: "B", text: q.option_b },
                { key: "C", text: q.option_c },
                { key: "D", text: q.option_d },
              ].filter((opt) => opt.text !== null && opt.text !== ""),

              correct_answer: q.correct_option,
            })),
        }))
        // Sort groups by the order of their first question
        .sort(
          (a: any, b: any) =>
            (a.questions[0]?.question_number || 0) -
            (b.questions[0]?.question_number || 0)
        ),
    }));

  // 3. Create Flattened Map for Navigation (Next/Prev)
  const flatQuestions: {
    questionId: string;
    groupId: string;
    partId: string;
    index: number;
  }[] = [];

  parts.forEach((part) => {
    part.groups.forEach((group) => {
      group.questions.forEach((q) => {
        flatQuestions.push({
          questionId: q.id,
          groupId: group.id,
          partId: part.id,
          index: flatQuestions.length,
        });
      });
    });
  });

  return {
    bookId: book.id,
    title: book.title,
    duration: 120,
    parts,
    flatQuestions,
  };
}
