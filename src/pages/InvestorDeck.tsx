import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Brain, 
  Target, 
  Shield, 
  DollarSign,
  BarChart3,
  Lock,
  Rocket,
  CheckCircle2
} from 'lucide-react';

const InvestorDeck = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Print-optimized container - Condensed 1-2 page version */}
      <div className="max-w-4xl mx-auto px-8 py-8 space-y-8">
        
        {/* COVER */}
        <section className="text-center space-y-3 py-6">
          <Badge className="px-4 py-1 mb-2">Investor Summary • November 2025</Badge>
          <h1 className="text-4xl font-bold">DiscvrAI</h1>
          <h2 className="text-2xl font-semibold text-primary">
            Content-Led Financial Distribution Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Solving the $50B CAC crisis through AI-powered content & intelligent product discovery
          </p>
          <p className="text-sm text-muted-foreground">
            India First → Global Next
          </p>
        </section>

        {/* THE OPPORTUNITY */}
        <section className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl font-bold">THE OPPORTUNITY</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">Financial Institutions (B2B)</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Need retail discovery intelligence - what investors search for, how they find products, sentiment analysis - that Bloomberg/Morningstar can't provide. Missing the pulse of 150M+ retail investors.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">Retail Investors (B2C)</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Need intelligent, conversational research - ask questions naturally (text/voice), get quantitative + qualitative analysis, intelligent synthesis. Discovery friction costs billions in poor decisions.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary">
            <CardContent className="p-5 text-center">
              <p className="font-semibold">
                $50B+ CAC crisis globally. Financial brands spend 10-15% of AUM on acquisition. No scalable, profitable solution exists.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* THE SOLUTION */}
        <section className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl font-bold">THE SOLUTION: CONTENT-LED DISTRIBUTION</h2>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">AI-Powered Content Engine → Product Conversion Funnel</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="border-l-2 border-primary pl-3">
                  <p className="font-semibold">Step 1: Mass Distribution (Low CAC)</p>
                  <p className="text-muted-foreground">
                    <strong>180 articles/day</strong> (scaling to 500+) across text, video, interactive formats. AI-generated, high-quality content on news, stocks, mutual funds, crypto, precious metals.
                  </p>
                </div>
                
                <div className="border-l-2 border-primary pl-3">
                  <p className="font-semibold">Step 2: Engagement & Habit Building</p>
                  <p className="text-muted-foreground">
                    Polls, quizzes, personalized feeds keep users engaged (2+ min avg). Build daily financial information habit.
                  </p>
                </div>
                
                <div className="border-l-2 border-primary pl-3">
                  <p className="font-semibold">Step 3: Intelligent Product Conversion</p>
                  <p className="text-muted-foreground">
                    Feed → Ecommerce funnel. Convert engaged users to financial products: mutual funds, loans, digital gold/silver, insurance.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t">
                <p className="text-sm font-semibold text-primary">
                  Result: Organic lead acquisition at near-zero CAC → high-margin product conversions
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* WHY IT WORKS */}
        <section className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl font-bold">WHY IT WORKS</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-primary" />
                  <h3 className="font-bold">Content = Distribution</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 180 → 500+ articles/day (AI-powered)</li>
                  <li>• Near-zero CAC organic acquisition</li>
                  <li>• Proven at HT: 100M+ users/month</li>
                  <li>• Habit building → conversion ready</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  <h3 className="font-bold">Dual Revenue Engine</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• B2B SaaS: Discovery intelligence tools</li>
                  <li>• B2C: Product commissions (MF, loans, gold)</li>
                  <li>• Platform flywheel amplifies both</li>
                  <li>• 60-70% B2B margins fund growth</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Lock className="w-6 h-6 text-primary" />
                  <h3 className="font-bold">Moats</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Content velocity (500+ articles/day)</li>
                  <li>• Discovery data moat (user behavior)</li>
                  <li>• Founder's proven distribution expertise</li>
                  <li>• Network effects compound</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* B2C TRACTION - PROOF OF DISTRIBUTION */}
        <section className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl font-bold">B2C TRACTION - PROOF OF DISTRIBUTION</h2>
            <p className="text-sm text-muted-foreground mt-1">6 months, organic growth only</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-primary/5">
              <CardContent className="p-4 text-center space-y-1">
                <Users className="w-6 h-6 text-primary mx-auto" />
                <div className="text-2xl font-bold">50K MAUs</div>
                <div className="text-sm text-muted-foreground">Monthly Active Users</div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardContent className="p-4 text-center space-y-1">
                <TrendingUp className="w-6 h-6 text-primary mx-auto" />
                <div className="text-2xl font-bold">11K → 25K</div>
                <div className="text-sm text-muted-foreground">sessions (Sep-Nov)</div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardContent className="p-4 text-center space-y-1">
                <BarChart3 className="w-6 h-6 text-primary mx-auto" />
                <div className="text-2xl font-bold">2+ min</div>
                <div className="text-sm text-muted-foreground">Avg engagement time</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-5 space-y-3">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-bold mb-2">Global Reach</div>
                  <p className="text-muted-foreground">Users from 15+ countries including US, UK, Singapore - validating international demand</p>
                </div>
                <div>
                  <div className="font-bold mb-2">Organic Only</div>
                  <p className="text-muted-foreground">Zero paid acquisition. Proves low-CAC distribution model works at scale</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary">
            <CardContent className="p-4 text-center">
              <p className="font-semibold text-sm">
                <strong>Key Insight:</strong> B2C traction proves we can acquire users cheaply. B2B monetizes this distribution engine.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* WHY INDIA FIRST, GLOBAL NEXT */}
        <section className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl font-bold">WHY INDIA FIRST, GLOBAL NEXT</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-5 space-y-2">
                <h3 className="font-bold">India: High-Growth Proving Ground</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 150M+ retail investors, 20%+ YoY growth</li>
                  <li>• Highest CAC sensitivity = best place to prove low-CAC model</li>
                  <li>• Content consumption in local languages scales reach</li>
                  <li>• Unit economics proven here = blueprint for global</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 space-y-2">
                <h3 className="font-bold">US/Global: Expansion Ready</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Same $50B CAC problem globally (10-15% AUM)</li>
                  <li>• Early validation: Users from US, UK, Singapore</li>
                  <li>• India playbook = US market entry blueprint</li>
                  <li>• <strong>$500K-$1M funding = product polish + US prep</strong></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FOUNDER - BUILT TO SOLVE THIS */}
        <section className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl font-bold">FOUNDER - BUILT TO SOLVE THIS</h2>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-1">Shubham Srivastava - 2nd Time Founder</h3>
                <p className="text-sm font-semibold text-primary">Proven Track Record: Built & Scaled Content Distribution to 100M+ Users</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="border-l-2 border-primary/50 pl-3">
                  <div className="font-semibold">iTrust - Engineering Lead (2008-2011)</div>
                  <p className="text-muted-foreground"><strong>Fintech foundation:</strong> Built multiple fintech products. Acquired by Karvy.</p>
                </div>

                <div className="border-l-2 border-primary/50 pl-3">
                  <div className="font-semibold">MakeMyTrip Hotels - Engineering Lead (2011-2015)</div>
                  <p className="text-muted-foreground"><strong>B2C conversion funnels:</strong> Built e-commerce platform handling <strong>millions of transactions</strong>. Designed ML-based product recommendation engine.</p>
                </div>

                <div className="border-l-2 border-primary/50 pl-3">
                  <div className="font-semibold">Tekch - Founder (2015-2019)</div>
                  <p className="text-muted-foreground"><strong>1st startup:</strong> Built AI & IoT <strong>B2B SaaS</strong>, scaled to <strong>10M+ sq. ft.</strong> Learned: distribution-first + sustainable unit economics.</p>
                </div>

                <div className="border-l-2 border-primary pl-3 bg-primary/5 p-3">
                  <div className="font-semibold">HT Digital - CTO (2019-2022) ⭐ KEY PROOF POINT</div>
                  <p className="text-muted-foreground">
                    <strong>Exactly this playbook at scale:</strong> Built content distribution platform serving <strong>100M+ users/month</strong> while achieving profitability. 
                    Scaled infrastructure for <strong>100s of publishers</strong> with AI-powered content recommendation from Day 1.
                  </p>
                  <p className="text-primary font-semibold mt-2">
                    → Same model, applied to financial products distribution
                  </p>
                </div>

                <div className="border-l-2 border-primary/50 pl-3">
                  <div className="font-semibold">Eureka Forbes - CPTO/CIO (2022-2024)</div>
                  <p className="text-muted-foreground"><strong>D2C platform:</strong> Led platform with <strong>1M+ monthly users</strong>. Optimized costs 20% YoY while driving AI innovation.</p>
                </div>
              </div>

              <div className="pt-3 border-t">
                <p className="text-sm font-semibold text-primary">
                  Why This Matters: Already executed this exact playbook - content-led distribution at 100M+ scale (HT Digital). Now applying proven model to financial products where margins are 10x higher.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="space-y-2">
                <h3 className="font-bold">Current Cap Table</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shubham Srivastava</span>
                    <span className="font-semibold">50%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Smriti Srivastava</span>
                    <span className="font-semibold">50%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* THE NUMBERS */}
        <section className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl font-bold">THE NUMBERS</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-primary/5">
              <CardContent className="p-4 text-center space-y-1">
                <TrendingUp className="w-6 h-6 text-primary mx-auto" />
                <div className="text-2xl font-bold">12-18 months</div>
                <div className="text-sm text-muted-foreground">Path to profitability</div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardContent className="p-4 text-center space-y-1">
                <BarChart3 className="w-6 h-6 text-primary mx-auto" />
                <div className="text-2xl font-bold">60-70%</div>
                <div className="text-sm text-muted-foreground">B2B gross margins</div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardContent className="p-4 text-center space-y-1">
                <Rocket className="w-6 h-6 text-primary mx-auto" />
                <div className="text-2xl font-bold">10:1</div>
                <div className="text-sm text-muted-foreground">LTV:CAC ratio</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-5">
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <div className="font-bold mb-2">Unit Economics</div>
                  <div className="space-y-1 text-muted-foreground">
                    <div>• CAC payback &lt; 6 months</div>
                    <div>• B2B contracts: ₹100K-₹600K/month</div>
                    <div>• High retention rates (90%+)</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-2">Revenue Strategy</div>
                  <div className="space-y-1 text-muted-foreground">
                    <div>• B2B-led growth (Year 1)</div>
                    <div>• Platform flywheel effect</div>
                    <div>• Diversified revenue streams</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* THE ASK & BOTTOM LINE */}
        <section className="space-y-4 pb-8 print:break-before-page">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary">
            <CardContent className="p-6 space-y-5">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">THE ASK</h2>
                <div className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg">
                  <p className="text-2xl font-bold">Raising $500K - $1M USD</p>
                </div>
              </div>

              <div className="text-center pt-2">
                <h3 className="text-xl font-bold mb-3">THE BOTTOM LINE</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <Badge className="h-5 px-2 text-xs">Problem</Badge>
                  <p className="flex-1 text-muted-foreground">
                    Financial brands globally spend 10-15% of AUM on customer acquisition. $50B+ wasted annually.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Badge className="h-5 px-2 text-xs">Solution</Badge>
                  <p className="flex-1 text-muted-foreground">
                    Content-led distribution platform. 180 → 500+ AI articles/day → engagement/habit → product conversion funnel.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Badge className="h-5 px-2 text-xs">Proof</Badge>
                  <p className="flex-1 text-muted-foreground">
                    Founder already executed at 100M+ scale (HT Digital). 50K MAUs in 6 months organic. 15+ countries validated.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Badge className="h-5 px-2 text-xs">Strategy</Badge>
                  <p className="flex-1 text-muted-foreground">
                    India first (high-growth, CAC sensitivity) → prove unit economics → US/global expansion with funding.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Badge className="h-5 px-2 text-xs">Moats</Badge>
                  <p className="flex-1 text-muted-foreground">
                    Content velocity (500+ articles/day), discovery data, proven founder, network effects, dual revenue (B2B + B2C).
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t text-center">
                <p className="text-sm font-semibold text-primary">
                  Join us in solving the $50B CAC crisis - India first, global next.
                </p>
              </div>

              <div className="text-center text-xs text-muted-foreground pt-3 border-t space-y-1">
                <p>Last Updated: November 2025 | Projections based on detailed 30-month PnL model</p>
                <p className="font-medium text-foreground">Shubham Srivastava | Shubham@discvr.ai | +91-9873961591</p>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
};

export default InvestorDeck;