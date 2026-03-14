import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Search, SlidersHorizontal, ChevronRight, X,
  Sparkles, Send, Loader2, ToggleLeft, Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  MOCK_FUNDS, MutualFund, AssetClass, MarketCap,
  ASSET_CLASSES, MARKET_CAPS, AMC_LIST, SECTORS,
  EQUITY_CATEGORIES, DEBT_CATEGORIES, HYBRID_CATEGORIES,
} from '@/data/sipMockData';
import { MFScreenerFilters } from './MFScreenerWidget';
import { FundDetailSheet } from './FundDetailSheet';

type SearchMode = 'conventional' | 'ai';

export interface SmartFundSearchProps {
  initialFilters?: MFScreenerFilters;
  initialMode?: SearchMode;
  initialAIQuery?: string;
  restrictToCodes?: string[];
  onSelectFund?: (fund: MutualFund) => void;
  standalone?: boolean;
  onAISearch?: (query: string) => void;
  aiResults?: MutualFund[];
  aiLoading?: boolean;
}

function getCategoriesForAssetClass(ac?: AssetClass): string[] {
  if (ac === 'Equity') return EQUITY_CATEGORIES;
  if (ac === 'Debt') return DEBT_CATEGORIES;
  if (ac === 'Hybrid') return HYBRID_CATEGORIES;
  return [];
}

