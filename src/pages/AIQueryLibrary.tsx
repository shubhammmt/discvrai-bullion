import { useState } from 'react';
import { Search, TrendingUp, Calendar, Tag, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

type QueryType = 'all' | 'fundamental' | 'technical' | 'screening' | 'comparison';
type Market = 'all' | 'india' | 'us';

interface Query {
  id: string;
  title: string;
  description: string;
  type: 'fundamental' | 'technical' | 'screening' | 'comparison';
  market: 'india' | 'us' | 'both';
  popularity: number;
  tags: string[];
  lastUpdated: Date;
}

const AIQueryLibrary = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<QueryType>('all');
  const [filterMarket, setFilterMarket] = useState<Market>('all');

  // Mock data - replace with actual API call
  const queries: Query[] = [
    {
      id: 'top-dividend-stocks-india',
      title: 'Top Dividend Stocks in India',
      description: 'Find high-dividend yielding Indian stocks with consistent payout history',
      type: 'screening',
      market: 'india',
      popularity: 2400,
      tags: ['dividend', 'income', 'blue-chip'],
      lastUpdated: new Date('2025-10-08'),
    },
    {
      id: 'apple-vs-microsoft-comparison',
      title: 'Compare Apple vs Microsoft',
      description: 'Complete fundamental and technical comparison of AAPL and MSFT',
      type: 'comparison',
      market: 'us',
      popularity: 1800,
      tags: ['tech', 'mega-cap', 'comparison'],
      lastUpdated: new Date('2025-10-09'),
    },
    {
      id: 'undervalued-banking-stocks',
      title: 'Undervalued Banking Stocks',
      description: 'Banking sector stocks trading below intrinsic value',
      type: 'screening',
      market: 'india',
      popularity: 1500,
      tags: ['banking', 'value', 'financials'],
      lastUpdated: new Date('2025-10-07'),
    },
    {
      id: 'tech-stocks-rsi-oversold',
      title: 'Tech Stocks with RSI < 30',
      description: 'Oversold technology stocks showing technical bounce potential',
      type: 'technical',
      market: 'us',
      popularity: 1200,
      tags: ['tech', 'rsi', 'oversold'],
      lastUpdated: new Date('2025-10-08'),
    },
    {
      id: 'psu-stocks-performance',
      title: 'Best Performing PSU Stocks',
      description: 'Public sector undertakings with strong fundamentals and momentum',
      type: 'screening',
      market: 'india',
      popularity: 980,
      tags: ['psu', 'government', 'momentum'],
      lastUpdated: new Date('2025-10-06'),
    },
    {
      id: 'faang-fundamentals',
      title: 'FAANG Stocks Fundamentals',
      description: 'Detailed fundamental analysis of Facebook, Apple, Amazon, Netflix, Google',
      type: 'fundamental',
      market: 'us',
      popularity: 850,
      tags: ['faang', 'tech', 'fundamentals'],
      lastUpdated: new Date('2025-10-09'),
    },
  ];

  const filteredQueries = queries.filter(query => {
    const matchesSearch = query.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || query.type === filterType;
    const matchesMarket = filterMarket === 'all' || query.market === filterMarket || query.market === 'both';
    return matchesSearch && matchesType && matchesMarket;
  });

  const sortedQueries = [...filteredQueries].sort((a, b) => b.popularity - a.popularity);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">Query Library</h1>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search queries, tags, topics..."
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="space-y-3">
            <Tabs value={filterMarket} onValueChange={(v) => setFilterMarket(v as Market)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Markets</TabsTrigger>
                <TabsTrigger value="india">🇮🇳 India</TabsTrigger>
                <TabsTrigger value="us">🇺🇸 US</TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs value={filterType} onValueChange={(v) => setFilterType(v as QueryType)}>
              <TabsList className="grid w-full grid-cols-5 text-xs">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="fundamental">Fundamental</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="screening">Screening</TabsTrigger>
                <TabsTrigger value="comparison">Compare</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {sortedQueries.length} {sortedQueries.length === 1 ? 'query' : 'queries'} found
          </p>
        </div>

        <div className="space-y-3">
          {sortedQueries.map((query) => (
            <Card
              key={query.id}
              className="p-4 cursor-pointer hover:shadow-md transition-all hover:translate-x-1"
              onClick={() => navigate(`/ai/queries/${query.id}`)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{query.title}</h3>
                    {query.market !== 'both' && (
                      <span className="text-lg">{query.market === 'india' ? '🇮🇳' : '🇺🇸'}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{query.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs capitalize">
                      {query.type}
                    </Badge>
                    {query.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <TrendingUp className="h-3 w-3" />
                    {query.popularity.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {query.lastUpdated.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <ArrowRight className="h-4 w-4 mt-2 text-primary" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIQueryLibrary;
