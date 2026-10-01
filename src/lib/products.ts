// Product types and client-safe helpers. Database queries live in @/lib/catalog.

import type { ProductImage } from "@/db/catalog-schema";

export type { ProductImage };

export type Category = { slug: string; name: string; href: string };

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: Category;
  styleCode: string;
  material: string;
  color: string;
  /** Minor units (cents). */
  price: number;
  badge?: string;
  description: string;
  details: string[];
  /** First image is the primary shot used on cards. */
  images: ProductImage[];
  /** One entry for one-size pieces; the size picker only shows with several. */
  sizes: { label: string; stock: number }[];
};

export type StockState = "in_stock" | "low_stock" | "sold_out";

export function stockState(quantity: number): StockState {
  if (quantity === 0) return "sold_out";
  if (quantity <= 3) return "low_stock";
  return "in_stock";
}

export function totalStock(product: Product) {
  return product.sizes.reduce((sum, size) => sum + size.stock, 0);
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount / 100);
}
