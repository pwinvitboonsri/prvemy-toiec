// Shared pagination parameters
export type PaginationParams = {
  page: number;
  limit: number;
};

// Common filtering parameters
export type FilterParams = {
  search?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
};

// Utility helpers
export type Nullable<T> = T | null;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
