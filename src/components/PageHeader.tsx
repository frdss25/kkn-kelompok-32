type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mb-10">
      {eyebrow ? (
        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-zinc-600">{description}</p>
    </div>
  );
}
