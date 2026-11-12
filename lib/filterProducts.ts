import { Product } from "@/types/products";

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Sheet order" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name: A to Z" },
];

export type ProductFilters = {
  search: string;
  brand: string;
  category: string;
  variant: string;
  inStockOnly: boolean;
  sort: SortKey;
};

// Products without a price always sort after priced ones.
function byPrice(a: Product, b: Product, direction: 1 | -1) {
  const aHasPrice = a.price > 0;
  const bHasPrice = b.price > 0;
  if (aHasPrice !== bHasPrice) return aHasPrice ? -1 : 1;
  return (a.price - b.price) * direction;
}

// "iphone 17 black" matches products containing all three words, in any order.
// Out-of-stock items always go last. Array.sort is stable, so the sheet order
// is kept wherever the chosen sort doesn't decide.
export function filterProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  const terms = filters.search.toLowerCase().split(/\s+/).filter(Boolean);

  return products
    .filter((product) => {
      if (filters.inStockOnly && product.availability === "out") return false;

      const haystack = [
        product.brand,
        product.model,
        product.color,
        product.storage,
        product.spec,
        product.condition,
        product.category,
      ]
        .join(" ")
        .toLowerCase();

      return (
        terms.every((term) => haystack.includes(term)) &&
        (filters.brand === "All" || product.brand === filters.brand) &&
        (filters.category === "All" || product.category === filters.category) &&
        (filters.variant === "All" || product.storage === filters.variant)
      );
    })
    .sort((a, b) => {
      const stock =
        Number(a.availability === "out") - Number(b.availability === "out");
      if (stock !== 0) return stock;

      switch (filters.sort) {
        case "price-asc":
          return byPrice(a, b, 1);
        case "price-desc":
          return byPrice(a, b, -1);
        case "name":
          return a.model.localeCompare(b.model, "en", { numeric: true });
        default:
          return 0;
      }
    });
}
