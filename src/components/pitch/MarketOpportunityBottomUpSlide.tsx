import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Coins, Zap, ArrowRight, ArrowDown, TrendingUp } from 'lucide-react';

export const MarketOpportunityBottomUpSlide = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="secondary" className="mb-2">Market Opportunity</Badge>
        <h2 className="text-5xl font-bold">Bottom-Up: From One User to ₹54,900 Cr Market</h2>
        <p className="text-xl text-muted-foreground">We start specific, then scale systematically</p>
      </div>

      {/* The 3 User Stories - Bottom Layer */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold">1</div>
          <h3 className="text-2xl font-bold">Start Here: Individual Users</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Rahul - LAMF */}
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Meet Rahul</h4>
                  <p className="text-xs text-muted-foreground">LAMF User</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">• 35 years, Bangalore</p>
                <p className="text-muted-foreground">• ₹10L MF corpus, running SIPs</p>
                <p className="text-muted-foreground">• Needs ₹6L for child's education</p>
                <p className="font-semibold text-primary mt-3">Takes ₹6L LAMF loan</p>
                <p className="text-xs text-muted-foreground">We earn: ₹3,600 (0.6% commission)</p>
              </div>
            </CardContent>
          </Card>

          {/* Priya - Gold */}
          <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-yellow-500/10">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Meet Priya</h4>
                  <p className="text-xs text-muted-foreground">Digital Gold User</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">• 28 years, Mumbai</p>
                <p className="text-muted-foreground">• PhonePe user, ₹50k disposable</p>
                <p className="text-muted-foreground">• Wants to save for festivals</p>
                <p className="font-semibold text-yellow-600 mt-3">Buys 2g gold (₹23,698)</p>
                <p className="text-xs text-muted-foreground">We earn: ₹474 (2% commission)</p>
              </div>
            </CardContent>
          </Card>

          {/* Aditya - Silver */}
          <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-purple-500/10">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Meet Aditya</h4>
                  <p className="text-xs text-muted-foreground">Digital Silver User</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">• 30 years, Pune</p>
                <p className="text-muted-foreground">• Tech-savvy, value investor</p>
                <p className="text-muted-foreground">• Starts ₹3k/month silver SIP</p>
                <p className="font-semibold text-purple-600 mt-3">Buys 150g silver (₹24,000)</p>
                <p className="text-xs text-muted-foreground">We earn: ₹480 (2% commission)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="w-8 h-8 text-muted-foreground animate-bounce" />
      </div>

      {/* Scale to Cohorts - Middle Layer */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold">2</div>
          <h3 className="text-2xl font-bold">Scale to Cohorts: Year 1-2 Beachhead</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* LAMF Cohort */}
          <Card className="border-2 border-primary/30">
            <CardContent className="p-6 space-y-3">
              <h4 className="text-lg font-bold text-primary">LAMF Cohort</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target Group:</span>
                  <span className="font-semibold">1.2M users</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year 1-2 Users:</span>
                  <span className="font-semibold">7,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Penetration:</span>
                  <span className="font-semibold text-primary">0.6%</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="text-xl font-bold text-primary">₹3.67 cr</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">7,200 × ₹5,100 ARPU</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gold Cohort */}
          <Card className="border-2 border-yellow-500/30">
            <CardContent className="p-6 space-y-3">
              <h4 className="text-lg font-bold text-yellow-600">Digital Gold Cohort</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target Group:</span>
                  <span className="font-semibold">3M users</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year 1-2 Users:</span>
                  <span className="font-semibold">27,600</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Penetration:</span>
                  <span className="font-semibold text-yellow-600">0.92%</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="text-xl font-bold text-yellow-600">₹7.4 cr</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">27,600 × ₹2,680 ARPU</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Silver Cohort */}
          <Card className="border-2 border-purple-500/30">
            <CardContent className="p-6 space-y-3">
              <h4 className="text-lg font-bold text-purple-600">Digital Silver Cohort</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target Group:</span>
                  <span className="font-semibold">1M users</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year 1-2 Users:</span>
                  <span className="font-semibold">5,900</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Penetration:</span>
                  <span className="font-semibold text-purple-600">0.59%</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="text-xl font-bold text-purple-600">₹1.52 cr</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">5,900 × ₹2,576 ARPU</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Year 1-2 Total */}
        <Card className="mt-6 border-2 border-primary/40 bg-gradient-to-r from-primary/10 to-purple-500/10">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xl font-bold">Year 1-2 Total (Beachhead)</h4>
                <p className="text-sm text-muted-foreground">40,700 users across 3 products</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">₹12.59 cr</div>
                <p className="text-sm text-muted-foreground">Cumulative revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="w-8 h-8 text-muted-foreground animate-bounce" />
      </div>

      {/* Path to TAM - Top Layer */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold">3</div>
          <h3 className="text-2xl font-bold">The Full Market: TAM & Growth Path</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* LAMF TAM */}
          <Card className="border-2 border-primary/30">
            <CardContent className="p-6 space-y-3">
              <h4 className="text-lg font-bold text-primary">LAMF Market</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total TAM:</span>
                  <span className="text-xl font-bold text-primary">₹37,500 cr</span>
                </div>
                <p className="text-xs text-muted-foreground">{'<'}1% of ₹76L cr MF AUM</p>
                <div className="pt-3 border-t">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Our Year 1-2:</span>
                    <span className="font-semibold">₹3.67 cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">% of TAM:</span>
                    <span className="font-semibold text-primary">0.01%</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-muted-foreground">Year 10 Target:</span>
                    <span className="font-semibold text-primary">₹153.57 cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">% of TAM:</span>
                    <span className="font-semibold text-primary">0.41%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gold TAM */}
          <Card className="border-2 border-yellow-500/30">
            <CardContent className="p-6 space-y-3">
              <h4 className="text-lg font-bold text-yellow-600">Digital Gold Market</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total TAM:</span>
                  <span className="text-xl font-bold text-yellow-600">₹15,000 cr</span>
                </div>
                <p className="text-xs text-muted-foreground">Almost all is SAM (digital)</p>
                <div className="pt-3 border-t">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Our Year 1-2:</span>
                    <span className="font-semibold">₹7.4 cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">% of TAM:</span>
                    <span className="font-semibold text-yellow-600">0.05%</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-muted-foreground">Year 10 Target:</span>
                    <span className="font-semibold text-yellow-600">₹399.34 cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">% of TAM:</span>
                    <span className="font-semibold text-yellow-600">2.66%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Silver TAM */}
          <Card className="border-2 border-purple-500/30">
            <CardContent className="p-6 space-y-3">
              <h4 className="text-lg font-bold text-purple-600">Digital Silver Market</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total TAM:</span>
                  <span className="text-xl font-bold text-purple-600">₹2,400 cr</span>
                </div>
                <p className="text-xs text-muted-foreground">Almost all is SAM (digital)</p>
                <div className="pt-3 border-t">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Our Year 1-2:</span>
                    <span className="font-semibold">₹1.52 cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">% of TAM:</span>
                    <span className="font-semibold text-purple-600">0.06%</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-muted-foreground">Year 10 Target:</span>
                    <span className="font-semibold text-purple-600">₹130.66 cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">% of TAM:</span>
                    <span className="font-semibold text-purple-600">5.44%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Total Market Summary */}
        <Card className="border-2 border-primary/40 bg-gradient-to-r from-primary/10 via-yellow-500/10 to-purple-500/10">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-4">Combined Market Opportunity</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-muted-foreground">Total TAM:</span>
                    <span className="text-4xl font-bold text-primary">₹54,900 cr</span>
                  </div>
                  <p className="text-sm text-muted-foreground">LAMF (₹37.5K cr) + Gold (₹15K cr) + Silver (₹2.4K cr)</p>
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-4">Our Growth Path</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year 1-2:</span>
                    <span className="font-bold text-primary">₹12.59 cr (0.02% of TAM)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year 3-5:</span>
                    <span className="font-bold text-purple-600">₹69.94 cr (0.13% of TAM)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year 10:</span>
                    <span className="font-bold text-green-600">₹683.57 cr (1.25% of TAM)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Why This Works */}
      <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-2 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h4 className="text-2xl font-bold">Why Bottom-Up Matters: Content Compounds, CAC Stays Zero</h4>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="font-semibold text-primary">Conservative Start (0.02% TAM)</p>
              <p className="text-sm text-muted-foreground">We prove PMF with specific users in Years 1-2. No spray-and-pray.</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-purple-600">Systematic Scale (12-18% CAGR)</p>
              <p className="text-sm text-muted-foreground">Content library compounds. Market grows 12-18% annually. We ride both waves.</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-green-600">Still 1.25% TAM at Year 10</p>
              <p className="text-sm text-muted-foreground">Even after 10 years, we're only at 1.25% of ₹54,900 cr. Massive upside remains.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
