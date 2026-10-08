import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getNewArrivals } from "@/lib/catalog";

// Refresh product data (stock in particular) at most once a minute
export const revalidate = 60;

export const metadata: Metadata = {
  title: "New Arrivals · Atelier",
  description: "The latest pieces from the atelier, newly arrived.",
};

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return (
    <main className="flex-1">
      <header className="container-page flex flex-col gap-6 pt-8 pb-8 md:pt-12 md:pb-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-caption text-muted">
            <li>
              <Link href="/" className="link-muted">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              New Arrivals
            </li>
          </ol>
        </nav>
        <div className="flex flex-col gap-3">
          <h1 className="text-heading">New Arrivals</h1>
          <p className="max-w-md text-sm text-subtle">
            The latest pieces from the atelier, newly arrived.
          </p>
          <p className="text-caption text-muted">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </header>

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
