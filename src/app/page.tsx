import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProductCard } from "@/components/product-card";
import { ProductCarousel } from "@/components/product-carousel";
import { getProductsBySlug } from "@/lib/catalog";
import type { Product } from "@/lib/products";
import {
  accessorySlugs,
  categories,
  collections,
  hero,
  newArrivalSlugs,
  services,
  story,
} from "@/lib/sample-data";

// Refresh product data (stock in particular) at most once a minute
export const revalidate = 60;

export default async function Home() {
  const [newArrivals, accessories] = await Promise.all([
    getProductsBySlug(newArrivalSlugs),
    getProductsBySlug(accessorySlugs),
  ]);
  return (
    <main className="flex-1">
      <Hero />
      <Intro />
      <CategoryTiles />
      <NewArrivals products={newArrivals} />
      <Story />
      <Collections />
      <Accessories products={accessories} />
      <Services />
      <Newsletter />
    </main>
  );
}

function Hero() {
  const [primary, secondary] = hero.images;
  return (
    <section
      aria-labelledby="hero-title"
      className="theme-inverse media-scrim relative grid h-svh min-h-[36rem] md:grid-cols-2"
    >
      <div className="media-editorial">
        <Image
          src={primary.src}
          alt={primary.alt}
          fill
          sizes="(min-width: 48rem) 50vw, 100vw"
          loading="eager"
          fetchPriority="high"
          className="object-[50%_30%]"
        />
      </div>
      <div className="media-editorial hidden md:block">
        <Image
          src={secondary.src}
          alt={secondary.alt}
          fill
          sizes="50vw"
          loading="eager"
          fetchPriority="high"
          className="object-[50%_35%]"
        />
      </div>
      {/* Top shade keeps the transparent header legible */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-5 px-gutter pb-14 text-center text-white md:pb-20">
        <p className="text-label">{hero.season}</p>
        <h1 id="hero-title" className="text-display">
          {hero.title}
        </h1>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link href="/women" className="btn btn-overlay">
            Shop Women
          </Link>
          <Link href="/men" className="btn btn-overlay">
            Shop Men
          </Link>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="section container-prose text-center">
      <p className="text-label text-muted">Atelier</p>
      <p className="mt-6 font-serif text-2xl md:text-3xl">
        Considered pieces, made slowly by the hands that know them best, and
        built to be worn for years rather than seasons.
      </p>
      <Link href="/about" className="btn btn-text mt-8">
        Discover the house
      </Link>
    </section>
  );
}

function CategoryTiles() {
  return (
    <section aria-label="Shop by category" className="grid gap-px md:grid-cols-2">
      {categories.map((category) => (
        <Link
          key={category.href}
          href={category.href}
          className="media-editorial media-scrim group aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]"
        >
          <Image
            src={category.image}
            alt={category.alt}
            fill
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="transition-transform duration-1000 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-3 p-8 text-white md:p-12">
            <h2 className="text-heading">{category.title}</h2>
            <span className="btn-text text-xs font-medium">Shop the collection</span>
          </div>
        </Link>
      ))}
    </section>
  );
}

function SectionHeader({
  id,
  title,
  href,
  linkLabel,
}: {
  id: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="container-page mb-8 flex items-end justify-between gap-4 md:mb-10">
      <h2 id={id} className="text-heading">
        {title}
      </h2>
      {href && (
        <Link href={href} className="btn btn-text md:hidden">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="new-arrivals" className="section">
      <div className="container-page mb-8 flex items-end justify-between gap-4 md:mb-10">
        <h2 id="new-arrivals" className="text-heading">
          New Arrivals
        </h2>
        <Link href="/new-arrivals" className="btn btn-text">
          View all
        </Link>
      </div>
      <div className="grid-products">
        {products.map((product, i) => (
          <ProductCard
            key={product.slug}
            product={product}
            sizes="(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw"
            // 8 items fill 2 and 4 columns evenly; drop the last row's stragglers at 3
            className={i >= 6 ? "md:max-lg:hidden" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

function Story() {
  return (
    <section
      aria-labelledby="story-title"
      className="theme-inverse grid lg:grid-cols-2"
    >
      <div className="media-editorial aspect-[4/5] md:aspect-[4/3] lg:aspect-auto lg:min-h-[48rem]">
        <Image
          src={story.image}
          alt={story.alt}
          fill
          sizes="(min-width: 64rem) 50vw, 100vw"
          className="object-[50%_25%]"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-6 px-gutter py-section lg:px-24">
        <p className="text-label text-muted">{story.eyebrow}</p>
        <h2 id="story-title" className="text-display">
          {story.title}
        </h2>
        <p className="max-w-md text-sm text-subtle">{story.body}</p>
        <Link href={story.href} className="btn btn-secondary mt-2">
          Read the story
        </Link>
      </div>
    </section>
  );
}

function Collections() {
  return (
    <section aria-labelledby="collections" className="section">
      <SectionHeader id="collections" title="Featured Collections" />
      {/* Three tiles: skip the 2-up step so tablets don't leave an orphan */}
      <div className="grid-editorial gap-px md:grid-cols-3">
        {collections.map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className="group flex flex-col"
          >
            <div className="media-editorial aspect-[3/4]">
              <Image
                src={collection.image}
                alt=""
                fill
                sizes="(min-width: 48rem) 33vw, 100vw"
                className="transition-transform duration-1000 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col gap-1 px-gutter pt-5 pb-2 md:px-6">
              <h3 className="text-label">{collection.title}</h3>
              <p className="text-caption text-muted">{collection.description}</p>
              <span className="btn-text mt-2 self-start text-xs font-medium">
                Discover
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Accessories({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="accessories" className="section pt-0">
      <SectionHeader
        id="accessories"
        title="The Accessories Edit"
        href="/accessories"
        linkLabel="View all"
      />
      <ProductCarousel products={products} label="Accessories" />
    </section>
  );
}

function Services() {
  return (
    <section aria-label="Services" className="container-page">
      {/* 1px gaps over a line-colored ground draw the dividers at every column count */}
      <ul className="grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <li
            key={service.title}
            className="flex flex-col gap-1 bg-background px-6 py-8 text-center"
          >
            <h2 className="text-label">{service.title}</h2>
            <p className="text-caption text-muted">{service.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Newsletter() {
  return (
    <section aria-labelledby="newsletter" className="section bg-surface">
      <div className="container-prose flex flex-col gap-6 text-center">
        <h2 id="newsletter" className="text-heading">
          Newsletter
        </h2>
        <p className="text-sm text-subtle">
          Be the first to hear about new collections, private events and
          stories from the atelier.
        </p>
        <NewsletterForm />
        <p className="text-caption text-muted">
          By subscribing you agree to our{" "}
          <Link href="/privacy" className="link">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
