import React from 'react';
import { PageHeader, Card, Pill, BRAND } from './ui';
import { Database, Layers, Cpu, ShieldCheck, GitBranch } from 'lucide-react';

export default function RAKArchitecture() {
  return (
    <div>
      <PageHeader
        eyebrow="Reference"
        title="Sidecar architecture · clean-core safe"
        sub="ERP / IBP stay system-of-record. We consume via APIs, build governed data products, and host models / agents alongside."
      />

      <div className="p-6 space-y-4">
        <Card>
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-1 rounded-xl border-2 border-slate-300 bg-slate-100 p-4 text-center">
              <Database className="w-6 h-6 mx-auto text-slate-700" />
              <div className="mt-2 text-sm font-semibold text-slate-900">Systems of record</div>
              <div className="text-[11px] text-slate-600 mt-1">SAP S/4 · IBP · SuccessFactors · PIM · MES / Historian</div>
              <Pill>Unchanged · clean core</Pill>
            </div>

            <div className="col-span-1 flex items-center justify-center text-slate-400 text-2xl">→</div>

            <div className="col-span-1 rounded-xl p-4 text-center text-white" style={{ background: 'linear-gradient(135deg, #7B0E1F, #A6192E)' }}>
              <Layers className="w-6 h-6 mx-auto" />
              <div className="mt-2 text-sm font-semibold">Governed data products</div>
              <div className="text-[11px] text-rose-100 mt-1">Semantic layer · MDM fixes · golden datasets · contracts</div>
            </div>

            <div className="col-span-1 flex items-center justify-center text-slate-400 text-2xl">→</div>

            <div className="col-span-1 rounded-xl border-2 p-4 text-center" style={{ borderColor: BRAND.red, background: '#FEF2F2' }}>
              <Cpu className="w-6 h-6 mx-auto" style={{ color: BRAND.red }} />
              <div className="mt-2 text-sm font-semibold text-slate-900">Sidecar AI & agents</div>
              <div className="text-[11px] text-slate-700 mt-1">ML · vision · time-series · planners · copilots · cockpits</div>
              <Pill tone="red">RAK owns code & models</Pill>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          {[
            { i: ShieldCheck, t: 'Governance', d: 'RBAC tied to corporate IdP · audit log for every recommendation · model cards · drift monitoring · production gates.' },
            { i: GitBranch, t: 'Integration patterns', d: 'Read-first via SAP APIs / event mesh · write-back only as approval workflow · zero SAP-core customisation during pilot.' },
            { i: Cpu, t: 'MLOps + handover', d: 'Embedded T&M pod builds; RAK Cloud / private endpoint hosts. All artefacts handed over: code, pipelines, model registry, runbooks.' },
          ].map((l, i) => {
            const I = l.i;
            return (
              <Card key={i}>
                <I className="w-5 h-5 mb-2" style={{ color: BRAND.red }} />
                <div className="text-sm font-semibold text-slate-900">{l.t}</div>
                <div className="text-xs text-slate-600 mt-1.5 leading-relaxed">{l.d}</div>
              </Card>
            );
          })}
        </div>

        <Card title="Why this respects the SAP-led programme">
          <ul className="space-y-2 text-sm text-slate-700">
            {[
              'No customisation of the SAP core during the pilot — we replicate or consume via APIs.',
              'Master-data fixes feed back to SAP via your standard MDM process — not as side-channel edits.',
              'Agentic workflows draft actions; final write-back is always an approved transaction on SAP.',
              'Pilot scope is one KPI, one geography, one BU — small enough to govern, big enough to matter.',
            ].map(t => (
              <li key={t} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5 flex-shrink-0" style={{ background: BRAND.red }}>✓</span>
                {t}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
