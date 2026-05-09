import React, { useState } from 'react';
import { Layout, Card, Pill, Tab } from './ui';
import { OBJECTIONS } from './data';
import { Sparkles, FileText, ShieldQuestion, MessageSquare, NotebookPen, CheckCircle2, Save } from 'lucide-react';

const TABS: Tab[] = [
  { id: 'pitch', label: 'Pitch', icon: FileText },
  { id: 'objections', label: 'Objections', icon: ShieldQuestion },
  { id: 'followup', label: 'Follow-up', icon: MessageSquare },
  { id: 'notes', label: 'Notes', icon: NotebookPen },
];

export default function ICICIPitchAssistant() {
  const [tab, setTab] = useState('pitch');
  const [form, setForm] = useState({ age: 38, marital: 'Married', deps: 2, income: '15-20L', city: 'Mumbai', existing: '3L corporate', concern: 'Maternity + parents' });
  const [generated, setGenerated] = useState(true);

  const update = (k: string, v: any) => setForm({ ...form, [k]: v });

  return (
    <Layout title="Health Pitch Assistant" subtitle="Module 02 · Personalized pitch generator"
      tabs={TABS} active={tab} onChange={setTab}
      right={<Pill tone="orange">Customer session: Rajesh Mehta</Pill>}>

      <div className="grid grid-cols-12 gap-4">
        {/* Left: Input form */}
        <div className="col-span-12 lg:col-span-4">
          <Card title="Customer details" subtitle="Pitch personalizes from these inputs">
            <div className="space-y-3">
              <Field label="Age"><input type="number" value={form.age} onChange={e=>update('age',+e.target.value)} className="input" /></Field>
              <Field label="Marital status">
                <select value={form.marital} onChange={e=>update('marital',e.target.value)} className="input">
                  {['Single','Married','Married + kids','Senior'].map(x=><option key={x}>{x}</option>)}
                </select>
              </Field>
              <Field label="Dependents"><input type="number" value={form.deps} onChange={e=>update('deps',+e.target.value)} className="input" /></Field>
              <Field label="Income band">
                <select value={form.income} onChange={e=>update('income',e.target.value)} className="input">
                  {['<5L','5-10L','10-15L','15-20L','20L+'].map(x=><option key={x}>{x}</option>)}
                </select>
              </Field>
              <Field label="City"><input value={form.city} onChange={e=>update('city',e.target.value)} className="input" /></Field>
              <Field label="Existing cover"><input value={form.existing} onChange={e=>update('existing',e.target.value)} className="input" /></Field>
              <Field label="Risk concern"><input value={form.concern} onChange={e=>update('concern',e.target.value)} className="input" /></Field>
              <button onClick={()=>setGenerated(true)} className="w-full mt-2 py-2 bg-[#F37920] text-white text-sm font-bold rounded-md hover:bg-orange-600 flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Generate pitch
              </button>
              <div className="mt-2 text-[10px] text-slate-500 flex items-start gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 mt-0.5 shrink-0" />
                Suitability check enforced before final recommendation. Output is assistive — not final advice.
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Output */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {tab === 'pitch' && generated && <PitchPanel form={form} />}
          {tab === 'objections' && <LikelyObjections />}
          {tab === 'followup' && <FollowUpPanel />}
          {tab === 'notes' && <NotesPanel />}
        </div>
      </div>

      <style>{`.input{width:100%;border:1px solid rgb(203 213 225);border-radius:6px;padding:6px 10px;font-size:13px;background:white}`}</style>
    </Layout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function PitchPanel({ form }: { form: any }) {
  return (
    <>
      <Card title="Recommended plan" subtitle="Auto-generated from customer profile" right={<Pill tone="emerald">High suitability fit</Pill>}>
        <div className="grid grid-cols-3 gap-3">
          {[
            ['Plan category', 'Family Floater'],
            ['Coverage', '₹10 Lakhs'],
            ['Premium band', '₹22,000 – ₹26,000 / yr'],
            ['Recommended riders', 'Maternity · Critical Illness'],
            ['Network', '6,500+ cashless hospitals'],
            ['Confidence', '88%'],
          ].map(([k, v]) => (
            <div key={k} className="p-3 rounded-lg bg-orange-50 border border-orange-100">
              <div className="text-[10px] uppercase tracking-wider text-[#F37920] font-semibold">{k}</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{v}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="2-minute personalized pitch" subtitle="Use as opener · hands-free during call" right={<Pill tone="orange">English</Pill>}>
        <div className="prose prose-sm max-w-none text-sm text-slate-800 leading-relaxed bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p>
            <strong>Hi Rajesh,</strong> based on your profile — {form.marital.toLowerCase()}, {form.deps} dependents, income band {form.income}, based in {form.city} — I see your current corporate cover of {form.existing} won't be enough if anyone in your family needs hospitalization for maternity, surgery, or critical illness.
          </p>
          <p>
            For families like yours, we recommend our <strong>Family Floater ₹10 Lakh plan with maternity rider</strong>. This means a single ₹22,000–26,000 annual premium covers you, your spouse, and both kids — across 6,500+ cashless hospitals in India.
          </p>
          <p>
            <strong>Three reasons it fits you:</strong>
          </p>
          <ul>
            <li>You mentioned <em>{form.concern}</em> — this plan covers maternity from day one with a 9-month wait</li>
            <li>Locks in your age-{form.age} premium — buying after 40 costs 60–80% more for the same cover</li>
            <li>Tax saving up to ₹25,000 under Section 80D</li>
          </ul>
          <p>
            <strong>Shall I share a detailed quote and 2 cashless hospitals near your home in {form.city}?</strong>
          </p>
        </div>
        <div className="mt-3 flex gap-2 justify-end">
          <button className="px-3 py-1.5 text-xs border border-slate-300 rounded text-slate-700 hover:bg-slate-50">Translate to Hinglish</button>
          <button className="px-3 py-1.5 text-xs border border-slate-300 rounded text-slate-700 hover:bg-slate-50 flex items-center gap-1"><Save className="w-3 h-3" /> Save session</button>
          <button className="px-3 py-1.5 text-xs bg-[#F37920] text-white rounded font-semibold">Send to customer</button>
        </div>
      </Card>
    </>
  );
}

function LikelyObjections() {
  const top = OBJECTIONS.slice(0, 6);
  return (
    <Card title="Likely objections for this profile" subtitle="Ranked by frequency for similar customers">
      <div className="space-y-2">
        {top.map((o, i) => (
          <div key={i} className="border border-slate-200 rounded-lg p-3 bg-white">
            <div className="flex items-start gap-2">
              <span className="w-6 h-6 rounded bg-orange-50 text-[#F37920] text-xs font-bold flex items-center justify-center shrink-0">{i+1}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900">{o.q}</div>
                <div className="text-xs text-slate-700 mt-1.5 leading-relaxed">{o.a}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function FollowUpPanel() {
  return (
    <Card title="Follow-up suggestions" subtitle="Auto-sequenced based on pitch outcome">
      <div className="space-y-2">
        {[
          { d: 'Day 0 (today)', t: 'Send pitch + plan brochure on WhatsApp', who: 'Rep' },
          { d: 'Day 2', t: 'Voice call to confirm receipt + answer questions', who: 'Rep' },
          { d: 'Day 4', t: 'Share 2 cashless hospitals near customer home', who: 'Auto' },
          { d: 'Day 7', t: 'Send testimonial from similar profile customer', who: 'Auto' },
          { d: 'Day 10', t: 'Personal nudge — quote validity expiring', who: 'Rep' },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white">
            <div className="w-16 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{s.d}</div>
            <div className="flex-1 text-sm text-slate-800">{s.t}</div>
            <Pill tone={s.who === 'Auto' ? 'blue' : 'orange'}>{s.who}</Pill>
          </div>
        ))}
      </div>
    </Card>
  );
}

function NotesPanel() {
  return (
    <Card title="Session notes" subtitle="Saved with customer profile · audit-logged">
      <textarea rows={10} placeholder="Customer key context, family situation, decision triggers, sensitivities…"
        defaultValue="• Concerned about maternity coverage — wife planning second child late 2026.&#10;• Comfortable with ₹25K annual premium ceiling.&#10;• Wife works, will be co-decision maker. Suggest joint call.&#10;• Wants Apollo Mumbai in cashless network — confirmed available.&#10;• Decision expected by Friday after spouse review."
        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm" />
      <div className="mt-2 flex justify-end">
        <button className="px-4 py-2 bg-[#F37920] text-white text-xs font-bold rounded-md flex items-center gap-1.5">
          <Save className="w-3.5 h-3.5" /> Save session
        </button>
      </div>
    </Card>
  );
}
