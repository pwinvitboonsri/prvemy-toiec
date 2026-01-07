// User role types
export type UserRole = 'guest' | 'user' | 'admin';

// User profile structure
export type UserProfile = {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatarUrl?: string;
  bio?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};
