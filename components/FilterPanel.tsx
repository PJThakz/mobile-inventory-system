import FilterSection from "./FilterSection";

export type FilterPanelProps = {
  // Both lists start with "All".
  brands: string[];
  variants: string[];

  selectedBrand: string;
  setSelectedBrand: (value: string) => void;

  selectedVariant: string;
  setSelectedVariant: (value: string) => void;
};

// Category lives in the tabs above the products, so only brand and storage/size are here.
export default function FilterPanel({
  brands,
  variants,
  selectedBrand,
  setSelectedBrand,
  selectedVariant,
  setSelectedVariant,
}: FilterPanelProps) {
  return (
    <>
      <FilterSection
        title="Brand"
        options={brands}
        selected={selectedBrand}
        setSelected={setSelectedBrand}
      />

      <FilterSection
        title="Storage / size"
        options={variants}
        selected={selectedVariant}
        setSelected={setSelectedVariant}
      />
    </>
  );
}
