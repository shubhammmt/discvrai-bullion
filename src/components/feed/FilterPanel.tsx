
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { AssetType, SearchFilters } from '@/utils/unifiedSearchApi';

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
      {/* Market Cap */}
      <div>
        <Label htmlFor="marketCap">Market Cap</Label>
        <Select onValueChange={(value) => updateFilter('marketCap', [value])}>
          <SelectTrigger>
            <SelectValue placeholder="Select market cap" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="large">Large Cap</SelectItem>
            <SelectItem value="mid">Mid Cap</SelectItem>
            <SelectItem value="small">Small Cap</SelectItem>
            <SelectItem value="micro">Micro Cap</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* PE Ratio Range */}
      <div>
        <Label>PE Ratio</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Min"
            type="number"
            onChange={(e) => updateFilter('peRatio', {
              ...filters.peRatio,
              min: parseFloat(e.target.value) || undefined
            })}
          />
          <Input
            placeholder="Max"
            type="number"
            onChange={(e) => updateFilter('peRatio', {
              ...filters.peRatio,
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
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="energy">Energy</SelectItem>
            <SelectItem value="consumer">Consumer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label>Price Range (₹)</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Min"
            type="number"
            onChange={(e) => updateFilter('priceRange', {
              ...filters.priceRange,
              min: parseFloat(e.target.value) || undefined
            })}
          />
          <Input
            placeholder="Max"
            type="number"
            onChange={(e) => updateFilter('priceRange', {
              ...filters.priceRange,
              max: parseFloat(e.target.value) || undefined
            })}
          />
        </div>
      </div>

      {/* Returns */}
      <div>
        <Label htmlFor="returns">Returns Period</Label>
        <Select onValueChange={(value) => updateFilter('returns', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">1 Day</SelectItem>
            <SelectItem value="1w">1 Week</SelectItem>
            <SelectItem value="1m">1 Month</SelectItem>
            <SelectItem value="3m">3 Months</SelectItem>
            <SelectItem value="6m">6 Months</SelectItem>
            <SelectItem value="1y">1 Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Technical Signal */}
      <div>
        <Label htmlFor="technicalSignal">Technical Signal</Label>
        <Select onValueChange={(value) => updateFilter('technicalSignal', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select signal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bullish">Bullish</SelectItem>
            <SelectItem value="bearish">Bearish</SelectItem>
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
        <Label>Expense Ratio (%)</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Min"
            type="number"
            step="0.1"
            onChange={(e) => updateFilter('expenseRatio', {
              ...filters.expenseRatio,
              min: parseFloat(e.target.value) || undefined
            })}
          />
          <Input
            placeholder="Max"
            type="number"
            step="0.1"
            onChange={(e) => updateFilter('expenseRatio', {
              ...filters.expenseRatio,
              max: parseFloat(e.target.value) || undefined
            })}
          />
        </div>
      </div>

      {/* AUM */}
      <div>
        <Label>AUM (₹ Crores)</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Min"
            type="number"
            onChange={(e) => updateFilter('aum', {
              ...filters.aum,
              min: parseFloat(e.target.value) || undefined
            })}
          />
          <Input
            placeholder="Max"
            type="number"
            onChange={(e) => updateFilter('aum', {
              ...filters.aum,
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
              {key}: {Array.isArray(value) ? value.join(', ') : 
                     typeof value === 'object' ? `${value.min || ''}-${value.max || ''}` : 
                     value}
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
