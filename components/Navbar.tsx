"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/anggota", label: "Anggota" },
  { href: "/dokumentasi", label: "Dokumentasi" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-slate-900/80 backdrop-blur-lg border-b border-white/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex-shrink-0 group" onClick={() => setMenuOpen(false)}>
          <div className="relative">
            <Image
              src="/logo.png"
              alt="KKN32 Logo"
              width={130}
              height={33}
              className="h-8 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-9"
              priority
            />
          </div>
        </Link>

        <ul className="hidden sm:flex flex-wrap items-center gap-2 sm:gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-white/80 transition-all duration-300 hover:text-white rounded-full hover:bg-white/10 backdrop-blur-sm group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="sm:hidden flex-shrink-0 p-2 rounded-lg text-white/90 hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <ul className="sm:hidden flex flex-col gap-1 px-4 pb-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-white/90 rounded-lg hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
