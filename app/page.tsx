"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterButtons from "@/components/FilterButtons";
import ProductGrid from "@/components/ProductGrid";

import { getProducts } from "@/lib/googleSheets";
import { Product } from "@/types/products";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    }

    loadProducts();
  }, []);

  if (products.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">
          Loading inventory...
        </p>
      </main>
    );
  }

  const brands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <main className="min-h-screen bg-slate-100">

      <Header />
      <div className="mb-10">
  <SearchBar
    search={search}
    setSearch={setSearch}
  />
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">

  <FilterButtons
    title="Brand"
    options={brands}
    selected={selectedBrand}
    setSelected={setSelectedBrand}
  />

  <FilterButtons
    title="Category"
    options={categories}
    selected={selectedCategory}
    setSelected={setSelectedCategory}
  />

</div>

<ProductGrid
  products={products}
  search={search}
  selectedBrand={selectedBrand}
  selectedCategory={selectedCategory}
/>

    </main>
  );
}