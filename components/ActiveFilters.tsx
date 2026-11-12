import { X } from "lucide-react";

export type ActiveFilter = {
  key: string;
  label: string;
  onRemove: () => void;
};

type ActiveFiltersProps = {
  filters: ActiveFilter[];
  onClearAll: () => void;
};

export default function ActiveFilters({
  filters,
  onClearAll,
}: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter.key}
          type="button"
          onClick={filter.onRemove}
          aria-label={`Remove filter ${filter.label}`}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white px-3 text-sm font-medium text-[#0a1a38] ring-1 ring-slate-300 transition hover:bg-slate-50"
        >
          {filter.label}
          <X className="size-3.5" aria-hidden="true" />
        </button>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="min-h-9 px-2 text-sm font-semibold text-slate-700 underline underline-offset-2 hover:text-[#0a1a38]"
      >
        Clear all
      </button>
    </div>
  );
}
