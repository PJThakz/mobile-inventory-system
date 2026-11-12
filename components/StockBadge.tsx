import { Availability } from "@/types/products";

const styles = {
  in: { dot: "bg-emerald-500", label: "In stock", text: "text-emerald-800" },
  low: { dot: "bg-amber-500", label: "Low stock", text: "text-amber-800" },
  out: { dot: "bg-red-500", label: "Out of stock", text: "text-red-800" },
} as const;

type StockBadgeProps = {
  availability: Availability;
  // Only present when SHOW_STOCK_COUNT is true in lib/config.ts.
  stockCount?: number;
};

export default function StockBadge({
  availability,
  stockCount,
}: StockBadgeProps) {
  const style = styles[availability];

  return (
    <p className={`flex items-center gap-1.5 text-sm font-medium ${style.text}`}>
      <span
        className={`size-2 shrink-0 rounded-full ${style.dot}`}
        aria-hidden="true"
      />
      {style.label}
      {stockCount !== undefined && availability !== "out"
        ? ` (${stockCount} units)`
        : ""}
    </p>
  );
}
