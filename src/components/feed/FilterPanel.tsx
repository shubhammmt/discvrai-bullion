import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Loader2 } from 'lucide-react';
import { AssetType, SearchFilters, RangeFilter } from '@/utils/unifiedSearchApi';
import { useFilterOptions } from '@/hooks/useFilterOptions';

interface FilterPanelProps {
  assetType: AssetType;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  isLoading: boolean;
}

// Static sector data for stocks to avoid backend issues
const STOCK_SECTORS = [
  {"value": "basic_materials", "label": "Basic Materials"},
  {"value": "communication_services", "label": "Communication Services"},
  {"value": "consumer_cyclical", "label": "Consumer Cyclical"},
  {"value": "consumer_defensive", "label": "Consumer Defensive"},
  {"value": "energy", "label": "Energy"},
  {"value": "financial_services", "label": "Financial Services"},
  {"value": "healthcare", "label": "Healthcare"},
  {"value": "industrials", "label": "Industrials"},
  {"value": "real_estate", "label": "Real Estate"},
  {"value": "technology", "label": "Technology"},
  {"value": "utilities", "label": "Utilities"}
];

const FilterPanel = ({ assetType, filters, onFiltersChange, onSearch, isLoading }: FilterPanelProps) => {
  console.log('🔍 FilterPanel render - assetType:', assetType);
  
  // Only fetch filter options for non-stock assets
  const shouldFetchOptions = assetType !== 'stock';
  const { filterOptions, isLoading: isLoadingOptions, error: optionsError } = useFilterOptions();
  
  console.log('🔍 FilterPanel state:', {
    assetType,
    shouldFetchOptions,
    isLoadingOptions,
    hasFilterOptions: !!filterOptions,
    optionsError
  });

  // Enhanced validation function to filter out invalid options
  const getValidSelectOptions = (options: any[] | undefined) => {
    console.log('🔍 getValidSelectOptions called with:', options);
    
    if (!Array.isArray(options)) {
      console.log('🔍 options is not an array, returning empty array');
      return [];
    }
    
    const validOptions = options.filter((option) => {
      if (!option || typeof option !== 'object') {
        return false;
      }
      
      // Get the value from different possible fields
      const value = option.value || option.name || option.label;
      
      // CRITICAL FIX: Filter out empty strings, null, undefined, and other falsy values
      // Also ensure the value is a non-empty string after trimming
      return value && 
             typeof value === 'string' && 
             value.trim() !== '' && 
             value.trim().length > 0 &&
             value !== ''; // Explicitly check for empty string
    });
    
    console.log('🔍 getValidSelectOptions returning:', validOptions.length, 'valid options');
    return validOptions;
  };

  // Add debugging logs
  useEffect(() => {
    console.log('🔍 FilterPanel useEffect - Component mounted/updated');
  }, [assetType, isLoadingOptions, filterOptions, optionsError]);

  const updateFilter = (key: string, value: any) => {
    console.log('🔍 updateFilter called:', key, value);
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const updateRangeFilter = (key: string, field: 'min' | 'max', value: string) => {
    console.log('🔍 updateRangeFilter called:', key, field, value);
    const currentFilter = filters[key] as RangeFilter || {};
    const numValue = value === '' ? undefined : parseFloat(value);
    
    const newFilter = {
      ...currentFilter,
      [field]: numValue
    };
    
    if (newFilter.min === undefined && newFilter.max === undefined) {
      const newFilters = { ...filters };
      delete newFilters[key];
      onFiltersChange(newFilters);
    } else {
      updateFilter(key, newFilter);
    }
  };

  const removeFilter = (key: string) => {
    console.log('🔍 removeFilter called:', key);
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    console.log('🔍 clearAllFilters called');
    onFiltersChange({});
  };

  const renderStockFilters = () => {
    console.log('🔍 renderStockFilters called - using static data');

    try {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Market Cap Range - Min/Max Inputs */}
          <div>
            <Label>Market Cap (₹ Crores)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={(filters.market_cap as RangeFilter)?.min || ''}
                onChange={(e) => updateRangeFilter('market_cap', 'min', e.target.value)}
              />
              <Input
                placeholder="Max"
                type="number"
                value={(filters.market_cap as RangeFilter)?.max || ''}
                onChange={(e) => updateRangeFilter('market_cap', 'max', e.target.value)}
              />
            </div>
          </div>

          {/* PE Ratio Range - Min/Max Inputs */}
          <div>
            <Label>PE Ratio</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={(filters.pe_ratio as RangeFilter)?.min || ''}
                onChange={(e) => updateRangeFilter('pe_ratio', 'min', e.target.value)}
              />
              <Input
                placeholder="Max"
                type="number"
                value={(filters.pe_ratio as RangeFilter)?.max || ''}
                onChange={(e) => updateRangeFilter('pe_ratio', 'max', e.target.value)}
              />
            </div>
          </div>

          {/* Current Price Range - Min/Max Inputs */}
          <div>
            <Label>Price Range (₹)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={(filters.current_price as RangeFilter)?.min || ''}
                onChange={(e) => updateRangeFilter('current_price', 'min', e.target.value)}
              />
              <Input
                placeholder="Max"
                type="number"
                value={(filters.current_price as RangeFilter)?.max || ''}
                onChange={(e) => updateRangeFilter('current_price', 'max', e.target.value)}
              />
            </div>
          </div>

          {/* Sector Select - Using Static Data */}
          <div>
            <Label htmlFor="sector">Sector</Label>
            <Select onValueChange={(value) => updateFilter('sector', [value])}>
              <SelectTrigger>
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {STOCK_SECTORS.map((sector) => (
                  <SelectItem key={sector.value} value={sector.value}>
                    {sector.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* EPS Growth - Min/Max Inputs */}
          <div>
            <Label>EPS Growth (YoY %)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={(filters.eps_growth_ttm as RangeFilter)?.min || ''}
                onChange={(e) => updateRangeFilter('eps_growth_ttm', 'min', e.target.value)}
              />
              <Input
                placeholder="Max"
                type="number"
                value={(filters.eps_growth_ttm as RangeFilter)?.max || ''}
                onChange={(e) => updateRangeFilter('eps_growth_ttm', 'max', e.target.value)}
              />
            </div>
          </div>

          {/* ROE Range - Min/Max Inputs */}
          <div>
            <Label>ROE (%)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={(filters.roe as RangeFilter)?.min || ''}
                onChange={(e) => updateRangeFilter('roe', 'min', e.target.value)}
              />
              <Input
                placeholder="Max"
                type="number"
                value={(filters.roe as RangeFilter)?.max || ''}
                onChange={(e) => updateRangeFilter('roe', 'max', e.target.value)}
              />
            </div>
          </div>
        </div>
      );
    } catch (error) {
      console.error('🔍 Error in renderStockFilters:', error);
      return <div>Error rendering stock filters</div>;
    }
  };

  const renderMutualFundFilters = () => {
    console.log('🔍 renderMutualFundFilters called');
    
    if (isLoadingOptions || !filterOptions?.mutual_funds) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading filter options...</span>
        </div>
      );
    }

    const mfOptions = filterOptions.mutual_funds;
    const validCategories = getValidSelectOptions(mfOptions?.categories);
    const validRiskLevels = getValidSelectOptions(mfOptions?.risk_levels);
    const validAmcNames = getValidSelectOptions(mfOptions?.amc_names);
    const validExpenseRatioOptions = getValidSelectOptions(mfOptions?.expense_ratio_options);
    const validAumOptions = getValidSelectOptions(mfOptions?.aum_options);
    const validReturn1yOptions = getValidSelectOptions(mfOptions?.return_1y_options);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Category Select */}
        {validCategories.length > 0 && (
          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => updateFilter('category', [value])}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {validCategories.map((category, idx) => {
                  const categoryValue = category.value || category.name || category.label;
                  return (
                    <SelectItem key={`category-${idx}-${categoryValue}`} value={categoryValue}>
                      {category.name} ({category.count})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Risk Level Select */}
        {validRiskLevels.length > 0 && (
          <div>
            <Label htmlFor="riskLevel">Risk Level</Label>
            <Select onValueChange={(value) => updateFilter('riskLevel', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent>
                {validRiskLevels.map((risk, idx) => {
                  const riskValue = risk.value || risk.name || risk.label;
                  return (
                    <SelectItem key={`risk-${idx}-${riskValue}`} value={riskValue}>
                      {risk.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* AMC Name Select */}
        {validAmcNames.length > 0 && (
          <div>
            <Label htmlFor="amcName">Asset Management Company</Label>
            <Select onValueChange={(value) => updateFilter('amcName', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select AMC" />
              </SelectTrigger>
              <SelectContent>
                {validAmcNames.slice(0, 10).map((amc, idx) => {
                  const amcValue = amc.value || amc.name || amc.label;
                  return (
                    <SelectItem key={`amc-${idx}-${amcValue}`} value={amcValue}>
                      {amc.name} ({amc.count})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Expense Ratio Select */}
        {validExpenseRatioOptions.length > 0 && (
          <div>
            <Label htmlFor="expenseRatio">Expense Ratio</Label>
            <Select onValueChange={(value) => updateFilter('expenseRatio', parseFloat(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select expense ratio" />
              </SelectTrigger>
              <SelectContent>
                {validExpenseRatioOptions.map((expense, idx) => {
                  const expenseValue = expense.value?.toString() || 'any';
                  return (
                    <SelectItem key={`expense-${idx}-${expenseValue}`} value={expenseValue}>
                      {expense.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* AUM Select */}
        {validAumOptions.length > 0 && (
          <div>
            <Label htmlFor="aum">Fund Size (AUM)</Label>
            <Select onValueChange={(value) => updateFilter('aum', parseFloat(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select AUM" />
              </SelectTrigger>
              <SelectContent>
                {validAumOptions.map((aum, idx) => {
                  const aumValue = aum.min_value?.toString() || 'any';
                  return (
                    <SelectItem key={`aum-${idx}-${aumValue}`} value={aumValue}>
                      {aum.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* 1 Year Returns Select */}
        {validReturn1yOptions.length > 0 && (
          <div>
            <Label htmlFor="return1y">1 Year Returns</Label>
            <Select onValueChange={(value) => updateFilter('return1y', parseFloat(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select returns" />
              </SelectTrigger>
              <SelectContent>
                {validReturn1yOptions.map((returns, idx) => {
                  const returnValue = returns.value?.toString() || 'any';
                  return (
                    <SelectItem key={`return1y-${idx}-${returnValue}`} value={returnValue}>
                      {returns.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    );
  };

  const renderIPOFilters = () => {
    console.log('🔍 renderIPOFilters called');
    
    if (isLoadingOptions || !filterOptions?.ipos) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading filter options...</span>
        </div>
      );
    }

    const ipoOptions = filterOptions.ipos;
    const validStatusOptions = getValidSelectOptions(ipoOptions?.status_options);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* IPO Status Select */}
        {validStatusOptions.length > 0 && (
          <div>
            <Label htmlFor="status">IPO Status</Label>
            <Select onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {validStatusOptions.map((status, idx) => {
                  const statusValue = status.value || status.name || status.label;
                  return (
                    <SelectItem key={`status-${idx}-${statusValue}`} value={statusValue}>
                      {status.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    );
  };

  const formatFilterValue = (value: any): string => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object' && value !== null) {
      const rangeValue = value as RangeFilter;
      if (rangeValue.min !== undefined && rangeValue.max !== undefined) {
        return `${rangeValue.min} - ${rangeValue.max}`;
      }
      if (rangeValue.min !== undefined) {
        return `≥ ${rangeValue.min}`;
      }
      if (rangeValue.max !== undefined) {
        return `≤ ${rangeValue.max}`;
      }
    }
    return String(value);
  };

  const getActiveFilters = () => {
    return Object.entries(filters).filter(([_, value]) => 
      value !== undefined && value !== null && 
      (Array.isArray(value) ? value.length > 0 : true)
    );
  };

  const activeFilters = getActiveFilters();

  console.log('🔍 About to render FilterPanel');

  // Handle error state for non-stock assets
  if (optionsError && assetType !== 'stock') {
    return (
      <div className="space-y-4">
        <div className="text-center py-8 text-red-600">
          <p>Failed to load filter options: {optionsError}</p>
          <Button variant="outline" onClick={() => window.location.reload()} className="mt-2">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="space-y-4">
        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Active Filters:</span>
            {activeFilters.map(([key, value]) => (
              <Badge key={key} variant="secondary" className="flex items-center gap-1">
                {key}: {formatFilterValue(value)}
                <X 
                  size={12} 
                  className="cursor-pointer" 
                  onClick={() => removeFilter(key)}
                />
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>
        )}

        {/* Filter Forms */}
        {assetType === 'stock' && renderStockFilters()}
        {assetType === 'mutual-fund' && renderMutualFundFilters()}
        {assetType === 'ipo' && renderIPOFilters()}

        {/* Search Button */}
        <div className="flex justify-end pt-4">
          <Button 
            onClick={onSearch} 
            disabled={isLoading || (assetType !== 'stock' && isLoadingOptions)}
          >
            {isLoading ? 'Searching...' : 'Apply Filters & Search'}
          </Button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('🔍 Error in FilterPanel render:', error);
    return (
      <div className="space-y-4">
        <div className="text-center py-8 text-red-600">
          <p>Error rendering filter panel. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }
};

export default FilterPanel;
