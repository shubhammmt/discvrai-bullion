import React, { useState } from 'react';
import { PageHeader, ArchStrip, Card, Pill, Narration } from './ui';
import { ShieldOff, ShieldCheck, Home, Heart, Lock, Wrench, Smartphone, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AWNICCrossSell() {
  const [profile, setProfile] = useState<'fatima' | 'ahmed'>('fatima');

  return (
    <>
      <PageHeader eyebrow="Screen 5 · 2 minutes · CRITICAL" title="Cross-Sell · Trust Guardrails First"
        sub="One customer with an open claim. One customer past resolution. The system behaves differently — by design."
        right={
          <div className="flex gap-1 rounded-md border border-slate-200 p-0.5 bg-slate-50">
            <button onClick={() => setProfile('fatima')} className={`text-xs px-3 py-1.5 rounded ${profile === 'fatima' ? 'bg-white shadow-sm font-semibold' : 'text-slate-500'}`}>Fatima K. · open claim</button>
            <button onClick={() => setProfile('ahmed')} className={`text-xs px-3 py-1.5 rounded ${profile === 'ahmed' ? 'bg-white shadow-sm font-semibold' : 'text-slate-500'}`}>Ahmed R. · resolved</button>
          </div>
        } />
      <ArchStrip active="decision" />
      <Narration>Growth only when trust allows it. Same engine, two outcomes — driven by claim and complaint state, not by campaign calendar.</Narration>

      <div className="px-8 pb-10 grid grid-cols-3 gap-5">
        {/* Customer card */}
        <Card title="Customer profile" className="col-span-1">
          {profile === 'fatima' ? (
            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-900 text-sm">Fatima K.</div>
              <div className="flex justify-between"><span className="text-slate-500">Policy</span><span className="font-mono">P-770411</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Tier</span><span>Comprehensive</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Claim status</span><Pill tone="danger">OPEN · CLM-9921</Pill></div>
              <div className="flex justify-between"><span className="text-slate-500">Days since FNOL</span><span className="font-semibold">3</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Repair partner</span><span>Al Habtoor Garage</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Sanadak case</span><span>None</span></div>
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-900 text-sm">Ahmed R.</div>
              <div className="flex justify-between"><span className="text-slate-500">Policy</span><span className="font-mono">P-770588</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Tier</span><span>Comprehensive</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Claim status</span><Pill tone="green">CLOSED · 14 days ago</Pill></div>
              <div className="flex justify-between"><span className="text-slate-500">CSAT post-claim</span><span className="font-semibold text-emerald-700">9 / 10</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Tenure</span><span>4.2 years</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Sanadak case</span><span>None</span></div>
            </div>
          )}
        </Card>

        {/* Decision panel */}
        <Card title="Decision · what the engine does" className="col-span-2">
          {profile === 'fatima' ? (
            <div className="space-y-3">
              <div className="rounded-xl border-2 p-5" style={{ borderColor: '#DC2626', background: 'linear-gradient(180deg, rgba(220,38,38,0.05), white)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#DC2626' }}>
                    <ShieldOff className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-rose-900">Commercial offers SUPPRESSED</div>
                    <div className="text-xs text-rose-700">Open claim · trust-protection rule TR-002 · enforced</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-white border border-rose-200 p-3 text-xs">
                    <div className="text-[10px] font-bold uppercase text-rose-700 mb-1">Blocked</div>
                    <div className="space-y-1 text-slate-600">
                      <div className="flex gap-1.5"><AlertTriangle className="w-3 h-3 text-rose-500 mt-0.5" />Home insurance cross-sell</div>
                      <div className="flex gap-1.5"><AlertTriangle className="w-3 h-3 text-rose-500 mt-0.5" />Renewal upsell</div>
                      <div className="flex gap-1.5"><AlertTriangle className="w-3 h-3 text-rose-500 mt-0.5" />Loyalty redemption nudges</div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white border border-emerald-200 p-3 text-xs">
                    <div className="text-[10px] font-bold uppercase text-emerald-700 mb-1">Allowed</div>
                    <div className="space-y-1 text-slate-700">
                      <div className="flex gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-600 mt-0.5" />Claim status update</div>
                      <div className="flex gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-600 mt-0.5" />Repair ETA notification</div>
                      <div className="flex gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-600 mt-0.5" />Surveyor / pickup scheduling</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PIP customer view */}
              <div className="rounded-xl border border-slate-200 bg-slate-900 p-3 text-white">
                <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1"><Smartphone className="w-3 h-3" /> Customer app · what Fatima sees</div>
                <div className="rounded-lg bg-slate-800 p-3">
                  <div className="text-xs font-semibold">Claim CLM-9921 · In Repair</div>
                  <div className="text-[11px] text-slate-300 mt-1">Estimated ready · 3 days · Al Habtoor Garage</div>
                  <div className="mt-2 h-1.5 rounded bg-slate-700 overflow-hidden"><div className="h-full bg-teal-400" style={{ width: '60%' }} /></div>
                  <div className="text-[10px] text-slate-400 mt-1">FNOL → Survey → Repair → Delivery</div>
                </div>
                <div className="text-[10px] text-slate-500 mt-2">No commercial cards rendered for this user state.</div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-xl border-2 p-5" style={{ borderColor: '#059669', background: 'linear-gradient(180deg, rgba(5,150,105,0.05), white)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#059669' }}>
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-emerald-900">Eligible · controlled offers permitted</div>
                    <div className="text-xs text-emerald-700">Claim closed 14d · no open complaint · within frequency cap (1 of 2 used)</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-teal-200 bg-white p-3">
                    <div className="flex items-center gap-2 mb-1"><Home className="w-4 h-4 text-teal-700" /><div className="text-sm font-semibold text-slate-900">Cross-sell · Home Insurance</div></div>
                    <div className="text-xs text-slate-600">Bundle save 12% · loyalty 1,000 pts</div>
                    <div className="text-[10px] text-slate-500 mt-1">Channel · App + Email · Touch 1 of 2 this month</div>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-white p-3">
                    <div className="flex items-center gap-2 mb-1"><Wrench className="w-4 h-4 text-blue-700" /><div className="text-sm font-semibold text-slate-900">Upsell · Agency Repair add-on</div></div>
                    <div className="text-xs text-slate-600">+AED 240 / yr · brand-authorised garages</div>
                    <div className="text-[10px] text-slate-500 mt-1">In-app card · expires 7d</div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-[11px] text-slate-500">
                  <div>Suppressed for now · Cyber, Health (NBA rank lower)</div>
                  <div className="text-right">Frequency cap · 1 of 2 monthly commercial touches used</div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-[10px] uppercase tracking-widest font-semibold text-slate-500 mb-2">Why this offer · explainability</div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                  <div>· Life stage · 35-44 · settled household</div>
                  <div>· Tenure · 4.2 yrs · loyal cohort</div>
                  <div>· Product gap · no home policy on file</div>
                  <div>· Propensity (home) · 0.71</div>
                  <div>· Recent CSAT · 9 / 10 post-claim</div>
                  <div>· Channel preference · App opens 5x / wk</div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
