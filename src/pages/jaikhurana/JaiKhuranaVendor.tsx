import React from 'react';
import { PageHeader, Card, Pill, BRAND } from './ui';
import { vendors } from './data';
import { Sparkles } from 'lucide-react';

export default function JaiKhuranaVendor() {
  return (
    <div>
      <PageHeader
        eyebrow="Demo 04 · Vendor performance & risk"
        title="Vendor scorecards · landed cost truth"
        sub="OTIF reliability + cost index + concentration + repeat failure pattern → composite risk score. Recommendation shows landed-cost narrative, not raw rate."
        right={<Pill tone="navy">Composite score · drivers visible</Pill>}
      />
      <div className="p-6 grid grid-cols-3 gap-4">
        {vendors.map(v => (
          <Card key={v.name} title={v.name} right={<Pill tone={v.tone}>Score {v.score}</Pill>}>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">OTIF</div>
                <div className="text-xl font-semibold text-white">{v.otif}%</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Cost index</div>
                <div className="text-xl font-semibold text-white">{v.cost}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Concentration</div>
                <div className="text-xl font-semibold text-white">{v.concentration}%</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Repeat failures (90d)</div>
                <div className="text-xl font-semibold text-white">{v.repeatFails}</div>
              </div>
            </div>
            <div className="mt-3 rounded-lg p-2.5 text-[11px] flex items-start gap-2" style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.25)', color: '#A5F3FC' }}>
              <Sparkles className="w-3 h-3 mt-0.5" />
              <span>
                {v.tone === 'red'
                  ? `Landed cost premium: ~12%. Recommend de-risk to ≤ 12% concentration; activate fallback carrier for E-corridor.`
                  : v.tone === 'amber'
                  ? `Reliability volatile. Renegotiate SLAs with penalty band; revisit before next quarter cycle.`
                  : `Strong landed-cost candidate. Eligible for incremental volume up to +15% within concentration ceiling.`}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
