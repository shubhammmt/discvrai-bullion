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

            {/* Revenue Streams */}
            <Card>
              <CardContent className="pt-4">
                <h2 className="text-lg font-bold mb-3 text-primary">Revenue Streams</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="font-medium">Distribution Fees</span>
                    <span className="font-bold">₹15L/month</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="font-medium">Performance Marketing</span>
                    <span className="font-bold">₹25L/month</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="font-medium">Premium Subscriptions</span>
                    <span className="font-bold">₹5L/month</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-primary text-primary-foreground rounded font-bold">
                    <span>Target (Month 18)</span>
                    <span>₹5.4 Cr ARR</span>
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
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-green-50 dark:bg-green-950/20 p-2 rounded text-center">
                    <p className="text-xs text-muted-foreground mb-1">Product</p>
                    <p className="font-bold text-green-600 dark:text-green-400">Live Beta</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-2 rounded text-center">
                    <p className="text-xs text-muted-foreground mb-1">Beta Users</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">500+</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/20 p-2 rounded text-center">
                    <p className="text-xs text-muted-foreground mb-1">Engagement</p>
                    <p className="font-bold text-purple-600 dark:text-purple-400">12 min avg</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-950/20 p-2 rounded text-center">
                    <p className="text-xs text-muted-foreground mb-1">B2B Pipeline</p>
                    <p className="font-bold text-orange-600 dark:text-orange-400">8 AMCs</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 18-Month Plan */}
            <Card>
              <CardContent className="pt-4">
                <h2 className="text-lg font-bold mb-3 text-primary">18-Month Milestones</h2>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-4 gap-1 font-semibold border-b pb-1">
                    <div>Month</div>
                    <div className="text-right">MAUs</div>
                    <div className="text-right">Revenue</div>
                    <div className="text-right">Profit</div>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-muted-foreground">
                    <div>M6</div>
                    <div className="text-right">50K</div>
                    <div className="text-right">₹5L</div>
                    <div className="text-right text-red-500">-₹15L</div>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-muted-foreground">
                    <div>M12</div>
                    <div className="text-right">200K</div>
                    <div className="text-right">₹25L</div>
                    <div className="text-right text-red-500">-₹5L</div>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-muted-foreground bg-green-50 dark:bg-green-950/20 p-1 rounded">
                    <div className="font-semibold">M14</div>
                    <div className="text-right font-semibold">250K</div>
                    <div className="text-right font-semibold">₹30L</div>
                    <div className="text-right font-bold text-green-600 dark:text-green-400">Break-even</div>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-muted-foreground">
                    <div className="font-semibold">M18</div>
                    <div className="text-right font-semibold">500K</div>
                    <div className="text-right font-semibold">₹45L</div>
                    <div className="text-right font-bold text-green-600 dark:text-green-400">+₹10L</div>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-primary/10 rounded">
                  <p className="text-xs font-semibold">Key Metrics:</p>
                  <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
                    <div>• LTV: ₹25,000</div>
                    <div>• CAC: ₹500</div>
                    <div>• LTV/CAC: 50x</div>
                    <div>• Payback: 2 months</div>
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
                    <p className="font-semibold mb-1">Current Team: 6</p>
                    <p className="text-xs text-muted-foreground">2 Engineering • 2 Product • 1 Design • 1 Content</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">GTM Strategy: Organic-First</p>
                    <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                      <li>SEO-optimized financial content (target: 1M+ monthly organic traffic by M12)</li>
                      <li>Community-driven growth via contests & engagement</li>
                      <li>Performance marketing to high-intent users (CAC: ₹500)</li>
                      <li>B2B partnerships with AMCs, brokers, insurers for distribution</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Use of Funds */}
            <Card>
              <CardContent className="pt-4">
                <h2 className="text-lg font-bold mb-3 text-primary">Use of Funds</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-muted rounded">
                    <span>Engineering & Product</span>
                    <span className="font-bold">40%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted rounded">
                    <span>Marketing & Growth</span>
                    <span className="font-bold">30%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted rounded">
                    <span>Compliance & Licensing</span>
                    <span className="font-bold">15%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted rounded">
                    <span>Operations & Infrastructure</span>
                    <span className="font-bold">15%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  18-month runway to profitability with capital efficiency as core principle.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-4 border-t text-sm text-muted-foreground">
          <p>Shubham Chaudhary • Founder & CEO</p>
          <p>shubham@discvr.ai • +91-XXXXXXXXXX</p>
        </div>
      </div>
    </div>
  );
};

export default PreSeedOnePager;