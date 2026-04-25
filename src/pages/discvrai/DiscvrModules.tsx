import { Home, BarChart3, Wallet, Search, Receipt, RefreshCw, FileText, Calculator, Target, LogOut, History, User } from 'lucide-react';
import { GradientCTA, PageHero, SectionEyebrow } from './_shared';

const MODULES = [
  { icon: Home, name: 'Home', tag: 'Dashboard', desc: 'A personalised wealth pulse — net worth, today\'s movement, SIP runway, goal progress and AI nudges, all on the first screen.' },
  { icon: BarChart3, name: 'Portfolio', tag: 'Holdings', desc: 'Live holdings, XIRR, asset allocation, fund-wise drilldowns and side-by-side performance vs benchmark.' },
  { icon: Wallet, name: 'Invest', tag: 'Buy', desc: 'Conversational buying — recommendations, comparisons and one-tap SIP/lumpsum execution with OTP confirmation.' },
  { icon: Search, name: 'Search', tag: 'Discovery', desc: 'Universal search across 5,000+ schemes, AMCs, themes and categories with AI-ranked results.' },
  { icon: Receipt, name: 'Transactions', tag: 'History', desc: 'A unified timeline of every buy, sell, switch and dividend — filterable and downloadable.' },
  { icon: RefreshCw, name: 'SIPs', tag: 'Recurring', desc: 'Manage every SIP in chat — pause, modify, step-up, top-up or switch in seconds.' },
  { icon: FileText, name: 'Statements', tag: 'Tax', desc: 'Capital gains, ELSS proofs, account statements — generated, summarised and emailed on demand.' },
  { icon: Calculator, name: 'Calculator', tag: 'Planning', desc: 'SIP, lumpsum, goal and step-up calculators pre-filled with your live portfolio context.' },
  { icon: Target, name: 'Goals', tag: 'Outcomes', desc: 'Map money to outcomes — retirement, home, education, emergency. Track progress live.' },
  { icon: LogOut, name: 'Sell', tag: 'Redeem', desc: 'Smart redemption with tax impact preview, settlement timing and partial-redeem options.' },
  { icon: History, name: 'Chat history', tag: 'Threads', desc: 'Resume any prior decision thread — every conversation is saved, searchable and contextual.' },
  { icon: User, name: 'Profile', tag: 'Account', desc: 'KYC, nominee, bank mandates, risk profile and notification preferences in one place.' },
];

export default function DiscvrModules() {
  return (
    <>
      <PageHero
        eyebrow="Modules"
        title={<>One agent. Twelve modules. Zero context switches.</>}
        subtitle="The full DiscvrAI Wealth Platform mirrored into agent-friendly modules — every one accessible from a single chat."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {MODULES.map(({ icon: Icon, name, tag, desc }) => (
            <div key={name} className="group relative overflow-hidden rounded-2xl border border-slate-900/5 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 opacity-0 blur-2xl transition group-hover:opacity-100" />
              <div className="relative flex items-start gap-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow shadow-indigo-500/30">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-semibold tracking-tight text-slate-900">{name}</div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600">{tag}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <SectionEyebrow>Built on real APIs</SectionEyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          Every module is wired to live data.
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          DiscvrAI integrates with AMFI NAV feeds, AMC order APIs, BSE Star MF, depositories and CAS providers — so every conversation reflects truth, not yesterday's snapshot.
        </p>
      </section>

      <GradientCTA
        title="Open the app. Pick a module. Start chatting."
        subtitle="Every screen above is a conversation away."
      />
    </>
  );
}
