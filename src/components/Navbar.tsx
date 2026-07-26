"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/anggota", label: "Anggota" },
  { href: "/dokumentasi", label: "Dokumentasi" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-zinc-200 bg-white/80 shadow-sm backdrop-blur-md"
          : "border-transparent bg-white"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            32
          </span>
          <span className="text-base font-bold tracking-tight text-zinc-900">
            KKN Kelompok 32
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-emerald-700"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Buka menu navigasi"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-100 md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                open ? "top-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                open ? "top-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-zinc-100 transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-1 px-4 py-3 sm:px-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
