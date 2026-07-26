"use client";

import { useMemo, useState } from "react";
import EmptyState from "@/components/EmptyState";
import Reveal from "@/components/Reveal";
import SearchInput from "@/components/SearchInput";

export type Kegiatan = {
  id: string;
  judul: string;
  tanggal: string;
  deskripsi: string;
  foto_url: string | null;
};

type SortOrder = "terbaru" | "terlama";

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function KegiatanList({ kegiatan }: { kegiatan: Kegiatan[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOrder>("terbaru");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    const result = kegiatan.filter(
      (item) =>
        !keyword ||
        item.judul.toLowerCase().includes(keyword) ||
        item.deskripsi.toLowerCase().includes(keyword)
    );

    return result.sort((a, b) => {
      const diff = new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime();
      return sort === "terbaru" ? diff : -diff;
    });
  }, [kegiatan, query, sort]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Cari kegiatan..."
        />
        <div className="flex items-center gap-2">
          {(["terbaru", "terlama"] as SortOrder[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSort(option)}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-all ${
                sort === option
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "border border-zinc-200 text-zinc-600 hover:border-emerald-300 hover:text-emerald-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-zinc-500">
        Menampilkan {filtered.length} dari {kegiatan.length} kegiatan
      </p>

      {filtered.length === 0 ? (
        <EmptyState>Tidak ada kegiatan yang cocok dengan pencarian.</EmptyState>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, index) => {
            const isOpen = expanded === item.id;
            return (
              <Reveal key={item.id} delay={Math.min(index, 6) * 60}>
                <article className="group h-full overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
                  {item.foto_url ? (
                    <div className="aspect-video overflow-hidden bg-zinc-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.foto_url}
                        alt={item.judul}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : null}

                  <div className="space-y-3 p-5">
                    <time
                      dateTime={item.tanggal}
                      className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                    >
                      {formatTanggal(item.tanggal)}
                    </time>
                    <h2 className="text-lg font-semibold leading-snug text-zinc-900">
                      {item.judul}
                    </h2>
                    <p
                      className={`text-sm leading-relaxed text-zinc-600 ${
                        isOpen ? "" : "line-clamp-3"
                      }`}
                    >
                      {item.deskripsi}
                    </p>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : item.id)}
                      className="text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
                    >
                      {isOpen ? "Tutup" : "Selengkapnya"}
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
