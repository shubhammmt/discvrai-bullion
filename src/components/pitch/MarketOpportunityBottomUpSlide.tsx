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
        <h2 className="text-5xl font-bold">₹54,900 Crore Market Opportunity</h2>
        <p className="text-xl text-muted-foreground">Our path from individual users to massive scale</p>
      </div>

      {/* The 3 User Stories - Bottom Layer */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center text-xl font-bold shadow-lg">1</div>
          <h3 className="text-3xl font-bold">It Starts with Real People</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Rahul - LAMF */}
          <Card className="border-2 border-primary/40 bg-gradient-to-br from-primary/5 to-primary/10 hover-scale">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary/30 flex items-center justify-center shadow-md">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Rahul</h4>
                  <p className="text-sm text-muted-foreground">35, Bangalore</p>
                </div>
              </div>
              
              {/* Quote Bubble */}
              <div className="bg-primary/10 border-l-4 border-primary rounded-r-lg p-3">
                <p className="text-sm italic">"I need ₹6L for my child's school, but I don't want to break my SIPs"</p>
              </div>
              
              <div className="pt-2 space-y-2">
                <p className="text-sm text-muted-foreground">₹10L MF corpus • Running SIPs</p>
                <div className="pt-3 border-t">
                  <p className="text-3xl font-bold text-primary">₹3,600</p>
                  <p className="text-xs text-muted-foreground">Revenue from one user</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Priya - Gold */}
          <Card className="border-2 border-yellow-500/40 bg-gradient-to-br from-yellow-500/5 to-yellow-500/10 hover-scale">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-yellow-500/30 flex items-center justify-center shadow-md">
                  <Coins className="w-7 h-7 text-yellow-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Priya</h4>
                  <p className="text-sm text-muted-foreground">28, Mumbai</p>
                </div>
              </div>
              
              {/* Quote Bubble */}
              <div className="bg-yellow-500/10 border-l-4 border-yellow-600 rounded-r-lg p-3">
                <p className="text-sm italic">"I want to save ₹100/day for festivals without jewelry hassles"</p>
              </div>
              
              <div className="pt-2 space-y-2">
                <p className="text-sm text-muted-foreground">PhonePe user • ₹50k disposable income</p>
                <div className="pt-3 border-t">
                  <p className="text-3xl font-bold text-yellow-600">₹474</p>
                  <p className="text-xs text-muted-foreground">Revenue from one user</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aditya - Silver */}
          <Card className="border-2 border-purple-500/40 bg-gradient-to-br from-purple-500/5 to-purple-500/10 hover-scale">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-purple-500/30 flex items-center justify-center shadow-md">
                  <Zap className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Aditya</h4>
                  <p className="text-sm text-muted-foreground">30, Pune</p>
                </div>
              </div>
              
              {/* Quote Bubble */}
              <div className="bg-purple-500/10 border-l-4 border-purple-600 rounded-r-lg p-3">
                <p className="text-sm italic">"I want affordable metal savings with industrial upside potential"</p>
              </div>
              
              <div className="pt-2 space-y-2">
                <p className="text-sm text-muted-foreground">Tech-savvy • Value investor</p>
                <div className="pt-3 border-t">
                  <p className="text-3xl font-bold text-purple-600">₹480</p>
                  <p className="text-xs text-muted-foreground">Revenue from one user</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 my-6">
        <ArrowDown className="w-10 h-10 text-primary/60 animate-bounce" />
        <p className="text-sm text-muted-foreground italic">Now multiply this across India's savvy investor cohorts...</p>
      </div>

      {/* Scale to Cohorts - Middle Layer */}
      <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/40 to-primary/30 flex items-center justify-center text-xl font-bold shadow-lg">2</div>
          <h3 className="text-3xl font-bold">Scaling to Our Beachhead (Year 1-2)</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* LAMF Cohort */}
          <Card className="border-2 border-primary/40 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-6 space-y-4">
              <h4 className="text-xl font-bold text-primary flex items-center gap-2">
                <Users className="w-5 h-5" />
                LAMF Loans
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-4xl font-bold text-primary">₹3.67 cr</p>
                  <p className="text-sm text-muted-foreground">Year 1-2 revenue</p>
                </div>
                <div className="pt-3 border-t space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Users:</span>
                    <span className="font-semibold">7,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">TAM:</span>
                    <span className="font-semibold">1.2M (0.6% penetration)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gold Cohort */}
          <Card className="border-2 border-yellow-500/40 bg-gradient-to-br from-yellow-500/5 to-background">
            <CardContent className="p-6 space-y-4">
              <h4 className="text-xl font-bold text-yellow-600 flex items-center gap-2">
                <Coins className="w-5 h-5" />
                Digital Gold
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-4xl font-bold text-yellow-600">₹7.4 cr</p>
                  <p className="text-sm text-muted-foreground">Year 1-2 revenue</p>
                </div>
                <div className="pt-3 border-t space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Users:</span>
                    <span className="font-semibold">27,600</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">TAM:</span>
                    <span className="font-semibold">3M (0.92% penetration)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Silver Cohort */}
          <Card className="border-2 border-purple-500/40 bg-gradient-to-br from-purple-500/5 to-background">
            <CardContent className="p-6 space-y-4">
              <h4 className="text-xl font-bold text-purple-600 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Digital Silver
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-4xl font-bold text-purple-600">₹1.52 cr</p>
                  <p className="text-sm text-muted-foreground">Year 1-2 revenue</p>
                </div>
                <div className="pt-3 border-t space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Users:</span>
                    <span className="font-semibold">5,900</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">TAM:</span>
                    <span className="font-semibold">1M (0.59% penetration)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Year 1-2 Total */}
        <Card className="mt-6 border-2 border-primary/50 bg-gradient-to-r from-primary/10 via-yellow-500/10 to-purple-500/10 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="text-2xl font-bold mb-2">Year 1-2 Beachhead</h4>
                <p className="text-muted-foreground">40,700 users • 3 products • Zero CAC</p>
              </div>
              <div className="text-center md:text-right">
                <div className="text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">₹12.59 cr</div>
                <p className="text-sm text-muted-foreground mt-1">Proven revenue foundation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center gap-2 my-6">
        <ArrowDown className="w-10 h-10 text-primary/60 animate-bounce" />
        <p className="text-sm text-muted-foreground italic">The full addressable market...</p>
      </div>

      {/* Path to TAM - Top Layer */}
      <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/50 to-primary/40 flex items-center justify-center text-xl font-bold shadow-lg">3</div>
          <h3 className="text-3xl font-bold">The Full Addressable Market</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* LAMF TAM */}
          <Card className="border-2 border-primary/40 bg-gradient-to-b from-primary/5 to-background">
            <CardContent className="p-6 space-y-4">
              <h4 className="text-xl font-bold text-primary">LAMF Market</h4>
              <div>
                <p className="text-5xl font-bold text-primary">₹37,500 cr</p>
                <p className="text-xs text-muted-foreground mt-1">{'<'}1% of ₹76L cr MF AUM</p>
              </div>
              <div className="pt-4 border-t space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year 10 Target:</span>
                  <span className="font-bold text-primary">₹153.57 cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Share:</span>
                  <span className="font-semibold">0.41%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gold TAM */}
          <Card className="border-2 border-yellow-500/40 bg-gradient-to-b from-yellow-500/5 to-background">
            <CardContent className="p-6 space-y-4">
              <h4 className="text-xl font-bold text-yellow-600">Digital Gold Market</h4>
              <div>
                <p className="text-5xl font-bold text-yellow-600">₹15,000 cr</p>
                <p className="text-xs text-muted-foreground mt-1">Almost all is SAM (digital)</p>
              </div>
              <div className="pt-4 border-t space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year 10 Target:</span>
                  <span className="font-bold text-yellow-600">₹399.34 cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Share:</span>
                  <span className="font-semibold">2.66%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Silver TAM */}
          <Card className="border-2 border-purple-500/40 bg-gradient-to-b from-purple-500/5 to-background">
            <CardContent className="p-6 space-y-4">
              <h4 className="text-xl font-bold text-purple-600">Digital Silver Market</h4>
              <div>
                <p className="text-5xl font-bold text-purple-600">₹2,400 cr</p>
                <p className="text-xs text-muted-foreground mt-1">Almost all is SAM (digital)</p>
              </div>
              <div className="pt-4 border-t space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year 10 Target:</span>
                  <span className="font-bold text-purple-600">₹130.66 cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Share:</span>
                  <span className="font-semibold">5.44%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Total Market Summary */}
        <Card className="border-2 border-primary/50 bg-gradient-to-r from-primary/10 via-yellow-500/10 to-purple-500/10 shadow-xl">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h4 className="text-3xl font-bold">Combined TAM</h4>
                <div className="text-7xl font-bold bg-gradient-to-r from-primary via-yellow-600 to-purple-600 bg-clip-text text-transparent">
                  ₹54,900 cr
                </div>
                <p className="text-sm text-muted-foreground">LAMF + Digital Gold + Digital Silver markets</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-bold mb-4">Our Systematic Growth</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <span className="text-sm text-muted-foreground">Year 1-2:</span>
                    <span className="text-lg font-bold text-primary">₹12.59 cr</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
                    <span className="text-sm text-muted-foreground">Year 3-5:</span>
                    <span className="text-lg font-bold text-purple-600">₹69.94 cr</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                    <span className="text-sm text-muted-foreground">Year 10:</span>
                    <span className="text-lg font-bold text-green-600">₹683.57 cr</span>
                  </div>
                  <p className="text-xs text-muted-foreground italic pt-2">Still only 1.25% market penetration at Year 10</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investor Impact - New Section */}
      <Card className="bg-gradient-to-br from-green-500/10 via-primary/10 to-purple-500/10 border-2 border-green-500/30 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-green-600" />
            </div>
            <h4 className="text-3xl font-bold">What This Means for You</h4>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center center text-primary font-bold">✓</div>
              <p className="text-xl font-bold text-primary">Proven, Not Projected</p>
              <p className="text-sm text-muted-foreground">Starting with 40,700 real users generating ₹12.59 cr in Years 1-2. This isn't a pitch deck dream—it's validated demand.</p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-600 font-bold">10x</div>
              <p className="text-xl font-bold text-purple-600">Massive Upside</p>
              <p className="text-sm text-muted-foreground">At Year 10, we're still only at 1.25% of the ₹54,900 cr TAM. Room to scale 10x+ beyond our projections.</p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 font-bold">0</div>
              <p className="text-xl font-bold text-green-600">Zero CAC Model</p>
              <p className="text-sm text-muted-foreground">Content compounds, traffic grows organically. Every rupee invested goes to content, not ads. Sustainable unit economics from day one.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
