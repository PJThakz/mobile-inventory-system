import { MessageCircle, RefreshCw, WifiOff } from "lucide-react";

import { whatsappLink } from "@/lib/config";

export default function ErrorState() {
  const link = whatsappLink(
    "Hi, the website price list isn't loading. Could you send me your latest prices?"
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="rounded-2xl bg-white p-8 text-center shadow-md sm:p-12">
        <WifiOff className="mx-auto mb-4 size-14 text-gray-400" aria-hidden="true" />

        <h2 className="text-2xl font-bold text-gray-800">
          Price list unavailable right now
        </h2>

        <p className="mt-3 text-gray-600">
          We couldn&apos;t load the latest prices. Please refresh in a minute, or
          message us on WhatsApp and we&apos;ll send you the current list.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/"
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <RefreshCw className="size-5" aria-hidden="true" />
            Refresh
          </a>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 font-semibold text-white transition hover:bg-green-700"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
