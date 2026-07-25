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

export default async function KegiatanPage() {
  const { data, error } = await supabase
    .from("kegiatan")
    .select("id, judul, tanggal, deskripsi, foto_url")
    .order("tanggal", { ascending: false });

  const kegiatan = (data ?? []) as Kegiatan[];

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Kegiatan Kami
        </h1>
        <p className="mt-2 text-zinc-600">
          Dokumentasi kegiatan dan program KKN32.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          Gagal memuat data kegiatan. Silakan coba lagi nanti.
        </div>
      ) : kegiatan.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-12 text-center text-zinc-600">
          Belum ada kegiatan yang ditampilkan.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kegiatan.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              {item.foto_url ? (
                <div className="aspect-video overflow-hidden bg-zinc-100">
                  <img
                    src={item.foto_url}
                    alt={item.judul}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}

              <div className="space-y-3 p-5">
                <time
                  dateTime={item.tanggal}
                  className="block text-sm font-medium text-emerald-700"
                >
                  {formatTanggal(item.tanggal)}
                </time>
                <h2 className="text-lg font-semibold leading-snug text-zinc-900">
                  {item.judul}
                </h2>
                <p className="text-sm leading-relaxed text-zinc-600">
                  {item.deskripsi}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
