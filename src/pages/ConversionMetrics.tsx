import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp, Sparkles, Search, ShoppingCart, BarChart3, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Metric {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}

const PILLARS: { id: string; title: string; icon: any; color: string; metrics: Metric[]; funnel: { stage: string; pct: number }[] }[] = [
  {
    id: 'discovery', title: 'Discovery', icon: Search, color: 'sky',
    metrics: [
      { label: 'Time-to-first-shortlist', value: '14s', delta: '-62%', positive: true },
      { label: 'Shortlist → Buy %', value: '38%', delta: '+11pp', positive: true },
      { label: 'Why-this-fund opens', value: '71%', delta: '+71pp', positive: true },
    ],
    funnel: [
      { stage: 'Search opened', pct: 100 },
      { stage: 'Shortlist viewed', pct: 84 },
      { stage: '"Why" expanded', pct: 71 },
      { stage: 'Compare used', pct: 32 },
      { stage: 'Buy clicked', pct: 38 },
    ],
  },
  {
    id: 'execution', title: 'Execution', icon: ShoppingCart, color: 'emerald',
    metrics: [
      { label: 'Initiate → Complete %', value: '76%', delta: '+18pp', positive: true },
      { label: 'Step 4 drop-off', value: '6%', delta: '-9pp', positive: true },
      { label: 'Resume-card recovery', value: '24%', delta: 'new', positive: true },
    ],
    funnel: [
      { stage: 'Wizard started', pct: 100 },
      { stage: 'Step 2 (amount)', pct: 92 },
      { stage: 'Step 3 (mandate)', pct: 84 },
      { stage: 'Step 4 (review)', pct: 80 },
      { stage: 'Order placed', pct: 76 },
    ],
  },
  {
    id: 'portfolio', title: 'Portfolio Intelligence', icon: BarChart3, color: 'purple',
    metrics: [
      { label: 'Insight → Action accept %', value: '41%', delta: '+41pp', positive: true },
      { label: 'Impact-preview opens', value: '63%', delta: 'new', positive: true },
      { label: 'Drift→Rebalance time', value: '2.1 days', delta: '-5d', positive: true },
    ],
    funnel: [
      { stage: 'Action card shown', pct: 100 },
      { stage: 'Impact previewed', pct: 63 },
      { stage: 'Action executed', pct: 41 },
      { stage: 'Outcome confirmed', pct: 38 },
    ],
  },
  {
    id: 'engagement', title: 'Engagement', icon: Bell, color: 'amber',
    metrics: [
      { label: 'Nudge → Action %', value: '29%', delta: '+22pp', positive: true },
      { label: 'Digest open rate', value: '68%', delta: 'new', positive: true },
      { label: 'Inactive-user re-engage', value: '34%', delta: '+34pp', positive: true },
    ],
    funnel: [
      { stage: 'Alert sent', pct: 100 },
      { stage: 'Alert opened', pct: 64 },
      { stage: 'CTA clicked', pct: 41 },
      { stage: 'Action completed', pct: 29 },
    ],
  },
];

const COLOR_MAP: Record<string, { bg: string; text: string; bar: string }> = {
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', bar: 'bg-sky-500' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', bar: 'bg-emerald-500' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', bar: 'bg-purple-500' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', bar: 'bg-amber-500' },
};

export default function ConversionMetrics() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        <header className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sip-brand" />
              <h1 className="text-2xl font-bold text-foreground">Conversion Metrics</h1>
              <Badge variant="outline">Mock · Demo</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Per-pillar funnels showing how the agentic + webapp widget pattern lifts conversion vs control.</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase text-muted-foreground tracking-wider">Overall lift</p>
            <p className="text-3xl font-bold text-emerald-600">+47%</p>
            <p className="text-[10px] text-muted-foreground">Discovery → Order placed (vs control cohort)</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {PILLARS.map(p => {
            const c = COLOR_MAP[p.color];
            const Icon = p.icon;
            return (
              <Card key={p.id} className="border-sip-border">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', c.bg)}>
                      <Icon className={cn('w-4 h-4', c.text)} />
                    </div>
                    <h2 className="text-base font-bold text-foreground">{p.title}</h2>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {p.metrics.map(m => (
                      <div key={m.label} className="p-2 rounded-lg border border-border bg-muted/20">
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground line-clamp-1">{m.label}</p>
                        <p className="text-lg font-bold text-foreground mt-0.5">{m.value}</p>
                        <p className={cn('text-[10px] flex items-center gap-0.5', m.positive ? 'text-emerald-600' : 'text-red-600')}>
                          {m.positive ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />} {m.delta}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Funnel</p>
                    <div className="space-y-1.5">
                      {p.funnel.map(f => (
                        <div key={f.stage} className="flex items-center gap-2">
                          <span className="text-[11px] text-foreground w-36 shrink-0">{f.stage}</span>
                          <div className="flex-1 h-4 bg-muted rounded-sm overflow-hidden">
                            <div className={cn('h-full rounded-sm transition-all', c.bar)} style={{ width: `${f.pct}%` }} />
                          </div>
                          <span className="text-[11px] font-mono text-foreground w-10 text-right">{f.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-dashed">
          <CardContent className="p-4 text-xs text-muted-foreground">
            Numbers are <b>illustrative mocks</b> for client demos. Live instrumentation will fire from the conversion widget library —
            each <code className="px-1 py-0.5 bg-muted rounded">SmartShortlist</code>, <code className="px-1 py-0.5 bg-muted rounded">ActionCard</code>,
            <code className="px-1 py-0.5 bg-muted rounded">AlertCard</code> and wizard step emits a tracking event.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
