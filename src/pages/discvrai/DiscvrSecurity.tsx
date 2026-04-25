import { Lock, ShieldCheck, FileCheck, KeyRound, Server, EyeOff, AlertTriangle, BadgeCheck } from 'lucide-react';
import { GradientCTA, PageHero, SectionEyebrow } from './_shared';

const PILLARS = [
  { icon: Lock, t: 'AES-256 + TLS 1.3', d: 'All data encrypted at rest and in transit. No exceptions.' },
  { icon: KeyRound, t: 'Tokenised credentials', d: 'Bank, depository and AMC credentials never touch our servers.' },
  { icon: EyeOff, t: 'Read-before-write', d: 'The agent can read context anytime, but every write requires explicit OTP consent.' },
  { icon: Server, t: 'India-resident data', d: 'All PII stored in AWS Mumbai / Azure India with strict residency controls.' },
  { icon: FileCheck, t: 'Audit trail', d: 'Every chat decision, recommendation and execution is logged and replayable.' },
  { icon: AlertTriangle, t: 'Anomaly detection', d: 'Real-time monitoring of session, device and transaction patterns.' },
];

const BADGES = [
  { t: 'SEBI-registered', d: 'Investment Adviser / Distributor norms.' },
  { t: 'AMFI-compliant', d: 'ARN-issued mutual fund distribution.' },
  { t: 'ISO 27001 controls', d: 'Information security management.' },
  { t: 'SOC 2-aligned', d: 'Type II controls in progress.' },
  { t: 'DPDP-ready', d: 'India\'s data protection rules.' },
  { t: 'PCI DSS scope', d: 'No card data stored on our infra.' },
];

export default function DiscvrSecurity() {
  return (
    <>
      <PageHero
        eyebrow="Security & Compliance"
        title={<>Built for trust. Governed for scale.</>}
        subtitle="Wealth is sensitive. DiscvrAI is engineered with the same controls expected of regulated financial infrastructure."
      />

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-slate-900/5 bg-white p-6 shadow-sm">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow shadow-emerald-500/30">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-semibold text-slate-900">{t}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionEyebrow>Certifications & frameworks</SectionEyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          Aligned to the standards that matter.
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BADGES.map((b) => (
            <div key={b.t} className="flex items-start gap-4 rounded-2xl border border-slate-900/5 bg-white p-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{b.t}</div>
                <div className="text-xs text-slate-500">{b.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="overflow-hidden rounded-3xl border border-slate-900/5 bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-white">
          <div className="flex items-start gap-5">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-semibold tracking-tight">A clear promise</div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">
                We do not sell, share or monetise user data. Recommendations are independent of AMC payouts.
                The AI agent operates inside a strict permission model — it can never move money without your real-time consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <GradientCTA
        title="Compliance you can verify."
        subtitle="Need our security one-pager or DPA? We'll send it within one business day."
        secondary={{ label: 'Contact us', href: '/discvrai/contact' }}
      />
    </>
  );
}
