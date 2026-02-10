import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  User, 
  Moon, 
  Sun, 
  ChevronRight,
  ChevronLeft,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  Crown,
  BookOpen,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";
import { DiscvrHeroCarousel } from "@/components/discvr";
import { cn } from "@/lib/utils";

// News data sourced from /bullion/news
const newsItems = [
  {
    id: "1",
    title: "Gold Prices Hit 3-Month High Amid Global Uncertainty",
    excerpt: "Safe-haven demand drives gold prices to new highs as investors seek protection against inflation.",
    source: "Economic Times",
    category: "Gold",
    timestamp: "2 hours ago",
    impact: "bullish" as const,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=250&fit=crop",
  },
  {
    id: "2",
    title: "RBI Increases Gold Reserves by 5 Tonnes in January",
    excerpt: "Central bank continues gold accumulation trend, signaling long-term bullish outlook.",
    source: "Mint",
    category: "Gold",
    timestamp: "5 hours ago",
    impact: "bullish" as const,
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=250&fit=crop",
  },
  {
    id: "3",
    title: "Silver Demand Surges on Solar Panel Manufacturing Boom",
    excerpt: "Industrial demand for silver reaches record levels as renewable energy sector expands.",
    source: "Reuters",
    category: "Silver",
    timestamp: "8 hours ago",
    impact: "bullish" as const,
    image: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?w=400&h=250&fit=crop",
  },
  {
    id: "4",
    title: "US Fed Signals Rate Pause, Precious Metals React",
    excerpt: "Federal Reserve hints at holding rates steady, providing support for gold and silver prices.",
    source: "Bloomberg",
    category: "Gold",
    timestamp: "1 day ago",
    impact: "neutral" as const,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
  },
  {
    id: "5",
    title: "Silver Production Costs Rise Amid Supply Concerns",
    excerpt: "Mining companies report increased costs, potentially impacting silver supply in coming quarters.",
    source: "Mining Weekly",
    category: "Silver",
    timestamp: "1 day ago",
    impact: "bearish" as const,
    image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=400&h=250&fit=crop",
  },
  {
    id: "6",
    title: "LAMF Rates Drop to Historic Lows",
    excerpt: "Loan against mutual funds now available at 10.20% p.a., making it an attractive financing option.",
    source: "Financial Express",
    category: "LAMF",
    timestamp: "2 days ago",
    impact: "bullish" as const,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
  },
];

// Premium articles from /bullion/premium
const premiumArticles = [
  {
    id: "1",
    title: "Understanding Digital Gold: A Complete Beginner's Guide",
    summary: "Learn everything about digital gold investment, from basics to advanced strategies.",
    category: "Gold",
    readTime: 8,
    featured: true,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=250&fit=crop",
  },
  {
    id: "2",
    title: "Silver Investment: Why It's Called 'Poor Man's Gold'",
    summary: "Explore the unique characteristics of silver as an investment asset.",
    category: "Silver",
    readTime: 6,
    featured: false,
    image: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?w=400&h=250&fit=crop",
  },
  {
    id: "3",
    title: "Loan Against Mutual Funds: Unlock Your Investment's Potential",
    summary: "Discover how LAMF works, eligibility criteria, and why it's smarter than selling.",
    category: "LAMF",
    readTime: 10,
    featured: true,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
  },
  {
    id: "5",
    title: "Building an Emergency Fund: Step-by-Step Guide",
    summary: "Learn how to build and maintain an emergency fund that protects your financial future.",
    category: "Personal Finance",
    readTime: 7,
    featured: false,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop",
  },
  {
    id: "6",
    title: "Gold SIP vs Lump Sum: Which Strategy Works Best?",
    summary: "A detailed comparison of SIP versus lump sum investments in gold.",
    category: "Gold",
    readTime: 9,
    featured: true,
    image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=400&h=250&fit=crop",
  },
  {
    id: "7",
    title: "Silver ETFs vs Physical Silver: Pros and Cons",
    summary: "Compare different ways to invest in silver - from physical coins to ETFs.",
    category: "Silver",
    readTime: 8,
    featured: false,
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=250&fit=crop",
  },
];

