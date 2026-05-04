import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Receipt, TrendingUp, Coins, Shield, Sparkles, Banknote, Zap, Award } from 'lucide-react';
import { MOCK_FUNDS, MutualFund } from '@/data/sipMockData';
import { cn } from '@/lib/utils';

type ShelfId = 'tax' | 'top-returns' | 'low-expense' | 'top-rated' | 'liquid' | 'large-cap' | 'thematic';

interface Shelf {
  id: ShelfId;
  label: string;
  short: string;
  icon: typeof Receipt;
  tone: string;
  pick: (funds: MutualFund[]) => MutualFund[];
  badge: (f: MutualFund) => string;
}

const SHELVES: Shelf[] = [
  {
    id: 'tax', label: 'Tax Saving (ELSS)', short: 'Save tax u/s 80C', icon: Receipt, tone: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30',
    pick: f => f.filter(x => x.category === 'ELSS' || x.name.toLowerCase().includes('elss') || x.amc.toLowerCase().includes('axis')).slice(0, 4),
    badge: f => `3Y ${f.returns3Y}%`,
  },
  {
    id: 'top-returns', label: 'Top Returns (3Y)', short: 'Highest 3-year CAGR', icon: TrendingUp, tone: 'text-sip-success bg-sip-success/10 border-sip-success/30',
    pick: f => [...f].sort((a, b) => b.returns3Y - a.returns3Y).slice(0, 4),
    badge: f => `${f.returns3Y}% CAGR`,
  },
  {
    id: 'low-expense', label: 'Lowest Expense', short: 'Maximise long-term compounding', icon: Coins, tone: 'text-sip-brand bg-sip-brand/10 border-sip-brand/30',
    pick: f => [...f].sort((a, b) => a.expenseRatio - b.expenseRatio).slice(0, 4),
    badge: f => `${f.expenseRatio}% TER`,
  },
  {
    id: 'top-rated', label: 'Top Rated 5★', short: 'Highest analyst rating', icon: Award, tone: 'text-yellow-600 bg-yellow-500/10 border-yellow-500/30',
    pick: f => [...f].sort((a, b) => b.rating - a.rating || b.returns3Y - a.returns3Y).slice(0, 4),
    badge: f => `${'★'.repeat(f.rating)}`,
  },
  {
    id: 'liquid', label: 'Park Surplus', short: 'Liquid & overnight funds', icon: Banknote, tone: 'text-blue-600 bg-blue-500/10 border-blue-500/30',
    pick: f => f.filter(x => x.category === 'Liquid' || x.category === 'Overnight Fund' || x.category === 'Short Duration').slice(0, 4),
    badge: f => `${f.returns1Y}% / yr`,
  },
  {
    id: 'large-cap', label: 'Stable Blue Chips', short: 'Large-cap, lower volatility', icon: Shield, tone: 'text-indigo-600 bg-indigo-500/10 border-indigo-500/30',
    pick: f => f.filter(x => x.marketCap === 'Large Cap').slice(0, 4),
    badge: f => `3Y ${f.returns3Y}%`,
  },
  {
    id: 'thematic', label: 'High Growth Themes', short: 'Sectoral & small-cap leaders', icon: Zap, tone: 'text-orange-600 bg-orange-500/10 border-orange-500/30',
    pick: f => f.filter(x => x.category === 'Sectoral' || x.marketCap === 'Small Cap' || x.marketCap === 'Mid Cap').sort((a, b) => b.returns3Y - a.returns3Y).slice(0, 4),
    badge: f => `3Y ${f.returns3Y}%`,
  },
];

export const CURATED_SHELVES = SHELVES;

interface Props {
  variant?: 'compact' | 'full';
  defaultShelf?: ShelfId;
  onInvest?: (fund: MutualFund) => void;
  onSeeAll?: (shelfId: ShelfId) => void;
  title?: string;
}

export function CuratedShelves({ variant = 'full', defaultShelf = 'tax', onInvest, onSeeAll, title = 'Discover Funds' }: Props) {
  const [active, setActive] = useState<ShelfId>(defaultShelf);
  const shelf = SHELVES.find(s => s.id === active)!;
  const funds = useMemo(() => shelf.pick(MOCK_FUNDS), [shelf]);

  return (
    <Card className="border-sip-border">
      <CardContent className="p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sip-brand" />
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            <Badge variant="secondary" className="text-[10px]">Curated picks</Badge>
          </div>
          <button onClick={() => onSeeAll?.(active)} className="text-[11px] text-sip-brand hover:underline flex items-center gap-0.5">
            See all <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Category chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {SHELVES.map(s => {
            const Icon = s.icon;
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  'shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium transition-all whitespace-nowrap',
                  isActive ? 'bg-foreground text-background border-foreground' : `${s.tone} hover:opacity-80`
                )}
              >
                <Icon className="w-3 h-3" />
                {s.label}
              </button>
            );
          })}
        </div>

        <p className="text-[10px] text-muted-foreground">{shelf.short}</p>

        {/* Fund cards — using same compact layout as search results widget */}
        <div className={cn('grid gap-2', variant === 'compact' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2')}>
          {funds.map(f => (
            <div key={f.code} className="rounded-lg border border-sip-border p-2.5 hover:border-sip-brand/40 transition-colors space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground line-clamp-2">{f.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{f.amc} · {f.category}</p>
                </div>
                <span className={cn('shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded border', shelf.tone)}>
                  {shelf.badge(f)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-center">
                <div><p className="text-[9px] text-muted-foreground uppercase">1Y</p><p className="text-[11px] font-bold text-sip-success">{f.returns1Y}%</p></div>
                <div><p className="text-[9px] text-muted-foreground uppercase">TER</p><p className="text-[11px] font-bold text-foreground">{f.expenseRatio}%</p></div>
                <div><p className="text-[9px] text-muted-foreground uppercase">Risk</p><p className="text-[11px] font-bold text-foreground">{f.riskLevel}</p></div>
              </div>
              <Button size="sm" className="w-full h-7 text-[11px] bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90" onClick={() => onInvest?.(f)}>
                Start SIP →
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
