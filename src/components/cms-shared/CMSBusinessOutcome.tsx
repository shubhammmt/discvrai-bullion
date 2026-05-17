import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Target, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export type CMSRouteKey =
  | 'ai-risk-radar'
  | 'data-lake'
  | 'recon-center'
  | 'overage-alerts'
  | 'indent-engine'
  | 'audit-command'
  | 'vault-ops';

interface OutcomeSpec {
  module: string;
  bullets: string[];
  kpis: { label: string; value: string }[];
  linkRadar?: boolean;
}

const SPECS: Record<CMSRouteKey, OutcomeSpec> = {
  'ai-risk-radar': {
    module: 'AI Risk Radar',
    bullets: [
      'Focus audit & recon on highest-risk ATMs',
      'Classify Theft / Overage / Cashout playbooks',
      'One engine feeds indent, overage, command centre',
    ],
    kpis: [
      { label: 'DRS coverage', value: '70k ATMs' },
      { label: 'Top-decile capture', value: '78%' },
      { label: 'Models in catalogue', value: '10' },
    ],
  },
  'data-lake': {
    module: 'Data Lake',
    bullets: [
      'End-to-end cash lineage per ATM',
      'Surface 4-day blind window',
      'Three-way truth + SOP on same record',
    ],
    kpis: [
      { label: 'Fleet online', value: '94.2%' },
      { label: 'Open 3-way gaps', value: '127' },
      { label: 'Avg blind window', value: '52h' },
    ],
    linkRadar: true,
  },
  'recon-center': {
    module: 'Recon Center',
    bullets: [
      'Prioritize top financial risks daily',
      'Triangulate bank + machine + vault',
      'Cut harmonizing & leakage exposure',
    ],
    kpis: [
      { label: 'Leakage tracked', value: '₹40 Cr/yr' },
      { label: 'Recovery potential', value: '₹12.4 L' },
      { label: 'T+5 at risk', value: '8' },
    ],
    linkRadar: true,
  },
  'overage-alerts': {
    module: 'Overage Alerts',
    bullets: [
      'Declare expected overage before custodian arrives',
      'Enforce OTC lock on mismatch',
      'Track T+5 bank queries',
    ],
    kpis: [
      { label: 'Penalties avoided (QTD)', value: '₹8.3 L' },
      { label: 'Inferred vs declared', value: '94%' },
      { label: 'OTC locks (7d)', value: '14' },
    ],
    linkRadar: true,
  },
  'indent-engine': {
    module: 'Indent Engine',
    bullets: [
      'Align central indent with bank disbursement',
      'Kill email bypass',
      'Prevent cash-outs with demand model',
    ],
    kpis: [
      { label: 'Indent accuracy', value: '91%' },
      { label: 'Cash-outs prevented MTD', value: '47' },
      { label: 'Email bypass', value: '0' },
    ],
    linkRadar: true,
  },
  'audit-command': {
    module: 'Audit Guardian',
    bullets: [
      'Target audits by DRS not random sampling',
      'Enforce top 5 process gaps',
      'Live theft / overage / cashout radar',
    ],
    kpis: [
      { label: 'Audit hit rate', value: '67%' },
      { label: 'LMR', value: '0.34' },
      { label: 'Post-audit incident', value: '2.1%' },
    ],
    linkRadar: true,
  },
  'vault-ops': {
    module: 'Vault Ops',
    bullets: [
      'Timestamp every vault handoff',
      'OCR replaces Excel re-key',
      'Tie trips to field journey',
    ],
    kpis: [
      { label: 'Digital ledger', value: '67%' },
      { label: 'OCR accuracy', value: '96.2%' },
      { label: 'Re-key errors avoided', value: '124' },
    ],
    linkRadar: true,
  },
};

interface Props {
  routeKey: CMSRouteKey;
  variant?: 'light' | 'dark';
  defaultOpen?: boolean;
}

const CMSBusinessOutcome: React.FC<Props> = ({ routeKey, variant = 'light', defaultOpen = true }) => {
  const spec = SPECS[routeKey];
  const [open, setOpen] = useState(defaultOpen);
  const dark = variant === 'dark';

  const wrap = dark
    ? 'bg-slate-900/60 border-slate-700 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900';
  const sub = dark ? 'text-slate-400' : 'text-slate-500';
  const kpiBg = dark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200';
  const accent = dark ? 'text-amber-300' : 'text-slate-900';

  return (
    <div className={`max-w-[1600px] mx-auto px-4 pt-3`}>
      <div className={`rounded-xl border ${wrap} shadow-sm`}>
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between px-4 py-2.5"
        >
          <div className="flex items-center gap-2">
            <Target className={`h-4 w-4 ${accent}`} />
            <span className="text-[11px] font-bold uppercase tracking-wider">Business Outcome</span>
            <span className={`text-[10px] ${sub}`}>· {spec.module}</span>
            <span className={`hidden md:inline text-[10px] ${sub}`}>· CMS Operations Intelligence · 129 Vaults · 3,000 Routes · 70,000 ATMs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[9px] ${sub} hidden sm:inline`}>Representative UI · Illustrative data</span>
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </button>
        {open && (
          <div className="px-4 pb-3 grid grid-cols-1 lg:grid-cols-5 gap-3">
            <div className="lg:col-span-3">
              <ul className="space-y-1.5">
                {spec.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] leading-snug">
                    <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${dark ? 'bg-amber-300' : 'bg-slate-900'}`} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {spec.linkRadar && (
                <Link
                  to="/cms-ai-risk-radar"
                  className={`inline-flex items-center gap-1 mt-2 text-[11px] font-semibold ${dark ? 'text-amber-300 hover:text-amber-200' : 'text-blue-700 hover:text-blue-900'}`}
                >
                  View ML model catalogue <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>
            <div className="lg:col-span-2 grid grid-cols-3 gap-2">
              {spec.kpis.map(k => (
                <div key={k.label} className={`rounded-lg border ${kpiBg} px-2.5 py-2`}>
                  <div className="flex items-center gap-1">
                    <BarChart3 className={`h-3 w-3 ${sub}`} />
                    <span className={`text-[9px] uppercase tracking-wide font-bold ${sub}`}>{k.label}</span>
                  </div>
                  <div className={`text-base font-bold leading-tight mt-0.5 ${accent}`}>{k.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CMSBusinessOutcome;
