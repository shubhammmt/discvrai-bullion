import { useState } from 'react';
import { Card, Pill } from './ui';
import { copilotQA } from './data';
import { Send, Sparkles, Bot, CheckCircle2 } from 'lucide-react';

export default function PetroleumCopilot() {
  const [active, setActive] = useState(0);
  const [input, setInput] = useState('');
  const current = copilotQA[active];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-4 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">DiscvrAI Petroleum Copilot</div>
              <div className="text-[10px] text-slate-500">Operations assistant · 14 systems</div>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-medium">Suggested questions</div>
          <div className="space-y-1.5">
            {copilotQA.map((q, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`w-full text-left text-xs p-2.5 rounded-md border transition ${
                  active === i ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}>
                {q.q}
              </button>
            ))}
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-8 p-0 flex flex-col min-h-[560px]">
          <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-slate-700">Source-backed enterprise answer</span>
            </div>
            <Pill color="emerald">Audit-trail enabled</Pill>
          </div>

          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            {/* user msg */}
            <div className="flex justify-end">
              <div className="max-w-[80%] bg-slate-900 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm">
                {current.q}
              </div>
            </div>
            {/* AI msg */}
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 shrink-0 text-[10px] font-bold">AI</div>
              <div className="flex-1">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-sm p-4">
                  <p className="text-sm text-slate-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: current.a.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

                  <div className="mt-3.5 pt-3 border-t border-slate-200">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5">Source data</div>
                    <div className="flex flex-wrap gap-1.5">
                      {current.sources.map(s => <Pill key={s} color="blue">{s}</Pill>)}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Recommended action attached · ready to assign owner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 p-3 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask the petroleum copilot…"
              className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
            />
            <button className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5" /> Ask
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
