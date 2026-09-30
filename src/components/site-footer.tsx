import Link from "next/link";

const columns = [
  {
    title: "Client Services",
    links: [
      { href: "/contact", label: "Contact us" },
      { href: "/shipping", label: "Shipping" },
      { href: "/returns", label: "Returns" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "The House",
    links: [
      { href: "/about", label: "About Atelier" },
      { href: "/craft", label: "Craftsmanship" },
      { href: "/sustainability", label: "Sustainability" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    title: "Stores",
    links: [
      { href: "/stores", label: "Store locator" },
      { href: "/appointments", label: "Book an appointment" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of sale" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="theme-inverse">
      <div className="container-page section">
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4"
        >
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-label">{column.title}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-caption link-muted">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="container-page pb-8">
        <p
          aria-hidden="true"
          className="wordmark text-center text-[length:clamp(3rem,15vw,14rem)] tracking-[0.12em]"
        >
          Atelier
        </p>
        <hr className="hairline mt-8" />
        <div className="mt-6 flex flex-col gap-2 text-caption text-muted sm:flex-row sm:justify-between">
          <p>© 2026 Atelier. All rights reserved.</p>
          <p>United States · English · USD</p>
        </div>
      </div>
    </footer>
  );
}
