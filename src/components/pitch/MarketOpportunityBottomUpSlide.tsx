import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Coins, Zap, ArrowRight, Target, TrendingUp } from 'lucide-react';

export const MarketOpportunityBottomUpSlide = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="secondary" className="mb-2">Market Opportunity</Badge>
        <h2 className="text-5xl font-bold">How We Win: Content-Led Distribution</h2>
        <p className="text-xl text-muted-foreground">3 Target Groups → 3 Content Strategies → Zero-CAC Scale</p>
        <p className="text-sm text-muted-foreground mt-2">TAM: LAMF ₹37,500 cr • Digital Gold ₹15,000 cr • Digital Silver ₹2,400 cr</p>
      </div>

      {/* The 3 Target Groups */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* LAMF Target Group */}
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">LAMF Users</h3>
                <p className="text-sm text-muted-foreground">1.2M MF Investors</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm mb-1">Who We Serve (Years 1-3)</p>
                <p className="text-sm text-muted-foreground">1.2M SIP-heavy HNIs (₹10L+ MF corpus) in top-8 metros</p>
              </div>

              <div className="pt-3 border-t">
                <p className="font-semibold text-sm mb-1">Why They Care</p>
                <p className="text-xs text-muted-foreground">Need liquidity without breaking compounding or triggering exit loads</p>
              </div>

              <div className="pt-3 border-t">
                <p className="font-semibold text-sm mb-2">Core Content Hooks</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">Deep-dive guides on "pledge vs redeem"</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">EMI vs redemption calculators, SIP preservation case studies</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t">
                <p className="font-semibold text-sm mb-2">Organic Channels</p>
                <p className="text-xs text-muted-foreground">SEO (long-form explainers) • LinkedIn & YouTube webinars with CAs • WhatsApp Business groups</p>
              </div>

              <div className="pt-3 border-t">
                <p className="font-semibold text-sm mb-1">Signature Assets</p>
                <p className="text-xs text-muted-foreground">Loan-against-MF calculator, pledge-readiness checklist, monthly "SIP health" newsletter</p>
              </div>

              <div className="pt-3 border-t bg-primary/10 -mx-6 -mb-6 px-6 py-3 rounded-b-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold">Year 1-2 Target</span>
                  <span className="font-bold text-primary">7,200 users</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">Revenue</span>
                  <span className="font-bold text-primary">₹3.67 cr</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Digital Gold Target Group */}
        <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-yellow-500/10">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Coins className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Digital Gold</h3>
                <p className="text-sm text-muted-foreground">3M UPI Power Users</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm mb-1">Who We Serve (Years 1-3)</p>
                <p className="text-sm text-muted-foreground">3M UPI-native savers (23–35, Tier-1/2) with ₹25–75K disposable income</p>
              </div>

              <div className="pt-3 border-t">
                <p className="font-semibold text-sm mb-1">Why They Care</p>
                <p className="text-xs text-muted-foreground">Want ₹1 micro-savings, festival gifting, simple SIP experience</p>
              </div>

              <div className="pt-3 border-t">
                <p className="font-semibold text-sm mb-2">Core Content Hooks</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">"₹100/day gold challenge", festival gifting playbooks</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">Short reels comparing digital vs jewellery gold</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t">
                <p className="font-semibold text-sm mb-2">Organic Channels</p>
                <p className="text-xs text-muted-foreground">Instagram Reels • YouTube Shorts • Hindi/English finfluencers • WhatsApp broadcast lists</p>
              </div>

              <div className="pt-3 border-t">
                <p className="font-semibold text-sm mb-1">Signature Assets</p>
                <p className="text-xs text-muted-foreground">Gold SIP calculator, instant "gift gold" flow, festival campaign packs</p>
              </div>

              <div className="pt-3 border-t bg-yellow-500/10 -mx-6 -mb-6 px-6 py-3 rounded-b-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold">Year 1-2 Target</span>
                  <span className="font-bold text-yellow-600">24,000 users</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">Revenue</span>
                  <span className="font-bold text-yellow-600">₹7.4 cr</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Digital Silver Target Group */}
        <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-purple-500/10">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Digital Silver</h3>
                <p className="text-sm text-muted-foreground">5M Early Adopters</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm mb-1">Who We Serve (Years 1-3)</p>
                <p className="text-sm text-muted-foreground">1M value-conscious early adopters (Tier-1/2) starting ₹3K/month SIPs</p>
              </div>

              <div className="pt-3 border-t">
                <p className="font-semibold text-sm mb-1">Why They Care</p>
                <p className="text-xs text-muted-foreground">Want affordable metal hedge, industrial-growth story, gifting options</p>
              </div>

              <div className="pt-3 border-t">
                <p className="font-semibold text-sm mb-2">Core Content Hooks</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">"Silver in everyday life" stories, ₹10/day saving challenges</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">Regional festival content, cross-sell nudges from gold app</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t">
                <p className="font-semibold text-sm mb-2">Organic Channels</p>
                <p className="text-xs text-muted-foreground">Facebook & YouTube (vernacular) • Regional finfluencers • WhatsApp referrals</p>
              </div>

              <div className="pt-3 border-t">
                <p className="font-semibold text-sm mb-1">Signature Assets</p>
                <p className="text-xs text-muted-foreground">Silver SIP calculator, bilingual FAQ hub, "Silver Saver" combo nudges for gold users</p>
              </div>

              <div className="pt-3 border-t bg-purple-500/10 -mx-6 -mb-6 px-6 py-3 rounded-b-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold">Year 1-2 Target</span>
                  <span className="font-bold text-purple-600">25,000 users</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">Revenue</span>
                  <span className="font-bold text-purple-600">₹1.52 cr</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* The Scale Path */}
      <Card className="border-2 border-primary/20">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-primary" />
            <h3 className="text-3xl font-bold">The Scale Path: Bottom-Up → Market Leadership</h3>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {/* Start Here */}
            <div className="space-y-3">
              <Badge variant="outline" className="mb-2">Year 1-2: Prove It</Badge>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">₹12.59 cr</div>
                <p className="text-sm text-muted-foreground">56,200 users across 3 products</p>
                <p className="text-xs text-muted-foreground font-semibold pt-2 border-t">Focus: Top-8 cities, prove PMF, 0% CAC</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-muted-foreground" />
            </div>

            {/* Then Scale */}
            <div className="space-y-3">
              <Badge variant="outline" className="mb-2">Year 3-5: Expand</Badge>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-purple-600">₹176.4 cr</div>
                <p className="text-sm text-muted-foreground">367K users, Top-30 cities</p>
                <p className="text-xs text-muted-foreground font-semibold pt-2 border-t">Scale: Vernacular content, partnerships</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-muted-foreground" />
            </div>

            {/* Finally Dominate */}
            <div className="space-y-3">
              <Badge variant="outline" className="mb-2">Year 6-10: Lead</Badge>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-600">₹1,192 cr</div>
                <p className="text-sm text-muted-foreground">1.06M users, Pan-India</p>
                <p className="text-xs text-muted-foreground font-semibold pt-2 border-t">Dominate: Category leader, add products</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why This Works */}
      <Card className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-green-500/10 border-2 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h4 className="text-2xl font-bold">Why This Works: Content Compounds, CAC Stays Zero</h4>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="font-semibold text-primary">Specific Target Groups</p>
              <p className="text-sm text-muted-foreground">We don't chase everyone. We solve specific pain points for 3 well-defined groups.</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-purple-600">Content-Led Distribution</p>
              <p className="text-sm text-muted-foreground">Every article = permanent SEO asset. Traffic compounds while CAC stays ₹0.</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-green-600">Proven Before Scaling</p>
              <p className="text-sm text-muted-foreground">Years 1-2 prove PMF. Years 3+ layer market growth (12-18% CAGR) on top.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
