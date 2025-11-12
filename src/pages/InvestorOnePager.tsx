import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Users, Zap, Building2, DollarSign, Shield } from "lucide-react";

const InvestorOnePager = () => {
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
          <h1 className="text-4xl font-bold text-primary">DISCVR.AI</h1>
          <p className="text-xl text-muted-foreground">Building India's biggest financial distribution platform</p>
          <a href="https://discvr.ai" className="text-sm text-primary hover:underline">discvr.ai</a>
        </div>

        {/* Executive Snapshot */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Executive Snapshot</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              DISCVR.AI is creating a content-to-commerce financial intelligence platform that connects Indian consumers to the right financial products through trusted content, not ads. They are solving two main problems: 1) High customer acquisition costs (CAC) plaguing Indian fintech, and 2) Poor product discovery and financial literacy for consumers. DISCVR.AI launched in 2025 as a content-first platform and is facilitating financial product distribution through organic discovery—producing 180-500 daily articles, 14K+ AI-assisted research pages, and habit-forming engagement tools (quizzes, polls, virtual portfolio analysis) that convert readers to transactors at zero CAC.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              DISCVR.AI has established strategic partnerships with CMOTS (India exchanges data), FMP (US exchanges), Smallcase (LAMF), Augmont (Gold/Silver), ETMoney, and Mpokket (Personal Loans). The platform focuses on four beachhead categories: Loan Against Mutual Funds (LAMF), Digital Gold, Digital Silver, and Personal Loans targeting ~6.2M users in under-penetrated segments.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              Till date, DISCVR.AI has scaled from 11K monthly sessions (Sep 2024) to 100K run-rate (Nov 2024) with 3+ min average session duration and ~10% organic reach—demonstrating early product-market fit in content-led financial distribution.
            </p>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Team */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Team
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-lg">Shubham Srivastava, Founder & CEO</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      2nd-time founder with 20+ years scaling digital platforms. Ex-CTO Hindustan Times Digital (10M to 100M+ MAU), Ex-CTO Eureka Forbes (1M+ MAU), Ex-MakeMyTrip (Hotels LOB). Founded Tekch (PropTech SaaS). B.Tech, IIT(ISM) Dhanbad.
                    </p>
                    <a 
                      href="https://www.linkedin.com/in/shubhamsrivastava1/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>

                  <div>
                    <p className="font-bold">Smriti Srivastava, Co-Founder</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Equal equity partner, contributing to strategic direction and operations.
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-sm mb-2">Advisory Team:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li><span className="font-semibold">Sharat Singh</span> – Tech Advisor (Ex-CTO MakeMyTrip, Ex-CTO Nexttag)</li>
                      <li><span className="font-semibold">Anil Singh</span> – Content & SEO Lead (Ex-TOI, Ex-HT, part-time employed)</li>
                      <li><span className="font-semibold">Inderpreet Singh</span> – Growth & Marketing Advisor (Ex-TataSky, Business Head OTTPlay)</li>
                      <li><span className="font-semibold">Ramji Tripathi</span> – Product Advisor (Ex-TOI, Ex-HT, Ex-Airtel, VP Reliance)</li>
                      <li><span className="font-semibold">Abhishek Singh</span> – Finance & Compliance (Enabled Indmoney 0-1, part-time employed)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financials */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                  <DollarSign className="w-6 h-6" />
                  Financials
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-sm mb-2">Bootstrapped to date:</p>
                    <p className="text-sm text-muted-foreground">
                      ₹1.0 crore total founder investment (₹50L business investment + ₹50L self-funded founder salary)
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-sm mb-2">Revenue Projections:</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Dec25-Mar26:</span>
                        <span className="font-semibold">₹7,439</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FY26:</span>
                        <span className="font-semibold">₹6.93 lakh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FY27:</span>
                        <span className="font-semibold">₹73.95 lakh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FY28:</span>
                        <span className="font-semibold">₹3.93 crore</span>
                      </div>
                      <div className="flex justify-between border-t pt-1 mt-1">
                        <span className="font-bold">FY29 (Break-even):</span>
                        <span className="font-bold text-green-600">₹7.75 crore (16.64% EBITDA)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FY30:</span>
                        <span className="font-semibold">₹10.21 crore (26.47% EBITDA)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-bold text-sm mb-2">Revenue Model:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>0.6% commission on LAMF disbursals</li>
                      <li>2% commission on Digital Gold purchases</li>
                      <li>2% commission on Digital Silver purchases</li>
                      <li>1.5% commission on Personal Loan disbursals</li>
                    </ul>
                  </div>

                  <div className="bg-primary/10 p-3 rounded">
                    <p className="font-bold text-sm mb-2">Unit Economics (FY29):</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">LTV/CAC:</span>
                        <span className="font-bold ml-2">17.5x</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">CAC:</span>
                        <span className="font-bold ml-2">₹3.15</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">LTV:</span>
                        <span className="font-bold ml-2">₹55.13</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Retention:</span>
                        <span className="font-bold ml-2">65%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Market
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-4 rounded">
                    <p className="font-bold text-2xl text-primary">₹53,750 crore</p>
                    <p className="text-xs text-muted-foreground">Year 1 Market Opportunity</p>
                    <p className="font-bold text-xl text-primary mt-2">₹1,63,399 crore</p>
                    <p className="text-xs text-muted-foreground">Year 10 Market Opportunity ($18.15B USD)</p>
                  </div>

                  <div>
                    <p className="font-bold text-sm mb-2">Target Segments:</p>
                    <div className="space-y-2 text-xs">
                      <div className="bg-muted/50 p-2 rounded">
                        <p className="font-semibold">LAMF</p>
                        <p className="text-muted-foreground">1.2M SIP-heavy investors in top-8 metros with ₹10L+ MF holdings</p>
                        <p className="text-primary font-semibold mt-1">Market: ₹37,350 cr to ₹1,03,460 cr</p>
                      </div>
                      <div className="bg-muted/50 p-2 rounded">
                        <p className="font-semibold">Digital Gold</p>
                        <p className="text-muted-foreground">3M UPI-native savers aged 23-35 in Tier-1/2 cities</p>
                        <p className="text-primary font-semibold mt-1">Market: ₹14,000 cr to ₹49,280 cr</p>
                      </div>
                      <div className="bg-muted/50 p-2 rounded">
                        <p className="font-semibold">Digital Silver</p>
                        <p className="text-muted-foreground">1M value-conscious early adopters seeking inflation hedge</p>
                        <p className="text-primary font-semibold mt-1">Market: ₹2,400 cr to ₹10,659 cr</p>
                      </div>
                      <div className="bg-muted/50 p-2 rounded">
                        <p className="font-semibold">Personal Loans</p>
                        <p className="text-muted-foreground">1M users seeking sub-₹25K loans</p>
                        <p className="text-primary font-semibold mt-1">Market: ₹1,00,000 cr to ₹2,77,308 cr</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
                    <p className="font-bold text-sm mb-1">Current Traction:</p>
                    <p className="text-xs text-muted-foreground">
                      11K to 25K to 100K monthly sessions (Sep-Nov 2024), 3+ min session duration, 10% organic reach
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Competitors */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Competitors
                </h2>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-bold">Groww & Jar</p>
                    <p className="text-xs text-muted-foreground">
                      New-age fintech with strong brand recall through paid acquisition and subsidized growth. DISCVR.AI differentiates through content-led, habit-forming flywheel vs. high-CAC paid funnels.
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">PhonePe & HDFC</p>
                    <p className="text-xs text-muted-foreground">
                      Established financial services players relying on recall and one-size-fits-all product offerings. DISCVR.AI offers AI-personalized discovery based on behavioral signals.
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">Zepto & Blinkit</p>
                    <p className="text-xs text-muted-foreground">
                      Quick-commerce platforms expanding into financial products through paid acquisition. DISCVR.AI leverages organic content-to-commerce graph with zero-CAC distribution.
                    </p>
                  </div>

                  <div className="bg-primary/10 p-3 rounded mt-4">
                    <p className="font-bold text-sm mb-2">Key Moats:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                      <li>14K+ AI-personalized research pages with behavioral data layer</li>
                      <li>Content-to-commerce flywheel (180-500 articles/day creating permanent growth assets)</li>
                      <li>Habit stack (quizzes, polls, watchlists, alerts, WhatsApp/Telegram communities)</li>
                      <li>Focused beachheads in under-penetrated categories (LAMF, digital precious metals)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Funding Round Details */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Funding Round Details
                </h2>
                
                <div className="space-y-4">
                  <div className="text-center bg-background/80 p-4 rounded">
                    <p className="text-sm text-muted-foreground mb-1">Looking to raise</p>
                    <p className="text-3xl font-bold text-primary">₹4.2 crore</p>
                    <p className="text-sm font-semibold mt-1">Pre-Seed Round</p>
                  </div>

                  <div>
                    <p className="font-bold text-sm mb-2">Use of Funds:</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Tech + Product (27.60%)</span>
                        <span className="font-semibold">₹1.159 cr</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Content + SEO (19.88%)</span>
                        <span className="font-semibold">₹83.5 lakh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Infrastructure + Tools (9.88%)</span>
                        <span className="font-semibold">₹41.5 lakh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sales (9.76%)</span>
                        <span className="font-semibold">₹41 lakh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Marketing (6.33%)</span>
                        <span className="font-semibold">₹26.58 lakh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Support + Office (4.74%)</span>
                        <span className="font-semibold">₹19.9 lakh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compliance (1.71%)</span>
                        <span className="font-semibold">₹7.2 lakh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Buffer (20.10%)</span>
                        <span className="font-semibold">₹84.42 lakh</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Funding Terms */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-primary">Funding Terms</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">Type:</span>
                    <span>Convertible Notes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Discount to Next Round:</span>
                    <span>25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Pre-Money Valuation Cap:</span>
                    <span>TBD</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Milestone */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                  <Zap className="w-6 h-6" />
                  Next Milestone
                </h2>
                
                <p className="text-sm text-muted-foreground mb-3">
                  With <span className="font-bold text-primary">₹4.2 crore raised</span>, DISCVR.AI aims to hit:
                </p>

                <div className="space-y-2 text-sm">
                  <div className="bg-muted/50 p-3 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-bold">10M Monthly Active Users</span>
                    </div>
                    <p className="text-xs text-muted-foreground">(from 1M baseline)</p>
                  </div>

                  <div className="bg-muted/50 p-3 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="font-bold">₹7.75 crore revenue in FY29</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Break-even profitability (16.64% EBITDA margin)</p>
                  </div>

                  <div className="bg-muted/50 p-3 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      <span className="font-bold">Scale distribution partnerships</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Across LAMF, Gold, Silver, and Personal Loans</p>
                  </div>

                  <div className="bg-muted/50 p-3 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="font-bold">Expand product stack</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Insurance, smallcases, Loan Against Securities, and B2B SaaS layer</p>
                  </div>
                </div>

                <div className="mt-4 bg-primary/10 p-3 rounded text-center">
                  <p className="text-sm font-bold text-primary">Timeline: 18-36 months (targeting FY29 break-even)</p>
                </div>
              </CardContent>
            </Card>

            {/* Capitalization Table */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-primary">Capitalization Table</h2>
                
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Stakeholder</th>
                      <th className="text-right py-2">Equity</th>
                      <th className="text-right py-2">Invested</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Shubham Srivastava (Founder)</td>
                      <td className="text-right">50%</td>
                      <td className="text-right">₹50 lakh</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Smriti Srivastava (Co-Founder)</td>
                      <td className="text-right">50%</td>
                      <td className="text-right">₹50 lakh</td>
                    </tr>
                    <tr className="font-bold">
                      <td className="py-2">Total</td>
                      <td className="text-right">100%</td>
                      <td className="text-right">₹1.0 crore</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-xs text-muted-foreground mt-3">
                  *Note: ₹1.0 crore includes ₹50 lakh direct business investment + ₹50 lakh self-funded founder salary (no salary drawn from company account)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Contact */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold">Contact</h3>
              <p className="font-semibold">Shubham Srivastava</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a href="mailto:shubham@discvr.ai" className="hover:underline">shubham@discvr.ai</a>
                <span>|</span>
                <a href="tel:+919873961591" className="hover:underline">+91 98739 61591</a>
                <span>|</span>
                <a 
                  href="https://www.linkedin.com/in/shubhamsrivastava1/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestorOnePager;
