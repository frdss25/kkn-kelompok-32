import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-24 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Program KKN 2026
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Kegiatan Kami
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dokumentasi kegiatan dan program KKN Kelompok 32 di Desa Pesantren, Kec. Tambak, Kab. Banyumas
          </p>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.087 0 1.987-.9 1.987-1.987V5.007A1.987 1.987 0 0012 3.013c-1.087 0-1.987.9-1.987 1.987v13.987c0 1.087.9 1.987 1.987 1.987z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-700 mb-2">Gagal Memuat Data</h3>
            <p className="text-red-600">Gagal memuat data kegiatan. Silakan coba lagi nanti.</p>
          </div>
        ) : kegiatan.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm px-6 py-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Kegiatan</h3>
            <p className="text-gray-500">Belum ada kegiatan yang ditampilkan untuk saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {kegiatan.map((item, index) => (
              <article
                key={item.id}
                className="animate-fade-in-up group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.foto_url ? (
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                    <img
                      src={item.foto_url}
                      alt={item.judul}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                <div className="space-y-4 p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <time
                      dateTime={item.tanggal}
                      className="text-sm font-semibold text-blue-600"
                    >
                      {formatTanggal(item.tanggal)}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold leading-snug text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.judul}
                  </h2>
                  <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
                    {item.deskripsi}
                  </p>
                  <div className="pt-2">
                    <div className="h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
