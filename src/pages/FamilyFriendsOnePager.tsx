import React from 'react';
import { TrendingUp, Target, Rocket, DollarSign, Trophy, Users, CheckCircle, Mail, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function FamilyFriendsOnePager() {
  return (
    <div className="min-h-screen bg-background">
      {/* Print Button */}
      <div className="fixed top-4 right-4 print:hidden z-50">
        <Button onClick={() => window.print()} variant="default">
          Print / Save as PDF
        </Button>
      </div>

      {/* One Pager Content */}
      <div className="max-w-[1200px] mx-auto p-8 space-y-6 print:p-4">
        
        {/* Header */}
        <div className="text-center border-b pb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <TrendingUp className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold">Discvr.ai</h1>
          </div>
          <p className="text-2xl font-semibold text-muted-foreground mb-1">The Distribution Platform for Financial Products</p>
          <p className="text-lg text-muted-foreground">Solving the Discovery-to-Execution Gap for 200M+ Retail Investors</p>
          <p className="text-sm text-muted-foreground mt-2">Pre-Seed Round | October 2025</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Left Column */}
          <div className="space-y-4">
            
            {/* Problem */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">The Distribution Problem</h2>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded">
                    <p className="font-semibold text-red-900 dark:text-red-100 mb-2">Financial products fail at distribution, not innovation</p>
                    <ul className="list-disc list-inside text-red-800 dark:text-red-200 space-y-1 text-xs">
                      <li>Discovery happens on social/news platforms</li>
                      <li>Execution on separate broker/MF platforms</li>
                      <li>Context & intent lost in transition</li>
                      <li>Product providers pay ₹2000-5000 CAC for cold leads</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Market Gap:</p>
                    <p className="text-muted-foreground text-xs">No platform bridges content consumption → product distribution with user context intact</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">The Distribution Platform</h2>
                </div>
                <div className="space-y-3">
                  <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                    <p className="font-semibold text-green-900 dark:text-green-100 text-sm mb-2">We own the discovery → execution journey</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="font-semibold">1️⃣ Content Moat</p>
                      <p className="text-muted-foreground">Daily news, AI research</p>
                    </div>
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="font-semibold">2️⃣ Context Engine</p>
                      <p className="text-muted-foreground">User intent capture</p>
                    </div>
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="font-semibold">3️⃣ Distribution Rails</p>
                      <p className="text-muted-foreground">Multi-product execution</p>
                    </div>
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="font-semibold">4️⃣ B2B Licensing</p>
                      <p className="text-muted-foreground">White-label platform</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Model */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Revenue Streams</h2>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Advertising (47%)</span>
                    <span className="font-semibold">₹9.0M/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distribution (33%)</span>
                    <span className="font-semibold">₹6.3M/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subscriptions (12%)</span>
                    <span className="font-semibold">₹2.3M/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>B2B SaaS (8%)</span>
                    <span className="font-semibold">₹1.5M/mo</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <p className="font-bold">FY27-28: ₹23 Cr Revenue | ₹8 Cr Profit</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Founder's Distribution DNA */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Founder's Distribution DNA</h2>
                </div>
                <p className="text-sm font-semibold mb-2">Shubham Chaudhary - Built to Solve Distribution at Scale</p>
                
                <div className="space-y-3">
                  <div className="border-l-2 border-primary pl-3">
                    <p className="font-semibold text-sm">HT Digital - CTO (2019-2022)</p>
                    <p className="text-xs text-muted-foreground mb-1.5">Scaled from a few million to <span className="font-semibold">100M+ users/month</span> while transforming to profitability</p>
                    <ul className="text-xs space-y-0.5 text-muted-foreground list-disc pl-4">
                      <li>Built real-time publication infrastructure scaling from 10s to 100s of publishers with ML from day 1</li>
                      <li>Optimized content distribution across Google, social channels & syndicators with perfect technical SEO</li>
                      <li>Balanced advertising revenue with page experience (conflicting goals) and scaled both simultaneously</li>
                    </ul>
                  </div>

                  <div className="border-l-2 border-primary pl-3">
                    <p className="font-semibold text-sm">MakeMyTrip Hotels - Engineering Lead (2011-2015)</p>
                    <p className="text-xs text-muted-foreground mb-1.5">Built Hotels' core engineering & product architecture</p>
                    <ul className="text-xs space-y-0.5 text-muted-foreground list-disc pl-4">
                      <li>Designed new-age tech platform handling millions of real-time transactions</li>
                      <li>Built dynamic ML-based e-commerce transaction layer at scale</li>
                    </ul>
                  </div>

                  <div className="bg-primary/20 p-2 rounded mt-2">
                    <p className="text-xs font-semibold text-primary">Why This Matters:</p>
                    <p className="text-xs">Solved large-scale distribution twice. Building India's biggest financial services distributor requires exactly this DNA.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Traction */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Current Traction</h2>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-semibold">Product:</p>
                    <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                      <li>News platform live with AI</li>
                      <li>Stock research (beta, Oct 25)</li>
                      <li>Crypto hub (Live, Oct 25)</li>
                      <li>Contest platform (Live)</li>
                      <li>FD & Loan against MF launched (partnerships closed)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Metrics:</p>
                    <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                      <li>100K users for Nov (40K Oct)</li>
                      <li>2 min avg session (organic)</li>
                      <li>2 B2B discussions ongoing</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column */}
          <div className="space-y-4">
            
            {/* Financials */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">18-Month Projections</h2>
                </div>
                <div className="space-y-2">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-1">Month</th>
                        <th className="text-right py-1">MAUs</th>
                        <th className="text-right py-1">Revenue</th>
                        <th className="text-right py-1">Profit</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr>
                        <td className="py-1">M1</td>
                        <td className="text-right">100K</td>
                        <td className="text-right">₹1L</td>
                        <td className="text-right text-red-600">-₹12L</td>
                      </tr>
                      <tr>
                        <td className="py-1">M6</td>
                        <td className="text-right">260K</td>
                        <td className="text-right">₹9L</td>
                        <td className="text-right text-red-600">-₹18L</td>
                      </tr>
                      <tr>
                        <td className="py-1">M12</td>
                        <td className="text-right">1.2M</td>
                        <td className="text-right">₹30L</td>
                        <td className="text-right text-red-600">-₹7L</td>
                      </tr>
                      <tr className="font-bold border-t">
                        <td className="py-1">M24</td>
                        <td className="text-right">3.5M</td>
                        <td className="text-right">₹71L</td>
                        <td className="text-right text-green-600">+₹14L</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="bg-muted/50 p-2 rounded text-xs space-y-1">
                    <p className="font-semibold">Key Highlights:</p>
                    <ul className="list-disc list-inside text-muted-foreground">
                      <li>Break-even: Month 14</li>
                      <li>Gross Margin: 30%+</li>
                      <li>CAC: ₹0.94 blended</li>
                      <li>LTV/CAC: 60-80x</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team & GTM */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Team & Strategy</h2>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <p className="font-semibold">Current: 12 people</p>
                    <p className="text-muted-foreground">3 devs, 2 dev-interns, 3 writers, 1 SEO, 1 analyst, 1 BD, 1 video</p>
                  </div>
                  <div>
                    <p className="font-semibold">GTM: Organic-First</p>
                    <ul className="list-disc list-inside text-muted-foreground">
                      <li>180→410 articles/day (AI-assisted)</li>
                      <li>77% organic traffic by M18</li>
                      <li>Weekly contests for virality</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* The Ask */}
            <Card className="border-2 border-primary">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Friends & Family Round</h2>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-primary">₹2 Cr</p>
                    <p className="text-xs text-muted-foreground">Convertible Note Structure</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="font-semibold mb-1">Structure</p>
                      <p className="text-muted-foreground">Convertible Notes (converts at Series A)</p>
                    </div>
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="font-semibold mb-1">Discount Rate</p>
                      <p className="text-green-600 dark:text-green-400 font-bold">25% discount to Series A valuation</p>
                    </div>
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="font-semibold mb-1">Interest Rate</p>
                      <p className="text-muted-foreground">0% (standard for F&F)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="font-semibold mb-1">Maturity</p>
                      <p className="text-muted-foreground">24 months or upon Series A</p>
                    </div>
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="font-semibold mb-1">Investment Range</p>
                      <p className="text-muted-foreground font-bold">₹10L - ₹50L</p>
                    </div>
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="font-semibold mb-1">Target Close</p>
                      <p className="text-muted-foreground">October 2025</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-2 rounded text-xs">
                    <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">What is a Convertible Note?</p>
                    <p className="text-blue-800 dark:text-blue-200 text-xs">Your investment converts to equity at our next "Qualified Financing" (raise of ₹2 Cr+ from institutional investors) at a 25% discount. This rewards you for investing early without needing to set a valuation now.</p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 p-2 rounded">
                    <p className="font-semibold text-green-900 dark:text-green-100 mb-1 text-xs">What You Get</p>
                    <div className="text-xs space-y-0.5 text-green-800 dark:text-green-200">
                      <div>✓ 25% discount to Series A valuation (bonus for early investment)</div>
                      <div>✓ Quarterly investor updates</div>
                      <div>✓ Pro-rata rights in Series A (optional participation)</div>
                      <div>✓ Priority conversion rights</div>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/20 p-2 rounded">
                    <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1 text-xs">What Happens at Maturity (24 months)?</p>
                    <p className="text-xs text-amber-800 dark:text-amber-200 mb-1">If Series A doesn't happen:</p>
                    <div className="text-xs space-y-0.5 text-amber-800 dark:text-amber-200">
                      <div>• <span className="font-semibold">Option 1:</span> Convert at ₹25-50 Cr valuation (fair market value)</div>
                      <div>• <span className="font-semibold">Option 2:</span> Company buyback at 2x-3x fair valuation</div>
                      <div>• <span className="font-semibold">Note:</span> We break-even at M14, so not dependent on Series A</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Use of Funds */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-sm mb-2">Use of Funds</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Product Development</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Content & SEO</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marketing & Growth</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Team Expansion</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Infrastructure</span>
                    <span className="font-semibold">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Legal & Compliance</span>
                    <span className="font-semibold">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </div>
  );
}
