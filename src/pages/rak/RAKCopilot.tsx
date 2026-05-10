import React, { useState } from 'react';
import { PageHeader, Card, Pill, BRAND } from './ui';
import { copilotQA } from './data';
import { Bot, Send, Sparkles, CheckCircle2, FileText, ShieldAlert } from 'lucide-react';

export default function RAKCopilot() {
  const [active, setActive] = useState(0);
  const [input, setInput] = useState('');
  const [outOfCorpus, setOutOfCorpus] = useState(false);
  const current = copilotQA[active];

  const handleSend = () => {
    if (!input.trim()) return;
    setOutOfCorpus(true);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Demo 03 · Fast AI beachhead"
        title="Spec & Product Copilot"
        sub="Strict RAG over approved PIM, catalog, and project spec library. Every answer cites its source. Out-of-corpus questions are refused — not hallucinated."
        right={<Pill tone="green">Grounded · cited · auditable</Pill>}
      />

      <div className="p-6">
        <div className="grid grid-cols-12 gap-4">
          <Card title="Suggested questions" className="col-span-4">
            <div className="space-y-1.5">
              {copilotQA.map((q, i) => (
                <button key={i} onClick={() => { setActive(i); setOutOfCorpus(false); }}
                  className={`w-full text-left text-xs p-2.5 rounded-md border transition ${
                    active === i && !outOfCorpus ? 'bg-rose-50 border-rose-300 text-rose-900 font-medium' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}>
                  {q.q}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Corpus (illustrative)</div>
              <div className="space-y-1.5 text-[11px] text-slate-600">
                {['RAK Maximus Slab — Tech Sheet v2024', 'PEI Classification Guide', 'Project Spec Library · Hospitality', 'India DC policy doc', 'RAK Sustainability Report FY24'].map(d => (
                  <div key={d} className="flex items-center gap-1.5"><FileText className="w-3 h-3 text-slate-400" />{d}</div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="col-span-8 !p-0">
            <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: BRAND.red }} />
                <span className="text-xs font-semibold text-slate-700">Document-grounded answer</span>
              </div>
              <Pill tone="green">Audit-trail enabled</Pill>
            </div>

            <div className="p-5 space-y-4 min-h-[420px]">
              {/* user msg */}
              <div className="flex justify-end">
                <div className="max-w-[80%] bg-slate-900 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm">
                  {outOfCorpus ? input : current.q}
                </div>
              </div>
              {/* AI msg */}
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-md flex items-center justify-center text-white shrink-0" style={{ background: BRAND.red }}>
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  {outOfCorpus ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl rounded-tl-sm p-4">
                      <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
                        <ShieldAlert className="w-4 h-4" /> Out of corpus — I won't guess
                      </div>
                      <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                        This question isn't answered by the approved sources I have access to (PIM, catalog, project spec library, policy docs).
                        I won't generate an answer that isn't traceable.
                        Try one of the suggested questions, or route this to the spec team for a human response.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-sm p-4">
                      <p className="text-sm text-slate-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: current.a.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      <div className="mt-3.5 pt-3 border-t border-slate-200">
                        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5">Source documents</div>
                        <div className="flex flex-wrap gap-1.5">
                          {current.sources.map(s => <Pill key={s} tone="red">{s}</Pill>)}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Recommended action attached · ready to assign owner</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 p-3 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Try an off-topic question to see refusal behaviour…"
                className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-rose-500"
              />
              <button onClick={handleSend} className="px-4 py-2 text-white text-xs font-semibold rounded-md flex items-center gap-1.5" style={{ background: BRAND.red }}>
                <Send className="w-3.5 h-3.5" /> Ask
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
