import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Bot, AlertTriangle, TrendingUp, TrendingDown,
  Target, Boxes, Truck, MapPin, Clock, CheckCircle2, XCircle, Send,
  Sparkles, ShieldCheck, Layers, Calendar, ArrowRight, Activity, Package,
  Users, BarChart3, Filter, MessageSquare,
} from 'lucide-react';

/* =========================================================================
   Supply Chain Decision Studio — 6-screen interactive demo
   Route: /supply-chain-demo
   Theme: Clean Light Editorial (matches /supply-chain-pitch)
   ========================================================================= */

const ACCENT = '#0F4C81';
const ACCENT_SOFT = '#E8F0F9';
const INK = '#0B1220';
const MUTE = '#64748B';
const RULE = '#E5E7EB';
const WARN = '#B45309';
const WARN_SOFT = '#FEF3C7';
const BAD = '#B91C1C';
const BAD_SOFT = '#FEE2E2';
const GOOD = '#0F766E';
const GOOD_SOFT = '#D1FAE5';

/* ---------------------------- Shell ---------------------------- */
interface ShellProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  n: number;
  total: number;
  children: React.ReactNode;
  copilot?: React.ReactNode;
}
const Shell: React.FC<ShellProps> = ({ eyebrow, title, subtitle, n, total, children, copilot }) => (
  <div className="w-full h-screen bg-white flex flex-col" style={{ color: INK }}>
    <div className="h-[6px] w-full" style={{ background: ACCENT }} />
    <div className="px-10 pt-5 pb-3 flex items-center justify-between border-b" style={{ borderColor: RULE }}>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: ACCENT }}>
          <Bot className="w-4 h-4 text-white" />
        </div>
        <span className="text-[13px] font-semibold tracking-wide">Supply Chain Decision Studio</span>
        <span className="text-[12px]" style={{ color: MUTE }}>· Live demo</span>
      </div>
      <div className="text-[11px] font-mono" style={{ color: MUTE }}>
        {String(n).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </div>
    <div className="px-10 pt-5 pb-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-1.5" style={{ color: ACCENT }}>{eyebrow}</div>
      <h1 className="text-[26px] leading-tight font-light tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-[13px] max-w-5xl" style={{ color: MUTE }}>{subtitle}</p>}
    </div>
    <div className="flex-1 px-10 pb-6 overflow-hidden">
      <div className="grid grid-cols-12 gap-4 h-full">
        <div className="col-span-9 h-full overflow-hidden">{children}</div>
        <div className="col-span-3 h-full overflow-hidden">
          <CopilotPanel>{copilot}</CopilotPanel>
        </div>
      </div>
    </div>
    <div className="px-10 py-2 flex items-center justify-between border-t text-[11px]" style={{ borderColor: RULE, color: MUTE }}>
      <span>© DiscvrAI · Confidential demo · all data illustrative</span>
      <span>← → to navigate</span>
    </div>
  </div>
);

/* ---------------------------- Copilot ---------------------------- */
const CopilotPanel: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="h-full rounded-xl border flex flex-col overflow-hidden" style={{ borderColor: RULE, background: '#FAFBFD' }}>
    <div className="px-3 py-2 flex items-center gap-2 border-b" style={{ borderColor: RULE, background: '#FFF' }}>
      <Bot className="w-4 h-4" style={{ color: ACCENT }} />
      <span className="text-[12px] font-semibold">Supply Chain Copilot</span>
      <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded" style={{ background: GOOD_SOFT, color: GOOD }}>grounded</span>
    </div>
    <div className="flex-1 overflow-y-auto p-3 text-[12px] space-y-2">{children}</div>
    <div className="border-t p-2 flex items-center gap-2" style={{ borderColor: RULE, background: '#FFF' }}>
      <input
        readOnly
        placeholder="Ask the copilot…"
        className="flex-1 text-[12px] px-2 py-1.5 rounded border outline-none"
        style={{ borderColor: RULE, color: MUTE }}
      />
      <button className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: ACCENT, color: '#FFF' }}>
        <Send className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

