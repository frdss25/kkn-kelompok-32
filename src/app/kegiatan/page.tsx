import KegiatanList, { type Kegiatan } from "@/components/KegiatanList";
import PageHeader from "@/components/PageHeader";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export default async function KegiatanPage() {
  const { data, error } = await supabase
    .from("kegiatan")
    .select("id, judul, tanggal, deskripsi, foto_url")
    .order("tanggal", { ascending: false });

  const kegiatan = (data ?? []) as Kegiatan[];

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Program Kerja"
        title="Kegiatan Kami"
        description="Dokumentasi kegiatan dan program KKN Kelompok 32 di lapangan."
      />

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          Gagal memuat data kegiatan. Silakan coba lagi nanti.
        </div>
      ) : kegiatan.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center text-zinc-600">
          Belum ada kegiatan yang ditampilkan.
        </div>
      ) : (
        <KegiatanList kegiatan={kegiatan} />
      )}
    </main>
  );
}
