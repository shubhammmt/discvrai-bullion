import React, { useState, useMemo } from 'react';
import { Layout, Card, KPI, Pill, ScoreRing, Tab } from './ui';
import { LEADS, OBJECTIONS, TEMPLATES_EN, TEMPLATES_HI, Lead } from './data';
import { Smartphone, ListChecks, MessageSquare, ShieldQuestion, Send, Phone, MapPin, Calendar, ArrowRight, CheckCircle2, Sparkles, ChevronDown, FileText, Languages } from 'lucide-react';

const TABS: Tab[] = [
  { id: 'myday', label: 'My Day', icon: ListChecks },
  { id: 'lead', label: 'Lead Card', icon: Smartphone },
  { id: 'objections', label: 'Objections', icon: ShieldQuestion },
  { id: 'followup', label: 'Follow-up', icon: MessageSquare },
];

const STATUS_TONE: Record<string, 'orange'|'amber'|'rose'|'emerald'|'slate'|'blue'> = {
  New: 'orange', Contacted: 'blue', Met: 'amber', Quoted: 'amber', Bound: 'emerald', 'Follow-up': 'slate', Lost: 'rose',
};

export default function ICICICopilot() {
  const [tab, setTab] = useState('myday');
  const [activeId, setActiveId] = useState(LEADS[0].id);
  const active = useMemo(() => LEADS.find(l => l.id === activeId)!, [activeId]);
  const [status, setStatus] = useState<string>(active.status);
  const [outcome, setOutcome] = useState('');
  const [logged, setLogged] = useState<string[]>([]);

  return (
    <Layout title="Distributor Next-Best-Pitch Copilot" subtitle="Module 01 · Mobile-first rep workflow"
      tabs={TABS} active={tab} onChange={setTab}
      right={<Pill tone="orange">Suresh Patil · Rep R-101 · West</Pill>}>

      {tab === 'myday' && <MyDay onOpen={(id) => { setActiveId(id); setStatus(LEADS.find(l=>l.id===id)!.status); setTab('lead'); }} />}
      {tab === 'lead' && (
        <LeadCard lead={active} status={status} setStatus={setStatus} outcome={outcome} setOutcome={setOutcome}
          logged={logged} setLogged={setLogged} goObj={() => setTab('objections')} goFu={() => setTab('followup')} />
      )}
      {tab === 'objections' && <Objections />}
      {tab === 'followup' && <FollowUp lead={active} />}
    </Layout>
  );
}

