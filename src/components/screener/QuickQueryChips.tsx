import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, DollarSign, BarChart3, Shield, Zap } from 'lucide-react';
import type { Market } from '@/pages/AIStockScreener';

interface QuickQueryChipsProps {
  market: Market;
  onSelectQuery: (query: string) => void;
}

const QuickQueryChips = ({ market, onSelectQuery }: QuickQueryChipsProps) => {
  const indiaQueries = [
    { icon: TrendingUp, text: 'Top gainers today', color: 'text-green-500' },
    { icon: DollarSign, text: 'High dividend stocks', color: 'text-blue-500' },
    { icon: BarChart3, text: 'Undervalued in banking', color: 'text-purple-500' },
    { icon: Shield, text: 'Blue chip stocks', color: 'text-indigo-500' },
    { icon: Zap, text: 'RSI oversold stocks', color: 'text-orange-500' },
    { icon: Sparkles, text: 'Compare TCS vs Infosys', color: 'text-pink-500' },
  ];

  const usQueries = [
    { icon: TrendingUp, text: 'FAANG stocks analysis', color: 'text-green-500' },
    { icon: DollarSign, text: 'Best dividend aristocrats', color: 'text-blue-500' },
    { icon: BarChart3, text: 'Growth stocks under $100', color: 'text-purple-500' },
    { icon: Shield, text: 'S&P 500 quality stocks', color: 'text-indigo-500' },
    { icon: Zap, text: 'Tech stocks with RSI < 30', color: 'text-orange-500' },
    { icon: Sparkles, text: 'Compare Apple vs Microsoft', color: 'text-pink-500' },
  ];

  const queries = market === 'india' ? indiaQueries : usQueries;

  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground mb-3">Quick searches</p>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {queries.map((query, index) => {
          const Icon = query.icon;
          return (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-accent transition-colors whitespace-nowrap hover-scale"
              onClick={() => onSelectQuery(query.text)}
            >
              <Icon className={`h-3 w-3 mr-1.5 ${query.color}`} />
              {query.text}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default QuickQueryChips;
