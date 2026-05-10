import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, Users, Activity, PiggyBank, Target, Calendar, CheckCircle2 } from 'lucide-react';

const BRAND_BLUE = '#1E3A8A';

const Slide: React.FC<React.PropsWithChildren<{ eyebrow: string; title: string; sub?: string; n: number; total: number }>> = ({ eyebrow, title, sub, n, total, children }) => (
  <div className="w-full h-full flex flex-col px-16 py-12" style={{ background: '#FFFFFF', color: '#0F172A' }}>
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 font-semibold tracking-[0.22em] uppercase" style={{ color: BRAND_BLUE }}>
        <ShieldCheck className="w-4 h-4" /> Bajaj Capital × DiscvrAI · Pre-read
      </div>
      <div className="text-slate-400">{n} / {total}</div>
    </div>
    <div className="mt-8">
      <div className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: BRAND_BLUE }}>{eyebrow}</div>
      <h1 className="text-4xl font-light mt-2 text-slate-900 leading-tight">{title}</h1>
      {sub && <p className="text-slate-500 mt-2 max-w-3xl">{sub}</p>}
    </div>
    <div className="mt-8 flex-1 min-h-0">{children}</div>
  </div>
);

const slides: React.FC<{ n: number; total: number }>[] = [
  // Slide 1 — Thesis
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 1 · Thesis" title="Intelligence at scale on the stack you already have"
      sub="From digital adoption to operating leverage — production ML and guardrailed agents on the existing CRM / SuperRM spine.">
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="col-span-2 rounded-2xl p-7 flex flex-col justify-between text-white" style={{ background: 'linear-gradient(135deg, #0F1F4D, #1E3A8A)' }}>
          <div>
            <div className="text-blue-200 text-xs uppercase tracking-widest font-semibold mb-3">Where we stand</div>
            <p className="text-xl leading-relaxed font-light">
              Bajaj Capital's moat is <span className="font-semibold text-white">trust + distribution + RM coverage</span>.
              The next chapter is <span className="font-semibold">same RM capacity, higher quality touches</span> — or higher client load without quality collapse.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[['CRM + SuperRM', 'Existing spine'],['Sidecar', 'No rip-and-replace'],['HITL', 'Humans approve']].map(([v,l]) => (
              <div key={l} className="rounded-lg bg-white/10 border border-white/20 p-3">
                <div className="text-white text-lg font-semibold">{v}</div>
                <div className="text-[11px] text-blue-100 uppercase tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6 flex flex-col">
          <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: BRAND_BLUE }}>Our stance</div>
          <p className="text-sm text-slate-700 leading-relaxed flex-1">
            Sidecar intelligence — data products, models, and agents that <span className="font-semibold">read</span> golden sources
            and <span className="font-semibold">propose</span> actions. Humans approve. Audit trails by design.
            No big-bang core change.
          </p>
          <div className="mt-4 rounded-lg border p-3 text-xs" style={{ background: '#EFF6FF', borderColor: '#BFDBFE', color: '#0F1F4D' }}>
            We are not pitching a new core. We are pitching measurable uplift in conversion, retention, RM productivity, or ops cost — in one corridor.
          </div>
        </div>
      </div>
    </Slide>
  ),

  // Slide 2 — Operating reality
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 2 · Operating reality" title="Why this conversation is now"
      sub="Scale + complexity → marginal cost of advice and ops risk dominate. Directional figures — to be validated in room.">
      <div className="grid grid-cols-5 gap-4 h-full">
        <div className="col-span-3 grid grid-cols-2 gap-3">
          {[
            ['Retail · HNI · RTR', 'Three service intensities under one org', 'Same teams, very different journeys'],
            ['Cross-sell mix', 'MF · insurance · FD · NPS · health', 'Causal targeting beats spray-and-pray'],
            ['Onboarding · servicing', 'Middle-office still drives load and TAT', 'Vision + NLP attack exceptions, not governance'],
            ['Group AI tailwind', 'Peers pushing AI at scale narrative', 'Client + investor expectations rising'],
          ].map(([v, l, sub]) => (
            <div key={l} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-lg font-semibold" style={{ color: BRAND_BLUE }}>{v}</div>
              <div className="text-xs font-semibold text-slate-900 mt-1">{l}</div>
              <div className="text-[11px] text-slate-600 mt-1">{sub}</div>
            </div>
          ))}
        </div>
        <div className="col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: BRAND_BLUE }}>COO themes to mirror</div>
          <ul className="space-y-3 text-sm text-slate-700">
            {['Operational excellence', 'Scalable systems', 'Customer experience', 'Analytics-driven decisions', 'Risk / compliance-aware execution'].map(t => (
              <li key={t} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: BRAND_BLUE }} />{t}</li>
            ))}
          </ul>
          <div className="mt-5 text-[11px] text-slate-500 italic">Frame: throughput, unit cost, quality of advice journeys, governance — not "AI for slides."</div>
        </div>
      </div>
    </Slide>
  ),

  // Slide 3 — Collaboration map
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 3 · Collaboration map" title="Four partnership modes, one governance baseline"
      sub="PII minimisation · RBAC · encryption · audit logs · SEBI/RBI-sensitive flows reviewed with compliance. Demo uses synthetic data only.">
      <div className="grid grid-cols-4 gap-3 h-full">
        {[
          { t: 'Deep tech / ML', d: 'Hierarchical demand · churn / survival · uplift & causal targeting · anomaly detection (leakage, mis-selling, ops variance).', out: 'Scored lead lists · early-warning churn · explainable drivers', tone: '#0F1F4D' },
          { t: 'Agentic AI', d: 'Orchestrated copilots: RAG on approved house views · tools for CRM update, ticket creation, draft comms — all human-in-the-loop.', out: 'Pre-call briefs · cited answers · workflow compression', tone: '#1E3A8A' },
          { t: 'Digital backbone', d: 'Semantic layer · customer golden record · event pipelines from apps/CRM/core · feature store · COO command center.', out: 'One trustworthy metric definition · reusable data products', tone: '#2563EB' },
          { t: 'T&M / joint pods', d: 'Embedded ML / data engineers, MLOps, integration, QA — on your backlog with weekly cadence and clean handover.', out: '3–8 FTE pod · sprint cadence · runbooks', tone: '#0EA5E9' },
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

  // Slide 4 — First waves
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 4 · First waves" title="Two COO-friendly tracks (pick two for the pilot)"
      sub="Default recommendation: Track A (NBA + Pre-call agent) on one RM cluster and one product corridor.">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: BRAND_BLUE }}>Track A · RM & revenue cockpit</div>
          <div className="text-lg font-semibold text-slate-900 mb-4">Highest commercial fit</div>
          {[
            ['Uplift-based next-best-action', 'Who benefits from which intervention · measure incremental conversion'],
            ['Churn / drawdown survival signals', 'Pre-retirement and goal-based books · early warning + playbooks'],
            ['Agentic pre & post-call', 'RAG from approved house views · draft WhatsApp/email · one-tap CRM logging'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg bg-slate-50 border border-slate-200 p-3 mb-2">
              <div className="text-sm font-semibold text-slate-900">{t}</div>
              <div className="text-xs text-slate-600 mt-1">{d}</div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: BRAND_BLUE }}>Track B · Middle-office & onboarding</div>
          <div className="text-lg font-semibold text-slate-900 mb-4">Tangible ops KPIs</div>
          {[
            ['Document intelligence', 'KYC / supporting docs · classification · extraction · exception routing'],
            ['Fraud / anomaly surveillance', 'Pattern detection on applications, payouts, pricing exceptions'],
            ['Funnel / TAT cockpit', 'Onboarding stages · cost per account · e-mandate retry agent'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg bg-slate-50 border border-slate-200 p-3 mb-2">
              <div className="text-sm font-semibold text-slate-900">{t}</div>
              <div className="text-xs text-slate-600 mt-1">{d}</div>
            </div>
          ))}
        </div>
        <div className="col-span-2 rounded-xl border p-4 text-sm" style={{ background: '#EFF6FF', borderColor: '#BFDBFE', color: '#0F1F4D' }}>
          <span className="font-semibold">Optional Track C — HNI / La Premier depth:</span> household / entity graph (phased), scenario education twin-lite for RTR cohorts. Strategic, longer validation. Start with simple rules + analytics before heavy GNN claims.
        </div>
      </div>
    </Slide>
  ),

  // Slide 5 — Delivery
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 5 · Delivery" title="Pilot → pod → scale" sub="8–12 week pilot · one KPI baseline · go/no-go · then T&M pod for hardening and rollout.">
      <div className="grid grid-cols-4 gap-3">
        {[
          { wk: 'Weeks 0–2', t: 'Scope lock', d: 'Sponsor, KPI, data access & DPA, compliance sign-off on use cases', icon: Target },
          { wk: 'Weeks 3–8', t: 'MVP build', d: 'Features, models, shadow-mode / champion-challenger, cockpit UI, UAT with RMs', icon: Users },
          { wk: 'Weeks 9–12', t: 'Pilot live', d: 'Limited production · measurement · playbooks · drift / monitoring plan', icon: Calendar },
          { wk: 'Quarter+', t: 'Scale', d: 'T&M pod · MLOps · multi-branch rollout · training · BC owns IP', icon: CheckCircle2 },
        ].map((s, i) => {
          const I = s.icon;
          return (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: BRAND_BLUE }}>{s.wk}</div>
              <div className="mt-2 flex items-center gap-2">
                <I className="w-4 h-4" style={{ color: BRAND_BLUE }} />
                <div className="text-sm font-semibold text-slate-900">{s.t}</div>
              </div>
              <div className="text-xs text-slate-600 mt-2 leading-relaxed">{s.d}</div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-3 mt-5">
        {[
          ['Project-led pilot', '₹70L – ₹2Cr', 'Sharp scope · 8–12 weeks · acceptance tests'],
          ['T&M pod', '₹8–14L / FTE-month', '3–6 month minimum · senior ICs for velocity'],
          ['Transformation wave', 'Multi-quarter', 'Only after pilot proof'],
        ].map(([t, v, d]) => (
          <div key={t} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wider text-slate-500">{t}</div>
            <div className="text-xl font-semibold mt-1" style={{ color: BRAND_BLUE }}>{v}</div>
            <div className="text-[11px] text-slate-600 mt-1">{d}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-slate-900 text-white p-3 text-xs italic">
        Reversibility clause: BC owns artefacts, models (per contract) and pipelines. We transfer runbooks. No vendor lock-in.
      </div>
    </Slide>
  ),

  // Slide 6 — Ask
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 6 · Ask" title="Leave with a one-page pilot charter" sub="Align on sponsor, corridor, KPI, and data — kickoff in two weeks.">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: BRAND_BLUE }}>What we need</div>
          {[
            ['Business co-sponsor', 'Sales / RM excellence · operations · or HNI lead — alongside COO air cover'],
            ['Primary KPI', 'RM meetings per outcome · redemption prevention · onboarding TAT · cost per account · NPS in pilot cluster'],
            ['Corridor', 'One geography · one RM desk · or one product line — limit change-management risk'],
            ['Data', 'Anonymised / sandbox extracts · CRM event samples · no production PII in vendor laptops without explicit controls'],
          ].map(([t, d]) => (
            <div key={t} className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: BRAND_BLUE }}>✓</div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{t}</div>
                <div className="text-xs text-slate-600">{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6 text-white flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #0F1F4D, #1E3A8A)' }}>
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-blue-200 mb-3">Next step</div>
            <div className="text-2xl font-light leading-tight">Signed pilot charter inside 2 weeks. Kickoff with weekly steering.</div>
            <div className="mt-5 space-y-2 text-sm text-blue-100">
              <div>· Joint pod model — BC owns code, models, pipelines</div>
              <div>· No CRM / core customisation during the pilot</div>
              <div>· Demo walkthrough available: <Link to="/bajajcapital" className="underline text-white">/bajajcapital</Link></div>
            </div>
          </div>
          <div className="mt-6 rounded-lg bg-white/10 border border-white/20 p-3 text-xs">
            <span className="text-blue-200 uppercase tracking-widest font-semibold">Discovery</span>
            <div className="mt-1">Top 3 ops metrics watched monthly · CRM single-customer-ID reality · GenAI compliance non-negotiables · biggest manual step in RM workflow today.</div>
          </div>
        </div>
      </div>
    </Slide>
  ),
];

export default function BajajCapitalDeck() {
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
        <Link to="/bajajcapital" className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Hub</Link>
        <div className="flex items-center gap-2">
          <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} className="px-3 py-1.5 text-xs rounded border border-slate-300 disabled:opacity-40 hover:bg-slate-50">Prev</button>
          <div className="text-xs text-slate-500 w-16 text-center">{idx + 1} / {total}</div>
          <button onClick={() => setIdx(i => Math.min(total - 1, i + 1))} disabled={idx === total - 1} className="px-3 py-1.5 text-xs rounded text-white disabled:opacity-40 flex items-center gap-1" style={{ background: BRAND_BLUE }}>Next <ArrowRight className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </div>
  );
}
