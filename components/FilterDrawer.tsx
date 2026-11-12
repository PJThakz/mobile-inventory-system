"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import FilterPanel, { FilterPanelProps } from "./FilterPanel";

type FilterDrawerProps = FilterPanelProps & {
  open: boolean;
  onClose: () => void;
  resultCount: number;
  activeCount: number;
  onClear: () => void;
};

// Bottom sheet on phones, side panel on tablets and desktops.
export default function FilterDrawer({
  open,
  onClose,
  resultCount,
  activeCount,
  onClear,
  ...panelProps
}: FilterDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    // Move keyboard focus into the panel when it opens.
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      inert={!open}
    >
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`absolute inset-0 bg-[#0a1a38]/50 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className={`absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-2xl bg-white transition-transform duration-300 md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[400px] md:rounded-none ${
          // The shadow only shows while open, so it can't leak onto the page edge when closed.
          open
            ? "translate-y-0 shadow-2xl md:translate-x-0"
            : "translate-y-full md:translate-y-0 md:translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-display text-xl font-bold text-[#0a1a38]">Filters</h2>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex size-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-2 pt-5">
          <FilterPanel {...panelProps} />
        </div>

        <div className="flex gap-3 border-t border-slate-200 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
          <button
            type="button"
            onClick={onClear}
            disabled={activeCount === 0}
            className="min-h-12 rounded-lg px-5 font-semibold text-slate-800 ring-1 ring-slate-300 transition enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={onClose}
            className="min-h-12 flex-1 rounded-lg bg-[#0a1a38] px-5 font-semibold text-white transition hover:bg-slate-800"
          >
            Show {resultCount} {resultCount === 1 ? "product" : "products"}
          </button>
        </div>
      </div>
    </div>
  );
}
