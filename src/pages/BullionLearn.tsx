import { ArrowLeft, Bell, User, BookOpen, TrendingUp, Coins, BadgeIndianRupee, Newspaper, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";
import silverInvestment1 from "@/assets/silver-investment-1.jpg";
import silverInvestment2 from "@/assets/silver-investment-2.jpg";
import goldInvestment1 from "@/assets/gold-investment-1.jpg";
import goldInvestment2 from "@/assets/gold-investment-2.jpg";

const learnCategories = [
  { id: "all", label: "All", icon: BookOpen },
  { id: "news", label: "News", icon: Newspaper },
  { id: "lamf", label: "LAMF", icon: BadgeIndianRupee },
  { id: "gold", label: "Gold", icon: Coins },
  { id: "silver", label: "Silver", icon: Coins },
  { id: "personal", label: "Personal Finance", icon: TrendingUp },
];

const articles = [
  {
    id: "1",
    title: "Understanding Digital Gold: A Complete Beginner's Guide",
    summary: "Learn everything about digital gold investment, from basics to advanced strategies. Discover how digital gold works, its benefits, and how to start investing.",
    category: "gold",
    readTime: 8,
    date: "2024-01-15",
    featured: true,
    image: goldInvestment1,
  },
  {
    id: "2",
    title: "Silver Investment: Why It's Called 'Poor Man's Gold'",
    summary: "Explore the unique characteristics of silver as an investment. Understand the gold-silver ratio and when to invest in silver for maximum returns.",
    category: "silver",
    readTime: 6,
    date: "2024-01-14",
    featured: false,
    image: silverInvestment1,
  },
  {
    id: "3",
    title: "Loan Against Mutual Funds: Unlock Your Investment's Potential",
    summary: "Discover how LAMF works, eligibility criteria, interest rates, and why it's a smarter alternative to selling your investments during emergencies.",
    category: "lamf",
    readTime: 10,
    date: "2024-01-13",
    featured: true,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
  },
  {
    id: "4",
    title: "RBI's New Gold Policy: What It Means for Investors",
    summary: "Breaking down the latest RBI regulations on gold investments and how they impact retail investors in India.",
    category: "news",
    readTime: 5,
    date: "2024-01-12",
    featured: false,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
  },
  {
    id: "5",
    title: "Building an Emergency Fund: Step-by-Step Guide",
    summary: "Learn how to build and maintain an emergency fund that protects your financial future. Includes practical tips and goal-setting strategies.",
    category: "personal",
    readTime: 7,
    date: "2024-01-11",
    featured: false,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
  },
  {
    id: "6",
    title: "Gold SIP vs Lump Sum: Which Strategy Works Best?",
    summary: "A detailed comparison of systematic investment plans versus lump sum investments in gold. Find out which approach suits your financial goals.",
    category: "gold",
    readTime: 9,
    date: "2024-01-10",
    featured: true,
    image: goldInvestment2,
  },
  {
    id: "7",
    title: "Silver ETFs vs Physical Silver: Pros and Cons",
    summary: "Compare different ways to invest in silver - from physical coins to ETFs and digital silver. Make an informed decision for your portfolio.",
    category: "silver",
    readTime: 8,
    date: "2024-01-09",
    featured: false,
    image: silverInvestment2,
  },
  {
    id: "8",
    title: "LAMF vs Personal Loan: Interest Rate Comparison 2024",
    summary: "A comprehensive comparison of loan against mutual funds versus personal loans. See how much you can save with LAMF's lower interest rates.",
    category: "lamf",
    readTime: 6,
    date: "2024-01-08",
    featured: false,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
  },
  {
    id: "9",
    title: "Global Markets Update: Impact on Indian Gold Prices",
    summary: "How international market movements, Fed decisions, and geopolitical events affect gold and silver prices in India.",
    category: "news",
    readTime: 5,
    date: "2024-01-07",
    featured: false,
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400",
  },
  {
    id: "10",
    title: "Tax Planning with Gold Investments: A Complete Guide",
    summary: "Understand the tax implications of gold investments in India. Learn about LTCG, STCG, and strategies to minimize your tax burden.",
    category: "personal",
    readTime: 12,
    date: "2024-01-06",
    featured: true,
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400",
  },
];

export default function BullionLearn() {
  const navigate = useNavigate();

  const filterArticles = (category: string) => {
    if (category === "all") return articles;
    return articles.filter((article) => article.category === category);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "gold":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "silver":
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
      case "lamf":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "news":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "personal":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      default:
        return "bg-muted text-muted-foreground";
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-orange-500/10 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-4">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Premium Learning</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Enhance Your <span className="text-amber-500">Knowledge</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access exclusive educational content, expert insights, and in-depth articles on gold, silver, and personal finance
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap mb-6 h-auto p-1 bg-muted/50">
            {learnCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="flex items-center gap-2 px-4 py-2 whitespace-nowrap data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {learnCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterArticles(cat.id).map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {article.featured && (
                        <Badge className="absolute top-3 left-3 bg-amber-500 text-white">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className={getCategoryColor(article.category)}>
                          {article.category.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime} min read
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {article.summary}
                      </p>
                      <Button variant="ghost" className="p-0 h-auto text-amber-500 hover:text-amber-600">
                        Read Article <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {filterArticles(cat.id).length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No articles in this category yet</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
