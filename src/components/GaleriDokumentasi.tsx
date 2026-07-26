"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import EmptyState from "@/components/EmptyState";
import Reveal from "@/components/Reveal";
import SearchInput from "@/components/SearchInput";

export type Dokumentasi = {
  id: string;
  judul: string;
  foto_url: string;
};

export default function GaleriDokumentasi({ galeri }: { galeri: Dokumentasi[] }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return galeri.filter((item) => item.judul.toLowerCase().includes(keyword));
  }, [galeri, query]);

  const close = useCallback(() => setActiveIndex(null), []);

  const move = useCallback(
    (step: number) => {
      setActiveIndex((current) => {
        if (current === null || filtered.length === 0) return current;
        return (current + step + filtered.length) % filtered.length;
      });
    },
    [filtered.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, move]);

  const active = activeIndex === null ? null : filtered[activeIndex];

  return (
    <div className="space-y-8">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Cari judul foto..."
      />

      <p className="text-sm text-zinc-500">
        Menampilkan {filtered.length} dari {galeri.length} foto
      </p>

      {filtered.length === 0 ? (
        <EmptyState>Tidak ada foto yang cocok dengan pencarian.</EmptyState>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, index) => (
            <Reveal key={item.id} delay={Math.min(index, 8) * 50}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-100"
              >
                <div className="aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.foto_url}
                    alt={item.judul}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-3 text-left text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0">
                  {item.judul}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      )}

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.judul}
          onClick={close}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Tutup galeri"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>

          {filtered.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Foto sebelumnya"
                onClick={(event) => {
                  event.stopPropagation();
                  move(-1);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M15 5 8 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Foto berikutnya"
                onClick={(event) => {
                  event.stopPropagation();
                  move(1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          ) : null}

          <figure
            onClick={(event) => event.stopPropagation()}
            className="max-h-full w-full max-w-4xl overflow-hidden rounded-2xl bg-zinc-950"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.foto_url}
              alt={active.judul}
              className="max-h-[75vh] w-full object-contain"
            />
            <figcaption className="flex items-center justify-between gap-4 px-5 py-4 text-sm text-white">
              <span className="font-medium">{active.judul}</span>
              <span className="text-white/60">
                {(activeIndex ?? 0) + 1} / {filtered.length}
              </span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
