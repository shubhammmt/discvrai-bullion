import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Market } from '@/pages/AIStockScreener';

interface StockResult {
  symbol: string;
  name: string;
  pe: number;
  marketCap: string;
  change: number;
}

interface StockScreenerResultsProps {
  results: StockResult[];
  market?: Market;
}

const StockScreenerResults = ({ results, market }: StockScreenerResultsProps) => {
  return (
    <div className="space-y-2 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-muted-foreground">
          {results.length} results found
        </p>
        <Badge variant="secondary" className="text-xs">
          {market === 'india' ? '🇮🇳 NSE/BSE' : '🇺🇸 NYSE/NASDAQ'}
        </Badge>
      </div>

      {results.map((stock, index) => (
        <Card 
          key={index} 
          className="p-4 hover:shadow-md transition-shadow cursor-pointer hover-scale"
          onClick={() => window.location.href = `/stock/${stock.symbol.toLowerCase()}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-base">{stock.symbol}</h3>
                <Badge 
                  variant={stock.change >= 0 ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {stock.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{stock.name}</p>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">P/E Ratio</p>
                  <p className="font-medium">{stock.pe}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Market Cap</p>
                  <p className="font-medium">{stock.marketCap}</p>
                </div>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StockScreenerResults;
