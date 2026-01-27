import { ArrowLeft, Bell, User, Crown, Check, Zap, TrendingUp, Shield, FileText, Sparkles, Star, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";

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
      <section className="bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-orange-500/10 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6">
            <Crown className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Premium Membership</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Build wealth in bullion like <span className="text-amber-500">Pro</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock exclusive features, lower spreads, and expert insights with Discvr Bullion Premium
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Premium Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumFeatures.map((feature) => {
              const Icon = feature.icon;
              const isKnowledgeCard = feature.title === "Enhance Your Knowledge";
              return (
                <Card 
                  key={feature.title} 
                  className={`p-6 hover:shadow-lg transition-shadow ${isKnowledgeCard ? "cursor-pointer hover:border-amber-500/50" : ""}`}
                  onClick={isKnowledgeCard ? () => navigate("/bullion/learn") : undefined}
                >
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
        </div>

        {/* Pricing */}
        <div className="mb-16">
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
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
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
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="inline-block p-8 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20">
            <Crown className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Ready to Go Premium?</h3>
            <p className="text-muted-foreground mb-6">Start saving on every transaction today</p>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
              Upgrade Now
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
