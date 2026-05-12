import { useRef, useState, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, LayoutGrid, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContextChips } from '@/components/conversion/ContextChips';
import { SmartShortlist } from '@/components/conversion/SmartShortlist';
import { CuratedShelves } from '@/components/conversion/CuratedShelves';
import { CompareDrawer } from '@/components/conversion/CompareDrawer';
import { SmartFundSearch } from './SmartFundSearch';
import type { ConversionContext, ShortlistFund } from '@/components/conversion/types';
import type { MutualFund } from '@/data/sipMockData';
import type { FundPurchasePrefill } from './FundPurchaseWidget';

export type DiscoverLens = 'foryou' | 'categories' | 'screener';

interface Props {
  context?: ConversionContext;
  onClearContext?: () => void;
  onInvest: (prefill?: FundPurchasePrefill) => void;
  /** compact mode for embedding in chat / home — hides chrome */
  compact?: boolean;
  defaultLens?: DiscoverLens;
}

const LENSES: { id: DiscoverLens; label: string; short: string; icon: typeof Sparkles; sub: string }[] = [
  { id: 'foryou',     label: 'For You',    short: 'For You',  icon: Sparkles,         sub: 'Personalised shortlist ranked for your goal, risk and horizon' },
  { id: 'categories', label: 'Categories', short: 'Browse',   icon: LayoutGrid,       sub: 'Explore funds by intent — sort by 1Y / 3Y / 5Y returns' },
  { id: 'screener',   label: 'Search',     short: 'Search',   icon: SlidersHorizontal, sub: 'Search by name or filter the full universe' },
];

export function DiscoverTab({ context, onClearContext, onInvest, compact, defaultLens = 'foryou' }: Props) {
  const [lens, setLens] = useState<DiscoverLens>(defaultLens);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareList, setCompareList] = useState<ShortlistFund[]>([]);
  const touchStartX = useRef<number | null>(null);

  const switchLens = useCallback((next: DiscoverLens) => setLens(next), []);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 60) return;
    const idx = LENSES.findIndex(l => l.id === lens);
    if (dx < 0 && idx < LENSES.length - 1) setLens(LENSES[idx + 1].id);
    if (dx > 0 && idx > 0) setLens(LENSES[idx - 1].id);
  };

  const handleFundInvest = (fund: MutualFund | ShortlistFund) => {
    onInvest({
      fundCode: fund.code,
      mode: 'sip',
      amount: context?.amount,
      goalTag: context?.goal,
    });
  };

  return (
    <div className="space-y-3">
      {/* Compact context strip */}
      {context && !compact && (
        <div className="flex items-center justify-between gap-2 px-1">
          <ContextChips context={context} />
          {onClearContext && (
            <Button size="sm" variant="ghost" className="h-6 text-[11px] shrink-0" onClick={onClearContext}>
              Clear
            </Button>
          )}
        </div>
      )}

      {/* Sticky lens switcher */}
      <div className={cn(
        'sticky z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 -mx-1 px-1 py-2 border-b border-border',
        compact ? 'top-0' : 'top-0 md:top-2'
      )}>
        <div role="tablist" className="flex gap-1 p-1 bg-muted/50 rounded-lg">
          {LENSES.map(l => {
            const Icon = l.icon;
            const active = lens === l.id;
            return (
              <button
                key={l.id}
                role="tab"
                aria-selected={active}
                onClick={() => switchLens(l.id)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                  active
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{l.label}</span>
                <span className="sm:hidden">{l.short}</span>
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5 px-1">
          {LENSES.find(l => l.id === lens)?.sub}
        </p>
      </div>

      {/* Lens content with swipe (mobile) */}
      <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {lens === 'foryou' && (
          <Card>
            <CardContent className="p-3 sm:p-4">
              <SmartShortlist
                context={context || { goal: 'Wealth Creation', risk: 'High', horizon: '5+ years' }}
                onInvest={handleFundInvest}
                onCompare={(funds) => { setCompareList(funds); setCompareOpen(true); }}
                compact={compact}
              />
              {!compact && (
                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Want to filter by your own criteria?</span>
                  <Button size="sm" variant="ghost" className="h-7 text-xs text-sip-brand" onClick={() => switchLens('screener')}>
                    Open Search <ChevronRight className="w-3 h-3 ml-0.5" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {lens === 'categories' && (
          <CuratedShelves
            title="Browse by Category"
            variant={compact ? 'compact' : 'full'}
            onInvest={handleFundInvest}
            onSeeAll={() => switchLens('screener')}
          />
        )}

        {lens === 'screener' && (
          <Card>
            <CardContent className="p-3 sm:p-4">
              <SmartFundSearch
                standalone
                onSelectFund={(fund, investMode) => {
                  onInvest({
                    fundCode: fund.code,
                    mode: investMode === 'onetime' ? 'onetime' : 'sip',
                    amount: context?.amount,
                    goalTag: context?.goal,
                  });
                }}
              />
            </CardContent>
          </Card>
        )}
      </div>

      <CompareDrawer
        open={compareOpen}
        funds={compareList}
        onClose={() => setCompareOpen(false)}
        onPick={(f) => { setCompareOpen(false); handleFundInvest(f); }}
      />
    </div>
  );
}
