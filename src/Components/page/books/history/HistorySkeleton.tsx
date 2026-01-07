"use client";

import { CardComponent } from "@/Components/ui/CardComponent";
import { Skeleton } from "@/Components/ui/primitives/skeleton";

export function HistorySkeleton() {
    return (
        <div className="min-h-screen bg-background font-sans overflow-x-hidden">
            <main className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-10 pb-40">

                {/* HERO SECTION SKELETON */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-stretch">
                    {/* LEFT: MISSION HISTORY (60%) */}
                    <div className="lg:col-span-8 flex">
                        <CardComponent
                            className="bg-[#ffe800]/20 flex-1 relative overflow-hidden h-40 md:h-48 border-2 border-[#111111]/10"
                            noPadding
                        >
                            <div className="flex flex-col justify-center p-5 md:p-6 w-full h-full gap-3">
                                <Skeleton className="h-4 w-32 bg-[#111111]/10" />
                                <Skeleton className="h-10 w-3/4 bg-[#111111]/10" />
                                <Skeleton className="h-3 w-40 bg-[#111111]/10" />
                            </div>
                        </CardComponent>
                    </div>

                    {/* RIGHT: STATS (30%) */}
                    <aside className="lg:col-span-4 flex">
                        <CardComponent
                            className="bg-primary/10 flex-1 relative overflow-hidden h-40 md:h-48 border-2 border-[#111111]/10"
                            noPadding
                        >
                            <div className="flex flex-row items-center justify-between gap-4 p-5 md:p-6 w-full h-full relative">
                                <div className="flex flex-col gap-2 relative z-10 w-full">
                                    <Skeleton className="h-3 w-24 bg-[#111111]/10" />
                                    <Skeleton className="h-12 w-20 bg-[#111111]/10" />
                                </div>
                                <Skeleton className="h-12 w-12 rounded-full bg-[#111111]/10" />
                            </div>
                        </CardComponent>
                    </aside>
                </section>

                {/* PERFORMANCE DASHBOARD SKELETON */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
                    {/* LEFT: SUMMARY STATS (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <CardComponent className="bg-[#111111]/5 h-64 border-2 border-[#111111]/10" noPadding>
                            <div className="p-6 h-full flex flex-col justify-between">
                                <div className="flex justify-between">
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-20 bg-[#111111]/10" />
                                        <Skeleton className="h-10 w-24 bg-[#111111]/20" />
                                    </div>
                                    <div className="text-right space-y-2">
                                        <Skeleton className="h-3 w-20 ml-auto bg-[#111111]/10" />
                                        <Skeleton className="h-8 w-16 ml-auto bg-[#111111]/20" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Skeleton className="h-3 w-20 bg-[#111111]/10" />
                                        <Skeleton className="h-3 w-20 bg-[#111111]/10" />
                                    </div>
                                    <Skeleton className="h-3 w-full bg-[#111111]/10" />
                                </div>
                            </div>
                        </CardComponent>
                    </div>

                    {/* RIGHT: TREND GRAPH (8 cols) */}
                    <div className="lg:col-span-8">
                        <CardComponent className="bg-white h-64 border-2 border-[#111111]/10" noPadding>
                            <div className="p-6 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-6 pb-3">
                                    <Skeleton className="h-5 w-48 bg-[#111111]/10" />
                                    <Skeleton className="h-5 w-32 bg-[#111111]/10" />
                                </div>
                                <div className="flex-1 flex items-end gap-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                                        <Skeleton key={i} className="flex-1 bg-[#111111]/5" style={{ height: `${Math.random() * 60 + 20}%` }} />
                                    ))}
                                </div>
                            </div>
                        </CardComponent>
                    </div>
                </div>

                {/* SEARCH & FILTER SKELETON */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-10 flex h-12 bg-gray-100 rounded-sm">
                        <Skeleton className="w-full h-full bg-[#111111]/5" />
                    </div>
                    <div className="md:col-span-2">
                        <Skeleton className="w-full h-12 bg-[#111111]/5" />
                    </div>
                </section>

                {/* MISSION LOG SKELETON */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 border-b-2 border-dashed border-gray-200 pb-3">
                        <Skeleton className="h-8 w-8 rounded-full bg-[#111111]/10" />
                        <Skeleton className="h-6 w-48 bg-[#111111]/10" />
                    </div>

                    <div className="border-t-2 border-[#111111]/10">
                        {/* Header */}
                        <div className="hidden md:grid grid-cols-12 p-3 gap-4 border-b border-gray-100">
                            <Skeleton className="col-span-3 h-3 bg-[#111111]/5" />
                            <Skeleton className="col-span-2 h-3 bg-[#111111]/5" />
                            <Skeleton className="col-span-4 h-3 bg-[#111111]/5" />
                            <Skeleton className="col-span-3 h-3 bg-[#111111]/5" />
                        </div>

                        {/* Items */}
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-12 p-4 md:p-5 border-b border-gray-100 gap-4 bg-white items-center">
                                <div className="col-span-1 md:col-span-3 space-y-2">
                                    <Skeleton className="h-5 w-32 bg-[#111111]/10" />
                                    <Skeleton className="h-3 w-24 bg-[#111111]/5" />
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <Skeleton className="h-6 w-20 mx-auto bg-[#111111]/5 rounded-sm" />
                                </div>
                                <div className="col-span-1 md:col-span-4 flex justify-center gap-4">
                                    <Skeleton className="h-8 w-16 bg-[#111111]/10" />
                                    <Skeleton className="h-8 w-16 bg-[#111111]/5" />
                                </div>
                                <div className="col-span-1 md:col-span-3 flex justify-end">
                                    <Skeleton className="h-9 w-24 bg-[#111111]/10" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
