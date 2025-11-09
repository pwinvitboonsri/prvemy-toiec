import type { ReactNode } from 'react';

// Next.js dynamic route params
export type PageParams = {
  params: Record<string, string>;
};

// Page metadata definition
export type PageMeta = {
  title: string;
  description?: string;
};

// Shared layout props
export type LayoutProps = {
  children: ReactNode;
};
