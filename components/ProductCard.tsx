import { MessageCircle } from "lucide-react";

import ProductImage from "./ProductImage";
import StockBadge from "./StockBadge";

import { Product } from "@/types/products";
import { whatsappLink } from "@/lib/config";
import { buildEnquiryMessage, isReal } from "@/lib/productUtils";

export default function ProductCard(product: Product) {
  const {
    brand,
    model,
    color,
    storage,
    spec,
    condition,
    price,
    availability,
    stockCount,
    image,
  } = product;

  const inStock = availability !== "out";
  const variant = [storage, color].filter(isReal).join(", ");

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-[#cdd9ec] transition hover:shadow-md hover:ring-[#0b4ea2]">
      {/* Photo, with the details that matter most in this trade pinned on it */}
      <div className="relative aspect-[4/3] bg-[#f0f5fc]">
        <ProductImage
          src={image}
          alt={`${brand} ${model}`}
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
          dimmed={!inStock}
        />

        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {isReal(spec) && (
            <span className="rounded-md bg-[#0a1a38] px-2 py-0.5 text-xs font-bold text-white">
              {spec}
            </span>
          )}
          {isReal(condition) && (
            <span className="rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-slate-800 ring-1 ring-[#cdd9ec]">
              {condition}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-sm text-slate-600">{brand}</p>

        <h3 className="mt-0.5 line-clamp-2 font-display text-base font-bold leading-snug text-[#0a1a38] sm:text-lg">
          {model}
        </h3>

        {variant && <p className="mt-1 text-sm text-slate-700">{variant}</p>}

        <div className="mt-3">
          {price > 0 ? (
            <p className="font-display text-2xl font-extrabold tracking-tight text-[#0b4ea2] sm:text-3xl">
              <span className="mr-1 text-sm font-bold text-slate-600 sm:text-base">
                HK$
              </span>
              {price.toLocaleString("en-HK")}
            </p>
          ) : (
            <p className="font-display text-lg font-bold text-slate-600 sm:text-xl">
              Price on request
            </p>
          )}

          <div className="mt-1.5">
            <StockBadge availability={availability} stockCount={stockCount} />
          </div>
        </div>

        <div className="mt-auto pt-4">
          {inStock ? (
            <a
              href={whatsappLink(buildEnquiryMessage(product))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-3 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
              <span className="sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">Ask on WhatsApp</span>
            </a>
          ) : (
            <a
              href={whatsappLink(buildEnquiryMessage(product, "restock"))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-800 ring-1 ring-slate-300 transition hover:bg-[#f0f5fc]"
            >
              Ask about restock
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
