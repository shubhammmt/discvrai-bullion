import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  TrendingUp, 
  TrendingDown,
  Sparkles,
  Bell,
  Star,
  ChevronRight
} from "lucide-react";
import { useCryptoData } from "@/hooks/useCryptoData";
import { CryptoCard } from "@/components/crypto/CryptoCard";
import { NewsCard } from "@/components/crypto/news/NewsCard";
import { useCryptoNews } from "@/hooks/useCryptoNews";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: "all", name: "All", color: "default" },
  { id: "layer1", name: "Layer 1", color: "primary" },
  { id: "defi", name: "DeFi", color: "secondary" },
  { id: "stablecoin", name: "Stablecoins", color: "accent" },
  { id: "meme", name: "Meme", color: "destructive" },
  { id: "nft", name: "NFT & Gaming", color: "outline" },
];

const CryptoHub = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"market_cap" | "volume" | "change">("market_cap");
  
  const { cryptos, isLoading: cryptosLoading, marketStats } = useCryptoData();
  const { news, isLoading: newsLoading } = useCryptoNews();

  const filteredCryptos = cryptos
    .filter(crypto => 
      searchQuery === "" || 
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "market_cap") return b.marketCap - a.marketCap;
      if (sortBy === "volume") return b.volume - a.volume;
      return Math.abs(b.changePercent) - Math.abs(a.changePercent);
    });

  const topGainer = cryptos.reduce((max, crypto) => 
    crypto.changePercent > max.changePercent ? crypto : max
  , cryptos[0]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Cryptocurrency Market
              </h1>
              <p className="text-muted-foreground">
                Discover & Track 1000+ Cryptocurrencies with AI-Powered Insights
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4 mr-2" />
              Watchlist
            </Button>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="text-sm text-muted-foreground mb-1">Total Market Cap</div>
              <div className="text-2xl font-bold">${marketStats.totalMarketCap}</div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
              <div className="text-sm text-muted-foreground mb-1">24h Volume</div>
              <div className="text-2xl font-bold">${marketStats.volume24h}</div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <div className="text-sm text-muted-foreground mb-1">BTC Dominance</div>
              <div className="text-2xl font-bold">{marketStats.btcDominance}%</div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
              <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                Market Sentiment
                {marketStats.sentiment === "Bullish" ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
              </div>
              <div className="text-2xl font-bold text-green-500">{marketStats.sentiment}</div>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search cryptocurrency by name or symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Top Gainer */}
        {topGainer && (
          <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Sparkles className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">🔥 Top Gainer Today</div>
                  <div className="text-2xl font-bold">{topGainer.name} ({topGainer.symbol})</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">${topGainer.price.toLocaleString()}</div>
                <Badge variant="default" className="bg-green-500 text-white">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +{topGainer.changePercent.toFixed(2)}%
                </Badge>
              </div>
            </div>
          </Card>
        )}

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Market Overview */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Market Overview</h2>
            <div className="flex gap-2">
              <Button
                variant={sortBy === "market_cap" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("market_cap")}
              >
                Market Cap
              </Button>
              <Button
                variant={sortBy === "volume" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("volume")}
              >
                Volume
              </Button>
              <Button
                variant={sortBy === "change" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("change")}
              >
                24h Change
              </Button>
            </div>
          </div>

          {cryptosLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="h-20 bg-muted rounded"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCryptos.slice(0, 20).map((crypto) => (
                <CryptoCard
                  key={crypto.symbol}
                  crypto={crypto}
                  onClick={() => navigate(`/crypto/${crypto.symbol}`)}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Cryptocurrencies
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Latest Crypto News */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Latest Crypto News</h2>
            <Button variant="ghost" onClick={() => navigate("/crypto/news")}>
              View All
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {newsLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="h-24 bg-muted rounded"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {news.slice(0, 10).map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onClick={() => navigate(`/crypto/news/${article.slug}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoHub;
