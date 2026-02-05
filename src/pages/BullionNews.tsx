 import { useState } from "react";
 import { ArrowLeft, Bell, User, TrendingUp, TrendingDown, Clock, ExternalLink, RefreshCw, Volume2, Share2, Sparkles } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Card } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { useNavigate } from "react-router-dom";
 import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";
 import { DiscvrHeroCarousel } from "@/components/discvr/DiscvrHeroCarousel";
 
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
     readTime: "2 min read",
     wordCount: "120 words",
   },
   {
     id: "2",
     title: "RBI Increases Gold Reserves by 5 Tonnes in January",
     summary: "Central bank continues gold accumulation trend, signaling long-term bullish outlook.",
     source: "Mint",
     category: "Gold",
     timestamp: "5 hours ago",
     impact: "bullish" as const,
     imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=200&fit=crop",
     readTime: "3 min read",
     wordCount: "180 words",
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
     readTime: "2 min read",
     wordCount: "95 words",
   },
   {
     id: "4",
     title: "US Fed Signals Rate Pause, Precious Metals React",
     summary: "Federal Reserve hints at holding rates steady, providing support for gold and silver prices.",
     source: "Bloomberg",
     category: "Gold",
     timestamp: "1 day ago",
     impact: "neutral" as const,
     imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
     readTime: "4 min read",
     wordCount: "250 words",
   },
   {
     id: "5",
    title: "Silver Production Costs Rise Amid Supply Concerns",
    summary: "Mining companies report increased costs, potentially impacting silver supply in coming quarters.",
    source: "Mining Weekly",
    category: "Silver",
     timestamp: "1 day ago",
    impact: "bearish" as const,
     imageUrl: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=400&h=200&fit=crop",
     readTime: "2 min read",
     wordCount: "110 words",
   },
   {
     id: "6",
     title: "LAMF Rates Drop to Historic Lows",
     summary: "Loan against mutual funds now available at 10.20% p.a., making it an attractive financing option.",
     source: "Financial Express",
     category: "LAMF",
     timestamp: "2 days ago",
     impact: "bullish" as const,
     imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
     readTime: "3 min read",
     wordCount: "145 words",
   },
 ];
 
 const categories = ["All News", "Gold", "Silver", "LAMF", "Videos"];
 
 const exploreOptions = [
   {
     id: "lamf",
     title: "High Return Equity Mutual Funds",
     description: "Access funds quickly while staying invested with lower rates",
     icon: "📈",
     gradient: "from-cyan-500/20 to-teal-500/20",
     borderColor: "border-cyan-500/30",
     route: "/bullion/loans",
   },
   {
     id: "gold",
     title: "Start Gold SIP",
     description: "Invest in 24K pure gold starting from just ₹10",
     icon: "🪙",
     gradient: "from-amber-500/20 to-yellow-500/20",
     borderColor: "border-amber-500/30",
     route: "/bullion?metal=gold",
   },
   {
     id: "silver",
     title: "Start Silver SIP",
     description: "Invest in 999 pure silver starting from just ₹10",
     icon: "🥈",
     gradient: "from-slate-400/20 to-zinc-400/20",
     borderColor: "border-slate-400/30",
     route: "/bullion?metal=silver",
   },
 ];
 
 export default function BullionNews() {
   const navigate = useNavigate();
   const [activeCategory, setActiveCategory] = useState(0);
 
   const getImpactBadge = (impact: string) => {
     const colors = {
       bullish: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
       bearish: "bg-red-500/20 text-red-400 border-red-500/30",
       neutral: "bg-muted text-muted-foreground border-border",
     };
     return colors[impact as keyof typeof colors] || colors.neutral;
   };
 
   const getImpactBorderColor = (impact: string) => {
     switch (impact) {
       case "bullish": return "rgb(16 185 129)";
       case "bearish": return "rgb(239 68 68)";
       default: return "rgb(156 163 175)";
     }
   };
 
   return (
     <div className="min-h-screen bg-background">
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
 
       <BullionNavTabs />
 
       <main className="max-w-7xl mx-auto px-4 py-6">
         {/* Hero Carousel */}
         <div className="mb-8">
           <DiscvrHeroCarousel />
         </div>
 
         {/* Category Filters */}
         <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-4">
           {categories.map((category, index) => (
             <Button
               key={category}
               variant={activeCategory === index ? "default" : "outline"}
               size="sm"
               className="whitespace-nowrap"
               onClick={() => setActiveCategory(index)}
             >
               {category}
             </Button>
           ))}
         </div>
 
         {/* News Feed Header */}
         <div className="flex items-center justify-between mb-6">
           <h2 className="text-xl font-bold">News Feed</h2>
           <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" className="gap-2">
               <Volume2 className="w-4 h-4" />
               <span className="hidden sm:inline">Listen to All</span>
             </Button>
             <Button variant="outline" size="sm" className="gap-2">
               <RefreshCw className="w-4 h-4" />
               <span className="hidden sm:inline">Refresh</span>
             </Button>
           </div>
         </div>
 
         {/* News Feed */}
         <div className="space-y-4 mb-10">
           {newsItems.map((news) => (
             <Card 
               key={news.id} 
               className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group border-l-4"
               style={{ borderLeftColor: getImpactBorderColor(news.impact) }}
             >
               <div className="p-4 md:p-6">
                 <div className="flex items-center justify-between mb-3">
                   <Badge className={`${getImpactBadge(news.impact)} border`}>
                     {news.impact === "bullish" ? "Positive" : news.impact === "bearish" ? "Negative" : "Neutral"}
                   </Badge>
                   <div className="flex items-center gap-3 text-sm text-muted-foreground">
                     <span className="flex items-center gap-1">
                       <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                       {news.timestamp}
                     </span>
                     <Button variant="ghost" size="icon" className="h-8 w-8">
                       <Volume2 className="w-4 h-4" />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8">
                       <Share2 className="w-4 h-4" />
                     </Button>
                   </div>
                 </div>
 
                 <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                   {news.title}
                 </h3>
 
                 <div className="flex items-center gap-2 mb-4">
                   <Badge variant="secondary" className="text-xs">
                     <Clock className="w-3 h-3 mr-1" />
                     {news.readTime}
                   </Badge>
                   <Badge variant="outline" className="text-xs">
                     {news.wordCount}
                   </Badge>
                 </div>
 
                 <div className="flex flex-col md:flex-row gap-4">
                   <div className="w-full md:w-64 h-40 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                     <img 
                       src={news.imageUrl} 
                       alt={news.title}
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                     />
                   </div>
                   <div className="flex-1">
                     <p className="text-primary/80 font-medium mb-2 line-clamp-2">
                       {news.summary}
                     </p>
                     <p className="text-sm text-muted-foreground line-clamp-3">
                       {news.summary} Market analysts are closely watching developments as this could have significant implications for investors.
                     </p>
                   </div>
                 </div>
 
                 <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
                     <Badge variant="outline">{news.category}</Badge>
                     <span>•</span>
                     <span>{news.source}</span>
                   </div>
                   <div className="flex items-center gap-1 text-sm text-primary hover:underline">
                     <ExternalLink className="w-4 h-4" />
                     Read full article
                   </div>
                 </div>
               </div>
             </Card>
           ))}
         </div>
 
         {/* Explore Options */}
         <div className="mb-10">
           <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
               <Sparkles className="w-5 h-5 text-primary" />
             </div>
             <div>
               <h2 className="text-xl font-bold">Explore More</h2>
               <p className="text-sm text-muted-foreground">Discover investment opportunities</p>
             </div>
           </div>
 
           <div className="grid md:grid-cols-3 gap-4">
             {exploreOptions.map((option) => (
               <Card 
                 key={option.id}
                 className={`p-5 cursor-pointer hover:shadow-lg transition-all bg-gradient-to-br ${option.gradient} border ${option.borderColor}`}
                 onClick={() => navigate(option.route)}
               >
                 <div className="text-3xl mb-3">{option.icon}</div>
                 <h3 className="font-semibold mb-2">{option.title}</h3>
                 <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                 <Button variant="outline" size="sm" className="w-full">
                   Explore
                 </Button>
               </Card>
             ))}
           </div>
         </div>
 
         <div className="text-center mt-8">
           <Button variant="outline">Load More News</Button>
         </div>
       </main>
     </div>
   );
 }
