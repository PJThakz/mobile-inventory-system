import FilterSection from "./FilterSection";

interface SidebarProps {
  brands: string[];
  categories: string[];
  variants: string[];

  selectedBrand: string;
  setSelectedBrand: (value: string) => void;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  selectedVariant: string;
  setSelectedVariant: (value: string) => void;
}

export default function Sidebar({
  brands,
  categories,
  variants,

  selectedBrand,
  setSelectedBrand,

  selectedCategory,
  setSelectedCategory,

  selectedVariant,
  setSelectedVariant,
}: SidebarProps) {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

      <div className="mb-8 border-b pb-4">
  <h2 className="text-2xl font-bold text-slate-800">
    Filters
  </h2>
  <p className="mt-1 text-sm text-slate-500">
  {brands.length - 1} Brands • {categories.length - 1} Categories • {variants.length - 1} Variants
</p>

  <p className="mt-1 text-sm text-slate-500">
    Narrow down your inventory search
  </p>
</div>

      <FilterSection
        title="Category"
        options={categories}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />

      <FilterSection
        title="Brand"
        options={brands}
        selected={selectedBrand}
        setSelected={setSelectedBrand}
      />

      <FilterSection
  title="Variant"
  options={variants}
  selected={selectedVariant}
  setSelected={setSelectedVariant}
/>

    </aside>
  );
}