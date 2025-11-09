import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Target } from "lucide-react";

export const MarketOpportunityFocusedSlide = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Market Opportunity</h1>
        <p className="text-xl text-muted-foreground">
          Persona-First, Conservative Growth Strategy
        </p>
      </div>

      {/* Strategy Overview */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-5">
          <p className="text-lg text-center font-medium">
            We're NOT trying to capture the entire market. We're targeting <strong>3 specific user personas</strong> with real pain points,
            proving unit economics in Years 1-3, then scaling conservatively.
          </p>
        </CardContent>
      </Card>

      {/* The 3 User Personas */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">The 3 User Personas We Serve</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          {/* LAMF Persona */}
          <Card className="border-2">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">The SIP-Heavy Investor</h3>
              </div>
              <div className="space-y-1.5 text-sm">
                <p><strong>Product:</strong> LAMF</p>
                <p><strong>Who:</strong> 1.2M investors in top-8 metros with ₹10L+ MF holdings</p>
                <p><strong>Pain:</strong> Need liquidity but don't want to break SIPs</p>
                <p><strong>Solution:</strong> Pledge mutual funds, get loans at lower rates</p>
                <Badge variant="secondary" className="mt-2">Fixed 1.2M cohort (Years 1-3)</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Gold Persona */}
          <Card className="border-2">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">The Micro-Saver</h3>
              </div>
              <div className="space-y-1.5 text-sm">
                <p><strong>Product:</strong> Digital Gold</p>
                <p><strong>Who:</strong> 3M UPI power users (23-35) with ₹25-75K income</p>
                <p><strong>Pain:</strong> Gold too expensive (min 1g = ₹11,849)</p>
                <p><strong>Solution:</strong> Start with ₹1, build gold SIPs, gift digitally</p>
                <Badge variant="secondary" className="mt-2">Fixed 3M cohort (Years 1-3)</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Silver Persona */}
          <Card className="border-2">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">The Value Seeker</h3>
              </div>
              <div className="space-y-1.5 text-sm">
                <p><strong>Product:</strong> Digital Silver</p>
                <p><strong>Who:</strong> 1M early adopters wanting affordable precious metal</p>
                <p><strong>Pain:</strong> Need inflation hedge at lower ticket size</p>
                <p><strong>Solution:</strong> Silver at ₹160/g, ₹3K/month SIPs</p>
                <Badge variant="secondary" className="mt-2">Fixed 1M cohort (Years 1-3)</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Conservative Growth Table */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-center">Conservative Growth: Niche → Proven → Scale</h2>
        
        <Card>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-bold">Product</th>
                    <th className="text-right p-2 font-bold">Year 1 Users</th>
                    <th className="text-right p-2 font-bold">Year 10 Users</th>
                    <th className="text-right p-2 font-bold">Year 1 Revenue</th>
                    <th className="text-right p-2 font-bold">Year 10 Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-medium">LAMF</td>
                    <td className="text-right p-2">2,400</td>
                    <td className="text-right p-2">390,760</td>
                    <td className="text-right p-2">₹0.86 cr</td>
                    <td className="text-right p-2">₹164.12 cr</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Digital Gold</td>
                    <td className="text-right p-2">9,000</td>
                    <td className="text-right p-2">2,190,634</td>
                    <td className="text-right p-2">₹0.21 cr</td>
                    <td className="text-right p-2">₹217.15 cr</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Digital Silver</td>
                    <td className="text-right p-2">2,000</td>
                    <td className="text-right p-2">863,496</td>
                    <td className="text-right p-2">₹0.06 cr</td>
                    <td className="text-right p-2">₹78.98 cr</td>
                  </tr>
                  <tr className="bg-primary/5 font-bold">
                    <td className="p-2">TOTAL</td>
                    <td className="text-right p-2">13,400</td>
                    <td className="text-right p-2">3,444,890</td>
                    <td className="text-right p-2">₹1.13 cr</td>
                    <td className="text-right p-2">₹460.25 cr</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p><strong>Years 1-3:</strong> Keep cohorts FIXED, prove PMF with 0.2-0.8% penetration</p>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p><strong>Years 4+:</strong> Expand cohorts with category CAGR (12-18%)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content-to-Commerce Engine */}
      <Card className="bg-secondary/10 border-secondary/20">
        <CardContent className="p-5 space-y-3">
          <h3 className="text-xl font-bold">Content-to-Commerce Engine</h3>
          <p className="text-sm text-muted-foreground">We don't chase users, they find us:</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <p>✓ <strong>14K+ AI-assisted pages</strong> → organic discovery</p>
              <p>✓ <strong>Behavioral signals</strong> → right timing</p>
              <p>✓ <strong>Embedded CTAs</strong> → zero-CAC conversions</p>
            </div>
            <div className="space-y-1 text-muted-foreground">
              <p>→ Stock research → Broker widget</p>
              <p>→ MF deep-dive → SIP quick-start</p>
              <p>→ MF liquidity article → LAMF calculator</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Line */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-5">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-center">Bottom Line</h3>
            <div className="grid md:grid-cols-3 gap-3 text-center text-sm">
              <div>
                <p className="text-muted-foreground">Start Small</p>
                <p className="text-lg font-bold">13,400 users</p>
                <p className="text-xs">₹1.13 cr revenue (Y1)</p>
              </div>
              <div>
                <p className="text-muted-foreground">Prove It</p>
                <p className="text-lg font-bold">Fixed cohorts</p>
                <p className="text-xs">Zero-CAC, validate economics</p>
              </div>
              <div>
                <p className="text-muted-foreground">Scale Smart</p>
                <p className="text-lg font-bold">3.4M+ users</p>
                <p className="text-xs">₹460 cr revenue (Y10)</p>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-3">
              Not betting on the whole market. Just <strong>3 focused personas, proven playbook, disciplined scale.</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
