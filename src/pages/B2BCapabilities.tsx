import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Network, TrendingDown, Brain, Rocket, Target, Zap, Building2, Users, MessageSquare, Layers, CheckCircle } from 'lucide-react';

export const B2BCapabilities = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Slide 1: Title / Positioning */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-purple-500/10 p-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-8">
            <Network className="w-24 h-24 text-primary" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
            DiscvrAI
          </h1>
          <p className="text-3xl font-semibold text-foreground">
            Agentic AI for Wealth. From Discovery to Decision.
          </p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering financial institutions, distributors, and advisors with AI agents that think, act, and learn across discovery, research, and advisory.
          </p>
          <div className="flex justify-center gap-8 mt-12">
            {['Discovery', 'Research', 'Advisory', 'Execution'].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 2: The Problem */}
      <section className="min-h-screen flex items-center justify-center p-8 bg-background">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <TrendingDown className="w-16 h-16 mx-auto mb-4 text-destructive" />
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Wealth Platforms and Distributors Lack Intelligent, Real-Time Insight
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Fragmented data across fund houses, portfolios, and distribution networks',
              'Advisors spend 60–70% of time on manual research and reporting',
              'Lack of personalization in product recommendations',
              'Retail investors overwhelmed by choice, not guided by insight',
              'Existing analytics tools don\'t capture real retail discovery signals'
            ].map((pain, i) => (
              <Card key={i} className="border-destructive/20">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-foreground">{pain}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 3: The Solution */}
      <section className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <Brain className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-4xl font-bold text-foreground mb-4">
              The Agentic Intelligence Layer
            </h2>
            <p className="text-xl text-muted-foreground">A Plug-and-Play Agentic Stack for Wealth Platforms</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Discovery to Research with Agents', desc: 'Autonomous agents that surface insights on funds, themes, and portfolios' },
              { title: 'Conversational + API Integration', desc: 'Chat-based and white-labeled experiences for discovery-to-execution' },
              { title: 'Custom AI Advisory', desc: 'Build your own rule-based, AI-powered portfolio analytics and recommendations' },
              { title: '360° Client Intelligence', desc: 'Agents monitor portfolios and trigger nudges, rebalancing, or alerts' },
              { title: 'Cross-Asset Visibility', desc: 'Unified insights across mutual funds, stocks, and alternatives' },
              { title: 'Custom Workflow Builder', desc: 'No-code builder to design AI-driven research or engagement workflows' }
            ].map((capability, i) => (
              <Card key={i} className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2">{capability.title}</h3>
                  <p className="text-muted-foreground text-sm">{capability.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 4: What's Live Today */}
      <section className="min-h-screen flex items-center justify-center p-8 bg-background">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <Rocket className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-4xl font-bold text-foreground mb-4">
              The Ready Stack
            </h2>
            <p className="text-xl text-muted-foreground">Deployable in Days, Not Months</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Working conversational discovery engine (retail & B2B)',
              'API endpoints for product discovery, fund insights, and portfolio analytics',
              'Multi-asset tracking (MF, stocks, gold)',
              'Early enterprise pilots underway (Wealth Platforms / AMCs)',
              'Modular architecture for fast white-labeling'
            ].map((feature, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-foreground">{feature}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 5: Why It Matters */}
      <section className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <Target className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Unlocking Intelligence and Engagement Across the Value Chain
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { segment: 'For Institutions', impact: 'Real-time retail insight, portfolio trends, churn prediction', icon: Building2 },
              { segment: 'For Distributors', impact: 'Smarter product discovery and client personalization', icon: Network },
              { segment: 'For Advisors', impact: 'AI co-pilot for recommendations and client engagement', icon: Users },
              { segment: 'For Retail', impact: 'Transparent, contextual, conversational investing', icon: MessageSquare }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i} className="border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex gap-4 items-start">
                      <Icon className="w-8 h-8 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-2">{item.segment}</h3>
                        <p className="text-muted-foreground">{item.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Slide 6: Roadmap */}
      <section className="min-h-screen flex items-center justify-center p-8 bg-background">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <Layers className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Building the Custom AI Stack Enabler
            </h2>
            <p className="text-xl text-muted-foreground">From Platform to Intelligence Infrastructure</p>
          </div>
          <div className="space-y-6">
            {[
              { title: 'Agent Store', desc: 'Prebuilt agents for research, advisory, compliance, and support' },
              { title: 'Predictive Behavior Engine', desc: 'Anticipate investor actions (goal drift, redemption signals)' },
              { title: 'Integration Marketplace', desc: 'APIs with CRMs, RTAs, and execution systems (BSE Star, NSE NMF II)' },
              { title: 'Advisor Co-Pilot', desc: 'Contextual agent for personalized client engagement' }
            ].map((item, i) => (
              <Card key={i} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 7: Our Edge */}
      <section className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-primary/10 via-background to-purple-500/10">
        <div className="max-w-5xl mx-auto space-y-12 text-center">
          <div>
            <Zap className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-4xl font-bold text-foreground mb-8">
              What Sets DiscvrAI Apart
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              'Built for wealth ecosystem (not generic AI)',
              'Agentic, modular, API-first architecture',
              'Ready for both D2C and B2B scale'
            ].map((edge, i) => (
              <Card key={i} className="border-primary/20">
                <CardContent className="p-8">
                  <p className="text-lg font-medium text-foreground">{edge}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="pt-12">
            <p className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              "DiscvrAI — Where Data Thinks, and Wealth Acts."
            </p>
          </div>
          <div className="pt-8 space-y-2">
            <p className="text-lg font-medium text-foreground">Shubham Srivastava</p>
            <p className="text-muted-foreground">Shubham@discvr.ai</p>
            <p className="text-muted-foreground">+91-9873961591</p>
          </div>
        </div>
      </section>
    </div>
  );
};
