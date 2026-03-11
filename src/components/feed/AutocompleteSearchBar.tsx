
import React, { useState, useRef, useEffect } from 'react';
import { Search, TrendingUp, Building2, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { autocompleteSearch, AutocompleteResult, AssetType } from '@/utils/unifiedSearchApi';

interface AutocompleteSearchBarProps {
  onResultClick?: (result: AutocompleteResult) => void;
  placeholder?: string;
  assetTypes?: AssetType[];
}

const AutocompleteSearchBar = ({ 
  onResultClick, 
  placeholder = "Search stocks, mutual funds, IPOs...",
  assetTypes 
}: AutocompleteSearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AutocompleteResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const getAssetIcon = (assetType: AssetType) => {
    switch (assetType) {
      case 'stock':
        return <TrendingUp size={16} className="text-green-600" />;
      case 'mutual-fund':
        return <Building2 size={16} className="text-blue-600" />;
      case 'ipo':
        return <Zap size={16} className="text-purple-600" />;
      default:
        return <Search size={16} className="text-gray-600" />;
    }
  };

  const formatAssetType = (assetType: AssetType) => {
    switch (assetType) {
      case 'stock':
        return 'Stock';
      case 'mutual-fund':
        return 'Mutual Fund';
      case 'ipo':
        return 'IPO';
      default:
        return assetType;
    }
  };

  const performSearch = async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await autocompleteSearch(searchQuery, assetTypes);
      if (response.success) {
        setResults(response.data);
        setShowResults(true);
        setSelectedIndex(-1);
      } else {
        setResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error('Autocomplete search failed:', error);
      setResults([]);
      setShowResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Debounce the search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result: AutocompleteResult) => {
    setQuery(result.name);
    setShowResults(false);
    setSelectedIndex(-1);
    onResultClick?.(result);
  };

  const handleInputFocus = () => {
    if (results.length > 0) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => setShowResults(false), 150);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className="pl-10 pr-4 h-12 text-base bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {showResults && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border shadow-lg">
          <CardContent className="p-0">
            <div ref={resultsRef} className="max-h-80 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={`${result.assetType}-${result.symbol}`}
                  className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                    index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                  } ${index > 0 ? 'border-t border-gray-100' : ''}`}
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-center gap-3">
                    {getAssetIcon(result.assetType)}
                    <div>
                      <div className="font-medium text-gray-900">{result.symbol}</div>
                      <div className="text-sm text-gray-600 truncate max-w-xs">{result.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {result.price && (
                      <span className="text-sm font-medium">₹{result.price}</span>
                    )}
                    {result.changePercent && (
                      <Badge variant={result.changePercent > 0 ? "default" : "destructive"} className="text-xs">
                        {result.changePercent > 0 ? '+' : ''}{result.changePercent.toFixed(2)}%
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {formatAssetType(result.assetType)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AutocompleteSearchBar;
