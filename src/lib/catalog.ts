// Catalog queries for Server Components. Wrapped in React `cache` so a page and
// its generateMetadata share one query per render.

import "server-only";
import { cache } from "react";
import { asc, eq, inArray, ne, sql } from "drizzle-orm";
import { db } from "@/db";
import { categories, products, productStock } from "@/db/catalog-schema";
import type { Product } from "@/lib/products";

const withCategoryAndStock = {
  category: true as const,
  stock: { orderBy: [asc(productStock.position)] },
};

type ProductRow = typeof products.$inferSelect & {
  category: typeof categories.$inferSelect;
  stock: (typeof productStock.$inferSelect)[];
};

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: {
      slug: row.category.slug,
      name: row.category.name,
      href: `/${row.category.slug}`,
    },
    styleCode: row.styleCode,
    material: row.material,
    color: row.color,
    price: row.price,
    badge: row.badge ?? undefined,
    description: row.description,
    details: row.details,
    images: row.images,
    sizes: row.stock.map((s) => ({ label: s.size, stock: s.quantity })),
  };
}

export const getProduct = cache(async (slug: string) => {
  const row = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: withCategoryAndStock,
  });
  return row ? toProduct(row) : undefined;
});

/** In the order given; unknown slugs are skipped. */
export const getProductsBySlug = cache(async (slugs: string[]) => {
  if (slugs.length === 0) return [];
  const rows = await db.query.products.findMany({
    where: inArray(products.slug, slugs),
    with: withCategoryAndStock,
  });
  const bySlug = new Map(rows.map((row) => [row.slug, toProduct(row)]));
  return slugs.flatMap((slug) => bySlug.get(slug) ?? []);
});

/** Same-category pieces first, topped up from the rest of the catalog. */
export const getRelatedProducts = cache(async (product: Product, limit = 8) => {
  const rows = await db.query.products.findMany({
    where: ne(products.id, product.id),
    with: withCategoryAndStock,
    // Callback form so the columns resolve to the relational query's table alias
    orderBy: (p, { asc, desc }) => [
      desc(sql`${p.categoryId} = (select category_id from ${products} where id = ${product.id})`),
      asc(p.id),
    ],
    limit,
  });
  return rows.map(toProduct);
});

export const getProductSlugs = cache(async () => {
  const rows = await db.select({ slug: products.slug }).from(products);
  return rows.map((row) => row.slug);
});
