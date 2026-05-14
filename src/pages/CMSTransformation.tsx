import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Clock, MapPin, GitCompare, Target, FileWarning, Lock, CheckCircle2, AlertTriangle, ArrowRight, Activity, Eye, Banknote, Truck } from 'lucide-react';

/**
 * CMS Transformation — COO Narrative Demo
 * Independent route: /cms-transformation
 * Representative UI; numbers illustrative.
 */

type DemoKey = 'blind' | 'chain' | 'truth' | 'drs' | 'overage' | 'indent' | 'sop' | 'checker';

const PILLARS = [
  { title: 'Truth chain', today: 'Vault manual + email workarounds + late reconciliation', target: 'Timestamped vault events, OCR\u2019d evidence, bank/machine/vault triangulation', icon: Shield },
  { title: 'Risk placement', today: 'Velocity coverage + randomness', target: 'DRS-driven targeting + playbook by risk mode', icon: Target },
  { title: 'Compliance as code', today: 'SOPs people can skip', target: 'Kill-switches, holds, SBMF, mandatory closure gates', icon: Lock },
];

const DEMOS: { key: DemoKey; title: string; sub: string; icon: any }[] = [
  { key: 'blind', title: 'Blind Window Clock', sub: 'Hours since last verified internal position', icon: Clock },
  { key: 'chain', title: 'In-Transit Chain', sub: 'Vault → cassette → custodian → CBR', icon: Truck },
  { key: 'truth', title: 'Three-Way Truth', sub: 'Bank · Machine · Vault triangulation', icon: GitCompare },
  { key: 'drs', title: 'DRS Audit Queue', sub: 'Tomorrow\u2019s audits, scored & explained', icon: Target },
  { key: 'overage', title: 'Overage Lifecycle', sub: 'Jam → declaration → supervisor escalation', icon: FileWarning },
  { key: 'indent', title: 'Indent Bypass Killer', sub: 'Bank shortfall → OCR → auto-revised indent', icon: Banknote },
  { key: 'sop', title: 'SOP Hard-Stop', sub: 'Single-device OTC blocked; route day-91 escalates', icon: Lock },
  { key: 'checker', title: 'Checker Exception Mode', sub: 'Only true mismatches reach human eyes', icon: Eye },
];

