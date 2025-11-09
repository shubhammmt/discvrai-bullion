import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, DollarSign, Target } from "lucide-react";
import { MarketOpportunitySimplifiedSlide } from "@/components/pitch/MarketOpportunitySimplifiedSlide";

const InvestorDeckFull = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Slide 1: Title Slide */}
      <section className="min-h-screen flex items-center justify-center p-8 border-b">
        <div className="max-w-5xl w-full text-center space-y-12">
          {/* Logo placeholder - can be replaced with actual logo */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">D</span>
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-4">
            <h1 className="text-7xl font-bold tracking-tight">Discvr.ai</h1>
            <p className="text-2xl text-muted-foreground font-medium">
              Content-Led Financial Distribution Platform
            </p>
            <p className="text-xl text-muted-foreground">
              Zero-CAC Fintech Distribution for India
            </p>
          </div>

          {/* Founder & Credentials */}
          <div className="space-y-6 pt-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">Shubham Srivastava</h2>
              <p className="text-xl text-muted-foreground">Founder & CEO</p>
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Badge variant="secondary" className="px-6 py-3 text-base font-medium">
                Ex-CTO, Eureka Forbes (Listed Unicorn)
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-base font-medium">
                Ex-CTO, HT Digital (100M+ Users)
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-base font-medium">
                Ex-MMT (Nasdaq Listed)
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-base font-medium">
                Ex-iTrust Financial Advisors
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 2: Business Overview */}
      <section className="min-h-screen flex items-center justify-center p-8 border-b">
        <div className="max-w-7xl w-full space-y-12">
          {/* Hook */}
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold leading-tight">
              Indian fintech spends <span className="text-primary">$50B+</span> on customer acquisition.
            </h2>
            <p className="text-3xl text-muted-foreground font-medium">
              We're building the zero-CAC alternative.
            </p>
          </div>

          {/* Two Column Layout: Problem / Solution */}
          <div className="grid md:grid-cols-2 gap-8 pt-8">
            {/* Left: Problem */}
            <Card className="p-8 space-y-6 bg-card/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold">The Problem</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-destructive">$50B+ CAC Crisis</h4>
                  <p className="text-muted-foreground">
                    Traditional fintech burns massive capital acquiring users through paid ads
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-destructive">Content-Commerce Gap</h4>
                  <p className="text-muted-foreground">
                    400M+ Indians lack trusted, engaging financial content → product discovery
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-destructive">Why It Exists</h4>
                  <p className="text-muted-foreground">
                    Platforms are either pure content (no monetization) or pure product (high CAC)
                  </p>
                  <p className="text-muted-foreground">
                    No one has scaled content → commerce in fintech for India
                  </p>
                </div>
              </div>
            </Card>

            {/* Right: Solution */}
            <Card className="p-8 space-y-6 bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Solution</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-primary">What We Do</h4>
                  <p className="text-muted-foreground">
                    Content-led financial distribution platform combining news/engagement (180 articles/day) 
                    with product conversion funnels (mutual funds, loans, digital gold)
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-primary">Our Advantages</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Proven Playbook</p>
                        <p className="text-sm text-muted-foreground">
                          Founder scaled content distribution to 100M+ users at HT Digital
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">180 Articles/Day Engine</p>
                        <p className="text-sm text-muted-foreground">
                          Already producing scaled content (scaling to 500+)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Low CAC Model</p>
                        <p className="text-sm text-muted-foreground">
                          Organic acquisition through SEO + engagement (polls, quizzes, news)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Why Care */}
          <div className="grid md:grid-cols-4 gap-6 pt-4">
            <Card className="p-6 text-center space-y-2 bg-card/50">
              <p className="text-4xl font-bold text-primary">$230B+</p>
              <p className="text-sm text-muted-foreground">Indian Fintech Market by 2030</p>
            </Card>
            <Card className="p-6 text-center space-y-2 bg-card/50">
              <p className="text-4xl font-bold text-primary">Zero CAC</p>
              <p className="text-sm text-muted-foreground">Content = Distribution</p>
            </Card>
            <Card className="p-6 text-center space-y-2 bg-card/50">
              <p className="text-4xl font-bold text-primary">Day 1</p>
              <p className="text-sm text-muted-foreground">Unit Economics Work</p>
            </Card>
            <Card className="p-6 text-center space-y-2 bg-card/50">
              <p className="text-4xl font-bold text-primary">Global</p>
              <p className="text-sm text-muted-foreground">India → US Markets</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Slide 3: Team (Placeholder) */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white p-8 border-b">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-foreground mb-4">Team & Advisors</h2>
          <p className="text-xl text-muted-foreground">[Placeholder - To be added]</p>
        </div>
      </section>

      {/* Slide 4: Market Opportunity - Simplified */}
      <section className="min-h-screen flex items-center justify-center p-8 border-b">
        <div className="max-w-7xl mx-auto w-full">
          <MarketOpportunitySimplifiedSlide />
        </div>
      </section>

      {/* Navigation hint */}
      <div className="fixed bottom-8 right-8">
        <Badge variant="outline" className="px-4 py-2">
          Scroll for more slides
        </Badge>
      </div>
    </div>
  );
};

export default InvestorDeckFull;
