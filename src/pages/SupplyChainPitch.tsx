import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight,
  AlertTriangle, TrendingUp, Workflow, Layers, Bot,
  GitBranch, Target, CheckCircle2, Clock, ShieldCheck, Handshake,
  BarChart3, Boxes, Truck, Calendar
} from 'lucide-react';

/* =========================================================================
   Supply Chain Decision Studio — 6-slide pitch (Clean Light Editorial)
   Route: /supply-chain-pitch
   ========================================================================= */

const ACCENT = '#0F4C81';      // deep editorial blue
const ACCENT_SOFT = '#E8F0F9';
const INK = '#0B1220';
const MUTE = '#64748B';
const RULE = '#E5E7EB';
const WARN = '#B45309';
const GOOD = '#0F766E';

interface SlideShellProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  n: number;
  total: number;
  children: React.ReactNode;
}

const SlideShell: React.FC<SlideShellProps> = ({ eyebrow, title, subtitle, n, total, children }) => (
  <div className="w-full h-screen bg-white flex flex-col" style={{ color: INK }}>
    {/* Top rule */}
    <div className="h-[6px] w-full" style={{ background: ACCENT }} />
    {/* Header band */}
    <div className="px-12 pt-6 pb-4 flex items-center justify-between border-b" style={{ borderColor: RULE }}>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: ACCENT }}>
          <Bot className="w-4 h-4 text-white" />
        </div>
        <span className="text-[13px] font-semibold tracking-wide" style={{ color: INK }}>
          Supply Chain Decision Studio
        </span>
        <span className="text-[12px]" style={{ color: MUTE }}>· Pitch Deck</span>
      </div>
      <div className="text-[11px] font-mono" style={{ color: MUTE }}>
        {String(n).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </div>

    {/* Title block */}
    <div className="px-12 pt-8 pb-4">
      <div className="text-[12px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: ACCENT }}>
        {eyebrow}
      </div>
      <h1 className="text-[40px] leading-[1.1] font-light tracking-tight" style={{ color: INK }}>
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-[16px] max-w-4xl" style={{ color: MUTE }}>
          {subtitle}
        </p>
      )}
    </div>

    {/* Body */}
    <div className="flex-1 px-12 pb-10 overflow-hidden">
      {children}
    </div>

    {/* Footer */}
    <div className="px-12 py-3 flex items-center justify-between border-t text-[11px]" style={{ borderColor: RULE, color: MUTE }}>
      <span>© DiscvrAI · Confidential pitch material</span>
      <span>Press ← → to navigate · P for present mode</span>
    </div>
  </div>
);

