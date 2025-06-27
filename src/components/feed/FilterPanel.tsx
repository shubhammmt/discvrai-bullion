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

  // Enhanced helper function with STRICT validation
  const getValidSelectOptions = (options: any[] | undefined, fieldName: string, assetType: string) => {
    console.log(`🔍 VALIDATING ${assetType.toUpperCase()} - ${fieldName}`);
    console.log('Raw options received:', options);
    
    if (!Array.isArray(options)) {
      console.log(`❌ ${fieldName}: Not an array, returning empty`);
      return [];
    }
    
    const validOptions = options.filter((option, index) => {
      console.log(`Checking option ${index} for ${fieldName}:`, option);
      
      if (!option || typeof option !== 'object') {
        console.log(`❌ Option ${index} rejected: not an object`);
        return false;
      }
      
      // Get the value from different possible fields
      const value = option.value || option.name || option.label;
      
      // ULTRA STRICT CHECK: Must be non-empty string
      const isValidValue = value && 
                          typeof value === 'string' && 
                          value.trim() !== '' && 
                          value !== '' &&
                          value !== 'undefined' &&
                          value !== 'null';
      
      if (!isValidValue) {
        console.log(`❌ ${fieldName} Option ${index} REJECTED - value: "${value}", type: ${typeof value}`);
        return false;
      }
      
      console.log(`✅ ${fieldName} Option ${index} ACCEPTED - value: "${value}"`);
      return true;
    });
    
    console.log(`📊 ${fieldName} Final: ${validOptions.length}/${options.length} valid options`);
    
    // Log each valid option's value to ensure no empty strings
    validOptions.forEach((opt, i) => {
      const val = opt.value || opt.name || opt.label;
      console.log(`Valid option ${i}: "${val}" (length: ${val.length})`);
    });
    
    return validOptions;
  };

  // Add debugging logs
  useEffect(() => {
    console.log('FilterPanel state:', {
      assetType,
      isLoadingOptions,
      hasFilterOptions: !!filterOptions,
      optionsError,
      filterOptionsKeys: filterOptions ? Object.keys(filterOptions) : null
    });
  }, [assetType, isLoadingOptions, filterOptions, optionsError]);

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const updateRangeFilter = (key: string, field: 'min' | 'max', value: string) => {
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
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const renderStockFilters = () => {
    console.log('🏢 === RENDERING STOCK FILTERS START ===');
    
    if (isLoadingOptions || !filterOptions?.stocks) {
      console.log('⏳ Stock filters loading...');
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading filter options...</span>
        </div>
      );
    }

    const stockOptions = filterOptions.stocks;
    console.log('📈 Stock options structure:', stockOptions);
    
    const validSectors = getValidSelectOptions(stockOptions?.sectors, 'SECTORS', 'stock');
    const validGrowthTypes = getValidSelectOptions(stockOptions?.growth_types, 'GROWTH_TYPES', 'stock');

    console.log('🏢 STOCK RENDER DECISION:');
    console.log(`- Sectors: ${validSectors.length} valid options`);
    console.log(`- Growth Types: ${validGrowthTypes.length} valid options`);

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

        {/* SECTOR SELECT - with detailed logging */}
        {validSectors.length > 0 ? (
          <div>
            <Label htmlFor="sector">Sector</Label>
            {(() => {
              console.log('🎯 About to render SECTOR Select with options:', validSectors);
              return (
                <Select onValueChange={(value) => {
                  console.log('🎯 SECTOR selected:', value);
                  updateFilter('sector', [value]);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {validSectors.map((sector, idx) => {
                      const sectorValue = sector.value || sector.name || sector.label;
                      console.log(`🎯 Rendering SECTOR SelectItem ${idx}: value="${sectorValue}"`);
                      
                      if (!sectorValue || sectorValue === '') {
                        console.error(`🚨 SECTOR SelectItem ${idx} has EMPTY VALUE!`, sector);
                        return null;
                      }
                      
                      return (
                        <SelectItem key={`sector-${idx}-${sectorValue}`} value={sectorValue}>
                          {sector.label || sectorValue}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              );
            })()}
          </div>
        ) : (
          <div>
            <Label>Sector</Label>
            <div className="text-sm text-gray-500 p-2 border rounded">No valid sectors available</div>
          </div>
        )}

        {/* GROWTH TYPE SELECT - with detailed logging */}
        {validGrowthTypes.length > 0 ? (
          <div>
            <Label htmlFor="growthType">Growth Type</Label>
            {(() => {
              console.log('📈 About to render GROWTH TYPE Select with options:', validGrowthTypes);
              return (
                <Select onValueChange={(value) => {
                  console.log('📈 GROWTH TYPE selected:', value);
                  updateFilter('growthType', value);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select growth type" />
                  </SelectTrigger>
                  <SelectContent>
                    {validGrowthTypes.map((growthType, idx) => {
                      const growthValue = growthType.value || growthType.name || growthType.label;
                      console.log(`📈 Rendering GROWTH TYPE SelectItem ${idx}: value="${growthValue}"`);
                      
                      if (!growthValue || growthValue === '') {
                        console.error(`🚨 GROWTH TYPE SelectItem ${idx} has EMPTY VALUE!`, growthType);
                        return null;
                      }
                      
                      return (
                        <SelectItem key={`growth-${idx}-${growthValue}`} value={growthValue}>
                          {growthType.label || growthValue}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              );
            })()}
          </div>
        ) : (
          <div>
            <Label>Growth Type</Label>
            <div className="text-sm text-gray-500 p-2 border rounded">No valid growth types available</div>
          </div>
        )}

        {/* Revenue Growth - Min/Max Inputs */}
        <div>
          <Label>Revenue Growth (YoY %)</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Min"
              type="number"
              value={(filters.revenue_growth_1y as RangeFilter)?.min || ''}
              onChange={(e) => updateRangeFilter('revenue_growth_1y', 'min', e.target.value)}
            />
            <Input
              placeholder="Max"
              type="number"
              value={(filters.revenue_growth_1y as RangeFilter)?.max || ''}
              onChange={(e) => updateRangeFilter('revenue_growth_1y', 'max', e.target.value)}
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
  };

  const renderMutualFundFilters = () => {
    console.log('💰 === RENDERING MUTUAL FUND FILTERS START ===');
    
    if (isLoadingOptions || !filterOptions?.mutual_funds) {
      console.log('⏳ Mutual fund filters loading...');
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading filter options...</span>
        </div>
      );
    }

    const mfOptions = filterOptions.mutual_funds;
    console.log('💰 Mutual fund options structure:', mfOptions);
    
    const validCategories = getValidSelectOptions(mfOptions?.categories, 'CATEGORIES', 'mutual-fund');
    const validRiskLevels = getValidSelectOptions(mfOptions?.risk_levels, 'RISK_LEVELS', 'mutual-fund');

    console.log('💰 MUTUAL FUND RENDER DECISION:');
    console.log(`- Categories: ${validCategories.length} valid options`);
    console.log(`- Risk Levels: ${validRiskLevels.length} valid options`);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* CATEGORY SELECT - with detailed logging */}
        {validCategories.length > 0 ? (
          <div>
            <Label htmlFor="category">Category</Label>
            {(() => {
              console.log('🏷️ About to render CATEGORY Select with options:', validCategories);
              return (
                <Select onValueChange={(value) => {
                  console.log('🏷️ CATEGORY selected:', value);
                  updateFilter('category', [value]);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {validCategories.map((category, idx) => {
                      const categoryValue = category.value || category.name || category.label;
                      console.log(`🏷️ Rendering CATEGORY SelectItem ${idx}: value="${categoryValue}"`);
                      
                      if (!categoryValue || categoryValue === '') {
                        console.error(`🚨 CATEGORY SelectItem ${idx} has EMPTY VALUE!`, category);
                        return null;
                      }
                      
                      return (
                        <SelectItem key={`category-${idx}-${categoryValue}`} value={categoryValue}>
                          {category.name} ({category.count})
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              );
            })()}
          </div>
        ) : (
          <div>
            <Label>Category</Label>
            <div className="text-sm text-gray-500 p-2 border rounded">No valid categories available</div>
          </div>
        )}

        {/* RISK LEVEL SELECT - with detailed logging */}
        {validRiskLevels.length > 0 ? (
          <div>
            <Label htmlFor="riskLevel">Risk Level</Label>
            {(() => {
              console.log('⚠️ About to render RISK LEVEL Select with options:', validRiskLevels);
              return (
                <Select onValueChange={(value) => {
                  console.log('⚠️ RISK LEVEL selected:', value);
                  updateFilter('riskLevel', value);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    {validRiskLevels.map((risk, idx) => {
                      const riskValue = risk.value || risk.name || risk.label;
                      console.log(`⚠️ Rendering RISK LEVEL SelectItem ${idx}: value="${riskValue}"`);
                      
                      if (!riskValue || riskValue === '') {
                        console.error(`🚨 RISK LEVEL SelectItem ${idx} has EMPTY VALUE!`, risk);
                        return null;
                      }
                      
                      return (
                        <SelectItem key={`risk-${idx}-${riskValue}`} value={riskValue}>
                          {risk.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              );
            })()}
          </div>
        ) : (
          <div>
            <Label>Risk Level</Label>
            <div className="text-sm text-gray-500 p-2 border rounded">No valid risk levels available</div>
          </div>
        )}
      </div>
    );
  };

  const renderIPOFilters = () => {
    console.log('🏦 === RENDERING IPO FILTERS START ===');
    
    if (isLoadingOptions || !filterOptions?.ipos) {
      console.log('⏳ IPO filters loading...');
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading filter options...</span>
        </div>
      );
    }

    const ipoOptions = filterOptions.ipos;
    console.log('🏦 IPO options structure:', ipoOptions);
    
    const validStatusOptions = getValidSelectOptions(ipoOptions?.status_options, 'STATUS_OPTIONS', 'ipo');

    console.log('🏦 IPO RENDER DECISION:');
    console.log(`- Status Options: ${validStatusOptions.length} valid options`);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* IPO STATUS SELECT - with detailed logging */}
        {validStatusOptions.length > 0 ? (
          <div>
            <Label htmlFor="status">IPO Status</Label>
            {(() => {
              console.log('📊 About to render IPO STATUS Select with options:', validStatusOptions);
              return (
                <Select onValueChange={(value) => {
                  console.log('📊 IPO STATUS selected:', value);
                  updateFilter('status', value);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {validStatusOptions.map((status, idx) => {
                      const statusValue = status.value || status.name || status.label;
                      console.log(`📊 Rendering IPO STATUS SelectItem ${idx}: value="${statusValue}"`);
                      
                      if (!statusValue || statusValue === '') {
                        console.error(`🚨 IPO STATUS SelectItem ${idx} has EMPTY VALUE!`, status);
                        return null;
                      }
                      
                      return (
                        <SelectItem key={`status-${idx}-${statusValue}`} value={statusValue}>
                          {status.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              );
            })()}
          </div>
        ) : (
          <div>
            <Label>IPO Status</Label>
            <div className="text-sm text-gray-500 p-2 border rounded">No valid status options available</div>
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

  console.log(`🎯 FILTER PANEL MAIN RENDER - Asset Type: ${assetType}`);

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
