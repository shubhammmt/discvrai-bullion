import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Star, 
  Bell, 
  Share2, 
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { useCryptoAssetData } from "@/hooks/useCryptoAssetData";
import { CryptoChart } from "@/components/crypto/CryptoChart";
import { CryptoMetrics } from "@/components/crypto/CryptoMetrics";
import { NewsCard } from "@/components/crypto/news/NewsCard";

const CryptoAsset = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [watchlisted, setWatchlisted] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<"1D" | "1W" | "1M" | "3M" | "1Y" | "All">("1W");
  
  const { crypto, news, aiInsights, isLoading } = useCryptoAssetData(symbol || "");

  if (isLoading || !crypto) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading cryptocurrency data...</p>
        </div>
      </div>
    );
  }

  const isPositive = crypto.changePercent >= 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/crypto")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Crypto
          </Button>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl font-bold">
                {crypto.symbol.slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold">{crypto.name}</h1>
                  <span className="text-2xl text-muted-foreground">({crypto.symbol})</span>
                  <Badge variant="secondary">#{crypto.rank} Market Cap</Badge>
                </div>
                <div className="flex items-baseline gap-4">
                  <div className="text-4xl font-bold">${crypto.price.toLocaleString()}</div>
                  <Badge 
                    variant={isPositive ? "default" : "destructive"}
                    className={isPositive ? "bg-green-500" : ""}
                  >
                    {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {isPositive ? "+" : ""}{crypto.changePercent.toFixed(2)}% 
                    ({isPositive ? "+" : ""}${crypto.changeAmount.toFixed(2)})
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Last updated: 2 min ago</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={watchlisted ? "default" : "outline"}
                size="sm"
                onClick={() => setWatchlisted(!watchlisted)}
              >
                <Star className={`w-4 h-4 mr-2 ${watchlisted ? "fill-current" : ""}`} />
                {watchlisted ? "Watchlisted" : "Watchlist"}
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Set Alert
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Price Chart */}
            <Card className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-4">Price Chart</h2>
                <div className="flex gap-2">
                  {(["1D", "1W", "1M", "3M", "1Y", "All"] as const).map((period) => (
                    <Button
                      key={period}
                      variant={chartPeriod === period ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartPeriod(period)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
              <CryptoChart symbol={symbol || ""} period={chartPeriod} />
            </Card>

            {/* Key Metrics */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
              <CryptoMetrics metrics={crypto.metrics} />
            </div>

            {/* About */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">About {crypto.name}</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {crypto.description}
              </p>
              <div className="flex gap-3">
                {crypto.links.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={crypto.links.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
                {crypto.links.whitepaper && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={crypto.links.whitepaper} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Whitepaper
                    </a>
                  </Button>
                )}
                {crypto.links.twitter && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={crypto.links.twitter} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Twitter
                    </a>
                  </Button>
                )}
              </div>
            </Card>

            {/* Latest News */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Latest News</h2>
              <div className="space-y-4">
                {news.slice(0, 3).map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    onClick={() => navigate(`/crypto/news/${article.slug}`)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{crypto.name} News</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">All</Button>
                <Button variant="outline" size="sm">Price Movement</Button>
                <Button variant="outline" size="sm">Regulatory</Button>
                <Button variant="outline" size="sm">Technology</Button>
              </div>
            </div>
            <div className="space-y-4">
              {news.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onClick={() => navigate(`/crypto/news/${article.slug}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {/* AI Sentiment Analysis */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">AI-Powered Sentiment Analysis</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Sentiment</span>
                    <Badge variant="default" className="bg-green-500">
                      {aiInsights.sentiment}
                    </Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-primary transition-all"
                      style={{ width: `${aiInsights.sentimentScore}%` }}
                    />
                  </div>
                </div>
                <p className="text-muted-foreground">{aiInsights.summary}</p>
              </div>
            </Card>

            {/* Technical Indicators */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Technical Indicators</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">RSI (14)</div>
                  <div className="text-2xl font-bold">62.5</div>
                  <div className="text-xs text-green-500">Neutral</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">MACD</div>
                  <div className="text-2xl font-bold">+245</div>
                  <div className="text-xs text-green-500">Bullish</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">50 MA</div>
                  <div className="text-2xl font-bold">${(crypto.price * 0.95).toFixed(0)}</div>
                  <div className="text-xs text-green-500">Above MA</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">200 MA</div>
                  <div className="text-2xl font-bold">${(crypto.price * 0.88).toFixed(0)}</div>
                  <div className="text-xs text-green-500">Above MA</div>
                </div>
              </div>
            </Card>

            {/* Disclaimer */}
            <Card className="p-4 bg-amber-500/10 border-amber-500/20">
              <p className="text-sm text-muted-foreground">
                ⚠️ <strong>Disclaimer:</strong> This analysis is for informational purposes only and does not constitute financial advice. 
                Cryptocurrency investments are subject to market risks. Past performance does not guarantee future results.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <Card className="p-12 text-center">
              <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Features Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                Social sentiment tracking, Reddit/Twitter mentions, and influencer opinions will be available here.
              </p>
              <Button variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Notify Me When Available
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CryptoAsset;
