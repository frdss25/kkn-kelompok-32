"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
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
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/admin/kegiatan"
              className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg text-center transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">Kelola Kegiatan</h2>
              <p className="text-blue-100">Kelola semua kegiatan KKN</p>
            </a>

            <a
              href="/admin/anggota"
              className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg text-center transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">Kelola Anggota</h2>
              <p className="text-green-100">Kelola data anggota KKN</p>
            </a>

            <a
              href="/admin/dokumentasi"
              className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg text-center transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">Kelola Dokumentasi</h2>
              <p className="text-purple-100">Kelola dokumentasi kegiatan</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
