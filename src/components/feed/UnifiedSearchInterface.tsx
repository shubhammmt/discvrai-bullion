
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Zap } from 'lucide-react';
import FilterPanel from './FilterPanel';
import NLPFilterDisplay from './NLPFilterDisplay';
import { AssetType, SearchMode, SearchFilters, UnifiedSearchRequest } from '@/utils/unifiedSearchApi';

interface UnifiedSearchInterfaceProps {
  onSearch: (searchRequest: UnifiedSearchRequest) => void;
  isLoading: boolean;
  nlpAnalysis?: {
    interpreted_filters: Record<string, any>;
    confidence: number;
    suggestions: string[];
    original_query: string;
  };
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const UnifiedSearchInterface = ({ 
  onSearch, 
  isLoading, 
  nlpAnalysis,
  currentPage = 1,
  onPageChange
}: UnifiedSearchInterfaceProps) => {
  const [searchMode, setSearchMode] = useState<SearchMode>('nlp');
  const [assetType, setAssetType] = useState<AssetType>('stock');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  // Clear filters when asset type changes
  useEffect(() => {
    setFilters({});
  }, [assetType]);

  const handleSearch = (page: number = 1) => {
    if (searchMode === 'nlp' && !query.trim()) return;
    
    const searchRequest: UnifiedSearchRequest = {
      assetType,
      searchMode,
      page,
      pageSize: 20,
      ...(searchMode === 'nlp' ? { query: query.trim() } : { filters })
    };

    onSearch(searchRequest);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAssetTypeChange = (newAssetType: AssetType) => {
    setAssetType(newAssetType);
  };

  const assetTypes: { value: AssetType; label: string }[] = [
    { value: 'stock', label: 'Stocks' },
    { value: 'mutual-fund', label: 'Mutual Funds' },
    { value: 'ipo', label: 'IPOs' }
  ];

  const quickPrompts = [
    'Tech companies with high growth',
    'Dividend paying stocks',
    'Large cap mutual funds',
    'Recent IPOs'
  ];

  return (
    <Card className="mb-4 sm:mb-6 bg-white/90 backdrop-blur-md border-blue-200">
      <CardContent className="p-3 sm:p-6">
        {/* Search Mode Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant={searchMode === 'nlp' ? 'default' : 'outline'}
              onClick={() => setSearchMode('nlp')}
              size="sm"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9"
            >
              <Zap size={12} sm:size={16} />
              <span className="hidden xs:inline">NLP Search</span>
              <span className="xs:hidden">NLP</span>
            </Button>
            <Button
              variant={searchMode === 'filters' ? 'default' : 'outline'}
              onClick={() => setSearchMode('filters')}
              size="sm"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9"
            >
              <Filter size={12} sm:size={16} />
              <span className="hidden xs:inline">Advanced</span>
              <span className="xs:hidden">Filters</span>
            </Button>
          </div>
        </div>

        {/* Asset Type Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm font-medium text-gray-700">Asset Type:</span>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {assetTypes.map((type) => (
              <Badge
                key={type.value}
                variant={assetType === type.value ? 'default' : 'outline'}
                className="cursor-pointer text-xs px-2 py-1"
                onClick={() => handleAssetTypeChange(type.value)}
              >
                {type.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Search Input for NLP Mode */}
        {searchMode === 'nlp' && (
          <div className="relative mb-3 sm:mb-4">
            <Input
              placeholder={`Ask anything about ${assetType === 'mutual-fund' ? 'mutual funds' : assetType}... e.g., "Show me tech stocks with PE ratio under 20"`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-8 sm:pl-10 pr-16 sm:pr-20 h-10 sm:h-12 text-sm sm:text-base"
            />
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Button
              onClick={() => handleSearch()}
              disabled={!query.trim() || isLoading}
              className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 h-8 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm"
              size="sm"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        )}

        {/* Quick Prompts for NLP Mode */}
        {searchMode === 'nlp' && !query && (
          <div className="mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {quickPrompts.map((prompt, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 text-xs px-2 py-1"
                  onClick={() => setQuery(prompt)}
                >
                  {prompt}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* NLP Analysis Display */}
        {searchMode === 'nlp' && nlpAnalysis && (
          <NLPFilterDisplay
            analysis={nlpAnalysis}
            onFiltersChange={setFilters}
            onSearch={() => handleSearch()}
          />
        )}

        {/* Filter Panel for Filter Mode */}
        {searchMode === 'filters' && (
          <FilterPanel
            assetType={assetType}
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={() => handleSearch()}
            isLoading={isLoading}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default UnifiedSearchInterface;
