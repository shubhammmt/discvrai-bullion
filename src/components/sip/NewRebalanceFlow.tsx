import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from 'recharts';
import {
  AlertTriangle, TrendingDown, TrendingUp, ShieldCheck, Sparkles,
  ChevronDown, ChevronUp, ArrowRight, ArrowLeft, CheckCircle2,
  Info, Wallet, Repeat, BadgeCheck, CircleDollarSign, Banknote,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

// ---------- Mock data ----------
const PORTFOLIO_VALUE = 480000;
const SECTOR_ALLOC = [
  { name: 'Banks', value: 22.6, recommended: 18, color: '#ef4444' },
  { name: 'IT', value: 18.4, recommended: 18, color: '#6366f1' },
  { name: 'FMCG', value: 14.2, recommended: 15, color: '#10b981' },
  { name: 'Auto', value: 11.8, recommended: 12, color: '#f59e0b' },
  { name: 'Pharma', value: 10.0, recommended: 12, color: '#06b6d4' },
  { name: 'Energy', value: 8.5, recommended: 10, color: '#8b5cf6' },
  { name: 'Others', value: 14.5, recommended: 15, color: '#94a3b8' },
];
const AFTER_ALLOC = [
  { name: 'Banks', value: 17.8, color: '#10b981' },
  { name: 'IT', value: 18.2, color: '#6366f1' },
  { name: 'FMCG', value: 14.9, color: '#10b981' },
  { name: 'Auto', value: 12.1, color: '#f59e0b' },
  { name: 'Pharma', value: 11.6, color: '#06b6d4' },
  { name: 'Energy', value: 10.2, color: '#8b5cf6' },
  { name: 'Others', value: 15.2, color: '#94a3b8' },
];
const CONTRIB_FUNDS = [
  { name: 'HDFC Banking & Financial Services', value: 78000, sector: 'Banks', exposure: 9.4, trim: 18000 },
  { name: 'ICICI Pru Banking & Fin Serv', value: 62000, sector: 'Banks', exposure: 7.2, trim: 14000 },
  { name: 'Nippon Large Cap', value: 84000, sector: 'Banks-heavy', exposure: 6.0, trim: 8000 },
];
const SELL_LEGS = [
  { fund: 'HDFC Banking & Fin Serv', current: 78000, reduce: 18000, reason: 'Largest contributor to Banks overweight' },
  { fund: 'ICICI Pru Banking & Fin Serv', current: 62000, reduce: 14000, reason: 'Sector overlap with HDFC Banking' },
  { fund: 'Nippon Large Cap', current: 84000, reduce: 8000, reason: 'High Banks tilt within large cap basket' },
];
const BUY_LEGS = [
  { fund: 'Parag Parikh Flexi Cap', amount: 22000, category: 'Flexi Cap', score: 92, rationale: 'Adds international + diversified equity exposure' },
  { fund: 'UTI Nifty Next 50 Index', amount: 12000, category: 'Index', score: 88, rationale: 'Low-cost diversification beyond top 50 banks-heavy index' },
  { fund: 'ICICI Pru Pharma Healthcare', amount: 6000, category: 'Sectoral - Pharma', score: 81, rationale: 'Adds underweight Pharma exposure' },
];
const SIP_CHANGES = {
  totalBefore: 15000,
  totalAfter: 15000,
  existing: [
    { fund: 'Nippon Large Cap', before: 10000, after: 6000, action: 'REDUCE_SIP', reason: 'Reduce Banks-tilted large cap weight' },
    { fund: 'HDFC Top 100', before: 5000, after: 5000, action: 'KEEP', reason: 'Already well diversified' },
  ],
  added: [
    { fund: 'Parag Parikh Flexi Cap', amount: 4000, rationale: 'Best diversifier across geographies' },
  ],
};

// ---------- Shared UI ----------
const fmtINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

function SoftCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn(
      'rounded-2xl border border-border bg-card shadow-sm',
      className,
    )}>{children}</div>
  );
}

function SeverityPill({ level }: { level: 'warning' | 'critical' | 'good' }) {
  const map = {
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    critical: 'bg-red-50 text-red-700 border-red-200',
    good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  } as const;
  const label = level === 'warning' ? 'Warning' : level === 'critical' ? 'Critical' : 'Healthy';
  return <span className={cn('text-[11px] font-semibold px-2.5 py-1 rounded-full border', map[level])}>{label}</span>;
}

