/**
 * DB MASTER SYNC: 2026-01-05
 * These constants are mapped directly to your Supabase schema and RLS policies.
 */

// 1. COMMERCE & PRICING
// Based on 'profiles.subscription_tier' and 'books.one_time_price_id'
export const PRICING = {
  FREE_TIER_ID: "price_free_tier",
  TIER_NAMES: {
    FREE: "free",
    SILVER: "silver",
    GOLD: "gold",
    PLATINUM: "platinum",
  }
} as const;

// 2. SUBSCRIPTION TIERS (Logic Ranking)
// Matches your 'profiles.subscription_tier' column default and RLS logic
export const TIERS = {
  FREE: 0,
  SILVER: 1,
  GOLD: 2,
  PLATINUM: 3,
} as const;

// 3. EXAM SESSION STATUS
// Matches 'exam_sessions.status' column default 'in_progress'::text
export const EXAM_STATUS = {
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  ABANDONED: "abandoned",
  PAUSED: "paused", // Added for session management logic
} as const;

// 4. TOEIC ARCHITECTURE (Based on 'parts' table structure)
// This mapping matches how you've structured your foreign keys: 
// books -> parts -> question_groups -> questions
export const TOEIC_PARTS = {
  LISTENING: {
    ids: [1, 2, 3, 4],
    has_audio: true,
    has_images: [1], // Only Part 1 typically has images in TOEIC
  },
  READING: {
    ids: [5, 6, 7],
    has_passage: [6, 7], // Part 6 (Text Completion) & 7 (Reading Comprehension)
    has_audio: false,
  }
} as const;

// 5. SESSION DEFAULTS
// Based on 'exam_sessions.settings' JSONB structure
export const DEFAULT_EXAM_SETTINGS = {
  mode: "simulation", // Options: 'simulation', 'practice'
  timer_minutes: 120,
  playback_speed: 1.0,
  allow_backtracking: true,
  show_instant_feedback: false, // False for simulation mode
} as const;

// 6. DB AUDIT CONSTANTS
// For use with your 'audit_log' table
export const DB_OPERATIONS = {
  INSERT: 'INSERT',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
} as const;