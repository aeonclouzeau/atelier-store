import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlusIcon } from "@/components/icons";
import { ProductCarousel } from "@/components/product-carousel";
import { ProductPurchase } from "@/components/product-purchase";
import {
  categories,
  formatPrice,
  getProduct,
  getRelatedProducts,
  products,
} from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} · Atelier`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = categories[product.category];
  const related = getRelatedProducts(product);

  return (
    <main className="flex-1">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(24rem,32rem)] xl:grid-cols-[minmax(0,1fr)_36rem]">
        {/* Gallery: swipeable strip on small screens, two-up grid on desktop where an
            odd last frame becomes a full-width detail band */}
        <section aria-label="Product images">
          <ul className="scroller gap-px lg:grid lg:grid-cols-2 lg:overflow-visible">
            {product.images.map((image, i) => {
              const band = i > 0 && i === product.images.length - 1 && i % 2 === 0;
              return (
                <li
                  key={image.src}
                  className={`w-[88vw] sm:w-[60vw] lg:w-auto ${band ? "lg:col-span-2" : ""}`}
                >
                  <div
                    className={`media-editorial aspect-[4/5] bg-surface ${band ? "lg:aspect-[8/5]" : ""}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={`(min-width: 64rem) ${band ? 60 : 30}vw, (min-width: 30rem) 60vw, 88vw`}
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : undefined}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="px-gutter pt-8 pb-section lg:px-12 lg:pt-12 xl:px-16">
          <div className="flex flex-col gap-8 lg:sticky lg:top-[calc(var(--spacing-header)+3rem)]">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-caption text-muted">
                <li>
                  <Link href="/" className="link-muted">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={category.href} className="link-muted">
                    {category.label}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-foreground">
                  {product.name}
                </li>
              </ol>
            </nav>

            <header className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <p className="text-label text-muted">{category.label}</p>
                {product.badge && (
                  <span className="text-badge border border-line-strong px-1.5 py-0.5 uppercase">
                    {product.badge}
                  </span>
                )}
              </div>
              <h1 className="text-title font-medium md:text-lg">{product.name}</h1>
              <p className="text-base font-medium">{formatPrice(product.price)}</p>
              <p className="text-caption text-muted">
                {product.color} · {product.material}
              </p>
            </header>

            <ProductPurchase product={product} />

            <div className="border-b border-line">
              <Disclosure title="Description" open>
                <p>{product.description}</p>
                <p className="mt-3 text-muted">Style {product.styleCode}</p>
              </Disclosure>
              <Disclosure title="Details and care">
                <ul className="list-disc space-y-1 pl-4">
                  {product.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </Disclosure>
              <Disclosure title="Shipping and returns">
                <p>
                  Complimentary express shipping on every order, delivered in 2–4
                  business days. Returns are free within 30 days of delivery.
                </p>
              </Disclosure>
            </div>

            <ul className="flex flex-col gap-1 text-caption text-muted">
              <li>Complimentary shipping and returns</li>
              <li>Signature gift packaging available</li>
              <li>
                Need help?{" "}
                <Link href="/contact" className="link text-foreground">
                  Contact client services
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section aria-labelledby="related" className="section border-t border-line">
        <h2 id="related" className="text-heading container-page mb-8 md:mb-10">
          You may also like
        </h2>
        <ProductCarousel products={related} label="Related products" />
      </section>
    </main>
  );
}

function Disclosure({
  title,
  open,
  children,
}: {
  title: string;
  open?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={open} className="group border-t border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-label [&::-webkit-details-marker]:hidden">
        {title}
        <PlusIcon className="size-4 transition-transform group-open:rotate-45" />
      </summary>
      <div className="pb-5 text-sm text-subtle">{children}</div>
    </details>
  );
}