function Stepper({ step }: { step: number }) {
  const labels = ['Alert', 'Plan', 'SIPs', 'Review', 'Done'];
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 w-full">
      {labels.map((l, i) => {
        const active = i + 1 === step;
        const done = i + 1 < step;
        return (
          <div key={l} className="flex items-center gap-1.5 sm:gap-2 flex-1">
            <div className={cn(
              'flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-colors flex-1 justify-center',
              active ? 'bg-foreground text-background' :
              done ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground',
            )}>
              {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-4 text-center">{i + 1}</span>}
              <span className="hidden sm:inline">{l}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StickyActionBar({ primary, secondary, onPrimary, onSecondary }: {
  primary: string; secondary?: string; onPrimary: () => void; onSecondary?: () => void;
}) {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur border-t border-border -mx-4 sm:mx-0 sm:rounded-2xl sm:border sm:mt-6 px-4 py-3 sm:px-4">
      <div className="flex items-center gap-2 max-w-3xl mx-auto">
        {secondary && (
          <Button variant="ghost" className="flex-1 sm:flex-none" onClick={onSecondary}>
            {secondary}
          </Button>
        )}
        <Button className="flex-1 bg-foreground text-background hover:bg-foreground/90 h-11 rounded-xl font-semibold" onClick={onPrimary}>
          {primary}
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    </div>
  );
}

function DonutChart({ data, highlightSector }: { data: typeof SECTOR_ALLOC | typeof AFTER_ALLOC; highlightSector?: string }) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((d, i) => (
              <Cell key={i} fill={highlightSector === d.name ? '#ef4444' : d.color} />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => `${v}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// ---------- Page 1: Alert Dashboard ----------
function Page1Alert({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pb-20">
      <SoftCard className="overflow-hidden">
        <div className="p-5 bg-gradient-to-br from-red-50 via-amber-50 to-white">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <SeverityPill level="critical" />
                <h2 className="mt-2 text-lg sm:text-xl font-semibold text-foreground leading-snug">
                  Your portfolio has high exposure to <span className="text-red-600">Banks</span>
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Concentration above your recommended diversification threshold.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="rounded-xl bg-white/80 backdrop-blur p-3 border border-border">
              <div className="text-[11px] text-muted-foreground">Current Banks exposure</div>
              <div className="text-2xl font-semibold text-red-600 mt-1">22.6%</div>
            </div>
            <div className="rounded-xl bg-white/80 backdrop-blur p-3 border border-border">
              <div className="text-[11px] text-muted-foreground">Recommended max</div>
              <div className="text-2xl font-semibold text-emerald-600 mt-1">18%</div>
            </div>
          </div>
        </div>
      </SoftCard>

      <SoftCard className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-foreground">Sector allocation</h3>
          <Badge variant="outline" className="text-[10px]">Overweight highlighted</Badge>
        </div>
        <DonutChart data={SECTOR_ALLOC} highlightSector="Banks" />
        <div className="grid grid-cols-2 gap-2 mt-2">
          {SECTOR_ALLOC.map(s => (
            <div key={s.name} className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.name === 'Banks' ? '#ef4444' : s.color }} />
              <span className="text-muted-foreground flex-1 truncate">{s.name}</span>
              <span className={cn('font-medium', s.name === 'Banks' && 'text-red-600')}>{s.value}%</span>
            </div>
          ))}
        </div>
      </SoftCard>

      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: TrendingUp, label: 'Banks exposure', value: '22.6%', tone: 'text-red-600' },
          { icon: ShieldCheck, label: 'Safe ceiling', value: '18%', tone: 'text-emerald-600' },
          { icon: Wallet, label: 'Funds driving risk', value: '3', tone: 'text-foreground' },
          { icon: Sparkles, label: 'Diversification ↑', value: '+12 pts', tone: 'text-emerald-600' },
        ].map((c, i) => (
          <SoftCard key={i} className="p-3">
            <c.icon className="w-4 h-4 text-muted-foreground" />
            <div className="text-[11px] text-muted-foreground mt-2">{c.label}</div>
            <div className={cn('text-lg font-semibold', c.tone)}>{c.value}</div>
          </SoftCard>
        ))}
      </div>

      <SoftCard className="p-4 sm:p-5">
        <h3 className="font-semibold text-foreground mb-3">Funds contributing to concentration</h3>
        <div className="space-y-2.5">
          {CONTRIB_FUNDS.map(f => (
            <div key={f.name} className="rounded-xl border border-border p-3 hover:border-foreground/20 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{f.name}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{f.sector} • {fmtINR(f.value)}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-muted-foreground">Trim</div>
                  <div className="text-sm font-semibold text-red-600">−{fmtINR(f.trim)}</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Progress value={f.exposure * 4} className="h-1.5 flex-1" />
                <span className="text-[11px] text-muted-foreground">{f.exposure}%</span>
              </div>
            </div>
          ))}
        </div>
      </SoftCard>

      <StickyActionBar primary="Review Rebalance Plan" secondary="Skip for now" onPrimary={onNext} onSecondary={onSkip} />
    </motion.div>
  );
}

// ---------- Page 2: Recommendation ----------
function Page2Plan({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [showDetails, setShowDetails] = useState(false);
  const total = SELL_LEGS.reduce((s, l) => s + l.reduce, 0);
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pb-20">
      <SoftCard className="p-5 bg-gradient-to-br from-emerald-50 to-white">
        <div className="text-xs text-muted-foreground uppercase tracking-wide">Recommended redistribution</div>
        <div className="text-2xl font-semibold text-foreground mt-1">{fmtINR(total)}</div>
        <p className="text-sm text-muted-foreground mt-1">
          Move from concentrated Banks exposure into diversified equity baskets.
        </p>
      </SoftCard>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="w-4 h-4 text-red-500" />
          <h3 className="font-semibold text-sm">Reduce</h3>
        </div>
        <div className="space-y-2.5">
          {SELL_LEGS.map(s => (
            <SoftCard key={s.fund} className="p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{s.fund}</div>
                  <div className="text-[11px] text-muted-foreground">Holding {fmtINR(s.current)}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-muted-foreground">Reduce by</div>
                  <div className="text-sm font-semibold text-red-600">{fmtINR(s.reduce)}</div>
                </div>
              </div>
              <div className="mt-2 text-[12px] text-muted-foreground bg-muted/40 rounded-lg p-2">{s.reason}</div>
            </SoftCard>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <h3 className="font-semibold text-sm">Add</h3>
        </div>
        <div className="space-y-2.5">
          {BUY_LEGS.map(b => (
            <SoftCard key={b.fund} className="p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{b.fund}</div>
                  <div className="text-[11px] text-muted-foreground">{b.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-muted-foreground">Invest</div>
                  <div className="text-sm font-semibold text-emerald-600">{fmtINR(b.amount)}</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 text-[10px]" variant="outline">
                  Diversification {b.score}/100
                </Badge>
              </div>
              <div className="mt-2 text-[12px] text-muted-foreground bg-muted/40 rounded-lg p-2">{b.rationale}</div>
            </SoftCard>
          ))}
        </div>
      </div>

      <SoftCard className="p-4">
        <h3 className="font-semibold text-sm mb-3">Before vs After</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[11px] text-muted-foreground mb-1 text-center">Before</div>
            <DonutChart data={SECTOR_ALLOC} highlightSector="Banks" />
            <div className="text-center text-xs">
              <span className="text-red-600 font-semibold">Banks 22.6%</span>
            </div>
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground mb-1 text-center">After</div>
            <DonutChart data={AFTER_ALLOC} />
            <div className="text-center text-xs">
              <span className="text-emerald-600 font-semibold">Banks 17.8%</span>
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-muted/40 p-2 text-center">
            <div className="text-[10px] text-muted-foreground">Concentration risk</div>
            <div className="text-sm font-semibold text-emerald-600">↓ 21%</div>
          </div>
          <div className="rounded-lg bg-muted/40 p-2 text-center">
            <div className="text-[10px] text-muted-foreground">Diversification score</div>
            <div className="text-sm font-semibold text-emerald-600">68 → 80</div>
          </div>
        </div>
      </SoftCard>

      <SoftCard className="p-4 bg-gradient-to-br from-indigo-50/60 to-white">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-500 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-indigo-700">Why this plan</div>
            <p className="text-sm text-foreground/80 leading-relaxed mt-1">
              We're trimming Banks-heavy funds and redirecting into a flexi-cap, a broader index and a small
              tactical pharma allocation. This brings Banks back below 18% while preserving your equity exposure.
            </p>
          </div>
        </div>
      </SoftCard>

      <SoftCard>
        <button
          onClick={() => setShowDetails(s => !s)}
          className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium"
        >
          <span>Advanced: scoring & candidate ranking</span>
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 text-xs text-muted-foreground space-y-2">
                <div className="rounded-lg bg-muted/40 p-2.5">
                  <b className="text-foreground">Gate eliminations:</b> exited 7 candidates on AUM (&lt;500 Cr), 4 on overlap (&gt;60%), 3 on expense ratio.
                </div>
                <div className="rounded-lg bg-muted/40 p-2.5">
                  <b className="text-foreground">Top rankings:</b> Parag Parikh Flexi (0.92), UTI Nifty Next 50 (0.88), ICICI Pharma Healthcare (0.81).
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SoftCard>

      <StickyActionBar primary="Review SIP Changes" secondary="Back" onPrimary={onNext} onSecondary={onBack} />
    </motion.div>
  );
}

// ---------- Page 3: SIP Redistribution ----------
function Page3SIPs({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pb-20">
      <SoftCard className="p-5 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 border-emerald-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <BadgeCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Budget-neutral rebalance</div>
            <h3 className="font-semibold text-foreground mt-0.5">Your monthly SIP stays at {fmtINR(SIP_CHANGES.totalAfter)}</h3>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="rounded-lg bg-white p-2.5 border border-border">
                <div className="text-[10px] text-muted-foreground">Before</div>
                <div className="text-base font-semibold">{fmtINR(SIP_CHANGES.totalBefore)}/mo</div>
              </div>
              <div className="rounded-lg bg-white p-2.5 border border-border">
                <div className="text-[10px] text-muted-foreground">After</div>
                <div className="text-base font-semibold text-emerald-600">{fmtINR(SIP_CHANGES.totalAfter)}/mo</div>
              </div>
            </div>
          </div>
        </div>
      </SoftCard>

      <SoftCard className="p-4">
        <h3 className="font-semibold text-sm mb-3">SIP redistribution flow</h3>
        <div className="space-y-3">
          {SIP_CHANGES.existing.filter(s => s.action !== 'KEEP').map(s => (
            <div key={s.fund} className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground">From</div>
                <div className="text-sm font-medium truncate">{s.fund}</div>
                <div className="text-xs">{fmtINR(s.before)} → <span className="text-red-600 font-semibold">{fmtINR(s.after)}</span></div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground">To</div>
                <div className="text-sm font-medium truncate">{SIP_CHANGES.added[0].fund}</div>
                <div className="text-xs"><span className="text-emerald-600 font-semibold">+{fmtINR(SIP_CHANGES.added[0].amount)}</span></div>
              </div>
            </div>
          ))}
        </div>
      </SoftCard>

      <div>
        <h3 className="font-semibold text-sm mb-2 flex items-center gap-2"><Repeat className="w-4 h-4" />Existing SIP adjustments</h3>
        <div className="space-y-2.5">
          {SIP_CHANGES.existing.map(s => (
            <SoftCard key={s.fund} className="p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm truncate">{s.fund}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{s.reason}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-muted-foreground">{fmtINR(s.before)} →</div>
                  <div className={cn('text-sm font-semibold', s.after < s.before ? 'text-red-600' : 'text-foreground')}>
                    {fmtINR(s.after)}
                  </div>
                </div>
              </div>
              {s.action !== 'KEEP' && (
                <Badge variant="outline" className="mt-2 text-[10px] bg-amber-50 text-amber-700 border-amber-200">{s.action.replace('_', ' ')}</Badge>
              )}
            </SoftCard>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4 text-emerald-600" />New SIPs</h3>
        <div className="space-y-2.5">
          {SIP_CHANGES.added.map(a => (
            <SoftCard key={a.fund} className="p-3.5 border-emerald-200 bg-emerald-50/30">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm truncate">{a.fund}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{a.rationale}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-muted-foreground">New SIP</div>
                  <div className="text-sm font-semibold text-emerald-600">+{fmtINR(a.amount)}</div>
                </div>
              </div>
              <Badge variant="outline" className="mt-2 text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">START SIP</Badge>
            </SoftCard>
          ))}
        </div>
      </div>

      <SoftCard className="p-4">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-indigo-500 mt-0.5" />
          <div className="text-xs text-muted-foreground leading-relaxed">
            <b className="text-foreground">Why two parts?</b> The lump-sum rebalance fixes today's allocation,
            while the SIP redistribution prevents the same concentration from re-building over time.
            Your monthly outflow doesn't change.
          </div>
        </div>
      </SoftCard>

      <StickyActionBar primary="Approve Rebalance" secondary="Back" onPrimary={onNext} onSecondary={onBack} />
    </motion.div>
  );
}

// ---------- Page 4: Final Review ----------
function Page4Review({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);
  const [c3, setC3] = useState(false);
  const allChecked = c1 && c2 && c3;
  const sellTotal = SELL_LEGS.reduce((s, l) => s + l.reduce, 0);
  const buyTotal = BUY_LEGS.reduce((s, l) => s + l.amount, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pb-20">
      <SoftCard className="p-4">
        <h3 className="font-semibold text-sm mb-3">Portfolio impact</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-emerald-50 p-2.5 text-center">
            <div className="text-[10px] text-emerald-700">Risk</div>
            <div className="text-sm font-semibold text-emerald-700">↓ 21%</div>
          </div>
          <div className="rounded-lg bg-emerald-50 p-2.5 text-center">
            <div className="text-[10px] text-emerald-700">Diversification</div>
            <div className="text-sm font-semibold text-emerald-700">+12 pts</div>
          </div>
          <div className="rounded-lg bg-emerald-50 p-2.5 text-center">
            <div className="text-[10px] text-emerald-700">Banks</div>
            <div className="text-sm font-semibold text-emerald-700">22.6→17.8%</div>
          </div>
        </div>
      </SoftCard>

      <SoftCard className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm">One-time transactions</h3>
          <Badge variant="outline" className="text-[10px]">{fmtINR(sellTotal + buyTotal)}</Badge>
        </div>
        <div className="space-y-2">
          <div>
            <div className="text-[11px] text-red-600 font-medium uppercase mb-1">Sell</div>
            {SELL_LEGS.map(s => (
              <div key={s.fund} className="flex justify-between text-xs py-1 border-b border-border/60 last:border-0">
                <span className="truncate flex-1">{s.fund}</span>
                <span className="font-semibold text-red-600">−{fmtINR(s.reduce)}</span>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <div className="text-[11px] text-emerald-600 font-medium uppercase mb-1">Buy</div>
            {BUY_LEGS.map(b => (
              <div key={b.fund} className="flex justify-between text-xs py-1 border-b border-border/60 last:border-0">
                <span className="truncate flex-1">{b.fund}</span>
                <span className="font-semibold text-emerald-600">+{fmtINR(b.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </SoftCard>

      <SoftCard className="p-4">
        <h3 className="font-semibold text-sm mb-2">SIP changes</h3>
        {SIP_CHANGES.existing.filter(s => s.action !== 'KEEP').map(s => (
          <div key={s.fund} className="flex justify-between text-xs py-1.5 border-b border-border/60">
            <span className="truncate flex-1">{s.fund}</span>
            <span className="text-muted-foreground">{fmtINR(s.before)} → <b className="text-foreground">{fmtINR(s.after)}</b></span>
          </div>
        ))}
        {SIP_CHANGES.added.map(a => (
          <div key={a.fund} className="flex justify-between text-xs py-1.5">
            <span className="truncate flex-1">{a.fund} <Badge variant="outline" className="ml-1 text-[9px] bg-emerald-50 text-emerald-700 border-emerald-200">NEW</Badge></span>
            <span className="font-semibold text-emerald-600">+{fmtINR(a.amount)}</span>
          </div>
        ))}
      </SoftCard>

      <SoftCard className="p-4 bg-gradient-to-br from-emerald-50/60 to-white">
        <div className="flex items-center gap-2">
          <CircleDollarSign className="w-4 h-4 text-emerald-600" />
          <h3 className="font-semibold text-sm">Monthly cashflow</h3>
        </div>
        <p className="text-sm text-foreground/80 mt-1">
          Your SIP outflow stays at <b className="text-emerald-700">{fmtINR(SIP_CHANGES.totalAfter)}/month</b>.
        </p>
      </SoftCard>

      <SoftCard className="p-4 space-y-3">
        <h3 className="font-semibold text-sm">Consent</h3>
        {[
          { v: c1, set: setC1, label: 'I understand mutual fund investments carry market risk.' },
          { v: c2, set: setC2, label: 'I approve the SIP modifications shown above.' },
          { v: c3, set: setC3, label: 'I understand these recommendations are advisory.' },
        ].map((c, i) => (
          <label key={i} className="flex items-start gap-2.5 text-xs cursor-pointer">
            <Checkbox checked={c.v} onCheckedChange={v => c.set(!!v)} className="mt-0.5" />
            <span className="text-muted-foreground leading-relaxed">{c.label}</span>
          </label>
        ))}
      </SoftCard>

      <div className="sticky bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur border-t border-border -mx-4 sm:mx-0 sm:rounded-2xl sm:border sm:mt-6 px-4 py-3">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <Button variant="ghost" className="flex-1 sm:flex-none" onClick={onBack}>Back</Button>
          <Button
            disabled={!allChecked}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-11 rounded-xl font-semibold disabled:opacity-50"
            onClick={onNext}
          >
            Confirm Rebalance
            <CheckCircle2 className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ---------- Page 5: Success ----------
function Page5Success({ onDone }: { onDone: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4 pb-20">
      <SoftCard className="p-8 text-center bg-gradient-to-br from-emerald-50 to-white">
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center"
        >
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </motion.div>
        <h2 className="text-xl font-semibold mt-4">Rebalance submitted</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Orders are queued for today's NAV cutoff. SIP changes will apply from next cycle.
        </p>
      </SoftCard>

      <div className="grid grid-cols-2 gap-3">
        <SoftCard className="p-3">
          <Banknote className="w-4 h-4 text-muted-foreground" />
          <div className="text-[11px] text-muted-foreground mt-2">Redistributed</div>
          <div className="text-base font-semibold">{fmtINR(40000)}</div>
        </SoftCard>
        <SoftCard className="p-3">
          <Repeat className="w-4 h-4 text-muted-foreground" />
          <div className="text-[11px] text-muted-foreground mt-2">SIPs modified</div>
          <div className="text-base font-semibold">2 + 1 new</div>
        </SoftCard>
        <SoftCard className="p-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <div className="text-[11px] text-muted-foreground mt-2">Concentration</div>
          <div className="text-base font-semibold text-emerald-600">↓ 21%</div>
        </SoftCard>
        <SoftCard className="p-3">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <div className="text-[11px] text-muted-foreground mt-2">Diversification</div>
          <div className="text-base font-semibold text-emerald-600">+12 pts</div>
        </SoftCard>
      </div>

      <SoftCard className="p-4">
        <div className="text-xs text-muted-foreground">Next portfolio review</div>
        <div className="text-sm font-semibold mt-0.5">In 30 days · auto-check for drift</div>
      </SoftCard>

      <Button
        onClick={onDone}
        className="w-full h-11 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-semibold"
      >
        Return to Portfolio
      </Button>
    </motion.div>
  );
}

// ---------- Root ----------
export function NewRebalanceFlow({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Smart Rebalance</h1>
        <p className="text-sm text-muted-foreground">Calm, transparent portfolio diversification.</p>
      </div>
      <div className="mb-5">
        <Stepper step={step} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step}>
          {step === 1 && <Page1Alert onNext={() => setStep(2)} onSkip={() => onExit?.()} />}
          {step === 2 && <Page2Plan onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <Page3SIPs onNext={() => setStep(4)} onBack={() => setStep(2)} />}
          {step === 4 && <Page4Review onNext={() => setStep(5)} onBack={() => setStep(3)} />}
          {step === 5 && <Page5Success onDone={() => onExit?.()} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default NewRebalanceFlow;
