import {
  Headphones,
  Laptop,
  LayoutGrid,
  Package,
  Smartphone,
  Tablet,
  Watch,
  type LucideIcon,
} from "lucide-react";

type CategoryTabsProps = {
  // Real category names only, without "All".
  categories: string[];
  counts: Record<string, number>;
  total: number;
  selected: string;
  onSelect: (category: string) => void;
};

function iconFor(name: string): LucideIcon {
  const n = name.toLowerCase();
  if (n.includes("phone")) return Smartphone;
  if (n.includes("tablet") || n.includes("ipad")) return Tablet;
  if (n.includes("laptop") || n.includes("mac")) return Laptop;
  if (n.includes("watch")) return Watch;
  if (n.includes("pod") || n.includes("head") || n.includes("audio"))
    return Headphones;
  return Package;
}

export default function CategoryTabs({
  categories,
  counts,
  total,
  selected,
  onSelect,
}: CategoryTabsProps) {
  const tabs = [
    { name: "All", label: "All products", count: total, Icon: LayoutGrid },
    ...categories.map((name) => ({
      name,
      label: name,
      count: counts[name] ?? 0,
      Icon: iconFor(name),
    })),
  ];

  return (
    <nav
      aria-label="Product categories"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map(({ name, label, count, Icon }) => {
        const active = selected === name;

        return (
          <button
            key={name}
            type="button"
            onClick={() => onSelect(name)}
            aria-pressed={active}
            className={`flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition ${
              active
                ? "bg-[#0b4ea2] text-white shadow-sm"
                : "bg-white text-slate-700 ring-1 ring-[#cdd9ec] hover:ring-[#0b4ea2]"
            }`}
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
            <span
              className={`text-xs font-medium tabular-nums ${
                active ? "text-blue-100" : "text-slate-500"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
