import { MessageSquare, Brain, Zap, ShieldCheck, Target, TrendingUp, RefreshCw, FileText, Bell, Search, Receipt, Calculator } from 'lucide-react';
import { GradientCTA, PageHero, SectionEyebrow } from './_shared';

const FEATURES = [
  { icon: MessageSquare, t: 'Agentic chat-first UX', d: 'Every action — research, invest, switch, redeem — happens inside one conversation.' },
  { icon: Brain, t: 'Context-aware copilot', d: 'The agent reads your portfolio, goals, risk score and tax bracket before responding.' },
  { icon: Zap, t: 'One-tap execution', d: 'Confirm SIPs and lumpsum buys with a single OTP — no forms, no jargon.' },
  { icon: Target, t: 'Goal-based planning', d: 'Map every rupee to a goal — retirement, home, education — with live progress.' },
  { icon: TrendingUp, t: 'Smart fund discovery', d: 'AI-ranked funds, peer comparisons, and risk-adjusted picks across 5,000+ schemes.' },
  { icon: RefreshCw, t: 'Living SIPs', d: 'Pause, modify, top-up or switch SIPs in chat. Step-up rules and reminders built in.' },
  { icon: FileText, t: 'Tax & statements', d: 'Capital gains, ELSS, portfolio statements — generated, summarised, downloadable.' },
  { icon: Calculator, t: 'Built-in calculators', d: 'SIP, lumpsum, goal and step-up calculators — pre-filled with your real numbers.' },
  { icon: Search, t: 'Universal search', d: 'Find any fund, AMC, theme or category in milliseconds.' },
  { icon: Receipt, t: 'Unified transactions', d: 'Every buy, sell, switch and dividend in a single, filterable timeline.' },
  { icon: Bell, t: 'Proactive nudges', d: 'NAV alerts, SIP reminders, KYC expiry, rebalancing — surfaced when it matters.' },
  { icon: ShieldCheck, t: 'Trust & compliance', d: 'SEBI-registered, AMFI-compliant. Bank-grade encryption end-to-end.' },
];

export default function DiscvrFeatures() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={<>The fastest way to plan, invest and manage your wealth.</>}
        subtitle="DiscvrAI's agentic copilot replaces dashboards, forms and spreadsheets with a single, intelligent chat layer."
      />

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, t, d }) => (
            <div key={t} className="group rounded-2xl border border-slate-900/5 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm shadow-indigo-500/20">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="mt-4 text-base font-semibold text-slate-900">{t}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionEyebrow>The DiscvrAI difference</SectionEyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          A wealth app, re-imagined for the agent era.
        </h2>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-900/5 bg-white shadow-sm">
          <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <div>Capability</div>
            <div>Traditional MF apps</div>
            <div className="text-indigo-700">DiscvrAI</div>
          </div>
          {[
            ['Discovery', 'Filter & sort screens', 'Ask: "best 3 mid-caps under 1% expense"'],
            ['Recommendations', 'Generic top-rated lists', 'Personalised to your portfolio + goals'],
            ['Execution', '8–12 form fields per buy', '1-tap from chat with OTP'],
            ['SIP changes', 'Multi-screen flows', 'Just say "pause SIP for 3 months"'],
            ['Tax & statements', 'Hidden in menus', 'Generated on demand inside chat'],
            ['Support', 'Tickets, FAQs', '24/7 conversational copilot'],
          ].map(([cap, trad, dai], i) => (
            <div key={cap} className={`grid grid-cols-3 px-6 py-4 text-sm ${i % 2 ? 'bg-white' : 'bg-slate-50/40'}`}>
              <div className="font-semibold text-slate-900">{cap}</div>
              <div className="text-slate-500">{trad}</div>
              <div className="font-medium text-slate-800">{dai}</div>
            </div>
          ))}
        </div>
      </section>

      <GradientCTA
        title="Try the chat that runs your portfolio."
        subtitle="No setup. Sign in, link your existing investments, and start a conversation."
      />
    </>
  );
}
