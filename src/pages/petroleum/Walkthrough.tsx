import { useState } from 'react';
import { Card, Pill } from './ui';
import { walkthrough } from './data';
import { ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function PetroleumWalkthrough() {
  const [step, setStep] = useState(0);
  const isFinal = step === walkthrough.length;
  const current = walkthrough[step];

  const value = [
    'Reduce stock-outs',
    'Improve tanker utilization',
    'Detect margin leakage',
    'Improve retail site productivity',
    'Grow LPG and lubricants revenue',
    'Improve B2B credit control',
    'Automate daily MIS',
    'Shift from reactive reporting to proactive execution',
  ];

  return (
    <div className="space-y-5">
      {/* progress */}
      <div className="flex items-center gap-2">
        {walkthrough.map((s, i) => (
          <div key={i} className="flex-1 flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
              i <= step ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
            }`}>{i + 1}</div>
            {i < walkthrough.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
          </div>
        ))}
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
          isFinal ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
        }`}>★</div>
      </div>

      {!isFinal ? (
        <Card className="p-10 min-h-[460px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-slate-700">
          <Pill color="emerald">Step {current.step} of 5</Pill>
          <h2 className="text-3xl font-bold mt-4">{current.title}</h2>
          <p className="text-base text-slate-300 mt-3 max-w-2xl leading-relaxed">{current.body}</p>

          <div className="mt-10 grid grid-cols-3 gap-3 max-w-3xl">
            {[
              { l: 'Connected systems', v: '14' },
              { l: 'Live exceptions', v: '23' },
              { l: 'Decisions in flight', v: '14' },
            ].map(b => (
              <div key={b.l} className="bg-white/5 border border-white/10 rounded-lg p-3.5">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">{b.l}</div>
                <div className="text-2xl font-bold mt-1">{b.v}</div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="p-10 min-h-[460px] bg-gradient-to-br from-emerald-50 to-cyan-50 border-emerald-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <Pill color="emerald">Value Proposition</Pill>
          </div>
          <h2 className="text-3xl font-bold mt-4 text-slate-900">DiscvrAI enables petroleum businesses to:</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
            {value.map(v => (
              <div key={v} className="flex items-center gap-2.5 bg-white border border-emerald-200 rounded-lg p-3.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-sm font-medium text-slate-800">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-slate-900 text-white rounded-lg max-w-3xl">
            <div className="text-[10px] uppercase tracking-wider text-emerald-300 font-medium">Positioning</div>
            <p className="mt-1.5 text-sm leading-relaxed">
              DiscvrAI does <strong>not replace</strong> existing ERP, POS or depot systems.
              It sits on top as an <strong>AI-led decision and execution layer</strong> —
              connecting data, detecting exceptions, and helping teams act faster.
            </p>
          </div>
        </Card>
      )}

      <div className="flex justify-between">
        <button
          disabled={step === 0}
          onClick={() => setStep(s => Math.max(0, s - 1))}
          className="px-4 py-2 border border-slate-300 rounded-md text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40 hover:bg-slate-50">
          <ChevronLeft className="w-3.5 h-3.5" /> Back
        </button>
        <div className="text-xs text-slate-500 self-center">
          {isFinal ? 'End of walkthrough' : `Step ${current.step} · ${walkthrough.length - current.step + 1} remaining`}
        </div>
        <button
          disabled={isFinal}
          onClick={() => setStep(s => Math.min(walkthrough.length, s + 1))}
          className="px-4 py-2 bg-slate-900 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-800 disabled:opacity-40">
          Next <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
