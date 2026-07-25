import { supabase } from "@/lib/supabase";

type Dokumentasi = {
  id: string;
  judul: string;
  foto_url: string | null;
};

export default async function DokumentasiPage() {
  const { data, error } = await supabase
    .from("dokumentasi")
    .select("id, judul, foto_url")
    .order("judul", { ascending: true });

  const dokumentasi = (data ?? []) as Dokumentasi[];
  const galeri = dokumentasi.filter((item) => item.foto_url);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Dokumentasi Kegiatan
        </h1>
        <p className="mt-2 text-zinc-600">
          Galeri foto momen dan aktivitas KKN32.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          Gagal memuat data dokumentasi. Silakan coba lagi nanti.
        </div>
      ) : galeri.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-12 text-center text-zinc-600">
          Belum ada foto dokumentasi yang ditampilkan.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galeri.map((item) => (
            <figure
              key={item.id}
              className="overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden bg-zinc-100">
                <img
                  src={item.foto_url!}
                  alt={item.judul}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="border-t border-zinc-100 px-4 py-3">
                <h2 className="text-sm font-semibold leading-snug text-zinc-900">
                  {item.judul}
                </h2>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </main>
  );
}
