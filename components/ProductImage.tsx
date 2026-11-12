"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

import { canOptimize } from "@/lib/productUtils";

type ProductImageProps = {
  src: string;
  alt: string;
  sizes: string;
  dimmed?: boolean;
  // Padding around the picture, e.g. "p-3".
  padding?: string;
};

// Shows the product photo, or a neutral placeholder if the URL is empty or broken.
export default function ProductImage({
  src,
  alt,
  sizes,
  dimmed = false,
  padding = "p-3",
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  const usable = /^(https?:\/\/|\/)/.test(src) && !failed;

  if (!usable) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-slate-400">
        <ImageOff className="size-7" aria-hidden="true" />
        <span className="text-xs">No photo yet</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      unoptimized={!canOptimize(src)}
      onError={() => setFailed(true)}
      className={`object-contain ${padding} transition-transform duration-300 group-hover:scale-105 ${
        dimmed ? "opacity-50 grayscale" : ""
      }`}
    />
  );
}
