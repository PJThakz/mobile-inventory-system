import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";

import { SHOP, whatsappLink } from "@/lib/config";

type HeaderProps = {
  // ISO timestamp of the last edit to the Google Sheet, or null if unknown.
  lastUpdated: string | null;
};

function formatUpdated(iso: string | null) {
  if (!iso) return null;

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  return {
    day: date.toLocaleDateString("en-HK", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Hong_Kong",
    }),
    time: date.toLocaleTimeString("en-HK", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Hong_Kong",
    }),
  };
}

export default function Header({ lastUpdated }: HeaderProps) {
  const updated = formatUpdated(lastUpdated);

  const link = whatsappLink(
    "Hi, I'd like to check your latest prices and availability."
  );

  return (
    <header className="border-b-4 border-green-500 bg-gradient-to-br from-[#0a1a38] via-[#0b2a5e] to-[#0b4ea2] text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 py-5 sm:gap-6 sm:px-6 sm:py-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-4">
            <div className="shrink-0 rounded-xl bg-white p-2">
              <Image
                src="/images/logo.png"
                alt=""
                width={90}
                height={90}
                className="h-12 w-12 object-contain sm:h-16 sm:w-16"
              />
            </div>

            <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {SHOP.name}
            </h1>
          </div>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200 sm:mt-5">
            Today&apos;s prices on iPhone, Samsung, iPad, MacBook, Apple Watch
            and AirPods.
          </p>

          <div className="mt-4 flex gap-3 sm:mt-5">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-green-700 px-5 font-semibold text-white transition hover:bg-green-600 sm:flex-none"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              WhatsApp us
            </a>

            <a
              href={`tel:${SHOP.callNumber}`}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg px-5 font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10 sm:flex-none"
            >
              <Phone className="size-5" aria-hidden="true" />
              <span className="sm:hidden">Call us</span>
              <span className="hidden sm:inline">{SHOP.callDisplay}</span>
            </a>
          </div>
        </div>

        {/* Freshness is what buyers trust most, so the update time gets its own block. */}
        {updated && (
          <div className="shrink-0 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/15 sm:px-5 sm:py-4 lg:min-w-60 lg:text-right">
            <p className="flex items-center gap-2 text-sm text-slate-200 lg:justify-end">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Price list updated
            </p>

            <p className="font-display text-2xl font-bold tabular-nums sm:mt-1 sm:text-4xl">
              {updated.time}{" "}
              <span className="text-base font-semibold text-slate-300">HKT</span>
            </p>

            <p className="text-sm text-slate-200">{updated.day}</p>

            <p className="mt-2 max-w-60 text-xs leading-snug text-slate-300 lg:ml-auto">
              {SHOP.priceNote}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
