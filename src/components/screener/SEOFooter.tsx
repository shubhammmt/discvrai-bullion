import { Card } from '@/components/ui/card';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SEOFooterProps {
  currentQueryId: string;
  market: 'india' | 'us';
}

const SEOFooter = ({ currentQueryId, market }: SEOFooterProps) => {
  const navigate = useNavigate();

  const relatedQueries = market === 'india' ? [
    { id: 'high-dividend-nifty50', title: 'High Dividend Nifty 50 Stocks', popularity: 1800 },
    { id: 'undervalued-midcap-stocks', title: 'Undervalued Midcap Stocks', popularity: 1500 },
    { id: 'growth-stocks-india-2025', title: 'Top Growth Stocks India 2025', popularity: 2100 },
    { id: 'banking-sector-analysis', title: 'Banking Sector Fundamental Analysis', popularity: 1200 },
    { id: 'psu-banks-comparison', title: 'PSU Banks vs Private Banks', popularity: 950 },
    { id: 'it-sector-screening', title: 'IT Sector Stock Screening', popularity: 1100 },
  ] : [
    { id: 'dividend-aristocrats-us', title: 'US Dividend Aristocrats', popularity: 2200 },
    { id: 'nasdaq-growth-stocks', title: 'NASDAQ Growth Stocks', popularity: 1900 },
    { id: 'sp500-value-stocks', title: 'S&P 500 Value Stocks', popularity: 1700 },
    { id: 'tech-sector-comparison', title: 'Tech Sector Stock Comparison', popularity: 1600 },
    { id: 'healthcare-fundamentals', title: 'Healthcare Sector Fundamentals', popularity: 1300 },
    { id: 'energy-stocks-analysis', title: 'Energy Stocks Technical Analysis', popularity: 1100 },
  ];

  const filteredQueries = relatedQueries.filter(q => q.id !== currentQueryId).slice(0, 6);

  return (
    <div className="border-t pt-6 mt-8">
      <h3 className="text-lg font-semibold mb-4">Related Queries</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {filteredQueries.map((query) => (
          <Card
            key={query.id}
            className="p-3 cursor-pointer hover:bg-accent transition-colors group"
            onClick={() => navigate(`/ai/queries/${query.id}`)}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium flex-1">{query.title}</p>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {(query.popularity / 1000).toFixed(1)}K
                </span>
                <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* SEO Links */}
      <div className="text-center pt-4 border-t">
        <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
          <a href="/ai" className="hover:text-primary transition-colors">AI Screener Home</a>
          <span>•</span>
          <a href="/ai/queries" className="hover:text-primary transition-colors">All Queries</a>
          <span>•</span>
          <a href="/ai/chat" className="hover:text-primary transition-colors">Start Chat</a>
          <span>•</span>
          <a href="/about" className="hover:text-primary transition-colors">About Discvr</a>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Powered by AI • Updated daily • {market === 'india' ? 'NSE/BSE' : 'NYSE/NASDAQ'} data
        </p>
      </div>
    </div>
  );
};

export default SEOFooter;
