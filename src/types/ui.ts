// UI variant definitions
export type Variant = 'default' | 'destructive' | 'outline';

// Alert component props
export type AlertProps = {
  id: string;
  title: string;
  description: string;
  variant?: Variant;
  autoDismiss?: boolean;
  onDismiss?: () => void;
};

// Skeleton loading shapes
export type SkeletonShape = 'rectangle' | 'circle' | 'text';

// Placeholder for reusable component props
// export type ButtonProps = { /* TODO: extend from shadcn/ui button */ };
// export type DialogProps = { /* TODO: define shared dialog props */ };
