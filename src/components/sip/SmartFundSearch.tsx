import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Search, SlidersHorizontal, ChevronRight, ChevronDown, X,
  Sparkles, Send, Loader2, ToggleLeft, Eye, ArrowUpDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  MOCK_FUNDS, MutualFund, AssetClass, MarketCap,
  ASSET_CLASSES, MARKET_CAPS, AMC_LIST, SECTORS,
  EQUITY_CATEGORIES, DEBT_CATEGORIES, HYBRID_CATEGORIES,
} from '@/data/sipMockData';
import { MFScreenerFilters } from './MFScreenerWidget';
import { FundDetailSheet } from './FundDetailSheet';
import { SearchableSelect } from './SearchableSelect';

type SearchMode = 'conventional' | 'ai';

type SortOption = '1y' | '3y' | '5y' | 'expense_asc' | 'expense_desc' | 'risk_asc' | 'risk_desc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: '1y', label: '1Y Returns ↓' },
  { value: '3y', label: '3Y Returns ↓' },
  { value: '5y', label: '5Y Returns ↓' },
  { value: 'expense_asc', label: 'Expense Ratio ↑' },
  { value: 'expense_desc', label: 'Expense Ratio ↓' },
  { value: 'risk_asc', label: 'Risk: Low → High' },
  { value: 'risk_desc', label: 'Risk: High → Low' },
];

