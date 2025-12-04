import React from 'react';
import { Brain, Layers, Users, Building2, Workflow, Shield, Zap, Target, ArrowRight, Globe, BarChart3, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AIFintechOnePager() {
  return (
    <div className="min-h-screen bg-background">
      {/* Print Button */}
      <div className="fixed top-4 right-4 print:hidden z-50">
        <Button onClick={() => window.print()} variant="default">
          Print / Save as PDF
        </Button>
      </div>

      {/* One Pager Content */}
      <div className="max-w-[1200px] mx-auto p-8 space-y-5 print:p-4 print:space-y-3">
        
        {/* Header */}
        <div className="text-center border-b pb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Brain className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold">Discvr.ai</h1>
          </div>
          <p className="text-xl font-semibold text-primary mb-1">AI-Native Financial Intelligence Platform</p>
          <p className="text-base text-muted-foreground">Discovery → Advisory → Execution | For BFSI, Consumers & Internal Workflows</p>
        </div>

        {/* Vision Statement */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 rounded-lg border border-primary/20">
          <p className="text-center text-sm">
            <span className="font-bold">Mission:</span> Leverage AI to transform how financial decisions are discovered, analyzed, and executed—serving 
            <span className="font-semibold text-primary"> BFSI institutions</span>, 
            <span className="font-semibold text-primary"> retail consumers</span>, and 
            <span className="font-semibold text-primary"> internal enterprise workflows</span>.
          </p>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-3 gap-4">
          
          {/* Column 1: B2B BFSI */}
          <Card className="border-2 border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-blue-900 dark:text-blue-100">B2B: BFSI Platform</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Banks, NBFCs, Brokers, AMCs, PMS, AIFs</p>
              
              <div className="space-y-2">
                <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                  <p className="font-semibold text-xs flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Agentic Discovery
                  </p>
                  <p className="text-xs text-muted-foreground">AI agents for product discovery, suitability analysis & recommendations</p>
                </div>
                
                <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                  <p className="font-semibold text-xs flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Advisory Automation
                  </p>
                  <p className="text-xs text-muted-foreground">Conversational AI for research, Q&A & portfolio analytics</p>
                </div>
                
                <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                  <p className="font-semibold text-xs flex items-center gap-1">
                    <Target className="w-3 h-3" /> Execution Layer
                  </p>
                  <p className="text-xs text-muted-foreground">End-to-end transaction enablement with compliance guardrails</p>
                </div>
                
                <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                  <p className="font-semibold text-xs flex items-center gap-1">
                    <Workflow className="w-3 h-3" /> RM Productivity
                  </p>
                  <p className="text-xs text-muted-foreground">Workflow automation for relationship managers & advisors</p>
                </div>
              </div>
              
              <div className="mt-3 pt-2 border-t border-blue-200 dark:border-blue-800">
                <p className="text-xs font-semibold text-blue-800 dark:text-blue-200">Deployment:</p>
                <p className="text-xs text-muted-foreground">API + White-label UI | Modular | Multi-language</p>
              </div>
            </CardContent>
          </Card>

          {/* Column 2: B2C Consumer */}
          <Card className="border-2 border-green-500/30 bg-green-50/30 dark:bg-green-950/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-bold text-green-900 dark:text-green-100">B2C: Consumer Platform</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-3">200M+ retail investors in India</p>
              
              <div className="space-y-2">
                <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                  <p className="font-semibold text-xs flex items-center gap-1">
                    <Globe className="w-3 h-3" /> Content-Led Discovery
                  </p>
                  <p className="text-xs text-muted-foreground">500+ daily articles, AI research on 14K+ stocks & MFs</p>
                </div>
                
                <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                  <p className="font-semibold text-xs flex items-center gap-1">
                    <Brain className="w-3 h-3" /> Personalized Intelligence
                  </p>
                  <p className="text-xs text-muted-foreground">Behavioral signals → tailored recommendations & alerts</p>
                </div>
                
                <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                  <p className="font-semibold text-xs flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" /> Portfolio Analytics
                  </p>
                  <p className="text-xs text-muted-foreground">Virtual portfolio, calculators, health scores & projections</p>
                </div>
                
                <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                  <p className="font-semibold text-xs flex items-center gap-1">
                    <ArrowRight className="w-3 h-3" /> Seamless Execution
                  </p>
                  <p className="text-xs text-muted-foreground">LAMF, Digital Gold/Silver, Personal Loans via partner rails</p>
                </div>
              </div>
              
              <div className="mt-3 pt-2 border-t border-green-200 dark:border-green-800">
                <p className="text-xs font-semibold text-green-800 dark:text-green-200">Channels:</p>
                <p className="text-xs text-muted-foreground">Web | Mobile | WhatsApp | Telegram</p>
              </div>
            </CardContent>
          </Card>

          {/* Column 3: Internal Workflows */}
          <Card className="border-2 border-purple-500/30 bg-purple-50/30 dark:bg-purple-950/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Workflow className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-bold text-purple-900 dark:text-purple-100">Internal Workflows</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Enterprise operations & productivity</p>
              
              <div className="space-y-2">
                <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                  <p className="font-semibold text-xs flex items-center gap-1">
                    <Layers className="w-3 h-3" /> Research Automation
                  </p>
                  <p className="text-xs text-muted-foreground">AI-generated reports, summaries & market intelligence</p>
                </div>
                
                <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                  <p className="font-semibold text-xs flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Compliance Engine
                  </p>
                  <p className="text-xs text-muted-foreground">Suitability checks, risk profiling & regulatory guardrails</p>
                </div>
                
                <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                  <p className="font-semibold text-xs flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" /> Analytics Dashboard
                  </p>
                  <p className="text-xs text-muted-foreground">Real-time insights, conversion funnels & user behavior</p>
                </div>
                
                <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                  <p className="font-semibold text-xs flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Content Operations
                  </p>
                  <p className="text-xs text-muted-foreground">AI-assisted content creation, SEO & distribution at scale</p>
                </div>
              </div>
              
              <div className="mt-3 pt-2 border-t border-purple-200 dark:border-purple-800">
                <p className="text-xs font-semibold text-purple-800 dark:text-purple-200">Stack:</p>
                <p className="text-xs text-muted-foreground">Cloud-native | API-first | Multi-tenant</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Technology Stack */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold">AI Technology Stack</h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="font-bold text-sm text-primary">LLM Layer</p>
                <p className="text-xs text-muted-foreground mt-1">Multi-model orchestration with financial domain fine-tuning</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="font-bold text-sm text-primary">RAG Engine</p>
                <p className="text-xs text-muted-foreground mt-1">Real-time market data, news & regulatory knowledge base</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="font-bold text-sm text-primary">Agent Framework</p>
                <p className="text-xs text-muted-foreground mt-1">Autonomous task execution with human-in-loop controls</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="font-bold text-sm text-primary">Personalization</p>
                <p className="text-xs text-muted-foreground mt-1">Behavioral ML for user intent & preference modeling</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Column: Why AI + Market Opportunity */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Why AI in Financial Services */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">Why AI Transforms Finance</h2>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
                  <p><span className="font-semibold">Information Overload:</span> 10,000+ financial products, endless news—AI filters & personalizes</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
                  <p><span className="font-semibold">Advisory Gap:</span> Only 2% have access to quality advice—AI democratizes expertise</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
                  <p><span className="font-semibold">Operational Cost:</span> High cost-to-serve in wealth—AI reduces 60-80% of manual work</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
                  <p><span className="font-semibold">Scale Challenge:</span> RMs handle 50-100 clients max—AI enables 10x productivity</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Opportunity */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">Market Opportunity</h2>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-muted/30 p-2 rounded">
                    <p className="font-bold text-primary">₹3,000-7,500 Cr</p>
                    <p className="text-muted-foreground">B2B BFSI AI/Wealth Tech TAM</p>
                  </div>
                  <div className="bg-muted/30 p-2 rounded">
                    <p className="font-bold text-primary">₹4.4 Lakh Cr</p>
                    <p className="text-muted-foreground">B2C Financial Products TAM</p>
                  </div>
                </div>
                <div className="bg-primary/10 p-2 rounded text-xs">
                  <p className="font-semibold">Growth Drivers:</p>
                  <ul className="text-muted-foreground mt-1 space-y-0.5">
                    <li>• 200M+ retail investors by 2030</li>
                    <li>• Account Aggregator framework enabling data access</li>
                    <li>• BFSI digital transformation spend: 22-30% CAGR</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Founder & Team */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold">Leadership</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold text-sm">Shubham Srivastava</p>
                <p className="text-xs text-primary font-medium">Founder & CEO | 2nd-time Founder | IIT(ISM) Dhanbad</p>
                <p className="text-xs text-muted-foreground mt-1">
                  20+ years building large-scale digital platforms. Ex-CTO HT Digital (100M+ MAUs), 
                  Ex-MakeMyTrip Hotels (1M QPS systems). Deep expertise in AI, product-led growth & platform scalability.
                </p>
              </div>
              <div>
                <p className="font-bold text-sm">Advisory & Team</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
                  <li>• <span className="font-medium">Tech:</span> Ex-CTO MakeMyTrip, Ex-CTO Nexttag</li>
                  <li>• <span className="font-medium">Growth:</span> Ex-TataSky, Business Head OTTPlay</li>
                  <li>• <span className="font-medium">Product:</span> Ex-TOI, Ex-Airtel, VP Reliance</li>
                  <li>• <span className="font-medium">Finance:</span> Enabled INDmoney 0→1</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center pt-2 border-t">
          <p className="text-sm font-semibold">Discvr.ai — AI-Native Financial Intelligence</p>
          <p className="text-xs text-muted-foreground mt-1">
            shubham@discvr.ai | +91-9873961591 | linkedin.com/in/shubhamsrivastava1
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0.5cm;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
