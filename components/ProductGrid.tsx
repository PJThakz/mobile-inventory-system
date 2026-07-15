import ProductCard from "./ProductCard";
import { Product } from "@/types/products";

type ProductGridProps = {
  products: Product[];
  search: string;
  selectedBrand: string;
  selectedCategory: string;
};

export default function ProductGrid({
  products,
  search,
  selectedBrand,
  selectedCategory,
}: ProductGridProps) {
  const filteredProducts = products.filter((product) => {
  const term = search.toLowerCase();

  const matchesSearch =
    product.brand.toLowerCase().includes(term) ||
    product.model.toLowerCase().includes(term) ||
    product.color.toLowerCase().includes(term) ||
    product.storage.toLowerCase().includes(term) ||
    product.spec.toLowerCase().includes(term);

  const matchesBrand =
    selectedBrand === "All" ||
    product.brand === selectedBrand;

  const matchesCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory;

  return (
    matchesSearch &&
    matchesBrand &&
    matchesCategory
  );
});

  return (
    <section className="px-8 pb-10">

      <p className="text-gray-600 mb-6 text-center">
        Showing <span className="font-semibold">{filteredProducts.length}</span> Products
      </p>

      <div className="flex flex-wrap justify-center gap-6">

        {filteredProducts.map((product) => (
          <ProductCard
            key={`${product.brand}-${product.model}-${product.storage}-${product.color}`}
            {...product}
          />
        ))}

      </div>

    </section>
  );
}