const RISK_ORDER: Record<string, number> = { 'Low': 1, 'Moderate': 2, 'High': 3, 'Very High': 4 };

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

  // Returns sliders open state
  const [openReturn, setOpenReturn] = useState<string | null>(null);

  // Sorting
  const [sortBy, setSortBy] = useState<SortOption>('1y');

  // AI state
  const [aiQuery, setAiQuery] = useState(initialAIQuery);

  // Fund detail sheet state
  const [detailFund, setDetailFund] = useState<MutualFund | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const allCategories = assetClass
    ? getCategoriesForAssetClass(assetClass)
    : [...EQUITY_CATEGORIES, ...DEBT_CATEGORIES, ...HYBRID_CATEGORIES];

  const baseFunds = restrictToCodes
    ? MOCK_FUNDS.filter(f => restrictToCodes.includes(f.code))
    : MOCK_FUNDS;

  const conventionalResults = useMemo(() => {
    let results = baseFunds.filter(f => {
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

    // Sort
    results = [...results].sort((a, b) => {
      switch (sortBy) {
        case '1y': return b.returns1Y - a.returns1Y;
        case '3y': return b.returns3Y - a.returns3Y;
        case '5y': return b.returns5Y - a.returns5Y;
        case 'expense_asc': return a.expenseRatio - b.expenseRatio;
        case 'expense_desc': return b.expenseRatio - a.expenseRatio;
        case 'risk_asc': return (RISK_ORDER[a.riskLevel] || 0) - (RISK_ORDER[b.riskLevel] || 0);
        case 'risk_desc': return (RISK_ORDER[b.riskLevel] || 0) - (RISK_ORDER[a.riskLevel] || 0);
        default: return 0;
      }
    });

    return results;
  }, [baseFunds, query, assetClass, category, marketCap, sector, maxExpenseRatio, minReturns1Y, minReturns3Y, minReturns5Y, amc, sortBy]);

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
    setDetailFund(fund);
    setDetailOpen(true);
  };

  const handleInvestFromDetail = (fund: MutualFund, _mode: 'sip' | 'onetime') => {
    setDetailOpen(false);
    onSelectFund?.(fund);
  };

  // Returns filter item renderer
  const renderReturnFilter = (key: string, label: string, value: number, setValue: (v: number) => void) => {
    const isOpen = openReturn === key;
    return (
      <div className="border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => setOpenReturn(isOpen ? null : key)}
          className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-muted/50 transition-colors"
        >
          <span className="text-muted-foreground font-medium">{label}</span>
          <div className="flex items-center gap-1.5">
            {value > 0 && (
              <Badge variant="default" className="text-[9px] px-1.5 py-0 h-4">
                ≥{value}%
              </Badge>
            )}
            <ChevronDown className={cn('w-3 h-3 text-muted-foreground transition-transform', isOpen && 'rotate-180')} />
          </div>
        </button>
        {isOpen && (
          <div className="px-3 pb-3 pt-1 border-t border-border bg-muted/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-muted-foreground">Min Return</span>
              <span className="text-xs font-bold text-primary">{value}%</span>
            </div>
            <Slider value={[value]} onValueChange={v => setValue(v[0])} min={0} max={50} step={1} />
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-muted-foreground">0%</span>
              <span className="text-[9px] text-muted-foreground">50%</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Fund card renderer
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
            <span className={cn('text-[10px] font-semibold', sortBy === '1y' ? 'text-primary' : 'text-green-600')}>
              1Y: {fund.returns1Y}%
            </span>
            <span className={cn('text-[10px] font-semibold', sortBy === '3y' ? 'text-primary' : 'text-green-700')}>
              3Y: {fund.returns3Y}%
            </span>
            <span className={cn('text-[10px] font-semibold', sortBy === '5y' ? 'text-primary' : 'text-green-800')}>
              5Y: {fund.returns5Y}%
            </span>
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
              onChange={e => {
                setQuery(e.target.value);
                // Auto-close advanced filters when searching
                if (e.target.value && showAdvanced) {
                  setShowAdvanced(false);
                }
              }}
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
              <div className="p-3 rounded-lg border border-border bg-muted/30 space-y-4">
                {/* Asset Class chips */}
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

                {/* Searchable dropdowns row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Category</Label>
                    <SearchableSelect
                      options={allCategories}
                      value={category}
                      onChange={v => setCategory(v)}
                      placeholder="Category"
                      allLabel="All Categories"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Market Cap</Label>
                    <SearchableSelect
                      options={MARKET_CAPS}
                      value={marketCap}
                      onChange={v => setMarketCap(v as MarketCap | undefined)}
                      placeholder="Market Cap"
                      allLabel="All Caps"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Sector</Label>
                    <SearchableSelect
                      options={SECTORS}
                      value={sector}
                      onChange={v => setSector(v)}
                      placeholder="Sector"
                      allLabel="All Sectors"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Fund House</Label>
                    <SearchableSelect
                      options={AMC_LIST}
                      value={amc}
                      onChange={v => setAmc(v)}
                      placeholder="Fund House"
                      allLabel="All AMCs"
                    />
                  </div>
                </div>

                {/* Expense Ratio */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Expense Ratio</Label>
                    <span className="text-xs font-bold text-primary">
                      {maxExpenseRatio >= 5 ? 'Any' : `≤ ${maxExpenseRatio.toFixed(1)}%`}
                    </span>
                  </div>
                  <Slider value={[maxExpenseRatio]} onValueChange={v => setMaxExpenseRatio(v[0])} min={0} max={5} step={0.1} />
                </div>

                {/* Returns — collapsible list items */}
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Minimum Returns</Label>
                  <div className="space-y-1">
                    {renderReturnFilter('1y', '1 Year Returns', minReturns1Y, setMinReturns1Y)}
                    {renderReturnFilter('3y', '3 Year Returns', minReturns3Y, setMinReturns3Y)}
                    {renderReturnFilter('5y', '5 Year Returns', minReturns5Y, setMinReturns5Y)}
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

      {/* Results header with count + sorting */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] text-muted-foreground shrink-0">
          {mode === 'ai' && !aiResults
            ? 'Submit a query to see results'
            : `${displayedFunds.length} fund${displayedFunds.length !== 1 ? 's' : ''} found`}
        </p>
        <div className="flex items-center gap-2">
          {mode === 'conventional' && activeFilterCount > 0 && (
            <button onClick={clearFilters} className="text-[10px] text-primary hover:underline shrink-0">Reset</button>
          )}
          <Select value={sortBy} onValueChange={v => setSortBy(v as SortOption)}>
            <SelectTrigger className="h-7 text-[10px] w-[140px] gap-1">
              <ArrowUpDown className="w-3 h-3 shrink-0" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map(opt => (
                <SelectItem key={opt.value} value={opt.value} className="text-xs">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Fund list */}
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
