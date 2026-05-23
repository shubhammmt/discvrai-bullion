import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Shield, CheckCircle2, XCircle, AlertTriangle,
  Headphones, Monitor, Smartphone, Database, Cpu, Plug, FileText, Users,
  Calendar, Lock, Zap, Layers as LayersIcon
} from 'lucide-react';

const NAVY = '#0B2D4A';
const TEAL = '#0D9488';
const INK = '#0F172A';
const PAPER = '#F8FAFC';

const Shell: React.FC<React.PropsWithChildren<{ eyebrow: string; title: string; sub?: string; n: number; total: number }>> = ({ eyebrow, title, sub, n, total, children }) => (
  <div className="w-full h-full flex flex-col px-14 py-10" style={{ background: '#FFFFFF', color: INK }}>
    <div className="flex items-center justify-between text-[11px]">
      <div className="flex items-center gap-2 font-semibold tracking-[0.22em] uppercase" style={{ color: NAVY }}>
        <Shield className="w-4 h-4" /> AWNIC × DiscvrAI · Motor Growth · 12-Week Plan
      </div>
      <div className="text-slate-400 font-mono">{String(n).padStart(2,'0')} / {String(total).padStart(2,'0')}</div>
    </div>
    <div className="mt-6">
      <div className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: TEAL }}>{eyebrow}</div>
      <h1 className="text-[34px] font-light mt-1.5 text-slate-900 leading-tight">{title}</h1>
      {sub && <p className="text-slate-500 mt-1.5 max-w-4xl text-[14px]">{sub}</p>}
    </div>
    <div className="mt-6 flex-1 min-h-0">{children}</div>
    <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
      <span>Confidential · For AWNIC executive discussion only</span>
      <span>Discvr Growth Intelligence</span>
    </div>
  </div>
);

