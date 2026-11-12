"use client";

import { useCallback, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import Toolbar, { ViewMode } from "@/components/Toolbar";
import ProductGrid from "@/components/ProductGrid";
import LatestUpdates from "@/components/LatestUpdates";
import FilterDrawer from "@/components/FilterDrawer";
import ActiveFilters, { ActiveFilter } from "@/components/ActiveFilters";

import { filterProducts, SortKey } from "@/lib/filterProducts";
import { isReal } from "@/lib/productUtils";
import { Product } from "@/types/products";
import { Update } from "@/types/update";

type CatalogProps = {
  products: Product[];
  updates: Update[];
};

const unique = (values: string[]) => [...new Set(values.filter(isReal))];

export default function Catalog({ products, updates }: CatalogProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedVariant, setSelectedVariant] = useState("All");
  const [sort, setSort] = useState<SortKey>("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [view, setView] = useState<ViewMode>("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const closeFilters = useCallback(() => setFiltersOpen(false), []);

  // Category tabs, with how many products each holds.
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      if (isReal(p.category)) counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, [products]);

  const categories = Object.keys(categoryCounts);

  // Brand and storage options only list what exists in the current selection,
  // so the filters can't lead to an empty result.
  const inCategory = useMemo(
    () =>
      selectedCategory === "All"
        ? products
        : products.filter((p) => p.category === selectedCategory),
    [products, selectedCategory]
  );

  const brands = useMemo(
    () => ["All", ...unique(inCategory.map((p) => p.brand))],
    [inCategory]
  );

  const variants = useMemo(() => {
    const inBrand =
      selectedBrand === "All"
        ? inCategory
        : inCategory.filter((p) => p.brand === selectedBrand);
    return ["All", ...unique(inBrand.map((p) => p.storage))];
  }, [inCategory, selectedBrand]);

  const filteredProducts = useMemo(
    () =>
      filterProducts(products, {
        search,
        brand: selectedBrand,
        category: selectedCategory,
        variant: selectedVariant,
        inStockOnly,
        sort,
      }),
    [
      products,
      search,
      selectedBrand,
      selectedCategory,
      selectedVariant,
      inStockOnly,
      sort,
    ]
  );

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedBrand("All");
    setSelectedVariant("All");
  };

  const selectBrand = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedVariant("All");
  };

  const clearDrawerFilters = () => {
    setSelectedBrand("All");
    setSelectedVariant("All");
  };

  const clearAll = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSelectedVariant("All");
    setInStockOnly(false);
    setSearch("");
  };

  const activeFilters: ActiveFilter[] = [
    ...(selectedBrand !== "All"
      ? [
          {
            key: "brand",
            label: selectedBrand,
            onRemove: () => selectBrand("All"),
          },
        ]
      : []),
    ...(selectedVariant !== "All"
      ? [
          {
            key: "variant",
            label: selectedVariant,
            onRemove: () => setSelectedVariant("All"),
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Search stays pinned to the top while scrolling */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-[#0a1a38]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-4 py-3 sm:px-6">
          <SearchBar search={search} setSearch={setSearch} />

          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="flex h-12 shrink-0 items-center gap-2 rounded-2xl bg-white px-4 font-semibold text-[#0a1a38] ring-1 ring-slate-300 transition hover:bg-slate-50"
          >
            <SlidersHorizontal className="size-5" aria-hidden="true" />
            Filters
            {activeFilters.length > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-[#0b4ea2] text-xs font-bold text-white">
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom padding keeps the floating WhatsApp button off the last row */}
      <div className="mx-auto max-w-[1400px] space-y-5 px-4 pb-28 pt-5 sm:space-y-6 sm:px-6 sm:pt-6">
        <LatestUpdates updates={updates} />

        <CategoryTabs
          categories={categories}
          counts={categoryCounts}
          total={products.length}
          selected={selectedCategory}
          onSelect={selectCategory}
        />

        <Toolbar
          count={filteredProducts.length}
          sort={sort}
          setSort={setSort}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          view={view}
          setView={setView}
        />

        <ActiveFilters filters={activeFilters} onClearAll={clearAll} />

        <ProductGrid
          products={filteredProducts}
          view={view}
          search={search}
          onClearAll={clearAll}
        />
      </div>

      <FilterDrawer
        open={filtersOpen}
        onClose={closeFilters}
        resultCount={filteredProducts.length}
        activeCount={activeFilters.length}
        onClear={clearDrawerFilters}
        brands={brands}
        variants={variants}
        selectedBrand={selectedBrand}
        setSelectedBrand={selectBrand}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
      />
    </>
  );
}
