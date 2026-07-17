"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import ProductGrid from "@/components/ProductGrid";

import { getProducts } from "@/lib/googleSheets";
import { Product } from "@/types/products";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVariant, setSelectedVariant] = useState("All");

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

  const variants = [
  "All",
  ...new Set(
    products
      .map((product) => product.storage)
      .filter(
        (value) =>
          value &&
          value !== "-" &&
          value.trim() !== ""
      )
  ),
];

  return (
  <main className="min-h-screen bg-slate-100">

    <Header />

    <div className="mx-auto max-w-[1700px] px-6 py-6">

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">

        {/* Sidebar */}

        <aside className="lg:col-span-2">
  <div className="sticky top-6">
    <Sidebar
      brands={brands}
      categories={categories}
      selectedBrand={selectedBrand}
      setSelectedBrand={setSelectedBrand}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      variants={variants}
      selectedVariant={selectedVariant}
      setSelectedVariant={setSelectedVariant}
    />
  </div>
</aside>

        {/* Product Grid */}

        <section className="lg:col-span-10">

          <ProductGrid
            products={products}
            search={search}
            selectedBrand={selectedBrand}
            selectedCategory={selectedCategory}
            selectedVariant={selectedVariant}
          />

        </section>

      </div>

    </div>

  </main>
);
}