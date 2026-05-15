import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield, Target, RefreshCw, Layers, FlaskConical, Calendar, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

const NAVY = '#0B2D4A';
const TEAL = '#0D9488';

const Slide: React.FC<React.PropsWithChildren<{ eyebrow: string; title: string; sub?: string; n: number; total: number }>> = ({ eyebrow, title, sub, n, total, children }) => (
  <div className="w-full h-full flex flex-col px-16 py-12" style={{ background: '#FFFFFF', color: '#0F172A' }}>
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 font-semibold tracking-[0.22em] uppercase" style={{ color: NAVY }}>
        <Shield className="w-4 h-4" /> AWNIC × DiscvrAI · Growth Intelligence
      </div>
      <div className="text-slate-400">{n} / {total}</div>
    </div>
    <div className="mt-8">
      <div className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: TEAL }}>{eyebrow}</div>
      <h1 className="text-4xl font-light mt-2 text-slate-900 leading-tight">{title}</h1>
      {sub && <p className="text-slate-500 mt-2 max-w-3xl">{sub}</p>}
    </div>
    <div className="mt-8 flex-1 min-h-0">{children}</div>
  </div>
);

const slides: React.FC<{ n: number; total: number }>[] = [
  // 1 — Title
  ({ n, total }) => (
    <div className="w-full h-full flex flex-col px-16 py-12 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #061A2E 60%, ${TEAL} 140%)`, color: '#fff' }}>
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="relative z-10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 font-semibold tracking-[0.22em] uppercase text-teal-200">
          <Shield className="w-4 h-4" /> AWNIC · Confidential
        </div>
        <div className="text-white/40">{n} / {total}</div>
      </div>
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="text-[11px] uppercase tracking-[0.3em] font-semibold text-teal-300 mb-4">Executive Pre-read</div>
        <h1 className="text-6xl font-light leading-tight max-w-4xl">
          Motor Acquisition & <span className="font-semibold" style={{ color: '#5EEAD4' }}>Growth Intelligence</span> for AWNIC
        </h1>
        <p className="text-xl text-blue-100 mt-6 max-w-3xl font-light">
          Acquire smarter. Retain longer. Grow wallet share — without breaking service trust.
        </p>
        <div className="mt-12 flex items-center gap-4 text-sm text-blue-200">
          <span>Discvr Growth Intelligence</span>
          <span className="text-white/30">·</span>
          <span>Al Wathba National Insurance Company · UAE</span>
        </div>
      </div>
      <div className="relative z-10 text-[11px] text-blue-200/70">Confidential · For AWNIC executive discussion only</div>
    </div>
  ),

  // 2 — Vision alignment
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 2 · Vision alignment" title="Your vision, operationalized" sub="Two motions, one decision layer — measured against the four KPIs that matter to the board.">
      <div className="grid grid-cols-2 gap-5 h-full">
        <div className="rounded-2xl border-2 p-7 flex flex-col" style={{ borderColor: '#0D9488', background: 'linear-gradient(180deg, rgba(13,148,136,0.04), white)' }}>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" style={{ color: TEAL }} />
            <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: TEAL }}>Acquire</div>
          </div>
          <div className="text-2xl font-semibold mt-2 text-slate-900">Lower CAC · Higher ROAS</div>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-700 flex-1">
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" /> AI ranks every quote by likelihood-to-bind</li>
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" /> Abandoned quote recovery via two-touch journeys</li>
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" /> In-force customers suppressed from paid audiences</li>
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" /> Budget shifts from low- to high-propensity segments</li>
          </ul>
        </div>
        <div className="rounded-2xl border-2 p-7 flex flex-col" style={{ borderColor: NAVY, background: 'linear-gradient(180deg, rgba(11,45,74,0.04), white)' }}>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" style={{ color: NAVY }} />
            <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: NAVY }}>Grow</div>
          </div>
          <div className="text-2xl font-semibold mt-2 text-slate-900">CLTV ↑ · Churn ↓</div>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-700 flex-1">
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 mt-0.5" /> Renewal save before the 45-day cliff</li>
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 mt-0.5" /> Motor tier upsell + roadside add-ons</li>
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 mt-0.5" /> Cross-sell home, cyber, health — only when allowed</li>
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-700 mt-0.5" /> Loyalty bonus over deep discount</li>
          </ul>
        </div>
        <div className="col-span-2 rounded-xl px-6 py-4 flex items-center justify-center gap-8 text-sm font-semibold" style={{ background: NAVY, color: '#fff' }}>
          <div className="text-teal-300 uppercase tracking-widest text-[11px]">KPIs we move</div>
          <div className="flex gap-6">
            <span>CLTV ↑</span><span>Churn ↓</span><span>CAC ↓</span><span>ROAS ↑</span>
          </div>
        </div>
      </div>
    </Slide>
  ),

  // 3 — Gap
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 3 · The gap today" title="Digital exists — decisioning is fragmented" sub="The investments are real. The orchestration layer between them is the missing piece.">
      <div className="grid grid-cols-5 gap-5 h-full">
        <div className="col-span-3 rounded-2xl border border-slate-200 p-6 bg-slate-50">
          <div className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-4">Today · siloed channels</div>
          <div className="grid grid-cols-3 gap-3">
            {['App', 'Web', 'Ads', 'Call Center', 'Loyalty', 'Claims'].map(c => (
              <div key={c} className="rounded-lg border border-slate-300 bg-white p-3 text-center">
                <div className="text-sm font-semibold text-slate-800">{c}</div>
                <div className="text-[10px] text-slate-400 mt-1">own data · own logic</div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-center gap-3 text-rose-600">
            <AlertTriangle className="w-4 h-4" />
            <div className="text-xs font-semibold">Broken arrows · no shared customer ID · no shared decision</div>
          </div>
        </div>
        <div className="col-span-2 space-y-3">
          {[
            { t: 'No single customer ID', d: 'Quotes and policies don\'t always link to the same person across web, app, and call center.' },
            { t: 'Marketing ≠ Service', d: 'Cross-sell offers may fire while a claim is open or complaint pending — eroding trust.' },
            { t: 'Wasted spend', d: 'Acquisition budget retargets customers who already hold a policy.' },
          ].map(b => (
            <div key={b.t} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-semibold text-slate-900">{b.t}</div>
              <div className="text-xs text-slate-600 mt-1 leading-relaxed">{b.d}</div>
            </div>
          ))}
          <div className="rounded-xl p-4 text-xs font-semibold" style={{ background: TEAL, color: '#fff' }}>
            We add the orchestration layer · not another siloed channel
          </div>
        </div>
      </div>
    </Slide>
  ),

  // 4 — Modules
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 4 · Platform modules" title="What we build in Phase 1" sub="Four modules — every one anchored to motor, every one observable, every one with a guardrail.">
      <div className="grid grid-cols-2 gap-5 h-full">
        {[
          { i: Target, title: 'A · Acquisition Intelligence', tone: TEAL, bullets: ['Propensity-to-bind on every quote', 'Abandon recovery journeys', 'In-force audience suppression', 'Budget shift simulator'] },
          { i: RefreshCw, title: 'B · Retention & CLTV', tone: NAVY, bullets: ['Churn risk · 30 / 60 / 90 day', 'Renewal save (loyalty over discount)', 'Motor upsell · roadside add-ons', 'Cross-sell home · cyber · health'] },
          { i: Shield, title: 'C · Trust Guardrails', tone: '#DC2626', bullets: ['Suppress commercial offers during open claim', 'Suppress during open complaint / Sanadak case', 'Frequency caps · channel rules', 'Every decision audited'] },
          { i: FlaskConical, title: 'D · Measurement', tone: '#7C3AED', bullets: ['Holdout populations on every campaign', 'Executive cockpit · CLTV · CAC · ROAS', 'Closed-loop attribution to revenue', 'Weekly readout export'] },
        ].map(m => {
          const Icon = m.i;
          return (
            <div key={m.title} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: m.tone }}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-base font-semibold text-slate-900">{m.title}</div>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-700 flex-1">
                {m.bullets.map(b => <li key={b} className="flex gap-2"><span className="text-slate-400">·</span>{b}</li>)}
              </ul>
            </div>
          );
        })}
      </div>
    </Slide>
  ),

  // 5 — Timeline
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 5 · Proof path" title="Outcomes in 10–16 weeks, not 18 months" sub="Three doable paths. Lean pod. One motor cohort. Measured uplift before scale.">
      <div className="grid grid-cols-3 gap-5 h-full">
        {[
          { wk: '10 weeks', name: 'Foundation', tone: '#64748B', items: ['Customer 360 stub on motor', 'Trust guardrails live', 'Acquisition + renewal lists', 'Pilot readout'] },
          { wk: '12 weeks', name: 'Growth (recommended)', tone: TEAL, items: ['+ ML propensity model', '+ One cross-sell journey', '+ Holdout experiment', 'Measured CAC + save uplift'] },
          { wk: '16 weeks', name: 'Complete', tone: NAVY, items: ['+ Multi-product NBA', '+ Agent assist desktop', '+ Ad audience export', '5+ weeks live in-market proof'] },
        ].map((c, i) => (
          <div key={c.wk} className={`rounded-2xl border-2 p-5 flex flex-col ${i === 1 ? 'shadow-lg' : ''}`} style={{ borderColor: c.tone, background: i === 1 ? 'linear-gradient(180deg, rgba(13,148,136,0.04), white)' : 'white' }}>
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: c.tone }}>{c.wk}</div>
              {i === 1 && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded text-white" style={{ background: TEAL }}>Recommended</span>}
            </div>
            <div className="text-2xl font-semibold mt-2 text-slate-900">{c.name}</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 flex-1">
              {c.items.map(it => <li key={it} className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" style={{ color: c.tone }} />{it}</li>)}
            </ul>
          </div>
        ))}
        <div className="col-span-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-700"><Calendar className="w-4 h-4 text-slate-500" /><span className="font-semibold">Lean pod:</span> 2–3 engineers · 1 data scientist · 1 QA · 1 PM · DiscvrAI delivery lead</div>
          <div className="text-xs text-slate-500">Overlay on existing AWNIC stack — no rip-and-replace</div>
        </div>
      </div>
    </Slide>
  ),

  // 6 — Options + CTA
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 6 · Choose your path" title="Three options · one next step" sub="Indicative AED bands; final scope and price set after technical discovery.">
      <div className="h-full flex flex-col">
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-[11px] uppercase tracking-widest text-slate-500">
                <th className="px-5 py-3">Option</th>
                <th className="px-5 py-3">Duration</th>
                <th className="px-5 py-3">Scope highlight</th>
                <th className="px-5 py-3">Indicative AED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-900">Foundation</td>
                <td className="px-5 py-4 text-slate-700">10 weeks</td>
                <td className="px-5 py-4 text-slate-700">Guardrails · acquire list · renewal list · pilot readout</td>
                <td className="px-5 py-4 font-semibold text-slate-900">AED 380K – 460K</td>
              </tr>
              <tr style={{ background: 'rgba(13,148,136,0.05)' }}>
                <td className="px-5 py-4 font-semibold" style={{ color: TEAL }}>Growth · Recommended</td>
                <td className="px-5 py-4 text-slate-800 font-medium">12 weeks</td>
                <td className="px-5 py-4 text-slate-800">+ ML propensity · 1 cross-sell · holdout · measured uplift</td>
                <td className="px-5 py-4 font-semibold" style={{ color: TEAL }}>AED 520K – 640K</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-900">Complete</td>
                <td className="px-5 py-4 text-slate-700">16 weeks</td>
                <td className="px-5 py-4 text-slate-700">+ Multi-product NBA · agent assist · ad export · 5wk live proof</td>
                <td className="px-5 py-4 font-semibold text-slate-900">AED 720K – 880K</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5">
          {['Motor-anchored cohort first', '3–5 KPIs · holdout-measured', 'Overlays existing AWNIC stack'].map(b => (
            <div key={b} className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 flex items-center gap-2"><Sparkles className="w-4 h-4 text-teal-600" />{b}</div>
          ))}
        </div>
        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="text-sm text-slate-600">Next step · 60-minute discovery with motor + digital + data leadership.</div>
          <div className="px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2 shadow-lg" style={{ background: NAVY }}>
            Schedule Technical Discovery <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Slide>
  ),
];

export default function AWNICDeck() {
  const [i, setI] = useState(0);
  const total = slides.length;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') setI(p => Math.min(total - 1, p + 1));
      if (e.key === 'ArrowLeft') setI(p => Math.max(0, p - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);
  const Cur = slides[i];
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between bg-white border-b border-slate-200">
        <Link to="/awnic" className="text-xs flex items-center gap-1 text-slate-600 hover:text-slate-900"><ArrowLeft className="w-3.5 h-3.5" /> AWNIC Hub</Link>
        <div className="text-xs text-slate-500">Use ← → to navigate · {i + 1} / {total}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setI(p => Math.max(0, p - 1))} className="px-2 py-1 rounded border border-slate-300 text-xs hover:bg-slate-50" disabled={i === 0}>Prev</button>
          <button onClick={() => setI(p => Math.min(total - 1, p + 1))} className="px-2 py-1 rounded text-white text-xs" style={{ background: NAVY }} disabled={i === total - 1}>Next</button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[1280px] aspect-[16/9] shadow-2xl rounded-xl overflow-hidden border border-slate-200 bg-white">
          <Cur n={i + 1} total={total} />
        </div>
      </div>
    </div>
  );
}
