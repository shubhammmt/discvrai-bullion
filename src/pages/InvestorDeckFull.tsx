import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, DollarSign, Target } from "lucide-react";
import { MarketOpportunityFocusedSlide } from "@/components/pitch/MarketOpportunityFocusedSlide";
import { BusinessModelGTMSlide } from "@/components/pitch/BusinessModelGTMSlide";
import { PartnershipsSlide } from "@/components/pitch/PartnershipsSlide";
import { CompetitionSlideV2 } from "@/components/pitch/CompetitionSlideV2";
import { CompetitiveMoatsSlide } from "@/components/pitch/CompetitiveMoatsSlide";
import { FinancialOverviewSlide } from "@/components/pitch/FinancialOverviewSlide";
import { UseOfProceedsSlide } from "@/components/pitch/UseOfProceedsSlide";
import { FundingRequestSlide } from "@/components/pitch/FundingRequestSlide";
import { ContactSlide } from "@/components/pitch/ContactSlide";

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
            <p className="text-3xl text-muted-foreground font-medium">
              Building India's Biggest Financial Distribution Platform
            </p>
          </div>

          {/* Founder & Credentials */}
          <div className="space-y-6 pt-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">Shubham Srivastava</h2>
              <p className="text-xl text-muted-foreground">Founder & CEO • 2nd Time Founder</p>
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Badge variant="secondary" className="px-6 py-3 text-base font-medium">
                Ex-CTO, Eureka Forbes
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-base font-medium">
                Ex-CTO, HT Digital (100M+ MAU)
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-base font-medium">
                Ex-MakeMyTrip
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-base font-medium">
                Founder, Tekch (PropTech SaaS)
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
            <h2 className="text-4xl font-bold leading-tight">
              Trusted content drives discovery. Discovery drives distribution.
            </h2>
            <p className="text-2xl text-muted-foreground font-medium">
              We marry the right financial product to the right consumer through information, not ads.
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
                  <h4 className="text-lg font-semibold text-destructive">The Trust Gap</h4>
                  <p className="text-muted-foreground">
                    400M+ Indians lack accessible, trusted financial guidance for making informed decisions
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-destructive">Discovery Problem</h4>
                  <p className="text-muted-foreground">
                    Users don't know which financial products fit their needs—they rely on ads or word-of-mouth
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-destructive">Distribution Inefficiency</h4>
                  <p className="text-muted-foreground">
                    Platforms spend heavily on CAC to acquire users, making distribution expensive
                  </p>
                  <p className="text-muted-foreground">
                    No one bridges content → trust → product fit at scale in Indian fintech
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
                    Information-driven platform that helps users discover the right financial products through trusted content, 
                    engagement tools, and personalized recommendations
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-primary">How It Works</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Content That Educates</p>
                        <p className="text-sm text-muted-foreground">
                          180 articles/day covering stocks, mutual funds, gold, credit—scaling to 500+
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Tools That Engage</p>
                        <p className="text-sm text-muted-foreground">
                          Quizzes, polls, calculators, watchlists—building daily habits and trust
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Distribution That Works</p>
                        <p className="text-sm text-muted-foreground">
                          When users trust us, they transact—better experience, lower provider costs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Why This Matters */}
          <div className="grid md:grid-cols-4 gap-6 pt-4">
            <Card className="p-6 text-center space-y-2 bg-card/50">
              <p className="text-4xl font-bold text-primary">₹53K Cr</p>
              <p className="text-sm text-muted-foreground">Year 1 Market Opportunity</p>
            </Card>
            <Card className="p-6 text-center space-y-2 bg-card/50">
              <p className="text-4xl font-bold text-primary">Low CAC</p>
              <p className="text-sm text-muted-foreground">Content-Driven Acquisition</p>
            </Card>
            <Card className="p-6 text-center space-y-2 bg-card/50">
              <p className="text-4xl font-bold text-primary">Win-Win</p>
              <p className="text-sm text-muted-foreground">Better UX, Lower Provider Costs</p>
            </Card>
            <Card className="p-6 text-center space-y-2 bg-card/50">
              <p className="text-4xl font-bold text-primary">Proven DNA</p>
              <p className="text-sm text-muted-foreground">100M+ MAU Track Record</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Slide 3: Team & Advisors */}
      <section className="min-h-screen flex items-center justify-center p-8 border-b">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-foreground mb-4">Team & Advisors</h2>
            <p className="text-xl text-muted-foreground">Proven execution team with deep domain expertise</p>
          </div>

          {/* Founder */}
          <Card className="p-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-primary">SS</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground">Shubham Srivastava</h3>
                  <p className="text-lg text-primary font-medium mb-2">Founder & CEO, Discvr.ai</p>
                  <p className="text-muted-foreground mb-3">
                    Ex-CTO, Eureka Forbes | Ex-CTO, Hindustan Times | Ex-MakeMyTrip | Founder, Tekch (PropTech SaaS)
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• 20+ years building and scaling large-scale digital platforms across fintech, media, and consumer tech</p>
                    <p>• Founded Discvr.ai to simplify financial decision-making through AI-powered product discovery and intelligence</p>
                    <p>• Led tech and product at Eureka Forbes (1M+ MAUs), HT Digital (10M→100M+ MAU), and MakeMyTrip Hotels (global scale systems)</p>
                    <p>• Deep expertise in AI, product-led growth, and platform scalability</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Advisors & Key People */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Advisors & Key People</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-primary font-semibold">Tech Advisor</p>
                  <h4 className="text-xl font-bold text-foreground">Sharat Singh</h4>
                  <p className="text-muted-foreground">Ex-CTO MakeMyTrip, Ex-CTO Nexttag</p>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-primary font-semibold">Content & SEO Lead</p>
                  <h4 className="text-xl font-bold text-foreground">Anil Singh</h4>
                  <p className="text-muted-foreground">Ex-TOI, Ex-HT (Employed Part-time)</p>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-primary font-semibold">Growth & Marketing Advisor</p>
                  <h4 className="text-xl font-bold text-foreground">Inderpreet Singh</h4>
                  <p className="text-muted-foreground">Ex-Tata Sky, Business Head OTTPlay</p>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-primary font-semibold">Product Advisor</p>
                  <h4 className="text-xl font-bold text-foreground">Ramji Tripathi</h4>
                  <p className="text-muted-foreground">Ex-TOI, Ex-HT, Ex-Airtel, VP Reliance</p>
                </div>
              </Card>
              
              <Card className="p-6 md:col-span-2">
                <div className="space-y-2">
                  <p className="text-sm text-primary font-semibold">Finance & Compliance</p>
                  <h4 className="text-xl font-bold text-foreground">Abhishek Singh</h4>
                  <p className="text-muted-foreground">Enabled INDmoney from 0→1 (Employed Part-time)</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4: Market Opportunity - 3-Category Focus */}
      <section className="min-h-screen flex items-center justify-center p-8 border-b">
        <div className="max-w-7xl mx-auto w-full">
          <MarketOpportunityFocusedSlide />
        </div>
      </section>

      {/* Slide 5: Product/Service (Placeholder) */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white p-8 border-b">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-foreground mb-4">Product Demo & Screens</h2>
          <p className="text-xl text-muted-foreground">[Placeholder - To be added]</p>
        </div>
      </section>

      {/* Slide 6: Business Model & GTM */}
      <section className="min-h-screen flex items-center justify-center p-8 border-b">
        <div className="max-w-7xl mx-auto w-full">
          <BusinessModelGTMSlide slide={{ title: 'Business Model & GTM', subtitle: 'How We Make Money & Reach Customers', icon: DollarSign }} />
        </div>
      </section>

      {/* Slide 7: Strategic Partnerships */}
      <section className="min-h-screen flex items-center justify-center p-8 border-b">
        <div className="max-w-7xl mx-auto w-full">
          <PartnershipsSlide />
        </div>
      </section>

      {/* Slide 8: Competition */}
      <section className="min-h-screen flex items-center justify-center p-8 border-b">
        <div className="max-w-7xl mx-auto w-full">
          <CompetitionSlideV2 />
        </div>
      </section>

      {/* Slide 9: Competitive Moats */}
      <section className="min-h-screen flex items-center justify-center p-8 border-b">
        <div className="max-w-7xl mx-auto w-full">
          <CompetitiveMoatsSlide />
        </div>
      </section>

      {/* Slide 10: Financial Overview */}
      <section className="min-h-screen flex items-center justify-center p-8 border-b">
        <div className="max-w-7xl mx-auto w-full">
          <FinancialOverviewSlide slide={{ title: 'Financial Overview', subtitle: 'Investments, Projections & Path to Profitability', icon: TrendingUp }} />
        </div>
      </section>

      {/* Slide 11: Use of Proceeds */}
      <section className="min-h-screen flex items-center justify-center p-8 border-b">
        <div className="max-w-7xl mx-auto w-full">
          <UseOfProceedsSlide slide={{ title: 'Use of Proceeds', subtitle: 'Strategic Allocation Across Phases', icon: Target }} />
        </div>
      </section>

      {/* Slide 12: Funding Request */}
      <section className="min-h-screen flex items-center justify-center p-8 border-b">
        <div className="max-w-7xl mx-auto w-full">
          <FundingRequestSlide slide={{ title: 'Funding Request', subtitle: 'Pre-Seed Round Details', icon: DollarSign }} />
        </div>
      </section>

      {/* Slide 13: Contact */}
      <section className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-7xl mx-auto w-full">
          <ContactSlide slide={{ title: 'Let\'s Connect', subtitle: 'Ready to revolutionize fintech distribution', icon: Users }} />
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
