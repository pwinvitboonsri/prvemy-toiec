"use client";

import Image from "next/image";
import ThemeToggleButtonPolygon from "@/Components/ui/ThemeToggle";
import { Card } from "@/Components/ui/Card";
import { Button } from "@/Components/ui/Button/Button";
import { Grid } from "@/Components/layout/Grid";
import { PageWrapper } from "@/Components/layout/PageWrapper";
import { Section } from "@/Components/layout/Section";
import { AnimatedSlideButton } from "@/Components/ui/Button/AnimatedSlideButton";
import { CounterComponent } from "@/Components/ui/Button/CounterComponent";
import { FlipButton } from "@/Components/ui/shadcn-io/flip-button";

export default function Home() {
  return (
    <PageWrapper>
      <main className=" font-bold w-full h-screen relative">
        <div className="flex flex-col gap-10 items-center justify-center h-full">
          <h1 className="text-6xl">Adding dark mode switcher</h1>
          <h2 className="text-4xl">
            using{" "}
            <span className=" rounded p-2 bg-muted-foreground text-white">
              shadcn
            </span>
          </h2>
          <Grid cols={4} gap="gap-x-4 gap-y-10">
            <Section as="div" padded={false}>
              <Card
                title="Welcome"
                description="Let's get started with your TOEIC prep"
                actions={<Button variant="outline">Manage</Button>}
              >
                <p className="text-sm text-muted-foreground">
                  You have 3 mock tests assigned.
                </p>
              </Card>
              <Card
                title="Welcome"
                description="Let's get started with your TOEIC prep"
                actions={<Button variant="outline">Manage</Button>}
              >
                <p className="text-sm text-muted-foreground">
                  You have 3 mock tests assigned.
                </p>
              </Card>
            </Section>
            <Card
              title="Welcome"
              description="Let's get started with your TOEIC prep"
              actions={<Button variant="outline">Manage</Button>}
            >
              <p className="text-sm text-muted-foreground">
                You have 3 mock tests assigned.
              </p>
            </Card>
            <Section as="div">
              <Card
                title="Welcome"
                description="Let's get started with your TOEIC prep"
                actions={<Button variant="outline">Manage</Button>}
              >
                <p className="text-sm text-muted-foreground">
                  You have 3 mock tests assigned.
                </p>
              </Card>
            </Section>
          </Grid>
          <CounterComponent
            defaultValue={10}
            min={0}
            max={100}
            step={5}
            onChange={(val) => console.log("Current value:", val)}
            className="mt-6"
          />
          <FlipButton />
          <ThemeToggleButtonPolygon />
        </div>
      </main>
    </PageWrapper>
  );
}