// Premium Content Carousel Component
function PremiumCarousel({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerView = 3;
  const maxSlide = Math.max(0, premiumArticles.length - slidesPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxSlide]);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl md:text-2xl font-bold">Premium Content</h2>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate("/bullion/premium")}
          className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          View All Premium
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-4"
            style={{ transform: `translateX(-${currentSlide * (100 / slidesPerView + 1.33)}%)` }}
          >
            {premiumArticles.map((article) => (
              <Card 
                key={article.id}
                className="min-w-[calc(33.333%-11px)] flex-shrink-0 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border-amber-500/10"
                onClick={() => navigate("/bullion/premium")}
              >
                <div className="relative h-36 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    <Badge className="bg-amber-500 text-black font-semibold text-xs">
                      <Crown className="w-3 h-3 mr-1" />
                      PRO
                    </Badge>
                    <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{article.summary}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {article.readTime} min read
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        {currentSlide > 0 && (
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur border border-border shadow-md flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {currentSlide < maxSlide && (
          <button
            onClick={() => setCurrentSlide((prev) => Math.min(maxSlide, prev + 1))}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur border border-border shadow-md flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: maxSlide + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all",
                i === currentSlide ? "w-4 bg-amber-500" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function DiscvrHomepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BullionMobileMenu />
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => navigate("/bullion")}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">D</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">DiscvrAI</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Your Financial Companion</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => document.documentElement.classList.toggle('dark')}
            >
              <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/bullion/profile")}>
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/bullion/notifications")}>
              <Bell className="w-5 h-5" />
            </Button>
            <Button 
              className="hidden sm:flex bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
              onClick={() => navigate("/bullion")}
            >
              <Zap className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <BullionNavTabs />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Carousel */}
        <section className="mb-6">
          <DiscvrHeroCarousel />
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Live Prices</h2>
            <Button variant="ghost" onClick={() => navigate("/bullion")}>
              Trade Now <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { metal: "Gold", price: "₹6,250.50", change: "+0.72%", isUp: true, icon: "🪙" },
              { metal: "Silver", price: "₹76.80", change: "-1.63%", isUp: false, icon: "🥈" },
            ].map((item) => (
              <Card 
                key={item.metal}
                className="cursor-pointer hover:shadow-md transition-all"
                onClick={() => navigate("/bullion")}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold">{item.metal}</p>
                      <p className="text-xs text-muted-foreground">per gram</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{item.price}</p>
                    <p className={cn(
                      "text-sm font-medium",
                      item.isUp ? "text-emerald-500" : "text-red-500"
                    )}>
                      {item.change}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Buy Gold", icon: "🪙", route: "/bullion", color: "from-amber-500/20 to-amber-600/20" },
              { label: "Buy Silver", icon: "🥈", route: "/bullion", color: "from-slate-400/20 to-slate-500/20" },
              { label: "Start SIP", icon: "📅", route: "/bullion", color: "from-emerald-500/20 to-emerald-600/20" },
              { label: "Get Loan", icon: "💰", route: "/bullion/loans", color: "from-blue-500/20 to-blue-600/20" },
            ].map((action) => (
              <Card 
                key={action.label}
                className={cn(
                  "cursor-pointer hover:shadow-md transition-all group bg-gradient-to-br",
                  action.color
                )}
                onClick={() => navigate(action.route)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <span className="text-2xl">{action.icon}</span>
                  <span className="font-medium group-hover:text-primary transition-colors">{action.label}</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Premium Content Carousel */}
        <PremiumCarousel navigate={navigate} />

        {/* Quick Insight Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Quick Insight</h2>
              <p className="text-sm text-muted-foreground">Stay updated with real-time financial news and insights</p>
            </div>
            <Button variant="outline" onClick={() => navigate("/bullion/news")}>
              View All News
            </Button>
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsItems.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "font-semibold text-xs",
                          article.impact === "bullish" && "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
                          article.impact === "bearish" && "bg-red-500/20 text-red-400 border-red-500/30",
                        )}
                      >
                        {article.impact === "bullish" ? <TrendingUp className="w-3 h-3 mr-1" /> : article.impact === "bearish" ? <TrendingDown className="w-3 h-3 mr-1" /> : null}
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {article.timestamp}
                      </div>
                      <span className="font-medium">{article.source}</span>
                    </div>
                    <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto mt-3 text-primary"
                      onClick={() => navigate("/bullion/news")}
                    >
                      Read Full Article
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
