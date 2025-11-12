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

      {/* User Cohorts */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <Target className="w-6 h-6 text-primary" />
          Our Focus: 4 User Cohorts
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* LAMF Cohort */}
          <Card className="border-primary/20">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">LAMF SIP-heavy investors</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Who:</strong> 1.2M investors, top-8 metros, age 30-50
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Pain:</strong> Need liquidity without breaking compounding
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Market:</strong> ₹37,350 cr (Y1) → ₹1,03,460 cr (Y10)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Digital Gold Cohort */}
          <Card className="border-primary/20">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Digital Gold micro-savers</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Who:</strong> 3M UPI-native savers, age 23-35, Tier-1/2 cities
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Pain:</strong> Want convenience + transparency in gold
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Market:</strong> ₹14,000 cr (Y1) → ₹49,280 cr (Y10)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Digital Silver Cohort */}
          <Card className="border-primary/20">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Digital Silver value seekers</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Who:</strong> 1M early adopters, age 25-40
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Pain:</strong> Want inflation hedge via ₹3K/month SIPs
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Market:</strong> ₹2,400 cr (Y1) → ₹10,659 cr (Y10)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Loan Cohort */}
          <Card className="border-primary/20">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Personal Loan seekers</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Who:</strong> 1M users seeking sub-₹25K loans
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Pain:</strong> Underbanked, need quick small-ticket credit
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Market:</strong> ₹1,00,000 cr (Y1) → ₹2,77,308 cr (Y10)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Market Sizing Table */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Market Sizing Across Categories
        </h2>
        
        <Card>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-bold">Product</th>
                    <th className="text-center p-2 font-bold" colSpan={2}>Year 1</th>
                    <th className="text-center p-2 font-bold" colSpan={2}>Year 5</th>
                    <th className="text-center p-2 font-bold" colSpan={2}>Year 10</th>
                  </tr>
                  <tr className="border-b text-xs text-muted-foreground">
                    <th></th>
                    <th className="text-right p-2">₹ Cr</th>
                    <th className="text-right p-2">$ M</th>
                    <th className="text-right p-2">₹ Cr</th>
                    <th className="text-right p-2">$ M</th>
                    <th className="text-right p-2">₹ Cr</th>
                    <th className="text-right p-2">$ M</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-medium">LAMF</td>
                    <td className="text-right p-2">37,350</td>
                    <td className="text-right p-2">4,150</td>
                    <td className="text-right p-2">58,640</td>
                    <td className="text-right p-2">6,516</td>
                    <td className="text-right p-2">1,03,460</td>
                    <td className="text-right p-2">11,496</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Digital Gold</td>
                    <td className="text-right p-2">14,000</td>
                    <td className="text-right p-2">1,556</td>
                    <td className="text-right p-2">24,500</td>
                    <td className="text-right p-2">2,722</td>
                    <td className="text-right p-2">49,280</td>
                    <td className="text-right p-2">5,476</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Digital Silver</td>
                    <td className="text-right p-2">2,400</td>
                    <td className="text-right p-2">267</td>
                    <td className="text-right p-2">4,653</td>
                    <td className="text-right p-2">517</td>
                    <td className="text-right p-2">10,659</td>
                    <td className="text-right p-2">1,184</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Personal Loan</td>
                    <td className="text-right p-2">1,00,000</td>
                    <td className="text-right p-2">11,111</td>
                    <td className="text-right p-2">1,57,352</td>
                    <td className="text-right p-2">17,484</td>
                    <td className="text-right p-2">2,77,308</td>
                    <td className="text-right p-2">30,812</td>
                  </tr>
                  <tr className="bg-primary/5 font-bold">
                    <td className="p-2">TOTAL TAM</td>
                    <td className="text-right p-2">1,53,750</td>
                    <td className="text-right p-2">17,084</td>
                    <td className="text-right p-2">2,45,145</td>
                    <td className="text-right p-2">27,239</td>
                    <td className="text-right p-2">4,40,707</td>
                    <td className="text-right p-2">48,968</td>
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
            <p className="text-center text-sm font-medium">
              Four focused cohorts across under-penetrated categories, targeting <span className="font-bold text-primary">₹1.54 lakh cr ($17B)</span> Year 1 TAM scaling to <span className="font-bold text-primary">₹4.41 lakh cr ($49B)</span> by Year 10.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
