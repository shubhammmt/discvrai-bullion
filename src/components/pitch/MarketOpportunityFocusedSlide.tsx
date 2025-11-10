import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target, Zap, CheckCircle2 } from "lucide-react";

export const MarketOpportunityFocusedSlide = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Market Opportunity</h1>
        <p className="text-xl text-muted-foreground">
          Focused Growth Strategy
        </p>
      </div>

      {/* Market Sizing Table */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Market Sizing & Revenue Projections
        </h2>
        
        <Card>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-bold">Product</th>
                    <th className="text-right p-2 font-bold">Cohort Size<br/>(3 Years)</th>
                    <th className="text-right p-2 font-bold">Y1 Market<br/>(₹ Cr)</th>
                    <th className="text-right p-2 font-bold">Y10 Market<br/>(₹ Cr)</th>
                    <th className="text-right p-2 font-bold">Y1 GMV<br/>(₹ Cr)</th>
                    <th className="text-right p-2 font-bold">Y10 GMV<br/>(₹ Cr)</th>
                    <th className="text-right p-2 font-bold">Y1 Revenue<br/>(₹ Cr)</th>
                    <th className="text-right p-2 font-bold">Y10 Revenue<br/>(₹ Cr)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-medium">LAMF</td>
                    <td className="text-right p-2">1,200,000</td>
                    <td className="text-right p-2">37,350</td>
                    <td className="text-right p-2">103,460</td>
                    <td className="text-right p-2">144</td>
                    <td className="text-right p-2">27,353</td>
                    <td className="text-right p-2">0.86</td>
                    <td className="text-right p-2">164.12</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Digital Gold</td>
                    <td className="text-right p-2">3,000,000</td>
                    <td className="text-right p-2">14,000</td>
                    <td className="text-right p-2">49,280</td>
                    <td className="text-right p-2">10.66</td>
                    <td className="text-right p-2">10,857.28</td>
                    <td className="text-right p-2">0.21</td>
                    <td className="text-right p-2">217.15</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Digital Silver</td>
                    <td className="text-right p-2">1,000,000</td>
                    <td className="text-right p-2">2,400</td>
                    <td className="text-right p-2">10,659</td>
                    <td className="text-right p-2">3</td>
                    <td className="text-right p-2">3,949</td>
                    <td className="text-right p-2">0.06</td>
                    <td className="text-right p-2">78.98</td>
                  </tr>
                  <tr className="bg-primary/5 font-bold">
                    <td className="p-2">TOTAL</td>
                    <td className="text-right p-2">5,200,000</td>
                    <td className="text-right p-2">53,750</td>
                    <td className="text-right p-2">163,399</td>
                    <td className="text-right p-2">157.66</td>
                    <td className="text-right p-2">42,159.28</td>
                    <td className="text-right p-2">1.13</td>
                    <td className="text-right p-2">460.25</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content-to-Commerce Engine */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-5 space-y-3">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Content-to-Commerce Engine
          </h3>
          <p className="text-sm font-semibold">We don't chase users, they find us:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm"><strong>14K+ AI-assisted pages</strong> → organic discovery</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm"><strong>Behavioral signals</strong> → right timing</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm"><strong>Embedded CTAs</strong> → zero-CAC conversions</p>
              </div>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>→ Stock research → Broker widget</p>
              <p>→ MF deep-dive → SIP quick-start</p>
              <p>→ MF liquidity article → LAMF calculator</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Line */}
      <Card className="bg-secondary/10 border-secondary/20">
        <CardContent className="p-5">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-center flex items-center justify-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Bottom Line
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="text-lg font-bold text-primary">Start Small</p>
                <p className="text-muted-foreground">→ 13,400 users</p>
                <p className="text-muted-foreground">→ ₹1.13 cr revenue (Y1)</p>
              </div>
              <div>
                <p className="text-lg font-bold text-primary">Prove It</p>
                <p className="text-muted-foreground">→ Fixed cohorts</p>
                <p className="text-muted-foreground">→ Zero-CAC, validate economics</p>
              </div>
              <div>
                <p className="text-lg font-bold text-primary">Scale Smart</p>
                <p className="text-muted-foreground">→ 3.4M+ users</p>
                <p className="text-muted-foreground">→ ₹460 cr revenue (Y10)</p>
              </div>
            </div>
            <p className="text-center text-sm font-medium pt-3 border-t border-border/30">
              Not betting on the whole market. Just 3 focused personas, proven playbook, disciplined scale.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
