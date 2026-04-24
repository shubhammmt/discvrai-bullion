import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  LayoutDashboard, Factory, Package, TrendingUp, Workflow, ScrollText, Settings,
  Sparkles, Bell, Search, ChevronRight, AlertTriangle, CheckCircle2, Clock,
  ArrowUp, ArrowDown, LogOut, User, Shield, Target, Zap, Truck, IndianRupee,
  Activity, Send, Database, FileCheck
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  kpiStrip, productionTrend, energyTrend, topAlerts, todaysDecisions, lines,
  downtimeLog, opsRecommendations, prToPoFunnel, suppliers, slowMoving,
  customerMargin, receivables, auditLog, pilot90Day, copilotQA
} from '@/data/vedantaData';

type ModuleId = 'home' | 'ops' | 'proc' | 'comm' | 'workflow' | 'audit' | 'pilot' | 'settings';

// ============ Theme tokens (industrial dark + copper) ============
const C = {
  bg: '#0A0E14',
  panel: '#111722',
  panelAlt: '#161E2C',
  border: '#1F2A3D',
  borderHi: '#2A3A55',
  text: '#E6EBF2',
  muted: '#8A95A8',
  copper: '#C77B3D',
  copperHi: '#E89456',
  alum: '#9FB3C8',
  green: '#3DD68C',
  amber: '#F5A524',
  red: '#F25767',
  blue: '#5BA8F5',
};

// ============ Login screen ============
const LoginScreen: React.FC<{ onLogin: (role: string) => void }> = ({ onLogin }) => {
  const [role, setRole] = useState('CDO');
  const roles = ['CDO / CXO', 'Plant Head', 'Procurement Manager', 'Commercial Manager', 'Shift Supervisor'];
  return (
    <div style={{ background: C.bg, color: C.text }} className="min-h-screen flex items-center justify-center p-6">
      <div style={{ background: C.panel, border: `1px solid ${C.border}` }} className="w-full max-w-md rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div style={{ background: `linear-gradient(135deg, ${C.copper}, ${C.copperHi})` }} className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white">V</div>
          <div>
            <div className="text-lg font-semibold">Vedanta Aluminium</div>
            <div className="text-xs" style={{ color: C.muted }}>Decision Hub · v3.2</div>
          </div>
        </div>
        <div className="space-y-3">
          <input placeholder="Employee ID" className="w-full px-3 py-2 rounded-md text-sm" style={{ background: C.panelAlt, border: `1px solid ${C.border}`, color: C.text }} />
          <input placeholder="Password" type="password" className="w-full px-3 py-2 rounded-md text-sm" style={{ background: C.panelAlt, border: `1px solid ${C.border}`, color: C.text }} />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 rounded-md text-sm" style={{ background: C.panelAlt, border: `1px solid ${C.border}`, color: C.text }}>
            {roles.map(r => <option key={r}>{r}</option>)}
          </select>
          <button onClick={() => onLogin(role)} style={{ background: C.copper }} className="w-full py-2.5 rounded-md font-medium text-white hover:opacity-90 transition-opacity">
            Sign in
          </button>
        </div>
        <div className="mt-6 text-xs flex items-center gap-2" style={{ color: C.muted }}>
          <Shield className="w-3.5 h-3.5" /> SSO via Vedanta IdP · MFA enforced
        </div>
      </div>
    </div>
  );
};

// ============ Reusable bits ============
const Panel: React.FC<{ title?: string; children: React.ReactNode; right?: React.ReactNode; className?: string }> = ({ title, children, right, className = '' }) => (
  <div style={{ background: C.panel, border: `1px solid ${C.border}` }} className={`rounded-lg ${className}`}>
    {title && (
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: C.border }}>
        <div className="text-sm font-semibold tracking-wide" style={{ color: C.text }}>{title}</div>
        {right}
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

const Sev: React.FC<{ level: string }> = ({ level }) => {
  const map: any = {
    critical: { bg: 'rgba(242,87,103,0.12)', color: C.red, label: 'CRITICAL' },
    high: { bg: 'rgba(245,165,36,0.12)', color: C.amber, label: 'HIGH' },
    moderate: { bg: 'rgba(91,168,245,0.12)', color: C.blue, label: 'MODERATE' },
    low: { bg: 'rgba(138,149,168,0.12)', color: C.muted, label: 'LOW' },
  };
  const s = map[level] || map.moderate;
  return <span style={{ background: s.bg, color: s.color }} className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider">{s.label}</span>;
};

const StatusDot: React.FC<{ status: string }> = ({ status }) => {
  const c = status === 'green' ? C.green : status === 'amber' ? C.amber : C.red;
  return <span className="inline-block w-2 h-2 rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />;
};

// ============ KPI Strip ============
const KpiStrip: React.FC = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 px-6 py-4 border-b" style={{ borderColor: C.border, background: C.panel }}>
    {kpiStrip.map(k => {
      const tone = k.tone === 'green' ? C.green : k.tone === 'red' ? C.red : C.amber;
      const TrendIcon = k.trend > 0 ? ArrowUp : ArrowDown;
      return (
        <div key={k.label} className="min-w-0">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: C.muted }}>{k.label}</div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <div className="text-xl font-semibold" style={{ color: C.text }}>{k.value}</div>
            <div className="text-[11px] flex items-center gap-0.5" style={{ color: tone }}>
              <TrendIcon className="w-3 h-3" />{Math.abs(k.trend)}%
            </div>
          </div>
          <div className="text-[10px]" style={{ color: C.muted }}>{k.sub}</div>
        </div>
      );
    })}
  </div>
);

