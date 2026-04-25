import { Check, Sparkles, Building2 } from 'lucide-react';
import { GradientCTA, PageHero } from './_shared';
import { APP_URL } from './_shared';

const TIERS = [
  {
    name: 'Free',
    price: '₹0',
    tag: 'Always',
    desc: 'For everyone investing in mutual funds. Zero commission, ever.',
    cta: 'Get started',
    href: APP_URL,
    highlight: false,
    features: [
      'Unlimited chat with Wealth Copilot',
      'All 5,000+ direct mutual funds',
      'SIPs, lumpsum, switch, redeem',
      'Goals, calculators, statements',
      'Unified portfolio across AMCs',
      'Tax & capital gains reports',
    ],
  },
  {
    name: 'Pro',
    price: '₹299',
    tag: 'per month',
    desc: 'For serious investors. Deeper AI, advanced planning, priority support.',
    cta: 'Start 14-day trial',
    href: APP_URL,
    highlight: true,
    features: [
      'Everything in Free',
      'Multi-portfolio (family) view',
      'Advanced rebalancing engine',
      'Tax-loss harvesting suggestions',
      'Priority chat + WhatsApp support',
      'Personal financial check-up reports',
      'Smart alerts & nudges',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    tag: 'Talk to us',
    desc: 'For wealth distributors, family offices and IFAs. White-labelled.',
    cta: 'Contact sales',
    href: '/discvrai/contact',
    highlight: false,
    features: [
      'Everything in Pro',
      'Multi-tenant client management',
      'Custom branding & domain',
      'API access & data export',
      'Dedicated success manager',
      'SLA, audit logs, SSO',
    ],
  },
];

export default function DiscvrPricing() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={<>Simple, honest pricing. Always commission-free.</>}
        subtitle="We make money from subscriptions and enterprise — never from fund houses. Your interests stay aligned with ours."
      />

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl border p-8 shadow-sm ${
                t.highlight
                  ? 'border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 ring-2 ring-indigo-500/30'
                  : 'border-slate-900/5 bg-white'
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow">
                  <Sparkles className="h-3 w-3" /> Most popular
                </div>
              )}
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">{t.name}</div>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="text-4xl font-semibold tracking-tight text-slate-900">{t.price}</div>
                <div className="text-sm text-slate-500">{t.tag}</div>
              </div>
              <p className="mt-3 text-sm text-slate-600">{t.desc}</p>

              <ul className="mt-7 space-y-3 text-sm text-slate-700">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {f}
                  </li>
                ))}
              </ul>

              <a
                href={t.href}
                target={t.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  t.highlight
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow shadow-indigo-500/30 hover:opacity-95'
                    : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h2 className="text-2xl font-semibold tracking-tight">Pricing FAQ</h2>
        <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-900/5 bg-white">
          {[
            ['Are mutual fund investments really commission-free?', 'Yes. DiscvrAI only sells direct mutual funds. We never receive commission from AMCs.'],
            ['Is there any charge to open an account?', 'No. Account opening, KYC and account maintenance are free.'],
            ['Can I cancel Pro anytime?', 'Yes — cancel any time, no lock-in. Your account downgrades to Free at the next billing cycle.'],
            ['Do you offer family plans?', 'Pro includes multi-portfolio (up to 4 members) at no extra cost.'],
            ['What\'s included in Enterprise?', 'White-labelling, multi-tenant control, SSO, SLAs, dedicated CSM and API access. Talk to sales.'],
          ].map(([q, a]) => (
            <details key={q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900">
                {q}
                <span className="ml-4 text-xl text-slate-400 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Enterprise band */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="flex flex-col items-start gap-6 rounded-3xl border border-slate-900/5 bg-slate-900 p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-semibold tracking-tight">For wealth distributors & family offices</div>
              <div className="mt-1 text-sm text-white/70">
                White-label DiscvrAI for your clients. Branded chat, your fund universe, your data.
              </div>
            </div>
          </div>
          <a
            href="/discvrai/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Talk to sales
          </a>
        </div>
      </section>

      <GradientCTA
        title="Try Pro free for 14 days. No card needed."
        subtitle="Get the full Wealth Copilot experience — and downgrade anytime."
      />
    </>
  );
}
