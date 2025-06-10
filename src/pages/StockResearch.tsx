
import React, { useState } from 'react';
import AIResultCard from '@/components/AIResultCard';
import FeedSearch from '@/components/FeedSearch';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { AILayerIndicator } from '@/components/ai-indicators/AILayerIndicator';
import { AIContextFlow } from '@/components/ai-indicators/AIContextFlow';

interface Stock {
  id: number;
  name: string;
  symbol: string;
  type: string;
  price: number;
  change: number;
  changePercent: number;
  routePath: string;
}

const StockResearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Stock[]>([
    {
      id: 1,
      name: 'Tata Consultancy Services Ltd',
      symbol: 'TCS',
      type: 'Stock',
      price: 3220.50,
      change: 45.20,
      changePercent: 1.42,
      routePath: '/stock/tcs'
    },
    {
      id: 2,
      name: 'Infosys Ltd',
      symbol: 'INFY',
      type: 'Stock',
      price: 1650.80,
      change: -12.50,
      changePercent: -0.75,
      routePath: '/stock/infy'
    },
    {
      id: 3,
      name: 'HDFC Bank Ltd',
      symbol: 'HDFCBANK',
      type: 'Stock',
      price: 1540.20,
      change: 22.80,
      changePercent: 1.50,
      routePath: '/stock/hdfcbank'
    }
  ]);

  const contextSteps = [
    {
      label: "Profile Analysis",
      description: "Age 30, Moderate Risk",
      layer: 1 as const,
      status: 'completed' as const
    },
    {
      label: "Goal Mapping", 
      description: "10-year growth",
      layer: 2 as const,
      status: 'completed' as const
    },
    {
      label: "Product Discovery",
      description: "Finding matches",
      layer: 3 as const,
      status: 'active' as const
    },
    {
      label: "Explanation",
      description: "Generating insights",
      layer: 4 as const,
      status: 'pending' as const
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Stock Research</h1>
        <p className="text-gray-600">
          Explore AI-powered stock insights and recommendations.
        </p>
      </div>

      {/* AI Context Flow */}
      <div className="mb-6">
        <AIContextFlow steps={contextSteps} />
      </div>

      {/* Search Section */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold">AI-Powered Stock Discovery</h2>
            </div>
            <AILayerIndicator layer={4} type="contextual" size="sm" />
          </div>
          
          <FeedSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          {/* AI Search Suggestions */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Try these AI-powered queries:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Best growth stocks for 10 years",
                "Safe dividend paying stocks", 
                "AI and technology stocks",
                "Banking stocks with good fundamentals"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(suggestion)}
                  className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">AI Recommendations</h3>
              <AILayerIndicator layer={3} type="powered" size="md" />
            </div>
            <div className="flex items-center gap-2">
              <AILayerIndicator 
                layer={1} 
                type="learning" 
                size="sm"
                isActive={true}
              />
              <span className="text-sm text-gray-600">Learning from your preferences</span>
            </div>
          </div>
          
          {searchResults.map((result, index) => (
            <AIResultCard
              key={result.id}
              asset={result}
              userQuery={searchQuery}
              matchScore={92 - (index * 3)} // Decreasing match scores
              showDetailedReasoning={index === 0} // Show detailed reasoning for first result
            />
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 mt-4">
        Disclaimer: This is for informational purposes only. Consult a financial advisor before making investment decisions.
      </p>
    </div>
  );
};

export default StockResearch;
