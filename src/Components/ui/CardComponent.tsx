"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/Components/ui/shadcn-lib/card";
import { SkeletonComponent } from "@/Components/ui/SkeletonComponent";
import { cn } from "@/lib/utils";

type FormCardProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  loading?: boolean;
};

export function CardComponent({
  title,
  description,
  actionLabel,
  onActionClick,
  children,
  footer,
  className,
  loading = false,
}: FormCardProps) {
  return (
    <Card
      className={cn("w-full max-w-md h-[70vh] flex flex-col ", className)} // <- 💡 Use flex-col + fixed height
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {loading ? (
              <>
                <SkeletonComponent height="1.25rem" width="60%" />
                <SkeletonComponent height="1rem" width="80%" className="mt-1" />
              </>
            ) : (
              <>
                <CardTitle>{title}</CardTitle>
                {description && (
                  <CardDescription className="mt-1">
                    {description}
                  </CardDescription>
                )}
              </>
            )}
          </div>

          {!loading && actionLabel && onActionClick && (
            <CardAction>
              <button
                onClick={onActionClick}
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                {actionLabel}
              </button>
            </CardAction>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        {loading ? (
          <>
            <SkeletonComponent height="1.5rem" />
            <SkeletonComponent height="1.5rem" width="90%" />
            <SkeletonComponent height="1.5rem" width="70%" />
          </>
        ) : (
          children
        )}
      </CardContent>

      {footer && (
        <CardFooter className="flex flex-col gap-2 w-full [&>*]:w-full">
          {loading ? (
            <>
              <SkeletonComponent height="2.5rem" />
              <SkeletonComponent height="2.5rem" width="80%" />
            </>
          ) : (
            footer
          )}
        </CardFooter>
      )}
    </Card>
  );
}