// ============ HOME / Executive Command Center ============
const HomeModule: React.FC = () => (
  <div className="p-6 space-y-4">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Panel title="Production vs Plan · 30 days" className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={productionTrend}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.copper} stopOpacity={0.4} />
                <stop offset="100%" stopColor={C.copper} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" stroke={C.muted} fontSize={10} interval={4} />
            <YAxis stroke={C.muted} fontSize={10} domain={[5400, 6200]} />
            <Tooltip contentStyle={{ background: C.panelAlt, border: `1px solid ${C.border}`, fontSize: 12 }} />
            <Area type="monotone" dataKey="actual" stroke={C.copper} fill="url(#g1)" strokeWidth={2} />
            <Line type="monotone" dataKey="plan" stroke={C.alum} strokeDasharray="4 4" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>
      <Panel title="Specific Energy · kWh/kg">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={energyTrend}>
            <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" stroke={C.muted} fontSize={10} interval={4} />
            <YAxis stroke={C.muted} fontSize={10} domain={[13, 13.7]} />
            <Tooltip contentStyle={{ background: C.panelAlt, border: `1px solid ${C.border}`, fontSize: 12 }} />
            <Line type="monotone" dataKey="kwh" stroke={C.amber} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="target" stroke={C.green} strokeDasharray="4 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Panel>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Panel title="Top 5 Alerts Requiring Action" right={<span className="text-[11px]" style={{ color: C.muted }}>Live · refreshed 14s ago</span>}>
        <div className="space-y-2">
          {topAlerts.map(a => (
            <div key={a.id} className="p-3 rounded-md border hover:border-opacity-100 transition-colors cursor-pointer" style={{ background: C.panelAlt, borderColor: C.border }}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Sev level={a.severity} />
                    <span className="text-[10px]" style={{ color: C.muted }}>{a.id} · {a.module} · SLA {a.sla}</span>
                  </div>
                  <div className="text-sm font-medium" style={{ color: C.text }}>{a.title}</div>
                  <div className="text-xs mt-1 line-clamp-1" style={{ color: C.muted }}>{a.detail}</div>
                  <div className="flex items-center gap-3 mt-2 text-[11px]">
                    <span style={{ color: C.alum }}><User className="w-3 h-3 inline mr-1" />{a.owner}</span>
                    <span style={{ color: C.copperHi }}><IndianRupee className="w-3 h-3 inline" />{a.impact}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 mt-1" style={{ color: C.muted }} />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Today's Decisions" right={<span className="text-[11px]" style={{ color: C.copper }}>4 pending · ₹32.7 Cr in play</span>}>
        <div className="space-y-2">
          {todaysDecisions.map(d => (
            <div key={d.id} className="p-3 rounded-md border" style={{ background: C.panelAlt, borderColor: C.border }}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px]" style={{ color: C.muted }}>{d.id} · Owner: {d.owner}</div>
                  <div className="text-sm font-medium mt-0.5" style={{ color: C.text }}>{d.title}</div>
                  <div className="flex items-center gap-3 mt-2 text-[11px]">
                    <span style={{ color: C.amber }}><Clock className="w-3 h-3 inline mr-1" />Due {d.due}</span>
                    <span style={{ color: C.green }}>Impact {d.impact}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <button style={{ background: C.copper }} className="text-[11px] px-3 py-1 rounded text-white hover:opacity-90">Approve</button>
                  <button style={{ borderColor: C.border, color: C.muted }} className="text-[11px] px-3 py-1 rounded border hover:opacity-90">Defer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>

    <Panel title="Demo Scenarios — preloaded">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { id: 'A', label: 'Alumina Supply Delay', detail: 'MV Stellar Pride 72h delay → coverage 6.2d. Triggers spot lift D-301.', value: '₹14.8 Cr', icon: Truck },
          { id: 'B', label: 'Energy Spike Potline-3', detail: 'Cells 211–238 voltage drift. Anode reschedule R-2.', value: '₹4.4 Cr/yr', icon: Zap },
          { id: 'C', label: 'High-margin Order vs Logistics', detail: 'Marubeni 4,200t at $2,612 — rake constraint Angul.', value: '₹9.4 Cr', icon: Target },
        ].map(s => (
          <div key={s.id} className="p-4 rounded-md border" style={{ background: C.panelAlt, borderColor: C.borderHi }}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-4 h-4" style={{ color: C.copperHi }} />
              <span className="text-xs font-semibold" style={{ color: C.text }}>Scenario {s.id} — {s.label}</span>
            </div>
            <div className="text-xs mb-3" style={{ color: C.muted }}>{s.detail}</div>
            <div className="text-xs" style={{ color: C.copperHi }}>Value at stake: <strong>{s.value}</strong></div>
          </div>
        ))}
      </div>
    </Panel>
  </div>
);

// ============ OPS Module ============
const OpsModule: React.FC = () => (
  <div className="p-6 space-y-4">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {lines.map(l => (
        <div key={l.id} className="p-3 rounded-md border" style={{ background: C.panel, borderColor: C.border }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold" style={{ color: C.text }}>{l.name}</span>
            <StatusDot status={l.status} />
          </div>
          <div className="text-lg font-semibold" style={{ color: C.text }}>{l.output} t</div>
          <div className="text-[10px]" style={{ color: C.muted }}>Target {l.target} t</div>
          <div className="mt-2 flex justify-between text-[10px]" style={{ color: C.muted }}>
            <span>Energy {l.energy}</span><span>AE {l.ae}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Panel title="Downtime Timeline · last 12h">
        <div className="space-y-2">
          {downtimeLog.map((d, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-md" style={{ background: C.panelAlt }}>
              <div className="text-xs font-mono" style={{ color: C.copperHi }}>{d.time}</div>
              <div className="text-xs font-medium w-16" style={{ color: C.text }}>{d.line}</div>
              <div className="text-xs flex-1" style={{ color: C.muted }}>{d.cause}</div>
              <div className="text-xs" style={{ color: C.amber }}>{d.duration}m</div>
              <Sev level={d.severity} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Recommendation Engine" right={<Sparkles className="w-4 h-4" style={{ color: C.copper }} />}>
        <div className="space-y-2">
          {opsRecommendations.map(r => (
            <div key={r.id} className="p-3 rounded-md border" style={{ background: C.panelAlt, borderColor: C.border }}>
              <div className="text-xs" style={{ color: C.text }}>{r.text}</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px]" style={{ color: C.muted }}>Source: {r.source}</span>
                <span className="text-[10px]" style={{ color: C.green }}>Confidence {(r.confidence * 100).toFixed(0)}%</span>
              </div>
              <div className="flex gap-2 mt-2">
                <button style={{ background: C.copper }} className="text-[11px] px-3 py-1 rounded text-white">Approve & Assign</button>
                <button style={{ borderColor: C.border, color: C.muted }} className="text-[11px] px-3 py-1 rounded border">Simulate</button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>

    <Panel title="Shift Supervisor Workflow">
      <div className="grid grid-cols-5 gap-2">
        {[
          { step: 'Alert', icon: Bell, count: 7 },
          { step: 'Recommended Action', icon: Sparkles, count: 5 },
          { step: 'Approve', icon: CheckCircle2, count: 3 },
          { step: 'Assign & Execute', icon: User, count: 3 },
          { step: 'Closure + Impact', icon: Target, count: 2 },
        ].map((s, i) => (
          <div key={i} className="p-3 rounded-md border text-center" style={{ background: C.panelAlt, borderColor: C.border }}>
            <s.icon className="w-4 h-4 mx-auto mb-1" style={{ color: C.copperHi }} />
            <div className="text-[10px] uppercase tracking-wider" style={{ color: C.muted }}>{s.step}</div>
            <div className="text-lg font-semibold" style={{ color: C.text }}>{s.count}</div>
          </div>
        ))}
      </div>
    </Panel>
  </div>
);

// ============ PROCUREMENT Module ============
const ProcModule: React.FC = () => (
  <div className="p-6 space-y-4">
    <Panel title="PR → PO Funnel · this month (₹ Cr)">
      <div className="flex items-end gap-2 h-40">
        {prToPoFunnel.map((s, i) => {
          const h = (s.value / 184) * 100;
          const next = prToPoFunnel[i + 1];
          const drop = next ? Math.round((1 - next.value / s.value) * 100) : 0;
          return (
            <div key={s.stage} className="flex-1 flex flex-col items-center">
              <div className="text-[10px] mb-1" style={{ color: C.muted }}>{s.count}</div>
              <div className="w-full rounded-t-md transition-all" style={{ height: `${h}%`, background: `linear-gradient(180deg, ${C.copperHi}, ${C.copper})` }} />
              <div className="text-[10px] mt-2 text-center" style={{ color: C.text }}>{s.stage}</div>
              <div className="text-[10px]" style={{ color: C.copperHi }}>₹{s.value} Cr</div>
              {next && <div className="text-[10px]" style={{ color: drop > 12 ? C.red : C.muted }}>-{drop}%</div>}
            </div>
          );
        })}
      </div>
    </Panel>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Panel title="Supplier Risk Scorecards">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ color: C.muted }}>
              <th className="text-left py-1 font-medium">Supplier</th>
              <th className="text-right">Delv%</th>
              <th className="text-right">Qual%</th>
              <th className="text-right">PriceVar</th>
              <th className="text-right">Risk</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(s => (
              <tr key={s.name} className="border-t" style={{ borderColor: C.border }}>
                <td className="py-2" style={{ color: C.text }}>
                  <div>{s.name}</div>
                  <div className="text-[10px]" style={{ color: C.muted }}>{s.cat} · ₹{s.spend}Cr</div>
                </td>
                <td className="text-right" style={{ color: s.delivery >= 90 ? C.green : s.delivery >= 80 ? C.amber : C.red }}>{s.delivery}</td>
                <td className="text-right" style={{ color: C.text }}>{s.quality}</td>
                <td className="text-right" style={{ color: s.price > 3 ? C.red : s.price < 0 ? C.green : C.muted }}>{s.price > 0 ? '+' : ''}{s.price}%</td>
                <td className="text-right"><Sev level={s.risk} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Panel title="Should-cost Variance · top deviations">
        <div className="space-y-2">
          {[
            { item: 'Calcined Pet Coke', should: 38400, actual: 41200, var: +7.3 },
            { item: 'Aluminium Fluoride', should: 1860, actual: 1980, var: +6.4 },
            { item: 'Cathode blocks', should: 4120, actual: 4045, var: -1.8 },
            { item: 'Caustic Soda', should: 32100, actual: 33800, var: +5.3 },
          ].map(v => (
            <div key={v.item} className="flex items-center justify-between p-2 rounded" style={{ background: C.panelAlt }}>
              <div>
                <div className="text-xs" style={{ color: C.text }}>{v.item}</div>
                <div className="text-[10px]" style={{ color: C.muted }}>Should ₹{v.should.toLocaleString()} · Actual ₹{v.actual.toLocaleString()}</div>
              </div>
              <span className="text-xs font-semibold" style={{ color: v.var > 0 ? C.red : C.green }}>{v.var > 0 ? '+' : ''}{v.var}%</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>

    <Panel title="Slow / Non-moving Inventory · liquidation queue">
      <table className="w-full text-xs">
        <thead><tr style={{ color: C.muted }}>
          <th className="text-left py-1">SKU</th><th className="text-left">Description</th>
          <th className="text-right">Qty</th><th className="text-right">Value (₹L)</th>
          <th className="text-right">Aging (d)</th><th className="text-left pl-4">Recommendation</th>
        </tr></thead>
        <tbody>
          {slowMoving.map(s => (
            <tr key={s.sku} className="border-t" style={{ borderColor: C.border }}>
              <td className="py-2 font-mono" style={{ color: C.copperHi }}>{s.sku}</td>
              <td style={{ color: C.text }}>{s.desc}</td>
              <td className="text-right" style={{ color: C.text }}>{s.qty}</td>
              <td className="text-right" style={{ color: C.text }}>{s.value}</td>
              <td className="text-right" style={{ color: s.age > 300 ? C.red : C.amber }}>{s.age}</td>
              <td className="pl-4" style={{ color: C.green }}>{s.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  </div>
);

// ============ COMMERCIAL Module ============
const CommModule: React.FC = () => {
  const [lme, setLme] = useState(2580);
  const fxAdj = useMemo(() => ((lme - 2580) * 83 / 1000).toFixed(2), [lme]);
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="LME-linked Pricing Simulation">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: C.muted }}>LME 3M ($/t)</span>
                <span className="font-semibold" style={{ color: C.copperHi }}>${lme}</span>
              </div>
              <input type="range" min="2400" max="2800" value={lme} onChange={e => setLme(+e.target.value)} className="w-full accent-orange-500" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 rounded" style={{ background: C.panelAlt }}>
                <div className="text-[10px]" style={{ color: C.muted }}>Realised ₹/t</div>
                <div className="text-base font-semibold" style={{ color: C.text }}>₹{((lme + 220) * 83).toLocaleString()}</div>
              </div>
              <div className="p-2 rounded" style={{ background: C.panelAlt }}>
                <div className="text-[10px]" style={{ color: C.muted }}>Cost ₹/t</div>
                <div className="text-base font-semibold" style={{ color: C.text }}>₹1,72,400</div>
              </div>
              <div className="p-2 rounded" style={{ background: C.panelAlt }}>
                <div className="text-[10px]" style={{ color: C.muted }}>Margin Δ</div>
                <div className="text-base font-semibold" style={{ color: +fxAdj >= 0 ? C.green : C.red }}>₹{fxAdj}K/t</div>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Receivables Aging">
          <table className="w-full text-xs">
            <thead><tr style={{ color: C.muted }}>
              <th className="text-left py-1">Customer</th><th className="text-right">₹ Cr</th><th className="text-center">Bucket</th><th className="text-right">Risk</th>
            </tr></thead>
            <tbody>
              {receivables.map(r => (
                <tr key={r.customer} className="border-t" style={{ borderColor: C.border }}>
                  <td className="py-2" style={{ color: C.text }}>{r.customer}</td>
                  <td className="text-right" style={{ color: C.text }}>{r.amount}</td>
                  <td className="text-center" style={{ color: C.muted }}>{r.age}</td>
                  <td className="text-right"><StatusDot status={r.risk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      <Panel title="Customer-wise Margin Waterfall (₹/ton)">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={customerMargin}>
            <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="customer" stroke={C.muted} fontSize={11} />
            <YAxis stroke={C.muted} fontSize={11} />
            <Tooltip contentStyle={{ background: C.panelAlt, border: `1px solid ${C.border}`, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="gross" name="Gross" fill={C.copper} />
            <Bar dataKey="net" name="Net" fill={C.copperHi} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Deal Desk Workflow">
        <div className="grid grid-cols-4 gap-2">
          {[
            { step: 'Quote Request', val: 'Marubeni 4,200 t', color: C.muted },
            { step: 'Pricing Recommendation', val: '$2,612/t · +1.8% LME', color: C.blue },
            { step: 'Approval', val: 'Pending Comm Head', color: C.amber },
            { step: 'Margin Lock', val: '₹37,080/t', color: C.green },
          ].map((s, i) => (
            <div key={i} className="p-3 rounded-md border" style={{ background: C.panelAlt, borderColor: C.border }}>
              <div className="text-[10px] uppercase tracking-wider" style={{ color: C.muted }}>{s.step}</div>
              <div className="text-sm font-medium mt-1" style={{ color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
};

// ============ WORKFLOW Module ============
const WorkflowModule: React.FC = () => (
  <div className="p-6 space-y-4">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Panel title="Unified Inbox · cross-functional" className="lg:col-span-2">
        <div className="space-y-2">
          {topAlerts.slice(0, 4).map(a => (
            <div key={a.id} className="flex items-center gap-3 p-3 rounded-md border" style={{ background: C.panelAlt, borderColor: C.border }}>
              <Sev level={a.severity} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium" style={{ color: C.text }}>{a.title}</div>
                <div className="text-[10px]" style={{ color: C.muted }}>{a.module} · {a.owner}</div>
              </div>
              <div className="text-[10px]" style={{ color: C.amber }}><Clock className="w-3 h-3 inline mr-1" />SLA {a.sla}</div>
              <button style={{ background: C.copper }} className="text-[11px] px-3 py-1 rounded text-white">Act</button>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Impact Tracker">
        <div className="space-y-3">
          <div>
            <div className="text-[10px]" style={{ color: C.muted }}>Projected (MTD)</div>
            <div className="text-2xl font-semibold" style={{ color: C.text }}>₹42.8 Cr</div>
          </div>
          <div>
            <div className="text-[10px]" style={{ color: C.muted }}>Realised (MTD)</div>
            <div className="text-2xl font-semibold" style={{ color: C.copperHi }}>₹31.4 Cr</div>
          </div>
          <div className="pt-2 border-t" style={{ borderColor: C.border }}>
            <div className="text-[10px]" style={{ color: C.muted }}>Cumulative FY26</div>
            <div className="text-xl font-semibold" style={{ color: C.green }}>₹186.7 Cr</div>
          </div>
        </div>
      </Panel>
    </div>

    <Panel title="SLA & Escalation Rules">
      <table className="w-full text-xs">
        <thead><tr style={{ color: C.muted }}>
          <th className="text-left py-1">Decision Class</th><th>L1 SLA</th><th>L2 Escalation</th><th>L3 (CDO)</th><th>Threshold</th>
        </tr></thead>
        <tbody>
          {[
            { c: 'Alumina spot lift', l1: '4h', l2: 'Plant Head', l3: '8h', t: '>₹10 Cr' },
            { c: 'Energy variance', l1: '2h', l2: 'Smelter Head', l3: '6h', t: '>2% baseline' },
            { c: 'Single-source PR', l1: '24h', l2: 'CPO', l3: '48h', t: '>₹5 Cr' },
            { c: 'Margin lock approval', l1: '8h', l2: 'Comm Head', l3: '12h', t: '>₹5 Cr' },
            { c: 'AR escalation 60+', l1: '48h', l2: 'CFO desk', l3: '72h', t: '>₹2 Cr' },
          ].map(r => (
            <tr key={r.c} className="border-t" style={{ borderColor: C.border }}>
              <td className="py-2" style={{ color: C.text }}>{r.c}</td>
              <td style={{ color: C.amber }}>{r.l1}</td>
              <td style={{ color: C.text }}>{r.l2}</td>
              <td style={{ color: C.red }}>{r.l3}</td>
              <td style={{ color: C.muted }}>{r.t}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  </div>
);

// ============ AUDIT Module ============
const AuditModule: React.FC = () => (
  <div className="p-6 space-y-4">
    <Panel title="Decision Audit Log · who · when · why · impact">
      <table className="w-full text-xs">
        <thead><tr style={{ color: C.muted }}>
          <th className="text-left py-1">Timestamp</th><th>User · Role</th><th>Action</th><th>Target</th><th>Why</th><th className="text-right">Impact</th>
        </tr></thead>
        <tbody>
          {auditLog.map((l, i) => (
            <tr key={i} className="border-t" style={{ borderColor: C.border }}>
              <td className="py-2 font-mono text-[11px]" style={{ color: C.muted }}>{l.ts}</td>
              <td style={{ color: C.text }}>
                <div>{l.user}</div>
                <div className="text-[10px]" style={{ color: C.muted }}>{l.role}</div>
              </td>
              <td><span style={{ color: C.copperHi }} className="text-[11px] font-semibold">{l.action}</span></td>
              <td style={{ color: C.text }}>{l.target}</td>
              <td style={{ color: C.muted }} className="max-w-xs">{l.why}</td>
              <td className="text-right" style={{ color: C.green }}>{l.impact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
    <div className="flex items-center gap-2 text-xs" style={{ color: C.muted }}>
      <FileCheck className="w-4 h-4" /> Immutable log · WORM storage · Exported nightly to GRC system · Retention 7 yrs
    </div>
  </div>
);

// ============ PILOT 90-day ============
const PilotModule: React.FC = () => (
  <div className="p-6 space-y-4">
    <Panel title="90-day Pilot · KPI Progress">
      <table className="w-full text-xs">
        <thead><tr style={{ color: C.muted }}>
          <th className="text-left py-1">KPI</th><th className="text-right">Baseline</th><th className="text-right">Target</th><th className="text-right">Current</th><th>Progress</th><th className="text-right">Annualised Value (₹ Cr)</th>
        </tr></thead>
        <tbody>
          {pilot90Day.map(p => {
            const denom = (p.target - p.baseline);
            const progress = denom !== 0 ? Math.max(0, Math.min(100, ((p.current - p.baseline) / denom) * 100)) : 100;
            return (
              <tr key={p.kpi} className="border-t" style={{ borderColor: C.border }}>
                <td className="py-2" style={{ color: C.text }}>{p.kpi}</td>
                <td className="text-right" style={{ color: C.muted }}>{p.baseline}</td>
                <td className="text-right" style={{ color: C.alum }}>{p.target}</td>
                <td className="text-right" style={{ color: C.copperHi }}>{p.current}</td>
                <td className="w-48">
                  <div className="h-2 rounded-full" style={{ background: C.panelAlt }}>
                    <div className="h-2 rounded-full" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${C.copper}, ${C.copperHi})` }} />
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: C.muted }}>{progress.toFixed(0)}% of target</div>
                </td>
                <td className="text-right font-semibold" style={{ color: C.green }}>{p.value}</td>
              </tr>
            );
          })}
          <tr className="border-t" style={{ borderColor: C.borderHi }}>
            <td colSpan={5} className="py-3 text-right text-xs font-semibold" style={{ color: C.text }}>Total estimated annualised value</td>
            <td className="text-right text-base font-bold" style={{ color: C.green }}>₹{pilot90Day.reduce((s, p) => s + p.value, 0)} Cr</td>
          </tr>
        </tbody>
      </table>
    </Panel>
  </div>
);

// ============ SETTINGS ============
const SettingsModule: React.FC = () => (
  <div className="p-6 space-y-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Panel title="Roles & Permissions">
        <div className="space-y-2">
          {[
            { r: 'CDO / CXO', p: 'All modules · approve >₹10 Cr · audit export' },
            { r: 'Plant Head', p: 'Operations approve · Procurement view · approve <₹10 Cr' },
            { r: 'Procurement Manager', p: 'PR/PO workflow · supplier risk · single-source escalation' },
            { r: 'Commercial Manager', p: 'Deal desk · margin lock · AR escalation' },
            { r: 'Shift Supervisor', p: 'Line dashboards · downtime entry · alert acknowledge' },
          ].map(r => (
            <div key={r.r} className="p-2 rounded" style={{ background: C.panelAlt }}>
              <div className="text-xs font-medium" style={{ color: C.text }}>{r.r}</div>
              <div className="text-[10px]" style={{ color: C.muted }}>{r.p}</div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Thresholds & Escalation Rules">
        <div className="space-y-2 text-xs">
          {[
            ['Alumina coverage critical', '< 8 days'],
            ['Energy variance auto-alert', '> 1.5% vs 7d baseline'],
            ['Single-source PR concentration', '> 70%'],
            ['AR aging escalation', '> 60 days'],
            ['Margin lock auto-approve', '< ₹5 Cr & within band'],
            ['Slow-moving liquidation', 'aging > 180 days'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between p-2 rounded" style={{ background: C.panelAlt }}>
              <span style={{ color: C.text }}>{k}</span>
              <span style={{ color: C.copperHi }}>{v}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
    <Panel title="System Connections">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        {['SAP S/4 HANA', 'OSI PI Historian', 'Honeywell DCS', 'Wonderware MES', 'Ariba Sourcing', 'Salesforce Comm', 'Tally GRC', 'Power BI'].map(s => (
          <div key={s} className="flex items-center gap-2 p-2 rounded" style={{ background: C.panelAlt }}>
            <Database className="w-3 h-3" style={{ color: C.green }} />
            <span style={{ color: C.text }}>{s}</span>
            <StatusDot status="green" />
          </div>
        ))}
      </div>
    </Panel>
  </div>
);

// ============ AI Copilot Drawer ============
const Copilot: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [active, setActive] = useState(0);
  const [input, setInput] = useState('');
  if (!open) return null;
  const ans = copilotQA[active];
  return (
    <div className="fixed top-0 right-0 h-full w-full md:w-[440px] z-50 flex flex-col" style={{ background: C.panel, borderLeft: `1px solid ${C.borderHi}` }}>
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: C.border }}>
        <div className="flex items-center gap-2">
          <div style={{ background: `linear-gradient(135deg, ${C.copper}, ${C.copperHi})` }} className="w-7 h-7 rounded flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: C.text }}>AI Copilot</div>
            <div className="text-[10px]" style={{ color: C.muted }}>Decision Hub Assistant · v3.2</div>
          </div>
        </div>
        <button onClick={onClose} className="text-xs px-2 py-1 rounded" style={{ color: C.muted, border: `1px solid ${C.border}` }}>Close</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="text-[11px]" style={{ color: C.muted }}>Suggested questions</div>
        {copilotQA.map((q, i) => (
          <button key={i} onClick={() => setActive(i)} className="w-full text-left p-3 rounded-md text-xs" style={{ background: active === i ? C.panelAlt : 'transparent', border: `1px solid ${active === i ? C.borderHi : C.border}`, color: C.text }}>
            {q.q}
          </button>
        ))}

        <div className="mt-4 p-3 rounded-md" style={{ background: C.panelAlt, border: `1px solid ${C.border}` }}>
          <div className="text-xs leading-relaxed" style={{ color: C.text }}>{ans.a}</div>
          <div className="mt-3 pt-3 border-t" style={{ borderColor: C.border }}>
            <div className="text-[10px] mb-1" style={{ color: C.muted }}>Recommended actions</div>
            {ans.actions.map((a, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] py-0.5" style={{ color: C.copperHi }}>
                <ChevronRight className="w-3 h-3" />{a}
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t flex items-center justify-between text-[10px]" style={{ borderColor: C.border, color: C.muted }}>
            <span>Sources: {ans.sources.join(' · ')}</span>
            <span style={{ color: C.green }}>Confidence {(ans.confidence * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      <div className="p-3 border-t flex items-center gap-2" style={{ borderColor: C.border }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything about ops, procurement, margins…" className="flex-1 px-3 py-2 text-xs rounded" style={{ background: C.panelAlt, border: `1px solid ${C.border}`, color: C.text }} />
        <button style={{ background: C.copper }} className="p-2 rounded text-white"><Send className="w-4 h-4" /></button>
      </div>
    </div>
  );
};

// ============ MAIN ============
const VedantaDecisionHub: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [active, setActive] = useState<ModuleId>('home');
  const [copilot, setCopilot] = useState(false);

  const nav: { id: ModuleId; label: string; icon: any }[] = [
    { id: 'home', label: 'Command Center', icon: LayoutDashboard },
    { id: 'ops', label: 'Operations', icon: Factory },
    { id: 'proc', label: 'Procurement', icon: Package },
    { id: 'comm', label: 'Commercial', icon: TrendingUp },
    { id: 'workflow', label: 'Workflows', icon: Workflow },
    { id: 'audit', label: 'Decision Audit', icon: ScrollText },
    { id: 'pilot', label: '90-Day Pilot', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!loggedIn) return (
    <>
      <Helmet><title>Vedanta Aluminium · Decision Hub</title></Helmet>
      <LoginScreen onLogin={(r) => { setRole(r); setLoggedIn(true); }} />
    </>
  );

  const moduleTitle = nav.find(n => n.id === active)?.label;

  return (
    <>
      <Helmet><title>Vedanta Decision Hub · {moduleTitle}</title></Helmet>
      <div className="min-h-screen flex" style={{ background: C.bg, color: C.text, fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* Sidebar */}
        <aside className="w-60 flex flex-col border-r" style={{ background: C.panel, borderColor: C.border }}>
          <div className="p-5 border-b flex items-center gap-3" style={{ borderColor: C.border }}>
            <div style={{ background: `linear-gradient(135deg, ${C.copper}, ${C.copperHi})` }} className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white">V</div>
            <div>
              <div className="text-sm font-semibold">Vedanta Aluminium</div>
              <div className="text-[10px]" style={{ color: C.muted }}>Decision Hub</div>
            </div>
          </div>
          <nav className="flex-1 p-2">
            {nav.map(n => (
              <button key={n.id} onClick={() => setActive(n.id)} className="w-full flex items-center gap-3 px-3 py-2 my-0.5 rounded-md text-sm transition-colors" style={{ background: active === n.id ? C.panelAlt : 'transparent', color: active === n.id ? C.copperHi : C.alum, borderLeft: active === n.id ? `2px solid ${C.copper}` : '2px solid transparent' }}>
                <n.icon className="w-4 h-4" />
                {n.label}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t" style={{ borderColor: C.border }}>
            <div className="flex items-center gap-2 p-2 rounded" style={{ background: C.panelAlt }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold" style={{ background: C.copper, color: 'white' }}>AP</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs truncate" style={{ color: C.text }}>A. Patnaik</div>
                <div className="text-[10px]" style={{ color: C.muted }}>{role}</div>
              </div>
              <button onClick={() => setLoggedIn(false)} title="Sign out"><LogOut className="w-3.5 h-3.5" style={{ color: C.muted }} /></button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 flex flex-col">
          {/* Top bar */}
          <header className="h-14 flex items-center justify-between px-6 border-b" style={{ background: C.panel, borderColor: C.border }}>
            <div className="flex items-center gap-3">
              <h1 className="text-base font-semibold">{moduleTitle}</h1>
              <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(199,123,61,0.12)', color: C.copperHi }}>Jharsuguda Smelter · IST {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5" style={{ color: C.muted }} />
                <input placeholder="Search decisions, alerts, suppliers…" className="pl-8 pr-3 py-1.5 text-xs rounded w-64" style={{ background: C.panelAlt, border: `1px solid ${C.border}`, color: C.text }} />
              </div>
              <button className="relative p-1.5 rounded" style={{ background: C.panelAlt }}>
                <Bell className="w-4 h-4" style={{ color: C.alum }} />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{ background: C.red }} />
              </button>
              <button onClick={() => setCopilot(true)} style={{ background: `linear-gradient(135deg, ${C.copper}, ${C.copperHi})` }} className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium text-white">
                <Sparkles className="w-3.5 h-3.5" /> AI Copilot
              </button>
            </div>
          </header>

          {/* KPI strip — visible on home & most modules */}
          {active !== 'settings' && active !== 'audit' && <KpiStrip />}

          <div className="flex-1 overflow-y-auto">
            {active === 'home' && <HomeModule />}
            {active === 'ops' && <OpsModule />}
            {active === 'proc' && <ProcModule />}
            {active === 'comm' && <CommModule />}
            {active === 'workflow' && <WorkflowModule />}
            {active === 'audit' && <AuditModule />}
            {active === 'pilot' && <PilotModule />}
            {active === 'settings' && <SettingsModule />}
          </div>
        </main>

        <Copilot open={copilot} onClose={() => setCopilot(false)} />
      </div>
    </>
  );
};

export default VedantaDecisionHub;