function MyDay({ onOpen }: { onOpen: (id: string) => void }) {
  const sorted = [...LEADS].sort((a, b) => b.score - a.score);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <KPI label="Today's prioritized leads" value="20" sub="of 142 total" />
        <KPI label="Hot (score ≥ 85)" value="6" delta="3 new" tone="up" />
        <KPI label="SLA compliance" value="92%" delta="+4%" tone="up" sub="last 7 days" />
        <KPI label="Pipeline value" value="₹4.8 L" sub="potential premium · 30d" />
      </div>

      <Card title="My Day · Top prioritized leads" subtitle="Sorted by AI lead score · reason codes shown"
        right={<div className="flex gap-1.5"><Pill tone="orange">AI ranked</Pill><Pill tone="emerald">Audit logged</Pill></div>}>
        <div className="space-y-2">
          {sorted.map(l => (
            <button key={l.id} onClick={() => onOpen(l.id)}
              className="w-full text-left p-3 rounded-lg border border-slate-200 bg-white hover:border-[#F37920] hover:shadow-sm transition flex items-center gap-4">
              <ScoreRing score={l.score} size={48} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-semibold text-slate-900 text-sm">{l.name}</div>
                  <span className="text-[11px] text-slate-500">· {l.city} {l.cityTier}</span>
                  <Pill tone={STATUS_TONE[l.status]}>{l.status}</Pill>
                  <Pill tone="slate">{l.channel}</Pill>
                </div>
                <div className="text-xs text-slate-600 mt-0.5 truncate">
                  <span className="font-medium text-slate-700">{l.recommendedPlan}</span> · {l.premiumBand} · {l.family}
                </div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {l.reasons.slice(0, 2).map(r => <span key={r} className="text-[10px] bg-orange-50 border border-orange-100 text-[#F37920] px-1.5 py-0.5 rounded font-medium">{r}</span>)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500">NEXT</div>
                <div className="text-xs font-semibold text-slate-900">{l.nextAction}</div>
                <ArrowRight className="w-4 h-4 text-slate-400 ml-auto mt-1" />
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

function LeadCard({ lead, status, setStatus, outcome, setOutcome, logged, setLogged, goObj, goFu }:
  { lead: Lead; status: string; setStatus: (s: string) => void; outcome: string; setOutcome: (s: string) => void;
    logged: string[]; setLogged: (s: string[]) => void; goObj: () => void; goFu: () => void; }) {

  const actions = [
    { i: Phone, t: 'Call', tone: 'bg-emerald-600 hover:bg-emerald-700' },
    { i: MessageSquare, t: 'WhatsApp', tone: 'bg-green-500 hover:bg-green-600' },
    { i: MapPin, t: 'Schedule Visit', tone: 'bg-blue-600 hover:bg-blue-700' },
    { i: CheckCircle2, t: 'Mark Met', tone: 'bg-[#F37920] hover:bg-orange-600' },
    { i: FileText, t: 'Convert to Quote', tone: 'bg-slate-900 hover:bg-slate-800' },
  ];

  const log = (act: string) => setLogged([...logged, `${new Date().toLocaleTimeString()} · ${act} · ${lead.name}`]);

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Mobile-style lead card */}
      <div className="col-span-12 lg:col-span-5">
        <div className="mx-auto max-w-[400px] rounded-[28px] border-[10px] border-slate-900 bg-white shadow-2xl overflow-hidden">
          <div className="bg-[#0A1A4A] text-white p-4">
            <div className="flex items-center justify-between text-[10px] text-orange-200">
              <span>ICICI Lombard · Rep app</span>
              <span>Live</span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <ScoreRing score={lead.score} size={52} />
              <div>
                <div className="text-base font-bold">{lead.name}</div>
                <div className="text-[11px] text-orange-200">{lead.city} · {lead.cityTier} · Age {lead.age}</div>
                <Pill tone={STATUS_TONE[lead.status]}>{status}</Pill>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Customer profile</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><div className="text-slate-500">Family</div><div className="font-medium text-slate-900">{lead.family}</div></div>
              <div><div className="text-slate-500">Income</div><div className="font-medium text-slate-900">{lead.income}</div></div>
              <div><div className="text-slate-500">Channel</div><div className="font-medium text-slate-900">{lead.channel}</div></div>
              {lead.renewalDue && <div><div className="text-slate-500">Renewal due</div><div className="font-medium text-rose-600">{lead.renewalDue}</div></div>}
              {lead.priorPolicy && <div className="col-span-2"><div className="text-slate-500">Prior policy</div><div className="font-medium text-slate-900">{lead.priorPolicy}</div></div>}
            </div>

            <div className="rounded-lg bg-orange-50 border border-orange-100 p-3">
              <div className="text-[10px] uppercase tracking-wider text-[#F37920] font-semibold flex items-center gap-1"><Sparkles className="w-3 h-3" /> Next-best pitch</div>
              <div className="mt-1 text-sm font-bold text-slate-900">{lead.recommendedPlan}</div>
              <div className="text-xs text-slate-700 mt-0.5">Premium band: <span className="font-semibold">{lead.premiumBand}</span></div>
              <div className="mt-2 space-y-1">
                {lead.reasons.map(r => <div key={r} className="text-[11px] text-slate-700 flex gap-1"><CheckCircle2 className="w-3 h-3 text-[#F37920] mt-0.5 shrink-0" />{r}</div>)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {actions.map(a => (
                <button key={a.t} onClick={() => log(a.t)}
                  className={`text-white text-xs font-semibold py-2 rounded-md flex items-center justify-center gap-1.5 ${a.tone}`}>
                  <a.i className="w-3.5 h-3.5" /> {a.t}
                </button>
              ))}
            </div>

            <button onClick={goObj} className="w-full text-xs font-semibold py-2 rounded-md border border-[#F37920] text-[#F37920] hover:bg-orange-50 flex items-center justify-center gap-1.5">
              <ShieldQuestion className="w-3.5 h-3.5" /> Open objection cards (12)
            </button>
            <button onClick={goFu} className="w-full text-xs font-semibold py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5">
              <Send className="w-3.5 h-3.5" /> Send follow-up
            </button>
          </div>
        </div>
      </div>

      {/* Right: log outcome + activity */}
      <div className="col-span-12 lg:col-span-7 space-y-4">
        <Card title="Log meeting outcome" subtitle="Drives pipeline movement and manager visibility · audit logged">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Outcome</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 text-sm">
                {['Interested','Follow-up','Not Interested','Renewal Opportunity','Quoted','Bound','Met'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Next follow-up date</label>
              <input type="date" defaultValue="2026-05-12"
                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="col-span-2">
              <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Notes</label>
              <textarea value={outcome} onChange={e => setOutcome(e.target.value)} rows={3}
                placeholder="Customer reviewed quote — concerned about premium, comfortable with sum insured. Will decide by Friday."
                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="col-span-2 flex items-center justify-between">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Suitability check passed · Recommendation explainability available
              </div>
              <button onClick={() => log(`Outcome: ${status}`)}
                className="px-4 py-2 bg-[#F37920] text-white text-xs font-bold rounded-md hover:bg-orange-600">
                Save outcome
              </button>
            </div>
          </div>
        </Card>

        <Card title="Activity log · this lead" subtitle="Auto-captured · feeds manager dashboard in real time">
          {logged.length === 0 ? (
            <div className="text-xs text-slate-500 italic py-3">No activity yet. Use action buttons or save outcome.</div>
          ) : (
            <div className="space-y-1.5">
              {logged.slice().reverse().map((l, i) => (
                <div key={i} className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded font-mono text-slate-700">{l}</div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Objections() {
  const [open, setOpen] = useState<number | null>(0);
  const [filter, setFilter] = useState('');
  const filtered = OBJECTIONS.filter(o => o.q.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <KPI label="Objection cards" value="12" sub="curated by training team" />
        <KPI label="Most common" value="Premium" sub="34% of lost deals" />
        <KPI label="Avg resolution rate" value="62%" delta="+8%" tone="up" sub="when card is used" />
      </div>
      <Card title="Objection-handling library" subtitle="Tap to expand · use during meeting · tracks usage for coaching"
        right={<input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search objection…" className="text-xs border border-slate-300 rounded px-2 py-1 w-48" />}>
        <div className="space-y-2">
          {filtered.map((o, i) => (
            <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-3 bg-white hover:bg-slate-50 text-left">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-orange-50 text-[#F37920] text-xs font-bold flex items-center justify-center">{i+1}</span>
                  <span className="text-sm font-semibold text-slate-800">{o.q}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="p-4 bg-orange-50 border-t border-orange-100 text-sm text-slate-800 leading-relaxed">
                  <div className="text-[10px] uppercase tracking-wider text-[#F37920] font-bold mb-1.5">Recommended response</div>
                  {o.a}
                  <div className="mt-3 flex gap-2">
                    <button className="text-[11px] px-2.5 py-1 bg-[#F37920] text-white rounded font-semibold">Mark used in meeting</button>
                    <button className="text-[11px] px-2.5 py-1 border border-slate-300 text-slate-700 rounded font-semibold">Save as favorite</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function FollowUp({ lead }: { lead: Lead }) {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [tplIdx, setTplIdx] = useState(0);
  const list = lang === 'en' ? TEMPLATES_EN : TEMPLATES_HI;
  const tpl = list[tplIdx];
  const text = tpl.text
    .replace('{{name}}', lead.name.split(' ')[0])
    .replace('{{rep}}', 'Suresh')
    .replace('{{date}}', lead.renewalDue || '24 Nov')
    .replace('{{plan}}', lead.recommendedPlan)
    .replace('{{premium}}', lead.premiumBand)
    .replace('{{hospital}}', 'Apollo & Fortis');

  return (
    <div className="space-y-4">
      <Card title={`Follow-up composer · ${lead.name}`} subtitle="Bilingual templates · personalized · audit-logged on send"
        right={
          <div className="flex gap-1.5 bg-slate-100 rounded-md p-0.5">
            <button onClick={() => setLang('en')} className={`text-xs px-2 py-1 rounded ${lang==='en'?'bg-white text-[#F37920] font-semibold shadow-sm':'text-slate-600'}`}>
              <Languages className="w-3 h-3 inline mr-1" /> English
            </button>
            <button onClick={() => setLang('hi')} className={`text-xs px-2 py-1 rounded ${lang==='hi'?'bg-white text-[#F37920] font-semibold shadow-sm':'text-slate-600'}`}>
              <Languages className="w-3 h-3 inline mr-1" /> Hinglish
            </button>
          </div>
        }>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {list.map((t, i) => (
            <button key={t.name} onClick={() => setTplIdx(i)}
              className={`p-3 rounded-lg text-left text-xs border ${tplIdx===i?'border-[#F37920] bg-orange-50':'border-slate-200 bg-white hover:bg-slate-50'}`}>
              <div className="font-semibold text-slate-900">{t.name}</div>
              <div className="text-slate-500 mt-0.5 line-clamp-2">{t.text.slice(0, 60)}…</div>
            </button>
          ))}
        </div>
        <textarea defaultValue={text} rows={6} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm font-mono" />
        <div className="mt-3 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Personalization tokens resolved · suitability statement appended
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 text-xs font-semibold border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Schedule
            </button>
            <button className="px-4 py-2 text-xs font-bold bg-[#F37920] text-white rounded-md hover:bg-orange-600 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5" /> Send via WhatsApp
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
