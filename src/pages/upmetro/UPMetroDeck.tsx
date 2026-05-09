import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Train, ShieldCheck, AlertTriangle, Network, Layers, Calendar, Target, CheckCircle2 } from 'lucide-react';

const Slide: React.FC<React.PropsWithChildren<{ eyebrow: string; title: string; sub?: string; n: number; total: number }>> = ({ eyebrow, title, sub, n, total, children }) => (
  <div className="w-full h-full flex flex-col px-16 py-12" style={{ background: '#FFFFFF', color: '#0B1F3A' }}>
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 text-cyan-700 font-semibold tracking-[0.22em] uppercase">
        <Train className="w-4 h-4" /> UP Metro · Cyber Resilience
      </div>
      <div className="text-slate-400">{n} / {total}</div>
    </div>
    <div className="mt-8">
      <div className="text-[11px] uppercase tracking-[0.22em] text-cyan-700 font-semibold">{eyebrow}</div>
      <h1 className="text-4xl font-light mt-2 text-slate-900 leading-tight">{title}</h1>
      {sub && <p className="text-slate-500 mt-2 max-w-3xl">{sub}</p>}
    </div>
    <div className="mt-8 flex-1 min-h-0">{children}</div>
  </div>
);

const Bullet: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
    <div className="text-sm font-semibold text-slate-900">{title}</div>
    <div className="text-xs text-slate-600 mt-1 leading-relaxed">{desc}</div>
  </div>
);

