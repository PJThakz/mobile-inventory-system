import { MessageCircle } from "lucide-react";

import { whatsappLink } from "@/lib/config";

export default function FloatingWhatsApp() {
  const link = whatsappLink(`Hi,

I'd like to enquire about your products and services.

Thank you.`);

  // Icon-only circle on phones, labelled pill from sm up. It sits above the
  // iPhone home bar, and below the filter sheet (z-40 vs z-50).
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2 rounded-full bg-green-600 p-4 text-white shadow-xl transition hover:scale-105 hover:bg-green-700 sm:bottom-6 sm:right-6 sm:px-6"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
      <span className="hidden font-semibold sm:inline">Need help?</span>
    </a>
  );
}
