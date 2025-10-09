import { Sparkles, TrendingUp, Search, Zap, Globe, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const AIScreenerLanding = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Analysis',
      description: 'Ask anything about stocks in natural language',
    },
    {
      icon: Globe,
      title: 'Dual Market Coverage',
      description: 'India 🇮🇳 & US 🇺🇸 markets at your fingertips',
    },
    {
      icon: TrendingUp,
      title: 'Smart Screening',
      description: 'Find stocks matching complex criteria instantly',
    },
    {
      icon: Share2,
      title: 'Share Insights',
      description: 'Export and share your discoveries',
    },
  ];

  const popularQueries = [
    { text: 'Top dividend stocks in India', count: '2.4K uses' },
    { text: 'Compare Apple vs Microsoft', count: '1.8K uses' },
    { text: 'Undervalued banking stocks', count: '1.5K uses' },
    { text: 'Tech stocks with RSI < 30', count: '1.2K uses' },
    { text: 'Best performing PSU stocks', count: '980 uses' },
    { text: 'FAANG fundamentals comparison', count: '850 uses' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">AI Stock Screener</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Conversational stock research powered by AI. Ask questions, discover insights, and find your next investment opportunity.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => navigate('/ai/chat')} className="gap-2">
              <Zap className="h-4 w-4" />
              Start Chat
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/ai/queries')} className="gap-2">
              <Search className="h-4 w-4" />
              Browse Queries
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Popular Queries */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Trending Queries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popularQueries.map((query, index) => (
              <Card
                key={index}
                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => navigate(`/ai/queries/${encodeURIComponent(query.text.toLowerCase().replace(/\s+/g, '-'))}`)}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium flex-1">{query.text}</p>
                  <Badge variant="secondary" className="text-xs shrink-0">
                    {query.count}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline" onClick={() => navigate('/ai/queries')}>
              View All Queries →
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12 pt-12 border-t">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">5K+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">10K+</div>
            <div className="text-sm text-muted-foreground">Queries Run</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">&lt;5s</div>
            <div className="text-sm text-muted-foreground">Avg Response</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIScreenerLanding;
