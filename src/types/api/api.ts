// Generic API response wrapper
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Authentication request payloads
export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

// Example response payloads
export type TestMetadata = {
  id: string;
  title: string;
  description?: string;
  durationMinutes: number;
};

export type FetchTestListResponse = ApiResponse<TestMetadata[]>;
