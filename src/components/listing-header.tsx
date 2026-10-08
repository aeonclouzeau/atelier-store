import Link from "next/link";

/** Breadcrumb, title and piece count that open a product listing page. */
export function ListingHeader({
  title,
  description,
  count,
}: {
  title: string;
  description: string;
  count: number;
}) {
  return (
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
            {title}
          </li>
        </ol>
      </nav>
      <div className="flex flex-col gap-3">
        <h1 className="text-heading">{title}</h1>
        <p className="max-w-md text-sm text-subtle">{description}</p>
        <p className="text-caption text-muted">
          {count} {count === 1 ? "piece" : "pieces"}
        </p>
      </div>
    </header>
  );
}
