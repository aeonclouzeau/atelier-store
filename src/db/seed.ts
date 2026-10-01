// Loads the initial catalog. Safe to re-run: categories and products are upserted
// by slug and each seeded product's stock rows are replaced.
// Run with: pnpm db:seed

import { inArray, sql } from "drizzle-orm";
import type { BatchItem } from "drizzle-orm/batch";
import { db } from "./index";
import { categories, products, productStock } from "./catalog-schema";
import { categories as seedCategories, products as seedProducts } from "./seed-data";

const idBySlug = (table: "categories" | "products", slug: string) =>
  sql<number>`(select id from ${sql.identifier(table)} where slug = ${slug})`;

async function main() {
  const statements: BatchItem<"pg">[] = [];

  seedCategories.forEach((category, position) => {
    statements.push(
      db
        .insert(categories)
        .values({ ...category, position })
        .onConflictDoUpdate({
          target: categories.slug,
          set: { name: category.name, position },
        }),
    );
  });

  // `sizes` is pulled out so it doesn't reach the products insert; stock is written below
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const { category, sizes, ...product } of seedProducts) {
    const values = { ...product, badge: product.badge ?? null };
    statements.push(
      db
        .insert(products)
        .values({ ...values, categoryId: idBySlug("categories", category) })
        .onConflictDoUpdate({
          target: products.slug,
          set: { ...values, categoryId: idBySlug("categories", category), updatedAt: new Date() },
        }),
    );
  }

  const seededProductIds = db
    .select({ id: products.id })
    .from(products)
    .where(
      inArray(
        products.slug,
        seedProducts.map((p) => p.slug),
      ),
    );
  statements.push(db.delete(productStock).where(inArray(productStock.productId, seededProductIds)));

  statements.push(
    db.insert(productStock).values(
      seedProducts.flatMap((product) =>
        product.sizes.map((size, position) => ({
          productId: idBySlug("products", product.slug),
          size: size.label,
          quantity: size.stock,
          position,
        })),
      ),
    ),
  );

  // The HTTP driver has no interactive transactions; a batch runs as one.
  await db.batch(statements as [BatchItem<"pg">, ...BatchItem<"pg">[]]);

  const [counts] = await db.execute<{ categories: number; products: number; stock: number }>(sql`
    select
      (select count(*)::int from ${categories}) as categories,
      (select count(*)::int from ${products}) as products,
      (select count(*)::int from ${productStock}) as stock
  `).then((result) => result.rows);
  console.log(
    `Seeded: ${counts.categories} categories, ${counts.products} products, ${counts.stock} stock rows`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
