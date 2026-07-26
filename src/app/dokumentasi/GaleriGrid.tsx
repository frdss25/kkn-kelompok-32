"use client";

import { useState } from "react";

type Dokumentasi = {
  id: string;
  judul: string;
  foto_url: string | null;
};

export default function GaleriGrid({ galeri }: { galeri: Dokumentasi[] }) {
  const [selected, setSelected] = useState<Dokumentasi | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {galeri.map((item, index) => (
          <figure
            key={item.id}
            onClick={() => setSelected(item)}
            className="animate-fade-in-up group relative cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute -inset-0.5 rounded-[1.75rem] bg-gradient-to-br from-cyan-400 via-teal-400 to-blue-400 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60" />

            <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5 transition-all duration-500 active:scale-[0.98] group-hover:-translate-y-2 group-hover:shadow-2xl">
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-cyan-100 to-teal-100">
                <img
                  src={item.foto_url!}
                  alt={item.judul}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m-3-3h6" />
                    </svg>
                    <span className="text-sm font-medium text-white">Lihat Foto</span>
                  </div>
                </div>
              </div>
              <figcaption className="border-t border-gray-100 bg-white px-4 py-3">
                <h2 className="text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover:text-cyan-600">
                  {item.judul}
                </h2>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Tutup"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="animate-lightbox-in max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.foto_url!}
              alt={selected.judul}
              className="max-h-[70vh] w-full object-contain bg-black"
            />
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">{selected.judul}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
