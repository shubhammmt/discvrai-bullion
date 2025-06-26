
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

const FilterPanel = ({ assetType, filters, onFiltersChange, onSearch, isLoading }: FilterPanelProps) => {
  const { filterOptions, isLoading: isLoadingOptions, error: optionsError } = useFilterOptions();

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const removeFilter = (key: string) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const renderStockFilters = () => {
    if (isLoadingOptions) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading filter options...</span>
        </div>
      );
    }

    const stockOptions = filterOptions?.stocks;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Market Cap Range */}
        <div>
          <Label>Market Cap</Label>
          {stockOptions?.market_cap_ranges ? (
            <Select onValueChange={(value) => updateFilter('market_cap', [value])}>
              <SelectTrigger>
                <SelectValue placeholder="Select market cap" />
              </SelectTrigger>
              <SelectContent>
                {stockOptions.market_cap_ranges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Min (₹ Cr)"
                type="number"
                onChange={(e) => updateFilter('market_cap', {
                  ...(filters.market_cap as RangeFilter || {}),
                  min: parseFloat(e.target.value) * 10000000 || undefined
                })}
              />
              <Input
                placeholder="Max (₹ Cr)"
                type="number"
                onChange={(e) => updateFilter('market_cap', {
                  ...(filters.market_cap as RangeFilter || {}),
                  max: parseFloat(e.target.value) * 10000000 || undefined
                })}
              />
            </div>
          )}
        </div>

        {/* PE Ratio Range */}
        <div>
          <Label>PE Ratio</Label>
          {stockOptions?.pe_ratio_ranges ? (
            <Select onValueChange={(value) => updateFilter('pe_ratio', [value])}>
              <SelectTrigger>
                <SelectValue placeholder="Select PE ratio range" />
              </SelectTrigger>
              <SelectContent>
                {stockOptions.pe_ratio_ranges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Min"
                type="number"
                onChange={(e) => updateFilter('pe_ratio', {
                  ...(filters.pe_ratio as RangeFilter || {}),
                  min: parseFloat(e.target.value) || undefined
                })}
              />
              <Input
                placeholder="Max"
                type="number"
                onChange={(e) => updateFilter('pe_ratio', {
                  ...(filters.pe_ratio as RangeFilter || {}),
                  max: parseFloat(e.target.value) || undefined
                })}
              />
            </div>
          )}
        </div>

        {/* Current Price Range */}
        <div>
          <Label>Price Range</Label>
          {stockOptions?.price_ranges ? (
            <Select onValueChange={(value) => updateFilter('current_price', [value])}>
              <SelectTrigger>
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                {stockOptions.price_ranges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Min (₹)"
                type="number"
                onChange={(e) => updateFilter('current_price', {
                  ...(filters.current_price as RangeFilter || {}),
                  min: parseFloat(e.target.value) || undefined
                })}
              />
              <Input
                placeholder="Max (₹)"
                type="number"
                onChange={(e) => updateFilter('current_price', {
                  ...(filters.current_price as RangeFilter || {}),
                  max: parseFloat(e.target.value) || undefined
                })}
              />
            </div>
          )}
        </div>

        {/* Sector */}
        <div>
          <Label htmlFor="sector">Sector</Label>
          <Select onValueChange={(value) => updateFilter('sector', [value])}>
            <SelectTrigger>
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              {(stockOptions?.sectors || [
                'Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer',
                'Banking', 'Automobile', 'Pharmaceuticals', 'Real Estate', 'Telecommunications'
              ]).map((sector) => (
                <SelectItem key={sector} value={sector}>{sector}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Revenue Growth */}
        <div>
          <Label>Revenue Growth (YoY)</Label>
          {stockOptions?.revenue_growth_ranges ? (
            <Select onValueChange={(value) => updateFilter('revenue_growth_1y', [value])}>
              <SelectTrigger>
                <SelectValue placeholder="Select growth range" />
              </SelectTrigger>
              <SelectContent>
                {stockOptions.revenue_growth_ranges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Min %"
                type="number"
                onChange={(e) => updateFilter('revenue_growth_1y', {
                  ...(filters.revenue_growth_1y as RangeFilter || {}),
                  min: parseFloat(e.target.value) || undefined
                })}
              />
              <Input
                placeholder="Max %"
                type="number"
                onChange={(e) => updateFilter('revenue_growth_1y', {
                  ...(filters.revenue_growth_1y as RangeFilter || {}),
                  max: parseFloat(e.target.value) || undefined
                })}
              />
            </div>
          )}
        </div>

        {/* ROE Range */}
        <div>
          <Label>ROE</Label>
          {stockOptions?.roe_ranges ? (
            <Select onValueChange={(value) => updateFilter('roe', [value])}>
              <SelectTrigger>
                <SelectValue placeholder="Select ROE range" />
              </SelectTrigger>
              <SelectContent>
                {stockOptions.roe_ranges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Min %"
                type="number"
                onChange={(e) => updateFilter('roe', {
                  ...(filters.roe as RangeFilter || {}),
                  min: parseFloat(e.target.value) || undefined
                })}
              />
              <Input
                placeholder="Max %"
                type="number"
                onChange={(e) => updateFilter('roe', {
                  ...(filters.roe as RangeFilter || {}),
                  max: parseFloat(e.target.value) || undefined
                })}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMutualFundFilters = () => {
    if (isLoadingOptions) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading filter options...</span>
        </div>
      );
    }

    const mfOptions = filterOptions?.mutual_funds;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Category */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={(value) => updateFilter('category', [value])}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {(mfOptions?.categories || [
                'Large Cap Fund', 'Mid Cap Fund', 'Flexi Cap Fund', 'ELSS', 'Debt Fund'
              ]).map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Risk Level */}
        <div>
          <Label htmlFor="riskLevel">Risk Level</Label>
          <Select onValueChange={(value) => updateFilter('riskLevel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select risk level" />
            </SelectTrigger>
            <SelectContent>
              {(mfOptions?.risk_levels || ['Low', 'Moderate', 'High']).map((risk) => (
                <SelectItem key={risk} value={risk}>{risk}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Expense Ratio */}
        <div>
          <Label htmlFor="expenseRatio">Expense Ratio</Label>
          <Select onValueChange={(value) => updateFilter('expenseRatio', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select expense ratio" />
            </SelectTrigger>
            <SelectContent>
              {(mfOptions?.expense_ratio_options || [
                'Below 0.5%', '0.5% - 1%', '1% - 1.5%', '1.5% - 2%', 'Above 2%'
              ]).map((ratio) => (
                <SelectItem key={ratio} value={ratio}>{ratio}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* AMC Name */}
        <div>
          <Label htmlFor="amcName">AMC Name</Label>
          <Select onValueChange={(value) => updateFilter('amcName', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select AMC" />
            </SelectTrigger>
            <SelectContent>
              {(mfOptions?.amc_names || [
                'SBI Mutual Fund', 'HDFC Mutual Fund', 'ICICI Prudential Mutual Fund',
                'Axis Mutual Fund', 'Kotak Mahindra Mutual Fund', 'Nippon India Mutual Fund'
              ]).map((amc) => (
                <SelectItem key={amc} value={amc}>{amc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 1-Year Returns */}
        <div>
          <Label>1-Year Returns</Label>
          {mfOptions?.return_1y_options ? (
            <Select onValueChange={(value) => updateFilter('returns1y', [value])}>
              <SelectTrigger>
                <SelectValue placeholder="Select return range" />
              </SelectTrigger>
              <SelectContent>
                {mfOptions.return_1y_options.map((returnRange) => (
                  <SelectItem key={returnRange} value={returnRange}>{returnRange}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Min %"
                type="number"
                onChange={(e) => updateFilter('returns1y', {
                  ...(filters.returns1y as RangeFilter || {}),
                  min: parseFloat(e.target.value) || undefined
                })}
              />
              <Input
                placeholder="Max %"
                type="number"
                onChange={(e) => updateFilter('returns1y', {
                  ...(filters.returns1y as RangeFilter || {}),
                  max: parseFloat(e.target.value) || undefined
                })}
              />
            </div>
          )}
        </div>

        {/* AUM */}
        <div>
          <Label>AUM</Label>
          {mfOptions?.aum_options ? (
            <Select onValueChange={(value) => updateFilter('aum', [value])}>
              <SelectTrigger>
                <SelectValue placeholder="Select AUM range" />
              </SelectTrigger>
              <SelectContent>
                {mfOptions.aum_options.map((aumRange) => (
                  <SelectItem key={aumRange} value={aumRange}>{aumRange}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Min (₹ Cr)"
                type="number"
                onChange={(e) => updateFilter('aum', {
                  ...(filters.aum as RangeFilter || {}),
                  min: parseFloat(e.target.value) || undefined
                })}
              />
              <Input
                placeholder="Max (₹ Cr)"
                type="number"
                onChange={(e) => updateFilter('aum', {
                  ...(filters.aum as RangeFilter || {}),
                  max: parseFloat(e.target.value) || undefined
                })}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderIPOFilters = () => {
    if (isLoadingOptions) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading filter options...</span>
        </div>
      );
    }

    const ipoOptions = filterOptions?.ipos;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* IPO Status */}
        <div>
          <Label htmlFor="status">IPO Status</Label>
          <Select onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {(ipoOptions?.status_options || ['Open', 'Closed', 'Upcoming']).map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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

  if (optionsError) {
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
        <Button onClick={onSearch} disabled={isLoading || isLoadingOptions}>
          {isLoading ? 'Searching...' : 'Apply Filters & Search'}
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
