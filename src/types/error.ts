// Error categorisation
export type ErrorSource =
  | 'client'
  | 'server'
  | 'supabase'
  | 'auth'
  | 'form'
  | 'network'
  | 'unexpected';

export type AppError = {
  id: string;
  source: ErrorSource
  title: string;
  message: string;
  field?: string; // ✅ can be any field like "email", "username", "price", etc.
  location?: string; // ✅ optional: page/component like "LoginPage", "RegisterForm"
  timestamp: number;
  autoDismiss?: boolean;
};