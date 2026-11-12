import { MapPin, MessageCircle, Phone } from "lucide-react";

import { SHOP, whatsappLink } from "@/lib/config";

export default function Footer() {
  // Don't show a placeholder address to customers.
  const showAddress = !SHOP.address.includes("XXX");

  const link = whatsappLink("Hi, I'd like to enquire about your products.");

  return (
    <footer className="border-t-4 border-green-500 bg-[#0a1a38] text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-bold">{SHOP.name}</p>

          {showAddress && (
            <p className="mt-2 flex items-start gap-2 text-sm text-slate-300">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {SHOP.address}
            </p>
          )}

          <p className="mt-2 max-w-md text-sm text-slate-300">
            {SHOP.priceNote}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-green-700 px-5 font-semibold text-white transition hover:bg-green-600"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            WhatsApp us
          </a>

          <a
            href={`tel:${SHOP.callNumber}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-5 font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10"
          >
            <Phone className="size-5" aria-hidden="true" />
            {SHOP.callDisplay}
          </a>
        </div>
      </div>

      <p className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {SHOP.name}
      </p>
    </footer>
  );
}
