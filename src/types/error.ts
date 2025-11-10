// Error categorisation
export type ErrorSource =
  | 'client'
  | 'server'
  | 'supabase'
  | 'auth'
  | 'form'
  | 'network'
  | 'unexpected';

// Shared app error structure
export type AppError = {
  id: string;
  source: ErrorSource;
  title: string;
  message: string;
  page?: string;
  timestamp: number;
  autoDismiss?: boolean;
};
