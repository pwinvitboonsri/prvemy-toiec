"use client";

import { CardComponent } from "@/Components/ui/CardComponent";
import { Skeleton } from "@/Components/ui/primitives/skeleton";

export function BookDetailSkeleton() {
    return (
        <div className="min-h-screen p-4 md:p-8 relative">
            {/* Background noise placeholder */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.08] z-0"
                style={{
                    backgroundImage: "radial-gradient(#111111 1px, transparent 1px)",
                    backgroundSize: "6px 6px",
                }}
            ></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-8">
                    <div className="flex gap-2 max-w-[200px] mb-2 opacity-60">
                        <Skeleton className="h-4 w-[100px]" />
                        <span>/</span>
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                    <div className="border-b-2 border-[#111111] pb-6 space-y-4">
                        <Skeleton className="h-[3.5rem] w-[60%] md:w-1/2 bg-gray-200" />
                        <div className="flex gap-3">
                            <Skeleton className="h-6 w-32 bg-gray-200" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                    {/* LEFT COL */}
                    <div className="md:col-span-5 flex flex-col gap-8">
                        {/* Book Cover Skeleton */}
                        <CardComponent className="aspect-[3/4] p-0 overflow-hidden relative border-[#111111]" noPadding>
                            <div className="absolute inset-0 bg-[#f0f0f0]">
                                <div className="absolute bottom-0 left-0 top-0 z-20 w-3 md:w-4 border-r border-[#111111]/10 bg-black/5"></div>
                                <div className="flex h-full flex-col items-center justify-center opacity-30">
                                    <div className="border-4 border-gray-300 p-6 text-center flex flex-col items-center">
                                        <Skeleton className="h-12 w-24 mb-2 bg-gray-300" />
                                        <Skeleton className="h-20 w-32 bg-gray-300" />
                                    </div>
                                </div>
                            </div>
                            {/* Simulated Bottom Overlay */}
                            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-white border-t-2 border-[#111111] p-3 flex flex-col justify-between">
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-[60%] bg-gray-100" />
                                    <div className="h-0.5 w-full bg-[#111111] opacity-20"></div>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <div className="flex justify-between"><Skeleton className="h-4 w-[30%] bg-gray-100" /><Skeleton className="h-4 w-[10%] bg-gray-100" /></div>
                                    <div className="flex justify-between"><Skeleton className="h-4 w-[40%] bg-gray-100" /><Skeleton className="h-4 w-[15%] bg-gray-100" /></div>
                                </div>
                            </div>
                        </CardComponent>

                        {/* Manifest List Skeleton */}
                        <CardComponent className="relative w-full z-10" noPadding taped>
                            <div className="p-6">
                                <div className="mb-4 flex items-end justify-between border-b-2 border-[#111111] pb-2">
                                    <Skeleton className="h-6 w-24 bg-gray-200" />
                                    <Skeleton className="h-4 w-12 bg-gray-200" />
                                </div>
                                <div className="space-y-0">
                                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                        <div key={i} className="grid grid-cols-12 gap-2 border-b border-dashed border-gray-200 py-2 last:border-0">
                                            <Skeleton className="col-span-2 h-4 opacity-50 bg-gray-100" />
                                            <Skeleton className="col-span-8 h-4 bg-gray-100" />
                                            <Skeleton className="col-span-2 h-4 bg-gray-100" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardComponent>
                    </div>

                    {/* RIGHT COL */}
                    <div className="md:col-span-7 flex flex-col gap-8 h-full">
                        {/* Action Card Skeleton */}
                        <CardComponent className="w-full shrink-0 z-20" noPadding>
                            <div className="flex flex-col -m-0.5"> {/* Compensate for Card border if needed, usually noPadding handles it */}
                                <div className="flex items-center justify-between border-b-2 border-[#111111] bg-[#111111] px-6 py-3">
                                    <Skeleton className="h-3 w-32 bg-white/20 rounded-none" />
                                    <Skeleton className="h-3 w-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="flex flex-col md:flex-row p-8 gap-6 bg-white min-h-[12rem] items-center">
                                    <div className="flex-1 space-y-4">
                                        <Skeleton className="h-12 w-[80%] bg-gray-100" />
                                        <Skeleton className="h-6 w-full bg-gray-100" />
                                        <Skeleton className="h-4 w-[60%] bg-gray-100" />
                                    </div>
                                    <Skeleton className="w-full md:w-32 h-14 bg-gray-100 rounded-none" />
                                </div>
                            </div>
                        </CardComponent>

                        {/* Flight Records Skeleton (Matches FlightRecords.tsx) */}
                        <CardComponent className="min-h-[18rem] w-full bg-white relative" sideLabel="LOADING..." footerClassName="bg-white border-dashed">
                            <div className="flex flex-col h-full">
                                <div className="mb-6 flex items-start justify-between">
                                    <div>
                                        <Skeleton className="h-8 w-48 mb-2 bg-gray-200" />
                                        <Skeleton className="h-3 w-32 bg-gray-200" />
                                    </div>
                                </div>
                                {/* Graph Placeholder */}
                                <div className="flex-1 flex items-end gap-1 mt-4 opacity-50">
                                    {[40, 60, 30, 70, 50, 80, 40, 60].map((h, i) => (
                                        <Skeleton key={i} className="flex-1 bg-gray-200 rounded-t-sm" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>
                        </CardComponent>

                        {/* Tactical Intel Skeleton */}
                        <div className="h-32 w-full border-2 border-[#111111] bg-gray-50 flex items-center justify-center">
                            <Skeleton className="h-8 w-16 bg-gray-200" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
