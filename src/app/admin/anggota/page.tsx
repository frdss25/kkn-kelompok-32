"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Anggota = {
  id: string;
  nama: string;
  jurusan: string;
  deskripsi: string;
  foto_url: string | null;
};

export default function AdminAnggotaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [anggota, setAnggota] = useState<Anggota[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    nama: string;
    jurusan: string;
    deskripsi: string;
    foto: File | null;
    foto_url?: string | null;
  }>({
    nama: "",
    jurusan: "",
    deskripsi: "",
    foto: null,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    } else {
      fetchAnggota();
    }
  };

  const fetchAnggota = async () => {
    const { data, error } = await supabase
      .from("anggota")
      .select("*")
      .order("nama", { ascending: true });
    
    if (data) {
      setAnggota(data as Anggota[]);
    }
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, foto: e.target.files[0] });
    }
  };

  const uploadFoto = async (file: File): Promise<string | null> => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("foto")
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("foto")
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let fotoUrl = formData.foto_url || null;
    if (formData.foto) {
      fotoUrl = await uploadFoto(formData.foto);
    }

    if (editingId) {
      // Edit existing
      const { error } = await supabase
        .from("anggota")
        .update({
          nama: formData.nama,
          jurusan: formData.jurusan,
          deskripsi: formData.deskripsi,
          ...(fotoUrl && { foto_url: fotoUrl }),
        })
        .eq("id", editingId);

      if (!error) {
        setShowForm(false);
        setEditingId(null);
        resetForm();
        fetchAnggota();
      }
    } else {
      // Add new
      const { error } = await supabase
        .from("anggota")
        .insert({
          nama: formData.nama,
          jurusan: formData.jurusan,
          deskripsi: formData.deskripsi,
          foto_url: fotoUrl,
        });

      if (!error) {
        setShowForm(false);
        resetForm();
        fetchAnggota();
      }
    }

    setSubmitting(false);
  };

  const handleEdit = (item: Anggota) => {
    setEditingId(item.id);
    setFormData({
      nama: item.nama,
      jurusan: item.jurusan,
      deskripsi: item.deskripsi,
      foto: null,
      foto_url: item.foto_url,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus anggota ini?")) return;

    const { error } = await supabase.from("anggota").delete().eq("id", id);
    if (!error) {
      fetchAnggota();
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      jurusan: "",
      deskripsi: "",
      foto: null,
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    resetForm();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Kelola Anggota</h1>
          <button
            onClick={() => router.push("/admin")}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            ← Kembali ke Dashboard
          </button>
        </div>

        {!showForm ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-6"
            >
              Tambah Anggota Baru
            </button>

            {anggota.length === 0 ? (
              <p className="text-gray-500">Belum ada anggota.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Foto</th>
                      <th className="text-left py-3 px-4">Nama</th>
                      <th className="text-left py-3 px-4">Jurusan</th>
                      <th className="text-left py-3 px-4">Deskripsi</th>
                      <th className="text-left py-3 px-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {anggota.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          {item.foto_url && (
                            <img
                              src={item.foto_url}
                              alt={item.nama}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                        </td>
                        <td className="py-3 px-4 font-medium">{item.nama}</td>
                        <td className="py-3 px-4">{item.jurusan}</td>
                        <td className="py-3 px-4 max-w-xs truncate">{item.deskripsi}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {editingId ? "Edit Anggota" : "Tambah Anggota Baru"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jurusan
                </label>
                <input
                  type="text"
                  value={formData.jurusan}
                  onChange={(e) => setFormData({ ...formData, jurusan: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  {submitting ? "Memproses..." : editingId ? "Update" : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
