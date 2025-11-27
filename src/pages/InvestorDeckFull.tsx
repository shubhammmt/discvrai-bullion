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
                Ex-CTO, HT Digital (scaled to 100M+ MAU)
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-base font-medium">
                Ex-MakeMyTrip (NoSQL, search pioneer, 1M QPS)
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
              <p className="text-4xl font-bold text-primary">₹1.54L Cr / $17B</p>
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
                  <p className="text-lg text-primary font-medium mb-2">Founder & CEO, Discvr.ai | 2nd-Time Founder</p>
                  <p className="text-muted-foreground mb-3">
                    Ex-CTO, Eureka Forbes | Ex-CTO, Hindustan Times (scaled to 100M+ MAUs) | Ex-MakeMyTrip (NoSQL, search pioneer, 1M QPS) | Founder, Tekch (PropTech SaaS) | B.Tech, IIT(ISM) Dhanbad
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• 20+ years building and scaling large-scale digital platforms across fintech, media, and consumer tech</p>
                    <p>• Founded Discvr.ai to simplify financial decision-making through AI-powered product discovery and intelligence</p>
                    <p>• Led tech and product at Eureka Forbes (1M+ MAUs), HT Digital (scaled to 100M+ MAUs), and MakeMyTrip (NoSQL, search pioneer, 1M QPS - global scale systems)</p>
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

      {/* Slide 5: Product/Service */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white p-8 border-b">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-foreground mb-4">Product Demo & Screens</h2>
          <p className="text-2xl text-muted-foreground mt-8">Live demo at the time of pitch</p>
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

      {/* Slide 13: B2B Proposition + TAM/SAM/SOM */}
      <section className="min-h-screen flex items-center justify-center p-8 border-b">
        <div className="max-w-7xl mx-auto w-full space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-foreground">AI-Enabled Wealth & Investment Transformation for BFSI (B2B)</h2>
            <p className="text-xl text-muted-foreground">Enterprise platform for banks, NBFCs, brokers, AMCs, and PMS</p>
          </div>

          {/* B2B Proposition */}
          <Card className="p-8 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">Our B2B Proposition</h3>
              <div className="grid gap-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p><span className="font-semibold text-foreground">Agentic Discovery → Advisory → Execution Platform</span> for banks, NBFCs, brokers, AMCs, PMS.</p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p><span className="font-semibold text-foreground">Plug-and-Play AI Agents</span> to automate product discovery, suitability, research, portfolio analytics and RM workflows.</p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p><span className="font-semibold text-foreground">Modular Deployment</span> (API + white-label UI) with compliance guardrails.</p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p><span className="font-semibold text-foreground">Multi-budget Capture:</span> wealth + advisory + analytics + customer intelligence.</p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p><span className="font-semibold text-foreground">Reduces cost-to-serve,</span> improves investor conversions and multiplies RM productivity.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Target Market */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">Target Market (India, 2025)</h3>
                <p className="text-muted-foreground">AI-enabled wealth/advisory transformation across BFSI</p>
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="font-medium">Banks</span>
                    <span className="text-muted-foreground">₹1,600–₹3,200 Cr</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="font-medium">NBFCs</span>
                    <span className="text-muted-foreground">₹400–₹1,200 Cr</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="font-medium">Brokerages</span>
                    <span className="text-muted-foreground">₹800–₹2,400 Cr</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="font-medium">AMCs / PMS / AIFs</span>
                    <span className="text-muted-foreground">₹300–₹800 Cr</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-primary/5 px-4 rounded-lg mt-4">
                    <span className="font-bold">TAM Range</span>
                    <span className="font-bold text-primary">₹3,100–₹7,600 Cr</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 space-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-primary">Market Sizing</h3>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm font-semibold text-muted-foreground mb-2">TAM (India)</p>
                      <p className="text-3xl font-bold text-foreground">₹3,000–₹7,500 Cr</p>
                      <p className="text-lg text-muted-foreground">~$0.5–0.9B USD</p>
                      <p className="text-sm text-muted-foreground mt-2">Growing 22–30% CAGR → 5× expansion in 10 years</p>
                    </div>

                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm font-semibold text-muted-foreground mb-2">Our SAM (3–5 Years)</p>
                      <p className="text-2xl font-bold text-foreground">₹1,600–₹2,400 Cr</p>
                      <p className="text-sm text-muted-foreground mt-2">Mid-large BFSI institutions with active wealth/advisory transformation budgets</p>
                    </div>

                    <div className="p-4 bg-accent/50 rounded-lg">
                      <p className="text-sm font-semibold text-muted-foreground mb-2">Our SOM (24–36 Months)</p>
                      <p className="text-2xl font-bold text-foreground">₹20–₹40 Cr ARR</p>
                      <p className="text-sm text-muted-foreground mt-2">25–40 B2B clients × ₹35–90L ACV achievable in 2.5–3 years</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Summary */}
          <Card className="p-6 bg-primary/5">
            <div className="space-y-2">
              <p className="text-lg"><span className="font-bold text-foreground">B2B Proposition:</span> <span className="text-muted-foreground">AI agentic platform enabling BFSI to automate discovery, advisory, research & execution workflows. Modular, compliant, multi-budget capture.</span></p>
              <p className="text-lg"><span className="font-bold text-foreground">TAM:</span> <span className="text-muted-foreground">₹3,000–7,500 Cr ($0.5–0.9B). Growing 22–30% CAGR → 5× by 2035.</span></p>
              <p className="text-lg"><span className="font-bold text-foreground">SAM:</span> <span className="text-muted-foreground">₹1,600–2,400 Cr over 3–5 years.</span></p>
              <p className="text-lg"><span className="font-bold text-foreground">SOM:</span> <span className="text-muted-foreground">₹20–40 Cr ARR achievable in 24–36 months.</span></p>
            </div>
          </Card>
        </div>
      </section>

      {/* Slide 14: B2B Revenue & Profitability Projections */}
      <section className="min-h-screen flex items-center justify-center p-8 border-b">
        <div className="max-w-7xl mx-auto w-full space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-foreground">Revenue & Profitability Outlook</h2>
            <p className="text-xl text-muted-foreground">5-Year B2B Financial Projections (₹ Crore)</p>
          </div>

          {/* Financial Table */}
          <Card className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-4 px-4 font-bold text-foreground">Metric (₹ Cr)</th>
                    <th className="text-right py-4 px-4 font-bold text-foreground">Y1</th>
                    <th className="text-right py-4 px-4 font-bold text-foreground">Y2</th>
                    <th className="text-right py-4 px-4 font-bold text-foreground">Y3</th>
                    <th className="text-right py-4 px-4 font-bold text-foreground">Y4</th>
                    <th className="text-right py-4 px-4 font-bold text-foreground">Y5</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border bg-primary/5">
                    <td className="py-4 px-4 font-semibold">Revenue</td>
                    <td className="text-right py-4 px-4 font-semibold text-primary">2.6</td>
                    <td className="text-right py-4 px-4 font-semibold text-primary">15.3</td>
                    <td className="text-right py-4 px-4 font-semibold text-primary">45.6</td>
                    <td className="text-right py-4 px-4 font-semibold text-primary">84.0</td>
                    <td className="text-right py-4 px-4 font-semibold text-primary">162.3</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">Salary</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">3.0</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">7.0</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">14.0</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">23.0</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">41.0</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">Infrastructure</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">0.3</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">0.3</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">0.4</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">0.4</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">0.5</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">Marketing</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">0.3</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">0.3</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">0.4</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">0.4</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">0.5</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">COGS</td>
                    <td className="text-right py-3 px-4">3.0</td>
                    <td className="text-right py-3 px-4">7.0</td>
                    <td className="text-right py-3 px-4">14.0</td>
                    <td className="text-right py-3 px-4">24.0</td>
                    <td className="text-right py-3 px-4">41.0</td>
                  </tr>
                  <tr className="border-b border-border bg-secondary/30">
                    <td className="py-4 px-4 font-semibold">Gross Profit</td>
                    <td className="text-right py-4 px-4 font-semibold">-0.8</td>
                    <td className="text-right py-4 px-4 font-semibold">8.4</td>
                    <td className="text-right py-4 px-4 font-semibold">31.6</td>
                    <td className="text-right py-4 px-4 font-semibold">60.4</td>
                    <td className="text-right py-4 px-4 font-semibold">120.9</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">Gross Margin %</td>
                    <td className="text-right py-3 px-4 text-destructive">-31.4%</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">54.9%</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">69.2%</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">71.9%</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">74.5%</td>
                  </tr>
                  <tr className="border-b border-border bg-accent/30">
                    <td className="py-4 px-4 font-semibold">EBITDA</td>
                    <td className="text-right py-4 px-4 font-semibold">-1.1</td>
                    <td className="text-right py-4 px-4 font-semibold">8.1</td>
                    <td className="text-right py-4 px-4 font-semibold">31.2</td>
                    <td className="text-right py-4 px-4 font-semibold">60.0</td>
                    <td className="text-right py-4 px-4 font-semibold">120.4</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-muted-foreground">EBITDA Margin %</td>
                    <td className="text-right py-3 px-4 text-destructive">-41.2%</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">52.9%</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">68.4%</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">71.4%</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">74.2%</td>
                  </tr>
                  <tr className="border-b border-border bg-primary/10">
                    <td className="py-4 px-4 font-bold">Net Profit</td>
                    <td className="text-right py-4 px-4 font-bold">-1.1</td>
                    <td className="text-right py-4 px-4 font-bold text-primary">8.1</td>
                    <td className="text-right py-4 px-4 font-bold text-primary">31.2</td>
                    <td className="text-right py-4 px-4 font-bold text-primary">60.0</td>
                    <td className="text-right py-4 px-4 font-bold text-primary">120.4</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">Net Profit Margin %</td>
                    <td className="text-right py-3 px-4 text-destructive">-41.2%</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">52.9%</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">68.4%</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">71.4%</td>
                    <td className="text-right py-3 px-4 text-muted-foreground">74.2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Key Highlights */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 space-y-2 bg-card/50">
              <TrendingUp className="w-8 h-8 text-primary mb-2" />
              <p className="text-sm font-semibold text-muted-foreground">Rapid Scale</p>
              <p className="text-2xl font-bold text-foreground">₹2.6 → ₹162 Cr</p>
              <p className="text-xs text-muted-foreground">Revenue growth in 5 years</p>
            </Card>
            <Card className="p-6 space-y-2 bg-card/50">
              <Target className="w-8 h-8 text-primary mb-2" />
              <p className="text-sm font-semibold text-muted-foreground">Margin Expansion</p>
              <p className="text-2xl font-bold text-foreground">-31% → 74%</p>
              <p className="text-xs text-muted-foreground">Gross margin improvement</p>
            </Card>
            <Card className="p-6 space-y-2 bg-card/50">
              <DollarSign className="w-8 h-8 text-primary mb-2" />
              <p className="text-sm font-semibold text-muted-foreground">Operating Leverage</p>
              <p className="text-2xl font-bold text-foreground">-41% → 74%</p>
              <p className="text-xs text-muted-foreground">EBITDA margin growth</p>
            </Card>
            <Card className="p-6 space-y-2 bg-card/50">
              <TrendingUp className="w-8 h-8 text-primary mb-2" />
              <p className="text-sm font-semibold text-muted-foreground">Profitability</p>
              <p className="text-2xl font-bold text-foreground">Year 2+</p>
              <p className="text-xs text-muted-foreground">Break-even & aggressive growth</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Slide 15: Contact */}
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
