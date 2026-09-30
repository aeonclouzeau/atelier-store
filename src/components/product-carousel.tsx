"use client";

import { useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/products";

export function ProductCarousel({
  products,
  label,
}: {
  products: Product[];
  label: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="absolute -top-14 right-gutter hidden gap-2 md:flex">
        <button type="button" className="btn-icon border border-line" onClick={() => scroll(-1)}>
          <ArrowLeftIcon />
          <span className="sr-only">Previous</span>
        </button>
        <button type="button" className="btn-icon border border-line" onClick={() => scroll(1)}>
          <ArrowRightIcon />
          <span className="sr-only">Next</span>
        </button>
      </div>
      <ul
        ref={trackRef}
        aria-label={label}
        className="scroller scroll-px-gutter gap-px px-gutter"
      >
        {products.map((product) => (
          <li key={product.slug} className="w-[70vw] sm:w-[42vw] md:w-[30vw] lg:w-[22vw] 2xl:w-[18vw]">
            <ProductCard
              product={product}
              sizes="(min-width: 64rem) 22vw, (min-width: 48rem) 30vw, 70vw"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
