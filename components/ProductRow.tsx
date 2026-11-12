import { MessageCircle } from "lucide-react";

import ProductImage from "./ProductImage";
import StockBadge from "./StockBadge";

import { Product } from "@/types/products";
import { whatsappLink } from "@/lib/config";
import { buildEnquiryMessage, isReal } from "@/lib/productUtils";

function Price({ price, small }: { price: number; small?: boolean }) {
  if (price <= 0) {
    return <p className="text-sm font-semibold text-slate-600">Price on request</p>;
  }

  return (
    <p
      className={`font-display font-extrabold tracking-tight text-[#0b4ea2] ${
        small ? "text-xl" : "text-2xl"
      }`}
    >
      <span className="mr-0.5 text-xs font-bold text-slate-600 sm:text-sm">
        HK$
      </span>
      {price.toLocaleString("en-HK")}
    </p>
  );
}

// Compact one-line-per-product layout, for scanning many prices quickly.
export default function ProductRow(product: Product) {
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
  const details = [storage, color, spec, condition].filter(isReal).join(", ");

  return (
    <li className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-[#cdd9ec] sm:gap-4 sm:p-4">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-[#f0f5fc] sm:size-20">
        <ProductImage
          src={image}
          alt={`${brand} ${model}`}
          sizes="80px"
          dimmed={!inStock}
          padding="p-1"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 font-display text-base font-bold leading-snug text-[#0a1a38] sm:truncate sm:text-lg">
          {model}
        </h3>

        <p className="line-clamp-2 text-sm text-slate-600 sm:truncate">
          {brand}
          {details ? `, ${details}` : ""}
        </p>

        {/* On phones the price sits under the name so the name gets the full width */}
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
          <div className="sm:hidden">
            <Price price={price} small />
          </div>
          <StockBadge availability={availability} stockCount={stockCount} />
        </div>
      </div>

      <div className="hidden shrink-0 text-right sm:block">
        <Price price={price} />
      </div>

      <a
        href={whatsappLink(
          buildEnquiryMessage(product, inStock ? "order" : "restock")
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${inStock ? "Ask about" : "Ask about restock of"} ${brand} ${model} on WhatsApp`}
        className={`flex size-11 shrink-0 items-center justify-center rounded-lg transition ${
          inStock
            ? "bg-green-700 text-white hover:bg-green-800"
            : "text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50"
        }`}
      >
        <MessageCircle className="size-5" aria-hidden="true" />
      </a>
    </li>
  );
}
