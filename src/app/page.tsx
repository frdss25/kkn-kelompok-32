import Link from "next/link";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

type KegiatanTerbaru = {
  id: string;
  judul: string;
  tanggal: string;
  deskripsi: string;
  foto_url: string | null;
};

const highlights = [
  {
    title: "Program Kerja",
    description:
      "Rangkaian kegiatan yang dirancang bersama masyarakat desa untuk dampak yang nyata.",
    href: "/kegiatan",
  },
  {
    title: "Tim Multidisiplin",
    description:
      "Anggota dari berbagai jurusan yang saling melengkapi di setiap program.",
    href: "/anggota",
  },
  {
    title: "Galeri Momen",
    description:
      "Kumpulan foto dokumentasi setiap kegiatan yang sudah terlaksana.",
    href: "/dokumentasi",
  },
];

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Home() {
  const [anggotaCount, kegiatanCount, dokumentasiCount, kegiatanTerbaru] =
    await Promise.all([
      supabase.from("anggota").select("id", { count: "exact", head: true }),
      supabase.from("kegiatan").select("id", { count: "exact", head: true }),
      supabase.from("dokumentasi").select("id", { count: "exact", head: true }),
      supabase
        .from("kegiatan")
        .select("id, judul, tanggal, deskripsi, foto_url")
        .order("tanggal", { ascending: false })
        .limit(3),
    ]);

  const stats = [
    { label: "Anggota", value: anggotaCount.count ?? 0 },
    { label: "Kegiatan", value: kegiatanCount.count ?? 0 },
    { label: "Foto Dokumentasi", value: dokumentasiCount.count ?? 0 },
  ];

  const terbaru = (kegiatanTerbaru.data ?? []) as KegiatanTerbaru[];

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-blob rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-24 h-72 w-72 animate-blob-slow rounded-full bg-teal-200/40 blur-3xl" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <span className="animate-fade-up rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 backdrop-blur">
            Kuliah Kerja Nyata · Kelompok 32
          </span>
          <h1 className="animate-fade-up text-4xl font-bold leading-tight tracking-tight text-zinc-900 [animation-delay:120ms] sm:text-5xl lg:text-6xl">
            Bergerak Bersama,{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Berdampak Nyata
            </span>
          </h1>
          <p className="max-w-2xl animate-fade-up text-lg leading-8 text-zinc-600 [animation-delay:220ms]">
            Website resmi KKN Kelompok 32 — tempat kami mendokumentasikan program
            kerja, profil anggota, dan momen kebersamaan dengan masyarakat desa.
          </p>
          <div className="flex animate-fade-up flex-col gap-3 [animation-delay:320ms] sm:flex-row">
            <Link
              href="/kegiatan"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl"
            >
              Lihat Kegiatan
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/anggota"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-7 text-sm font-semibold text-zinc-800 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700"
            >
              Kenali Tim Kami
            </Link>
          </div>

          <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 100}>
                <div className="rounded-2xl border border-zinc-100 bg-white/80 p-6 shadow-sm backdrop-blur transition-transform duration-300 hover:-translate-y-1">
                  <p className="text-4xl font-bold text-emerald-600">
                    <CountUp value={stat.value} suffix="+" />
                  </p>
                  <p className="mt-1 text-sm font-medium text-zinc-600">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Apa yang bisa kamu jelajahi?
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {highlights.map((item, index) => (
            <Reveal key={item.href} delay={index * 100}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
              >
                <h3 className="text-lg font-semibold text-zinc-900">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                  {item.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-emerald-700">
                  Selengkapnya
                  <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {terbaru.length > 0 ? (
        <section className="bg-zinc-50 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                  Kegiatan Terbaru
                </h2>
                <Link
                  href="/kegiatan"
                  className="text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
                >
                  Lihat semua →
                </Link>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {terbaru.map((item, index) => (
                <Reveal key={item.id} delay={index * 100}>
                  <article className="group h-full overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
                    <div className="space-y-2 p-5">
                      <time
                        dateTime={item.tanggal}
                        className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                      >
                        {formatTanggal(item.tanggal)}
                      </time>
                      <h3 className="text-lg font-semibold text-zinc-900">
                        {item.judul}
                      </h3>
                      <p className="line-clamp-3 text-sm leading-relaxed text-zinc-600">
                        {item.deskripsi}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-14 text-center text-white shadow-xl">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ikuti perjalanan KKN Kelompok 32
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-emerald-50">
              Setiap program, cerita, dan foto kami rangkum di sini. Jelajahi
              galeri dokumentasi untuk melihat momen terbaiknya.
            </p>
            <Link
              href="/dokumentasi"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-emerald-700 transition-transform hover:-translate-y-0.5"
            >
              Buka Galeri
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
