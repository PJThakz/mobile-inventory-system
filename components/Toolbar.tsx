import { LayoutGrid, List } from "lucide-react";

import { SORT_OPTIONS, SortKey } from "@/lib/filterProducts";

export type ViewMode = "grid" | "list";

type ToolbarProps = {
  count: number;
  sort: SortKey;
  setSort: (value: SortKey) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  view: ViewMode;
  setView: (value: ViewMode) => void;
};

export default function Toolbar({
  count,
  sort,
  setSort,
  inStockOnly,
  setInStockOnly,
  view,
  setView,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <h2
        aria-live="polite"
        className="mr-auto font-display text-xl font-bold text-[#0a1a38] sm:text-2xl"
      >
        {count} {count === 1 ? "product" : "products"}
      </h2>

      <button
        type="button"
        role="switch"
        aria-checked={inStockOnly}
        onClick={() => setInStockOnly(!inStockOnly)}
        className="flex min-h-10 items-center gap-2.5 text-sm font-medium text-slate-800"
      >
        <span
          className={`relative h-6 w-11 rounded-full transition-colors ${
            inStockOnly ? "bg-[#0b4ea2]" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform ${
              inStockOnly ? "translate-x-5" : ""
            }`}
          />
        </span>
        In stock only
      </button>

      {/* text-base on phones stops iPhones from zooming in when the menu opens */}
      <select
        aria-label="Sort products"
        value={sort}
        onChange={(e) => setSort(e.target.value as SortKey)}
        className="h-10 rounded-lg bg-white pl-3 pr-8 text-base font-medium text-slate-800 ring-1 ring-[#cdd9ec] sm:text-sm"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div
        role="group"
        aria-label="Layout"
        className="flex rounded-lg bg-white p-1 ring-1 ring-[#cdd9ec]"
      >
        {(
          [
            { mode: "grid", label: "Grid view", Icon: LayoutGrid },
            { mode: "list", label: "List view", Icon: List },
          ] as const
        ).map(({ mode, label, Icon }) => (
          <button
            key={mode}
            type="button"
            onClick={() => setView(mode)}
            aria-pressed={view === mode}
            aria-label={label}
            className={`flex size-8 items-center justify-center rounded-md transition ${
              view === mode
                ? "bg-[#0b4ea2] text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Icon className="size-4" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}
