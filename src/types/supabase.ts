import type { UserRole } from "./user";

// Supabase table utility helpers
export type SupabaseTable<TableName extends string, Row> = {
  table: TableName;
  row: Row;
};

// Profile table definition
export type ProfileRow = {
  id: string;
  name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          role: "user" | "admin"; // or import UserRole
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string;
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
    };
  };
};
