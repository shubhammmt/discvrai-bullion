import { ArrowLeft, Bell, User, Crown, Check, Zap, TrendingUp, Shield, FileText, Sparkles, Star, BookOpen, BadgeIndianRupee, Coins, Clock, ChevronRight, Bookmark } from "lucide-react";
import { toast } from "sonner";
import { DiscvrHeroCarousel } from "@/components/discvr/DiscvrHeroCarousel";
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

// Learn Categories
const learnCategories = [
  { id: "all", label: "All", icon: BookOpen },
  { id: "lamf", label: "LAMF", icon: BadgeIndianRupee },
  { id: "gold", label: "Gold", icon: Coins },
  { id: "silver", label: "Silver", icon: Coins },
  { id: "personal", label: "Personal Finance", icon: TrendingUp },
];

// Articles
const articles = [
  {
    id: "1",
    slug: "understanding-digital-gold",
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
    slug: "silver-investment-poor-mans-gold",
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
    slug: "loan-against-mutual-funds",
    title: "Loan Against Mutual Funds: Unlock Your Investment's Potential",
    summary: "Discover how LAMF works, eligibility criteria, interest rates, and why it's a smarter alternative to selling your investments during emergencies.",
    category: "lamf",
    readTime: 10,
    date: "2024-01-13",
    featured: true,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
  },
  {
    id: "5",
    slug: "building-emergency-fund",
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
    slug: "gold-sip-vs-lump-sum",
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
    slug: "silver-etfs-vs-physical",
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
    slug: "lamf-vs-personal-loan",
    title: "LAMF vs Personal Loan: Interest Rate Comparison 2024",
    summary: "A comprehensive comparison of loan against mutual funds versus personal loans. See how much you can save with LAMF's lower interest rates.",
    category: "lamf",
    readTime: 6,
    date: "2024-01-08",
    featured: false,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
  },
  {
    id: "10",
    slug: "tax-planning-gold-investments",
    title: "Tax Planning with Gold Investments: A Complete Guide",
    summary: "Understand the tax implications of gold investments in India. Learn about LTCG, STCG, and strategies to minimize your tax burden.",
    category: "personal",
    readTime: 12,
    date: "2024-01-06",
    featured: true,
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400",
  },
];

// Premium Features
const premiumFeatures = [
  {
    icon: BookOpen,
    title: "Enhance Your Knowledge",
    description: "Access premium educational content, courses, and webinars from industry experts",
    highlight: "50+ courses",
  },
  {
    icon: TrendingUp,
    title: "Lower Spread Rates",
    description: "Save up to 0.5% on every transaction with exclusive premium pricing",
    highlight: "Save ₹500 on every ₹1 lakh",
  },
  {
    icon: FileText,
    title: "Exclusive Research Reports",
    description: "Weekly market analysis and price predictions from expert analysts",
    highlight: "12 reports/year",
  },
  {
    icon: Zap,
    title: "Priority Execution",
    description: "Your orders get executed first during high-volume trading periods",
    highlight: "2x faster",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Get personalized buy/sell recommendations based on market conditions",
    highlight: "Daily alerts",
  },
  {
    icon: Star,
    title: "Dedicated Support",
    description: "Priority customer support with direct WhatsApp access",
    highlight: "< 1 hour response",
  },
];

// Pricing Plans
const pricingPlans = [
  {
    name: "Monthly",
    price: 299,
    period: "month",
    savings: null,
    popular: false,
  },
  {
    name: "Yearly",
    price: 2499,
    period: "year",
    savings: "Save ₹1,089",
    popular: true,
  },
  {
    name: "Lifetime",
    price: 9999,
    period: "one-time",
    savings: "Best value",
    popular: false,
  },
];

// Testimonials
const testimonials = [
  {
    name: "Rahul M.",
    role: "Premium Member since 2024",
    quote: "The lower spreads alone saved me ₹3,000 last month. Premium pays for itself!",
    rating: 5,
  },
  {
    name: "Priya S.",
    role: "Premium Member since 2023",
    quote: "The research reports are incredibly insightful. Helped me time my purchases better.",
    rating: 5,
  },
];

export default function BullionPremium() {
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

      {/* Hero Carousel */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <DiscvrHeroCarousel />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-orange-500/10 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-4">
            <Crown className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Premium Learning Hub</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Build wealth in bullion like <span className="text-amber-500">Pro</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access exclusive educational content, expert insights, and premium features to maximize your bullion investments
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Educational Content - Articles Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-bold">Learn & Grow</h2>
          </div>
          
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
                      onClick={() => navigate(`/bullion/premium/article/${article.slug}`)}
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
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-3 right-3 bg-background/80 backdrop-blur hover:bg-amber-500 hover:text-white h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success("Article bookmarked!", {
                              description: "View in Alerts & Bookmarks",
                              action: {
                                label: "View",
                                onClick: () => navigate("/bullion/notifications?tab=bookmarks"),
                              },
                            });
                          }}
                        >
                          <Bookmark className="w-4 h-4" />
                        </Button>
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
        </section>

        {/* Premium Benefits Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Crown className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-bold">Premium Benefits</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{feature.description}</p>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    {feature.highlight}
                  </Badge>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.name}
                className={`p-6 relative ${plan.popular ? "border-2 border-amber-500 shadow-lg" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white">
                    Most Popular
                  </Badge>
                )}
                <div className="text-center mb-6">
                  <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">₹{plan.price.toLocaleString()}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <Badge variant="outline" className="mt-2 text-emerald-600 border-emerald-500">
                      {plan.savings}
                    </Badge>
                  )}
                </div>
                <ul className="space-y-3 mb-6">
                  {premiumFeatures.slice(0, 4).map((feature) => (
                    <li key={feature.title} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500" />
                      {feature.title}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? "bg-amber-500 hover:bg-amber-600" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get {plan.name}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">What Premium Members Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="inline-block p-8 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20">
            <Crown className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Ready to Go Premium?</h3>
            <p className="text-muted-foreground mb-6">Start saving on every transaction today</p>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
              Upgrade Now
            </Button>
          </Card>
        </section>
      </main>
    </div>
  );
}