/* ------------------------------- SLIDE 1 ------------------------------- */
const Slide1: React.FC = () => (
  <SlideShell
    eyebrow="01 · Why change now"
    title="Decisions are needed faster than the next reporting refresh."
    subtitle="Demand and promo volatility are outpacing weekly planning cycles — and the cost shows up in service, margin and morale at the same time."
    n={1}
    total={6}
  >
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* Left: 5 urgency points */}
      <div className="col-span-7 flex flex-col gap-3">
        {[
          { i: TrendingUp, t: 'Volatility outpaces planning cadence', d: 'Promo lift, micro-events and supplier slips break weekly plans within days.' },
          { i: AlertTriangle, t: 'Stockouts + expiry hit at the same time', d: 'Revenue, brand and margin take simultaneous hits — usually on hero SKUs.' },
          { i: Boxes, t: '“Full” warehouses still throttle on peaks', d: 'Occupancy looks healthy; pick path, golden zone and dock flow break under load.' },
          { i: Workflow, t: 'Teams reconcile, not decide', d: 'Disproportionate hours spent stitching spreadsheets, chats and static reports.' },
          { i: Bot, t: 'Copilot-ready message', d: '“We need decisions faster than our reporting refresh.”' },
        ].map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i }}
            className="flex gap-3 p-3.5 rounded-lg border bg-white"
            style={{ borderColor: RULE }}
          >
            <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0" style={{ background: ACCENT_SOFT, color: ACCENT }}>
              <row.i className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[14px] font-semibold">{row.t}</div>
              <div className="text-[12.5px]" style={{ color: MUTE }}>{row.d}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right: visual — volatility vs effort vs margin */}
      <div className="col-span-5 flex flex-col gap-4">
        <div className="rounded-xl border p-5" style={{ borderColor: RULE, background: '#FAFBFD' }}>
          <div className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: MUTE }}>
            What is rising
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Demand volatility', val: '↑', sub: 'promo + micro-events' },
              { label: 'Manual effort', val: '↑', sub: 'reconciliation hours' },
              { label: 'Service risk', val: '↓', sub: 'fill rate fragility' },
              { label: 'Margin headroom', val: '↓', sub: 'expiry + overtime' },
            ].map((k, i) => (
              <div key={i} className="rounded-lg bg-white border p-3" style={{ borderColor: RULE }}>
                <div className="text-[11px]" style={{ color: MUTE }}>{k.label}</div>
                <div className="text-[28px] font-light leading-none mt-1" style={{ color: ACCENT }}>{k.val}</div>
                <div className="text-[11px] mt-1" style={{ color: MUTE }}>{k.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sparkline-style illustrative chart */}
        <div className="rounded-xl border p-5 flex-1" style={{ borderColor: RULE }}>
          <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>
            Stockout incidents — promo vs normal weeks (illustrative)
          </div>
          <svg viewBox="0 0 320 120" className="w-full h-32">
            <line x1="0" y1="100" x2="320" y2="100" stroke={RULE} />
            {[20, 60, 100, 140, 180, 220, 260, 300].map((x, i) => (
              <g key={i}>
                <line x1={x} y1="100" x2={x} y2="103" stroke={MUTE} />
                <text x={x} y="115" fontSize="8" fill={MUTE} textAnchor="middle">W{i + 1}</text>
              </g>
            ))}
            <polyline
              points="20,80 60,72 100,75 140,40 180,30 220,55 260,48 300,28"
              fill="none" stroke={ACCENT} strokeWidth="2.5"
            />
            {[[20,80],[60,72],[100,75],[140,40],[180,30],[220,55],[260,48],[300,28]].map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={ACCENT} />
            ))}
            <rect x="130" y="10" width="80" height="90" fill={ACCENT} opacity="0.06" />
            <text x="170" y="22" fontSize="9" fill={ACCENT} textAnchor="middle" fontWeight="600">PROMO WINDOW</text>
          </svg>
          <div className="text-[11px] mt-1" style={{ color: MUTE }}>
            Spikes cluster in promo windows — reporting only catches them after the fact.
          </div>
        </div>
      </div>
    </div>

    <div className="mt-4 text-[12px] px-3 py-2 rounded-md inline-flex items-center gap-2" style={{ background: ACCENT_SOFT, color: ACCENT }}>
      <Bot className="w-3.5 h-3.5" /> Supply Chain Copilot turns signals into next-best actions — with explainability and approvals.
    </div>
  </SlideShell>
);

