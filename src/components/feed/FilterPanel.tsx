import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { AssetType, SearchFilters, RangeFilter } from '@/utils/unifiedSearchApi';

interface FilterPanelProps {
  assetType: AssetType;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const FilterPanel = ({ assetType, filters, onFiltersChange, onSearch, isLoading }: FilterPanelProps) => {
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

  const renderStockFilters = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Market Cap Range */}
      <div>
        <Label>Market Cap (₹ Crores)</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Min"
            type="number"
            onChange={(e) => updateFilter('market_cap', {
              ...(filters.market_cap as RangeFilter || {}),
              min: parseFloat(e.target.value) * 10000000 || undefined // Convert crores to actual value
            })}
          />
          <Input
            placeholder="Max"
            type="number"
            onChange={(e) => updateFilter('market_cap', {
              ...(filters.market_cap as RangeFilter || {}),
              max: parseFloat(e.target.value) * 10000000 || undefined
            })}
          />
        </div>
      </div>

      {/* PE Ratio Range */}
      <div>
        <Label>PE Ratio</Label>
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
      </div>

      {/* Current Price Range */}
      <div>
        <Label>Price Range (₹)</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Min"
            type="number"
            onChange={(e) => updateFilter('current_price', {
              ...(filters.current_price as RangeFilter || {}),
              min: parseFloat(e.target.value) || undefined
            })}
          />
          <Input
            placeholder="Max"
            type="number"
            onChange={(e) => updateFilter('current_price', {
              ...(filters.current_price as RangeFilter || {}),
              max: parseFloat(e.target.value) || undefined
            })}
          />
        </div>
      </div>

      {/* Sector */}
      <div>
        <Label htmlFor="sector">Sector</Label>
        <Select onValueChange={(value) => updateFilter('sector', [value])}>
          <SelectTrigger>
            <SelectValue placeholder="Select sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Energy">Energy</SelectItem>
            <SelectItem value="Consumer">Consumer</SelectItem>
            <SelectItem value="Banking">Banking</SelectItem>
            <SelectItem value="Automobile">Automobile</SelectItem>
            <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
            <SelectItem value="Real Estate">Real Estate</SelectItem>
            <SelectItem value="Telecommunications">Telecommunications</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Revenue Growth */}
      <div>
        <Label>Revenue Growth % (YoY)</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Min"
            type="number"
            onChange={(e) => updateFilter('revenue_growth_1y', {
              ...(filters.revenue_growth_1y as RangeFilter || {}),
              min: parseFloat(e.target.value) || undefined
            })}
          />
          <Input
            placeholder="Max"
            type="number"
            onChange={(e) => updateFilter('revenue_growth_1y', {
              ...(filters.revenue_growth_1y as RangeFilter || {}),
              max: parseFloat(e.target.value) || undefined
            })}
          />
        </div>
      </div>

      {/* ROE Range */}
      <div>
        <Label>ROE %</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Min"
            type="number"
            onChange={(e) => updateFilter('roe', {
              ...(filters.roe as RangeFilter || {}),
              min: parseFloat(e.target.value) || undefined
            })}
          />
          <Input
            placeholder="Max"
            type="number"
            onChange={(e) => updateFilter('roe', {
              ...(filters.roe as RangeFilter || {}),
              max: parseFloat(e.target.value) || undefined
            })}
          />
        </div>
      </div>

      {/* Debt to Equity */}
      <div>
        <Label>Debt to Equity Ratio</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Max"
            type="number"
            onChange={(e) => updateFilter('debt_to_equity', {
              max: parseFloat(e.target.value) || undefined
            })}
          />
        </div>
      </div>

      {/* RSI */}
      <div>
        <Label>RSI (14-day)</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Min"
            type="number"
            min="0"
            max="100"
            onChange={(e) => updateFilter('rsi_14', {
              ...(filters.rsi_14 as RangeFilter || {}),
              min: parseFloat(e.target.value) || undefined
            })}
          />
          <Input
            placeholder="Max"
            type="number"
            min="0"
            max="100"
            onChange={(e) => updateFilter('rsi_14', {
              ...(filters.rsi_14 as RangeFilter || {}),
              max: parseFloat(e.target.value) || undefined
            })}
          />
        </div>
      </div>

      {/* Growth Stock Filter */}
      <div>
        <Label htmlFor="isGrowthStock">Growth Stock</Label>
        <Select onValueChange={(value) => updateFilter('is_growth_stock', value === 'true')}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Growth Stocks Only</SelectItem>
            <SelectItem value="false">Value Stocks Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderMutualFundFilters = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Category */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={(value) => updateFilter('category', [value])}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="large">Large Cap</SelectItem>
            <SelectItem value="mid">Mid Cap</SelectItem>
            <SelectItem value="flexi">Flexi Cap</SelectItem>
            <SelectItem value="debt">Debt</SelectItem>
            <SelectItem value="tax">Tax Saver</SelectItem>
            <SelectItem value="elss">ELSS</SelectItem>
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
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="high">High</SelectItem>
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
            <SelectItem value="below0.5">Below 0.5%</SelectItem>
            <SelectItem value="0.5-1">0.5% - 1%</SelectItem>
            <SelectItem value="1-1.5">1% - 1.5%</SelectItem>
            <SelectItem value="1.5-2">1.5% - 2%</SelectItem>
            <SelectItem value="above2">Above 2%</SelectItem>
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
            <SelectItem value="sbi">SBI Mutual Fund</SelectItem>
            <SelectItem value="hdfc">HDFC Mutual Fund</SelectItem>
            <SelectItem value="icici">ICICI Prudential Mutual Fund</SelectItem>
            <SelectItem value="axis">Axis Mutual Fund</SelectItem>
            <SelectItem value="kotak">Kotak Mahindra Mutual Fund</SelectItem>
            <SelectItem value="nippon">Nippon India Mutual Fund</SelectItem>
            <SelectItem value="franklin">Franklin Templeton Mutual Fund</SelectItem>
            <SelectItem value="dsp">DSP Mutual Fund</SelectItem>
            <SelectItem value="invesco">Invesco Mutual Fund</SelectItem>
            <SelectItem value="mirae">Mirae Asset Mutual Fund</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* AUM */}
      <div>
        <Label>AUM (₹ Crores)</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Min"
            type="number"
            onChange={(e) => updateFilter('aum', {
              ...(filters.aum as RangeFilter || {}),
              min: parseFloat(e.target.value) || undefined
            })}
          />
          <Input
            placeholder="Max"
            type="number"
            onChange={(e) => updateFilter('aum', {
              ...(filters.aum as RangeFilter || {}),
              max: parseFloat(e.target.value) || undefined
            })}
          />
        </div>
      </div>
    </div>
  );

  const renderIPOFilters = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* IPO Status */}
      <div>
        <Label htmlFor="status">IPO Status</Label>
        <Select onValueChange={(value) => updateFilter('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

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
        <Button onClick={onSearch} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Apply Filters & Search'}
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
