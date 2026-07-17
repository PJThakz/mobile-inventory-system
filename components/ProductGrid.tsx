import ProductCard from "./ProductCard";
import { Product } from "@/types/products";

type ProductGridProps = {
  products: Product[];
  search: string;
  selectedBrand: string;
  selectedCategory: string;
  selectedVariant: string;
};

export default function ProductGrid({
  products,
  search,
  selectedBrand,
  selectedCategory,
  selectedVariant,
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
  
  const matchesVariant =
  selectedVariant === "All" ||
  product.storage === selectedVariant;

  return (
  matchesSearch &&
  matchesBrand &&
  matchesCategory &&
  matchesVariant
);
});

  return (
    <section className="px-8 pb-10">
      
      <div className="mb-8">
  <div className="inline-block">
    <h2 className="text-3xl font-bold text-gray-800">
      Showing {filteredProducts.length} Products
    </h2>

    <div className="mt-2 h-1 w-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
  </div>
</div>

      <div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
2xl:grid-cols-4
gap-8
">

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