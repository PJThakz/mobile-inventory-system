import { Product } from "@/types/products";

export default function ProductCard({
  brand,
  model,
  color,
  storage,
  spec,
  condition,
  price,
  stock,
}: Product) {
  return (
    <div className="w-72 rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-xl transition">

      {/* Product Image Placeholder */}
      <div className="flex items-center justify-center h-40 bg-gray-100 rounded-t-xl text-6xl">
        📱
      </div>

      <div className="p-5">

        <h2 className="text-2xl font-bold text-gray-900">
          {model}
        </h2>

        <p className="text-gray-600 mb-3">
          {brand}
        </p>

        <p className="text-gray-700">
          {color}
        </p>

        <p className="text-sm text-gray-500 mb-5">
          {storage} • {spec} • {condition}
        </p>

        <div className="flex justify-between items-center mb-5">

          <div>
            <p className="text-xs text-gray-500">
              Price
            </p>

            <p className="text-2xl font-bold text-blue-600">
              HK${price.toLocaleString()}
            </p>
          </div>

          <div className="text-right">

            {stock > 0 ? (
              <>
                <p className="text-green-600 font-semibold">
                  🟢 In Stock
                </p>

                <p className="text-sm text-gray-500">
                  {stock} Units
                </p>
              </>
            ) : (
              <p className="text-red-600 font-semibold">
                🔴 Out of Stock
              </p>
            )}

          </div>

        </div>

        <button className="w-full rounded-lg bg-green-600 py-3 text-white font-medium hover:bg-green-700 transition">
          WhatsApp Inquiry
        </button>

      </div>

    </div>
  );
}