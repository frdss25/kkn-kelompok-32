"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Anggota = {
  id: string;
  nama: string;
  foto_url: string | null;
};

function getInitials(nama: string) {
  return nama
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export default function TeamShowcase() {
  const [anggota, setAnggota] = useState<Anggota[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchAnggota() {
      const { data } = await supabase
        .from("anggota")
        .select("id, nama, foto_url")
        .order("nama", { ascending: true });
      if (active) {
        setAnggota((data ?? []) as Anggota[]);
        setLoading(false);
      }
    }
    fetchAnggota();
    return () => {
      active = false;
    };
  }, []);

  if (loading || anggota.length === 0) return null;

  // duplicate list so the marquee loops seamlessly
  const looped = [...anggota, ...anggota];
  const duration = Math.max(anggota.length * 3.5, 14);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 py-24">
      <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />
          <span className="text-sm font-medium text-white/90">Di Balik Layar</span>
        </div>
        <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
          Kenalan Sama{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Tim Kami
          </span>
        </h2>
        <p className="mx-auto mb-14 max-w-xl text-white/60">
          Orang-orang di balik setiap kegiatan KKN Kelompok 32
        </p>
      </div>

      {/* Marquee track */}
      <div className="group/marquee relative">
        <div
          className="flex w-max gap-8 px-4 [animation-name:marquee] [animation-timing-function:linear] [animation-iteration-count:infinite] group-hover/marquee:[animation-play-state:paused]"
          style={{ animationDuration: `${duration}s` }}
        >
          {looped.map((item, index) => {
            const initials = getInitials(item.nama);
            return (
              <Link
                href="/anggota"
                key={`${item.id}-${index}`}
                className="group/card flex w-28 flex-shrink-0 flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-2 sm:w-32"
              >
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-400 via-cyan-400 to-purple-400 opacity-0 blur-md transition-opacity duration-300 group-hover/card:opacity-70" />
                  <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-white/20 transition-all duration-300 group-hover/card:ring-white/60 sm:h-28 sm:w-28">
                    {item.foto_url ? (
                      <img
                        src={item.foto_url}
                        alt={item.nama}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
                        <span className="text-2xl font-bold text-white/90 select-none">
                          {initials || "?"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="max-w-[8rem] truncate text-sm font-medium text-white/80 transition-colors group-hover/card:text-white">
                  {item.nama}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-900 to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-900 to-transparent sm:w-32" />
      </div>

      <div className="relative mt-14 text-center">
        <Link
          href="/anggota"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/40"
        >
          Lihat Semua Anggota
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