// ---------- Small UI atoms ----------
const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...p }) => (
  <div {...p} className={`rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur ${className}`} />
);
const Chip: React.FC<{ tone?: 'green'|'amber'|'red'|'slate'|'indigo'; children: React.ReactNode }> = ({ tone='slate', children }) => {
  const map: any = {
    green: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    red:   'bg-rose-500/15 text-rose-300 border-rose-500/30',
    slate: 'bg-slate-700/30 text-slate-300 border-slate-600/40',
    indigo:'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  };
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-medium ${map[tone]}`}>{children}</span>;
};

// ---------- DEMO 1: Blind Window Clock ----------
const BlindWindow: React.FC = () => {
  const regions = [
    { name: 'North · Delhi NCR', hrs: 6.2, atms: 8421 },
    { name: 'West · Mumbai',     hrs: 11.8, atms: 9012 },
    { name: 'South · Bengaluru', hrs: 3.4, atms: 7244 },
    { name: 'East · Kolkata',    hrs: 19.6, atms: 5188 },
    { name: 'Central · Bhopal',  hrs: 27.1, atms: 4310 },
  ];
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(x => x+1), 1500); return () => clearInterval(t); }, []);
  const tone = (h:number) => h < 8 ? 'green' : h < 18 ? 'amber' : 'red';
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-400">Hours since last verified internal cash position (vault attestation OR ATM cash counter sync).</div>
        <Chip tone="indigo">Target: &lt; 8h everywhere</Chip>
      </div>
      <div className="grid gap-2">
        {regions.map(r => {
          const live = r.hrs + (tick * 0.0008 * (r.hrs > 15 ? 3 : 1));
          const t = tone(live);
          return (
            <div key={r.name} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex-1">
                <div className="text-sm text-white font-medium">{r.name}</div>
                <div className="text-[11px] text-slate-500">{r.atms.toLocaleString()} ATMs in scope</div>
              </div>
              <div className="w-48 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <motion.div animate={{ width: `${Math.min(100, live*3)}%` }} className={`h-full ${t==='green'?'bg-emerald-400':t==='amber'?'bg-amber-400':'bg-rose-500'}`} />
              </div>
              <div className={`w-20 text-right font-mono text-sm ${t==='green'?'text-emerald-300':t==='amber'?'text-amber-300':'text-rose-300'}`}>{live.toFixed(1)}h</div>
              <Chip tone={t as any}>{t==='green'?'OK':t==='amber'?'Watch':'Breach'}</Chip>
            </div>
          );
        })}
      </div>
      <div className="text-[11px] text-slate-500 pt-1">After: exception-first ops — only red rows reach the command centre queue.</div>
    </div>
  );
};

// ---------- DEMO 2: In-Transit Chain ----------
const InTransitChain: React.FC = () => {
  const steps = [
    { t: '08:42', label: 'Vault issued', who: 'Vault Mumbai-W', state: 'ok' },
    { t: '08:51', label: 'Cassettes sealed · IDs C-4421/22/23', who: 'Custodian A · Custodian B', state: 'ok' },
    { t: '09:14', label: 'Trip START · Geo-fenced', who: 'Vehicle MH-04-AB-2210', state: 'ok' },
    { t: '10:02', label: '\u26A0  GPS lost · 17 min off-route', who: 'In-transit segment', state: 'gap' },
    { t: '10:47', label: 'Arrived ATM #DL-019823', who: 'FLM signed', state: 'ok' },
    { t: '11:08', label: 'CBR closed · machine counters captured', who: 'Auto-OCR + ATM telemetry', state: 'ok' },
  ];
  return (
    <div className="space-y-2">
      <div className="text-xs text-slate-400">Single trip view — the In-Transit Mystery is now a <span className="text-rose-300">visible gap</span>, not a missing ledger.</div>
      <ol className="relative pl-5">
        <div className="absolute left-1.5 top-2 bottom-2 w-px bg-slate-700" />
        {steps.map((s,i) => (
          <li key={i} className="relative py-2">
            <div className={`absolute -left-[3px] top-3 w-3 h-3 rounded-full border-2 ${s.state==='gap'?'bg-rose-500 border-rose-300 animate-pulse':'bg-emerald-400 border-emerald-200'}`} />
            <div className="flex items-center gap-3 pl-4">
              <span className="font-mono text-[11px] text-slate-500 w-12">{s.t}</span>
              <div className="flex-1">
                <div className={`text-sm ${s.state==='gap'?'text-rose-200':'text-white'}`}>{s.label}</div>
                <div className="text-[11px] text-slate-500">{s.who}</div>
              </div>
              {s.state==='gap' && <Chip tone="red">Investigate</Chip>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

// ---------- DEMO 3: Three-Way Truth ----------
const ThreeWayTruth: React.FC = () => {
  const rows = [
    { f: 'Cassette load (₹)', bank: '40,00,000', machine: '40,00,000', vault: '40,00,000', ok: true },
    { f: 'Dispensed (txns)',  bank: '1,284 / ₹38,52,000', machine: '1,284 / ₹38,52,000', vault: '—', ok: true },
    { f: 'Residual (₹)',      bank: '1,48,000', machine: '1,46,500', vault: '1,46,500', ok: false },
    { f: 'Reject bin (₹)',    bank: '—', machine: '1,500', vault: '0', ok: false },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-400">Dispute #DRT-88241 · ATM DL-019823 · 2024-11-14</div>
        <Chip tone="amber">Root cause hypothesis: reject-bin not posted to vault on HOTO</Chip>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-950/80 text-slate-400 text-[11px] uppercase tracking-wide">
            <tr><th className="text-left p-2.5">Field</th><th className="text-left p-2.5">Bank</th><th className="text-left p-2.5">Machine</th><th className="text-left p-2.5">Vault</th><th className="p-2.5"></th></tr>
          </thead>
          <tbody>
            {rows.map((r,i) => (
              <tr key={i} className="border-t border-slate-800">
                <td className="p-2.5 text-slate-300">{r.f}</td>
                <td className="p-2.5 font-mono text-slate-200">{r.bank}</td>
                <td className="p-2.5 font-mono text-slate-200">{r.machine}</td>
                <td className="p-2.5 font-mono text-slate-200">{r.vault}</td>
                <td className="p-2.5 text-right">{r.ok ? <CheckCircle2 className="inline w-4 h-4 text-emerald-400"/> : <AlertTriangle className="inline w-4 h-4 text-amber-400"/>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1.5 rounded-lg bg-indigo-500 text-white text-xs font-semibold">Accept hypothesis</button>
        <button className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 text-xs">Open evidence pack</button>
      </div>
    </div>
  );
};

// ---------- DEMO 4: DRS Audit Queue ----------
const DRSQueue: React.FC = () => {
  const rows = [
    { id: 'BL-29911', loc: 'Bengaluru Whitefield', drs: 92, why: ['HOTO 11d overdue','Reject bin trend +210%','Same custodian pair × 23 visits'] },
    { id: 'DL-04420', loc: 'Delhi Karol Bagh',     drs: 87, why: ['Manual mode used 4×','Indent variance >25%','Camera offline 3×'] },
    { id: 'MH-77810', loc: 'Pune Hinjewadi',       drs: 71, why: ['Stagnant route day-88','Customer claim cluster'] },
    { id: 'KL-02201', loc: 'Kochi Ernakulam',      drs: 54, why: ['Bank shortfall last load','OCR slip mismatch'] },
  ];
  return (
    <div className="space-y-2">
      <div className="text-xs text-slate-400">Tomorrow\u2019s audit list — scarce audit days deployed where blind-spot risk is highest.</div>
      {rows.map(r => (
        <div key={r.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center ${r.drs>=80?'bg-rose-500/15 border border-rose-500/40':r.drs>=60?'bg-amber-500/15 border border-amber-500/40':'bg-emerald-500/15 border border-emerald-500/40'}`}>
            <div className={`text-base font-bold ${r.drs>=80?'text-rose-300':r.drs>=60?'text-amber-300':'text-emerald-300'}`}>{r.drs}</div>
            <div className="text-[9px] text-slate-400">DRS</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-semibold">{r.id}</span>
              <span className="text-[11px] text-slate-500">{r.loc}</span>
            </div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {r.why.map(w => <Chip key={w} tone="slate">{w}</Chip>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ---------- DEMO 5: Overage Lifecycle ----------
const OverageLifecycle: React.FC = () => {
  const [step, setStep] = useState(0);
  const stages = [
    { t: 'Jam signal received', who: 'ATM telemetry', detail: 'Reject-bin hit on note #2410' },
    { t: 'Custodian alerted',   who: 'FLM Ramesh K.', detail: 'Push notification + branch manager CC' },
    { t: 'Declaration screen',  who: 'On-site SBMF form', detail: 'Required: photo + denomination count' },
    { t: 'Supervisor queue',    who: 'Auto-escalation', detail: '"No overage" filed despite jam signal → review' },
  ];
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {stages.map((_,i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full ${i<=step?'bg-indigo-400':'bg-slate-800'}`} />
        ))}
      </div>
      <Card className="p-4">
        <div className="text-[11px] text-slate-500">Stage {step+1} of {stages.length}</div>
        <div className="text-base text-white font-semibold mt-1">{stages[step].t}</div>
        <div className="text-xs text-slate-400 mt-0.5">{stages[step].who} · {stages[step].detail}</div>
      </Card>
      <div className="flex gap-2">
        <button onClick={() => setStep(Math.max(0, step-1))} className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 text-xs">Back</button>
        <button onClick={() => setStep(Math.min(stages.length-1, step+1))} className="px-3 py-1.5 rounded-lg bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1">Next <ArrowRight className="w-3 h-3"/></button>
      </div>
    </div>
  );
};

// ---------- DEMO 6: Indent Bypass Killer ----------
const IndentKiller: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
    <Card className="p-3">
      <Chip tone="slate">Sanctioned indent</Chip>
      <div className="mt-2 text-2xl font-bold text-white">₹10,00,000</div>
      <div className="text-[11px] text-slate-500">HO approved · 14:02</div>
    </Card>
    <Card className="p-3 border-amber-500/40 bg-amber-500/5">
      <Chip tone="amber">Bank disbursed (OCR slip)</Chip>
      <div className="mt-2 text-2xl font-bold text-amber-300">₹6,00,000</div>
      <div className="text-[11px] text-amber-200/70">Slip #BNK/24/8821 · auto-parsed</div>
    </Card>
    <Card className="p-3 border-indigo-500/40 bg-indigo-500/5">
      <Chip tone="indigo">Auto-revised indent</Chip>
      <div className="mt-2 text-2xl font-bold text-indigo-300">₹6,00,000</div>
      <div className="text-[11px] text-indigo-200/70">PDF regenerated · synced to vault & ATM plan</div>
    </Card>
    <div className="md:col-span-3 text-[11px] text-slate-500">No more email-only indents reconciled days later. Truth at execution time.</div>
  </div>
);

// ---------- DEMO 7: SOP Hard-Stop ----------
const SOPHardStop: React.FC = () => {
  const [tried, setTried] = useState(false);
  return (
    <div className="space-y-3">
      <Card className="p-4">
        <div className="text-xs text-slate-400 mb-2">Custodian attempts OTC (one-time-cassette) on a single device</div>
        <button onClick={() => setTried(true)} className="px-3 py-2 rounded-lg bg-slate-800 text-slate-200 text-sm border border-slate-700">Submit OTC · Custodian A only</button>
        <AnimatePresence>
          {tried && (
            <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="mt-3 p-3 rounded-lg border border-rose-500/40 bg-rose-500/10">
              <div className="flex items-center gap-2 text-rose-200 text-sm font-semibold"><Lock className="w-4 h-4"/> Blocked — dual custody required</div>
              <div className="text-[11px] text-rose-200/70 mt-1">Policy CMS-SOP-014 · Logged with device fingerprint, IP, identity assertion. Manager notified.</div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Route stagnation</div>
            <div className="text-sm text-white">Route R-228 · same custodian pair · day 91</div>
          </div>
          <Chip tone="red">Auto-escalated to RM tile</Chip>
        </div>
      </Card>
    </div>
  );
};

// ---------- DEMO 8: Checker Exception Mode ----------
const CheckerExceptions: React.FC = () => {
  const items = [
    { id: 'EX-7711', s: 'System ₹38.52L · Machine ₹38.50L · Slip ₹38.52L', tone: 'amber' as const },
    { id: 'EX-7712', s: 'System ₹12.10L · Machine ₹12.10L · Slip MISSING', tone: 'red' as const },
    { id: 'EX-7713', s: 'System ₹6.00L · Machine ₹6.00L · Slip ₹10.00L', tone: 'red' as const },
  ];
  return (
    <div className="space-y-2">
      <div className="text-xs text-slate-400">Checker queue — only triangulated mismatches surface. Approve requires a written note.</div>
      {items.map(i => (
        <div key={i.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <Chip tone={i.tone}>{i.id}</Chip>
          <div className="flex-1 text-sm text-slate-200">{i.s}</div>
          <button className="px-2 py-1 rounded-md text-[11px] bg-indigo-500 text-white">Resolve</button>
        </div>
      ))}
    </div>
  );
};

const DEMO_BODY: Record<DemoKey, React.FC> = {
  blind: BlindWindow, chain: InTransitChain, truth: ThreeWayTruth, drs: DRSQueue,
  overage: OverageLifecycle, indent: IndentKiller, sop: SOPHardStop, checker: CheckerExceptions,
};

// ---------- Page ----------
const CMSTransformation: React.FC = () => {
  const [active, setActive] = useState<DemoKey>('blind');
  const Body = DEMO_BODY[active];
  const meta = DEMOS.find(d => d.key === active)!;

  return (
    <div className="min-h-screen text-white" style={{ background: 'radial-gradient(ellipse at top, #0f172a, #030712)' }}>
      {/* Top bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center">
            <Activity className="w-4 h-4 text-indigo-300" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold">CMS Transformation · COO Narrative</div>
            <div className="text-[11px] text-slate-400">From a 4-day blind window to a chained, attested, exception-first operation</div>
          </div>
          <Chip tone="amber">Representative UI · numbers illustrative</Chip>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-6 space-y-6">
        {/* Thesis */}
        <Card className="p-5 border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-slate-900/40 to-slate-900/40">
          <div className="text-[11px] uppercase tracking-widest text-indigo-300 font-semibold">One-sentence thesis</div>
          <p className="text-lg md:text-xl text-white mt-2 leading-snug">
            Our system of record is <span className="text-emerald-300">honest at the ATM</span> and <span className="text-rose-300">approximate at the vault</span> —
            this program closes the gap so cash, evidence, and accountability stay <span className="text-indigo-300">chained from bank to machine</span>, without a four-day blind window.
          </p>
        </Card>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PILLARS.map(p => (
            <Card key={p.title} className="p-4">
              <div className="flex items-center gap-2"><p.icon className="w-4 h-4 text-indigo-300" /><div className="text-sm font-semibold">{p.title}</div></div>
              <div className="mt-3 text-[11px] text-slate-500 uppercase tracking-wide">Today</div>
              <div className="text-xs text-rose-200/90">{p.today}</div>
              <div className="mt-2 text-[11px] text-slate-500 uppercase tracking-wide">Target</div>
              <div className="text-xs text-emerald-200/90">{p.target}</div>
            </Card>
          ))}
        </div>

        {/* Outcome strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { k: 'Blind window', b: '4 days', a: '< 8 hours', t: 'green' },
            { k: 'Audit hit-rate', b: '~6%', a: '38% (DRS)', t: 'indigo' },
            { k: 'Indent revised same-day', b: '12%', a: '94%', t: 'indigo' },
            { k: 'Catastrophic single-site events', b: 'baseline', a: '−63%', t: 'green' },
          ].map(m => (
            <Card key={m.k} className="p-3">
              <div className="text-[11px] text-slate-400">{m.k}</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-xs text-slate-500 line-through">{m.b}</span>
                <ArrowRight className="w-3 h-3 text-slate-600"/>
                <span className={`text-base font-bold ${m.t==='green'?'text-emerald-300':'text-indigo-300'}`}>{m.a}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Demo selector + body */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
          <div className="space-y-1.5">
            <div className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold px-1 mb-1">Clickable prototypes</div>
            {DEMOS.map(d => (
              <button key={d.key} onClick={() => setActive(d.key)}
                className={`w-full text-left p-3 rounded-xl border transition flex items-start gap-3 ${active===d.key?'bg-indigo-500/15 border-indigo-400/50':'bg-slate-900/40 border-slate-800 hover:border-slate-700'}`}>
                <d.icon className={`w-4 h-4 mt-0.5 ${active===d.key?'text-indigo-300':'text-slate-400'}`}/>
                <div>
                  <div className={`text-sm font-medium ${active===d.key?'text-white':'text-slate-200'}`}>{d.title}</div>
                  <div className="text-[11px] text-slate-500">{d.sub}</div>
                </div>
              </button>
            ))}
          </div>

          <Card className="p-5 min-h-[420px]">
            <div className="flex items-center gap-2 mb-4">
              <meta.icon className="w-4 h-4 text-indigo-300"/>
              <div className="text-sm font-semibold">{meta.title}</div>
              <span className="text-[11px] text-slate-500">— {meta.sub}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.18}}>
                <Body />
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>

        {/* What not to oversell */}
        <Card className="p-5">
          <div className="text-sm font-semibold text-white mb-3">What we will <span className="text-rose-300">not</span> oversell</div>
          <div className="grid md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-rose-300 font-semibold">"AI will stop theft."</div>
              <div className="text-slate-400 mt-1">Models prioritize and explain; rules and culture stop theft. AI aims surveillance where humans cannot scale.</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-rose-300 font-semibold">"100% real-time everywhere."</div>
              <div className="text-slate-400 mt-1">Night counting, bank queues, OEM telemetry limits — honest phased truth. Materially shorter blind interval + exception-first ops.</div>
            </div>
          </div>
        </Card>

        <footer className="text-center text-[11px] text-slate-600 py-6">DiscvrAI · CMS Transformation Demo · For COO discussion only</footer>
      </main>
    </div>
  );
};

export default CMSTransformation;