export function SmartFundSearch({
  initialFilters,
  initialMode = 'conventional',
  initialAIQuery = '',
  restrictToCodes,
  onSelectFund,
  standalone = false,
  onAISearch,
  aiResults,
  aiLoading = false,
}: SmartFundSearchProps) {
  const [mode, setMode] = useState<SearchMode>(initialMode);

  // Conventional state
  const [query, setQuery] = useState(initialFilters?.query || '');
  const [showAdvanced, setShowAdvanced] = useState(
    !!initialFilters?.assetClass || !!initialFilters?.marketCap || !!initialFilters?.amc
  );
  const [assetClass, setAssetClass] = useState<AssetClass | undefined>(initialFilters?.assetClass);
  const [category, setCategory] = useState<string | undefined>(initialFilters?.category);
  const [marketCap, setMarketCap] = useState<MarketCap | undefined>(initialFilters?.marketCap);
  const [sector, setSector] = useState<string | undefined>(undefined);
  const [maxExpenseRatio, setMaxExpenseRatio] = useState(initialFilters?.maxExpenseRatio ?? 5);
  const [minReturns1Y, setMinReturns1Y] = useState(initialFilters?.minReturns1Y ?? 0);
  const [minReturns3Y, setMinReturns3Y] = useState(initialFilters?.minReturns3Y ?? 0);
  const [minReturns5Y, setMinReturns5Y] = useState(0);
  const [amc, setAmc] = useState<string | undefined>(initialFilters?.amc);

  // AI state
  const [aiQuery, setAiQuery] = useState(initialAIQuery);

  // Fund detail sheet state
  const [detailFund, setDetailFund] = useState<MutualFund | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const availableCategories = getCategoriesForAssetClass(assetClass);

  const baseFunds = restrictToCodes
    ? MOCK_FUNDS.filter(f => restrictToCodes.includes(f.code))
    : MOCK_FUNDS;

  const conventionalResults = useMemo(() => {
    return baseFunds.filter(f => {
      if (query) {
        const q = query.toLowerCase();
        const matchesText = f.name.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q) ||
          f.amc.toLowerCase().includes(q) ||
          f.code.toLowerCase().includes(q);
        if (!matchesText) return false;
      }
      if (assetClass && f.assetClass !== assetClass) return false;
      if (category && f.category !== category) return false;
      if (marketCap && f.marketCap !== marketCap) return false;
      if (sector && f.sector !== sector) return false;
      if (maxExpenseRatio < 5 && f.expenseRatio > maxExpenseRatio) return false;
      if (minReturns1Y > 0 && f.returns1Y < minReturns1Y) return false;
      if (minReturns3Y > 0 && f.returns3Y < minReturns3Y) return false;
      if (minReturns5Y > 0 && f.returns5Y < minReturns5Y) return false;
      if (amc && f.amc !== amc) return false;
      return true;
    });
  }, [baseFunds, query, assetClass, category, marketCap, sector, maxExpenseRatio, minReturns1Y, minReturns3Y, minReturns5Y, amc]);

  const activeFilterCount = [
    assetClass, category, marketCap, sector,
    maxExpenseRatio < 5 ? true : undefined,
    minReturns1Y > 0 ? true : undefined,
    minReturns3Y > 0 ? true : undefined,
    minReturns5Y > 0 ? true : undefined,
    amc,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setAssetClass(undefined);
    setCategory(undefined);
    setMarketCap(undefined);
    setSector(undefined);
    setMaxExpenseRatio(5);
    setMinReturns1Y(0);
    setMinReturns3Y(0);
    setMinReturns5Y(0);
    setAmc(undefined);
  };

  const handleAISubmit = () => {
    if (!aiQuery.trim() || aiLoading) return;
    onAISearch?.(aiQuery.trim());
  };

  const displayedFunds = mode === 'conventional' ? conventionalResults : (aiResults || []);

  const handleFundAction = (fund: MutualFund) => {
    if (onSelectFund) {
      // In buy flow — show detail sheet where user can choose invest
      setDetailFund(fund);
      setDetailOpen(true);
    } else {
      // Standalone — show detail sheet
      setDetailFund(fund);
      setDetailOpen(true);
    }
  };

  const handleInvestFromDetail = (fund: MutualFund, _mode: 'sip' | 'onetime') => {
    setDetailOpen(false);
    onSelectFund?.(fund);
  };

  // Shared fund card renderer
  const renderFundCard = (fund: MutualFund) => (
    <div
      key={fund.code}
      className="w-full text-left p-3 rounded-lg border border-border transition-all hover:border-primary/40 hover:bg-primary/5 cursor-pointer"
      onClick={() => handleFundAction(fund)}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground truncate">{fund.name}</p>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{fund.assetClass}</Badge>
            <Badge variant="outline" className="text-[9px] px-1.5 py-0">{fund.category}</Badge>
            <span className="text-[10px] text-muted-foreground">Exp {fund.expenseRatio}%</span>
            <span className="text-[10px] text-yellow-600">{'★'.repeat(fund.rating)}</span>
          </div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="text-[10px] text-muted-foreground">NAV ₹{fund.nav}</span>
            <span className="text-[10px] text-green-600">1Y: {fund.returns1Y}%</span>
            <span className="text-[10px] text-green-700">3Y: {fund.returns3Y}%</span>
            <span className="text-[10px] text-green-800">5Y: {fund.returns5Y}%</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 shrink-0">
          <Eye className="w-4 h-4 text-muted-foreground" />
          <span className="text-[9px] text-muted-foreground">Details</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      {/* Mode Toggle */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/60 border border-border">
        <button
          onClick={() => setMode('conventional')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all',
            mode === 'conventional'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Search className="w-3.5 h-3.5" />
          Search & Filter
        </button>
        <button
          onClick={() => setMode('ai')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all',
            mode === 'ai'
              ? 'bg-gradient-to-r from-primary/10 to-accent/10 text-primary shadow-sm border border-primary/20'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI Screener
        </button>
      </div>

      {/* Conventional Mode */}
      {mode === 'conventional' && (
        <>
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

          {/* Advanced Filters */}
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
              <div className="p-3 sm:p-4 rounded-lg border border-border bg-muted/30 space-y-3">
                {/* Row 1: Asset Class chips */}
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Asset Class</Label>
                  <div className="flex gap-1.5 flex-wrap">
                    {ASSET_CLASSES.map(ac => (
                      <Badge
                        key={ac}
                        variant={assetClass === ac ? 'default' : 'outline'}
                        className="cursor-pointer text-[10px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-1"
                        onClick={() => {
                          setAssetClass(assetClass === ac ? undefined : ac);
                          setCategory(undefined);
                        }}
                      >
                        {ac}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Row 2: Category + Market Cap + Sector dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Sub-category */}
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Category</Label>
                    <Select
                      value={category || '__all__'}
                      onValueChange={v => setCategory(v === '__all__' ? undefined : v)}
                    >
                      <SelectTrigger className="text-xs h-8">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">All Categories</SelectItem>
                        {(assetClass ? getCategoriesForAssetClass(assetClass) : [...EQUITY_CATEGORIES, ...DEBT_CATEGORIES, ...HYBRID_CATEGORIES]).map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Market Cap */}
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Market Cap</Label>
                    <Select
                      value={marketCap || '__all__'}
                      onValueChange={v => setMarketCap(v === '__all__' ? undefined : v as MarketCap)}
                    >
                      <SelectTrigger className="text-xs h-8">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">All Caps</SelectItem>
                        {MARKET_CAPS.map(mc => (
                          <SelectItem key={mc} value={mc}>{mc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sector */}
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Sector</Label>
                    <Select
                      value={sector || '__all__'}
                      onValueChange={v => setSector(v === '__all__' ? undefined : v)}
                    >
                      <SelectTrigger className="text-xs h-8">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">All Sectors</SelectItem>
                        {SECTORS.map(s => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 3: Fund House + Expense Ratio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Fund House</Label>
                    <Select value={amc || '__all__'} onValueChange={v => setAmc(v === '__all__' ? undefined : v)}>
                      <SelectTrigger className="text-xs h-8">
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
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Max Expense <span className="text-primary font-bold">{maxExpenseRatio.toFixed(1)}%</span>
                    </Label>
                    <Slider value={[maxExpenseRatio]} onValueChange={v => setMaxExpenseRatio(v[0])} min={0} max={5} step={0.1} />
                  </div>
                </div>

                {/* Row 4: Returns sliders — 1Y, 3Y, 5Y */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Min 1Y <span className="text-primary font-bold">{minReturns1Y}%</span>
                    </Label>
                    <Slider value={[minReturns1Y]} onValueChange={v => setMinReturns1Y(v[0])} min={0} max={50} step={1} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Min 3Y <span className="text-primary font-bold">{minReturns3Y}%</span>
                    </Label>
                    <Slider value={[minReturns3Y]} onValueChange={v => setMinReturns3Y(v[0])} min={0} max={50} step={1} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Min 5Y <span className="text-primary font-bold">{minReturns5Y}%</span>
                    </Label>
                    <Slider value={[minReturns5Y]} onValueChange={v => setMinReturns5Y(v[0])} min={0} max={50} step={1} />
                  </div>
                </div>

                {/* Clear all */}
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" className="text-xs w-full" onClick={clearFilters}>
                    <X className="w-3 h-3 mr-1" /> Clear All Filters ({activeFilterCount})
                  </Button>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}

      {/* AI Screener Mode */}
      {mode === 'ai' && (
        <div className="space-y-3">
          <div className="p-3 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">AI-Powered Fund Discovery</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Describe what you're looking for in plain language.
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
              <Input
                placeholder='e.g. "Low-cost large cap fund with 15%+ returns"'
                value={aiQuery}
                onChange={e => setAiQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAISubmit()}
                className="pl-9 pr-3"
              />
            </div>
            <Button
              onClick={handleAISubmit}
              disabled={!aiQuery.trim() || aiLoading}
              size="default"
              className="bg-gradient-to-r from-primary to-primary/80 shrink-0"
            >
              {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>

          {!aiQuery && !aiResults?.length && (
            <div className="space-y-1.5">
              <p className="text-[10px] text-muted-foreground">Try these:</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Top performing mid cap funds under 1% expense',
                  'Safe debt funds for emergency corpus',
                  'Best SIP options for retirement planning',
                  'High return small cap with 5-star rating',
                ].map(suggestion => (
                  <Badge
                    key={suggestion}
                    variant="outline"
                    className="cursor-pointer text-[10px] px-2 py-1 hover:bg-primary/5 hover:border-primary/30 transition-colors"
                    onClick={() => setAiQuery(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <ToggleLeft className="w-3 h-3" />
            Each AI query uses 1 credit. Switch to Search & Filter for unlimited free searches.
          </p>
        </div>
      )}

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground">
          {mode === 'ai' && !aiResults
            ? 'Submit a query to see results'
            : `${displayedFunds.length} fund${displayedFunds.length !== 1 ? 's' : ''} found`}
        </p>
        {mode === 'conventional' && activeFilterCount > 0 && (
          <button onClick={clearFilters} className="text-[10px] text-primary hover:underline">Reset filters</button>
        )}
      </div>

      {/* Fund list — unified for both modes */}
      {(mode === 'conventional' || (mode === 'ai' && aiResults)) && (
        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {displayedFunds.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <SlidersHorizontal className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No funds match your criteria</p>
              <p className="text-xs mt-1">
                {mode === 'ai' ? 'Try a different query' : 'Try adjusting filters or search terms'}
              </p>
            </div>
          ) : (
            displayedFunds.map(fund => renderFundCard(fund))
          )}
        </div>
      )}

      {/* Fund Detail Sheet */}
      <FundDetailSheet
        fund={detailFund}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onInvest={onSelectFund ? handleInvestFromDetail : undefined}
      />
    </div>
  );
}
