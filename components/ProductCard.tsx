import { Product } from "@/types/products";
import Image from "next/image";

export default function ProductCard({
  brand,
  model,
  color,
  storage,
  spec,
  condition,
  price,
  stock,
  image,
}: Product) {
  const whatsappMessage = encodeURIComponent(
`Hi,

I'm interested in:

${brand} ${model}
${storage}
${color}
${spec} Spec
${condition}

Listed Price: HK$${price.toLocaleString()}

Is this still available?`
  );

  const whatsappLink = `https://wa.me/85298022538?text=${whatsappMessage}`;

  return (
    <div className="group flex w-full flex-col rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* Product Image */}
      <div className="relative h-56 w-full bg-white rounded-t-xl overflow-hidden">
        <Image
          src={image}
          alt={model}
          fill
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-5">

        <h2 className="text-xl font-bold text-gray-900">
          {model}
        </h2>

        <p className="text-gray-600 mb-2">
          {brand}
        </p>

        <p className="text-gray-700">
          {color}
        </p>

        <p className="text-sm text-gray-500 mb-4">
          {storage} • {spec} • {condition}
        </p>

        <div className="mb-5">

  <p className="text-3xl font-bold text-blue-600">
    HK${price.toLocaleString()}
  </p>

  {stock > 0 ? (
    <p className="mt-2 text-sm font-semibold text-green-600">
      🟢 {stock} Units Available
    </p>
  ) : (
    <p className="mt-2 text-sm font-semibold text-red-600">
      🔴 Out of Stock
    </p>
  )}

</div>

        {/* Push button to bottom */}
        <div className="mt-auto">

          {stock > 0 ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl bg-green-600 py-2.5 text-center font-semibold text-white transition hover:bg-green-700"
            >
              💬 WhatsApp Inquiry
            </a>
          ) : (
            <button
              disabled
              className="w-full rounded-xl bg-gray-300 py-2.5 text-center font-semibold text-gray-500 cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}

        </div>

      </div>

    </div>
  );
}