import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  TrendingDown, TrendingUp, AlertCircle, ChevronRight, Info,
  Building2, MapPin, Tag, FileCheck, Shield, GitBranch, Lock,
  ArrowRight, Sparkles, CheckCircle2, XCircle
} from 'lucide-react';

// ============== TAB 1: FUNNEL ==============
const funnelStages = [
  { key: 'eligible',   label: 'Eligible',       count: 48250, conv: 100,  delta: +3.2 },
  { key: 'offer',      label: 'Offer Shown',    count: 31420, conv: 65.1, delta: +1.8 },
  { key: 'accepted',   label: 'Accepted',       count: 14680, conv: 46.7, delta: -2.4 },
  { key: 'kyc',        label: 'KYC Complete',   count:  9120, conv: 62.1, delta: -0.6 },
  { key: 'sanctioned', label: 'Sanctioned',     count:  3840, conv: 42.1, delta: -8.9 },
  { key: 'disbursed',  label: 'Disbursed',      count:  3210, conv: 83.6, delta: +1.1 },
];

const FunnelTab: React.FC = () => (
  <div className="space-y-6">
    {/* Period selector */}
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Acquisition Funnel</h2>
        <p className="text-sm text-slate-500">Last 30 days · vs prior 30 days</p>
      </div>
      <div className="flex gap-2">
        <Badge variant="outline" className="bg-white">Geo: All India</Badge>
        <Badge variant="outline" className="bg-white">Segment: MSME</Badge>
        <Badge variant="outline" className="bg-white">Ticket: ₹2L–₹25L</Badge>
      </div>
    </div>

    {/* Funnel */}
    <Card className="border-slate-200">
      <CardContent className="p-6">
        <div className="grid grid-cols-6 gap-3">
          {funnelStages.map((s, i) => {
            const widthPct = (s.count / funnelStages[0].count) * 100;
            const isLeak = s.delta < -5;
            return (
              <div key={s.key} className="relative">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium mb-2">
                  Step {i + 1}
                </div>
                <div className={`rounded-md border ${isLeak ? 'border-red-200 bg-red-50/40' : 'border-slate-200 bg-slate-50'} p-4`}>
                  <div className="text-sm font-semibold text-slate-900">{s.label}</div>
                  <div className="mt-2 text-2xl font-bold text-slate-900 tabular-nums">
                    {s.count.toLocaleString('en-IN')}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <span className="text-slate-600 font-medium">{s.conv}%</span>
                    <span className="text-slate-400">conv.</span>
                  </div>
                  <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${
                    s.delta > 0 ? 'text-emerald-600' : s.delta < 0 ? 'text-red-600' : 'text-slate-500'
                  }`}>
                    {s.delta > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(s.delta)}% vs prior
                  </div>
                  {/* mini volume bar */}
                  <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-700 rounded-full" style={{ width: `${widthPct}%` }} />
                  </div>
                </div>
                {i < funnelStages.length - 1 && (
                  <ChevronRight className="hidden md:block absolute -right-2 top-1/2 w-4 h-4 text-slate-300" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>

    {/* Insight callout */}
    <Card className="border-amber-200 bg-amber-50/50">
      <CardContent className="p-5">
        <div className="flex gap-4">
          <div className="shrink-0 w-10 h-10 rounded-md bg-amber-100 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-700" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-600 hover:bg-amber-600 text-white">Insight</Badge>
              <span className="text-xs text-slate-500">auto-detected · confidence high</span>
            </div>
            <h3 className="mt-2 text-base font-semibold text-slate-900">
              Largest leak: KYC Complete → Sanctioned (−8.9% vs prior period)
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
              <li className="flex gap-2"><span className="text-slate-400">•</span> <span><b>Hypothesis:</b> Document re-upload friction — 41% of declines triggered by GST/PAN mismatch on manual entry.</span></li>
              <li className="flex gap-2"><span className="text-slate-400">•</span> <span><b>Suggested experiment:</b> Pre-fill applicant fields from verified GST match; A/B vs control on 20% traffic.</span></li>
              <li className="flex gap-2"><span className="text-slate-400">•</span> <span><b>Expected lift:</b> +6–9 pp at this stage based on similar interventions.</span></li>
            </ul>
            <div className="mt-4 flex gap-2">
              <Button size="sm" className="bg-slate-900 hover:bg-slate-800">Open experiment brief</Button>
              <Button size="sm" variant="outline">Dismiss</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Secondary insights */}
    <div className="grid grid-cols-3 gap-4">
      {[
        { title: 'Offer → Accepted holding steady', body: '46.7% acceptance is in line with 30-day median. No action required.', tone: 'ok' },
        { title: 'KYC step time improving', body: 'Median KYC time dropped from 6.4 to 4.9 minutes after Aadhaar XML rollout.', tone: 'ok' },
        { title: 'Ticket-size mix shifting', body: '₹10L–₹25L band grew share by +4 pp; underwrite capacity check recommended.', tone: 'watch' },
      ].map((c, i) => (
        <Card key={i} className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              {c.tone === 'ok'
                ? <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                : <AlertCircle className="w-4 h-4 text-amber-600" />}
              <span className="text-sm font-semibold text-slate-900">{c.title}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// ============== TAB 2: SIGNALS ==============
const supplier = {
  name: 'Sharma Engineering Works',
  category: 'Industrial Fasteners & CNC Components',
  geo: 'Ludhiana, Punjab',
  vintageYrs: 7,
  gstin: '03ABCDE1234F1Z5',
};

const signalGroups = [
  {
    title: 'Bureau Summary',
    icon: <Shield className="w-4 h-4" />,
    items: [
      { k: 'CIBIL MSME-Rank', v: 'MSME-3', tone: 'ok' },
      { k: 'Existing exposure', v: '₹14.2L (3 lenders)', tone: 'neutral' },
      { k: '90+ DPD (24m)', v: '0', tone: 'ok' },
      { k: 'Enquiries (3m)', v: '2', tone: 'neutral' },
    ],
  },
  {
    title: 'Bank / GST Proxy',
    icon: <FileCheck className="w-4 h-4" />,
    items: [
      { k: 'GST turnover (TTM)', v: '₹3.8 Cr', tone: 'ok' },
      { k: 'YoY growth', v: '+18%', tone: 'ok' },
      { k: 'Avg bank balance (6m)', v: '₹6.1L', tone: 'ok' },
      { k: 'Cheque returns (12m)', v: '1', tone: 'neutral' },
    ],
  },
  {
    title: 'Platform Signals',
    icon: <Building2 className="w-4 h-4" />,
    items: [
      { k: 'RFQs received (90d)', v: '212', tone: 'ok' },
      { k: 'Response SLA tier', v: 'Tier A (<2h)', tone: 'ok' },
      { k: 'Listing verification', v: 'Gold verified', tone: 'ok' },
      { k: 'Repeat buyer ratio', v: '34%', tone: 'ok' },
    ],
  },
];

const toneColor = (t: string) =>
  t === 'ok' ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
  : t === 'warn' ? 'text-amber-700 bg-amber-50 border-amber-200'
  : 'text-slate-700 bg-slate-50 border-slate-200';

const SignalsTab: React.FC = () => (
  <div className="space-y-6">
    {/* Supplier header */}
    <Card className="border-slate-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold">
              SE
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{supplier.name}</h2>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> {supplier.category}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {supplier.geo}</span>
                <span>Vintage: {supplier.vintageYrs} yrs</span>
                <span className="font-mono text-xs text-slate-500">{supplier.gstin}</span>
              </div>
            </div>
          </div>
          {/* Risk band */}
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Risk band</div>
            <div className="mt-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-200">
              <span className="text-2xl font-bold text-emerald-700">A</span>
              <div className="text-left">
                <div className="text-xs font-semibold text-emerald-700">Low risk</div>
                <div className="text-[11px] text-slate-500">Score 786 / 900</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Signal panels */}
    <div className="grid grid-cols-3 gap-4">
      {signalGroups.map((g) => (
        <Card key={g.title} className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="text-slate-500">{g.icon}</span>
              {g.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {g.items.map((it) => (
                <div key={it.k} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{it.k}</span>
                  <span className={`px-2 py-0.5 rounded border text-xs font-medium ${toneColor(it.tone)}`}>
                    {it.v}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Why this band — explainability */}
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-500" />
          Why band A — rule-based explanation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-700">
          <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Zero 90+ DPD in trailing 24 months</li>
          <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> GST turnover growth +18% YoY (band A threshold ≥10%)</li>
          <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Platform repeat-buyer ratio &gt; 30% (stickiness signal)</li>
          <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Response SLA tier A — operational reliability proxy</li>
          <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Vintage ≥ 5 yrs with verified listing</li>
          <li className="flex gap-2"><AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /> Watch: existing exposure across 3 lenders — monitor utilisation</li>
        </ul>
        <div className="mt-4 text-xs text-slate-500 border-t border-slate-100 pt-3">
          Rules surfaced from Policy v3.2. No black-box scoring — each contributing signal is auditable.
        </div>
      </CardContent>
    </Card>
  </div>
);

// ============== TAB 3: POLICY ==============
const PolicyTab: React.FC = () => {
  const [mode, setMode] = useState<'static' | 'dynamic'>('dynamic');
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-500" /> Active policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row k="Policy version" v="v3.2 (read-only)" />
            <Row k="Effective from" v="14 Apr 2026" />
            <Row k="Underwriter sign-off" v="Risk Committee · 11 Apr 2026" />
            <Row k="Ticket band" v="₹2L – ₹25L" />
            <Row k="Tenor" v="6 – 36 months" />
            <Row k="Max DBR" v="55%" />
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-slate-500" /> Partner NBFC rule pack
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row k="Partner" v="NBFC Alpha (illustrative)" />
            <Row k="Rule pack" v="alpha-msme-2026.04" />
            <Row k="Geo allow-list" v="22 states" />
            <Row k="Category exclusions" v="3 (mock)" />
            <Row k="Co-lending split" v="80 / 20" />
            <Row k="Rate band" v="14.5% – 19.0% p.a." />
          </CardContent>
        </Card>
      </div>

      {/* Static vs Dynamic */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-slate-900">
              Journey: static vs dynamic next-step
            </CardTitle>
            <div className="inline-flex rounded-md border border-slate-200 p-0.5 bg-slate-50">
              {(['static', 'dynamic'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    mode === m ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
                  }`}
                >
                  {m === 'static' ? 'Static journey' : 'Dynamic next-step'}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-slate-500 mb-3">
            Scenario: applicant with verified GST match, vintage 7 yrs, repeat-buyer ratio 34%.
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(mode === 'static'
              ? ['Eligibility', 'Offer', 'Accept', 'KYC', 'Income proof', 'Bank statement', 'Reference check', 'Sanction', 'Disburse']
              : ['Eligibility', 'Offer', 'Accept', 'KYC (Aadhaar XML)', 'Sanction', 'Disburse']
            ).map((step, i, arr) => (
              <React.Fragment key={step}>
                <div className={`px-3 py-1.5 rounded-md text-xs font-medium border ${
                  mode === 'dynamic' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'
                }`}>
                  {step}
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-slate-300" />}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-md border border-slate-200 p-3">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <XCircle className="w-4 h-4 text-slate-400" /> Static
              </div>
              <p className="mt-1 text-slate-600">9 steps. Same flow for all applicants regardless of available signals.</p>
            </div>
            <div className="rounded-md border border-emerald-200 bg-emerald-50/40 p-3">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Dynamic
              </div>
              <p className="mt-1 text-slate-700">6 steps. High-intent verified applicants skip redundant proof steps — UI-only prototype.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-xs text-slate-500 border-t border-slate-100 pt-3">
        Consent capture, RBI digital lending guidelines, and partner-boundary rules are configurable in production. This screen is illustrative.
      </div>
    </div>
  );
};

const Row: React.FC<{ k: string; v: string }> = ({ k, v }) => (
  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 last:border-0">
    <span className="text-slate-500">{k}</span>
    <span className="text-slate-900 font-medium">{v}</span>
  </div>
);

// ============== PAGE ==============
const MSMELendingCommandCenter: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-slate-900 text-white grid place-items-center text-xs font-bold">M</div>
              <h1 className="text-base font-semibold text-slate-900">MSME Lending Command Center</h1>
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Demo</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">Storyboard for B2B fintech conversation · all data illustrative</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="px-2 py-1 rounded bg-slate-100">Env: Sandbox</span>
            <span className="px-2 py-1 rounded bg-slate-100">User: Risk Ops</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <Tabs defaultValue="funnel" className="w-full">
          <TabsList className="bg-white border border-slate-200 h-auto p-1">
            <TabsTrigger value="funnel" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white px-4 py-2">
              Funnel
            </TabsTrigger>
            <TabsTrigger value="signals" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white px-4 py-2">
              Signals
            </TabsTrigger>
            <TabsTrigger value="policy" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white px-4 py-2">
              Policy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="funnel" className="mt-6"><FunnelTab /></TabsContent>
          <TabsContent value="signals" className="mt-6"><SignalsTab /></TabsContent>
          <TabsContent value="policy" className="mt-6"><PolicyTab /></TabsContent>
        </Tabs>

        <footer className="mt-10 text-[11px] text-slate-400 text-center border-t border-slate-200 pt-4">
          Consent capture, RBI digital lending compliance, and partner boundaries configurable in production · UI is illustrative.
        </footer>
      </main>
    </div>
  );
};

export default MSMELendingCommandCenter;
