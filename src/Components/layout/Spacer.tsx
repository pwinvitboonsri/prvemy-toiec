export function Spacer({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const heights = {
    sm: "h-4",
    md: "h-8",
    lg: "h-16",
  };
  return <div className={heights[size]} />;
}
