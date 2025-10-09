import { useParams, useNavigate } from 'react-router-dom';
import { Share2, Download, Bookmark, ArrowLeft, Clock, TrendingUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import StockScreenerResults from '@/components/screener/StockScreenerResults';
import SEOFooter from '@/components/screener/SEOFooter';
import SocialSharePanel from '@/components/screener/SocialSharePanel';
import { useEffect } from 'react';

const AIQueryResult = () => {
  const { queryId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - replace with actual API call
  const queryData = {
    id: queryId,
    title: queryId?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Query Result',
    description: 'AI-powered analysis and screening results based on your query',
    market: 'india' as const,
    type: 'screening' as const,
    executedAt: new Date(),
    responseTime: 3.8,
    results: [
      { symbol: 'TCS', name: 'Tata Consultancy Services', pe: 28.5, marketCap: '₹12.5L Cr', change: 2.3, dividend: 3.2 },
      { symbol: 'INFY', name: 'Infosys', pe: 24.2, marketCap: '₹6.8L Cr', change: 1.8, dividend: 2.9 },
      { symbol: 'HDFCBANK', name: 'HDFC Bank', pe: 19.4, marketCap: '₹11.2L Cr', change: -0.5, dividend: 1.5 },
      { symbol: 'RELIANCE', name: 'Reliance Industries', pe: 22.1, marketCap: '₹18.3L Cr', change: 1.2, dividend: 0.8 },
      { symbol: 'ICICIBANK', name: 'ICICI Bank', pe: 21.3, marketCap: '₹7.9L Cr', change: 0.9, dividend: 1.2 },
    ],
    insights: [
      'Average P/E ratio of selected stocks: 23.1',
      'Median market cap: ₹11.2L Cr',
      'Average dividend yield: 1.9%',
    ],
    tags: ['dividend', 'blue-chip', 'fundamentals'],
  };

  // SEO: Set page title and meta description
  useEffect(() => {
    document.title = `${queryData.title} - AI Stock Screener | Discvr`;
  }, [queryData.title]);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: queryData.title,
        text: `Check out these AI-powered stock insights: ${queryData.description}`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link copied!", description: "Share this query with others" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/ai/queries')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold">{queryData.title}</h1>
            </div>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Query Info Card */}
        <Card className="p-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-3">{queryData.description}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="capitalize">{queryData.type}</Badge>
                <Badge variant="secondary">{queryData.market === 'india' ? '🇮🇳 India' : '🇺🇸 US'}</Badge>
                {queryData.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground border-t pt-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Response: {queryData.responseTime}s
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {queryData.results.length} results
            </div>
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="p-4 bg-primary/5">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            AI Insights
          </h2>
          <ul className="space-y-2">
            {queryData.insights.map((insight, idx) => (
              <li key={idx} className="text-sm flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Results Table */}
        <div>
          <h2 className="font-semibold mb-3">Results</h2>
          <StockScreenerResults results={queryData.results} market={queryData.market} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => navigate('/ai/chat')}>
            Ask Follow-up
          </Button>
          <Button variant="outline" size="icon">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Social Share Panel */}
        <SocialSharePanel
          title={queryData.title}
          description={queryData.description}
          url={window.location.href}
        />

        {/* SEO Footer with Related Queries */}
        <SEOFooter currentQueryId={queryData.id || ''} market={queryData.market} />
      </div>
    </div>
  );
};

export default AIQueryResult;
