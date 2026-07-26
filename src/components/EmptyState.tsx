export default function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center text-zinc-600">
      {children}
    </div>
  );
}
