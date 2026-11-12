import { MessageCircle, PackageSearch } from "lucide-react";

import ProductCard from "./ProductCard";
import ProductRow from "./ProductRow";
import { ViewMode } from "./Toolbar";

import { Product } from "@/types/products";
import { whatsappLink } from "@/lib/config";

type ProductGridProps = {
  // Already filtered and sorted by Catalog.
  products: Product[];
  view: ViewMode;
  search: string;
  onClearAll: () => void;
};

export default function ProductGrid({
  products,
  view,
  search,
  onClearAll,
}: ProductGridProps) {
  if (products.length === 0) {
    const askLink = whatsappLink(
      `Hi, do you have ${search.trim() || "this"} in stock?`
    );

    return (
      <div className="rounded-xl bg-white p-8 text-center ring-1 ring-[#cdd9ec] sm:p-12">
        <PackageSearch
          className="mx-auto mb-4 size-12 text-slate-400"
          aria-hidden="true"
        />

        <h3 className="font-display text-2xl font-bold text-[#0a1a38]">
          Nothing matches that
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-slate-600">
          Check the spelling, or clear the filters to see everything. Can&apos;t
          find it? Ask us on WhatsApp.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClearAll}
            className="min-h-11 rounded-lg bg-[#0a1a38] px-6 font-semibold text-white transition hover:bg-slate-800"
          >
            Clear filters
          </button>

          <a
            href={askLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-green-700 px-6 font-semibold text-white transition hover:bg-green-800"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  if (view === "list") {
    return (
      <ul className="space-y-2.5">
        {products.map((product) => (
          <ProductRow key={product.id} {...product} />
        ))}
      </ul>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
