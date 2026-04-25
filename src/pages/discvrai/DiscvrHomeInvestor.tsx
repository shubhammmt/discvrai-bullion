import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, ArrowDownRight, Sparkles, TrendingUp,
  Wallet, PieChart, Target, RefreshCw, Plus, MoreHorizontal,
} from 'lucide-react';
import { APP_URL, SectionEyebrow } from './_shared';

const HOLDINGS = [
  { name: 'Parag Parikh Flexi Cap', cat: 'Equity · Flexi Cap', invested: 320000, current: 412800, pct: 29.0 },
  { name: 'HDFC Mid-Cap Opportunities', cat: 'Equity · Mid Cap', invested: 180000, current: 226200, pct: 25.7 },
  { name: 'ICICI Pru Corporate Bond', cat: 'Debt · Corp Bond', invested: 150000, current: 162400, pct: 8.3 },
  { name: 'Quant Small Cap Fund', cat: 'Equity · Small Cap', invested: 100000, current: 138900, pct: 38.9 },
  { name: 'SBI Gold ETF FoF', cat: 'Commodity · Gold', invested: 80000, current: 91250, pct: 14.1 },
];

const SIPS = [
  { name: 'Parag Parikh Flexi Cap', amt: 18000, next: '5 May' },
  { name: 'HDFC Mid-Cap Opp.', amt: 14000, next: '5 May' },
  { name: 'ICICI Pru Corp Bond', amt: 8000, next: '10 May' },
];

const GOALS = [
  { name: 'Retirement', target: 75000000, current: 10315500, year: 2049 },
  { name: 'Child education', target: 12000000, current: 2840000, year: 2034 },
  { name: 'Home down payment', target: 4000000, current: 1620000, year: 2028 },
];

