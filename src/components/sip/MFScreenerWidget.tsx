import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, SlidersHorizontal, ChevronRight, X, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  MOCK_FUNDS, MutualFund, AssetClass, MarketCap,
  ASSET_CLASSES, MARKET_CAPS, AMC_LIST,
  EQUITY_CATEGORIES, DEBT_CATEGORIES, HYBRID_CATEGORIES,
} from '@/data/sipMockData';

export interface MFScreenerFilters {
  query?: string;
  assetClass?: AssetClass;
  category?: string;
  marketCap?: MarketCap;
  maxExpenseRatio?: number;
  minReturns1Y?: number;
  minReturns3Y?: number;
  minReturns5Y?: number;
  sector?: string;
  amc?: string;
}

interface MFScreenerWidgetProps {
  /** Pre-applied filters (from agent) */
  initialFilters?: MFScreenerFilters;
  /** Only show these fund codes (e.g. for redemption — held funds only) */
  restrictToCodes?: string[];
  /** Called when user selects a fund */
  onSelectFund?: (fund: MutualFund) => void;
  /** Show as standalone screener (no selection action) */
  standalone?: boolean;
}

function getCategoriesForAssetClass(ac?: AssetClass): string[] {
  if (ac === 'Equity') return EQUITY_CATEGORIES;
  if (ac === 'Debt') return DEBT_CATEGORIES;
  if (ac === 'Hybrid') return HYBRID_CATEGORIES;
  return [];
}

