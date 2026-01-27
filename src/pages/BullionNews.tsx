import { ArrowLeft, Bell, User, Newspaper, TrendingUp, TrendingDown, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";

// Mock news data
const newsItems = [
  {
    id: "1",
    title: "Gold Prices Hit 3-Month High Amid Global Uncertainty",
    summary: "Safe-haven demand drives gold prices to new highs as investors seek protection against inflation.",
    source: "Economic Times",
    category: "Gold",
    timestamp: "2 hours ago",
    impact: "bullish" as const,
    imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=200&fit=crop",
  },
  {
    id: "2",
    title: "RBI Increases Gold Reserves by 5 Tonnes in January",
    summary: "Central bank continues gold accumulation trend, signaling long-term bullish outlook.",
    source: "Mint",
    category: "Policy",
    timestamp: "5 hours ago",
    impact: "bullish" as const,
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=200&fit=crop",
  },
  {
    id: "3",
    title: "Silver Demand Surges on Solar Panel Manufacturing Boom",
    summary: "Industrial demand for silver reaches record levels as renewable energy sector expands.",
    source: "Reuters",
    category: "Silver",
    timestamp: "8 hours ago",
    impact: "bullish" as const,
    imageUrl: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?w=400&h=200&fit=crop",
  },
  {
    id: "4",
    title: "US Fed Signals Rate Pause, Precious Metals React",
    summary: "Federal Reserve hints at holding rates steady, providing support for gold and silver prices.",
    source: "Bloomberg",
    category: "Global",
    timestamp: "1 day ago",
    impact: "neutral" as const,
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
  },
  {
    id: "5",
    title: "GST Council Reviews Gold Import Duties",
    summary: "Potential changes to import duties could impact domestic gold prices in coming months.",
    source: "Business Standard",
    category: "Tax",
    timestamp: "1 day ago",
    impact: "bearish" as const,
    imageUrl: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=400&h=200&fit=crop",
  },
];

const categories = ["All", "Gold", "Silver", "Policy", "Global", "Tax", "Mutual Funds", "LAMF", "Videos"];

export default function BullionNews() {
  const navigate = useNavigate();

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "bullish": return "text-emerald-500";
      case "bearish": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "bullish": return <TrendingUp className="w-4 h-4" />;
      case "bearish": return <TrendingDown className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BullionMobileMenu />
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="lg:flex hidden">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg">Discvr Bullion</h1>
              <p className="text-xs text-muted-foreground">Digital Gold & Silver</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/bullion/profile")}>
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop Navigation Tabs */}
      <BullionNavTabs />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Quick Insights</h1>
            <p className="text-muted-foreground">Curated feed on bullion prices and inflation data</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={news.imageUrl} 
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground">
                  {news.category}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                  {news.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {news.summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{news.source}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {news.timestamp}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${getImpactColor(news.impact)}`}>
                    {getImpactIcon(news.impact)}
                    <span className="capitalize">{news.impact}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">
            Load More News
          </Button>
        </div>
      </main>
    </div>
  );
}
