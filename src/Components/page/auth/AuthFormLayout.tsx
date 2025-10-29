import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CardComponent } from "@/Components/ui/CardComponent";
import RightPhoto from "@/assets/photo/0f7901bdde99e71fb762f31ebcbead3c.jpg";

type Props = {
  title: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  bottomText: string;
  bottomLinkHref: string;
  bottomLinkText: string;
  className?: string;
};

export function AuthFormLayout({
  title,
  footer,
  children,
  bottomText,
  bottomLinkHref,
  bottomLinkText,
  className,
}: Props) {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      {/* ✅ Background Image */}
      <Image
        src={RightPhoto}
        alt="Background"
        fill
        priority
        className="object-cover z-0 
          filter brightness-90 dark:brightness-40 
          contrast-100 dark:contrast-90"
      />

      {/* ✅ Overlay (optional for readability) */}
      <div className="absolute inset-0 bg-background/60 z-10" />

      {/* ✅ Foreground Auth Card */}
      <div className="relative z-20 px-4 py-8 w-full max-w-md">
        <div className="mb-4 text-xl font-bold text-primary text-center">
          PRVEMY-<span className="text-destructive">TOEIC</span>
        </div>

        <CardComponent
          title={title}
          footer={footer}
          className={cn("text-center h-[60vh]", className)}
        >
          {children}
        </CardComponent>

        <p className="mt-4 text-sm text-muted-foreground text-center">
          {bottomText}
          <Link
            href={bottomLinkHref}
            className="text-primary hover:underline ml-1"
          >
            {bottomLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}
