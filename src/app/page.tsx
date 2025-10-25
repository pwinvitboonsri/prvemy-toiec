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
import { LabelComponent } from "@/Components/ui/LabelComponent";
import { InputComponent } from "@/Components/ui/InputComponent";

import { Star, Heart } from "lucide-react";

export default function Home() {
  return (
    <PageWrapper>
      <main className=" font-bold  ">
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
            actionLabel="Sign Up"
            onActionClick={() => console.log("Go to sign up")}
            footer={
              <>
                <Button type="submit">Login</Button>
                <Button variant="outline">Login with Google</Button>
              </>
            }
          >
            <form className="space-y-6">
              <div className="grid gap-2">
                <LabelComponent htmlFor="email">Email</LabelComponent>
                <InputComponent
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <LabelComponent htmlFor="password">Password</LabelComponent>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <InputComponent id="password" type="password" required />
              </div>
            </form>
          </CardComponent>

          <CardComponent
            title="New Feature"
            description="See how you've improved"
            // action={<Badge variant="outline">Beta</Badge>}
            footer={<Button variant="ghost">Try it now</Button>}
          >
            <p className="text-muted-foreground">
              Our new AI tutor tracks your weakest TOEIC areas and gives
              targeted practice.
            </p>
          </CardComponent>

          <CardComponent
            title="Your Score"
            description="Average TOEIC Mock Test"
          >
            <div className="text-6xl font-bold text-center text-accent">
              805
            </div>
          </CardComponent>

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
