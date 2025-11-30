export type BookAccess = "guest" | "free" | "premium" | "one-time-buy";
export type BookCategory = "ETS" | "VOC" | "GRAM" | "BIZ";

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  category: string; // e.g., 'ETS', 'VOCAB'
  access: BookAccess;
  isEarlyAccess?: boolean;
  releaseDate?: string;
  questions?: number;
  time?: string;
  color: "blue" | "red" | "yellow" | "green" | "purple" | "white" | "slate"; // For the cover background
  description?: string;
  isOwned?: boolean;
  price?: number;
}

export interface BookCardProps {
  book: Book;
  userRole: "guest" | "user" | "premium"; // 'user' means logged in but free
}

export interface SpeedPillProps {
  active: boolean;
  disabled?: boolean;
  value: string;
  isPremium?: boolean;
  onClick: () => void;
}
