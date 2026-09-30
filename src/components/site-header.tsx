"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  BagIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons";

const primaryNav = [
  { href: "/women", label: "Women" },
  { href: "/men", label: "Men" },
  { href: "/collections/leather-goods", label: "Bags" },
  { href: "/collections/fine-jewellery", label: "Jewellery" },
  { href: "/gifts", label: "Gifts" },
];

const secondaryNav = [
  { href: "/account", label: "Sign in" },
  { href: "/wishlist", label: "Saved items" },
  { href: "/stores", label: "Store locator" },
  { href: "/contact", label: "Client services" },
];

// Pages that open on a full-bleed hero get a transparent header until scrolled
const overlayRoutes = new Set(["/"]);

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 40,
    () => false,
  );

  const overlay = overlayRoutes.has(pathname);
  const transparent = overlay && !scrolled && !menuOpen;

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      data-transparent={transparent}
      className={`site-header border-b ${overlay ? "fixed inset-x-0" : ""} ${
        transparent ? "border-transparent" : "border-line"
      }`}
    >
      {/* Left: menu toggle below lg, primary nav above */}
      <div className="flex items-center gap-1 lg:gap-6">
        <button
          type="button"
          className="btn-icon -ml-2.5 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex gap-6">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-label link-nav"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/search" className="btn-icon lg:hidden">
          <SearchIcon />
          <span className="sr-only">Search</span>
        </Link>
      </div>

      <Link href="/" className="wordmark" onClick={closeMenu}>
        Atelier
      </Link>

      <div className="-mr-2.5 flex items-center justify-end gap-1">
        <Link href="/search" className="btn-icon hidden lg:inline-flex">
          <SearchIcon />
          <span className="sr-only">Search</span>
        </Link>
        <Link href="/account" className="btn-icon hidden sm:inline-flex">
          <UserIcon />
          <span className="sr-only">Account</span>
        </Link>
        <Link href="/wishlist" className="btn-icon hidden sm:inline-flex">
          <HeartIcon />
          <span className="sr-only">Saved items</span>
        </Link>
        <Link href="/bag" className="btn-icon">
          <BagIcon />
          <span className="sr-only">Shopping bag, 0 items</span>
        </Link>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-header bottom-0 overflow-y-auto bg-background px-gutter pb-12 pt-8 lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-heading link-nav"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <hr className="hairline my-8" />
            <ul className="flex flex-col gap-4">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-caption link-muted"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
