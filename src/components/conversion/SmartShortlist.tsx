import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Info, Plus, Check, ChevronDown, ArrowUpDown, HelpCircle } from 'lucide-react';
import { ConversionContext, ShortlistFund } from './types';
import { buildSmartShortlist } from './shortlistEngine';
import { cn } from '@/lib/utils';

interface SmartShortlistProps {
  context: ConversionContext;
  onInvest?: (fund: ShortlistFund) => void;
  onCompare?: (funds: ShortlistFund[]) => void;
  compact?: boolean;
}

type SortKey = 'match' | '1y' | '3y' | '5y' | 'expense';
const SORT_LABEL: Record<SortKey, string> = {
  match: 'Best match', '1y': '1Y returns', '3y': '3Y returns', '5y': '5Y returns', expense: 'Lowest expense',
};

export function SmartShortlist({ context, onInvest, onCompare, compact }: SmartShortlistProps) {
  const fullList = useMemo(() => buildSmartShortlist(context, 20), [context]);
  const [sort, setSort] = useState<SortKey>('match');
  const [showAll, setShowAll] = useState(false);
  const [explainOpen, setExplainOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [compare, setCompare] = useState<string[]>([]);

  const sorted = useMemo(() => {
    const arr = [...fullList];
    if (sort === '1y') arr.sort((a, b) => b.returns1Y - a.returns1Y);
    else if (sort === '3y') arr.sort((a, b) => b.returns3Y - a.returns3Y);
    else if (sort === '5y') arr.sort((a, b) => b.returns5Y - a.returns5Y);
    else if (sort === 'expense') arr.sort((a, b) => a.expenseRatio - b.expenseRatio);
    return arr;
  }, [fullList, sort]);

  const visible = showAll ? sorted : sorted.slice(0, 4);
  const toggleCompare = (code: string) =>
    setCompare(p => p.includes(code) ? p.filter(c => c !== code) : p.length < 3 ? [...p, code] : p);

  const isNewVisitor = !context.goal && !context.risk;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sip-brand" />
          <h3 className="text-sm font-semibold text-foreground">Smart Shortlist</h3>
          <Badge variant="secondary" className="text-[10px]">{sorted.length} matched</Badge>
          <button onClick={() => setExplainOpen(o => !o)} className="text-muted-foreground hover:text-foreground" aria-label="How this list is built">
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3 h-3 text-muted-foreground" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortKey)}
            className="text-[11px] bg-background border border-border rounded px-1.5 py-0.5 text-foreground focus:outline-none focus:ring-1 focus:ring-sip-brand"
          >
            {(Object.keys(SORT_LABEL) as SortKey[]).map(k => <option key={k} value={k}>{SORT_LABEL[k]}</option>)}
          </select>
        </div>
      </div>

      {explainOpen && (
        <div className="text-[11px] text-foreground bg-sip-brand/5 border border-sip-brand/20 rounded p-2.5 leading-relaxed">
          <p className="font-semibold mb-1">How this shortlist is built</p>
          <ol className="list-decimal pl-4 space-y-0.5 text-muted-foreground">
            <li>Filter the universe by your <b className="text-foreground">risk band</b> ({context.risk || 'default Moderate for new users'}).</li>
            <li>Tilt by <b className="text-foreground">goal</b> ({context.goal || 'Wealth Creation default'}) — e.g. Retirement skips speculative themes; Emergency keeps only Liquid/Debt.</li>
            <li>Rank by <b className="text-foreground">3Y returns − (expense × 2) + AUM stability bonus</b>.</li>
          </ol>
          {isNewVisitor && (
            <p className="mt-1.5 text-muted-foreground">New here? You're seeing the default <b className="text-foreground">Wealth Creation · Moderate · long-term</b> picks. Set your context above to personalise.</p>
          )}
        </div>
      )}

      {context.goal && (
        <p className="text-[10px] text-muted-foreground">For: <b className="text-foreground">{context.goal}</b> · {context.risk || 'Moderate'} risk · {context.horizon || 'long-term'}</p>
      )}

      <div className={cn('grid gap-2', compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2')}>
        {visible.map(f => (
          <Card key={f.code} className="border-sip-border hover:border-sip-brand/40 transition-colors">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground line-clamp-2">{f.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{f.amc} · {f.category}</p>
                </div>
                <button
                  onClick={() => toggleCompare(f.code)}
                  title="Add to compare"
                  className={cn('shrink-0 w-6 h-6 rounded border flex items-center justify-center transition-colors',
                    compare.includes(f.code) ? 'bg-sip-brand text-sip-brand-foreground border-sip-brand' : 'border-border text-muted-foreground hover:border-sip-brand/40')}
                >
                  {compare.includes(f.code) ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1 text-center">
                <div><p className="text-[9px] text-muted-foreground uppercase">1Y</p><p className="text-xs font-bold text-sip-success">{f.returns1Y}%</p></div>
                <div><p className="text-[9px] text-muted-foreground uppercase">3Y</p><p className="text-xs font-bold text-sip-success">{f.returns3Y}%</p></div>
                <div><p className="text-[9px] text-muted-foreground uppercase">5Y</p><p className="text-xs font-bold text-sip-success">{f.returns5Y}%</p></div>
                <div><p className="text-[9px] text-muted-foreground uppercase">Exp</p><p className="text-xs font-bold text-foreground">{f.expenseRatio}%</p></div>
              </div>

              <button onClick={() => setExpanded(expanded === f.code ? null : f.code)}
                className="w-full flex items-center justify-between gap-1 px-2 py-1 rounded bg-sip-brand/5 border border-sip-brand/20 text-[10px] text-sip-brand hover:bg-sip-brand/10">
                <span className="flex items-center gap-1"><Info className="w-3 h-3" /> Why this fund</span>
                <ChevronDown className={cn('w-3 h-3 transition-transform', expanded === f.code && 'rotate-180')} />
              </button>

              {expanded === f.code && (
                <div className="text-[11px] text-foreground bg-muted/40 p-2 rounded border border-border">
                  <div className="flex flex-wrap gap-1 mb-1">
                    {f.reasonTags.map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 bg-sip-brand/10 text-sip-brand rounded">{t}</span>)}
                  </div>
                  {f.reason}
                </div>
              )}

              <Button size="sm" className="w-full h-7 text-xs bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90" onClick={() => onInvest?.(f)}>
                Start SIP
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {sorted.length > 4 && (
        <Button variant="outline" size="sm" className="w-full h-8 text-xs" onClick={() => setShowAll(s => !s)}>
          {showAll ? 'Show top 4 only' : `See all ${sorted.length} matched funds`}
        </Button>
      )}

      {compare.length >= 2 && (
        <div className="sticky bottom-2 flex justify-center">
          <Button size="sm" onClick={() => onCompare?.(sorted.filter(f => compare.includes(f.code)))}
            className="bg-foreground text-background hover:bg-foreground/90 shadow-lg">
            Compare {compare.length} funds →
          </Button>
        </div>
      )}
    </div>
  );
}