const slides: React.FC<{ n: number; total: number }>[] = [
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 1 · Executive context" title="Securing UP Metro as critical urban infrastructure" sub="Safety, service continuity, and passenger trust through cyber resilience.">
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="col-span-2 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#06142A] text-white p-7 flex flex-col justify-between">
          <div>
            <div className="text-cyan-300 text-xs uppercase tracking-widest font-semibold mb-3">Why now</div>
            <p className="text-xl leading-relaxed font-light">
              UP Metro has rapidly scaled digital and operational systems across <span className="font-semibold text-cyan-300">Lucknow, Kanpur, and Agra</span>.
              The attack surface now spans ticketing, apps, payments, HRMS, vendor channels, CCTV, signaling, SCADA, and control rooms.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[['3', 'Operating cities'],['IT + OT', 'Combined surface'],['CERT-In · NCIIPC · DPDP', 'Active obligations']].map(([v,l]) => (
              <div key={l} className="rounded-lg bg-white/5 border border-white/10 p-3">
                <div className="text-cyan-300 text-lg font-semibold">{v}</div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6 flex flex-col">
          <div className="text-xs uppercase tracking-widest text-cyan-700 font-semibold mb-3">Leadership message</div>
          <p className="text-sm text-slate-700 leading-relaxed flex-1">
            Cybersecurity is a <span className="font-semibold">service-reliability and safety</span> enabler — not only IT hygiene.
            This is an operational resilience agenda with direct impact on passenger trust, regulatory posture, and non-fare commercial continuity.
          </p>
          <div className="mt-4 rounded-lg bg-cyan-50 border border-cyan-200 p-3 text-xs text-cyan-900">
            Position: a city-scalable cyber operating model — measurable, drilled, board-visible.
          </div>
        </div>
      </div>
    </Slide>
  ),
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 2 · Risk concentration" title="Where current risk is concentrated">
      <div className="grid grid-cols-5 gap-4 h-full">
        <div className="col-span-3 grid grid-cols-1 gap-3">
          {[
            ['IT-OT convergence', 'Lateral movement potential across shared connectivity layers and weak conduits.'],
            ['Public-edge & ticketing abuse', 'Bot, fraud, API abuse, and DDoS pressure on revenue-critical channels.'],
            ['Identity & privileged access', 'MFA gaps in HRMS, remote access and vendor pathways; PAM coverage uneven.'],
            ['Supply-chain & 3rd party', 'OEMs, contractors, payment and app ecosystems with inconsistent controls.'],
            ['Recovery readiness', 'Insufficiently validated immutable backup and tested restore mechanisms.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-slate-200 bg-white p-4 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-slate-900">{t}</div>
                <div className="text-xs text-slate-600 mt-1">{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-2 rounded-2xl bg-slate-50 border border-slate-200 p-5">
          <div className="text-xs uppercase tracking-widest text-cyan-700 font-semibold mb-4">Business & operational impact</div>
          <ul className="space-y-3">
            {[
              'Passenger disruption and station congestion',
              'Revenue leakage and fraud exposure',
              'Security visibility degradation',
              'Regulatory escalation and compliance penalties',
              'Long-duration outage and reputational damage',
            ].map(x => (
              <li key={x} className="flex gap-2 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" /> {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Slide>
  ),
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 3 · Solution stack" title="Metro Cyber Resilience Stack" sub="Execution-ready layers — designed to be built, not just diagrammed.">
      <div className="grid grid-cols-1 gap-3 h-full">
        {[
          { t: 'A · Governance and command', d: 'CISO-led cyber PMO with OT security leadership; cross-functional steering across Operations, Signaling, SCADA, Commercial, HR, Legal, Procurement, IT.', i: Layers },
          { t: 'B · Identity & control foundation', d: 'Phishing-resistant MFA for privileged and remote access; PAM with session recording for all privileged and vendor sessions.', i: ShieldCheck },
          { t: 'C · Public-edge & digital channel defense', d: 'WAF + API security + bot management on ticketing/app/web; fraud analytics and secure QR/app hardening.', i: Network },
          { t: 'D · OT architecture hardening', d: 'IEC 62443-aligned zoning and conduits; OT DMZ, jump hosts, strict separation of CCTV/media from rail operations.', i: Train },
          { t: 'E · SOC, response & resilience', d: 'IT + OT detection, metro-specific playbooks, 6h CERT-In readiness; immutable backups, tested runbooks, regular drills.', i: AlertTriangle },
        ].map(r => {
          const I = r.i;
          return (
            <div key={r.t} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center flex-shrink-0">
                <I className="w-5 h-5 text-cyan-700" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900">{r.t}</div>
                <div className="text-xs text-slate-600 mt-0.5">{r.d}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Slide>
  ),
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 4 · Engagement modes" title="Partnership options for UP Metro">
      <div className="grid grid-cols-3 gap-4 h-full">
        {[
          { tag: 'Mode A · Lean', t: 'Advisory + PMO', d: 'Strategy, governance, architecture, oversight. Implementation by UPMRC/OEM partners.', good: 'Maximum cost discipline', accent: 'border-slate-300 bg-slate-50' },
          { tag: 'Mode B · Recommended', t: 'Advisory + Managed Implementation', d: 'Joint execution across design, rollout, managed monitoring, and control validation.', good: 'Best balance of speed, accountability, affordability', accent: 'border-cyan-400 bg-cyan-50 ring-2 ring-cyan-200' },
          { tag: 'Mode C · Full', t: 'Managed Cyber Transformation', d: 'End-to-end build-operate-transform model.', good: 'Highest execution control · highest long-term cost', accent: 'border-slate-300 bg-slate-50' },
        ].map(m => (
          <div key={m.tag} className={`rounded-2xl border p-6 flex flex-col ${m.accent}`}>
            <div className="text-[11px] uppercase tracking-widest font-semibold text-cyan-700">{m.tag}</div>
            <div className="text-xl font-semibold text-slate-900 mt-2">{m.t}</div>
            <p className="text-sm text-slate-700 mt-3 flex-1">{m.d}</p>
            <div className="mt-4 text-xs text-slate-600 border-t border-slate-200 pt-3">{m.good}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-[#0B1F3A] text-white p-4 text-sm flex items-center gap-3">
        <Target className="w-4 h-4 text-cyan-300" />
        <span><span className="font-semibold text-cyan-300">Recommendation:</span> Start with Mode B for 18–24 months, then transition to steady-state based on maturity and city expansion.</span>
      </div>
    </Slide>
  ),
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 5 · Timeline & investment" title="24-month implementation and investment view">
      <div className="grid grid-cols-12 gap-4 h-full">
        <div className="col-span-7 rounded-2xl border border-slate-200 p-5">
          <div className="text-xs uppercase tracking-widest text-cyan-700 font-semibold mb-4 flex items-center gap-2"><Calendar className="w-3.5 h-3.5"/> Timeline</div>
          <div className="space-y-3">
            {[
              ['0–3 months', 'Governance, baseline, identity hardening, IR readiness'],
              ['3–9 months', 'SOC uplift, PAM rollout, edge/API controls, vendor-risk controls'],
              ['9–18 months', 'OT segmentation pilots, secure remote access, passive OT monitoring, recovery engineering'],
              ['18–24+ months', 'Scale, automation, recurring assurance exercises, maturity benchmarking'],
            ].map(([w, d], i) => (
              <div key={w} className="flex gap-3">
                <div className="w-24 text-xs font-semibold text-cyan-700">{w}</div>
                <div className="flex-1 text-sm text-slate-700 border-l-2 border-cyan-200 pl-3 pb-2">{d}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-5 grid grid-cols-1 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-widest text-cyan-700 font-semibold mb-3">Skill-manpower (steady-state)</div>
            <div className="text-sm space-y-1.5 text-slate-700">
              <div>Lean: <span className="font-semibold">18–25 FTE eq.</span></div>
              <div>Balanced (recommended): <span className="font-semibold text-cyan-700">28–40 FTE eq.</span></div>
              <div>In-house heavy: <span className="font-semibold">45+ FTE eq.</span></div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 flex-1">
            <div className="text-xs uppercase tracking-widest text-cyan-700 font-semibold mb-3">Indicative commercials · 24 months</div>
            <table className="w-full text-xs">
              <thead className="text-slate-500"><tr><th className="text-left font-medium pb-1">Tier</th><th className="text-right pb-1">CapEx</th><th className="text-right pb-1">Annual Opex</th></tr></thead>
              <tbody className="text-slate-800">
                <tr className="border-t border-slate-100"><td className="py-1.5">Low</td><td className="text-right">₹20–30 Cr</td><td className="text-right">₹4–8 Cr</td></tr>
                <tr className="border-t border-slate-100 bg-cyan-50"><td className="py-1.5 font-semibold">Medium</td><td className="text-right font-semibold">₹35–60 Cr</td><td className="text-right font-semibold">₹8–15 Cr</td></tr>
                <tr className="border-t border-slate-100"><td className="py-1.5">High</td><td className="text-right">₹70–120 Cr</td><td className="text-right">₹15–30 Cr</td></tr>
              </tbody>
            </table>
            <div className="text-[10px] text-slate-400 mt-2">Indicative — refined post-pilot based on actual scope and city footprint.</div>
          </div>
        </div>
      </div>
    </Slide>
  ),
  ({ n, total }) => (
    <Slide n={n} total={total} eyebrow="Slide 6 · Pilot ask" title="90-day pilot to validate impact fast" sub="One corridor + shared enterprise controls · prove measurable risk reduction · then scale.">
      <div className="grid grid-cols-2 gap-5 h-full">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="text-xs uppercase tracking-widest text-cyan-700 font-semibold mb-4">Immediate asks from UP Metro</div>
          <ul className="space-y-3 text-sm text-slate-700">
            {['Approve pilot scope (one corridor + shared enterprise controls)','Nominate sponsor group and core working team','Confirm baseline KPIs and target outcomes'].map(x => (
              <li key={x} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" /> {x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#06142A] text-white p-6">
          <div className="text-xs uppercase tracking-widest text-cyan-300 font-semibold mb-4">Pilot deliverables in 90 days</div>
          <ul className="space-y-3 text-sm text-slate-200">
            {['Current-state risk and control heatmap','Target-state architecture and phased rollout plan','Quick-win implementation outcomes','Refined commercial and operating model proposal'].map(x => (
              <li key={x} className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-300 mt-2 flex-shrink-0" /> {x}</li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-white/10 text-sm text-cyan-200">
            "Begin with a tightly scoped cyber resilience pilot, prove measurable risk reduction and response readiness, then scale metro-wide."
          </div>
        </div>
      </div>
    </Slide>
  ),
];

export default function UPMetroDeck() {
  const [i, setI] = useState(0);
  const total = slides.length;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') setI(x => Math.min(total - 1, x + 1));
      if (e.key === 'ArrowLeft') setI(x => Math.max(0, x - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);
  const Cur = slides[i];
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[1400px] aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 bg-white">
          <Cur n={i + 1} total={total} />
        </div>
      </div>
      <div className="px-6 pb-6 flex items-center justify-between">
        <Link to="/upmetro" className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Hub</Link>
        <div className="flex items-center gap-2">
          <button onClick={() => setI(x => Math.max(0, x - 1))} className="p-2 rounded bg-white border border-slate-200 hover:bg-slate-50"><ArrowLeft className="w-4 h-4" /></button>
          <div className="text-xs text-slate-500 px-3">{i + 1} / {total}</div>
          <button onClick={() => setI(x => Math.min(total - 1, x + 1))} className="p-2 rounded bg-white border border-slate-200 hover:bg-slate-50"><ArrowRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
}
