import React from 'react';
import { PageHeader, ArchStrip, Card, Pill, Narration } from './ui';
import { Database, Smartphone, Globe, FileWarning, MessageSquare, Megaphone, Circle } from 'lucide-react';

const conns = [
  { i: Database, name: 'Policy admin feed', type: 'Source', status: 'green', detail: 'CDC · every 5 min · 0 lag' },
  { i: Smartphone, name: 'App events stream', type: 'Source', status: 'green', detail: 'Kafka · 18.4k events/min' },
  { i: Globe, name: 'Web journey events', type: 'Source', status: 'green', detail: 'GTM + server-side · sampled' },
  { i: FileWarning, name: 'Claims status', type: 'Source · CRITICAL', status: 'green', detail: 'API + webhook · drives guardrails' },
  { i: MessageSquare, name: 'Complaint cases (Sanadak-aware)', type: 'Source · CRITICAL', status: 'amber', detail: 'Mock connector · prod cutover Wk-6' },
  { i: MessageSquare, name: 'Marketing ESP', type: 'Channel', status: 'green', detail: 'Salesforce MC · journeys + push' },
  { i: Megaphone, name: 'Meta Ads · audiences API', type: 'Channel', status: 'amber', detail: 'Suppression list export · Wk-3' },
  { i: Megaphone, name: 'Google Ads · customer match', type: 'Channel', status: 'amber', detail: 'Suppression list export · Wk-3' },
];

export default function AWNICIntegration() {
  return (
    <>
      <PageHeader eyebrow="Screen 8 · Reference" title="Integration Status (mock)"
        sub="What we need from AWNIC to light up Phase 1. Most sources read-only; channels via standard APIs."
        right={<Pill tone="teal">Phase 1 ready in 3 weeks</Pill>} />
      <ArchStrip active="sources" />
      <Narration>Decision-and-orchestration layer over the existing AWNIC estate — never policy admin or claims of record.</Narration>

      <div className="px-8 pb-10 grid grid-cols-2 gap-5">
        {conns.map(c => {
          const Icon = c.i;
          const dot = c.status === 'green' ? '#059669' : c.status === 'amber' ? '#D97706' : '#DC2626';
          return (
            <Card key={c.name}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-slate-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-900">{c.name}</div>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: dot }}>
                      <Circle className="w-2 h-2 fill-current" />
                      {c.status === 'green' ? 'Connected' : c.status === 'amber' ? 'Pending' : 'Error'}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-widest mt-0.5">{c.type}</div>
                  <div className="text-xs text-slate-600 mt-2">{c.detail}</div>
                </div>
              </div>
            </Card>
          );
        })}

        <Card title="Data we DO NOT take" className="col-span-2">
          <div className="grid grid-cols-3 gap-3 text-xs text-slate-600">
            <div>· No raw PII off platform · all hashed at source</div>
            <div>· No payment instrument data</div>
            <div>· No medical underwriting data</div>
            <div>· No call recordings (transcripts only · opt-in)</div>
            <div>· No third-party data without consent ledger</div>
            <div>· Right-to-be-forgotten honoured in 24h</div>
          </div>
        </Card>
      </div>
    </>
  );
}
