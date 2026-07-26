import { supabase } from "@/lib/supabase";
import GaleriGrid from "./GaleriGrid";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-white">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-24 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            Galeri Foto
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Dokumentasi Kegiatan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Galeri foto momen dan aktivitas KKN Kelompok 32 di Desa Pesantren, Kec. Tambak, Kab. Banyumas
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
            <p className="text-red-600">Gagal memuat data dokumentasi. Silakan coba lagi nanti.</p>
          </div>
        ) : galeri.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm px-6 py-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Foto</h3>
            <p className="text-gray-500">Belum ada foto dokumentasi yang ditampilkan untuk saat ini.</p>
          </div>
        ) : (
          <GaleriGrid galeri={galeri} />
        )}
      </main>
    </div>
  );
}
