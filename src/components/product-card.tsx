import Image from "next/image";
import Link from "next/link";
import { formatPrice, totalStock, type Product } from "@/lib/products";

export function ProductCard({
  product,
  sizes,
  className,
}: {
  product: Product;
  sizes: string;
  className?: string;
}) {
  const [image] = product.images;
  const soldOut = totalStock(product) === 0;
  return (
    <article className={`product-card group ${className ?? ""}`}>
      {product.badge && (
        // Chip keeps the badge legible over photographic backdrops
        <span className="product-card__badge bg-background px-1.5 py-0.5 uppercase">
          {product.badge}
        </span>
      )}
      <Link href={`/products/${product.slug}`} className="flex flex-col">
        <div className="media-product">
          {/* Sample photos have their own backdrops, so crop instead of floating */}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className="object-cover p-0 transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="product-card__info">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-muted">{product.material}</p>
          <p className="product-card__price">
            {formatPrice(product.price)}
            {soldOut && <span className="ml-2 font-normal text-muted">Sold out</span>}
          </p>
        </div>
      </Link>
    </article>
  );
}