export function MFScreenerWidget({
  initialFilters,
  restrictToCodes,
  onSelectFund,
  standalone = false,
}: MFScreenerWidgetProps) {
  const [query, setQuery] = useState(initialFilters?.query || '');
  const [showAdvanced, setShowAdvanced] = useState(!!initialFilters?.assetClass || !!initialFilters?.marketCap || !!initialFilters?.amc);
  const [assetClass, setAssetClass] = useState<AssetClass | undefined>(initialFilters?.assetClass);
  const [category, setCategory] = useState<string | undefined>(initialFilters?.category);
  const [marketCap, setMarketCap] = useState<MarketCap | undefined>(initialFilters?.marketCap);
  const [maxExpenseRatio, setMaxExpenseRatio] = useState(initialFilters?.maxExpenseRatio ?? 5);
  const [minReturns1Y, setMinReturns1Y] = useState(initialFilters?.minReturns1Y ?? 0);
  const [minReturns3Y, setMinReturns3Y] = useState(initialFilters?.minReturns3Y ?? 0);
  const [amc, setAmc] = useState<string | undefined>(initialFilters?.amc);
  const [hasApplied, setHasApplied] = useState(!!initialFilters?.assetClass); // auto-apply if prefilled

  const availableCategories = getCategoriesForAssetClass(assetClass);

  const baseFunds = restrictToCodes
    ? MOCK_FUNDS.filter(f => restrictToCodes.includes(f.code))
    : MOCK_FUNDS;

  const filteredFunds = useMemo(() => {
    return baseFunds.filter(f => {
      // Text search
      if (query) {
        const q = query.toLowerCase();
        const matchesText = f.name.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q) ||
          f.amc.toLowerCase().includes(q) ||
          f.code.toLowerCase().includes(q);
        if (!matchesText) return false;
      }
      // Advanced filters (only if applied)
      if (hasApplied || showAdvanced) {
        if (assetClass && f.assetClass !== assetClass) return false;
        if (category && f.category !== category) return false;
        if (marketCap && f.marketCap !== marketCap) return false;
        if (maxExpenseRatio < 5 && f.expenseRatio > maxExpenseRatio) return false;
        if (minReturns1Y > 0 && f.returns1Y < minReturns1Y) return false;
        if (minReturns3Y > 0 && f.returns3Y < minReturns3Y) return false;
        if (amc && f.amc !== amc) return false;
      }
      return true;
    });
  }, [baseFunds, query, assetClass, category, marketCap, maxExpenseRatio, minReturns1Y, minReturns3Y, amc, hasApplied, showAdvanced]);

  const activeFilterCount = [
    assetClass, category, marketCap,
    maxExpenseRatio < 5 ? true : undefined,
    minReturns1Y > 0 ? true : undefined,
    minReturns3Y > 0 ? true : undefined,
    amc,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setAssetClass(undefined);
    setCategory(undefined);
    setMarketCap(undefined);
    setMaxExpenseRatio(5);
    setMinReturns1Y(0);
    setMinReturns3Y(0);
    setAmc(undefined);
    setHasApplied(false);
  };

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search funds, AMC, category..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="pl-9 pr-10"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>

      {/* Advanced Filters Toggle */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="w-full justify-between text-xs">
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Advanced Filters
              {activeFilterCount > 0 && (
                <Badge variant="default" className="text-[9px] px-1.5 py-0 ml-1">{activeFilterCount}</Badge>
              )}
            </span>
            <ChevronRight className={cn('w-3.5 h-3.5 transition-transform', showAdvanced && 'rotate-90')} />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="pt-3">
          <div className="p-4 rounded-lg border border-border bg-muted/30 space-y-4">
            {/* Plan Type badge */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">MF Screener</span>
              <Badge variant="secondary" className="text-[9px]">PLAN TYPE: DIRECT ONLY</Badge>
            </div>

            {/* Asset Class */}
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Asset Class (Prime Category)</Label>
              <div className="flex gap-1.5 flex-wrap">
                {ASSET_CLASSES.map(ac => (
                  <Badge
                    key={ac}
                    variant={assetClass === ac ? 'default' : 'outline'}
                    className="cursor-pointer text-[11px] px-2.5 py-1"
                    onClick={() => {
                      setAssetClass(assetClass === ac ? undefined : ac);
                      setCategory(undefined); // reset sub-category
                    }}
                  >
                    {ac}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sub-categories (dynamic based on asset class) */}
            {assetClass && availableCategories.length > 0 && (
              <div className="space-y-1.5">
                <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {assetClass} Categories
                </Label>
                <Select value={category || '__all__'} onValueChange={v => setCategory(v === '__all__' ? undefined : v)}>
                  <SelectTrigger className="text-sm h-9">
                    <SelectValue placeholder={`All ${assetClass} Categories`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">All Categories</SelectItem>
                    {availableCategories.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Market Cap (only for Equity) */}
            {(!assetClass || assetClass === 'Equity') && (
              <div className="space-y-1.5">
                <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Market Cap</Label>
                <div className="flex gap-1.5 flex-wrap">
                  {MARKET_CAPS.map(mc => (
                    <Badge
                      key={mc}
                      variant={marketCap === mc ? 'default' : 'outline'}
                      className="cursor-pointer text-[11px] px-2.5 py-1"
                      onClick={() => setMarketCap(marketCap === mc ? undefined : mc)}
                    >
                      {mc}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Expense Ratio & Fund House row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Max Exp % <span className="text-primary font-bold">{maxExpenseRatio.toFixed(1)}%</span>
                </Label>
                <Slider
                  value={[maxExpenseRatio]}
                  onValueChange={v => setMaxExpenseRatio(v[0])}
                  min={0}
                  max={5}
                  step={0.1}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Fund House</Label>
                <Select value={amc || '__all__'} onValueChange={v => setAmc(v === '__all__' ? undefined : v)}>
                  <SelectTrigger className="text-xs h-9">
                    <SelectValue placeholder="All AMCs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">All AMCs</SelectItem>
                    {AMC_LIST.map(a => (
                      <SelectItem key={a} value={a}>{a}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Returns sliders */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Min 1Y Ret % <span className="text-primary font-bold">{minReturns1Y}%</span>
                </Label>
                <Slider
                  value={[minReturns1Y]}
                  onValueChange={v => setMinReturns1Y(v[0])}
                  min={0}
                  max={50}
                  step={1}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Min 3Y Ret % <span className="text-primary font-bold">{minReturns3Y}%</span>
                </Label>
                <Slider
                  value={[minReturns3Y]}
                  onValueChange={v => setMinReturns3Y(v[0])}
                  min={0}
                  max={50}
                  step={1}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-1">
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" className="text-xs" onClick={clearFilters}>
                  <X className="w-3 h-3 mr-1" /> Clear
                </Button>
              )}
              <Button
                size="sm"
                className="flex-1 text-xs bg-gradient-to-r from-primary to-primary/80"
                onClick={() => setHasApplied(true)}
              >
                <Search className="w-3 h-3 mr-1" /> Apply Filters
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground">
          {filteredFunds.length} fund{filteredFunds.length !== 1 ? 's' : ''} found
        </p>
        {activeFilterCount > 0 && hasApplied && (
          <button onClick={clearFilters} className="text-[10px] text-primary hover:underline">Reset filters</button>
        )}
      </div>

      <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
        {filteredFunds.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <SlidersHorizontal className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No funds match your criteria</p>
            <p className="text-xs mt-1">Try adjusting filters or search terms</p>
          </div>
        ) : (
          filteredFunds.map(fund => (
            <button
              key={fund.code}
              onClick={() => onSelectFund?.(fund)}
              className={cn(
                'w-full text-left p-3 rounded-lg border border-border transition-all hover:border-primary/40 hover:bg-primary/5',
                !onSelectFund && 'cursor-default'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{fund.name}</p>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{fund.assetClass}</Badge>
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0">{fund.category}</Badge>
                    <span className="text-[10px] text-muted-foreground">Exp {fund.expenseRatio}%</span>
                    <span className="text-[10px] text-yellow-600">{'★'.repeat(fund.rating)}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-muted-foreground">NAV ₹{fund.nav}</span>
                    <span className="text-[10px] text-green-600">1Y: {fund.returns1Y}%</span>
                    <span className="text-[10px] text-green-700">3Y: {fund.returns3Y}%</span>
                  </div>
                </div>
                {onSelectFund && <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
