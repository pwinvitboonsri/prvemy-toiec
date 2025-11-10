import type { UserRole } from './user';

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

// Future table definitions
// export type TestRow = { /* TODO: define test table schema */ };
// export type BookRow = { /* TODO: define book table schema */ };
