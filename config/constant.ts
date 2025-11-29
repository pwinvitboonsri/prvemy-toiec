// 1. COMMERCE CONSTANTS
export const PRICING = {
  FREE_TIER_ID: "price_free_tier",
  // Future real IDs from Stripe/Omise:
  // THB_199: 'price_1Q5xYz...',
} as const;

// 2. SUBSCRIPTION TIERS (For logic checks)
export const TIERS = {
  FREE: 0,
  STANDARD: 1,
  PREMIUM: 2,
} as const;

// 3. EXAM STATUS
export const EXAM_STATUS = {
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  ABANDONED: "abandoned",
} as const;

// 4. TOEIC PARTS CONFIGURATION
// This helps your UI know how to render each part
export const PART_TYPES = {
  LISTENING: [1, 2, 3, 4],
  READING: [5, 6, 7],
  HAS_IMAGES: [1],
  HAS_AUDIO: [1, 2, 3, 4],
  HAS_PASSAGE: [6, 7],
} as const;

export const DEFAULT_SETTINGS = {
  mode: "simulation",
  timer_minutes: 120,
  playback_speed: 1.0,
} as const;
