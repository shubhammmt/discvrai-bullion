import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Receipt, TrendingUp, Coins, Shield, Sparkles, Banknote, Zap, Award, ArrowUpDown } from 'lucide-react';
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
}

const SHELVES: Shelf[] = [
  { id: 'tax', label: 'Tax Saving (ELSS)', short: 'Save tax u/s 80C', icon: Receipt, tone: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30',
    pick: f => f.filter(x => x.category === 'ELSS' || x.name.toLowerCase().includes('elss')) },
  { id: 'top-returns', label: 'Top Returns (3Y)', short: 'Highest 3-year CAGR', icon: TrendingUp, tone: 'text-sip-success bg-sip-success/10 border-sip-success/30',
    pick: f => [...f].sort((a, b) => b.returns3Y - a.returns3Y) },
  { id: 'low-expense', label: 'Lowest Expense', short: 'Maximise long-term compounding', icon: Coins, tone: 'text-sip-brand bg-sip-brand/10 border-sip-brand/30',
    pick: f => [...f].sort((a, b) => a.expenseRatio - b.expenseRatio) },
  { id: 'top-rated', label: 'Top Rated 5★', short: 'Highest analyst rating', icon: Award, tone: 'text-yellow-600 bg-yellow-500/10 border-yellow-500/30',
    pick: f => [...f].sort((a, b) => b.rating - a.rating || b.returns3Y - a.returns3Y) },
  { id: 'liquid', label: 'Park Surplus', short: 'Liquid & overnight funds', icon: Banknote, tone: 'text-blue-600 bg-blue-500/10 border-blue-500/30',
    pick: f => f.filter(x => x.category === 'Liquid' || x.category === 'Overnight Fund' || x.category === 'Short Duration') },
  { id: 'large-cap', label: 'Stable Blue Chips', short: 'Large-cap, lower volatility', icon: Shield, tone: 'text-indigo-600 bg-indigo-500/10 border-indigo-500/30',
    pick: f => f.filter(x => x.marketCap === 'Large Cap') },
  { id: 'thematic', label: 'High Growth Themes', short: 'Sectoral & small/mid-cap leaders', icon: Zap, tone: 'text-orange-600 bg-orange-500/10 border-orange-500/30',
    pick: f => f.filter(x => x.category === 'Sectoral' || x.marketCap === 'Small Cap' || x.marketCap === 'Mid Cap') },
];

export const CURATED_SHELVES = SHELVES;

type SortKey = '1y' | '3y' | '5y' | 'expense' | 'rating';
const SORT_LABEL: Record<SortKey, string> = {
  '1y': '1Y', '3y': '3Y', '5y': '5Y', expense: 'Expense', rating: 'Rating',
};

interface Props {
  variant?: 'compact' | 'full';
  defaultShelf?: ShelfId;
  onInvest?: (fund: MutualFund) => void;
  onSeeAll?: (shelfId: ShelfId) => void;
  title?: string;
}

