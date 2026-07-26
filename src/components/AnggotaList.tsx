"use client";

import { useMemo, useState } from "react";
import EmptyState from "@/components/EmptyState";
import Reveal from "@/components/Reveal";
import SearchInput from "@/components/SearchInput";

export type Anggota = {
  id: string;
  nama: string;
  jurusan: string;
  deskripsi: string;
  foto_url: string | null;
};

function initials(nama: string) {
  return nama
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function AnggotaList({ anggota }: { anggota: Anggota[] }) {
  const [query, setQuery] = useState("");
  const [jurusan, setJurusan] = useState("Semua");

  const daftarJurusan = useMemo(
    () => ["Semua", ...Array.from(new Set(anggota.map((item) => item.jurusan))).sort()],
    [anggota]
  );

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return anggota.filter((item) => {
      const cocokJurusan = jurusan === "Semua" || item.jurusan === jurusan;
      const cocokKeyword =
        !keyword ||
        item.nama.toLowerCase().includes(keyword) ||
        item.jurusan.toLowerCase().includes(keyword) ||
        item.deskripsi.toLowerCase().includes(keyword);
      return cocokJurusan && cocokKeyword;
    });
  }, [anggota, query, jurusan]);

  return (
    <div className="space-y-8">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Cari nama atau jurusan..."
      />

      {daftarJurusan.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {daftarJurusan.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setJurusan(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                jurusan === item
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "border border-zinc-200 text-zinc-600 hover:border-emerald-300 hover:text-emerald-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      <p className="text-sm text-zinc-500">
        Menampilkan {filtered.length} dari {anggota.length} anggota
      </p>

      {filtered.length === 0 ? (
        <EmptyState>Tidak ada anggota yang cocok dengan pencarian.</EmptyState>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, index) => (
            <Reveal key={item.id} delay={Math.min(index, 6) * 60}>
              <article className="group h-full overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-emerald-50 to-zinc-100">
                  {item.foto_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.foto_url}
                      alt={item.nama}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-emerald-600/70">
                      {initials(item.nama)}
                    </div>
                  )}
                </div>

                <div className="space-y-2 p-5">
                  <h2 className="text-lg font-semibold leading-snug text-zinc-900">
                    {item.nama}
                  </h2>
                  <p className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.jurusan}
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-600">
                    {item.deskripsi}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
