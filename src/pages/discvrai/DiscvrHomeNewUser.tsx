import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Sparkles, ArrowRight, Eye, SlidersHorizontal, ArrowUpDown,
  CheckCircle2, ChevronRight,
} from 'lucide-react';
import { APP_URL, SectionEyebrow } from './_shared';

const FUNDS = [
  { name: 'Quant Small Cap Fund - (IDCW)', tags: ['Equity', 'Small Cap Fund'], amc: 'Quant Money Managers Limited', exp: 1.59, nav: 201.36, r1: -10.62, r3: 23.97, r5: 34.72 },
  { name: 'Quant Small Cap Fund - (G)', tags: ['Equity', 'Small Cap Fund'], amc: 'Quant Money Managers Limited', exp: 1.59, nav: 253.20, r1: -10.62, r3: 23.94, r5: 34.65 },
  { name: 'Franklin India Mid Cap Fund (G)', tags: ['Equity', 'Mid Cap Fund'], amc: 'Franklin Templeton Asset Management (I) Pvt.Ltd.', exp: 1.76, nav: 2791.48, r1: -2.09, r3: 21.82, r5: 24.04 },
  { name: 'Franklin India Flexi Cap Fund - (G)', tags: ['Equity', 'Flexi Cap Fund'], amc: 'Franklin Templeton Asset Management (I) Pvt.Ltd.', exp: 1.69, nav: 1668.49, r1: -3.03, r3: 18.16, r5: 23.13 },
  { name: 'Aditya Birla SL Flexi Cap Fund (IDCW)', tags: ['Equity', 'Flexi Cap Fund'], amc: 'Aditya Birla Sun Life AMC Ltd', exp: 1.67, nav: 161.78, r1: -0.34, r3: 17.00, r5: 19.59 },
  { name: 'Aditya Birla SL Flexi Cap Fund (G)', tags: ['Equity', 'Flexi Cap Fund'], amc: 'Aditya Birla Sun Life AMC Ltd', exp: 1.67, nav: 1877.92, r1: -0.34, r3: 17.00, r5: 19.59 },
  { name: 'Sundaram Nifty 100 Equal Weight Fund (G)', tags: ['Other', 'Index Fund'], amc: 'Sundaram Asset Management Company Ltd', exp: 1.08, nav: 178.33, r1: -5.26, r3: 15.78, r5: 20.06 },
];

const STEPS = [
  { n: '1', label: 'Select fund', active: true },
  { n: '2', label: 'Type' },
  { n: '3', label: 'Details' },
  { n: '4', label: 'Review' },
];

export default function DiscvrHomeNewUser() {
  const [tab, setTab] = useState<'filter' | 'ai'>('filter');

  return (
    <div className="mx-auto max-w-7xl px-6 pt-10 pb-16">
      {/* Welcome */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <SectionEyebrow>Welcome to DiscvrAI</SectionEyebrow>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Start your first SIP — in under 60 seconds.
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Pick a fund or let your Wealth Copilot suggest one. Zero commission, paperless KYC, instant start.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> SEBI registered
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 0% commission
          </span>
        </div>
      </div>

      {/* Wizard card */}
      <div className="overflow-hidden rounded-3xl border border-slate-900/5 bg-white shadow-xl shadow-indigo-500/10">
        {/* Header */}
        <div className="border-b border-slate-100 bg-gradient-to-br from-indigo-50/60 to-violet-50/40 px-6 py-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-indigo-600" />
            <div className="text-base font-semibold text-slate-900">Start SIP</div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-2 text-xs">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex items-center gap-1">
                <div
                  className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold ${
                    s.active ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {s.n}
                </div>
                <span className={`font-semibold uppercase tracking-wider ${s.active ? 'text-slate-900' : 'text-slate-400'}`}>
                  {s.label}
                </span>
                {i < STEPS.length - 1 && <ChevronRight className="mx-1 h-3.5 w-3.5 text-slate-300" />}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setTab('filter')}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                tab === 'filter' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Search className="h-4 w-4" /> Search & Filter
            </button>
            <button
              onClick={() => setTab('ai')}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                tab === 'ai' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Sparkles className="h-4 w-4" /> AI Search
            </button>
          </div>

          {/* Search input */}
          <div className="mt-4">
            <div className="flex items-center gap-2 rounded-xl border-2 border-indigo-200 bg-white px-4 py-3 shadow-sm focus-within:border-indigo-500">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                placeholder={tab === 'filter' ? 'Search funds, AMC, category…' : 'Ask: "Best small-cap for 10 yrs"'}
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Advanced filters */}
          <button className="mt-3 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Advanced Filters
            </span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>

          {/* Sort row */}
          <div className="mt-5 mb-3 flex items-center justify-between">
            <div className="text-xs text-slate-500">Search or apply filters to see results</div>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
              <ArrowUpDown className="h-3.5 w-3.5" /> 3Y Return
            </button>
          </div>

          {/* Fund list */}
          <div className="space-y-2">
            {FUNDS.map((f) => (
              <div
                key={f.name}
                className="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/5"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-900">{f.name}</div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px]">
                    {f.tags.map((t) => (
                      <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700">{t}</span>
                    ))}
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700">{f.amc}</span>
                    <span className="text-slate-500">Exp {f.exp}%</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    <span className="text-slate-600">NAV ₹{f.nav.toLocaleString('en-IN')}</span>
                    <span className={`font-semibold ${f.r1 >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      1Y: {f.r1 >= 0 ? '+' : ''}{f.r1}%
                    </span>
                    <span className="font-semibold text-emerald-600">3Y: +{f.r3}%</span>
                    <span className="font-semibold text-emerald-600">5Y: +{f.r5}%</span>
                  </div>
                </div>
                <button
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-500 transition group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                  aria-label="Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-violet-50/60 p-5 md:flex-row">
            <div className="text-sm text-slate-700">
              <span className="font-semibold text-slate-900">Not sure where to start?</span> Ask your Wealth Copilot for a personalised 3-fund SIP.
            </div>
            <a
              href={APP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 hover:opacity-95"
            >
              Ask the copilot <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Below: quick links */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { t: 'Calculator', d: 'See how ₹5,000/mo grows over 20 yrs.', to: '/discvrai/modules#calculator' },
          { t: 'Goals', d: 'Plan retirement, education, home.', to: '/discvrai/modules#goals' },
          { t: 'All modules', d: '12 modules, one chat.', to: '/discvrai/modules' },
        ].map((c) => (
          <Link
            key={c.t}
            to={c.to}
            className="group flex items-center justify-between rounded-2xl border border-slate-900/5 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div>
              <div className="text-sm font-semibold text-slate-900">{c.t}</div>
              <div className="mt-1 text-xs text-slate-500">{c.d}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-600" />
          </Link>
        ))}
      </div>
    </div>
  );
}