const Bullet: React.FC<React.PropsWithChildren<{ tone?: 'teal' | 'navy' | 'rose' | 'amber' }>> = ({ tone='teal', children }) => {
  const c = { teal: 'text-teal-600', navy: 'text-blue-800', rose: 'text-rose-600', amber: 'text-amber-600' }[tone];
  return <li className="flex gap-2.5 text-[14px] text-slate-700 leading-snug"><CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${c}`} /><span>{children}</span></li>;
};

const slides: React.FC<{ n: number; total: number }>[] = [
  // 1 — Why now
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Slide 1 · Why now"
      title="Grow the motor book you already have"
      sub="A 12-week decision layer over existing AWNIC data — not a new PAS, not an app rebuild.">
      <div className="grid grid-cols-5 gap-6 h-full">
        <div className="col-span-3 space-y-3">
          <ul className="space-y-2.5">
            <Bullet>AWNIC has a strong digital motor business, claims automation, loyalty — and a <strong>large in-force book</strong></Bullet>
            <Bullet>Today's gap: not <strong>who to save before renewal</strong>, and not <strong>who can safely get one more product</strong></Bullet>
            <Bullet><strong>12-week</strong> decision layer on existing data — <strong>not</strong> a new PAS or consumer app rebuild</Bullet>
            <Bullet>Focus: <strong>CLTV</strong> — renew more policies, add <strong>one</strong> adjacent product per eligible customer</Bullet>
          </ul>
          <div className="mt-4 rounded-lg border border-teal-200 bg-teal-50/60 p-3 text-[12px] text-teal-900">
            <strong className="uppercase tracking-wider text-[10px] text-teal-700">Narration</strong>
            <div className="mt-1">"We are not asking you to rip out core systems. We score and route decisions; your teams and channels execute. Motor is the wedge — Phase 2 can add more products and channels."</div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <div className="rounded-xl border-2 border-teal-500 bg-gradient-to-br from-teal-50 to-white p-4">
            <div className="text-[10px] uppercase tracking-widest font-bold text-teal-700">New thin layer</div>
            <div className="text-[15px] font-semibold text-slate-900 mt-1">CLTV intelligence</div>
            <div className="text-[11px] text-slate-600 mt-0.5">Churn risk · cross-sell eligibility · suppression</div>
          </div>
          <div className="flex justify-center"><div className="w-px h-4 bg-slate-300" /></div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: 'Dashboard', i: Monitor },
              { l: 'APIs', i: Plug },
              { l: 'CS feed', i: Headphones },
            ].map(x => (
              <div key={x.l} className="rounded-lg border border-slate-200 bg-white p-2.5 text-center">
                <x.i className="w-4 h-4 mx-auto text-slate-700" />
                <div className="text-[10px] mt-1 font-semibold text-slate-700">{x.l}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center"><div className="w-px h-4 bg-slate-300" /></div>
          <div className="rounded-xl border border-slate-300 bg-slate-50 p-3">
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Existing AWNIC stack</div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {['Policy', 'Claims', 'App / Web'].map(x => (
                <div key={x} className="rounded bg-white border border-slate-200 px-2 py-1.5 text-[11px] font-semibold text-slate-700 text-center">{x}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  ),

  // 2 — Two outcomes + trust rule
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Slide 2 · What we deliver"
      title="Two outcomes — measured on the same surfaces"
      sub="And one non-negotiable trust rule: open claim or complaint → no sales signal, ever.">
      <div className="h-full flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 flex-1">
          <div className="rounded-2xl border-2 border-blue-700 bg-gradient-to-b from-blue-50/60 to-white p-5 flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-blue-700 flex items-center justify-center text-white font-bold text-sm">1</div>
              <div className="text-xs uppercase tracking-widest font-semibold text-blue-800">Churn</div>
            </div>
            <div className="text-xl font-semibold mt-2 text-slate-900">Renewal priority + reminders</div>
            <div className="text-[12px] text-slate-600 mt-1">Ranked list by renewal date and risk band, with plain-language reason codes ("low app login", "payment delay").</div>
            <div className="mt-auto pt-4 flex gap-2">
              {[{l:'Dashboard',i:Monitor},{l:'CS lists',i:Headphones},{l:'App / web',i:Smartphone}].map(x => (
                <div key={x.l} className="flex-1 rounded-lg bg-white border border-slate-200 p-2 text-center">
                  <x.i className="w-4 h-4 mx-auto text-blue-700" />
                  <div className="text-[10px] mt-1 font-semibold text-slate-700">{x.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border-2 border-teal-600 bg-gradient-to-b from-teal-50/60 to-white p-5 flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-teal-600 flex items-center justify-center text-white font-bold text-sm">2</div>
              <div className="text-xs uppercase tracking-widest font-semibold text-teal-700">Cross-sell</div>
            </div>
            <div className="text-xl font-semibold mt-2 text-slate-900">One product · home / cyber / health</div>
            <div className="text-[12px] text-slate-600 mt-1">Max one tile with a short "why you see this"; deep-links to the <strong>existing</strong> AWNIC quote journey.</div>
            <div className="mt-auto pt-4 flex gap-2">
              {[{l:'Dashboard',i:Monitor},{l:'CS lists',i:Headphones},{l:'App / web',i:Smartphone}].map(x => (
                <div key={x.l} className="flex-1 rounded-lg bg-white border border-slate-200 p-2 text-center">
                  <x.i className="w-4 h-4 mx-auto text-teal-600" />
                  <div className="text-[10px] mt-1 font-semibold text-slate-700">{x.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-xl border-2 border-rose-300 bg-rose-50/60 p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-600 flex items-center justify-center shrink-0">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-widest font-bold text-rose-700">Trust rule · non-negotiable</div>
            <div className="text-[14px] text-slate-900 font-semibold mt-0.5">Open claim or complaint → no sales signal across any channel · audited end-to-end</div>
          </div>
          <div className="text-[11px] text-rose-700 font-mono">SUPPRESS = TRUE</div>
        </div>
      </div>
    </Shell>
  ),

  // 3 — Churn: CS + digital
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Slide 3 · Churn"
      title="Two paths to the renewal save — same engine"
      sub="CS-led from week 6. Digital-led after AWNIC integration. Neither blocks the other.">
      <div className="grid grid-cols-2 gap-5 h-full">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-md bg-blue-800 flex items-center justify-center"><Headphones className="w-4 h-4 text-white" /></div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-semibold text-blue-800">Khalid · CS-led</div>
              <div className="text-[15px] font-semibold text-slate-900">Daily feed → retention call before renewal</div>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 overflow-hidden text-[11px]">
            <div className="grid grid-cols-12 px-3 py-1.5 bg-slate-100 text-slate-500 font-semibold uppercase tracking-wider text-[9px]">
              <div className="col-span-2">Policy</div><div className="col-span-2">Owner</div><div className="col-span-2">Renews</div><div className="col-span-2">Risk</div><div className="col-span-2">Suppress</div><div className="col-span-2">Next action</div>
            </div>
            <div className="grid grid-cols-12 px-3 py-2 border-t border-slate-200 text-slate-700">
              <div className="col-span-2 font-mono">MOT-882341</div><div className="col-span-2">Khalid A.</div><div className="col-span-2">21 days</div>
              <div className="col-span-2"><span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-semibold">High</span></div>
              <div className="col-span-2"><span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-semibold">No</span></div>
              <div className="col-span-2 text-blue-800 font-semibold">Renewal call</div>
            </div>
            <div className="grid grid-cols-12 px-3 py-2 border-t border-slate-200 text-slate-700">
              <div className="col-span-2 font-mono">MOT-771208</div><div className="col-span-2">Khalid A.</div><div className="col-span-2">28 days</div>
              <div className="col-span-2"><span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">Med</span></div>
              <div className="col-span-2"><span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-semibold">No</span></div>
              <div className="col-span-2 text-blue-800 font-semibold">SMS + email</div>
            </div>
          </div>
          <ul className="mt-3 space-y-1.5 text-[12px] text-slate-700">
            <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mt-0.5" /> Daily API or CSV into AWNIC tools; agents use existing scripts</li>
            <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mt-0.5" /> Optional: screen-pop or queue tag in service desktop / CRM (W7–9)</li>
            <li className="flex gap-2"><Zap className="w-3.5 h-3.5 text-amber-600 mt-0.5" /> <strong>Value without any app change:</strong> CS runs saves from week 6+</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-md bg-teal-600 flex items-center justify-center"><Smartphone className="w-4 h-4 text-white" /></div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-semibold text-teal-700">Sara · digital-led</div>
              <div className="text-[15px] font-semibold text-slate-900">API trigger → AWNIC app shows renew CTA</div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[200px] rounded-[28px] border-[6px] border-slate-800 bg-white p-3 shadow-lg">
              <div className="h-3 w-12 mx-auto rounded-full bg-slate-800 mb-2" />
              <div className="rounded-xl bg-gradient-to-br from-teal-600 to-blue-800 p-3 text-white">
                <div className="text-[9px] uppercase tracking-widest opacity-80">AWNIC · Motor</div>
                <div className="text-[13px] font-semibold mt-1 leading-tight">Motor renews 12 Apr</div>
                <div className="text-[11px] opacity-90 mt-0.5">Renew in 2 minutes</div>
                <div className="mt-2 bg-white text-blue-800 rounded px-2 py-1 text-[11px] font-bold text-center">Renew now →</div>
              </div>
              <div className="mt-2 h-2 rounded bg-slate-100" />
              <div className="mt-1.5 h-2 rounded bg-slate-100 w-3/4" />
            </div>
          </div>
          <div className="rounded-lg bg-slate-900 text-slate-100 p-3 font-mono text-[10.5px] leading-relaxed">
            <div className="text-slate-400">GET /v1/decisions?customer_id=…</div>
            <div>{`{`}</div>
            <div className="pl-3">"show_renewal_reminder": <span className="text-emerald-400">true</span>,</div>
            <div className="pl-3">"renews_in_days": <span className="text-amber-300">21</span>,</div>
            <div className="pl-3">"suppress_sales": <span className="text-rose-400">false</span></div>
            <div>{`}`}</div>
          </div>
          <div className="mt-3 text-[11px] text-slate-600 grid grid-cols-2 gap-3">
            <div><strong className="text-slate-800">We provide:</strong> REST API + suppression flag</div>
            <div><strong className="text-slate-800">AWNIC IT does:</strong> Call on login, render UI, analytics</div>
          </div>
        </div>
      </div>
    </Shell>
  ),

  // 4 — Cross-sell
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Slide 4 · Cross-sell"
      title="Safe offer · with suppression by default"
      sub="One product, one short reason, the existing quote flow. Open-claim customers are silently excluded.">
      <div className="grid grid-cols-2 gap-5 h-full">
        <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-50/50 to-white p-5 flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-white" /></div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-semibold text-emerald-700">Fatima · eligible</div>
              <div className="text-[15px] font-semibold text-slate-900">One home card · clear reason</div>
            </div>
          </div>
          <div className="mt-4 flex-1 flex items-center justify-center">
            <div className="w-full max-w-xs rounded-xl border border-slate-200 bg-white shadow-md p-4">
              <div className="text-[9px] uppercase tracking-widest text-emerald-600 font-bold">Recommended for you</div>
              <div className="text-[15px] font-semibold text-slate-900 mt-1">AWNIC Home Insurance</div>
              <div className="text-[11px] text-slate-500 mt-1">You've been with us 3 years — here's a quote tailored to your address.</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-[10px] text-slate-400">From AED 480 / yr</div>
                <div className="bg-blue-800 text-white text-[11px] font-bold px-3 py-1.5 rounded">Get quote →</div>
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-slate-900 text-slate-100 p-2.5 font-mono text-[10px]">
            "show_cross_sell": <span className="text-emerald-400">true</span>, "product": <span className="text-amber-300">"home"</span>, "reason_code": <span className="text-amber-300">"loyalty_3y"</span>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-rose-400 bg-gradient-to-b from-rose-50/50 to-white p-5 flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center"><XCircle className="w-5 h-5 text-white" /></div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-semibold text-rose-700">Omar · open claim</div>
              <div className="text-[15px] font-semibold text-slate-900">API returns suppress · no tile shown</div>
            </div>
          </div>
          <div className="mt-4 flex-1 flex items-center justify-center">
            <div className="w-full max-w-xs rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <Lock className="w-8 h-8 mx-auto text-slate-400" />
              <div className="text-[12px] text-slate-500 mt-2 font-semibold">No commercial offer</div>
              <div className="text-[11px] text-slate-400 mt-1">Claim CLM-553902 open since 8 Mar — CS also sees "do not offer"</div>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-slate-900 text-slate-100 p-2.5 font-mono text-[10px]">
            "show_cross_sell": <span className="text-rose-400">false</span>, "suppress_reason": <span className="text-amber-300">"open_claim"</span>
          </div>
        </div>

        <div className="col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-3 grid grid-cols-4 gap-3 text-[11px]">
          <div><div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Eligibility</div><div className="text-slate-700 mt-0.5">In-force motor · product not held · no open claim/complaint · within contact rules</div></div>
          <div><div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">CS path</div><div className="text-slate-700 mt-0.5">Eligible list in same daily feed — mention home on outbound renewal calls (compliance script)</div></div>
          <div><div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Digital path</div><div className="text-slate-700 mt-0.5">Decision API → AWNIC renders one card · deep link to existing quote</div></div>
          <div><div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Audit</div><div className="text-slate-700 mt-0.5">Every allow/deny logged — compliance can sample "why Omar saw nothing"</div></div>
        </div>
      </div>
    </Shell>
  ),

  // 5 — Architecture
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Slide 5 · Architecture"
      title="We enable · AWNIC consumes"
      sub="Same signal, three consumption modes — human (CS), machine (API), ops (dashboard / export).">
      <div className="h-full grid grid-cols-3 gap-5">
        <div className="col-span-2 flex flex-col gap-3">
          <div className="rounded-xl border-2 border-slate-300 bg-slate-50 p-3">
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">AWNIC data</div>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {['Policy','Renewal','Claims','Complaints'].map(x => (
                <div key={x} className="rounded bg-white border border-slate-200 px-2 py-1.5 text-[11px] font-semibold text-slate-700 text-center flex items-center justify-center gap-1.5"><Database className="w-3 h-3 text-slate-400" />{x}</div>
              ))}
            </div>
          </div>
          <div className="flex justify-center"><div className="w-px h-3 bg-slate-300" /></div>
          <div className="rounded-xl border-2 p-4" style={{ borderColor: TEAL, background: 'linear-gradient(180deg, rgba(13,148,136,0.06), white)' }}>
            <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-teal-600" /><div className="text-[10px] uppercase tracking-widest font-bold text-teal-700">CLTV decision engine</div></div>
            <div className="text-[13px] text-slate-700 mt-1">Ingestion · rules + models v1 · suppression · audit</div>
          </div>
          <div className="flex justify-center"><div className="w-px h-3 bg-slate-300" /></div>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-lg border border-blue-300 bg-blue-50/60 p-3">
              <Monitor className="w-4 h-4 text-blue-800" />
              <div className="text-[12px] font-semibold text-slate-900 mt-1">CS dashboard</div>
              <div className="text-[10px] text-slate-600">+ daily feed</div>
            </div>
            <div className="rounded-lg border border-teal-300 bg-teal-50/60 p-3">
              <Plug className="w-4 h-4 text-teal-700" />
              <div className="text-[12px] font-semibold text-slate-900 mt-1">APIs / triggers</div>
              <div className="text-[10px] text-slate-600">REST · webhook</div>
            </div>
            <div className="rounded-lg border border-slate-300 bg-white p-3">
              <FileText className="w-4 h-4 text-slate-700" />
              <div className="text-[12px] font-semibold text-slate-900 mt-1">Audit &amp; logs</div>
              <div className="text-[10px] text-slate-600">Sample-by-decision</div>
            </div>
          </div>
          <div className="flex justify-center gap-12 text-[10px] text-slate-400">
            <span>↓ Customer service &amp; retention teams</span>
            <span>↓ AWNIC IT → App / Web</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-[10px] uppercase tracking-widest font-bold text-teal-700">We build</div>
            <ul className="mt-2 space-y-1.5 text-[12px] text-slate-700">
              <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mt-0.5" />Ingestion · rules + models v1</li>
              <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mt-0.5" />Dashboard + daily CS feed</li>
              <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mt-0.5" />Documented APIs / webhooks</li>
              <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mt-0.5" />Optional CS / CRM connector</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-[10px] uppercase tracking-widest font-bold text-blue-800">AWNIC builds / consumes</div>
            <ul className="mt-2 space-y-1.5 text-[12px] text-slate-700">
              <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-700 mt-0.5" />App / web UI binding</li>
              <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-700 mt-0.5" />CRM / service-hub hook</li>
              <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-700 mt-0.5" />Agent training on lists</li>
            </ul>
          </div>
          <div className="rounded-xl border-2 border-amber-300 bg-amber-50/60 p-3">
            <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-700" /><div className="text-[10px] uppercase tracking-widest font-bold text-amber-700">Risk</div></div>
            <div className="text-[11.5px] text-amber-900 mt-1">Weeks 7–9 need <strong>AWNIC IT + CS</strong> capacity — not only vendor build.</div>
          </div>
        </div>
      </div>
    </Shell>
  ),

  // 6 — Timeline
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Slide 6 · 12 weeks"
      title="Data first · then enable · then prove"
      sub="Day 0 = data access confirmed (not contract signature alone).">
      <div className="h-full flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-3">
          {[
            { wk: 'W1–3', title: 'Data & baselines', tone: 'border-blue-700 bg-blue-50/60 text-blue-900', items: ['Field mapping · ID match policy↔claims', 'Baseline renewal & cross-sell rates', 'Pick one cross-sell SKU', 'Legal on suppression'] },
            { wk: 'W4–6', title: 'Dashboard + CS feed live', tone: 'border-teal-600 bg-teal-50/60 text-teal-900', items: ['Retention trials dashboard', 'First daily priority lists to CS', 'Suppression tested on real claim cases'] },
            { wk: 'W7–9', title: 'APIs + AWNIC integration', tone: 'border-amber-500 bg-amber-50/60 text-amber-900', items: ['API spec handover', 'AWNIC IT sprint · optional CRM pop', 'UAT: Omar suppressed / Sara reminded'] },
            { wk: 'W10–12', title: 'Pilot + readout', tone: 'border-emerald-600 bg-emerald-50/60 text-emerald-900', items: ['10–15% pilot cohort', 'Renewal & cross-sell vs baseline', 'Executive readout'] },
          ].map((p, i) => (
            <div key={i} className={`rounded-xl border-2 p-3 flex flex-col ${p.tone}`}>
              <div className="text-[10px] uppercase tracking-widest font-bold opacity-80">{p.wk}</div>
              <div className="text-[14px] font-semibold mt-0.5 text-slate-900">{p.title}</div>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-700">
                {p.items.map((x, j) => <li key={j} className="flex gap-1.5"><span className="text-slate-400">·</span><span>{x}</span></li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex">
          <div className="flex-1 border-r border-white/60" style={{ background: '#1e3a8a' }} />
          <div className="flex-1 border-r border-white/60" style={{ background: TEAL }} />
          <div className="flex-1 border-r border-white/60" style={{ background: '#D97706' }} />
          <div className="flex-1" style={{ background: '#059669' }} />
          <div className="absolute inset-0 flex items-center justify-around text-[10px] text-white font-bold tracking-wider">
            <span>W1–3</span><span>W4–6</span><span>W7–9</span><span>W10–12</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-1">
          <div className="rounded-xl border-2 border-rose-300 bg-rose-50/60 p-3 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5" />
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-rose-700">Schedule risk</div>
              <div className="text-[12px] text-rose-900 mt-0.5"><strong>Late or messy data in W1–3 slides the whole bar.</strong> Most common overrun on programs like this.</div>
            </div>
          </div>
          <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-3 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-teal-700 mt-0.5" />
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-teal-700">Governance</div>
              <div className="text-[12px] text-teal-900 mt-0.5">2-weekly steering · <strong>Week 2 data-health gate</strong> before build spend accelerates.</div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  ),

  // 7 — What we need + deliverables
  ({ n, total }) => (
    <Shell n={n} total={total} eyebrow="Slide 7 · The ask"
      title="What we need from AWNIC · what you get in week 12"
      sub="Two short lists. Sign-off on the left unlocks the right.">
      <div className="grid grid-cols-2 gap-5 h-full">
        <div className="rounded-2xl border-2 border-blue-800 bg-gradient-to-b from-blue-50/50 to-white p-5 flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-blue-800 flex items-center justify-center"><Calendar className="w-4 h-4 text-white" /></div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-blue-800">Week 1 · gating</div>
              <div className="text-[15px] font-semibold text-slate-900">What we need from AWNIC</div>
            </div>
          </div>
          <ul className="mt-4 space-y-2.5 text-[13px] text-slate-700 flex-1">
            <li className="flex gap-2"><Database className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" /> Policy + renewal feeds · Claims + complaints (daily)</li>
            <li className="flex gap-2"><LayersIcon className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" /> One cross-sell product chosen (home / cyber / health)</li>
            <li className="flex gap-2"><Users className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" /> Sponsor + <strong>data owner</strong> named</li>
            <li className="flex gap-2"><Users className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" /> <strong>IT owner</strong> (APIs) · <strong>CS / retention owner</strong> (lists &amp; scripts)</li>
            <li className="flex gap-2"><Shield className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" /> Legal sign-off: no commercial offer during open claim</li>
            <li className="flex gap-2"><Smartphone className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" /> App <strong>or</strong> web identified for digital pilot</li>
          </ul>
        </div>

        <div className="rounded-2xl border-2 border-teal-600 bg-gradient-to-b from-teal-50/50 to-white p-5 flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-teal-600 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-white" /></div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-teal-700">Week 12 · deliverables</div>
              <div className="text-[15px] font-semibold text-slate-900">What you get</div>
            </div>
          </div>
          <ul className="mt-4 space-y-2.5 text-[13px] text-slate-700 flex-1">
            <li className="flex gap-2"><Monitor className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" /> Renewal dashboard + daily CS feed (in production)</li>
            <li className="flex gap-2"><Plug className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" /> Documented APIs / triggers + suppression audit</li>
            <li className="flex gap-2"><Smartphone className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" /> Digital signals live (after AWNIC integration)</li>
            <li className="flex gap-2"><FileText className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" /> Pilot readout: renewal &amp; cross-sell vs baseline</li>
            <li className="flex gap-2"><Shield className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" /> 30-day hypercare</li>
          </ul>
          <div className="mt-4 rounded-lg p-3 text-white flex items-center justify-between" style={{ background: NAVY }}>
            <div className="text-[12px]">Next step · 60-min discovery with motor + digital + data leads</div>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Shell>
  ),
];

export default function AWNICRenewalDeck() {
  const [i, setI] = useState(0);
  const total = slides.length;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') setI(p => Math.min(total - 1, p + 1));
      if (e.key === 'ArrowLeft') setI(p => Math.max(0, p - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);
  const Cur = slides[i];
  return (
    <div className="min-h-screen flex flex-col" style={{ background: PAPER }}>
      <div className="px-6 py-3 flex items-center justify-between bg-white border-b border-slate-200 print:hidden">
        <Link to="/awnic" className="text-xs flex items-center gap-1 text-slate-600 hover:text-slate-900"><ArrowLeft className="w-3.5 h-3.5" /> AWNIC Hub</Link>
        <div className="text-xs text-slate-500">Use ← → to navigate · {i + 1} / {total} · 7-slide renewal &amp; cross-sell deck</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setI(p => Math.max(0, p - 1))} className="px-3 py-1 rounded border border-slate-300 text-xs hover:bg-slate-50" disabled={i === 0}>Prev</button>
          <button onClick={() => setI(p => Math.min(total - 1, p + 1))} className="px-3 py-1 rounded text-white text-xs" style={{ background: NAVY }} disabled={i === total - 1}>Next</button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[1280px] aspect-[16/9] shadow-2xl rounded-xl overflow-hidden border border-slate-200 bg-white">
          <Cur n={i + 1} total={total} />
        </div>
      </div>
    </div>
  );
}
