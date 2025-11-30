"use client";

const MANIFEST_ITEMS = [
  { id: "01", type: "Photographs", count: 6 },
  { id: "02", type: "Q&A", count: 25 },
  { id: "03", type: "Conversations", count: 39 },
  { id: "04", type: "Talks", count: 30 },
  { id: "05", type: "Sentences", count: 30 },
  { id: "06", type: "Completion", count: 16 },
  { id: "07", type: "Reading Comp", count: 54 },
];

export function ManifestList() {
  return (
    <div className="relative flex-1 border-2 border-foreground bg-card p-6">
      {/* Decorative Tape */}
      <div className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-1 bg-accent opacity-90 shadow-sm z-10"></div>

      {/* Header */}
      <div className="mb-4 flex items-end justify-between border-b-2 border-foreground pb-2">
        <h3 className="text-xl font-black uppercase">Manifest</h3>
        <span className="font-mono text-xs font-bold">200 Qs</span>
      </div>

      {/* List */}
      <div className="space-y-0 text-sm font-mono">
        <div className="mb-2 grid grid-cols-12 gap-2 text-[10px] font-bold uppercase text-muted-foreground">
          <div className="col-span-2">#</div>
          <div className="col-span-8">Type</div>
          <div className="col-span-2 text-right">Qty</div>
        </div>

        {MANIFEST_ITEMS.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-2 border-b border-dashed border-foreground/20 py-2 transition-colors last:border-0 hover:bg-accent/10"
          >
            <div className="col-span-2 opacity-60">{item.id}</div>
            <div className="col-span-8 font-bold uppercase">{item.type}</div>
            <div className="col-span-2 text-right font-bold">{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
