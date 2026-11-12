import { Product } from "@/types/products";
import { OPTIMIZED_IMAGE_HOSTS } from "@/lib/config";

// The sheet uses "-" for "not applicable" (e.g. AirPods have no storage size).
export const isReal = (value: string) => value !== "" && value !== "-";

export const formatPrice = (price: number) =>
  `HK$${price.toLocaleString("en-HK")}`;

// next/image only optimises hosts listed in next.config.ts. Anything else is
// loaded as-is so one odd image URL in the sheet can't break the page.
export function canOptimize(src: string) {
  if (src.startsWith("/")) return true;
  try {
    return OPTIMIZED_IMAGE_HOSTS.includes(new URL(src).hostname);
  } catch {
    return false;
  }
}

export function buildEnquiryMessage(
  product: Product,
  kind: "order" | "restock" = "order"
) {
  const { id, brand, model, storage, color, spec, condition, price } = product;

  return [
    "Hi,",
    "",
    kind === "restock"
      ? "When will this be back in stock?"
      : "I'm interested in:",
    "",
    `${brand} ${model}`,
    ...(isReal(storage) ? [storage] : []),
    ...(isReal(color) ? [color] : []),
    ...(isReal(spec) ? [`${spec} Spec`] : []),
    ...(isReal(condition) ? [condition] : []),
    "",
    ...(kind === "order" && price > 0
      ? [`Listed Price: ${formatPrice(price)}`]
      : []),
    `Ref: #${id}`,
    ...(kind === "order" ? ["Quantity needed: ", "", "Is this still available?"] : []),
  ].join("\n");
}
