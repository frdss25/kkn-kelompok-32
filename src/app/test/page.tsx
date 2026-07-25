import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase.from("kegiatan").select("*");

  return (
    <main className="p-8">
      <h1 className="mb-4 text-xl font-semibold">Test Koneksi Supabase</h1>
      <pre className="overflow-auto rounded bg-zinc-100 p-4 text-sm">
        {JSON.stringify({ data, error }, null, 2)}
      </pre>
    </main>
  );
}
