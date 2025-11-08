import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Coins, Sparkles, ArrowRight } from 'lucide-react';

export const MarketOpportunityBottomUpSlide = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="secondary" className="mb-2">Market Opportunity - Bottom Up</Badge>
        <h2 className="text-5xl font-bold">From Rahul to ₹1,192 Crore</h2>
        <p className="text-xl text-muted-foreground">Starting with real users, building to market leadership</p>
      </div>

      {/* Persona Cards - Rahul & Priya */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Rahul - LAMF Persona */}
        <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  Meet Rahul
                </h3>
                <p className="text-sm text-muted-foreground">LAMF User Persona</p>
              </div>
              <Badge className="bg-primary text-primary-foreground">₹4,800 Revenue</Badge>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold">Profile:</p>
                <p className="text-muted-foreground">35-year-old IT professional, Bangalore</p>
                <p className="text-muted-foreground">₹28L income, ₹18L MF portfolio</p>
              </div>

              <div>
                <p className="font-semibold">Pain Point:</p>
                <p className="text-muted-foreground">Needs ₹8L for daughter's education, doesn't want to break SIPs</p>
              </div>

              <div>
                <p className="font-semibold">Journey:</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                  <span className="bg-primary/10 px-2 py-1 rounded">Week 1: Reads article</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="bg-primary/10 px-2 py-1 rounded">Week 2: Uses calculator</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="bg-primary/10 px-2 py-1 rounded">Week 3: Gets ₹8L LAMF</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Unit Economics:</span>
                  <span className="text-primary font-bold">₹4,800 @ 0% CAC</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Priya - Digital Gold Persona */}
        <Card className="border-2 border-yellow-500/20 hover:border-yellow-500/40 transition-all">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Coins className="w-6 h-6 text-yellow-600" />
                  Meet Priya
                </h3>
                <p className="text-sm text-muted-foreground">Digital Gold/Silver User</p>
              </div>
              <Badge className="bg-yellow-600 text-white">₹18,960 Revenue</Badge>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold">Profile:</p>
                <p className="text-muted-foreground">28-year-old marketing manager, Mumbai</p>
                <p className="text-muted-foreground">₹15L income, ₹40k monthly disposable</p>
              </div>

              <div>
                <p className="font-semibold">Pain Point:</p>
                <p className="text-muted-foreground">Wants gold investment without storage/purity concerns</p>
              </div>

              <div>
                <p className="font-semibold">Journey:</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                  <span className="bg-yellow-500/10 px-2 py-1 rounded">Diwali: Reads guide</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="bg-yellow-500/10 px-2 py-1 rounded">Starts ₹5k SIP</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="bg-yellow-500/10 px-2 py-1 rounded">Buys 80g Year 1</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Unit Economics:</span>
                  <span className="text-yellow-600 font-bold">₹18,960 @ 0% CAC</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Progression: Beachhead → SAM → TAM */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-center">Market Progression</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          {/* Beachhead */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200">
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">Year 1-2: Beachhead</Badge>
                <div className="text-4xl font-bold text-primary mb-1">₹12.59 cr</div>
                <p className="text-xs text-muted-foreground">Commission Revenue</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Users:</span>
                  <span className="font-semibold">56,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ARPU:</span>
                  <span className="font-semibold">₹173,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Penetration:</span>
                  <span className="font-semibold">0.2-0.8%</span>
                </div>
              </div>

              <div className="pt-3 border-t border-blue-200">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Focus:</strong> Top-8 cities, LAMF + Gold + Silver, prove PMF
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SAM */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-2 border-purple-200">
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">Year 3-5: SAM</Badge>
                <div className="text-4xl font-bold text-purple-600 mb-1">₹176.4 cr</div>
                <p className="text-xs text-muted-foreground">14x Growth</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Users:</span>
                  <span className="font-semibold">367,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ARPU:</span>
                  <span className="font-semibold">₹224,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Penetration:</span>
                  <span className="font-semibold">1.5-5%</span>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-200">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Expand:</strong> Top-30 cities, vernacular, partnerships
                </p>
              </div>
            </CardContent>
          </Card>

          {/* TAM */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-2 border-green-200">
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">Year 6-10: TAM</Badge>
                <div className="text-4xl font-bold text-green-600 mb-1">₹1,192 cr</div>
                <p className="text-xs text-muted-foreground">95x from Beachhead</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Users:</span>
                  <span className="font-semibold">1.06M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ARPU:</span>
                  <span className="font-semibold">₹262,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Penetration:</span>
                  <span className="font-semibold">5-11%</span>
                </div>
              </div>

              <div className="pt-3 border-t border-green-200">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Scale:</strong> Pan-India, category leadership, new products
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Breakdown Table */}
      <Card className="border-2">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Beachhead Product Breakdown (Year 1-2)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product</th>
                  <th className="text-right py-2">Target Users</th>
                  <th className="text-right py-2">Penetration</th>
                  <th className="text-right py-2">Users (Y2)</th>
                  <th className="text-right py-2">Transaction Value</th>
                  <th className="text-right py-2">Revenue (Y1-2)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 font-semibold">LAMF</td>
                  <td className="text-right text-muted-foreground">1.2M investors</td>
                  <td className="text-right text-muted-foreground">0.2% → 0.6%</td>
                  <td className="text-right font-semibold">7,200</td>
                  <td className="text-right text-muted-foreground">₹612 cr</td>
                  <td className="text-right font-bold text-primary">₹3.67 cr</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Digital Gold</td>
                  <td className="text-right text-muted-foreground">3M UPI users</td>
                  <td className="text-right text-muted-foreground">0.3% → 0.8%</td>
                  <td className="text-right font-semibold">24,000</td>
                  <td className="text-right text-muted-foreground">₹368 cr</td>
                  <td className="text-right font-bold text-yellow-600">₹7.4 cr</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Digital Silver</td>
                  <td className="text-right text-muted-foreground">5M addressable</td>
                  <td className="text-right text-muted-foreground">0.2% → 0.5%</td>
                  <td className="text-right font-semibold">25,000</td>
                  <td className="text-right text-muted-foreground">₹416 cr</td>
                  <td className="text-right font-bold text-purple-600">₹1.52 cr</td>
                </tr>
                <tr className="bg-muted/30 font-bold">
                  <td className="py-3">TOTAL</td>
                  <td className="text-right">-</td>
                  <td className="text-right">-</td>
                  <td className="text-right">56,200</td>
                  <td className="text-right">₹1,396 cr</td>
                  <td className="text-right text-lg">₹12.59 cr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Insight Banner */}
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0">
        <CardContent className="p-6 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h4 className="text-xl font-bold">Why These Numbers Are Conservative</h4>
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-semibold text-blue-400 mb-1">Low Penetration</p>
              <p className="text-slate-300">0.2-0.8% vs industry 3-5% for digital products</p>
            </div>
            <div>
              <p className="font-semibold text-purple-400 mb-1">Market Tailwinds</p>
              <p className="text-slate-300">LAMF (12% CAGR), Gold (15%), Silver (18%) growing faster</p>
            </div>
            <div>
              <p className="font-semibold text-green-400 mb-1">Zero CAC</p>
              <p className="text-slate-300">Content compounds, revenue scales, margins improve</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 pt-3 border-t border-slate-700">
            Base case: 4x (₹4,768 cr) | Upside: 12x (₹14,304 cr) if we become category leader
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
