import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

export const APP_URL = 'https://agent.discvr.ai/discovery?view=invest';

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
      {children}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:pt-24 md:pb-14">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{subtitle}</p>
    </section>
  );
}

export function GradientCTA({
  title,
  subtitle,
  primary = 'Launch the app',
  secondary,
}: {
  title: string;
  subtitle: string;
  primary?: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-slate-900/5 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-8 py-14 text-white shadow-xl shadow-indigo-500/20 md:px-14">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
          <p className="mt-3 text-base text-white/85 md:text-lg">{subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={APP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 shadow hover:bg-slate-100"
            >
              {primary} <ArrowRight className="h-4 w-4" />
            </a>
            {secondary && (
              <a
                href={secondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                {secondary.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatRow({ stats }: { stats: Array<{ k: string; v: string }> }) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-900/5 bg-slate-900/5 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.k} className="bg-white/80 p-6 backdrop-blur">
          <div className="text-3xl font-semibold tracking-tight text-slate-900">{s.v}</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{s.k}</div>
        </div>
      ))}
    </div>
  );
}