/* ------------------------------- SLIDE 2 ------------------------------- */
const Slide2: React.FC = () => (
  <SlideShell
    eyebrow="02 · Current-state gaps"
    title="The systems record truth — they don’t prescribe action."
    subtitle="A typical best-of-breed stack runs well in isolation; the breaks happen between handoffs."
    n={2}
    total={6}
  >
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* Swimlane */}
      <div className="col-span-12 rounded-xl border p-5" style={{ borderColor: RULE }}>
        <div className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: MUTE }}>
          Decision flow today — where the loop breaks
        </div>
        <div className="flex items-stretch gap-2 overflow-hidden">
          {[
            { t: 'Demand signal', d: 'history, promos, events' },
            { t: 'Planner', d: 'spreadsheet + APS' },
            { t: 'ERP order', d: 'transactional record' },
            { t: 'DC inbound', d: 'WMS receiving' },
            { t: 'WMS tasks', d: 'pick / put / dock' },
            { t: 'Store / Customer', d: 'service outcome' },
          ].map((s, i, arr) => (
            <React.Fragment key={i}>
              <div className="flex-1 rounded-lg border p-3 bg-white" style={{ borderColor: RULE }}>
                <div className="text-[12.5px] font-semibold">{s.t}</div>
                <div className="text-[11px]" style={{ color: MUTE }}>{s.d}</div>
              </div>
              {i < arr.length - 1 && (
                <div className="flex flex-col items-center justify-center px-1">
                  <ChevronRight className="w-4 h-4" style={{ color: MUTE }} />
                  {[1, 2, 4].includes(i) && (
                    <span className="mt-1 text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: '#FEF3C7', color: WARN }}>
                      latency
                    </span>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 5 gap cards */}
      <div className="col-span-12 grid grid-cols-5 gap-3">
        {[
          { t: 'Fragmented signals', d: 'History, promos, local events and execution feedback live in different tools.' },
          { t: 'Static replenishment', d: 'Min-max and safety stock rarely move with reality; exceptions discovered late.' },
          { t: 'Occupancy ≠ throughput', d: 'Slotting, golden zone and dock sequencing under-optimised in real time.' },
          { t: 'Local optima', d: 'Planning and warehouse optimise independently; cross-constraints surface late.' },
          { t: 'Weak auditability', d: 'Decisions live in chat & email — hard to prove “what we knew when”.' },
        ].map((g, i) => (
          <div key={i} className="rounded-lg border p-4 bg-white" style={{ borderColor: RULE }}>
            <div className="w-7 h-7 rounded-md flex items-center justify-center mb-2" style={{ background: '#FEF2F2', color: '#B91C1C' }}>
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="text-[13px] font-semibold mb-1">{g.t}</div>
            <div className="text-[11.5px]" style={{ color: MUTE }}>{g.d}</div>
          </div>
        ))}
      </div>

      <div className="col-span-12 mt-1 text-[12px] px-3 py-2 rounded-md inline-flex items-center gap-2" style={{ background: ACCENT_SOFT, color: ACCENT }}>
        <Bot className="w-3.5 h-3.5" /> Copilot doesn’t replace the stack — it reads across it and narrates the exception chain in one place.
      </div>
    </div>
  </SlideShell>
);

/* ------------------------------- SLIDE 3 ------------------------------- */
const Slide3: React.FC = () => (
  <SlideShell
    eyebrow="03 · Our approach"
    title="Decision Studio + Copilot — the missing operating system for daily ops."
    subtitle="A decision layer on top of ERP / WMS / TMS. Read-first in pilot. Controlled write-back later."
    n={3}
    total={6}
  >
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* Architecture diagram */}
      <div className="col-span-7 rounded-xl border p-5 flex flex-col" style={{ borderColor: RULE, background: '#FAFBFD' }}>
        <div className="text-[11px] font-semibold uppercase tracking-wider mb-4" style={{ color: MUTE }}>
          Architecture
        </div>

        {/* Roles top */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {['Planner', 'Warehouse Manager', 'Leadership'].map((r) => (
            <div key={r} className="rounded-lg p-2 text-center text-[12px] font-semibold" style={{ background: '#FFF', border: `1px solid ${RULE}` }}>
              {r}
            </div>
          ))}
        </div>
        <div className="flex justify-center mb-2"><ChevronRight className="rotate-90 w-4 h-4" style={{ color: MUTE }} /></div>

        {/* Studio */}
        <div className="rounded-xl p-4 mb-3" style={{ background: ACCENT, color: '#FFF' }}>
          <div className="text-[11px] uppercase tracking-wider opacity-80 mb-2">Decision Studio</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md p-3" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <div className="flex items-center gap-2 mb-1"><Target className="w-4 h-4" /><span className="text-[13px] font-semibold">Planning Intelligence</span></div>
              <div className="text-[11px] opacity-90">Exception queue · scenarios · warehouse-aware replenishment</div>
            </div>
            <div className="rounded-md p-3" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <div className="flex items-center gap-2 mb-1"><Boxes className="w-4 h-4" /><span className="text-[13px] font-semibold">Warehouse Productivity</span></div>
              <div className="text-[11px] opacity-90">Slotting · dock flow · labor pressure · golden-zone moves</div>
            </div>
          </div>
          <div className="mt-3 text-[11px] flex items-center gap-2 opacity-90">
            <Bot className="w-3.5 h-3.5" /> Supply Chain Copilot — context-aware Q&amp;A, “why this action”, weekly briefs
          </div>
        </div>

        <div className="flex justify-center mb-2"><ChevronRight className="rotate-90 w-4 h-4" style={{ color: MUTE }} /></div>

        {/* Sources */}
        <div className="grid grid-cols-4 gap-2">
          {['ERP', 'WMS', 'TMS', 'Planning / APS'].map((s) => (
            <div key={s} className="rounded-md p-2 text-center text-[12px]" style={{ background: '#FFF', border: `1px solid ${RULE}`, color: INK }}>
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Loop + principles */}
      <div className="col-span-5 flex flex-col gap-3">
        <div className="rounded-xl border p-4" style={{ borderColor: RULE }}>
          <div className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: MUTE }}>The closed loop</div>
          <div className="flex items-center justify-between text-[12px]">
            {['Recommend', 'Approve / override', 'Execute', 'Measure', 'Improve rank'].map((s, i, a) => (
              <React.Fragment key={s}>
                <div className="px-2 py-1 rounded-md font-semibold" style={{ background: ACCENT_SOFT, color: ACCENT }}>{s}</div>
                {i < a.length - 1 && <ChevronRight className="w-3.5 h-3.5" style={{ color: MUTE }} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {[
          { i: GitBranch, t: 'Exception-first queues', d: 'Ranked by service, wastage, cash and labor impact — not by alphabetical SKU.' },
          { i: Bot, t: 'Copilot as narrative glue', d: 'Explains every action in plain language — same story for planner and CXO.' },
          { i: ShieldCheck, t: 'Co-built with your team', d: 'Workflows shaped with planners and supervisors in week 1–2; nothing thrown over the wall.' },
        ].map((row, i) => (
          <div key={i} className="rounded-xl border p-4 flex gap-3" style={{ borderColor: RULE }}>
            <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0" style={{ background: ACCENT_SOFT, color: ACCENT }}>
              <row.i className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[13px] font-semibold">{row.t}</div>
              <div className="text-[12px]" style={{ color: MUTE }}>{row.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>
);

/* ------------------------------- SLIDE 4 ------------------------------- */
const Slide4: React.FC = () => {
  const rows = [
    { stack: 'ERP / inventory master', strength: 'Records transactions accurately', gap: 'Weak at forward-looking prioritisation', add: 'Impact-ranked exception queue + scenarios' },
    { stack: 'Planning / APS / forecasting', strength: 'Periodic statistical forecasts', gap: 'Limited execution feedback loop', add: 'Near-real-time sensing + warehouse-aware replenishment' },
    { stack: 'WMS', strength: 'Strong execution capture', gap: 'No proactive “what next” for slotting / dock / labor under volatility', add: 'Warehouse Productivity Control Tower with copilot' },
    { stack: 'BI / reports', strength: 'Retrospective visibility', gap: 'Doesn’t own decisions or follow-through', add: 'Closed-loop actions with owner, SLA and outcome' },
    { stack: 'Chat / email', strength: 'Flexible, fast', gap: 'Not auditable, not measurable', add: 'Auditable workflow with override reason taxonomy' },
  ];
  return (
    <SlideShell
      eyebrow="04 · Delta vs your existing stack"
      title="System of record stays. We add the system of decision."
      subtitle="No rip-and-replace. Shadow mode first to build trust before any automation."
      n={4}
      total={6}
    >
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: RULE }}>
        <div className="grid grid-cols-12 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ background: ACCENT, color: '#FFF' }}>
          <div className="col-span-3">Existing stack</div>
          <div className="col-span-3">Strength</div>
          <div className="col-span-3">Gap in daily ops</div>
          <div className="col-span-3">What we add</div>
        </div>
        {rows.map((r, i) => (
          <div
            key={i}
            className="grid grid-cols-12 px-4 py-3 text-[12.5px] border-t"
            style={{ borderColor: RULE, background: i % 2 ? '#FAFBFD' : '#FFF' }}
          >
            <div className="col-span-3 font-semibold" style={{ color: INK }}>{r.stack}</div>
            <div className="col-span-3" style={{ color: MUTE }}>{r.strength}</div>
            <div className="col-span-3" style={{ color: '#B91C1C' }}>{r.gap}</div>
            <div className="col-span-3 font-medium" style={{ color: ACCENT }}>{r.add}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="rounded-xl border p-4" style={{ borderColor: RULE }}>
          <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>Posture</div>
          <div className="text-[13px]">
            <span className="font-semibold" style={{ color: ACCENT }}>Shadow → assist → automate.</span>{' '}
            <span style={{ color: MUTE }}>
              We start by mirroring your decisions, then offering ranked recommendations, and only later automating well-understood loops.
            </span>
          </div>
        </div>
        <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: ACCENT_SOFT }}>
          <Bot className="w-5 h-5" style={{ color: ACCENT }} />
          <div className="text-[13px]" style={{ color: ACCENT }}>
            Copilot explains the delta in plain language: <span className="opacity-80">“Here’s what the WMS already proved, and here’s the decision still pending.”</span>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

/* ------------------------------- SLIDE 5 ------------------------------- */
const Slide5: React.FC = () => {
  const phases = [
    { w: 'Wk 1–2', t: 'Discovery', d: 'Data health, KPI baseline, persona shadow' },
    { w: 'Wk 3–5', t: 'Planning shadow', d: 'Mirror decisions, calibrate signals' },
    { w: 'Wk 6–8', t: 'Warehouse shadow', d: 'Slotting + dock signals live' },
    { w: 'Wk 9–11', t: 'Limited live decisions', d: 'Approve-then-execute, audited' },
    { w: 'Wk 12', t: 'Review & expand', d: 'Joint readout · scale plan' },
  ];
  return (
    <SlideShell
      eyebrow="05 · Pilot blueprint"
      title="12 weeks. One node. Measurable KPI movement — not a model accuracy chart."
      subtitle="Scope: one region or DC + defined SKU families (hero SKUs + high-expiry risk)."
      n={5}
      total={6}
    >
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Timeline */}
        <div className="col-span-12 rounded-xl border p-5" style={{ borderColor: RULE }}>
          <div className="text-[11px] font-semibold uppercase tracking-wider mb-4" style={{ color: MUTE }}>12-week timeline · go/no-go gates between phases</div>
          <div className="grid grid-cols-5 gap-3">
            {phases.map((p, i) => (
              <div key={i} className="relative">
                <div className="rounded-lg border p-3 bg-white" style={{ borderColor: RULE }}>
                  <div className="text-[10px] font-mono mb-1" style={{ color: ACCENT }}>{p.w}</div>
                  <div className="text-[13px] font-semibold">{p.t}</div>
                  <div className="text-[11px]" style={{ color: MUTE }}>{p.d}</div>
                </div>
                {i < phases.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 rounded-full items-center justify-center" style={{ background: ACCENT, color: '#fff' }}>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* KPI grid */}
        <div className="col-span-7 rounded-xl border p-5" style={{ borderColor: RULE }}>
          <div className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: MUTE }}>KPIs we will move</div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { i: BarChart3, t: 'Fill rate', d: 'top-N SKU stockouts' },
              { i: Boxes, t: 'Inventory days', d: 'cash + working capital' },
              { i: Calendar, t: 'Expiry loss', d: '₹ at risk avoided' },
              { i: Truck, t: 'Dock-to-stock', d: 'inbound velocity' },
              { i: Workflow, t: 'Picks / labor hour', d: 'productivity index' },
              { i: Clock, t: 'Exception SLA', d: 'time to resolve' },
            ].map((k, i) => (
              <div key={i} className="rounded-lg border p-3 bg-white" style={{ borderColor: RULE }}>
                <div className="w-8 h-8 rounded-md flex items-center justify-center mb-2" style={{ background: ACCENT_SOFT, color: ACCENT }}>
                  <k.i className="w-4 h-4" />
                </div>
                <div className="text-[12.5px] font-semibold">{k.t}</div>
                <div className="text-[11px]" style={{ color: MUTE }}>{k.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Governance + risk */}
        <div className="col-span-5 flex flex-col gap-3">
          <div className="rounded-xl border p-4" style={{ borderColor: RULE }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>Governance</div>
            <ul className="text-[12.5px] space-y-1.5">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" style={{ color: GOOD }} /> Weekly ops war room + monthly steering</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" style={{ color: GOOD }} /> Joint success criteria; finance signs the baseline</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" style={{ color: GOOD }} /> Adoption tracked alongside KPI movement</li>
            </ul>
          </div>
          <div className="rounded-xl border p-4" style={{ borderColor: RULE }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>Risk control</div>
            <ul className="text-[12.5px] space-y-1.5">
              <li className="flex gap-2"><ShieldCheck className="w-4 h-4 mt-0.5" style={{ color: ACCENT }} /> Data health scorecard; confidence labels on every recommendation</li>
              <li className="flex gap-2"><ShieldCheck className="w-4 h-4 mt-0.5" style={{ color: ACCENT }} /> Human-in-the-loop approvals · override reason taxonomy</li>
              <li className="flex gap-2"><ShieldCheck className="w-4 h-4 mt-0.5" style={{ color: ACCENT }} /> Shadow mode default; live writes only after gate</li>
            </ul>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

/* ------------------------------- SLIDE 6 ------------------------------- */
const Slide6: React.FC = () => (
  <SlideShell
    eyebrow="06 · Commercials & decision ask"
    title="Low risk. Isolated value. Measurable in one node first."
    subtitle="Pilot fee → platform subscription → scale by nodes / SKU-locations."
    n={6}
    total={6}
  >
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* 3-box commercial */}
      <div className="col-span-7 grid grid-cols-3 gap-3">
        {[
          { tag: '01 · Pilot', t: 'Setup + integration + workflow', d: 'Fixed-fee 12-week engagement on one node and SKU scope.' },
          { tag: '02 · Subscribe', t: 'Platform subscription', d: 'Per-node / per-user pricing; copilot included; quarterly value review.' },
          { tag: '03 · Scale', t: 'By nodes / SKU-locations', d: 'Add DCs, regions and SKU families with predictable unit economics.' },
        ].map((b, i) => (
          <div key={i} className="rounded-xl border p-4 flex flex-col" style={{ borderColor: RULE, background: i === 0 ? '#FFF' : i === 1 ? '#FAFBFD' : '#FFF' }}>
            <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: ACCENT }}>{b.tag}</div>
            <div className="text-[14px] font-semibold mb-1">{b.t}</div>
            <div className="text-[12px]" style={{ color: MUTE }}>{b.d}</div>
          </div>
        ))}

        {/* Co-build + security row */}
        <div className="col-span-3 rounded-xl border p-4 flex flex-col md:flex-row gap-4" style={{ borderColor: RULE }}>
          <div className="flex-1 flex items-start gap-3">
            <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: ACCENT_SOFT, color: ACCENT }}>
              <Handshake className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[13px] font-semibold">Co-build model</div>
              <div className="text-[12px]" style={{ color: MUTE }}>
                Your domain experts embedded with our product, data, optimisation and UX team.
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-start gap-3">
            <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: ACCENT_SOFT, color: ACCENT }}>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[13px] font-semibold">Enterprise-grade</div>
              <div className="text-[12px]" style={{ color: MUTE }}>
                RBAC, audit logs, optional VPC / on-prem patterns. PII masking by default.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decision ask checklist */}
      <div className="col-span-5 rounded-xl p-5" style={{ background: ACCENT, color: '#FFF' }}>
        <div className="text-[11px] uppercase tracking-wider opacity-80 mb-3">Decisions needed today</div>
        <ul className="space-y-2.5 text-[13px]">
          {[
            'Pilot node — region or DC',
            'SKU scope — hero + high-expiry families',
            'Single-threaded data owner on your side',
            'KPI targets co-signed with finance',
            'Demo day & kickoff date',
          ].map((s, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold" style={{ background: 'rgba(255,255,255,0.18)' }}>{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 pt-4 border-t border-white/20 text-[12px] opacity-90 flex items-start gap-2">
          <Bot className="w-4 h-4 mt-0.5" />
          Leadership gets a copilot briefing layer — without waiting for a 40-tab spreadsheet pack.
        </div>
      </div>
    </div>
  </SlideShell>
);

/* ----------------------------- Container ------------------------------- */
const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];

const SupplyChainPitch: React.FC = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') setI((v) => Math.min(v + 1, slides.length - 1));
      if (e.key === 'ArrowLeft') setI((v) => Math.max(v - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const Current = slides[i];

  return (
    <div className="h-screen w-screen overflow-hidden bg-white relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Current />
        </motion.div>
      </AnimatePresence>

      {/* Bottom nav */}
      {!present && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white border rounded-full px-3 py-1.5 shadow-sm" style={{ borderColor: RULE }}>
          <button
            onClick={() => setI((v) => Math.max(v - 1, 0))}
            disabled={i === 0}
            className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30"
            style={{ background: ACCENT_SOFT, color: ACCENT }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className="transition-all"
                style={{
                  width: idx === i ? 22 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: idx === i ? ACCENT : '#CBD5E1',
                }}
              />
            ))}
          </div>
          <button
            onClick={() => setI((v) => Math.min(v + 1, slides.length - 1))}
            disabled={i === slides.length - 1}
            className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30"
            style={{ background: ACCENT_SOFT, color: ACCENT }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SupplyChainPitch;
