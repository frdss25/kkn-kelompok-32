import Link from "next/link";

const links = [
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/anggota", label: "Anggota" },
  { href: "/dokumentasi", label: "Dokumentasi" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-zinc-900">KKN Kelompok 32</p>
          <p className="mt-1 text-sm text-zinc-500">
            Dokumentasi program kerja dan kegiatan mahasiswa di lapangan.
          </p>
        </div>
        <ul className="flex flex-wrap gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-zinc-600 transition-colors hover:text-emerald-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-zinc-100 px-4 py-4 text-center text-xs text-zinc-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} KKN Kelompok 32. Seluruh hak cipta.
      </div>
    </footer>
  );
}
