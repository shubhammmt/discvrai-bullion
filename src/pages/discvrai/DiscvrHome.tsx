import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, MessageSquare, TrendingUp, Target, ShieldCheck,
  Wallet, Search, Receipt, RefreshCw, FileText, Calculator, LogOut,
  History, User, Home as HomeIcon, BarChart3, Zap, Clock, CheckCircle2,
} from 'lucide-react';
import { APP_URL, GradientCTA, SectionEyebrow, StatRow } from './_shared';

const MODULES = [
  { icon: HomeIcon, label: 'Home', desc: 'Personalised wealth pulse' },
  { icon: BarChart3, label: 'Portfolio', desc: 'Holdings & performance' },
  { icon: Wallet, label: 'Invest', desc: 'Buy in seconds' },
  { icon: Search, label: 'Search', desc: 'Find any fund' },
  { icon: Receipt, label: 'Transactions', desc: 'Full history' },
  { icon: RefreshCw, label: 'SIPs', desc: 'Manage recurring' },
  { icon: FileText, label: 'Statements', desc: 'Tax & cap gains' },
  { icon: Calculator, label: 'Calculator', desc: 'SIP, lumpsum, goals' },
  { icon: Target, label: 'Goals', desc: 'Plan & track outcomes' },
  { icon: LogOut, label: 'Sell', desc: 'Redeem instantly' },
  { icon: History, label: 'Chat history', desc: 'Resume any thread' },
  { icon: User, label: 'Profile', desc: 'KYC, nominee, bank' },
];

export default function DiscvrHome() {
  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-14 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Your AI Wealth Copilot — now in chat
            </div>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              Talk to your{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                money
              </span>
              .<br className="hidden md:block" /> Decisions in one chat.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              DiscvrAI is an agentic platform for mutual funds, SIPs, savings and goals.
              Ask, plan, invest, switch and redeem — without juggling tabs, forms or jargon.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:opacity-95"
              >
                Launch the app <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/discvrai/features"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Explore features
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> SEBI-registered platform</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Bank-grade encryption</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Zero commission funds</span>
            </div>
          </div>

          {/* Hero chat preview */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -inset-x-10 -top-8 -bottom-8 -z-10 rounded-[40px] bg-gradient-to-br from-indigo-200/60 via-violet-200/50 to-fuchsia-200/60 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-slate-900/10 bg-white/80 shadow-2xl shadow-indigo-500/10 backdrop-blur">
              <div className="flex items-center gap-1.5 border-b border-slate-200/80 bg-slate-50/80 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <div className="ml-3 text-xs text-slate-500">agent.discvr.ai / Wealth Copilot</div>
              </div>
              <div className="grid grid-cols-12">
                {/* Mini sidebar */}
                <aside className="col-span-3 hidden border-r border-slate-200/80 bg-slate-50/50 p-3 md:block">
                  {[
                    'Home', 'Portfolio', 'Invest', 'Search', 'Transactions', 'SIPs', 'Statements', 'Calculator', 'Goals',
                  ].map((label, i) => (
                    <div
                      key={label}
                      className={`mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
                        i === 2 ? 'bg-indigo-600 text-white shadow' : 'text-slate-600'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" /> {label}
                    </div>
                  ))}
                </aside>
                <div className="col-span-12 space-y-4 p-6 md:col-span-9">
                  <ChatBubble role="user">
                    I have ₹40,000/month to invest. Suggest a 3-fund SIP for retirement in 25 years.
                  </ChatBubble>
                  <ChatBubble role="ai">
                    Based on your moderate-aggressive profile, here's a balanced 3-fund split optimised for your 25-yr horizon:
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {[
                        { n: 'Parag Parikh Flexi Cap', a: '₹18k', t: 'Equity' },
                        { n: 'HDFC Mid-Cap Opp.', a: '₹14k', t: 'Mid Cap' },
                        { n: 'ICICI Pru Corp Bond', a: '₹8k', t: 'Debt' },
                      ].map((f) => (
                        <div key={f.n} className="rounded-xl border border-slate-200 bg-white p-3">
                          <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{f.t}</div>
                          <div className="mt-1 line-clamp-2 text-xs font-semibold text-slate-900">{f.n}</div>
                          <div className="mt-2 text-sm font-bold text-indigo-600">{f.a}/mo</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-slate-500">Projected corpus @ 12% CAGR: ₹7.5 Cr · Tax-optimised · One tap to start</div>
                  </ChatBubble>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6">
        <StatRow
          stats={[
            { v: '5,000+', k: 'Mutual funds covered' },
            { v: '< 30s', k: 'Avg. decision time' },
            { v: '24/7', k: 'AI Wealth Copilot' },
            { v: '0%', k: 'Commission, ever' },
          ]}
        />
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <SectionEyebrow>How it's different</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            A wealth platform that thinks <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">with</span> you.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            DiscvrAI replaces dashboards and forms with one conversational layer powered by an agent that understands intent, context and goals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: MessageSquare, t: 'Conversational, not transactional', d: 'Ask in plain English. The agent reads holdings, runs research and executes — all inline.' },
            { icon: TrendingUp, t: 'Personal-context aware', d: 'Knows your goals, risk profile, taxes and history. Recommendations adapt to you.' },
            { icon: ShieldCheck, t: 'Safe by design', d: 'Read before write, OTP-confirmed actions, audit trail and bank-grade encryption.' },
          ].map(({ icon: Icon, t, d }) => (
            <div
              key={t}
              className="group rounded-2xl border border-slate-900/5 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/30">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-5 text-lg font-semibold tracking-tight text-slate-900">{t}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODULES GRID */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionEyebrow>Everything in one chat</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">12 modules. Zero context switches.</h2>
          </div>
          <Link to="/discvrai/modules" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            See all modules <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {MODULES.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="group rounded-2xl border border-slate-900/5 bg-white/80 p-5 backdrop-blur transition hover:border-indigo-200 hover:bg-white">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 transition group-hover:from-indigo-500 group-hover:to-violet-600 group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold text-slate-900">{label}</div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionEyebrow>How it works</SectionEyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          From intent to invested in three steps.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: '01', icon: MessageSquare, t: 'Ask anything', d: 'Tell the copilot your goal — retirement, education, tax-saving, or "should I switch?"' },
            { n: '02', icon: Zap, t: 'Get a personalised plan', d: 'Get fund picks, SIP/lumpsum splits and projections — built around your existing portfolio.' },
            { n: '03', icon: Clock, t: 'Execute in seconds', d: 'Confirm with OTP. Track, modify or pause anytime — directly in chat.' },
          ].map(({ n, icon: Icon, t, d }) => (
            <div key={n} className="relative overflow-hidden rounded-2xl border border-slate-900/5 bg-white p-7 shadow-sm">
              <div className="absolute right-4 top-4 text-5xl font-bold text-slate-100">{n}</div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-5 text-lg font-semibold text-slate-900">{t}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <GradientCTA
        title="Stop dashboard-hopping. Start chatting with your portfolio."
        subtitle="Join thousands using DiscvrAI to plan, invest and manage their wealth — without forms, jargon or commissions."
        secondary={{ label: 'See pricing', href: '/discvrai/pricing' }}
      />
    </>
  );
}

function ChatBubble({ role, children }: { role: 'user' | 'ai'; children: React.ReactNode }) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-md rounded-2xl rounded-tr-sm bg-gradient-to-br from-indigo-600 to-violet-600 px-4 py-3 text-sm text-white shadow">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white">
        <Sparkles className="h-3.5 w-3.5" />
      </div>
      <div className="max-w-2xl rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm">
        {children}
      </div>
    </div>
  );
}
