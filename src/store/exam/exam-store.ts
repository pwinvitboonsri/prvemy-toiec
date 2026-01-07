import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { ExamManifest, Question } from "@/types/feature/exam";
import CryptoJS from "crypto-js";

// --- CONFIGURATION ---
const SECRET_KEY =
  process.env.NEXT_PUBLIC_EXAM_SECRET_KEY || "fallback-dev-key";

// --- ENCRYPTION HELPERS ---
const encryptData = (str: string): string => {
  try {
    return CryptoJS.AES.encrypt(str, SECRET_KEY).toString();
  } catch (e) {
    console.error("Encryption failed:", e);
    return str;
  }
};

const decryptData = (str: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(str, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) return "";
    return decrypted;
  } catch (e) {
    console.error("Decryption failed - Storage might be tampered with:", e);
    return "";
  }
};

// --- SECURE STORAGE ADAPTER ---
const secureStorage: StateStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") return null;
    const value = localStorage.getItem(name);
    return value ? decryptData(value) || null : null;
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(name, encryptData(value));
  },
  removeItem: (name: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
  },
};

interface ExamStoreState {
  // Static Data
  manifest: ExamManifest | null;

  // Session Data
  sessionId: string | null;
  answers: Record<string, string>;
  flags: Record<string, boolean>;
  guessed: Record<string, boolean>;
  eliminated: Record<string, string[]>;
  currentIndex: number;

  // Timer State
  secondsRemaining: number | null;
  questionTimes: Record<string, number>; // questionId -> ms spent
  lastNavigationTime: number; // Timestamp of when the current question started


  // UI State
  isDrawerOpen: boolean;

  // Actions
  initialize: (
    manifest: ExamManifest,
    initialAnswers?: Record<string, string>,
    sessionId?: string | null
  ) => void;
  setAnswer: (questionId: string, answer: string) => void;
  toggleFlag: (questionId: string) => void;
  toggleGuess: (questionId: string) => void;
  toggleEliminate: (questionId: string, optionKey: string) => void;
  jumpTo: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  toggleDrawer: (isOpen?: boolean) => void;

  // Timer Actions
  decrementTimer: () => void;
  setTimer: (seconds: number) => void;

  // Session Actions
  clearSession: () => void; // <--- NEW

  // Computed Getters
  getCurrentQuestion: () => {
    question: Question | undefined;
    group: any | undefined;
  };
}

export const useExamStore = create<ExamStoreState>()(
  persist(
    (set, get) => ({
      manifest: null,
      sessionId: null,
      answers: {},
      flags: {},
      guessed: {},
      eliminated: {},
      currentIndex: 0,
      secondsRemaining: null,
      questionTimes: {},
      lastNavigationTime: Date.now(),
      isDrawerOpen: false,

      initialize: (manifest, initialAnswers = {}, sessionId = null) => {
        const state = get();

        const existingTimer = state.secondsRemaining;
        const startTimer =
          existingTimer !== null ? existingTimer : manifest.duration * 60;

        set({
          manifest,
          answers: { ...initialAnswers, ...state.answers },
          secondsRemaining: startTimer,
          sessionId: sessionId || state.sessionId,
          lastNavigationTime: Date.now(),
        });
      },

      setAnswer: (qId, answer) =>
        set((state) => ({ answers: { ...state.answers, [qId]: answer } })),

      toggleFlag: (qId) =>
        set((state) => ({
          flags: { ...state.flags, [qId]: !state.flags[qId] },
        })),

      toggleGuess: (qId) =>
        set((state) => ({
          guessed: { ...state.guessed, [qId]: !state.guessed[qId] },
        })),

      toggleEliminate: (qId, optionKey) =>
        set((state) => {
          const currentElims = state.eliminated[qId] || [];
          const newElims = currentElims.includes(optionKey)
            ? currentElims.filter((k) => k !== optionKey)
            : [...currentElims, optionKey];
          return { eliminated: { ...state.eliminated, [qId]: newElims } };
        }),

      jumpTo: (index) =>
        set((state) => {
          if (!state.manifest) return {};
          // Record time for current question before moving
          const currentQ = state.manifest.flatQuestions[state.currentIndex];
          const now = Date.now();
          const timeSpent = now - state.lastNavigationTime;
          const newTimes = { ...state.questionTimes };
          
          if (currentQ?.questionId) {
             newTimes[currentQ.questionId] = (newTimes[currentQ.questionId] || 0) + timeSpent;
          }

          return { 
            currentIndex: index,
            questionTimes: newTimes,
            lastNavigationTime: now
          };
        }),

      nextQuestion: () =>
        set((state) => {
          if (!state.manifest) return state;
          
          // Record time
          const currentQ = state.manifest.flatQuestions[state.currentIndex];
          const now = Date.now();
          const timeSpent = now - state.lastNavigationTime;
          const newTimes = { ...state.questionTimes };
          
          if (currentQ?.questionId) {
             newTimes[currentQ.questionId] = (newTimes[currentQ.questionId] || 0) + timeSpent;
          }

          const max = state.manifest.flatQuestions.length - 1;
          return { 
            currentIndex: Math.min(state.currentIndex + 1, max),
            questionTimes: newTimes,
            lastNavigationTime: now
          };
        }),

      prevQuestion: () =>
        set((state) => {
          if (!state.manifest) return {};
           // Record time
          const currentQ = state.manifest.flatQuestions[state.currentIndex];
          const now = Date.now();
          const timeSpent = now - state.lastNavigationTime;
          const newTimes = { ...state.questionTimes };
          
          if (currentQ?.questionId) {
             newTimes[currentQ.questionId] = (newTimes[currentQ.questionId] || 0) + timeSpent;
          }

          return {
            currentIndex: Math.max(state.currentIndex - 1, 0),
            questionTimes: newTimes,
            lastNavigationTime: now
          };
        }),

      toggleDrawer: (val) =>
        set((state) => ({
          isDrawerOpen: val !== undefined ? val : !state.isDrawerOpen,
        })),

      decrementTimer: () =>
        set((state) => {
          if (state.secondsRemaining === null || state.secondsRemaining <= 0)
            return { secondsRemaining: 0 };
          return { secondsRemaining: state.secondsRemaining - 1 };
        }),

      setTimer: (seconds) => set({ secondsRemaining: seconds }),

      // Clear Session Data (Called after submission)
      clearSession: () =>
        set({
          sessionId: null,
          answers: {},
          flags: {},
          guessed: {},
          eliminated: {},
          currentIndex: 0,
          questionTimes: {},
          secondsRemaining: null,
          // We keep manifest in case they navigate back, but session data is gone
        }),

      getCurrentQuestion: () => {
        const state = get();
        if (!state.manifest) return { question: undefined, group: undefined };

        const flatQ = state.manifest.flatQuestions[state.currentIndex];
        if (!flatQ) return { question: undefined, group: undefined };

        const part = state.manifest.parts.find((p) => p.id === flatQ.partId);
        const group = part?.groups.find((g) => g.id === flatQ.groupId);
        const question = group?.questions.find(
          (q) => q.id === flatQ.questionId
        );

        return { question, group };
      },
    }),
    {
      name: "exam-session-storage",
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        sessionId: state.sessionId,
        answers: state.answers,
        flags: state.flags,
        guessed: state.guessed,
        eliminated: state.eliminated,
        currentIndex: state.currentIndex,
        questionTimes: state.questionTimes,
        secondsRemaining: state.secondsRemaining,
      }),
    }
  )
);
