import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingHeader } from "@/components/listing-header";
import { ProductCard } from "@/components/product-card";
import { getCategorySlugs, getCategoryWithProducts } from "@/lib/catalog";

// Refresh product data (stock in particular) at most once a minute
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const result = await getCategoryWithProducts(slug);
  if (!result) return {};
  return {
    title: `${result.category.name} · Atelier`,
    description: `Shop ${result.category.name} from the atelier.`,
  };
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const { category: slug } = await params;
  const result = await getCategoryWithProducts(slug);
  if (!result) notFound();

  const { category, products } = result;

  return (
    <main className="flex-1">
      <ListingHeader
        title={category.name}
        description={`Shop ${category.name} from the atelier.`}
        count={products.length}
      />

      {products.length > 0 ? (
        <section
          aria-label={category.name}
          className="border-t border-line pb-section"
        >
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
          <Link href="/new-arrivals" className="btn btn-secondary mt-6">
            View new arrivals
          </Link>
        </section>
      )}
    </main>
  );
}
