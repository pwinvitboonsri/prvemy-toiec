import { CardComponent } from "@/Components/ui/CardComponent";
import { SkeletonComponent } from "@/Components/ui/SkeletonComponent";

export default function Loading() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-12 pb-40">
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                    {/* LEFT: Cover Skeleton */}
                    <div className="md:col-span-4 lg:col-span-4 flex flex-col gap-6 relative group perspective-1000">
                        <CardComponent className="aspect-[3/4] p-0 overflow-hidden relative" noPadding>
                            <SkeletonComponent className="w-full h-full" rounded={false} />
                        </CardComponent>
                    </div>

                    {/* RIGHT: Info Skeleton */}
                    <div className="md:col-span-8 lg:col-span-8 flex flex-col gap-6 pt-4">
                        <div className="space-y-4">
                            <SkeletonComponent height="2rem" width="60%" />
                            <SkeletonComponent height="1rem" width="80%" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <SkeletonComponent height="4rem" />
                            <SkeletonComponent height="4rem" />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
