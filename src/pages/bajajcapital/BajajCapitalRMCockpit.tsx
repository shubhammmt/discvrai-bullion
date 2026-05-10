import React, { useState } from 'react';
import { PageHeader, Card, Kpi, Pill, BRAND } from './ui';
import { rmClients, houseViewSources, rmBriefingTemplate } from './data';
import { Sparkles, MessageSquare, Mic, FileText, CheckCircle2, Edit3, Send, ShieldAlert } from 'lucide-react';

export default function BajajCapitalRMCockpit() {
  const [active, setActive] = useState(0);
  const [briefing, setBriefing] = useState<ReturnType<typeof rmBriefingTemplate> | null>(null);
  const [draft, setDraft] = useState<string | null>(null);
  const [voiceNote, setVoiceNote] = useState(false);
  const [approved, setApproved] = useState(false);
  const client = rmClients[active];

  const handleBriefing = () => {
    setBriefing(rmBriefingTemplate(client.name, client.segment));
    setDraft(null);
    setApproved(false);
  };

  const handleDraft = () => {
    setDraft(
      `Hi ${client.name.split(' ')[0]}, hope you're well. Wanted to share a quick view on your portfolio — given your goals and recent allocation, we have a small recalibration that could help. Would 15 mins this week work for a structured walkthrough? — Your Bajaj Capital RM`
    );
    setApproved(false);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Demo 01 · RM productivity"
        title="RM Intelligence Cockpit · SuperRM+"
        sub="Uplift-style scoring · cited briefings from approved house views · WhatsApp / email drafts pending RM approval · CRM logging stub. All actions human-in-the-loop."
        right={<Pill tone="green">HITL · audit-trail enabled</Pill>}
      />

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <Kpi label="Persuadable accounts (today)" value="42" delta="of 318 in book · uplift > 0.5" tone="blue" />
          <Kpi label="Wasted touches avoided" value="61%" delta="vs spray model · last 30d" tone="green" />
          <Kpi label="Churn risk · red flags" value="7" delta="2 RTR · 3 HNI · 2 retail" tone="red" />
          <Kpi label="Avg briefing time" value="12s" delta="↓ from ~22 min manual" tone="green" />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <Card title="Synthetic client book" className="col-span-5">
            <div className="space-y-2">
              {rmClients.map((c, i) => (
                <button key={c.id} onClick={() => { setActive(i); setBriefing(null); setDraft(null); setApproved(false); }}
                  className={`w-full text-left p-3 rounded-lg border transition ${active === i ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{c.name}</div>
                      <div className="text-[11px] text-slate-500">{c.id} · {c.segment} · {c.aumBand}</div>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <Pill tone={c.churnRisk > 60 ? 'red' : c.churnRisk > 40 ? 'amber' : 'green'}>Churn {c.churnRisk}</Pill>
                      <Pill tone="blue">Uplift {c.uplift.toFixed(2)}</Pill>
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-600 italic">{c.note}</div>
                  <div className="mt-1.5 text-[11px] text-slate-700"><span className="font-semibold">NBA:</span> {c.nextBest}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="col-span-7 !p-0">
            <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: BRAND.blue }} />
                <span className="text-xs font-semibold text-slate-700">Briefing for {client.name}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={handleBriefing} className="text-[11px] px-3 py-1.5 rounded text-white font-medium flex items-center gap-1.5" style={{ background: BRAND.blue }}>
                  <FileText className="w-3.5 h-3.5" /> Generate briefing
                </button>
                <button onClick={handleDraft} disabled={!briefing} className="text-[11px] px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 disabled:opacity-40">
                  <MessageSquare className="w-3.5 h-3.5" /> Draft follow-up
                </button>
                <button onClick={() => setVoiceNote(true)} className="text-[11px] px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5" /> Voice note
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4 min-h-[420px]">
              {!briefing && (
                <div className="text-center py-16 text-slate-400 text-sm">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  Click <span className="font-semibold text-slate-600">Generate briefing</span> to produce a cited pre-call brief from approved house views.
                </div>
              )}

              {briefing && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Pre-call brief · cited</div>
                  <ul className="space-y-2.5">
                    {briefing.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-800 leading-relaxed">
                        <span className="text-blue-700 font-bold">·</span>
                        <span dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3.5 pt-3 border-t border-slate-200">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5">Source documents</div>
                    <div className="flex flex-wrap gap-1.5">
                      {briefing.citations.map(s => <Pill key={s} tone="blue">{s}</Pill>)}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Suitability check pre-applied · audit log entry created</span>
                  </div>
                </div>
              )}

              {voiceNote && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="text-xs font-semibold text-amber-900 flex items-center gap-1.5 mb-2"><Mic className="w-3.5 h-3.5" /> Voice note · simulated transcript summary</div>
                  <div className="text-sm text-slate-700 italic">"Met {client.name} for 30 min. Discussed retirement runway. Concern: market volatility. Open to SWP illustration. Spouse to join next call. No commitment."</div>
                  <div className="mt-2 text-[11px] text-slate-600">Auto-populated <span className="font-semibold">Next steps</span> in CRM stub: schedule joint call · share SWP educational deck · log objection.</div>
                </div>
              )}

              {draft && (
                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3 h-3" /> WhatsApp draft · pending RM approval
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-slate-800 leading-relaxed">
                    {draft}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button onClick={() => setApproved(true)} disabled={approved}
                      className="text-[11px] px-3 py-1.5 rounded text-white font-medium flex items-center gap-1.5 disabled:opacity-50" style={{ background: BRAND.green }}>
                      <CheckCircle2 className="w-3.5 h-3.5" /> {approved ? 'Approved · CRM updated' : 'Approve'}
                    </button>
                    <button className="text-[11px] px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button disabled className="text-[11px] px-3 py-1.5 rounded border border-slate-200 text-slate-400 flex items-center gap-1.5 cursor-not-allowed">
                      <Send className="w-3.5 h-3.5" /> Send (disabled in demo)
                    </button>
                    <Pill tone="amber">No outbound send in demo</Pill>
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-[11px] text-slate-600">
              <div className="flex items-center gap-2"><ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Synthetic clients · no real PII · no real recommendations</div>
              <div>Corpus: {houseViewSources.length} demo documents</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
