import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Ship, Target, Calendar, Users, CheckCircle2 } from 'lucide-react';

const ACCENT = '#22D3EE';
const NAVY = '#0B1437';

const Slide: React.FC<React.PropsWithChildren<{ eyebrow: string; title: string; sub?: string; n: number; total: number }>> = ({ eyebrow, title, sub, n, total, children }) => (
  <div className="w-full h-full flex flex-col px-16 py-12" style={{ background: '#FFFFFF', color: '#0F172A' }}>
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 font-semibold tracking-[0.22em] uppercase" style={{ color: NAVY }}>
        <Ship className="w-4 h-4" /> Group Logistics × DiscvrAI · Pre-read for Jai Khurana
      </div>
      <div className="text-slate-400">{n} / {total}</div>
    </div>
    <div className="mt-8">
      <div className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: NAVY }}>{eyebrow}</div>
      <h1 className="text-4xl font-light mt-2 text-slate-900 leading-tight">{title}</h1>
      {sub && <p className="text-slate-500 mt-2 max-w-3xl">{sub}</p>}
    </div>
    <div className="mt-8 flex-1 min-h-0">{children}</div>
  </div>
);

const slides: React.FC<{ n: number; total: number }>[] = [
  // Slide 1 — Mandate fit
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 1 · Mandate fit"
      title="You own group logistics, freight strategy, ropeways, and assurance"
      sub="The constraint is decision velocity — not lack of systems. We add the layer that institutionalises execution discipline on data you already generate.">
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="col-span-2 rounded-2xl p-7 flex flex-col justify-between text-white" style={{ background: `linear-gradient(135deg, ${NAVY}, #1E3A8A)` }}>
          <div>
            <div className="text-cyan-200 text-xs uppercase tracking-widest font-semibold mb-3">Operating reality</div>
            <p className="text-xl leading-relaxed font-light">
              Multimodal network, contracts vs spot, detention / demurrage, rail utilisation,
              vendor base, mega-projects (e.g. <span className="font-semibold">Kedarnath ropeway</span> — ~12.9 km, 3S design, DBFOT).
              Systems exist. <span className="font-semibold text-white">Gap: prioritised exceptions, forward view, owner accountability, repeatable playbooks.</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[['~$ 2B', 'Group spend context'], ['12.9 km', 'Kedarnath 3S ropeway'], ['Beachhead', 'Logistics → group']].map(([v, l]) => (
              <div key={l} className="rounded-lg bg-white/10 border border-white/20 p-3">
                <div className="text-white text-lg font-semibold">{v}</div>
                <div className="text-[11px] text-cyan-100 uppercase tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6 flex flex-col">
          <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: NAVY }}>Positioning</div>
          <p className="text-sm text-slate-700 leading-relaxed flex-1">
            DiscvrAI as a <span className="font-semibold">deep-tech + production ML + workflow partner</span> —
            not a BI vendor, not a slide-only AI shop.
          </p>
          <div className="mt-4 rounded-lg border p-3 text-xs" style={{ background: '#ECFEFF', borderColor: '#A5F3FC', color: '#155E75' }}>
            "We add the layer that institutionalises execution discipline on data you already generate."
          </div>
        </div>
      </div>
    </Slide>
  ),

  // Slide 2 — From visibility to execution intelligence
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 2 · From visibility to execution"
      title="Dashboards report the past — the operating layer forces closed-loop action"
      sub="Predict slippage, cost, and risk; recommend; assign owner; track closure.">
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-2 text-xs uppercase tracking-widest font-semibold" style={{ background: '#F1F5F9', color: NAVY }}>
          <div className="px-5 py-3">Today</div>
          <div className="px-5 py-3 border-l border-slate-200">Target state</div>
        </div>
        {[
          ['MIS and dashboards', 'Exception-ranked command surface'],
          ['Reactive freight buying', 'Predictive booking + scenario recommendations'],
          ['Post-facto cost reviews', 'Leakage detection + root cause + recovery narrative'],
          ['Project status meetings', 'Milestone slippage signals + dependency risk + escalation drafts'],
          ['Leadership time in prep', 'Assurance copilot: weekly pack, owners, SLAs'],
        ].map(([a, b], i) => (
          <div key={i} className="grid grid-cols-2 text-sm border-t border-slate-200">
            <div className="px-5 py-4 text-slate-700">{a}</div>
            <div className="px-5 py-4 border-l border-slate-200 text-slate-900 font-medium" style={{ background: i % 2 ? '#F8FAFC' : '#FFFFFF' }}>→ {b}</div>
          </div>
        ))}
      </div>
    </Slide>
  ),

  // Slide 3 — Capability stack
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 3 · Capability stack" title="Same engagement scales: models → platform → embedded team"
      sub="Non-negotiables: RBAC, lineage, no autonomous spend, models explainable enough for ops and finance.">
      <div className="grid grid-cols-4 gap-3 h-full">
        {[
          { t: 'Deep tech / ML', d: 'Forecasts · anomaly detection · optimisation · survival / time-to-event for delays.', out: 'Freight rate, leakage anomalies, route cost, vendor reliability', tone: '#0B1437' },
          { t: 'Agentic / GenAI', d: 'Summarisation · Q&A on approved MIS / policy · draft escalations — humans approve.', out: 'Assurance Q&A · weekly brief · contract assist (cleared scope)', tone: '#1E3A8A' },
          { t: 'Digital transformation', d: 'Data products · semantic KPIs · pipelines from TMS / ERP / port / project tools · audit trails.', out: 'Golden logistics metrics · unified vendor view', tone: '#0891B2' },
          { t: 'T&M deployment', d: 'Pod: ML, data, MLOps, integration, QA — on your backlog without replacing core SI.', out: '4–8 FTE-equivalent · sprint cadence · runbooks', tone: '#22D3EE' },
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

  // Slide 4 — Group / CDO precursor
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 4 · Group-level contribution"
      title="A logistics win doubles as group-ready capability"
      sub="Same delivery stack — data products, MLOps, governed agents, assurance UX — so logistics doesn't fork the group's digital architecture.">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: NAVY }}>Reusable across the group</div>
          {[
            ['Group digital / CDO forum', 'Reference patterns: governance, monitoring, feature/data product templates, RBAC baselines · sidecar to core ERP'],
            ['Cement & building materials', 'Energy / cost intensity · predictive maintenance · quality anomaly · bulk dispatch optimisation · assurance pack'],
            ['Renewables (Green Energy)', 'Generation forecasting · curtailment & merchant exposure · O&M prioritisation · contract / warranty exceptions'],
            ['Cross-group', 'Vendor & procurement intelligence · ESG / disclosure workflows · workforce analytics — governance-first, read-only first'],
          ].map(([t, d]) => (
            <div key={t} className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: NAVY }}>✓</div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{t}</div>
                <div className="text-xs text-slate-600">{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6 text-white flex flex-col" style={{ background: `linear-gradient(135deg, ${NAVY}, #155E75)` }}>
          <div className="text-xs uppercase tracking-widest font-semibold text-cyan-200 mb-3">Precursor outcomes</div>
          <ul className="space-y-3 text-sm text-cyan-50 leading-relaxed">
            <li>· One-page <span className="font-semibold text-white">"group reuse" memo</span> with the logistics pilot — what's vertical-specific vs horizontal (assurance copilot, leakage, forecasting fabric).</li>
            <li>· Post-pilot, optional joint session with group digital / CDO to <span className="font-semibold text-white">standardise patterns</span> — your timing, your sponsorship.</li>
            <li>· No dependency on any single intro — we start where you have the strongest mandate.</li>
          </ul>
          <div className="mt-auto pt-4 rounded-lg bg-white/10 border border-white/20 p-3 text-xs italic">
            "We start where you have the strongest mandate. We build once so Cement, Green, or group digital can adopt the spine without a science project."
          </div>
        </div>
      </div>
    </Slide>
  ),

  // Slide 5 — Use cases
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 5 · Prioritised use cases" title="Pick 1–2 for the pilot"
      sub="Default recommendation: #2 (Predictive freight) + #3 or #4 (Leakage / vendor) — measurable, data-feasible, maps to cost and assurance.">
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-12 text-[11px] uppercase tracking-widest font-semibold px-4 py-3" style={{ background: '#F1F5F9', color: NAVY }}>
          <div className="col-span-1">#</div><div className="col-span-4">Use case</div><div className="col-span-7">Pilot-level outcome</div>
        </div>
        {[
          ['1', 'Group logistics command tower', 'Single executive surface: spend vs plan · mode mix · exceptions · pending decisions'],
          ['2', 'Predictive freight booking advisor', 'When to book · mode split · contract vs spot — ₹ / $ impact scenarios', true],
          ['3', 'Cost leakage cockpit', 'Detention · demurrage · spot premium · billing variance · underutilised contract capacity', true],
          ['4', 'Vendor performance & risk', 'Landed cost (rate + reliability) · concentration · repeat failure patterns'],
          ['5', 'Ropeway / infra execution assurance', 'Critical path · package procurement risk · milestone slippage forecast · escalation drafts'],
          ['6', 'Management assurance copilot', 'Top issues this week · impact · owner · SLA · draft review note'],
        ].map(([i, t, d, rec]) => (
          <div key={i as string} className={`grid grid-cols-12 text-sm border-t border-slate-200 px-4 py-3 ${rec ? 'bg-cyan-50' : ''}`}>
            <div className="col-span-1 font-mono text-slate-500">{i}</div>
            <div className="col-span-4 text-slate-900 font-medium flex items-center gap-2">{t}{rec && <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{ background: NAVY, color: '#fff' }}>RECOMMEND</span>}</div>
            <div className="col-span-7 text-slate-600">{d}</div>
          </div>
        ))}
      </div>
    </Slide>
  ),

  // Slide 6 — Delivery
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 6 · Delivery" title="Pilot → scale → pod"
      sub="Prove on one corridor / one BU / one project stream; then harden and widen.">
      <div className="grid grid-cols-4 gap-3">
        {[
          { wk: 'Weeks 0–2', t: 'Discovery & KPI lock', d: 'Sponsor · metric · data access · compliance path', icon: Target },
          { wk: 'Weeks 3–10', t: 'Build & shadow', d: 'Models + UI + integration stubs · champion-challenger · UAT with ops', icon: Users },
          { wk: 'Weeks 11–14', t: 'Limited production', d: 'Measured impact · runbooks · monitoring · drift', icon: Calendar },
          { wk: 'Quarter+', t: 'Scale via T&M pod', d: '4–8 FTE: ML · data eng · MLOps · full-stack · integration · QA · TPM', icon: CheckCircle2 },
        ].map((s, i) => {
          const I = s.icon;
          return (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: NAVY }}>{s.wk}</div>
              <div className="mt-2 flex items-center gap-2">
                <I className="w-4 h-4" style={{ color: NAVY }} />
                <div className="text-sm font-semibold text-slate-900">{s.t}</div>
              </div>
              <div className="text-xs text-slate-600 mt-2 leading-relaxed">{s.d}</div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-3 mt-5">
        {[
          ['Fixed-scope pilot', 'One use case', 'Acceptance test · exit criteria'],
          ['Multi-quarter transformation', 'Data spine + flows', 'Only after pilot proof'],
          ['T&M pod', '3–6 mo minimum', 'Embedded capacity · ramp up/down by phase'],
        ].map(([t, v, d]) => (
          <div key={t} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wider text-slate-500">{t}</div>
            <div className="text-xl font-semibold mt-1" style={{ color: NAVY }}>{v}</div>
            <div className="text-[11px] text-slate-600 mt-1">{d}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg p-3 text-xs italic" style={{ background: NAVY, color: '#A5F3FC' }}>
        Pod roles on tap: ML / applied scientists · data engineers · MLOps / platform · full-stack · integration · QA · TPM. Weekly backlog with named DRIs · time tracking per your vendor norms.
      </div>
    </Slide>
  ),

  // Slide 7 — Ask
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 7 · Ask" title="One sponsor · one dataset · one KPI · one decision date"
      sub="Plus optional group thread when you choose to convene.">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: NAVY }}>Logistics ask · primary</div>
          {[
            ['Scope', '5–10 lanes · or one BU freight category · or one ropeway workstream — not enterprise day-one'],
            ['Data', 'Historical freight · contracts · invoices · movement logs · vendor master · sanitised exports'],
            ['Success', '2–5% landed-freight improvement on pilot lanes · or ₹X leakage identified with prevention playbook — defined jointly'],
            ['Next step', 'Pilot charter sign-off · legal / data path parallel · week-10 go/no-go'],
          ].map(([t, d]) => (
            <div key={t} className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: NAVY }}>✓</div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{t}</div>
                <div className="text-xs text-slate-600">{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6 text-white flex flex-col justify-between" style={{ background: `linear-gradient(135deg, ${NAVY}, #1E3A8A)` }}>
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-cyan-200 mb-3">Group / CDO ask · optional</div>
            <ul className="space-y-3 text-sm text-cyan-50 leading-relaxed">
              <li>· Re-open digital intros for <span className="font-semibold text-white">Cement / Green Energy</span> when you want — same pilot + spine narrative.</li>
              <li>· Or: schedule a short alignment with group CDO / EA <span className="font-semibold text-white">after milestone 1</span> — evidence-first, not theory.</li>
            </ul>
          </div>
          <div className="mt-6 rounded-lg bg-white/10 border border-white/20 p-3 text-xs">
            <span className="text-cyan-200 uppercase tracking-widest font-semibold">Demo</span>
            <div className="mt-1">Logistics Execution Intelligence Command Center · <Link to="/jaikhurana" className="underline text-white">/jaikhurana</Link></div>
          </div>
        </div>
      </div>
    </Slide>
  ),
];

export default function JaiKhuranaDeck() {
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
        <Link to="/jaikhurana" className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Hub</Link>
        <div className="flex items-center gap-2">
          <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} className="px-3 py-1.5 text-xs rounded border border-slate-300 disabled:opacity-40 hover:bg-slate-50">Prev</button>
          <div className="text-xs text-slate-500 w-16 text-center">{idx + 1} / {total}</div>
          <button onClick={() => setIdx(i => Math.min(total - 1, i + 1))} disabled={idx === total - 1} className="px-3 py-1.5 text-xs rounded text-white disabled:opacity-40 flex items-center gap-1" style={{ background: NAVY }}>Next <ArrowRight className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </div>
  );
}
