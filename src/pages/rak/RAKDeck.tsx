import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Layers, Gauge, Flame, MessageSquare, Target, Calendar, CheckCircle2 } from 'lucide-react';

const BRAND_RED = '#A6192E';

const Slide: React.FC<React.PropsWithChildren<{ eyebrow: string; title: string; sub?: string; n: number; total: number }>> = ({ eyebrow, title, sub, n, total, children }) => (
  <div className="w-full h-full flex flex-col px-16 py-12" style={{ background: '#FFFFFF', color: '#0F172A' }}>
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 font-semibold tracking-[0.22em] uppercase" style={{ color: BRAND_RED }}>
        <Layers className="w-4 h-4" /> RAK Ceramics × DiscvrAI · Pre-read
      </div>
      <div className="text-slate-400">{n} / {total}</div>
    </div>
    <div className="mt-8">
      <div className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: BRAND_RED }}>{eyebrow}</div>
      <h1 className="text-4xl font-light mt-2 text-slate-900 leading-tight">{title}</h1>
      {sub && <p className="text-slate-500 mt-2 max-w-3xl">{sub}</p>}
    </div>
    <div className="mt-8 flex-1 min-h-0">{children}</div>
  </div>
);

const slides: React.FC<{ n: number; total: number }>[] = [
  // Slide 1 — Thesis
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 1 · Thesis" title="Value on top of the transformation you already started" sub="RAK is modernising at scale. The open question is how fast signals become margin, throughput, and working capital.">
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="col-span-2 rounded-2xl p-7 flex flex-col justify-between text-white" style={{ background: 'linear-gradient(135deg, #7B0E1F, #A6192E)' }}>
          <div>
            <div className="text-rose-200 text-xs uppercase tracking-widest font-semibold mb-3">Where we stand</div>
            <p className="text-xl leading-relaxed font-light">
              A unified cloud ERP / planning / HR programme across <span className="font-semibold text-white">55 entities</span> with a clean-core path to SAP Business AI — not a greenfield digital story.
              Strong pockets exist (smart/slab lines, digital channels). The gap is <span className="font-semibold">harmonisation, master data, and enterprise-scale decisions</span>.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[['55', 'Entities on one core'],['Clean-core', 'No customisation'],['Sidecar', 'AI / agentic layer']].map(([v,l]) => (
              <div key={l} className="rounded-lg bg-white/10 border border-white/20 p-3">
                <div className="text-white text-lg font-semibold">{v}</div>
                <div className="text-[11px] text-rose-100 uppercase tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6 flex flex-col">
          <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: BRAND_RED }}>Our stance</div>
          <p className="text-sm text-slate-700 leading-relaxed flex-1">
            Augment the core programme with <span className="font-semibold">governed analytics, optimisation, vision/reliability models, and document-grounded agentic workflows</span>.
            ERP and IBP stay system-of-record — everything else sits sidecar via APIs and data products.
          </p>
          <div className="mt-4 rounded-lg border p-3 text-xs" style={{ background: '#FEF2F2', borderColor: '#FECACA', color: '#7B0E1F' }}>
            We don't sell another platform — we convert the programme into board-visible outcomes in one domain first.
          </div>
        </div>
      </div>
    </Slide>
  ),

  // Slide 2 — Operating context
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 2 · Operating context" title="Why this conversation is now" sub="Mixed markets, premium / project mix, UAE strength — decision speed matters as much as capex.">
      <div className="grid grid-cols-5 gap-4 h-full">
        <div className="col-span-3 grid grid-cols-2 gap-3">
          {[
            ['AED 3.28B', 'Revenue scale (FY25)', 'Healthy profitability; capex up on UAE plant upgrades'],
            ['~58% / ~42%', 'Tiles / Sanitary + faucets + tableware mix', 'Region-aware use cases needed'],
            ['UAE 39% · EU 22% · IN 10%', 'Geographic mix', 'Saudi competitiveness · EU softness · IN price-sensitive'],
            ['Net debt ↑', 'Investment cycle in progress', 'ROI and payback discipline will be high'],
          ].map(([v, l, sub]) => (
            <div key={l} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-2xl font-semibold" style={{ color: BRAND_RED }}>{v}</div>
              <div className="text-xs font-semibold text-slate-900 mt-1">{l}</div>
              <div className="text-[11px] text-slate-600 mt-1">{sub}</div>
            </div>
          ))}
        </div>
        <div className="col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: BRAND_RED }}>Management themes to mirror</div>
          <ul className="space-y-3 text-sm text-slate-700">
            {['Operational excellence', 'Digital acceleration', 'Retail / e-commerce growth', 'ESG-led efficiency', 'Production-capability growth'].map(t => (
              <li key={t} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: BRAND_RED }} />{t}</li>
            ))}
          </ul>
          <div className="mt-5 text-[11px] text-slate-500 italic">Public materials only — directionally referenced.</div>
        </div>
      </div>
    </Slide>
  ),

  // Slide 3 — Collaboration map
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 3 · Collaboration map" title="Four layers, one clean-core rule" sub="ERP / planning stay system-of-record. Everything else is sidecar + APIs + governance.">
      <div className="grid grid-cols-4 gap-3 h-full">
        {[
          { t: 'Deep tech / industrial AI', d: 'Physics-aware and time-series models on kiln/line data · predictive maintenance / RUL · vision QC on slabs and sanitaryware.', out: 'Advisory → human-in-the-loop → hardened production', tone: '#7B0E1F' },
          { t: 'Agentic workflows', d: 'Planner, sales, and sustainability copilots with tools (forecast refresh, scenario run, ticket, email draft) grounded in SAP / IBP / PIM.', out: 'Exception-first S&OP · quote / margin assistant', tone: '#A6192E' },
          { t: 'Digital backbone', d: 'Semantic layer · data products · MDM fixes · control towers (inventory, energy/carbon, quality) · integration for S/4 + IBP + plant.', out: 'One "golden" dataset per pilot · reusable pipelines', tone: '#C2410C' },
          { t: 'T&M / joint pods', d: 'Embedded MLOps, data engineering, integration, QA — accelerate the multi-year programme without owning the core SI scope.', out: '3–8 FTE pod · weekly backlog · clean handover', tone: '#D97706' },
        ].map((l, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: l.tone }}>{i + 1}</div>
            <div className="text-sm font-semibold text-slate-900 mt-4">{l.t}</div>
            <div className="text-xs text-slate-600 mt-2 leading-relaxed flex-1">{l.d}</div>
            <div className="mt-3 rounded bg-slate-50 border border-slate-200 p-2 text-[11px] text-slate-700">{l.out}</div>
          </div>
        ))}
      </div>
    </Slide>
  ),

  // Slide 4 — Prioritized opportunities
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 4 · First waves" title="Two natural starting points for a CDO + business co-sponsor" sub="Planning network (ERP / IBP adjacent) and UAE factory excellence (plant adjacent).">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: BRAND_RED }}>Track A · ERP / IBP adjacent</div>
          <div className="text-lg font-semibold text-slate-900 mb-4">Highest CDO fit</div>
          {[
            ['Demand + inventory control tower', 'Probabilistic forecasts · scenario S&OP · stockout risk · working-capital view'],
            ['Project quote / margin / mix', 'Faster quotes · leakage alerts · premium vs distressed market economics'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg bg-slate-50 border border-slate-200 p-3 mb-2">
              <div className="text-sm font-semibold text-slate-900">{t}</div>
              <div className="text-xs text-slate-600 mt-1">{d}</div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: BRAND_RED }}>Track B · Plant adjacent</div>
          <div className="text-lg font-semibold text-slate-900 mb-4">Tangible ops KPIs</div>
          {[
            ['Predictive reliability', 'Kilns, presses, dryers, conveyors · downtime and MTTR'],
            ['Vision + root-cause quality', 'Build on Continua+ direction · defect class → process parameters'],
            ['Energy / water / carbon tower', 'ESG narrative · intensity per m² · abatement scenarios'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg bg-slate-50 border border-slate-200 p-3 mb-2">
              <div className="text-sm font-semibold text-slate-900">{t}</div>
              <div className="text-xs text-slate-600 mt-1">{d}</div>
            </div>
          ))}
        </div>
        <div className="col-span-2 rounded-xl border p-4 text-sm" style={{ background: '#FEF2F2', borderColor: '#FECACA', color: '#7B0E1F' }}>
          <span className="font-semibold">Recommendation:</span> P1 control tower + P2/P3 on one UAE line — matches your public planning move and plant investments. Optional fast AI beachhead: spec / product copilot on approved PIM/catalog when ready.
        </div>
      </div>
    </Slide>
  ),

  // Slide 5 — Delivery
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 5 · Delivery" title="Pilot → pod → scale" sub="8–12 week pilot · one KPI baseline · week-10/12 go/no-go · then T&M pod for rollout.">
      <div className="grid grid-cols-4 gap-3">
        {[
          { wk: 'Weeks 0–2', t: 'Scope lock', d: 'Sponsor, data contract, security/RBAC, KPI baseline', icon: Target },
          { wk: 'Weeks 3–8', t: 'MVP build', d: 'Models, app/cockpit, UAT with operators/planners', icon: Gauge },
          { wk: 'Weeks 9–12', t: 'Pilot', d: 'Production read-only or advisory first · measure delta', icon: Calendar },
          { wk: 'Quarter+', t: 'Scale', d: 'Embedded pod · MLOps · drift · docs · RAK owns IP', icon: CheckCircle2 },
        ].map((s, i) => {
          const I = s.icon;
          return (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: BRAND_RED }}>{s.wk}</div>
              <div className="mt-2 flex items-center gap-2">
                <I className="w-4 h-4" style={{ color: BRAND_RED }} />
                <div className="text-sm font-semibold text-slate-900">{s.t}</div>
              </div>
              <div className="text-xs text-slate-600 mt-2 leading-relaxed">{s.d}</div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-3 mt-5">
        {[
          ['Project-led pilot', 'AED 0.9m – 2.5m', 'Focused build, one KPI'],
          ['T&M pod', 'AED ~95k–150k / FTE-month', 'Or AED 0.3m–0.95m / month · 3–6 mo min'],
          ['Broader wave', 'Multi-quarter', 'If pilot clears the bar'],
        ].map(([t, v, d]) => (
          <div key={t} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wider text-slate-500">{t}</div>
            <div className="text-xl font-semibold mt-1" style={{ color: BRAND_RED }}>{v}</div>
            <div className="text-[11px] text-slate-600 mt-1">{d}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-slate-900 text-white p-3 text-xs italic">
        Objection handler: "We don't customise the SAP core for the pilot. We replicate / consume via APIs and governed data products."
      </div>
    </Slide>
  ),

  // Slide 6 — Ask
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 6 · Ask" title="Leave with a one-pager pilot charter" sub="Align on sponsor, domain, KPI, and data — kickoff in two weeks.">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: BRAND_RED }}>What we need</div>
          {[
            ['Business co-sponsor', 'Supply chain · plant ops · commercial · sustainability'],
            ['Primary KPI', 'Forecast error · inventory · OTIF · unplanned downtime · scrap · energy intensity · quote cycle'],
            ['Geography / BU slice', 'UAE tiles + slabs · KSA or India subset'],
            ['Data access', 'Sample history + integration path (S/4 · IBP · warehouse · MES / historian)'],
          ].map(([t, d]) => (
            <div key={t} className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: BRAND_RED }}>✓</div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{t}</div>
                <div className="text-xs text-slate-600">{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6 text-white flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #7B0E1F, #A6192E)' }}>
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-rose-200 mb-3">Next step</div>
            <div className="text-2xl font-light leading-tight">Signed pilot charter inside 2 weeks. Kickoff with a joint working team.</div>
            <div className="mt-5 space-y-2 text-sm text-rose-100">
              <div>· Joint pod model — RAK owns code, models, pipelines</div>
              <div>· No SAP core customisation during the pilot</div>
              <div>· Demo walkthrough available on request: <Link to="/rak" className="underline text-white">/rak</Link></div>
            </div>
          </div>
          <div className="mt-6 rounded-lg bg-white/10 border border-white/20 p-3 text-xs">
            <span className="text-rose-200 uppercase tracking-widest font-semibold">Discovery</span>
            <div className="mt-1">Which KPI is most board-visible right now? UAE growth, KSA competitiveness, EU profitability, India turnaround, or cross-entity harmonisation?</div>
          </div>
        </div>
      </div>
    </Slide>
  ),
];

export default function RAKDeck() {
  const [idx, setIdx] = useState(0);
  const total = slides.length;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') setIdx(i => Math.min(total - 1, i + 1));
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') setIdx(i => Math.max(0, i - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);
  const S = slides[idx];
  return (
    <div className="fixed inset-0 bg-slate-100 flex flex-col">
      <div className="flex-1 min-h-0 flex items-center justify-center p-6">
        <div className="w-full max-w-[1280px] aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 bg-white">
          <S n={idx + 1} total={total} />
        </div>
      </div>
      <div className="border-t border-slate-200 bg-white px-6 py-3 flex items-center justify-between">
        <Link to="/rak" className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Hub</Link>
        <div className="flex items-center gap-2">
          <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} className="px-3 py-1.5 text-xs rounded border border-slate-300 disabled:opacity-40 hover:bg-slate-50">Prev</button>
          <div className="text-xs text-slate-500 w-16 text-center">{idx + 1} / {total}</div>
          <button onClick={() => setIdx(i => Math.min(total - 1, i + 1))} disabled={idx === total - 1} className="px-3 py-1.5 text-xs rounded text-white disabled:opacity-40 flex items-center gap-1" style={{ background: BRAND_RED }}>Next <ArrowRight className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </div>
  );
}
