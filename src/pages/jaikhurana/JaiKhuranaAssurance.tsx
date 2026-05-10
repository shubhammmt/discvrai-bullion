import React, { useState } from 'react';
import { PageHeader, Card, Pill, BRAND } from './ui';
import { assuranceTopIssues, assuranceQA } from './data';
import { Bot, FileText, Send, Download, Sparkles, ShieldAlert } from 'lucide-react';

export default function JaiKhuranaAssurance() {
  const [qaIdx, setQaIdx] = useState(0);
  const qa = assuranceQA[qaIdx];

  return (
    <div>
      <PageHeader
        eyebrow="Demo 06 · Management assurance copilot"
        title="Top issues · review note · escalation · action tracker"
        sub="RAG-style Q&A on approved MIS / policy / project packs. Drafts only — humans approve before send. Every output cites its sources."
        right={<Pill tone="navy">RAG · cited · HITL</Pill>}
      />
      <div className="p-6 grid grid-cols-12 gap-4">
        <div className="col-span-7 space-y-4">
          <Card title="Q&A panel" right={<Pill tone="green">Audit log live</Pill>}>
            <div className="flex flex-wrap gap-2 mb-3">
              {assuranceQA.map((q, i) => (
                <button key={i} onClick={() => setQaIdx(i)}
                  className={`text-[11px] px-3 py-1.5 rounded border transition ${i === qaIdx ? 'text-white' : 'text-slate-300'}`}
                  style={i === qaIdx ? { background: BRAND.accentDeep, borderColor: BRAND.accent } : { background: BRAND.navy, borderColor: '#1E2A55' }}>
                  {q.q}
                </button>
              ))}
            </div>
            <div className="rounded-lg p-4 border" style={{ background: BRAND.navy, borderColor: '#1E2A55' }}>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2"><Bot className="w-3.5 h-3.5" /> Assurance copilot</div>
              <div className="text-sm text-slate-200 leading-relaxed">{qa.a}</div>
              <div className="mt-3 pt-3 border-t" style={{ borderColor: '#1E2A55' }}>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Sources</div>
                <div className="flex flex-wrap gap-1.5">
                  {qa.sources.map(s => <Pill key={s} tone="navy">{s}</Pill>)}
                </div>
              </div>
            </div>
          </Card>

          <Card title="Top 5 issues this week" right={<Pill tone="amber">Ranked by impact × SLA</Pill>}>
            <div className="space-y-2">
              {assuranceTopIssues.map(t => (
                <div key={t.rank} className="flex items-start gap-3 p-3 rounded border" style={{ background: BRAND.navy, borderColor: '#1E2A55' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: BRAND.accentDeep }}>{t.rank}</div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-100 font-medium">{t.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{t.impact} · Owner: {t.owner}</div>
                  </div>
                  <Pill tone={t.status.includes('Open') || t.status.includes('Owner pending') ? 'red' : t.status.includes('Escalated') ? 'amber' : 'green'}>{t.status}</Pill>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="col-span-5 space-y-4">
          <Card title="Generated weekly review note" right={<Pill tone="navy">Draft · pending approval</Pill>}>
            <div className="rounded-lg p-3 text-xs leading-relaxed border" style={{ background: BRAND.navy, borderColor: '#1E2A55', color: '#CBD5E1' }}>
              <p className="font-semibold text-white mb-1.5">Week 42 · Group logistics & ropeway assurance</p>
              <p>Spend +4.7% vs plan; concentration in detention (Mundra→NCR) and a spot-premium breach on Dhamra rail. Modelled saving ₹ 9.2 Cr over 30d via rail-multimodal shift + spot hold. Project: Kedarnath Pkg-3 cable slip — 6w trial-run risk; escalation drafted for joint OEM-supplier call within 3 days.</p>
              <p className="mt-2"><span className="text-cyan-300 font-semibold">Decisions sought:</span> approve recovery on EX-3041 (₹ 84L), authorise vendor re-balance on EastRail corridor, sign off Pkg-3 expedited freight contingency.</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="text-[11px] px-3 py-1.5 rounded text-white font-medium flex items-center gap-1.5" style={{ background: BRAND.accentDeep }}>
                <FileText className="w-3.5 h-3.5" /> Approve & circulate
              </button>
              <button className="text-[11px] px-3 py-1.5 rounded border text-slate-300 hover:text-white" style={{ borderColor: '#1E2A55' }}>
                Edit
              </button>
              <button disabled className="text-[11px] px-3 py-1.5 rounded border text-slate-500 cursor-not-allowed flex items-center gap-1.5" style={{ borderColor: '#1E2A55' }}>
                <Send className="w-3.5 h-3.5" /> Send (disabled in demo)
              </button>
            </div>
          </Card>

          <Card title="Action tracker · export">
            <div className="text-xs text-slate-400 mb-2">14 open · 5 SLA-at-risk · 2 leadership decision pending</div>
            <button className="w-full text-[11px] px-3 py-2 rounded text-white font-medium flex items-center justify-center gap-1.5" style={{ background: BRAND.accentDeep }}>
              <Download className="w-3.5 h-3.5" /> Export action tracker (CSV)
            </button>
            <div className="mt-3 rounded-lg p-2.5 text-[11px] flex items-start gap-2" style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.25)', color: '#A5F3FC' }}>
              <Sparkles className="w-3 h-3 mt-0.5" />
              <span>Pattern: 60% of repeat exceptions cluster in 3 corridors. Recommend a joint procurement-ops review on these.</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-amber-300"><ShieldAlert className="w-3 h-3" /> Synthetic data · not operational tracker.</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
