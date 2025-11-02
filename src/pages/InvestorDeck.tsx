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
          <Badge className="px-4 py-1 mb-2">Investor Summary • January 2025</Badge>
          <h1 className="text-4xl font-bold">DiscvrAI</h1>
          <h2 className="text-2xl font-semibold text-primary">
            The AI-Powered Discovery & Research Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building India's Agentic Financial Intelligence Platform - Profitably, From Day One
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
                $50B+ market gap. No platform enables agentic discovery and research at scale - profitably.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* THE SOLUTION */}
        <section className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl font-bold">THE SOLUTION</h2>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">AI-Powered Agentic Platform</h3>
              </div>
              
              <p className="text-sm">
                Conversational AI agents (text/voice) that combine quantitative analysis + qualitative insights. Same platform serves B2B enterprises (discovery intelligence, research tools) and B2C users (frictionless research).
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  'Conversational (text/voice)',
                  'Quantitative + Qualitative',
                  'Multi-modal interface',
                  'Scales B2B & B2C'
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
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
                  <h3 className="font-bold">B2B Strategy</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Enterprises pay ₹100K-₹600K/month</li>
                  <li>• 60-70% margins</li>
                  <li>• Funds platform build (non-dilutive)</li>
                  <li>• 75%+ revenue Year 1</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  <h3 className="font-bold">Platform Flywheel</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• B2C creates discovery data</li>
                  <li>• Makes B2B more valuable</li>
                  <li>• B2B margins fund B2C</li>
                  <li>• Network effects compound</li>
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
                  <li>• AI agentic platform</li>
                  <li>• Discovery data moat</li>
                  <li>• Dual analysis capability</li>
                  <li>• Financial discipline</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* THE NUMBERS */}
        <section className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl font-bold">THE NUMBERS</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <Card className="bg-primary/5">
              <CardContent className="p-4 text-center space-y-1">
                <TrendingUp className="w-6 h-6 text-primary mx-auto" />
                <div className="text-2xl font-bold">Month 13</div>
                <div className="text-sm text-muted-foreground">Break-even (Nov-26)</div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardContent className="p-4 text-center space-y-1">
                <BarChart3 className="w-6 h-6 text-primary mx-auto" />
                <div className="text-2xl font-bold">37%</div>
                <div className="text-sm text-muted-foreground">Profit margins</div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardContent className="p-4 text-center space-y-1">
                <Users className="w-6 h-6 text-primary mx-auto" />
                <div className="text-2xl font-bold">526x</div>
                <div className="text-sm text-muted-foreground">User growth (30 mo)</div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardContent className="p-4 text-center space-y-1">
                <Rocket className="w-6 h-6 text-primary mx-auto" />
                <div className="text-2xl font-bold">₹0.5</div>
                <div className="text-sm text-muted-foreground">Cost/MAU (10x better)</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-5">
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="font-bold mb-2">Unit Economics</div>
                  <div className="space-y-1 text-muted-foreground">
                    <div>• LTV:CAC → 10:1</div>
                    <div>• CAC payback → &lt;6 months</div>
                    <div>• B2B renewal → 90%+</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-2">Growth Trajectory</div>
                  <div className="space-y-1 text-muted-foreground">
                    <div>• Launch: 50K MAUs</div>
                    <div>• Month 13: 1.4M MAUs</div>
                    <div>• Year 2.5: 26.3M MAUs</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-2">Revenue Mix</div>
                  <div className="space-y-1 text-muted-foreground">
                    <div>• Year 1 → 75% B2B</div>
                    <div>• Year 2 → 40% B2B</div>
                    <div>• Year 2.5 → 26% B2B</div>
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
                    Financial institutions need retail discovery intelligence. Retail investors need agentic research. $50B+ gap.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Badge className="h-5 px-2 text-xs">Solution</Badge>
                  <p className="flex-1 text-muted-foreground">
                    AI-powered agentic platform (text/voice) combining quantitative + qualitative analysis for B2B & B2C.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Badge className="h-5 px-2 text-xs">Strategy</Badge>
                  <p className="flex-1 text-muted-foreground">
                    B2B-first validates early, funds build. B2C scale creates discovery data that makes B2B more valuable.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Badge className="h-5 px-2 text-xs">Moats</Badge>
                  <p className="flex-1 text-muted-foreground">
                    AI agentic capability, discovery data, dual analysis, network effects, financial discipline.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Badge className="h-5 px-2 text-xs">Proof</Badge>
                  <p className="flex-1 text-muted-foreground">
                    Month 13 profitability, 37% margins, 526x growth, ₹100K-₹600K/month B2B contracts.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t text-center">
                <p className="text-lg font-bold mb-3">
                  An AI agentic platform that enterprises pay premium for, retail users rely on, and scales profitably from Day 13.
                </p>
                <p className="text-sm font-semibold text-primary">
                  Join us in building India's first profitable fintech unicorn.
                </p>
              </div>

              <div className="text-center text-xs text-muted-foreground pt-3 border-t">
                Last Updated: January 2025 | Projections based on detailed 30-month PnL model
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
};

export default InvestorDeck;