const fmt = (n: number) =>
  n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr`
  : n >= 100000 ? `₹${(n / 100000).toFixed(2)} L`
  : `₹${n.toLocaleString('en-IN')}`;

export default function DiscvrHomeInvestor() {
  const totalInvested = HOLDINGS.reduce((s, h) => s + h.invested, 0);
  const totalCurrent = HOLDINGS.reduce((s, h) => s + h.current, 0);
  const gain = totalCurrent - totalInvested;
  const gainPct = (gain / totalInvested) * 100;

  return (
    <div className="mx-auto max-w-7xl px-6 pt-10 pb-16">
      {/* Greeting */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <SectionEyebrow>Investor home</SectionEyebrow>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Welcome back, Smriti.
          </h1>
          <p className="mt-2 text-slate-600">Here's your portfolio at a glance.</p>
        </div>
        <a
          href={APP_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-95"
        >
          Open in app <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Hero portfolio card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-900/5 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-white shadow-xl shadow-indigo-500/20">
        <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">Total portfolio value</div>
            <div className="mt-2 text-5xl font-semibold tracking-tight">{fmt(totalCurrent)}</div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
              <ArrowUpRight className="h-4 w-4" />
              +{fmt(gain)} · +{gainPct.toFixed(2)}% all-time
            </div>
            <div className="mt-5 grid max-w-md grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-white/70">Invested</div>
                <div className="mt-1 font-semibold">{fmt(totalInvested)}</div>
              </div>
              <div>
                <div className="text-white/70">XIRR</div>
                <div className="mt-1 font-semibold">18.4%</div>
              </div>
              <div>
                <div className="text-white/70">SIP/mo</div>
                <div className="mt-1 font-semibold">₹40,000</div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <div className="text-xs font-medium uppercase tracking-wider text-white/70">Allocation</div>
            <div className="mt-4 space-y-3">
              {[
                { k: 'Equity', v: 76, c: 'bg-white' },
                { k: 'Debt', v: 16, c: 'bg-emerald-300' },
                { k: 'Commodity', v: 8, c: 'bg-amber-300' },
              ].map((a) => (
                <div key={a.k}>
                  <div className="flex items-center justify-between text-xs">
                    <span>{a.k}</span><span className="font-semibold">{a.v}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                    <div className={`h-full ${a.c}`} style={{ width: `${a.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { icon: Plus, label: 'Invest more', tone: 'from-indigo-500 to-violet-600' },
          { icon: RefreshCw, label: 'Manage SIPs', tone: 'from-emerald-500 to-teal-600' },
          { icon: Target, label: 'Plan a goal', tone: 'from-fuchsia-500 to-pink-600' },
          { icon: Wallet, label: 'Redeem', tone: 'from-amber-500 to-orange-600' },
        ].map(({ icon: Icon, label, tone }) => (
          <a
            key={label}
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-2xl border border-slate-900/5 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${tone} text-white shadow`}>
              <Icon className="h-4.5 w-4.5" />
            </div>
            <div className="text-sm font-semibold text-slate-900">{label}</div>
            <ArrowRight className="ml-auto h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-600" />
          </a>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Holdings */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-900/5 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="h-4.5 w-4.5 text-indigo-600" />
              <h2 className="text-base font-semibold text-slate-900">Top holdings</h2>
            </div>
            <Link to="/discvrai/modules#portfolio" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
              View all <ArrowRight className="ml-0.5 inline h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {HOLDINGS.map((h) => (
              <div key={h.name} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">{h.name}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{h.cat}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-900">{fmt(h.current)}</div>
                  <div className={`mt-0.5 inline-flex items-center gap-0.5 text-xs font-medium ${h.pct >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {h.pct >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {h.pct >= 0 ? '+' : ''}{h.pct.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active SIPs */}
        <div className="rounded-2xl border border-slate-900/5 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4.5 w-4.5 text-emerald-600" />
              <h2 className="text-base font-semibold text-slate-900">Active SIPs</h2>
            </div>
            <Link to="/discvrai/modules#sips" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
              Manage
            </Link>
          </div>
          <div className="space-y-3">
            {SIPS.map((s) => (
              <div key={s.name} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <div className="flex items-center justify-between">
                  <div className="truncate text-sm font-semibold text-slate-900">{s.name}</div>
                  <MoreHorizontal className="h-4 w-4 text-slate-400" />
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
                  <span>₹{s.amt.toLocaleString('en-IN')}/mo</span>
                  <span>Next: {s.next}</span>
                </div>
              </div>
            ))}
            <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40 p-3 text-xs text-indigo-700">
              <div className="font-semibold">Wealth Copilot tip</div>
              <div className="mt-0.5 text-indigo-700/80">Increase Mid-Cap SIP by ₹2,000 to reach retirement goal 14 months earlier.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="mt-8 rounded-2xl border border-slate-900/5 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4.5 w-4.5 text-fuchsia-600" />
            <h2 className="text-base font-semibold text-slate-900">Your goals</h2>
          </div>
          <Link to="/discvrai/modules#goals" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
            All goals
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {GOALS.map((g) => {
            const pct = Math.round((g.current / g.target) * 100);
            return (
              <div key={g.name} className="rounded-xl border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">{g.name}</div>
                  <div className="text-xs text-slate-500">{g.year}</div>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  {fmt(g.current)} of {fmt(g.target)}
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-600" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-1.5 text-right text-xs font-semibold text-indigo-600">{pct}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Copilot prompt */}
      <div className="mt-8 rounded-2xl border border-slate-900/5 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Ask your Wealth Copilot</div>
            <div className="mt-1 text-sm text-white/70">"Should I rebalance? My equity is 76%."</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Rebalance my portfolio', 'Tax harvest now?', 'Pause Mid-Cap SIP', 'Project retirement'].map((q) => (
                <a
                  key={q}
                  href={APP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/90 hover:bg-white/10"
                >
                  {q}
                </a>
              ))}
            </div>
          </div>
          <TrendingUp className="hidden h-10 w-10 text-white/20 md:block" />
        </div>
      </div>
    </div>
  );
}
