import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Catalog from "@/components/Catalog";
import ErrorState from "@/components/ErrorState";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import { CatalogData, getData } from "@/lib/googleSheets";

// Rebuild this page at most once a minute with fresh sheet data.
export const revalidate = 60;

export default async function Home() {
  let data: CatalogData | null = null;

  try {
    data = await getData();
  } catch (error) {
    console.error("Failed to load inventory:", error);
  }

  return (
    <div className="min-h-screen bg-[#e8eef7] text-[#0a1a38]">
      <Header lastUpdated={data?.lastUpdated ?? null} />

      <main>
        {data ? (
          <Catalog products={data.products} updates={data.updates} />
        ) : (
          <ErrorState />
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
