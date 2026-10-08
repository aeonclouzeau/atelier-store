import type { Metadata } from "next";
import Link from "next/link";
import { ListingHeader } from "@/components/listing-header";
import { ProductCard } from "@/components/product-card";
import { getNewArrivals } from "@/lib/catalog";

// Refresh product data (stock in particular) at most once a minute
export const revalidate = 60;

const description = "The latest pieces from the atelier, newly arrived.";

export const metadata: Metadata = {
  title: "New Arrivals · Atelier",
  description,
};

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return (
    <main className="flex-1">
      <ListingHeader
        title="New Arrivals"
        description={description}
        count={products.length}
      />

      {products.length > 0 ? (
        <section aria-label="New arrivals" className="border-t border-line pb-section">
          <div className="grid-products">
            {products.map((product, i) => (
              <ProductCard
                key={product.slug}
                product={product}
                sizes="(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw"
                priority={i < 4}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="container-prose section border-t border-line text-center">
          <p className="text-sm text-subtle">
            New pieces are on their way. Please check back soon.
          </p>
          <Link href="/" className="btn btn-secondary mt-6">
            Back to home
          </Link>
        </section>
      )}
    </main>
  );
}
