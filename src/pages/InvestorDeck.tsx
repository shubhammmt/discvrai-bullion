import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Brain, 
  Target, 
  Shield, 
  Zap,
  DollarSign,
  BarChart3,
  Lock,
  Rocket,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const InvestorDeck = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Print-optimized container */}
      <div className="max-w-5xl mx-auto px-8 py-12 space-y-16">
        
        {/* COVER */}
        <section className="text-center space-y-6 py-12">
          <Badge className="text-lg px-6 py-2 mb-4">Investor Deck • January 2025</Badge>
          <h1 className="text-5xl font-bold mb-4">DiscvrAI</h1>
          <h2 className="text-3xl font-semibold text-primary mb-6">
            The AI-Powered Discovery & Research Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Building India's Agentic Financial Intelligence Platform - Profitably, From Day One
          </p>
        </section>

        {/* THE PROBLEM */}
        <section className="space-y-8 print:break-before-page">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl font-bold mb-2">THE PROBLEM</h2>
            <p className="text-xl text-muted-foreground">Discovery and Research at Scale</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">For Financial Institutions (B2B)</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <span><strong>Discovery Challenge:</strong> How do retail investors find your products? What are they searching for?</span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <span><strong>Research Gap:</strong> Enterprise tools (Bloomberg, Morningstar) don't capture retail sentiment - missing the pulse of 150M+ retail investors</span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <span><strong>Qualitative + Quantitative Void:</strong> Need both number-crunching AND understanding of retail behavior/psychology</span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <span><strong>Inefficient Distribution:</strong> Spending millions to reach retail investors through fragmented channels</span>
                  </li>
                </ul>
                <p className="text-lg font-semibold pt-4 border-t">Result: Institutions make products without understanding what retail actually wants</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">For Retail Investors (B2C)</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <span><strong>Discovery Problem:</strong> How do I find the right investment? Where do I start?</span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <span><strong>Research Overload:</strong> Too much information, no intelligent synthesis</span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <span><strong>No Conversational Interface:</strong> Can't ask questions naturally (text/voice) and get answers</span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <span><strong>Missing Analysis:</strong> Need both quantitative (numbers, charts) AND qualitative (why, context, sentiment)</span>
                  </li>
                </ul>
                <p className="text-lg font-semibold pt-4 border-t">Result: Retail investors make poor decisions due to discovery and analysis friction</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary">
            <CardContent className="p-8 text-center">
              <p className="text-xl font-semibold">
                <strong>The Core Problem:</strong> Both sides struggle with discovery and research. Financial institutions need to understand retail discovery patterns. Retail investors need intelligent, conversational research. No platform enables agentic discovery and analysis at scale - profitably.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* THE SOLUTION */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl font-bold mb-2">THE SOLUTION</h2>
            <p className="text-xl text-muted-foreground">An AI-Powered Agentic Discovery & Research Platform</p>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-8 space-y-6">
              <p className="text-lg leading-relaxed">
                We're building a platform that enables intelligent discovery and research through conversational AI agents - serving both B2B enterprises and B2C users through the same powerful technology.
              </p>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Brain className="w-7 h-7 text-primary" />
                  The Platform Capability: AI-Powered Agentic Discovery & Research
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: 'Conversational Interface', desc: 'Text and voice interactions with AI agents' },
                    { label: 'Quantitative Analysis', desc: 'AI agents crunch numbers, analyze data, generate insights' },
                    { label: 'Qualitative Analysis', desc: 'AI agents understand context, sentiment, behavioral patterns' },
                    { label: 'Multi-Modal', desc: 'Works through text chat, voice, and visual interfaces' },
                    { label: 'Scalable', desc: 'Same platform serves enterprises (B2B) and retail users (B2C)' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 p-4 bg-background rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t">
                <h3 className="text-xl font-bold">How It Works:</h3>
                <ol className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">1.</span>
                    <span>User asks question (text or voice): "Should I invest in this mutual fund?"</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">2.</span>
                    <span>AI agent analyzes: Quantitative (performance, risk metrics) + Qualitative (market sentiment, retail behavior patterns)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">3.</span>
                    <span>Intelligent synthesis: Provides discovery insights AND research-backed recommendations</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">4.</span>
                    <span>Continuous learning: More interactions = better discovery patterns = better research</span>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* B2B VALUE PROPOSITION */}
        <section className="space-y-8 print:break-before-page">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl font-bold mb-2">THE B2B VALUE PROPOSITION</h2>
            <p className="text-xl text-muted-foreground">Enterprise Discovery & Research Intelligence</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Target className="w-7 h-7 text-primary" />
                  1. Retail Discovery Intelligence Platform
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Understand how retail discovers products: What keywords, patterns, questions lead to conversions?</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Sentiment Analysis: Real-time understanding of what retail investors are thinking/searching</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Discovery Funnels: See the path retail takes from discovery to investment decision</span>
                  </li>
                </ul>
                <p className="font-semibold pt-4 border-t">Result: Build products that retail actually wants, market where retail actually looks</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-primary" />
                  2. Agentic Research Platform (MF Research & Stock Research)
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>AI-powered research tools that understand both quantitative metrics AND qualitative retail sentiment</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Conversational research interface: Analysts can query through text/voice, get intelligent analysis</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Multi-dimensional insights: Combines traditional research with retail behavior data</span>
                  </li>
                </ul>
                <p className="font-semibold pt-4 border-t">Result: Better research that includes retail market pulse (something Bloomberg can't provide)</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Zap className="w-7 h-7 text-primary" />
                  3. Distribution & Engagement Platforms
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Contest Platform: Engage retail audiences through competitions, powered by discovery insights</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>News Distribution: Reach 26M+ users efficiently, track discovery and engagement</span>
                  </li>
                </ul>
                <p className="font-semibold pt-4 border-t">Result: Efficient distribution with measurable discovery-to-conversion tracking</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Why B2B Pays Premium (60-70% Margins):</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-2">
                  <DollarSign className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Unique Data</p>
                    <p className="text-sm text-muted-foreground">Retail discovery patterns that competitors can't provide</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Brain className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Actionable Intelligence</p>
                    <p className="text-sm text-muted-foreground">Not just data, but AI-powered insights they can act on</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Integrated Workflow</p>
                    <p className="text-sm text-muted-foreground">Fits into their existing research and distribution processes</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Measurable ROI</p>
                    <p className="text-sm text-muted-foreground">Clear discovery-to-conversion tracking</p>
                  </div>
                </div>
              </div>
              <p className="mt-6 pt-6 border-t font-semibold text-lg text-center">
                B2B Revenue Funds Platform Build: Enterprise contracts (₹100K-₹600K/month) provide non-dilutive capital to scale the platform.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* B2C VALUE PROPOSITION */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl font-bold mb-2">THE B2C VALUE PROPOSITION</h2>
            <p className="text-xl text-muted-foreground">Retail Discovery & Research Access</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Users className="w-7 h-7 text-primary" />
                  1. Conversational Discovery & Research
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Ask questions naturally (text or voice): "What mutual funds should I consider for retirement?"</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>AI agents provide answers: Quantitative analysis (performance metrics) + Qualitative insights (why this fits, market context)</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Discovery Assistance: AI helps users discover investments they didn't know about</span>
                  </li>
                </ul>
                <p className="font-semibold pt-4 border-t">Result: Frictionless discovery and research experience</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-primary" />
                  2. AI-Powered Content at Scale
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>410 articles/day covering markets comprehensively</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Personalized research: Content tailored to user queries and discovery patterns</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Multi-format: Text, voice, visual - how users want to consume</span>
                  </li>
                </ul>
                <p className="font-semibold pt-4 border-t">Result: High-quality research at scale (Bloomberg-quality, but accessible)</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Rocket className="w-7 h-7 text-primary" />
                  3. Platform Benefits
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Free access to core discovery and research capabilities</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Premium features available via subscription</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Lead generation: Get matched with relevant financial products when discovered</span>
                  </li>
                </ul>
                <p className="font-semibold pt-4 border-t">Result: Better investment decisions through intelligent discovery</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">B2C Creates Value for B2B:</h3>
              <div className="space-y-3">
                <p className="flex gap-2 text-muted-foreground">
                  <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>More B2C users → More discovery patterns → Better B2B intelligence</span>
                </p>
                <p className="flex gap-2 text-muted-foreground">
                  <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>User queries → Training data for AI agents → Better B2B research tools</span>
                </p>
                <p className="flex gap-2 text-muted-foreground">
                  <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Engagement data → Retail sentiment insights → More valuable B2B products</span>
                </p>
              </div>
              <p className="mt-6 pt-6 border-t font-bold text-lg text-center">
                The Flywheel: More B2C users = Better discovery data = More valuable B2B products = Higher B2B margins = Funds B2C growth = More users = Better data
              </p>
            </CardContent>
          </Card>
        </section>

        {/* STRATEGIC MOATS */}
        <section className="space-y-8 print:break-before-page">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl font-bold mb-2">WHY THIS IS DEFENSIBLE</h2>
            <p className="text-xl text-muted-foreground">Strategic Moats That Compound</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-8 space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-7 h-7 text-primary" />
                  <h3 className="text-xl font-bold">1. AI Agentic Platform Moat</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Conversational AI capability that combines quantitative and qualitative analysis</li>
                  <li>• Continuous learning: More interactions improve discovery patterns and research quality</li>
                  <li>• Integration depth: B2B clients integrate into workflows (high switching costs)</li>
                  <li className="font-semibold pt-2 text-foreground">This moat deepens with scale - More data = Better AI = More valuable platform</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-7 h-7 text-primary" />
                  <h3 className="text-xl font-bold">2. Discovery Data Moat</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Proprietary insights on how retail discovers investments (search patterns, queries, behavior)</li>
                  <li>• This discovery data directly improves B2B products - competitors can't access this</li>
                  <li>• Discovery patterns improve with scale - Early mover advantage compounds</li>
                  <li className="font-semibold pt-2 text-foreground">B2B clients become dependent on this unique discovery intelligence</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="w-7 h-7 text-primary" />
                  <h3 className="text-xl font-bold">3. Dual Analysis Capability</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Quantitative: AI agents analyze numbers, metrics, performance data</li>
                  <li>• Qualitative: AI agents understand sentiment, context, behavioral patterns</li>
                  <li>• Most platforms do one or the other - We do both, making us indispensable</li>
                  <li className="font-semibold pt-2 text-foreground">This creates high switching costs - Hard for competitors to replicate</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-7 h-7 text-primary" />
                  <h3 className="text-xl font-bold">4. Platform Network Effects</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• More B2C users → Better discovery patterns → More valuable B2B products</li>
                  <li>• More B2B clients → Higher margins (60-70%) → More capital for B2C growth</li>
                  <li>• More interactions → Better AI agents → Better discovery and research</li>
                  <li className="font-semibold pt-2 text-foreground">Self-reinforcing cycle that compounds value</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-7 h-7 text-primary" />
                  <h3 className="text-xl font-bold">5. Multi-Revenue Stream Defense</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• B2B: MF Research, Stock Research, Contests, News Distribution (primary in Year 1)</li>
                  <li>• B2C: Ads, leads, subscriptions (scales Year 2+)</li>
                  <li>• 7 monetization channels - If one slows, others accelerate</li>
                  <li className="font-semibold pt-2 text-foreground">Reduces execution risk - not dependent on single revenue stream</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-7 h-7 text-primary" />
                  <h3 className="text-xl font-bold">6. Financial Discipline Moat</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Profitable from Month 13 - break-even achieved early through B2B revenue</li>
                  <li>• Can outlast competitors who burn cash - especially critical in down markets</li>
                  <li>• 37% profit margins enable reinvestment while maintaining profitability</li>
                  <li className="font-semibold pt-2 text-foreground">Investors pay premium for profitable companies (15-20x vs. 10-15x multiples)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* KEY DATA POINTS */}
        <section className="space-y-8 print:break-before-page">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl font-bold mb-2">THE KEY DATA POINTS</h2>
            <p className="text-xl text-muted-foreground">Proof the Platform Works</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Platform Capability Metrics</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">AI Agent Interactions</span>
                    <span className="font-semibold">Growing query volume shows platform utility</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Discovery Pattern Intelligence</span>
                    <span className="font-semibold">B2B clients use insights for product development</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Research Quality</span>
                    <span className="font-semibold">B2B renewal rates (90%+) prove platform value</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Conversational Engagement</span>
                    <span className="font-semibold">Multi-modal interactions (text/voice) drive retention</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Unit Economics</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Cost per MAU</span>
                    <span className="font-semibold">₹0.5 (10x better than competitors)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Revenue per MAU</span>
                    <span className="font-semibold">₹1.65/month (blended B2B+B2C)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">B2B Revenue per Client</span>
                    <span className="font-semibold">₹100K-₹600K/month</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">CAC Payback</span>
                    <span className="font-semibold">&lt;6 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">LTV:CAC</span>
                    <span className="font-semibold">&gt;10:1</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Growth Efficiency</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Organic Growth (Year 3)</span>
                    <span className="font-semibold">77% (down from 90% paid at launch)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">AI-Powered Content</span>
                    <span className="font-semibold">410 articles/day drives discovery</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Platform Leverage</span>
                    <span className="font-semibold">Single platform serves B2B + B2C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Non-Dilutive Funding</span>
                    <span className="font-semibold">B2B margins fund B2C growth</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Platform Health Indicators</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">B2B Renewal Rates</span>
                    <span className="font-semibold">90%+ (high retention)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">B2B Margins</span>
                    <span className="font-semibold">60-70% (high-margin revenue)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Year 1 B2B Revenue</span>
                    <span className="font-semibold">75%+ (non-dilutive funding)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">B2C Subscription Churn</span>
                    <span className="font-semibold">10% (predictable recurring revenue)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Profitability Timeline</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">Month 13</div>
                  <p className="font-semibold">Break-Even Achieved (Nov-26)</p>
                  <p className="text-sm text-muted-foreground">Driven by B2B revenue</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">Month 13+</div>
                  <p className="font-semibold">Consistently Profitable</p>
                  <p className="text-sm text-muted-foreground">Every month after break-even</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">Year 2.5</div>
                  <p className="font-semibold">37% Profit Margins</p>
                  <p className="text-sm text-muted-foreground">While scaling 526x</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* TRAJECTORY */}
        <section className="space-y-8 print:break-before-page">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl font-bold mb-2">THE TRAJECTORY</h2>
            <p className="text-xl text-muted-foreground">Platform Evolution</p>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Growth Path</h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-background p-6 rounded-lg">
                    <Badge className="mb-3">Launch (Oct-25)</Badge>
                    <div className="space-y-2 text-sm">
                      <p><strong>MAUs:</strong> 50K</p>
                      <p><strong>Revenue:</strong> ₹0</p>
                      <p><strong>Status:</strong> B2B platform in development</p>
                    </div>
                  </div>
                  <div className="bg-background p-6 rounded-lg border-2 border-primary">
                    <Badge className="mb-3 bg-primary">Break-Even (Nov-26, Month 13)</Badge>
                    <div className="space-y-2 text-sm">
                      <p><strong>MAUs:</strong> 1.4M</p>
                      <p><strong>Revenue:</strong> ₹5.0M/month</p>
                      <p><strong>Profit:</strong> +₹1.4M</p>
                      <p><strong>B2B:</strong> 75%+ of revenue</p>
                    </div>
                  </div>
                  <div className="bg-background p-6 rounded-lg">
                    <Badge className="mb-3">Strong Foundation (Mar-28, Year 2.5)</Badge>
                    <div className="space-y-2 text-sm">
                      <p><strong>MAUs:</strong> 26.3M</p>
                      <p><strong>Revenue:</strong> ₹43.4M/month</p>
                      <p><strong>Profit:</strong> +₹16.4M</p>
                      <p><strong>Margin:</strong> 37%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="text-lg px-4 py-1">Phase 1</Badge>
                  <h3 className="text-2xl font-bold">B2B-First Platform Build (Year 1)</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold">Focus:</p>
                    <p className="text-muted-foreground">Build AI agentic discovery & research platform</p>
                  </div>
                  <div>
                    <p className="font-semibold">Monetization:</p>
                    <p className="text-muted-foreground">Enterprise clients (MF Research, Stock Research) pay ₹100K-₹250K/month</p>
                  </div>
                  <div>
                    <p className="font-semibold">Result:</p>
                    <p className="text-muted-foreground">75%+ revenue from B2B - funds entire platform development</p>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="font-semibold">Why This Works:</p>
                    <p className="text-muted-foreground">B2B validates platform value early, provides non-dilutive capital</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="text-lg px-4 py-1">Phase 2</Badge>
                  <h3 className="text-2xl font-bold">Platform Flywheel Begins (Year 2)</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold">Focus:</p>
                    <p className="text-muted-foreground">B2C scale + B2B expansion</p>
                  </div>
                  <div>
                    <p className="font-semibold">Monetization:</p>
                    <p className="text-muted-foreground">B2B scales to ₹400K/month per client, B2C (ads/leads/subs) ramps</p>
                  </div>
                  <div>
                    <p className="font-semibold">Result:</p>
                    <p className="text-muted-foreground">Break-even achieved, 40% B2B / 60% B2C revenue mix</p>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="font-semibold">Why This Works:</p>
                    <p className="text-muted-foreground">More B2C users = Better discovery data = More valuable B2B products</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="text-lg px-4 py-1">Phase 3</Badge>
                  <h3 className="text-2xl font-bold">Balanced Platform at Scale (Year 2.5+)</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold">Focus:</p>
                    <p className="text-muted-foreground">Platform optimization + expansion</p>
                  </div>
                  <div>
                    <p className="font-semibold">Monetization:</p>
                    <p className="text-muted-foreground">Mature mix - 26% B2B / 74% B2C</p>
                  </div>
                  <div>
                    <p className="font-semibold">Result:</p>
                    <p className="text-muted-foreground">37% margins, 526x user growth, clear path to unicorn</p>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="font-semibold">Why This Works:</p>
                    <p className="text-muted-foreground">Network effects compound, AI agents improve with scale, platform moat deepens</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">What This Trajectory Proves:</h3>
              <div className="space-y-2">
                <p className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>B2B validates platform early</strong> - Enterprises pay premium for discovery intelligence</span>
                </p>
                <p className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Early profitability</strong> - Break-even in Month 13 (unprecedented in fintech)</span>
                </p>
                <p className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Platform flywheel works</strong> - B2C scale enhances B2B value, B2B margins fund growth</span>
                </p>
                <p className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Clear path to unicorn</strong> - $1B+ valuation in 4-4.5 years, remaining profitable throughout</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* INVESTMENT THESIS */}
        <section className="space-y-8 print:break-before-page">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl font-bold mb-2">WHY INVESTORS ARE EXCITED</h2>
            <p className="text-xl text-muted-foreground">The Investment Thesis</p>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">The Opportunity</h3>
              <p className="text-lg leading-relaxed">
                India's financial institutions need retail discovery intelligence. Retail investors need agentic research. We're building the AI-powered platform that serves both - profitably.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Rocket className="w-6 h-6 text-primary" />
                  What Makes This Different
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>AI Agentic Platform</strong> - Conversational discovery & research (text/voice) that combines quantitative and qualitative analysis</li>
                  <li>• <strong>B2B-First Strategy</strong> - Enterprises validate platform value early, provide non-dilutive funding</li>
                  <li>• <strong>Platform Flywheel</strong> - B2C users create discovery data, making B2B products more valuable</li>
                  <li>• <strong>Profitable from Month 13</strong> - Break-even in Month 13, maintain margins while scaling</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  The Market
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>$50B+</strong> Indian fintech market growing 30% annually</li>
                  <li>• <strong>150M+</strong> retail investors entering market (doubled in 5 years)</li>
                  <li>• <strong>Perfect timing</strong> - Retail investing boom + AI maturity = platform opportunity</li>
                  <li>• <strong>Unserved market</strong> - No agentic discovery & research platform exists</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  The Moat
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>AI agentic platform</strong> - Conversational capability that improves with scale</li>
                  <li>• <strong>Discovery data moat</strong> - Proprietary retail discovery patterns</li>
                  <li>• <strong>Dual analysis</strong> - Quantitative + Qualitative in one platform</li>
                  <li>• <strong>Network effects</strong> - B2C enhances B2B, B2B funds B2C</li>
                  <li>• <strong>Financial discipline</strong> - Profitable early, stay profitable</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  The Execution
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Proven unit economics</strong> - ₹0.5 cost per MAU, 37% margins</li>
                  <li>• <strong>B2B validation</strong> - Enterprises paying ₹100K-₹600K/month</li>
                  <li>• <strong>Early profitability</strong> - Month 13 break-even</li>
                  <li>• <strong>Clear trajectory</strong> - 526x growth in 30 months, profitable throughout</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">The Ask</h3>
              <p className="text-lg leading-relaxed">
                Join us in building India's first profitable fintech unicorn. We're building an AI agentic discovery & research platform that enterprises pay premium for, and retail users rely on. We're not asking you to fund losses - we're asking you to accelerate a proven, profitable platform that's already working.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* BOTTOM LINE */}
        <section className="space-y-8 pb-16">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl font-bold mb-2">THE BOTTOM LINE</h2>
          </div>

          <Card className="bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary">
            <CardContent className="p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Problem</h3>
                <p className="text-muted-foreground">Financial institutions need retail discovery intelligence. Retail investors need agentic research. $50B+ market gap.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Solution</h3>
                <p className="text-muted-foreground">AI-powered agentic discovery & research platform - conversational (text/voice), combining quantitative and qualitative analysis, serving both B2B and B2C.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Strategy</h3>
                <p className="text-muted-foreground">B2B-first - enterprises validate and fund platform early, then B2C scale creates discovery data that makes B2B products more valuable.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Moat</h3>
                <p className="text-muted-foreground">AI agentic capability, discovery data moat, dual analysis, network effects, multi-revenue streams, financial discipline.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Proof</h3>
                <p className="text-muted-foreground">B2B clients paying ₹100K-₹600K/month, Month 13 profitability, 37% margins, 526x growth, clear path to $1B+ valuation while remaining profitable.</p>
              </div>

              <div className="pt-6 border-t text-center">
                <p className="text-xl font-bold">
                  This is the story investors have been waiting to hear: An AI agentic discovery & research platform that enterprises pay premium for, retail users rely on, and scales profitably from Month 13.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground pt-8">
            Last Updated: January 2025 | Projections based on detailed 30-month PnL model
          </div>
        </section>

      </div>
    </div>
  );
};

export default InvestorDeck;
