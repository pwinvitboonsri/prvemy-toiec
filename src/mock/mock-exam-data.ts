export type QuestionOption = {
  key: string;
  text: string;
};

export type ExamPart =
  | "Part 1"
  | "Part 2"
  | "Part 3"
  | "Part 4"
  | "Part 5"
  | "Part 6"
  | "Part 7";

export type QuestionData = {
  id: number;
  part: ExamPart;
  type:
    | "photograph"
    | "response"
    | "conversation"
    | "talk"
    | "sentence"
    | "completion"
    | "reading";
  instruction?: string;
  stimulus?: {
    type: "image" | "audio" | "text" | "multi";
    url?: string; // For images/audio
    text?: string; // For reading passages
    title?: string; // For documents
    label?: string; // e.g. "Questions 32-34 refer to the following conversation"
  };
  content: string; // The Question Text
  options: QuestionOption[];
  correct: string;
};

export const MOCK_EXAM_DATA: QuestionData[] = [
  // --- PART 1: PHOTOGRAPHS ---
  {
    id: 1,
    part: "Part 1",
    type: "photograph",
    instruction: "Look at the picture marked Number 1 in your test book.",
    stimulus: {
      type: "image",
      url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      label: "PHOTOGRAPH #1",
    },
    content: "(Audio: Listen to the four statements)",
    options: [
      { key: "A", text: "They are gathered around a table." },
      { key: "B", text: "They are packing suitcases." },
      { key: "C", text: "One of the men is wearing a hat." },
      { key: "D", text: "The room is empty." },
    ],
    correct: "A",
  },

  // --- PART 2: QUESTION-RESPONSE ---
  {
    id: 7,
    part: "Part 2",
    type: "response",
    instruction: "Mark your answer on your answer sheet.",
    stimulus: {
      type: "audio",
      label: "AUDIO ONLY",
    },
    content: "Where did you put the monthly production reports?",
    options: [
      { key: "A", text: "It's scheduled for next month." },
      { key: "B", text: "On the manager's desk." },
      { key: "C", text: "Yes, I read it." },
    ],
    correct: "B",
  },

  // --- PART 3: CONVERSATIONS ---
  {
    id: 32,
    part: "Part 3",
    type: "conversation",
    instruction: "Select the best answer to each question.",
    stimulus: {
      type: "audio",
      label: "Questions 32-34 refer to the following conversation.",
    },
    content: "Why is the woman calling?",
    options: [
      { key: "A", text: "To check on a shipping delay" },
      { key: "B", text: "To order office supplies" },
      { key: "C", text: "To update her address" },
      { key: "D", text: "To speak with a manager" },
    ],
    correct: "A",
  },
  {
    id: 33,
    part: "Part 3",
    type: "conversation",
    stimulus: { type: "audio" }, // Linked to same audio
    content: "What does the man offer to do?",
    options: [
      { key: "A", text: "Refund the shipping cost" },
      { key: "B", text: "Send the items overnight" },
      { key: "C", text: "Check the inventory" },
      { key: "D", text: "Call the driver" },
    ],
    correct: "A",
  },

  // --- PART 4: TALKS ---
  {
    id: 71,
    part: "Part 4",
    type: "talk",
    instruction: "Select the best answer to each question.",
    stimulus: {
      type: "audio",
      label: "Questions 71-73 refer to the following announcement.",
    },
    content: "Where is this announcement taking place?",
    options: [
      { key: "A", text: "At an airport" },
      { key: "B", text: "On a train" },
      { key: "C", text: "In a bus station" },
      { key: "D", text: "At a ferry terminal" },
    ],
    correct: "A",
  },

  // --- PART 5: INCOMPLETE SENTENCES ---
  {
    id: 101,
    part: "Part 5",
    type: "sentence",
    instruction: "Select the best answer to complete the sentence.",
    content:
      "Ms. Sato requested that the finalized budget _______ to her by Friday afternoon.",
    options: [
      { key: "A", text: "send" },
      { key: "B", text: "sent" },
      { key: "C", text: "be sent" },
      { key: "D", text: "sending" },
    ],
    correct: "C",
  },
  {
    id: 102,
    part: "Part 5",
    type: "sentence",
    instruction: "Select the best answer to complete the sentence.",
    content:
      "Although the new software is efficient, it is _______ compatible with older operating systems.",
    options: [
      { key: "A", text: "not" },
      { key: "B", text: "no" },
      { key: "C", text: "none" },
      { key: "D", text: "nor" },
    ],
    correct: "A",
  },

  // --- PART 6: TEXT COMPLETION ---
  {
    id: 131,
    part: "Part 6",
    type: "completion",
    instruction: "Select the best answer to complete the text.",
    stimulus: {
      type: "text",
      title: "E-mail to All Staff",
      label: "Questions 131-134 refer to the following e-mail.",
      text: `To: All Sales Staff
From: Regional Director
Re: Quarterly Targets

I am writing to inform you of a change in our sales targets for the upcoming quarter. Due to the recent economic downturn, we have decided to [131] our expectations.

While we still aim for growth, the new targets are more realistic given the current market conditions. [132], we will be introducing a new bonus structure to reward top performers.`,
    },
    content: "[131]",
    options: [
      { key: "A", text: "lower" },
      { key: "B", text: "lowering" },
      { key: "C", text: "lowered" },
      { key: "D", text: "lows" },
    ],
    correct: "A",
  },

  // --- PART 7: READING COMPREHENSION ---
  {
    id: 147,
    part: "Part 7",
    type: "reading",
    instruction: "Select the best answer.",
    stimulus: {
      type: "text",
      title: "Business Weekly Article",
      label: "Questions 147-148 refer to the following article.",
      text: `<h3 class="font-bold text-lg mb-2">Urban Renewal Project Approved</h3>
      <p class="mb-4 text-xs font-mono text-gray-500">BY JENNIFER LAWRENCE | OCT 12</p>
      <p class="mb-2"><span class="font-bold text-2xl float-left mr-1">T</span>he City Planning Commission yesterday voted 5-2 to approve the controversial "Eastside Revitalization Plan," paving the way for a massive redevelopment of the historic waterfront district.</p>
      <p>Mayor Sarah Jenkins hailed the decision as a "historic moment" for the city. "This project will create thousands of jobs and transform an underutilized area into a vibrant economic hub," she stated.</p>`,
    },
    content: "What is the main purpose of the article?",
    options: [
      { key: "A", text: "To profile a local politician" },
      { key: "B", text: "To report on a city council vote" },
      { key: "C", text: "To advertise a new hotel" },
      { key: "D", text: "To criticize a construction company" },
    ],
    correct: "B",
  },
];
