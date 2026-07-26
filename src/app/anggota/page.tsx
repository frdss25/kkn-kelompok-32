import AnggotaList, { type Anggota } from "@/components/AnggotaList";
import PageHeader from "@/components/PageHeader";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export default async function AnggotaPage() {
  const { data, error } = await supabase
    .from("anggota")
    .select("id, nama, jurusan, deskripsi, foto_url")
    .order("nama", { ascending: true });

  const anggota = (data ?? []) as Anggota[];

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Tim Kami"
        title="Anggota Kelompok"
        description="Kenali anggota tim KKN Kelompok 32 yang berkontribusi di lapangan."
      />

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          Gagal memuat data anggota. Silakan coba lagi nanti.
        </div>
      ) : anggota.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center text-zinc-600">
          Belum ada anggota yang ditampilkan.
        </div>
      ) : (
        <AnggotaList anggota={anggota} />
      )}
    </main>
  );
}