export function CuratedShelves({ variant = 'full', defaultShelf = 'top-returns', onInvest, onSeeAll, title = 'Browse by Category' }: Props) {
  const [active, setActive] = useState<ShelfId>(defaultShelf);
  const [sort, setSort] = useState<SortKey>('3y');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [showAll, setShowAll] = useState(false);
  const shelf = SHELVES.find(s => s.id === active)!;

  const funds = useMemo(() => {
    const base = shelf.pick(MOCK_FUNDS);
    const sorted = [...base].sort((a, b) => {
      const get = (f: MutualFund) =>
        sort === '1y' ? f.returns1Y :
        sort === '3y' ? f.returns3Y :
        sort === '5y' ? f.returns5Y :
        sort === 'expense' ? f.expenseRatio :
        f.rating;
      const diff = get(a) - get(b);
      return sortDir === 'desc' ? -diff : diff;
    });
    return sorted;
  }, [shelf, sort, sortDir]);

  const visible = showAll ? funds : funds.slice(0, 6);

  const toggleSort = (k: SortKey) => {
    if (sort === k) setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    else { setSort(k); setSortDir(k === 'expense' ? 'asc' : 'desc'); }
  };

  return (
    <Card className="border-sip-border">
      <CardContent className="p-3 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sip-brand" />
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            <Badge variant="secondary" className="text-[10px]">{funds.length} funds</Badge>
          </div>
          <button onClick={() => onSeeAll?.(active)} className="text-[11px] text-sip-brand hover:underline flex items-center gap-0.5">
            Open in Search <ChevronRight className="w-3 h-3" />
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
                onClick={() => { setActive(s.id); setShowAll(false); }}
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

        {/* Sortable header (desktop) */}
        <div className="hidden md:grid grid-cols-12 gap-2 px-2 py-1.5 bg-muted/50 rounded text-[10px] uppercase font-semibold text-muted-foreground">
          <div className="col-span-5">Fund</div>
          {(['1y','3y','5y','expense','rating'] as SortKey[]).map(k => (
            <button key={k} onClick={() => toggleSort(k)}
              className={cn('col-span-1 flex items-center justify-end gap-0.5 hover:text-foreground', sort === k && 'text-sip-brand')}>
              {SORT_LABEL[k]}
              <ArrowUpDown className="w-2.5 h-2.5" />
            </button>
          ))}
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* Mobile sort selector */}
        <div className="md:hidden flex items-center gap-2">
          <ArrowUpDown className="w-3 h-3 text-muted-foreground" />
          <select value={`${sort}-${sortDir}`} onChange={e => { const [k, d] = e.target.value.split('-') as [SortKey, 'asc'|'desc']; setSort(k); setSortDir(d); }}
            className="text-[11px] bg-background border border-border rounded px-1.5 py-0.5 text-foreground flex-1">
            <option value="3y-desc">3Y returns ↓</option>
            <option value="1y-desc">1Y returns ↓</option>
            <option value="5y-desc">5Y returns ↓</option>
            <option value="expense-asc">Lowest expense</option>
            <option value="rating-desc">Highest rating</option>
          </select>
        </div>

        {/* Rows */}
        <div className="space-y-1.5">
          {visible.map(f => (
            <div key={f.code} className="rounded-lg border border-sip-border p-2.5 hover:border-sip-brand/40 transition-colors">
              {/* Desktop row */}
              <div className="hidden md:grid grid-cols-12 gap-2 items-center">
                <div className="col-span-5 min-w-0">
                  <p className="text-xs font-semibold text-foreground line-clamp-1">{f.name}</p>
                  <p className="text-[10px] text-muted-foreground">{f.amc} · {f.category} · {f.riskLevel}</p>
                </div>
                <div className="col-span-1 text-right text-xs font-bold text-sip-success">{f.returns1Y}%</div>
                <div className="col-span-1 text-right text-xs font-bold text-sip-success">{f.returns3Y}%</div>
                <div className="col-span-1 text-right text-xs font-bold text-sip-success">{f.returns5Y}%</div>
                <div className="col-span-1 text-right text-xs font-bold text-foreground">{f.expenseRatio}%</div>
                <div className="col-span-1 text-right text-xs font-bold text-yellow-600">{'★'.repeat(f.rating)}</div>
                <div className="col-span-2 text-right">
                  <Button size="sm" className="h-7 text-[11px] bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90" onClick={() => onInvest?.(f)}>
                    Start SIP
                  </Button>
                </div>
              </div>
              {/* Mobile row */}
              <div className="md:hidden space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-foreground line-clamp-2">{f.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{f.amc} · {f.category}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold text-yellow-600">{'★'.repeat(f.rating)}</span>
                </div>
                <div className="grid grid-cols-4 gap-1 text-center">
                  <div><p className="text-[9px] text-muted-foreground uppercase">1Y</p><p className="text-[11px] font-bold text-sip-success">{f.returns1Y}%</p></div>
                  <div><p className="text-[9px] text-muted-foreground uppercase">3Y</p><p className="text-[11px] font-bold text-sip-success">{f.returns3Y}%</p></div>
                  <div><p className="text-[9px] text-muted-foreground uppercase">5Y</p><p className="text-[11px] font-bold text-sip-success">{f.returns5Y}%</p></div>
                  <div><p className="text-[9px] text-muted-foreground uppercase">Exp</p><p className="text-[11px] font-bold text-foreground">{f.expenseRatio}%</p></div>
                </div>
                <Button size="sm" className="w-full h-7 text-[11px] bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90" onClick={() => onInvest?.(f)}>
                  Start SIP →
                </Button>
              </div>
            </div>
          ))}
          {visible.length === 0 && (
            <p className="text-center text-xs text-muted-foreground py-4">No funds in this category yet.</p>
          )}
        </div>

        {funds.length > 6 && (
          <Button variant="outline" size="sm" className="w-full h-8 text-xs" onClick={() => setShowAll(s => !s)}>
            {showAll ? 'Show top 6 only' : `See all ${funds.length} funds`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
