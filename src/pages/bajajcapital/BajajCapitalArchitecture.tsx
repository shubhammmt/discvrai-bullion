import React from 'react';
import { PageHeader, Card, Pill, BRAND } from './ui';
import { Database, Layers, Cpu, ShieldCheck, GitBranch } from 'lucide-react';

export default function BajajCapitalArchitecture() {
  return (
    <div>
      <PageHeader
        eyebrow="Reference"
        title="Sidecar architecture · CRM / core safe"
        sub="CRM, SuperRM, and core systems stay system-of-record. We consume via APIs, build governed data products, and host models / agents alongside."
      />

      <div className="p-6 space-y-4">
        <Card>
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-1 rounded-xl border-2 border-slate-300 bg-slate-100 p-4 text-center">
              <Database className="w-6 h-6 mx-auto text-slate-700" />
              <div className="mt-2 text-sm font-semibold text-slate-900">Systems of record</div>
              <div className="text-[11px] text-slate-600 mt-1">CRM (e.g. SimpleCRM) · SuperRM · core platforms · KYC · payments</div>
              <Pill>Unchanged · no rip-and-replace</Pill>
            </div>

            <div className="col-span-1 flex items-center justify-center text-slate-400 text-2xl">→</div>

            <div className="col-span-1 rounded-xl p-4 text-center text-white" style={{ background: 'linear-gradient(135deg, #0F1F4D, #1E3A8A)' }}>
              <Layers className="w-6 h-6 mx-auto" />
              <div className="mt-2 text-sm font-semibold">Governed data products</div>
              <div className="text-[11px] text-blue-100 mt-1">Customer golden record · semantic layer · feature store · contracts</div>
            </div>

            <div className="col-span-1 flex items-center justify-center text-slate-400 text-2xl">→</div>

            <div className="col-span-1 rounded-xl border-2 p-4 text-center" style={{ borderColor: BRAND.blue, background: '#EFF6FF' }}>
              <Cpu className="w-6 h-6 mx-auto" style={{ color: BRAND.blue }} />
              <div className="mt-2 text-sm font-semibold text-slate-900">Sidecar AI & agents</div>
              <div className="text-[11px] text-slate-700 mt-1">Uplift / churn ML · RAG copilots · doc intelligence · surveillance · cockpits</div>
              <Pill tone="blue">BC owns code & models</Pill>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          {[
            { i: ShieldCheck, t: 'Governance', d: 'PII minimisation · RBAC tied to corporate IdP · audit log for every recommendation · model cards · drift monitoring · production gates · SEBI/RBI workflows reviewed with compliance.' },
            { i: GitBranch, t: 'Integration patterns', d: 'Read-first via CRM / core APIs and event mesh · write-back only as approval workflow · zero core customisation during pilot · synthetic data for vendor environments.' },
            { i: Cpu, t: 'MLOps + handover', d: 'Embedded T&M pod builds · BC cloud / private endpoint hosts · all artefacts handed over: code, pipelines, model registry, runbooks. Reversible by design.' },
          ].map((l, i) => {
            const I = l.i;
            return (
              <Card key={i}>
                <I className="w-5 h-5 mb-2" style={{ color: BRAND.blue }} />
                <div className="text-sm font-semibold text-slate-900">{l.t}</div>
                <div className="text-xs text-slate-600 mt-1.5 leading-relaxed">{l.d}</div>
              </Card>
            );
          })}
        </div>

        <Card title="Why this respects the existing CRM / core stack">
          <ul className="space-y-2 text-sm text-slate-700">
            {[
              'No customisation of the core CRM or transactional systems during the pilot — we replicate or consume via APIs.',
              'Master-data fixes feed back through your standard MDM process — not via side-channel edits.',
              'Agentic workflows draft actions; final write-back is always an approved transaction by an authorised user.',
              'Pilot scope is one KPI, one corridor, one product line — small enough to govern, big enough to matter.',
              'Agents are not autonomous decision-makers — they are checked-out assistants on your rules and your content.',
            ].map(t => (
              <li key={t} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5 flex-shrink-0" style={{ background: BRAND.blue }}>✓</span>
                {t}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
