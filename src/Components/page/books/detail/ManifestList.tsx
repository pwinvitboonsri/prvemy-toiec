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
    <div className="relative flex-1 border-2 border-[#111111] bg-white p-6 shadow-[4px_4px_0px_#1d3b88]">
      {/* Yellow Tape Decoration */}
      <div className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-1 bg-[#ffe800] shadow-sm opacity-90"></div>

      {/* Header */}
      <div className="mb-4 flex items-end justify-between border-b-2 border-[#111111] pb-2">
        <h3 className="text-xl font-black uppercase text-[#111111]">Manifest</h3>
        <span className="font-mono text-xs font-bold text-[#111111]">200 Qs</span>
      </div>

      {/* List */}
      <div className="space-y-0 text-sm">
        {MANIFEST_ITEMS.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-2 border-b border-dashed border-gray-300 py-2 text-[#111111] last:border-0"
          >
            <div className="col-span-2 font-mono text-xs opacity-60 pt-0.5">{item.id}</div>
            <div className="col-span-8 font-bold uppercase text-xs md:text-sm">{item.type}</div>
            <div className="col-span-2 text-right font-mono text-xs font-bold">{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}