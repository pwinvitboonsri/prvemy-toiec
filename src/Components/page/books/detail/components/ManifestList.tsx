"use client";

import { cn } from "@/utils/utils";
import { CardComponent } from "@/Components/ui/CardComponent";
import { ManifestItem } from "@/types/data/library_data";

interface ManifestListProps {
  items?: ManifestItem[];
}

export function ManifestList({ items = [] }: ManifestListProps) {
  // Fallback for visual testing if DB is empty
  const displayItems =
    items.length > 0
      ? items
      : [
        { partId: "1", number: 1, title: "Photographs", questionCount: 6 },
        { partId: "2", number: 2, title: "Q&A", questionCount: 25 },
        { partId: "3", number: 3, title: "Conversations", questionCount: 39 },
        { partId: "4", number: 4, title: "Talks", questionCount: 30 },
        { partId: "5", number: 5, title: "Sentences", questionCount: 30 },
        { partId: "6", number: 6, title: "Completion", questionCount: 16 },
        { partId: "7", number: 7, title: "Reading Comp", questionCount: 54 },
      ];

  // Calculate Total
  const totalQs = displayItems.reduce((acc, i) => acc + i.questionCount, 0);

  return (
    <CardComponent
      taped={true}
      className="relative w-full h-full max-w-full bg-white dark:bg-neutral-900 overflow-visible z-10"
      noPadding={true}
    >
      <div className="flex flex-col h-full relative">
        <div className="p-6">
          {/* Header */}
          <div className="mb-4 flex items-end justify-between border-b-2 border-foreground pb-2">
            <h3 className="text-xl font-black uppercase text-foreground">
              Manifest
            </h3>
            <span className="font-mono text-xs font-bold text-foreground">
              {totalQs} Qs
            </span>
          </div>

          {/* List */}
          <div className="space-y-0 text-sm">
            {displayItems.map((item) => (
              <div
                key={item.partId}
                className="grid grid-cols-12 gap-2 border-b border-dashed border-border py-2 text-card-foreground last:border-0"
              >
                <div className="col-span-2 font-mono text-xs opacity-60 pt-0.5">
                  {item.number.toString().padStart(2, "0")}
                </div>
                <div className="col-span-8 font-bold uppercase text-xs md:text-sm truncate pr-2">
                  {item.title}
                </div>
                <div className="col-span-2 text-right font-mono text-xs font-bold">
                  {item.questionCount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardComponent>
  );
}
