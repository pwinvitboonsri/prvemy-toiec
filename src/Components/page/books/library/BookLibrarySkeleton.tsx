"use client";

import { Skeleton } from "@/Components/ui/primitives/skeleton";

export function BookLibrarySkeleton() {
    return (
        <div className="min-h-screen bg-background font-sans relative text-foreground">
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.08] z-0"
                style={{
                    backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                    backgroundSize: "6px 6px",
                    color: "hsl(var(--foreground))",
                }}
            ></div>
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.15] z-50 mix-blend-multiply"
                style={{
                    filter: "contrast(120%) brightness(100%)",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            ></div>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start p-4 md:p-8 relative z-10">
                {/* --- LEFT SIDEBAR SKELETON --- */}
                <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-30">
                    <div>
                        <Skeleton className="h-10 w-48 mb-2 bg-foreground/10" />
                        <Skeleton className="h-4 w-32 bg-foreground/10" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-3 w-20 mb-3 ml-2 bg-foreground/10" />

                        <NavButtonSkeleton />
                        <NavButtonSkeleton />
                        <NavButtonSkeleton />

                        <div className="h-6"></div>

                        <Skeleton className="h-3 w-20 mb-3 ml-2 bg-foreground/10" />
                        <NavButtonSkeleton />
                    </div>
                </aside>

                {/* --- RIGHT CONTENT SKELETON --- */}
                <section className="lg:col-span-9 space-y-8">
                    {/* SEARCH & FILTER BAR SKELETON */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <Skeleton className="flex-1 h-[50px] bg-muted border-2 border-transparent shadow-none" />
                        <Skeleton className="h-[50px] w-40 bg-muted border-2 border-transparent" />
                    </div>

                    {/* BOOK GRID SKELETON */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <BookCardSkeleton key={i} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

function NavButtonSkeleton() {
    return (
        <div className="w-full h-10 border-2 border-transparent mb-1 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 bg-foreground/10" />
                <Skeleton className="w-24 h-3 bg-foreground/10" />
            </div>
            <Skeleton className="w-4 h-3 bg-foreground/10" />
        </div>
    )
}

function BookCardSkeleton() {
    return (
        <div className="flex flex-col border-2 border-foreground/10 bg-white dark:bg-neutral-900 shadow-none">
            {/* Aspect Square Cover */}
            <div className="aspect-square bg-muted dark:bg-neutral-800 relative flex items-center justify-center border-b-2 border-foreground/10">
                <div className="w-32 h-40 border-2 border-foreground/10 bg-muted/50 flex flex-col items-center justify-center relative">
                    <Skeleton className="w-16 h-8 mb-2 bg-foreground/10" />
                    <Skeleton className="w-8 h-4 bg-foreground/10" />
                </div>
                {/* Badge position */}
                <Skeleton className="absolute top-3 right-3 w-16 h-6 bg-foreground/10" />
            </div>

            {/* Info */}
            <div className="flex-1 p-5 flex flex-col gap-3 items-center">
                <Skeleton className="h-6 w-3/4 bg-foreground/10" />
                <Skeleton className="h-3 w-1/2 bg-foreground/10" />
                <div className="mt-auto pt-2">
                    <Skeleton className="h-5 w-20 bg-foreground/5" />
                </div>
            </div>

            {/* Button */}
            <div className="h-12 border-t-2 border-foreground/10 bg-muted/50 w-full"></div>
        </div>
    )
}
