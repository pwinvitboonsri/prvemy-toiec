import { PRICING } from "../../../config/constant";

// Updated UserRole to support the new Platinum tier and others
export type UserRole = "guest" | "premium" | typeof PRICING.TIER_NAMES[keyof typeof PRICING.TIER_NAMES];
export type AccessType = "guest" | "free" | "premium" | "one-time";

export type ManifestItem = {
  partId: string;
  number: number;
  title: string;
  questionCount: number;
};

export type BookDetailData = {
  id: string;
  title: string;
  description: string;
  coverUrl: string | null;
  // Stats
  questionCount: number;
  duration: number; // in minutes
  difficulty: "EASY" | "MEDIUM" | "HARD";
  // Access & Commerce
  accessType: AccessType;
  price: number | null;
  releaseDate: string | null;
  // User Context
  userStatus: UserRole;
  actionState:
    | "resume"
    | "start"
    | "buy"
    | "locked_time"
    | "locked_price"
    | "login_required"
    | "upgrade_required";
  // History
  bestScore?: number | null;
  listeningScore?: number | null; // Added
  readingScore?: number | null; // Added
  scoreTrend?: number[]; // Added: Array of recent scores
  sessionsCount?: number;
  lastSessionId: string | null;
  // Global Stats (Community Intelligence)
  globalStats?: {
    avgScore: number;
    avgListening: number;
    avgReading: number;
    totalTakers: number;
    updatedAt: string | null;
  };
  // Content
  manifest: ManifestItem[];
};

export interface LibraryBook {
  id: string;
  title: string;
  subtitle: string;
  category: "ETS" | "VOCAB" | "GRAMMAR" | "BIZ";
  questionCount?: number;
  access: AccessType;
  isEarlyAccess?: boolean;
  releaseDate?: string;
  coverColor: string;
  coverText: string;
  tabLabel: string;
  progress?: number;
}

// Mock Data (Placeholder)
export const LIBRARY_BOOKS: LibraryBook[] = [];

export type CustomUser = {
  id: string;
  email?: string;
  subscription_tier?: string;
  subscription_status?: string;
};
