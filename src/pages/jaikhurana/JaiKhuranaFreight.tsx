import React, { useMemo, useState } from 'react';
import { PageHeader, Card, Kpi, Pill, BRAND } from './ui';
import { freightLane, freightOptimise, freightDrivers } from './data';
import { Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const Slider: React.FC<{ label: string; value: number; min: number; max: number; step?: number; unit?: string; onChange: (v: number) => void }> = ({ label, value, min, max, step = 1, unit, onChange }) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <div className="text-xs text-slate-300 font-medium">{label}</div>
      <div className="text-xs font-mono" style={{ color: BRAND.accent }}>{value}{unit}</div>
    </div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} className="w-full accent-cyan-400" />
  </div>
);

export default function JaiKhuranaFreight() {
  const [demand, setDemand] = useState(8200);
  const [contractCap, setContractCap] = useState(freightLane.contractCapacity);
  const [spotPrem, setSpotPrem] = useState(freightLane.spotPremiumPct);
  const [vol, setVol] = useState(freightLane.volatility);
  const [sla, setSla] = useState(freightLane.slaTarget);

  const out = useMemo(() => freightOptimise(demand, contractCap, spotPrem, vol, sla), [demand, contractCap, spotPrem, vol, sla]);

  return (
    <div>
      <PageHeader
        eyebrow="Demo 02 · Predictive freight booking"
        title={`Freight Booking Advisor · ${freightLane.name}`}
        sub="When to book · mode split · contract vs spot — modelled saving vs baseline. Drivers shown below the recommendation. No autonomous booking."
        right={<Pill tone="navy">Advisory · drivers visible</Pill>}
      />
      <div className="p-6 grid grid-cols-12 gap-4">
        <Card title="Inputs · scenario" className="col-span-4">
          <div className="space-y-4">
            <Slider label="Weekly demand (tonnes)" value={demand} min={3000} max={14000} step={100} onChange={setDemand} />
            <Slider label="Contract capacity (tonnes)" value={contractCap} min={2000} max={10000} step={100} onChange={setContractCap} />
            <Slider label="Spot premium %" value={spotPrem} min={0} max={40} unit="%" onChange={setSpotPrem} />
            <Slider label="Lane volatility (0–1)" value={vol} min={0.05} max={0.5} step={0.01} onChange={setVol} />
            <Slider label="SLA target (hours)" value={sla} min={36} max={120} onChange={setSla} />
          </div>
        </Card>

        <div className="col-span-8 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <Kpi label="Recommended saving" value={`${out.savingPct.toFixed(1)}%`} delta={`₹ ${(out.saving / 100000).toFixed(1)}L vs baseline`} tone="green" />
            <Kpi label="Blended rate / tonne" value={`₹ ${out.blendedRate.toLocaleString()}`} delta="vs baseline ₹ 38,500" tone="navy" />
            <Kpi label="Contract share" value={`${out.contractShare}%`} tone="navy" />
            <Kpi label="Spot share" value={`${out.spotShare}%`} delta={`Rail multimodal ${out.railShare}%`} tone="amber" />
          </div>

          <Card title="Recommended split" right={<Pill tone="green">SLA neutral</Pill>}>
            <div className="flex w-full h-10 rounded overflow-hidden border" style={{ borderColor: '#1E2A55' }}>
              <div className="flex items-center justify-center text-xs text-white font-semibold" style={{ width: `${out.contractShare}%`, background: BRAND.accentDeep }}>
                Contract {out.contractShare}%
              </div>
              <div className="flex items-center justify-center text-xs text-white font-semibold" style={{ width: `${out.spotShare}%`, background: BRAND.amber }}>
                Spot {out.spotShare}%
              </div>
              <div className="flex items-center justify-center text-xs text-white font-semibold" style={{ width: `${out.railShare}%`, background: '#6366F1' }}>
                Rail-multimodal {out.railShare}%
              </div>
            </div>
            <div className="mt-3 rounded-lg p-3 text-xs flex items-start gap-2" style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.25)', color: '#A5F3FC' }}>
              <Sparkles className="w-3.5 h-3.5 mt-0.5" />
              <span>Hold next 3 spot bookings on this lane. Shift {out.railShare.toFixed(0)}% of NCR-bound volume to rail-multimodal. Renegotiate spot ceiling at +{Math.max(8, spotPrem - 4)}% before next contract cycle.</span>
            </div>
          </Card>

          <Card title="Driver factors · why this recommendation">
            <div className="grid grid-cols-2 gap-2">
              {freightDrivers.map((d, i) => {
                const I = d.dir === 'up' ? TrendingUp : d.dir === 'down' ? TrendingDown : Minus;
                const tone = d.dir === 'up' ? BRAND.red : d.dir === 'down' ? BRAND.green : BRAND.amber;
                return (
                  <div key={i} className="flex items-center justify-between p-3 rounded border" style={{ background: BRAND.navy, borderColor: '#1E2A55' }}>
                    <div className="text-sm text-slate-200">{d.factor}</div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: tone }}>
                      <I className="w-3.5 h-3.5" /> {d.impact}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
