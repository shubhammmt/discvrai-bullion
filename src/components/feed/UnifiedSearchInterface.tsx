
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Sparkles, Filter, Loader2, ChevronDown, ChevronRight } from 'lucide-react';
import FilterPanel from './FilterPanel';
import NLPFilterDisplay from './NLPFilterDisplay';
import { UnifiedSearchRequest, NLPAnalysis } from '@/utils/unifiedSearchApi';

interface UnifiedSearchInterfaceProps {
  onSearch: (searchRequest: UnifiedSearchRequest) => void;
  isLoading: boolean;
  nlpAnalysis?: NLPAnalysis;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onIPOStatusChange?: (status: string) => void;
  selectedIPOStatus?: string;
}

const UnifiedSearchInterface = ({ 
  onSearch, 
  isLoading, 
  nlpAnalysis,
  currentPage = 1,
  onPageChange,
  onIPOStatusChange,
  selectedIPOStatus
}: UnifiedSearchInterfaceProps) => {
  const [searchMode, setSearchMode] = useState<'nlp' | 'filters'>('nlp');
  const [query, setQuery] = useState('');
  const [assetType, setAssetType] = useState<'stock' | 'mutual-fund' | 'ipo'>('stock');
  const [filters, setFilters] = useState<any>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Clear filters when asset type changes
  useEffect(() => {
    setFilters({});
  }, [assetType]);

  const handleSearch = () => {
    if (searchMode === 'nlp') {
      if (!query.trim()) return;
      
      const searchRequest: UnifiedSearchRequest = {
        query: query.trim(),
        assetType,
        searchType: 'nlp',
        page: currentPage,
        pageSize: 20
      };

      onSearch(searchRequest);
    } else {
      // For IPO filters, include the status in the search
      let searchFilters = { ...filters };
      if (assetType === 'ipo' && selectedIPOStatus) {
        searchFilters = { ...searchFilters, status: selectedIPOStatus };
      }

      const searchRequest: UnifiedSearchRequest = {
        query: `Advanced filter search`,
        assetType,
        searchType: 'filters',
        filters: searchFilters,
        page: currentPage,
        pageSize: 20
      };

      onSearch(searchRequest);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAssetTypeChange = (newAssetType: 'stock' | 'mutual-fund' | 'ipo') => {
    setAssetType(newAssetType);
  };

  const assetTypeOptions: { value: 'stock' | 'mutual-fund' | 'ipo'; label: string }[] = [
    { value: 'stock', label: 'Stocks' },
    { value: 'mutual-fund', label: 'Mutual Funds' },
    { value: 'ipo', label: 'IPOs' }
  ];

  const sampleQueries: { [key: string]: string[] } = {
    stock: [
      'Tech companies with high growth',
      'Dividend paying stocks',
      'Large cap mutual funds',
      'Recent IPOs'
    ],
    'mutual-fund': [
      'High dividend yield funds',
      'Growth mutual funds',
      'Value mutual funds'
    ],
    ipo: [
      'Recent IPOs',
      'High valuation IPOs',
      'Tech IPOs'
    ]
  };

  return (
    <Card className="w-full bg-white/70 backdrop-blur-md border-white/20 shadow-lg">
      <CardContent className="p-3 sm:p-6">
        {/* Asset Type Selection */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Asset Type:</label>
          <div className="flex flex-wrap gap-2">
            {assetTypeOptions.map((option) => (
              <Button
                key={option.value}
                variant={assetType === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAssetType(option.value)}
                className="text-xs sm:text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Search Mode Tabs */}
        <Tabs value={searchMode} onValueChange={(value) => setSearchMode(value as 'nlp' | 'filters')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="nlp" className="flex items-center gap-2">
              <Sparkles size={16} />
              <span className="hidden sm:inline">NLP Search</span>
              <span className="sm:hidden">NLP</span>
            </TabsTrigger>
            <TabsTrigger value="filters" className="flex items-center gap-2">
              <Filter size={16} />
              <span className="hidden sm:inline">Advanced Filters</span>
              <span className="sm:hidden">Filters</span>
            </TabsTrigger>
          </TabsList>

          {/* NLP Search Tab */}
          <TabsContent value="nlp" className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder={`Ask about ${assetType === 'stock' ? 'stocks' : assetType === 'mutual-fund' ? 'mutual funds' : 'IPOs'} in natural language...`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="text-sm sm:text-base"
                  />
                </div>
                <Button 
                  onClick={handleSearch} 
                  disabled={isLoading || !query.trim()}
                  className="px-3 sm:px-6"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
              </div>

              {/* Sample queries */}
              <div className="flex flex-wrap gap-2">
                {sampleQueries[assetType]?.slice(0, 2).map((sample, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(sample)}
                    className="text-xs"
                  >
                    {sample}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Advanced Filters Tab */}
          <TabsContent value="filters" className="space-y-4">
            <FilterPanel 
              assetType={assetType} 
              onFiltersChange={setFilters}
              onIPOStatusChange={onIPOStatusChange}
              selectedIPOStatus={selectedIPOStatus}
            />
            
            <div className="flex justify-center">
              <Button 
                onClick={handleSearch} 
                disabled={isLoading}
                className="px-6"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                Apply Filters
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* NLP Analysis Display */}
        {nlpAnalysis && searchMode === 'nlp' && (
          <div className="mt-4">
            <NLPFilterDisplay 
              nlpAnalysis={nlpAnalysis}
              onFiltersChange={setFilters}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UnifiedSearchInterface;
