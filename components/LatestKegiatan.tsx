"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Kegiatan = {
  id: string;
  judul: string;
  tanggal: string;
  deskripsi: string;
  foto_url: string | null;
};

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function LatestKegiatan() {
  const [kegiatan, setKegiatan] = useState<Kegiatan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchLatest() {
      const { data } = await supabase
        .from("kegiatan")
        .select("id, judul, tanggal, deskripsi, foto_url")
        .order("tanggal", { ascending: false })
        .limit(3);
      if (active) {
        setKegiatan((data ?? []) as Kegiatan[]);
        setLoading(false);
      }
    }
    fetchLatest();
    return () => {
      active = false;
    };
  }, []);

  if (loading || kegiatan.length === 0) return null;

  return (
    <section className="relative bg-gradient-to-b from-slate-900 to-blue-950 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              <span className="text-sm font-medium text-white/90">Terbaru</span>
            </div>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Kegiatan{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Terkini
              </span>
            </h2>
          </div>
          <Link
            href="/kegiatan"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20 sm:inline-flex"
          >
            Lihat Semua
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {kegiatan.map((item, index) => (
            <Link
              href="/kegiatan"
              key={item.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-white/10 active:scale-[0.98]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                {item.foto_url ? (
                  <img
                    src={item.foto_url}
                    alt={item.judul}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600/40 to-purple-600/40">
                    <svg className="h-14 w-14 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                <time
                  dateTime={item.tanggal}
                  className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-md backdrop-blur-md"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  {formatTanggal(item.tanggal)}
                </time>
              </div>
              <div className="space-y-2 p-5">
                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-blue-300">
                  {item.judul}
                </h3>
                <p className="line-clamp-2 text-sm text-white/60">{item.deskripsi}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/kegiatan"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md"
          >
            Lihat Semua Kegiatan
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