const Bubble: React.FC<{ from: 'user' | 'ai'; children: React.ReactNode }> = ({ from, children }) => (
  <div className={`flex ${from === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div
      className="max-w-[92%] px-2.5 py-1.5 rounded-lg text-[12px] leading-snug"
      style={{
        background: from === 'user' ? ACCENT : '#FFF',
        color: from === 'user' ? '#FFF' : INK,
        border: from === 'user' ? 'none' : `1px solid ${RULE}`,
      }}
    >
      {children}
    </div>
  </div>
);

/* ---------------------------- Helpers ---------------------------- */
const Pill: React.FC<{ tone?: 'good' | 'warn' | 'bad' | 'info'; children: React.ReactNode }> = ({ tone = 'info', children }) => {
  const map = {
    good: { bg: GOOD_SOFT, fg: GOOD },
    warn: { bg: WARN_SOFT, fg: WARN },
    bad: { bg: BAD_SOFT, fg: BAD },
    info: { bg: ACCENT_SOFT, fg: ACCENT },
  }[tone];
  return (
    <span className="text-[10.5px] font-semibold px-1.5 py-0.5 rounded" style={{ background: map.bg, color: map.fg }}>
      {children}
    </span>
  );
};

const KPI: React.FC<{ label: string; value: string; delta?: string; tone?: 'good' | 'warn' | 'bad' }> = ({ label, value, delta, tone }) => (
  <div className="rounded-lg border p-2.5 bg-white" style={{ borderColor: RULE }}>
    <div className="text-[10.5px]" style={{ color: MUTE }}>{label}</div>
    <div className="text-[20px] leading-none mt-1 font-light" style={{ color: INK }}>{value}</div>
    {delta && (
      <div className="text-[10.5px] mt-1 flex items-center gap-1" style={{ color: tone === 'bad' ? BAD : tone === 'warn' ? WARN : GOOD }}>
        {tone === 'bad' ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
        {delta}
      </div>
    )}
  </div>
);

/* =========================================================================
   SCREEN 1 — Morning brief / exception cockpit
   ========================================================================= */
const Screen1: React.FC = () => {
  const exceptions = [
    { id: 'EX-1041', sku: 'Hero-SKU 814 (250ml)', dc: 'DC-North', risk: 'Stockout in 36h', driver: 'Promo lift +28% vs plan, supplier slip 1d', impact: '₹42L revenue · 3 stores', tone: 'bad' as const, owner: 'A. Mehta' },
    { id: 'EX-1042', sku: 'SKU 226 (1L)', dc: 'DC-West', risk: 'Expiry exposure 12 days', driver: 'Ageing batch + slow regional offtake', impact: '₹9.6L wastage', tone: 'warn' as const, owner: 'R. Iyer' },
    { id: 'EX-1043', sku: 'SKU 318 (500g)', dc: 'DC-East', risk: 'Dock congestion at 11:00', driver: '4 inbound trucks overlap, labor short by 3', impact: 'Receiving delay 2.5h', tone: 'warn' as const, owner: 'S. Kapoor' },
    { id: 'EX-1044', sku: 'SKU 902 (combo)', dc: 'DC-South', risk: 'Forecast under-call -18%', driver: 'Local festival not modelled', impact: 'Service risk on 5 SKUs', tone: 'bad' as const, owner: 'A. Mehta' },
    { id: 'EX-1045', sku: 'SKU 477 (200g)', dc: 'DC-North', risk: 'Slotting suboptimal', driver: 'A-velocity in C-zone, 38% extra travel', impact: '+1.6h pick time / shift', tone: 'warn' as const, owner: 'S. Kapoor' },
  ];
  return (
    <Shell
      eyebrow="01 · Morning brief"
      title="One queue. Ranked by impact. Owner and SLA on every line."
      subtitle="The planner opens the day to a copilot-ranked exception cockpit instead of five tabs."
      n={1}
      total={6}
      copilot={
        <>
          <Bubble from="ai">Good morning. 5 exceptions need a decision today. Top driver: <b>promo lift on Hero-SKU 814</b> exceeding plan by 28%.</Bubble>
          <Bubble from="user">Why is EX-1041 ranked #1?</Bubble>
          <Bubble from="ai">Combined service + revenue impact (~₹42L), 36h to stockout, and 3 strategic stores affected. I have a 3-option plan ready when you click in.</Bubble>
        </>
      }
    >
      <div className="h-full flex flex-col gap-3">
        <div className="grid grid-cols-5 gap-3">
          <KPI label="Open exceptions" value="5" delta="-2 vs yesterday" tone="good" />
          <KPI label="Service-at-risk" value="₹42L" delta="1 hero SKU" tone="bad" />
          <KPI label="Wastage exposure" value="₹9.6L" delta="2 batches ageing" tone="warn" />
          <KPI label="Labor pressure" value="78%" delta="DC-East peak" tone="warn" />
          <KPI label="Decisions cleared" value="11" delta="vs 4 last week" tone="good" />
        </div>
        <div className="rounded-xl border flex-1 overflow-hidden flex flex-col" style={{ borderColor: RULE }}>
          <div className="px-4 py-2 flex items-center justify-between border-b" style={{ borderColor: RULE, background: '#FAFBFD' }}>
            <div className="flex items-center gap-2 text-[12px] font-semibold">
              <Filter className="w-3.5 h-3.5" style={{ color: ACCENT }} /> Exception queue
              <span className="font-normal" style={{ color: MUTE }}>· ranked by service + cash impact</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Pill tone="bad">Critical 2</Pill>
              <Pill tone="warn">Watch 3</Pill>
              <Pill tone="info">Auto-cleared 11</Pill>
            </div>
          </div>
          <div className="grid grid-cols-12 px-4 py-2 text-[10.5px] font-semibold uppercase tracking-wider border-b" style={{ borderColor: RULE, color: MUTE }}>
            <div className="col-span-1">ID</div>
            <div className="col-span-3">SKU / DC</div>
            <div className="col-span-2">Risk</div>
            <div className="col-span-3">Why (copilot)</div>
            <div className="col-span-2">Impact</div>
            <div className="col-span-1 text-right">Owner</div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {exceptions.map((e, i) => (
              <div key={e.id} className="grid grid-cols-12 px-4 py-2.5 text-[12px] items-center border-b hover:bg-slate-50" style={{ borderColor: RULE }}>
                <div className="col-span-1 font-mono text-[11px]" style={{ color: MUTE }}>{e.id}</div>
                <div className="col-span-3">
                  <div className="font-semibold">{e.sku}</div>
                  <div className="text-[11px]" style={{ color: MUTE }}>{e.dc}</div>
                </div>
                <div className="col-span-2"><Pill tone={e.tone}>{e.risk}</Pill></div>
                <div className="col-span-3 text-[11.5px]" style={{ color: INK }}>{e.driver}</div>
                <div className="col-span-2 text-[11.5px]" style={{ color: e.tone === 'bad' ? BAD : WARN }}>{e.impact}</div>
                <div className="col-span-1 text-right text-[11.5px]">{e.owner}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
};

/* =========================================================================
   SCREEN 2 — Drill in: scenario + recommended action
   ========================================================================= */
const Screen2: React.FC = () => {
  const [picked, setPicked] = useState(1);
  const options = [
    { t: 'Expedite from DC-Central (40 cases)', risk: 'Low', cost: '₹1.1L freight premium', service: 'Stockout averted', tone: 'good' as const },
    { t: 'Lateral transfer DC-West → DC-North (60 cases)', risk: 'Med', cost: '₹0.6L freight', service: 'Stockout averted · West buffer 4d → 2d', tone: 'good' as const },
    { t: 'Hold and accept partial stockout', risk: 'High', cost: '₹0', service: '~₹12L revenue loss · 3 stores', tone: 'bad' as const },
  ];
  return (
    <Shell
      eyebrow="02 · Decision drill-in"
      title="EX-1041 · Hero-SKU 814 — recommended action with explainability."
      subtitle="Three ranked options. Each with cost, service and execution risk. Approve, override with reason, or send back for refinement."
      n={2}
      total={6}
      copilot={
        <>
          <Bubble from="ai">I recommend <b>Option B — Lateral transfer DC-West → DC-North</b>. Lowest blended cost-to-serve and West stays above safety stock.</Bubble>
          <Bubble from="user">What if promo extends by 3 days?</Bubble>
          <Bubble from="ai">Then West buffer drops to 1.2 days by Day 5. I’d pre-position a second transfer on Day 3 — I can draft it for approval.</Bubble>
        </>
      }
    >
      <div className="h-full grid grid-cols-12 gap-3">
        <div className="col-span-7 flex flex-col gap-3">
          <div className="rounded-xl border p-4" style={{ borderColor: RULE }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider" style={{ color: MUTE }}>Exception</div>
                <div className="text-[16px] font-semibold">Hero-SKU 814 (250ml) · DC-North</div>
              </div>
              <Pill tone="bad">Stockout in 36h</Pill>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              <KPI label="Forecast (rev)" value="2,140" delta="+28% vs base" tone="warn" />
              <KPI label="On-hand" value="612" />
              <KPI label="In-transit" value="180" />
              <KPI label="Cover (days)" value="1.5" delta="below safety 3d" tone="bad" />
            </div>
          </div>

          <div className="rounded-xl border p-4 flex-1" style={{ borderColor: RULE }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>Recommended actions</div>
            <div className="space-y-2">
              {options.map((o, i) => (
                <button
                  key={i}
                  onClick={() => setPicked(i)}
                  className="w-full text-left rounded-lg border p-3 flex items-start gap-3 transition-all"
                  style={{
                    borderColor: picked === i ? ACCENT : RULE,
                    background: picked === i ? ACCENT_SOFT : '#FFF',
                  }}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: picked === i ? ACCENT : '#E2E8F0', color: picked === i ? '#FFF' : INK }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold">{o.t}</div>
                    <div className="text-[11.5px] mt-1 flex flex-wrap gap-3" style={{ color: MUTE }}>
                      <span>Risk: <b style={{ color: INK }}>{o.risk}</b></span>
                      <span>Cost: <b style={{ color: INK }}>{o.cost}</b></span>
                      <span>Service: <b style={{ color: o.tone === 'bad' ? BAD : GOOD }}>{o.service}</b></span>
                    </div>
                  </div>
                  {picked === i && <CheckCircle2 className="w-5 h-5" style={{ color: ACCENT }} />}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-md text-[12px] font-semibold flex items-center gap-1.5" style={{ background: ACCENT, color: '#FFF' }}>
                <CheckCircle2 className="w-3.5 h-3.5" /> Approve & dispatch
              </button>
              <button className="px-3 py-1.5 rounded-md text-[12px] border" style={{ borderColor: RULE }}>Override with reason</button>
              <button className="px-3 py-1.5 rounded-md text-[12px] border" style={{ borderColor: RULE }}>Refine in scenario</button>
            </div>
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-3">
          <div className="rounded-xl border p-4 flex-1" style={{ borderColor: RULE, background: '#FAFBFD' }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>Why this action — explainability</div>
            <ul className="space-y-2 text-[12px]">
              {[
                { i: Sparkles, t: 'Promo elasticity reads +28%; last 3 similar promos ran +22–31%' },
                { i: Activity, t: 'DC-West has 4d cover, can release 60 cases without breaching safety' },
                { i: Truck, t: 'Lane West→North: 18h transit, on-time history 92% last 30d' },
                { i: ShieldCheck, t: 'Cost-to-serve ₹0.6L vs Option A ₹1.1L — same service outcome' },
                { i: Clock, t: 'Decision window: 4h before stockout becomes unavoidable' },
              ].map((r, i) => (
                <li key={i} className="flex gap-2">
                  <r.i className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                  <span>{r.t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border p-4" style={{ borderColor: RULE }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>Scenario sandbox</div>
            <div className="grid grid-cols-3 gap-2 text-[11.5px]">
              {['Promo +3d', 'Supplier slip +1d', 'Festival uplift'].map((s) => (
                <button key={s} className="rounded-md border px-2 py-1.5 hover:bg-white" style={{ borderColor: RULE, background: '#FFF' }}>{s}</button>
              ))}
            </div>
            <div className="mt-2 text-[11px]" style={{ color: MUTE }}>Re-runs the recommendation in &lt;3s with new constraints.</div>
          </div>
        </div>
      </div>
    </Shell>
  );
};

/* =========================================================================
   SCREEN 3 — Warehouse productivity control tower
   ========================================================================= */
const Screen3: React.FC = () => {
  const zones = [
    { z: 'Inbound dock', util: 92, tone: 'bad' as const, note: '4 trucks overlap 11:00' },
    { z: 'Putaway', util: 71, tone: 'warn' as const, note: 'Aisle 7 congestion' },
    { z: 'Pick — A zone', util: 86, tone: 'warn' as const, note: 'Golden zone misalignment' },
    { z: 'Pack', util: 64, tone: 'good' as const, note: 'Healthy' },
    { z: 'Outbound', util: 58, tone: 'good' as const, note: 'On schedule' },
  ];
  const moves = [
    { from: 'Aisle C-12 / shelf 4', to: 'Aisle A-02 / golden zone', sku: 'SKU 477', save: '−1.6h pick / shift' },
    { from: 'Aisle B-09 / shelf 6', to: 'Aisle A-04 / golden zone', sku: 'SKU 318', save: '−0.9h pick / shift' },
    { from: 'Aisle D-21 / shelf 2', to: 'Aisle A-08 / golden zone', sku: 'SKU 902', save: '−0.7h pick / shift' },
  ];
  return (
    <Shell
      eyebrow="03 · Warehouse productivity"
      title="Slotting, dock flow and labor pressure — read in real time, acted on the same shift."
      subtitle="Occupancy looks healthy on dashboards. The control tower shows where throughput will actually break."
      n={3}
      total={6}
      copilot={
        <>
          <Bubble from="ai">Dock at 92% between 10:30–12:00. I’d resequence Truck T-3 to 13:15 — saves ~2.1h of receiving delay.</Bubble>
          <Bubble from="user">Any slotting wins this week?</Bubble>
          <Bubble from="ai">Three A-velocity SKUs sit in C-zone. Moving them to the golden zone saves ~3.2h pick time / shift. Want me to draft tasks for the supervisor?</Bubble>
        </>
      }
    >
      <div className="h-full grid grid-cols-12 gap-3">
        <div className="col-span-7 flex flex-col gap-3">
          <div className="grid grid-cols-4 gap-3">
            <KPI label="UPH (lines/hr)" value="142" delta="+11 wk-on-wk" tone="good" />
            <KPI label="Pick travel" value="1.8 km/shift" delta="−18% post-slotting" tone="good" />
            <KPI label="Dock dwell" value="42 min" delta="+8 min vs target" tone="warn" />
            <KPI label="Labor at peak" value="78%" delta="DC-East" tone="warn" />
          </div>
          <div className="rounded-xl border p-4 flex-1" style={{ borderColor: RULE }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: MUTE }}>DC heat — utilisation by zone</div>
            <div className="space-y-2">
              {zones.map((z) => (
                <div key={z.z} className="grid grid-cols-12 items-center gap-3 text-[12px]">
                  <div className="col-span-3 font-semibold">{z.z}</div>
                  <div className="col-span-6 h-2.5 rounded-full overflow-hidden" style={{ background: '#F1F5F9' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${z.util}%`,
                        background: z.tone === 'bad' ? BAD : z.tone === 'warn' ? WARN : GOOD,
                      }}
                    />
                  </div>
                  <div className="col-span-1 text-right text-[11.5px] font-semibold">{z.util}%</div>
                  <div className="col-span-2 text-right text-[11px]" style={{ color: MUTE }}>{z.note}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-[11.5px]">
              <div className="rounded-lg border p-3" style={{ borderColor: RULE, background: BAD_SOFT }}>
                <div className="font-semibold flex items-center gap-1.5" style={{ color: BAD }}><AlertTriangle className="w-3.5 h-3.5" /> Dock collision 11:00</div>
                <div className="mt-1" style={{ color: INK }}>4 inbound trucks overlap. Recommendation: resequence T-3 → 13:15.</div>
              </div>
              <div className="rounded-lg border p-3" style={{ borderColor: RULE, background: WARN_SOFT }}>
                <div className="font-semibold flex items-center gap-1.5" style={{ color: WARN }}><Users className="w-3.5 h-3.5" /> Labor pressure</div>
                <div className="mt-1" style={{ color: INK }}>Pick zone A short by 3 FTE 14:00–17:00. Pull 2 from pack (low load).</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-5 rounded-xl border p-4 flex flex-col" style={{ borderColor: RULE, background: '#FAFBFD' }}>
          <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>Slotting moves — golden zone</div>
          <div className="space-y-2 flex-1">
            {moves.map((m, i) => (
              <div key={i} className="rounded-lg border bg-white p-3" style={{ borderColor: RULE }}>
                <div className="flex items-center justify-between">
                  <div className="text-[12.5px] font-semibold">{m.sku}</div>
                  <Pill tone="good">{m.save}</Pill>
                </div>
                <div className="mt-1 flex items-center gap-2 text-[11.5px]" style={{ color: MUTE }}>
                  <MapPin className="w-3.5 h-3.5" /> {m.from}
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span style={{ color: ACCENT }}>{m.to}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 px-3 py-2 rounded-md text-[12px] font-semibold flex items-center justify-center gap-1.5" style={{ background: ACCENT, color: '#FFF' }}>
            <CheckCircle2 className="w-3.5 h-3.5" /> Push 3 moves to supervisor task list
          </button>
        </div>
      </div>
    </Shell>
  );
};

/* =========================================================================
   SCREEN 4 — Copilot-led conversational planning
   ========================================================================= */
const Screen4: React.FC = () => {
  const [step, setStep] = useState(0);
  const conversation = [
    { from: 'user' as const, t: 'What is my biggest service risk for the next 7 days?' },
    { from: 'ai' as const, t: 'Hero-SKU 814 in DC-North has 1.5 days cover vs 3 day safety. Driver: promo lift +28%. Cost-to-serve options ready.', extra: 'plan' },
    { from: 'user' as const, t: 'Show me where wastage will hit if we do nothing.' },
    { from: 'ai' as const, t: '₹9.6L exposure on SKU 226 (DC-West) — 12 days to expiry. I can route 40% to clearance channel and 30% to high-velocity stores.', extra: 'wastage' },
    { from: 'user' as const, t: 'Ok, draft both. Send for approval.' },
    { from: 'ai' as const, t: 'Drafted 2 actions, owners assigned, SLAs set. Approval requests queued. Both will appear in tonight’s steering pack.', extra: 'done' },
  ];
  useEffect(() => {
    if (step >= conversation.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), 1200);
    return () => clearTimeout(t);
  }, [step]);
  return (
    <Shell
      eyebrow="04 · Conversational planning"
      title="The copilot is the surface — the rest of the system answers."
      subtitle="Same context for planner, warehouse manager and CXO. Every answer is grounded, every action is auditable."
      n={4}
      total={6}
      copilot={
        <>
          <Bubble from="ai">I keep one source of truth across planning, WMS and ERP. You ask in plain language — I cite where each number came from.</Bubble>
          <Bubble from="user">Can you show the citations panel?</Bubble>
          <Bubble from="ai">On the right of every answer. Numbers are linked back to the underlying tables.</Bubble>
        </>
      }
    >
      <div className="h-full grid grid-cols-12 gap-3">
        <div className="col-span-7 rounded-xl border flex flex-col overflow-hidden" style={{ borderColor: RULE }}>
          <div className="px-4 py-2 border-b flex items-center gap-2" style={{ borderColor: RULE, background: '#FAFBFD' }}>
            <MessageSquare className="w-4 h-4" style={{ color: ACCENT }} />
            <span className="text-[12px] font-semibold">Planner ↔ Copilot session</span>
          </div>
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {conversation.slice(0, step).map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[78%] px-3 py-2 rounded-lg text-[12.5px]"
                  style={{
                    background: m.from === 'user' ? ACCENT : '#FFF',
                    color: m.from === 'user' ? '#FFF' : INK,
                    border: m.from === 'user' ? 'none' : `1px solid ${RULE}`,
                  }}
                >
                  {m.t}
                  {m.extra === 'plan' && (
                    <div className="mt-2 text-[11px] flex gap-1.5 flex-wrap">
                      <Pill tone="info">Lateral transfer ₹0.6L</Pill>
                      <Pill tone="info">Expedite ₹1.1L</Pill>
                      <Pill tone="bad">Do nothing −₹12L</Pill>
                    </div>
                  )}
                  {m.extra === 'wastage' && (
                    <div className="mt-2 text-[11px] flex gap-1.5 flex-wrap">
                      <Pill tone="warn">Clearance 40%</Pill>
                      <Pill tone="warn">Reroute 30%</Pill>
                      <Pill tone="good">Saves ~₹6.7L</Pill>
                    </div>
                  )}
                  {m.extra === 'done' && (
                    <div className="mt-2 flex items-center gap-1.5 text-[11px]" style={{ color: GOOD }}>
                      <CheckCircle2 className="w-3.5 h-3.5" /> 2 approvals queued · audit trail logged
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {step < conversation.length && (
              <div className="text-[11px] flex items-center gap-1.5" style={{ color: MUTE }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} /> Copilot is responding…
              </div>
            )}
          </div>
          <div className="px-4 py-2 border-t flex items-center gap-2" style={{ borderColor: RULE }}>
            <button onClick={() => setStep(0)} className="text-[11px] underline" style={{ color: MUTE }}>Replay</button>
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-3">
          <div className="rounded-xl border p-4" style={{ borderColor: RULE, background: '#FAFBFD' }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>Citations · last answer</div>
            <ul className="text-[12px] space-y-1.5">
              {[
                'forecast.daily · SKU 814 / DC-North · last 28d',
                'inventory.onhand · SKU 814 · 12:14 IST',
                'in_transit.po · vendor V-204 · ETA +1d',
                'promo.calendar · campaign PROMO-Q3-04',
              ].map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                  <span className="font-mono text-[11px]">{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border p-4" style={{ borderColor: RULE }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>Guardrails active</div>
            <div className="grid grid-cols-1 gap-1.5 text-[12px]">
              {[
                'Read-only writes in shadow mode',
                'No PII surfaced in answers',
                'Override reason taxonomy mandatory',
                'Every action logged with user + timestamp',
              ].map((g, i) => (
                <div key={i} className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: GOOD }} /> {g}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};

/* =========================================================================
   SCREEN 5 — Cross-DC network rebalance
   ========================================================================= */
const Screen5: React.FC = () => {
  const dcs = [
    { id: 'N', name: 'DC-North', x: 50, y: 22, status: 'short', cover: '1.5d' },
    { id: 'W', name: 'DC-West', x: 22, y: 50, status: 'long', cover: '4.0d' },
    { id: 'C', name: 'DC-Central', x: 50, y: 50, status: 'ok', cover: '2.8d' },
    { id: 'E', name: 'DC-East', x: 78, y: 50, status: 'ok', cover: '3.1d' },
    { id: 'S', name: 'DC-South', x: 50, y: 78, status: 'long', cover: '4.6d' },
  ];
  const tone = (s: string) => (s === 'short' ? BAD : s === 'long' ? WARN : GOOD);
  return (
    <Shell
      eyebrow="05 · Network rebalance"
      title="Move stock before the system tells you it’s already too late."
      subtitle="The copilot continuously evaluates lateral transfers across DCs against cost, lead time and service risk."
      n={5}
      total={6}
      copilot={
        <>
          <Bubble from="ai">Two surplus DCs (West, South) can cover the North gap. West is the cheaper move; South has slower lane.</Bubble>
          <Bubble from="user">Approve West → North.</Bubble>
          <Bubble from="ai">Done. 60 cases, ETA 18h, cost ₹0.6L. WMS task created and CFO weekly cost log updated.</Bubble>
        </>
      }
    >
      <div className="h-full grid grid-cols-12 gap-3">
        <div className="col-span-7 rounded-xl border p-4 relative" style={{ borderColor: RULE, background: '#FAFBFD' }}>
          <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>Network view — Hero-SKU 814</div>
          <div className="relative w-full h-[78%] mt-2">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* lanes */}
              <line x1={dcs[1].x} y1={dcs[1].y} x2={dcs[0].x} y2={dcs[0].y} stroke={ACCENT} strokeWidth="0.6" strokeDasharray="2 1.5" />
              <line x1={dcs[4].x} y1={dcs[4].y} x2={dcs[0].x} y2={dcs[0].y} stroke={WARN} strokeWidth="0.4" strokeDasharray="1 1.5" />
              <text x={(dcs[1].x + dcs[0].x) / 2 - 8} y={(dcs[1].y + dcs[0].y) / 2 - 1} fontSize="2.6" fill={ACCENT} fontWeight="700">
                Recommended · 60 cs · 18h · ₹0.6L
              </text>
              {dcs.map((d) => (
                <g key={d.id}>
                  <circle cx={d.x} cy={d.y} r="4" fill={tone(d.status)} />
                  <circle cx={d.x} cy={d.y} r="6" fill={tone(d.status)} opacity="0.18" />
                  <text x={d.x} y={d.y - 7} fontSize="2.6" fill={INK} textAnchor="middle" fontWeight="700">{d.name}</text>
                  <text x={d.x} y={d.y + 9} fontSize="2.4" fill={MUTE} textAnchor="middle">cover {d.cover}</text>
                </g>
              ))}
            </svg>
          </div>
          <div className="flex items-center gap-3 text-[11px] mt-1">
            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: BAD }} /> short</div>
            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: WARN }} /> long / aging</div>
            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: GOOD }} /> healthy</div>
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-3">
          <div className="rounded-xl border p-4" style={{ borderColor: RULE }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>Recommended transfer</div>
            <div className="text-[14px] font-semibold">DC-West → DC-North · 60 cases</div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <KPI label="ETA" value="18h" />
              <KPI label="Cost" value="₹0.6L" tone="good" delta="vs ₹1.1L expedite" />
              <KPI label="West cover after" value="2.0d" tone="warn" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-md text-[12px] font-semibold flex items-center gap-1.5" style={{ background: ACCENT, color: '#FFF' }}>
                <CheckCircle2 className="w-3.5 h-3.5" /> Approve transfer
              </button>
              <button className="px-3 py-1.5 rounded-md text-[12px] border" style={{ borderColor: RULE }}>Try South lane</button>
            </div>
          </div>
          <div className="rounded-xl border p-4 flex-1" style={{ borderColor: RULE, background: '#FAFBFD' }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>Constraints respected</div>
            <ul className="text-[12px] space-y-1.5">
              {[
                'West buffer never breaches safety stock (3d)',
                'Lane on-time history ≥ 90% in last 30 days',
                'Truck capacity & dock window at North validated',
                'Promo cycle & expiry windows accounted for',
              ].map((c, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" style={{ color: GOOD }} /> {c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Shell>
  );
};

/* =========================================================================
   SCREEN 6 — Steering pack: KPIs, adoption, copilot-written brief
   ========================================================================= */
const Screen6: React.FC = () => {
  const [week, setWeek] = useState(8);
  const series = useMemo(
    () => [
      { k: 'Fill rate', base: 92.4, now: 94.6 + week * 0.05, target: 96.5, unit: '%' },
      { k: 'Inventory days', base: 38, now: 36 - week * 0.15, target: 33, unit: 'd', invert: true },
      { k: 'UPH', base: 128, now: 138 + week * 0.5, target: 150, unit: 'lines/hr' },
      { k: 'Wastage', base: 1.8, now: 1.5 - week * 0.02, target: 1.2, unit: '%', invert: true },
    ],
    [week],
  );
  return (
    <Shell
      eyebrow="06 · Steering pack"
      title="If it doesn’t show up in KPIs and adoption, it didn’t happen."
      subtitle="The copilot writes a weekly brief — wins, misses, decisions pending and asks for leadership — editable before sending."
      n={6}
      total={6}
      copilot={
        <>
          <Bubble from="ai">Week {week} brief drafted. 3 wins, 1 miss, 2 asks. Want me to attach the cost log and exception trend?</Bubble>
          <Bubble from="user">Yes, and add CFO and Head of Ops as recipients.</Bubble>
          <Bubble from="ai">Added. Steering pack ready to share at 18:00 IST.</Bubble>
        </>
      }
    >
      <div className="h-full grid grid-cols-12 gap-3">
        <div className="col-span-8 flex flex-col gap-3">
          <div className="rounded-xl border p-4" style={{ borderColor: RULE }}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: MUTE }}>Pilot KPI scorecard</div>
              <div className="flex items-center gap-2 text-[11px]">
                <span style={{ color: MUTE }}>Week</span>
                <input type="range" min={1} max={12} value={week} onChange={(e) => setWeek(parseInt(e.target.value))} className="w-32" />
                <span className="font-mono">{week} / 12</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {series.map((s) => {
                const better = s.invert ? s.now < s.base : s.now > s.base;
                return (
                  <div key={s.k} className="rounded-lg border p-3 bg-white" style={{ borderColor: RULE }}>
                    <div className="text-[11px]" style={{ color: MUTE }}>{s.k}</div>
                    <div className="text-[20px] font-light mt-1">{s.now.toFixed(s.unit === '%' ? 1 : 1)}{s.unit === '%' ? '%' : ''}</div>
                    <div className="text-[10.5px] mt-1" style={{ color: MUTE }}>
                      base {s.base}{s.unit === '%' ? '%' : ''} · target <b style={{ color: ACCENT }}>{s.target}{s.unit === '%' ? '%' : ''}</b>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[11px]" style={{ color: better ? GOOD : BAD }}>
                      {better ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {better ? 'on track' : 'lagging'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border p-4 flex-1" style={{ borderColor: RULE, background: '#FAFBFD' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: MUTE }}>Copilot-drafted weekly brief (editable)</div>
              <Pill tone="info">Auto-generated</Pill>
            </div>
            <div className="bg-white rounded-lg border p-4 text-[12.5px] leading-relaxed" style={{ borderColor: RULE }}>
              <div className="font-semibold mb-1.5">Week {week} · Decision Studio steering note</div>
              <p className="mb-2">
                Service held above plan despite a +28% promo lift on Hero-SKU 814. Lateral transfer
                (West → North) averted a stockout at ₹0.6L cost vs ₹12L exposure. Wastage trending
                down on SKU 226 after clearance + reroute play.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-2">
                <div>
                  <div className="text-[11px] font-semibold mb-1" style={{ color: GOOD }}>Wins</div>
                  <ul className="space-y-0.5 text-[11.5px]">
                    <li>· Stockout averted on Hero-SKU 814</li>
                    <li>· UPH up 11 wk-on-wk after slotting</li>
                    <li>· 11 exceptions auto-cleared</li>
                  </ul>
                </div>
                <div>
                  <div className="text-[11px] font-semibold mb-1" style={{ color: BAD }}>Misses / risk</div>
                  <ul className="space-y-0.5 text-[11.5px]">
                    <li>· DC-East dock dwell +8m vs target</li>
                    <li>· Forecast under-call on festival window</li>
                  </ul>
                </div>
                <div>
                  <div className="text-[11px] font-semibold mb-1" style={{ color: ACCENT }}>Asks from leadership</div>
                  <ul className="space-y-0.5 text-[11.5px]">
                    <li>· Sign-off on 2 standing transfer rules</li>
                    <li>· Approve write-back to WMS in week 9</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-md text-[12px] font-semibold" style={{ background: ACCENT, color: '#FFF' }}>Send steering pack</button>
              <button className="px-3 py-1.5 rounded-md text-[12px] border" style={{ borderColor: RULE }}>Export 1-pager (PDF)</button>
            </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-3">
          <div className="rounded-xl border p-4" style={{ borderColor: RULE }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>Adoption</div>
            <div className="space-y-2 text-[12px]">
              {[
                { k: 'Planner DAU', v: '8 / 9', tone: 'good' as const },
                { k: 'Action acceptance', v: '74%', tone: 'good' as const },
                { k: 'Override w/ reason', v: '22%', tone: 'warn' as const },
                { k: 'Avg decision TAT', v: '14 min', tone: 'good' as const },
              ].map((a) => (
                <div key={a.k} className="flex items-center justify-between">
                  <span style={{ color: MUTE }}>{a.k}</span>
                  <Pill tone={a.tone}>{a.v}</Pill>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border p-4 flex-1" style={{ borderColor: RULE, background: '#FAFBFD' }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTE }}>What changed since week 0</div>
            <ul className="text-[12px] space-y-1.5">
              {[
                { i: BarChart3, t: 'KPI baselines locked & tracked weekly' },
                { i: Package, t: 'Exception queue replaces 3 standing reports' },
                { i: Calendar, t: 'Steering pack runs auto every Friday 18:00' },
                { i: ShieldCheck, t: 'All decisions auditable end-to-end' },
              ].map((row, i) => (
                <li key={i} className="flex items-start gap-2">
                  <row.i className="w-4 h-4 mt-0.5" style={{ color: ACCENT }} />
                  <span>{row.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Shell>
  );
};

/* ---------------------------- Container ---------------------------- */
const screens = [Screen1, Screen2, Screen3, Screen4, Screen5, Screen6];

const SupplyChainDemo: React.FC = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') setI((v) => Math.min(v + 1, screens.length - 1));
      if (e.key === 'ArrowLeft') setI((v) => Math.max(v - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const Current = screens[i];
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
          {screens.map((_, idx) => (
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
          onClick={() => setI((v) => Math.min(v + 1, screens.length - 1))}
          disabled={i === screens.length - 1}
          className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30"
          style={{ background: ACCENT_SOFT, color: ACCENT }}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SupplyChainDemo;
