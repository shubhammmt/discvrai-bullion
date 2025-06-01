
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Brain } from 'lucide-react';

interface FeedSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FeedSearch = ({ searchQuery, setSearchQuery }: FeedSearchProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    sector: '',
    marketCap: '',
    peRatio: { min: '', max: '' }
  });

  const handleAISearch = () => {
    // AI search logic would go here
    console.log('AI Search:', searchQuery);
  };

  const suggestedQueries = [
    "Show me safe dividend stocks",
    "Find tech ETFs with low fees", 
    "High growth mutual funds",
    "Upcoming IPOs in fintech"
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Try: 'Show me safe dividend stocks' or search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={handleAISearch} className="flex items-center gap-2">
            <Brain size={16} />
            AI Search
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
          </Button>
        </div>

        {/* Quick Suggestions */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm text-gray-600">Try:</span>
          {suggestedQueries.map((query, index) => (
            <button
              key={index}
              onClick={() => setSearchQuery(query)}
              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded-full transition-colors"
            >
              {query}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border-t pt-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Price Range (₹)</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, min: e.target.value }
                  }))}
                  className="text-sm"
                />
                <Input
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, max: e.target.value }
                  }))}
                  className="text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Sector</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                value={filters.sector}
                onChange={(e) => setFilters(prev => ({ ...prev, sector: e.target.value }))}
              >
                <option value="">All Sectors</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="energy">Energy</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Market Cap</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                value={filters.marketCap}
                onChange={(e) => setFilters(prev => ({ ...prev, marketCap: e.target.value }))}
              >
                <option value="">All Sizes</option>
                <option value="large">Large Cap</option>
                <option value="mid">Mid Cap</option>
                <option value="small">Small Cap</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">P/E Ratio</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  value={filters.peRatio.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    peRatio: { ...prev.peRatio, min: e.target.value }
                  }))}
                  className="text-sm"
                />
                <Input
                  placeholder="Max"
                  value={filters.peRatio.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    peRatio: { ...prev.peRatio, max: e.target.value }
                  }))}
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedSearch;
