import GaleriDokumentasi, { type Dokumentasi } from "@/components/GaleriDokumentasi";
import PageHeader from "@/components/PageHeader";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

type DokumentasiRow = {
  id: string;
  judul: string;
  foto_url: string | null;
};

export default async function DokumentasiPage() {
  const { data, error } = await supabase
    .from("dokumentasi")
    .select("id, judul, foto_url")
    .order("judul", { ascending: true });

  const dokumentasi = (data ?? []) as DokumentasiRow[];
  const galeri = dokumentasi.filter(
    (item): item is Dokumentasi => Boolean(item.foto_url)
  );

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Galeri"
        title="Dokumentasi Kegiatan"
        description="Klik foto untuk melihat versi besar, gunakan panah kiri/kanan untuk berpindah."
      />

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          Gagal memuat data dokumentasi. Silakan coba lagi nanti.
        </div>
      ) : galeri.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center text-zinc-600">
          Belum ada foto dokumentasi yang ditampilkan.
        </div>
      ) : (
        <GaleriDokumentasi galeri={galeri} />
      )}
    </main>
  );
}
