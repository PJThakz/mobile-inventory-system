import { CalendarOff, Info, Sparkles, Tag, type LucideIcon } from "lucide-react";

import { Update } from "@/types/update";

type Props = {
  updates: Update[];
};

// Each kind of update gets its own colour so they are easy to tell apart at a glance.
const typeStyles: Record<
  string,
  { icon: LucideIcon; card: string; border: string; icon_bg: string }
> = {
  "Upcoming Model": {
    icon: Sparkles,
    card: "bg-blue-50 ring-blue-200",
    border: "border-l-blue-600",
    icon_bg: "bg-blue-600 text-white",
  },
  Promotion: {
    icon: Tag,
    card: "bg-emerald-50 ring-emerald-200",
    border: "border-l-emerald-600",
    icon_bg: "bg-emerald-600 text-white",
  },
  Notice: {
    icon: Info,
    card: "bg-amber-50 ring-amber-200",
    border: "border-l-amber-500",
    icon_bg: "bg-amber-500 text-white",
  },
  Holiday: {
    icon: CalendarOff,
    card: "bg-rose-50 ring-rose-200",
    border: "border-l-rose-500",
    icon_bg: "bg-rose-500 text-white",
  },
};

const fallback = {
  icon: Info,
  card: "bg-slate-50 ring-slate-200",
  border: "border-l-slate-400",
  icon_bg: "bg-slate-500 text-white",
};

export default function LatestUpdates({ updates }: Props) {
  const activeUpdates = updates.filter((u) => u.active);

  if (activeUpdates.length === 0) return null;

  return (
    // A swipeable row on phones (saves height), a grid from sm up.
    <section
      aria-label="Latest updates"
      className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 xl:grid-cols-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {activeUpdates.map((update, index) => {
        const style = typeStyles[update.type] ?? fallback;
        const Icon = style.icon;

        return (
          <div
            key={index}
            className={`flex w-[82%] shrink-0 snap-start items-start gap-3 rounded-lg border-l-4 p-3.5 ring-1 sm:w-auto ${style.card} ${style.border}`}
          >
            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-md ${style.icon_bg}`}
            >
              <Icon className="size-5" aria-hidden="true" />
            </span>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#0a1a38]">{update.type}</p>
              <p className="text-sm leading-snug text-slate-700">
                {update.title}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
