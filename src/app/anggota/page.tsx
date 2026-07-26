import { supabase } from "@/lib/supabase";

type Anggota = {
  id: string;
  nama: string;
  jurusan: string;
  deskripsi: string;
  foto_url: string | null;
};

export default async function AnggotaPage() {
  const { data, error } = await supabase
    .from("anggota")
    .select("id, nama, jurusan, deskripsi, foto_url")
    .order("nama", { ascending: true });

  const anggota = (data ?? []) as Anggota[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-white">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-24 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Tim KKN 2026
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Anggota Kelompok
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kenali anggota tim KKN Kelompok 32 yang berkontribusi di Desa Pesantren, Kec. Tambak, Kab. Banyumas
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
            <p className="text-red-600">Gagal memuat data anggota. Silakan coba lagi nanti.</p>
          </div>
        ) : anggota.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm px-6 py-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Anggota</h3>
            <p className="text-gray-500">Belum ada anggota yang ditampilkan untuk saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {anggota.map((item, index) => {
              const initials = item.nama
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((word) => word[0]?.toUpperCase())
                .join("");

              return (
              <article
                key={item.id}
                className="animate-fade-in-up group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.foto_url ? (
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                    <img
                      src={item.foto_url}
                      alt={item.nama}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-5xl font-bold text-white/90 select-none">
                      {initials || "?"}
                    </span>
                  </div>
                )}

                <div className="space-y-4 p-6">
                  <h2 className="text-xl font-bold leading-snug text-gray-900 group-hover:text-purple-600 transition-colors">
                    {item.nama}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    {item.jurusan}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
                    {item.deskripsi}
                  </p>
                  <div className="pt-2">
                    <div className="h-1 w-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
