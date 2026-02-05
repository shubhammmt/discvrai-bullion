import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Bell, 
  User, 
  Moon, 
  Sun, 
  ChevronRight,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";
import { DiscvrHeroCarousel } from "@/components/discvr";
import { cn } from "@/lib/utils";

// News categories
const categories = [
  {
    id: "all",
    label: "All",
    icon: null,
  },
];

// Mock news data
const newsArticles = [
  {
    id: "1",
    title: "Gold Prices Hit New All-Time High Amid Global Uncertainty",
    excerpt: "International gold prices surged to record levels as investors seek safe-haven assets amid rising geopolitical tensions and inflation concerns...",
    category: "gold",
    isPremium: true,
    timestamp: "2h ago",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=250&fit=crop",
  },
  {
    id: "2",
    title: "Silver Demand Surges 40% as Solar Industry Expands",
    excerpt: "Industrial demand for silver has reached unprecedented levels, driven primarily by the rapid expansion of solar panel manufacturing...",
    category: "silver",
    isPremium: false,
    timestamp: "4h ago",
    image: "https://images.unsplash.com/photo-1624365169364-f0c3b5e3f3f4?w=400&h=250&fit=crop",
  },
  {
    id: "3",
    title: "RBI Holds Interest Rates Steady, Markets React Positively",
    excerpt: "The Reserve Bank of India maintained benchmark rates in its latest monetary policy meeting, providing relief to equity and commodity markets...",
    category: "economy",
    isPremium: false,
    timestamp: "6h ago",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
  },
  {
    id: "4",
    title: "Digital Gold vs Physical Gold: Which Investment Wins in 2026?",
    excerpt: "As digital gold platforms gain traction, investors are weighing the pros and cons of virtual ownership versus traditional physical holdings...",
    category: "personal-finance",
    isPremium: true,
    timestamp: "8h ago",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=250&fit=crop",
  },
  {
    id: "5",
    title: "Top 5 Gold ETFs to Watch This Quarter",
    excerpt: "With gold prices on the rise, exchange-traded funds tracking the precious metal have become increasingly attractive to retail investors...",
    category: "mutual-funds",
    isPremium: true,
    timestamp: "12h ago",
    image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=400&h=250&fit=crop",
  },
  {
    id: "6",
    title: "Global Gold Mining Output Declines for Third Consecutive Year",
    excerpt: "Major gold producers report declining production as ore grades fall and operating costs rise, potentially supporting higher prices...",
    category: "global",
    isPremium: false,
    timestamp: "1d ago",
    image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=250&fit=crop",
  },
];

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

        {/* Live Prices Widget */}
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
            {newsArticles.map((article, index) => (
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
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {article.isPremium && (
                        <Badge className="bg-amber-500 text-black font-semibold">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          PREMIUM
                        </Badge>
                      )}
                      <Badge variant="secondary" className="capitalize">
                        {article.category.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Clock className="w-3 h-3" />
                      {article.timestamp}
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
                      {article.isPremium ? "Read Premium Analysis" : "Read Full Article"}
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
