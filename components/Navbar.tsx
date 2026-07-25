import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/anggota", label: "Anggota" },
  { href: "/dokumentasi", label: "Dokumentasi" },
];

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
