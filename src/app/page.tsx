"use client";

import Image from "next/image";
import ThemeToggleButtonPolygon from "@/Components/ui/ThemeToggleComponent";
import { CardComponent } from "@/Components/ui/CardComponent";
import { Button } from "@/Components/ui/Button/Button";
import { Grid } from "@/Components/layout/Grid";
import { PageWrapper } from "@/Components/layout/PageWrapper";
import { Section } from "@/Components/layout/Section";
import {
  AnimatedSlideButton,
  CounterComponent,
  FlipButtonComponent,
  IconButtonComponent,
  LiquidButtonComponent,
  RippleButtonComponent,
} from "@/Components/ui/Button";
import { AvatarComponent } from "@/Components/ui/AvatarComponent";
import { BadgeComponent } from "@/Components/ui/BadgeComponent";
import { AlertCircleIcon, BadgeCheckIcon, CheckIcon } from "lucide-react";

import { Star, Heart } from "lucide-react";

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
          <CardComponent
            title="Login to your account"
            description="Enter your email below to login to your account"
            actions={<Button variant="link">Sign Up</Button>}
            content={<form>...</form>}
            footer={
              <>
                <Button className="w-full">Login</Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </>
            }
          />

          <CounterComponent
            defaultValue={10}
            min={0}
            max={100}
            step={1}
            onChange={(val) => console.log("Current value:", val)}
            className="mt-6"
          />
          <FlipButtonComponent
            frontText="Join Now"
            backText="Welcome! 🎉"
            from="left"
            onClick={() => alert("Button flipped!")}
          />
          <IconButtonComponent
            icon={Star}
            size="lg"
            color={[239, 68, 68]} // red-500
            onChange={(active) => console.log("Heart active:", active)}
          />
          <LiquidButtonComponent>Default</LiquidButtonComponent>
          <RippleButtonComponent
            variant="destructive"
            size="lg"
            onClick={() => console.log("Boom 💥")}
          >
            Delete
          </RippleButtonComponent>
          <div className="flex -space-x-2">
            <AvatarComponent src="/img1.png" fallback="AB" />
            <AvatarComponent src="/img2.png" fallback="CD" />
            <AvatarComponent src="/img3.png" fallback="EF" />
          </div>
          <div className="flex flex-wrap gap-2">
            <BadgeComponent label="Default" />
            <BadgeComponent
              label="Verified"
              icon={BadgeCheckIcon}
              variant="secondary"
            />
            <BadgeComponent label="Destructive" variant="destructive" />
            <BadgeComponent label="Outline" variant="outline" />
            <BadgeComponent
              label="99"
              variant="destructive"
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            />
            <BadgeComponent
              label="20+"
              variant="outline"
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            />
          </div>
          <ThemeToggleButtonPolygon />
        </div>
      </main>
    </PageWrapper>
  );
}
