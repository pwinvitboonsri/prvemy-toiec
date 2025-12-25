export type QuestionType =
  | "photograph"
  | "response"
  | "conversation"
  | "talk"
  | "sentence"
  | "completion"
  | "reading";

export interface QuestionOption {
  key: string; // "A", "B", "C", "D"
  text: string;
}

export interface Question {
  id: string; // UUID
  group_id: string;
  question_number: number;
  text: string;
  options: QuestionOption[];
  correct_answer?: string; // Optional (hidden in real test, present in practice)
  explanation?: string;
  // Metadata for rendering
  ui_type?: QuestionType;
}

export interface QuestionGroup {
  id: string;
  part_id: string;
  title?: string; // "Questions 32-34 refer to..."
  stimulus_text?: string; // Reading passage
  stimulus_image_url?: string; // Image URL
  stimulus_audio_url?: string; // Audio URL
  questions: Question[];
}

export interface ExamPart {
  id: string;
  part_number: number; // 1-7
  title: string; // "Photographs"
  instructions: string;
  groups: QuestionGroup[];
}

export interface ExamManifest {
  bookId: string;
  title: string;
  duration: number; // Minutes
  parts: ExamPart[];
  // Flattened list for easy navigation (0-199)
  flatQuestions: {
    questionId: string;
    groupId: string;
    partId: string;
    index: number;
  }[];
}

export interface ExamSessionState {
  sessionId: string;
  startTime: string; // ISO String
  answers: Record<string, string>; // { questionId: "A" }
  flags: Record<string, boolean>;
  eliminated: Record<string, string[]>; // { questionId: ["A", "C"] }
  currentQuestionIndex: number;
  isComplete: boolean;
}
