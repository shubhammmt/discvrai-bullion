import React, { useState } from 'react';
import { Layout, Card, KPI, Pill, Tab } from './ui';
import { OBJECTIONS, TEMPLATES_EN } from './data';
import { FileText, ShieldQuestion, Bell, BarChart3, Edit2, Plus, Send, Eye, CheckCircle2 } from 'lucide-react';

const TABS: Tab[] = [
  { id: 'scripts', label: 'Pitch Scripts', icon: FileText },
  { id: 'objections', label: 'Objection Library', icon: ShieldQuestion },
  { id: 'nudges', label: 'Daily Nudges', icon: Bell },
  { id: 'usage', label: 'Content Effectiveness', icon: BarChart3 },
];

export default function ICICIAdmin() {
  const [tab, setTab] = useState('scripts');
  return (
    <Layout title="Admin & Trainer Console" subtitle="Module 04 · Content & nudge management"
      tabs={TABS} active={tab} onChange={setTab}
      right={<Pill tone="orange">Trainer · Priya K.</Pill>}>
      {tab === 'scripts' && <Scripts />}
      {tab === 'objections' && <ObjectionMgmt />}
      {tab === 'nudges' && <Nudges />}
      {tab === 'usage' && <Usage />}
    </Layout>
  );
}

function Scripts() {
  const items = [
    { name: 'Family Floater · ₹10L', cat: 'Health · Family', uses: 1248, eff: 64, status: 'Live' },
    { name: 'Senior Care · Standalone', cat: 'Health · Senior', uses: 482, eff: 71, status: 'Live' },
    { name: 'Top-up + Super Top-up', cat: 'Health · Add-on', uses: 314, eff: 58, status: 'Live' },
    { name: 'Critical Illness Rider', cat: 'Health · Rider', uses: 226, eff: 62, status: 'Live' },
    { name: 'Maternity Cover', cat: 'Health · Specialty', uses: 198, eff: 68, status: 'Draft' },
    { name: 'OPD Plan', cat: 'Health · OPD', uses: 87, eff: 41, status: 'Review' },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <KPI label="Active scripts" value="6" sub="across health products" />
        <KPI label="Avg effectiveness" value="61%" delta="+4%" tone="up" sub="usage → conversion" />
        <KPI label="Pending review" value="2" sub="trainer approval needed" />
      </div>
      <Card title="Pitch script library" subtitle="Manage product scripts · push to all reps"
        right={<button className="px-3 py-1.5 bg-[#F37920] text-white text-xs font-bold rounded flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> New script</button>}>
        <table className="w-full text-sm">
          <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
            <tr><th className="text-left py-2">Script</th><th className="text-left py-2">Category</th><th className="text-right py-2">Uses (30d)</th><th className="text-right py-2">Effectiveness</th><th className="text-right py-2">Status</th><th className="text-right py-2">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map(i => (
              <tr key={i.name} className="hover:bg-slate-50">
                <td className="py-2.5 font-semibold text-slate-900">{i.name}</td>
                <td className="text-xs text-slate-600">{i.cat}</td>
                <td className="text-right text-slate-700">{i.uses.toLocaleString()}</td>
                <td className="text-right">
                  <span className={`font-semibold ${i.eff >= 60 ? 'text-emerald-700' : 'text-amber-700'}`}>{i.eff}%</span>
                </td>
                <td className="text-right">
                  <Pill tone={i.status==='Live'?'emerald':i.status==='Draft'?'slate':'amber'}>{i.status}</Pill>
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-1">
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Eye className="w-3.5 h-3.5 text-slate-600" /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Edit2 className="w-3.5 h-3.5 text-slate-600" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function ObjectionMgmt() {
  return (
    <div className="space-y-4">
      <Card title="Objection-response library" subtitle="Curate the objection library used by reps in field"
        right={<button className="px-3 py-1.5 bg-[#F37920] text-white text-xs font-bold rounded flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Add objection</button>}>
        <div className="space-y-2">
          {OBJECTIONS.slice(0, 8).map((o, i) => (
            <div key={i} className="p-3 border border-slate-200 rounded-lg flex items-start gap-3">
              <span className="w-7 h-7 rounded bg-orange-50 text-[#F37920] text-xs font-bold flex items-center justify-center shrink-0">{i+1}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900">{o.q}</div>
                <div className="text-xs text-slate-600 mt-1 line-clamp-2">{o.a}</div>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500">
                  <span>Used {Math.floor(50 + Math.random() * 200)}× last 30d</span>
                  <span>·</span>
                  <span>Resolution rate {Math.floor(40 + Math.random() * 35)}%</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-slate-100 rounded"><Edit2 className="w-3.5 h-3.5 text-slate-600" /></button>
                <Pill tone="emerald">Live</Pill>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Nudges() {
  const [text, setText] = useState('Today\'s focus: customers with renewal in next 14 days. Use the 2-year structure pitch for premium objection.');
  return (
    <div className="space-y-4">
      <Card title="Compose daily nudge" subtitle="Pushed to all active reps at 8:30 AM · view-tracked">
        <textarea value={text} onChange={e => setText(e.target.value)} rows={4}
          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm" />
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Audience</label>
            <select className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 text-sm">
              <option>All active reps (282)</option>
              <option>By region</option>
              <option>By performance band</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Schedule</label>
            <select className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 text-sm">
              <option>Tomorrow 8:30 AM</option><option>Now</option><option>Custom…</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full py-2 bg-[#F37920] text-white text-xs font-bold rounded flex items-center justify-center gap-1.5">
              <Send className="w-3.5 h-3.5" /> Send nudge
            </button>
          </div>
        </div>
      </Card>

      <Card title="Recent nudges" subtitle="View open & action rates">
        <table className="w-full text-sm">
          <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
            <tr><th className="text-left py-2">Date</th><th className="text-left py-2">Topic</th><th className="text-right py-2">Sent to</th><th className="text-right py-2">Open rate</th><th className="text-right py-2">Action rate</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              ['9 May', 'Renewal focus · 14-day window', 282, 91, 64],
              ['8 May', 'Premium objection coaching', 282, 88, 58],
              ['7 May', 'Cross-sell campaign launch', 282, 94, 71],
              ['6 May', 'Senior care · maternity bundle', 282, 86, 52],
            ].map((r, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="py-2.5 text-slate-600 text-xs">{r[0]}</td>
                <td className="font-semibold text-slate-900">{r[1]}</td>
                <td className="text-right text-slate-700">{r[2]}</td>
                <td className="text-right font-semibold text-emerald-700">{r[3]}%</td>
                <td className="text-right font-semibold text-[#F37920]">{r[4]}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Usage() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <KPI label="Content uses · 30d" value="3,124" delta="+18%" tone="up" />
        <KPI label="Active rep adoption" value="92%" delta="+5%" tone="up" sub="282 of 307 reps" />
        <KPI label="Avg pitch effectiveness" value="61%" delta="+4%" tone="up" />
        <KPI label="Best objection card" value="Premium" sub="68% resolution rate" />
      </div>
      <Card title="Content effectiveness scoreboard" subtitle="What's working · what needs revision">
        <div className="space-y-2">
          {[
            { c: 'Family Floater pitch', use: 1248, eff: 64, t: 'High use · keep' },
            { c: 'Premium objection card', use: 412, eff: 68, t: 'Star performer' },
            { c: 'Senior Care pitch', use: 482, eff: 71, t: 'Star performer' },
            { c: 'OPD Plan script', use: 87, eff: 41, t: 'Revise — low conversion' },
            { c: 'Pre-existing condition card', use: 156, eff: 48, t: 'Coach reps on usage' },
          ].map(r => (
            <div key={r.c} className="flex items-center gap-4 p-3 border border-slate-200 rounded-lg">
              <div className="flex-1 text-sm font-semibold text-slate-900">{r.c}</div>
              <div className="text-xs text-slate-600">{r.use} uses</div>
              <div className="w-32 bg-slate-100 rounded h-2 overflow-hidden">
                <div className={`h-full ${r.eff >= 60 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${r.eff}%` }} />
              </div>
              <div className={`text-xs font-bold w-10 text-right ${r.eff >= 60 ? 'text-emerald-700' : 'text-amber-700'}`}>{r.eff}%</div>
              <Pill tone={r.eff >= 60 ? 'emerald' : 'amber'}>{r.t}</Pill>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
