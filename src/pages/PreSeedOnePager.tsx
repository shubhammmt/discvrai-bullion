import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PreSeedOnePager = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background p-8 print:p-0">
      <style>{`
        @media print {
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
        }
      `}</style>

      <Button 
        onClick={handlePrint}
        className="no-print fixed top-4 right-4 z-50"
        size="lg"
      >
        Print / Save as PDF
      </Button>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pb-4 border-b-2 border-primary">
          <h1 className="text-4xl font-bold text-primary">Discvr.ai</h1>
          <p className="text-xl text-muted-foreground">India's Financial Services Distribution Platform</p>
          <div className="flex gap-3 justify-center items-center">
            <Badge variant="secondary" className="text-sm">Pre-Seed Round</Badge>
            <Badge variant="secondary" className="text-sm">$500K - $1M</Badge>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Problem */}
            <Card>
              <CardContent className="pt-4">
                <h2 className="text-lg font-bold mb-3 text-primary">The Distribution Problem</h2>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    India's ₹400T+ financial products market faces a massive distribution challenge:
                  </p>
                  <ul className="space-y-1.5 text-muted-foreground list-disc pl-4">
                    <li><span className="font-semibold">95%</span> of users discover on Google/social but execute elsewhere</li>
                    <li><span className="font-semibold">₹50,000+ Cr</span> spent annually on customer acquisition by product providers</li>
                    <li>Fragmented journey: 5-7 platforms between discovery and execution</li>
                    <li>Product providers have no direct distribution channel to end users</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card>
              <CardContent className="pt-4">
                <h2 className="text-lg font-bold mb-3 text-primary">The Discvr.ai Platform</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  We're building India's unified financial services distribution platform - bridging the gap between discovery and execution.
                </p>
                <div className="space-y-2">
                  <div className="bg-primary/10 p-2 rounded">
                    <p className="font-semibold text-sm">For Users</p>
                    <p className="text-xs text-muted-foreground">AI-powered discovery → Personalized recommendations → One-click execution</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded">
                    <p className="font-semibold text-sm">For Product Providers</p>
                    <p className="text-xs text-muted-foreground">Direct distribution channel + performance marketing platform</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Founder's Distribution DNA */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="pt-4">
                <h2 className="text-lg font-bold mb-3 text-primary">Founder's Distribution DNA</h2>
                <p className="text-sm font-semibold mb-2">Shubham Srivastava - Built to Solve Distribution at Scale</p>
                
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

            {/* Revenue Streams */}
            <Card>
              <CardContent className="pt-4">
                <h2 className="text-lg font-bold mb-3 text-primary">Revenue Streams</h2>
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
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Market Opportunity */}
            <Card>
              <CardContent className="pt-4">
                <h2 className="text-lg font-bold mb-3 text-primary">Market Opportunity</h2>
                <div className="space-y-2 text-sm">
                  <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-3 rounded">
                    <p className="font-bold text-2xl text-primary">₹400T+</p>
                    <p className="text-xs text-muted-foreground">Total Addressable Market (Financial Products)</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted p-2 rounded">
                      <p className="font-bold text-lg">₹50K+ Cr</p>
                      <p className="text-xs text-muted-foreground">Annual CAC Spend</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-bold text-lg">500M+</p>
                      <p className="text-xs text-muted-foreground">Internet Users</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">
                    <span className="font-semibold">Why Now:</span> India's digital-first generation needs a unified platform. Traditional distributors can't serve digital natives at scale.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Traction */}
            <Card>
              <CardContent className="pt-4">
                <h2 className="text-lg font-bold mb-3 text-primary">Current Traction</h2>
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

            {/* 18-Month Plan */}
            <Card>
              <CardContent className="pt-4">
                <h2 className="text-lg font-bold mb-3 text-primary">18-Month Projections</h2>
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
              <CardContent className="pt-4">
                <h2 className="text-lg font-bold mb-3 text-primary">Team & Go-To-Market</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold mb-1">Current Team: 12 people</p>
                    <p className="text-xs text-muted-foreground">3 devs, 2 dev-interns, 3 writers, 1 SEO, 1 analyst, 1 BD, 1 video</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">GTM Strategy: Organic-First</p>
                    <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                      <li>180→410 articles/day (AI-assisted)</li>
                      <li>77% organic traffic by M18</li>
                      <li>Weekly contests for virality</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Use of Funds */}
            <Card>
              <CardContent className="pt-4">
                <h2 className="text-lg font-bold mb-3 text-primary">Use of Funds</h2>
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

        {/* Footer */}
        <div className="text-center pt-4 border-t text-sm text-muted-foreground">
          <p>Shubham Srivastava • Founder & CEO</p>
          <p>shubham@discvr.ai • +91-XXXXXXXXXX</p>
        </div>
      </div>
    </div>
  );
};

export default PreSeedOnePager;