import React from 'react';
import { Database, Target, Ruler, FlaskConical, CheckCircle2 } from 'lucide-react';

const pipeline = [
  { icon: Database, label: 'Data study', desc: '24mo OTC, FLM, claims, EJ logs, EOD reports' },
  { icon: Target, label: 'Business alignment', desc: 'Map to outcome: theft / overage / cashout' },
  { icon: Ruler, label: 'Rules baseline', desc: 'Codify SOP + thresholds before any ML' },
  { icon: FlaskConical, label: 'Model bake-off', desc: 'Champion vs challengers on precision@k and stability' },
  { icon: CheckCircle2, label: 'Business UAT', desc: 'Ops + audit sign-off before production' },
];

interface Row {
  ml: string;
  name: string;
  champion: string;
  bake: string;
  status: string;
  tone: 'green' | 'amber' | 'blue';
}
const rows: Row[] = [
  { ml: '1', name: 'DRS', champion: 'XGBoost drs-v3.2', bake: 'Mar 2026', status: 'Production candidate', tone: 'green' },
  { ml: '2', name: 'Risk mode', champion: 'Rule layer on DRS', bake: 'Mar 2026', status: 'Production candidate', tone: 'green' },
  { ml: '3', name: 'Demand', champion: 'GBM + calendar', bake: 'Feb 2026', status: 'A/B vs Prophet', tone: 'blue' },
  { ml: '4', name: 'Mismatch', champion: 'Rules + Isolation Forest', bake: 'Jan 2026', status: 'Pilot', tone: 'amber' },
  { ml: '5', name: 'Stuck cash', champion: 'Rules + GBM', bake: 'Feb 2026', status: 'Pilot', tone: 'amber' },
  { ml: '6', name: 'OCR', champion: 'On-device CV + Doc AI', bake: 'Mar 2026', status: 'Production candidate', tone: 'green' },
  { ml: '7', name: 'Overage', champion: 'Rules-first + severity GBM', bake: 'Mar 2026', status: 'Production candidate', tone: 'green' },
  { ml: '8', name: 'Triangulation', champion: 'Rules + GBM', bake: 'Feb 2026', status: 'Pilot', tone: 'amber' },
  { ml: '9', name: 'Neighbor stress', champion: 'Feature only', bake: '—', status: 'In DRS / demand', tone: 'blue' },
  { ml: '10', name: 'NLP intake', champion: 'Template + spaCy', bake: 'Jan 2026', status: 'Pilot', tone: 'amber' },
];

const toneCls = (t: Row['tone']) =>
  t === 'green' ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
  : t === 'amber' ? 'bg-amber-50 text-amber-700 border-amber-200'
  : 'bg-blue-50 text-blue-700 border-blue-200';

const CMSModelGovernance: React.FC = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-bold text-slate-900">Model Governance</div>
        <div className="text-[11px] text-slate-500">How CMS models are chosen, baked off, and signed into production.</div>
      </div>
      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-white font-semibold">70 / 30 governance</span>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
      {pipeline.map((p, i) => (
        <div key={p.label} className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
          <div className="flex items-center gap-1.5">
            <p.icon className="h-3.5 w-3.5 text-slate-700" />
            <span className="text-[9px] font-bold text-slate-500">STEP {i + 1}</span>
          </div>
          <div className="text-[12px] font-bold text-slate-900 mt-0.5">{p.label}</div>
          <div className="text-[10px] text-slate-600 leading-snug">{p.desc}</div>
        </div>
      ))}
    </div>

    <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-900">
      <span className="font-bold">70 / 30 governance:</span> Custodian behavior weighted 70% · Neighbor stress 30%. Same split documented on the Risk Modes tab.
    </div>

    <div className="rounded-lg border border-slate-200 overflow-hidden">
      <table className="w-full text-[11px]">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left px-3 py-2 font-bold">ML #</th>
            <th className="text-left px-3 py-2 font-bold">Name</th>
            <th className="text-left px-3 py-2 font-bold">Champion (demo)</th>
            <th className="text-left px-3 py-2 font-bold">Last bake-off</th>
            <th className="text-left px-3 py-2 font-bold">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.ml} className="border-t border-slate-100">
              <td className="px-3 py-1.5 font-mono font-bold text-slate-900">ML-{r.ml}</td>
              <td className="px-3 py-1.5 font-semibold text-slate-800">{r.name}</td>
              <td className="px-3 py-1.5 text-slate-700">{r.champion}</td>
              <td className="px-3 py-1.5 text-slate-500">{r.bake}</td>
              <td className="px-3 py-1.5">
                <span className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${toneCls(r.tone)}`}>{r.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="text-[10px] text-slate-500 italic">
      Models are trained on CMS operational data — demo values illustrative until production bake-off sign-off.
    </div>
  </div>
);

export default CMSModelGovernance;
