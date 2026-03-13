import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Search, SlidersHorizontal, ChevronRight, X, Filter,
  Sparkles, Send, Loader2, ToggleLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  MOCK_FUNDS, MutualFund, AssetClass, MarketCap,
  ASSET_CLASSES, MARKET_CAPS, AMC_LIST,
  EQUITY_CATEGORIES, DEBT_CATEGORIES, HYBRID_CATEGORIES,
} from '@/data/sipMockData';
import { MFScreenerFilters } from './MFScreenerWidget';

type SearchMode = 'conventional' | 'ai';

export interface SmartFundSearchProps {
  /** Pre-applied filters (from agent) */
  initialFilters?: MFScreenerFilters;
  /** Agent can force a mode */
  initialMode?: SearchMode;
  /** Agent can pre-fill an AI query */
  initialAIQuery?: string;
  /** Only show these fund codes */
  restrictToCodes?: string[];
  /** Called when user selects a fund */
  onSelectFund?: (fund: MutualFund) => void;
  /** Show as standalone screener (no selection action) */
  standalone?: boolean;
  /** Called when AI query is submitted (parent handles the AI call) */
  onAISearch?: (query: string) => void;
  /** AI search results (returned from parent after AI call) */
  aiResults?: MutualFund[];
  /** AI search loading state */
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

  // ── Conventional state ──
  const [query, setQuery] = useState(initialFilters?.query || '');
  const [showAdvanced, setShowAdvanced] = useState(
    !!initialFilters?.assetClass || !!initialFilters?.marketCap || !!initialFilters?.amc
  );
  const [assetClass, setAssetClass] = useState<AssetClass | undefined>(initialFilters?.assetClass);
  const [category, setCategory] = useState<string | undefined>(initialFilters?.category);
  const [marketCap, setMarketCap] = useState<MarketCap | undefined>(initialFilters?.marketCap);
  const [maxExpenseRatio, setMaxExpenseRatio] = useState(initialFilters?.maxExpenseRatio ?? 5);
  const [minReturns1Y, setMinReturns1Y] = useState(initialFilters?.minReturns1Y ?? 0);
  const [minReturns3Y, setMinReturns3Y] = useState(initialFilters?.minReturns3Y ?? 0);
  const [amc, setAmc] = useState<string | undefined>(initialFilters?.amc);

  // ── AI state ──
  const [aiQuery, setAiQuery] = useState(initialAIQuery);

  const availableCategories = getCategoriesForAssetClass(assetClass);

  const baseFunds = restrictToCodes
    ? MOCK_FUNDS.filter(f => restrictToCodes.includes(f.code))
    : MOCK_FUNDS;

  // Conventional: auto-filter as user types / changes filters
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
      if (maxExpenseRatio < 5 && f.expenseRatio > maxExpenseRatio) return false;
      if (minReturns1Y > 0 && f.returns1Y < minReturns1Y) return false;
      if (minReturns3Y > 0 && f.returns3Y < minReturns3Y) return false;
      if (amc && f.amc !== amc) return false;
      return true;
    });
  }, [baseFunds, query, assetClass, category, marketCap, maxExpenseRatio, minReturns1Y, minReturns3Y, amc]);

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
  };

  const handleAISubmit = () => {
    if (!aiQuery.trim() || aiLoading) return;
    onAISearch?.(aiQuery.trim());
  };

  const displayedFunds = mode === 'conventional' ? conventionalResults : (aiResults || []);

  return (
    <div className="space-y-3">
      {/* ── Mode Toggle ── */}
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

      {/* ── Conventional Mode ── */}
      {mode === 'conventional' && (
        <>
          {/* Text search — auto-filters */}
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
              <div className="p-4 rounded-lg border border-border bg-muted/30 space-y-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-foreground">MF Screener</span>
                  <Badge variant="secondary" className="text-[9px]">DIRECT ONLY</Badge>
                </div>

                {/* Asset Class */}
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Asset Class</Label>
                  <div className="flex gap-1.5 flex-wrap">
                    {ASSET_CLASSES.map(ac => (
                      <Badge
                        key={ac}
                        variant={assetClass === ac ? 'default' : 'outline'}
                        className="cursor-pointer text-[11px] px-2.5 py-1"
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

                {/* Sub-categories */}
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

                {/* Market Cap */}
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

                {/* Expense Ratio & Fund House */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Max Exp % <span className="text-primary font-bold">{maxExpenseRatio.toFixed(1)}%</span>
                    </Label>
                    <Slider value={[maxExpenseRatio]} onValueChange={v => setMaxExpenseRatio(v[0])} min={0} max={5} step={0.1} />
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
                    <Slider value={[minReturns1Y]} onValueChange={v => setMinReturns1Y(v[0])} min={0} max={50} step={1} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Min 3Y Ret % <span className="text-primary font-bold">{minReturns3Y}%</span>
                    </Label>
                    <Slider value={[minReturns3Y]} onValueChange={v => setMinReturns3Y(v[0])} min={0} max={50} step={1} />
                  </div>
                </div>

                {/* Clear */}
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" className="text-xs" onClick={clearFilters}>
                    <X className="w-3 h-3 mr-1" /> Clear All Filters
                  </Button>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}

      {/* ── AI Screener Mode ── */}
      {mode === 'ai' && (
        <div className="space-y-3">
          <div className="p-3 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">AI-Powered Fund Discovery</span>
              <Badge variant="secondary" className="text-[9px]">BETA</Badge>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Describe what you're looking for in plain language. The AI will find matching funds for you.
            </p>
          </div>

          {/* AI Query input + submit button */}
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
              {aiLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Quick suggestions */}
          {!aiQuery && !aiResults?.length && (
            <div className="space-y-1.5">
              <p className="text-[10px] text-muted-foreground">Try these:</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Top performing mid cap funds under 1% expense',
                  'Safe debt funds for emergency corpus',
                  'Best SIP options for retirement planning',
                  'High return small cap with 5-star rating',
                ].map((suggestion) => (
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

          {/* AI cost notice */}
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <ToggleLeft className="w-3 h-3" />
            Each AI query uses 1 credit. Switch to Search & Filter for unlimited free searches.
          </p>
        </div>
      )}

      {/* ── Results ── */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground">
          {mode === 'ai' && !aiResults
            ? 'Submit a query to see results'
            : `${displayedFunds.length} fund${displayedFunds.length !== 1 ? 's' : ''} found`
          }
        </p>
        {mode === 'conventional' && activeFilterCount > 0 && (
          <button onClick={clearFilters} className="text-[10px] text-primary hover:underline">Reset filters</button>
        )}
      </div>

      {/* Fund list — only show for conventional (always) or AI (after results) */}
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
            displayedFunds.map(fund => (
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
      )}
    </div>
  );
}
