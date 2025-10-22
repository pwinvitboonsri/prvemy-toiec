import { FlipButton } from "@/Components/ui/shadcn-io/flip-button";

export function FlipButtonDemo() {
  return (
    <FlipButton
      frontText="Learn More"
      backText="Discover →"
      from="left"
      frontClassName="bg-secondary"
      backClassName="bg-primary"
    />
  );
}
