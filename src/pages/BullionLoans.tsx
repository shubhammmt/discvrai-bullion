import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BullionNavTabs } from '@/components/bullion';
import { ArrowLeft, Bell, User } from 'lucide-react';
import {
  Shield,
  Landmark,
  Wallet,
  ArrowRight,
  FileText,
  CreditCard,
  Building,
  CheckCircle2,
  Clock,
  TrendingUp,
  Calculator,
  BadgeCheck,
  RefreshCw,
  IndianRupee,
  ArrowDownUp,
  Percent,
  HelpCircle,
  MessageCircle
} from 'lucide-react';

const BullionLoans = () => {
  const navigate = useNavigate();
  const [mfHoldings, setMfHoldings] = useState(500000);
  const [ltvPercent, setLtvPercent] = useState(65);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(12);
  const [simulateNavDrop, setSimulateNavDrop] = useState(false);

  const navDropFactor = simulateNavDrop ? 0.8 : 1;
  const effectiveHoldings = mfHoldings * navDropFactor;
  const eligibleLimit = Math.round(effectiveHoldings * (ltvPercent / 100));
  const [chosenAmount, setChosenAmount] = useState(Math.min(250000, eligibleLimit));
  const monthlyInterest = Math.round((chosenAmount * (interestRate / 100)) / 12);
  const totalInterest = monthlyInterest * tenure;

  const handleChosenAmountChange = (value: number[]) => {
    setChosenAmount(Math.min(value[0], eligibleLimit));
  };

  const howItWorksSteps = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Import MF holdings",
      description: "Verify PAN & mobile to fetch units"
    },
    {
      icon: <IndianRupee className="w-5 h-5" />,
      title: "Select amount & pledge",
      description: "Choose amount and confirm units"
    },
    {
      icon: <Building className="w-5 h-5" />,
      title: "Link bank & e-sign",
      description: "Set up mandate and sign digitally"
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: "Review & disbursal",
      description: "Lender reviews and disburses"
    }
  ];

  const understandingCards = [
    {
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      title: "What happens to my mutual funds?",
      points: [
        "Units stay in your name with a lien",
        "You keep earning returns/dividends",
        "Lien is released once the loan is closed"
      ]
    },
    {
      icon: <ArrowDownUp className="w-6 h-6 text-cyan-500" />,
      title: "Why choose LAMF over redeeming?",
      points: [
        "Rates start at 10.20% p.a.",
        "No exit load or tax trigger",
        "Top up or repay anytime"
      ]
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-amber-500" />,
      title: "How do repayments work?",
      points: [
        "Interest auto-debited monthly via mandate",
        "Withdraw again once you repay",
        "Foreclose anytime without penalty"
      ]
    }
  ];

  const comparisonData = [
    { type: "LAMF", rate: "10.20-15%", speed: "Same day", cibil: "No impact", highlight: true },
    { type: "Auto Loan", rate: "12-15%", speed: "3-5 days", cibil: "Impacts score", highlight: false },
    { type: "Personal Loan", rate: "14-28%", speed: "1-3 days", cibil: "Impacts score", highlight: false },
    { type: "Credit Card", rate: "24-42%", speed: "Instant", cibil: "Impacts score", highlight: false }
  ];

  const faqItems = [
    {
      question: "What is the minimum and maximum loan amount?",
      answer: "Minimum loan amount is typically ₹25,000 and maximum depends on your MF holdings and LTV ratio offered by the lender, usually up to 50-80% of your eligible holdings."
    },
    {
      question: "Which mutual funds are eligible for pledging?",
      answer: "Most equity, debt, and hybrid mutual funds from major AMCs are eligible. However, ELSS funds (with lock-in) and certain sectoral funds may not be accepted."
    },
    {
      question: "How long does the disbursal take?",
      answer: "Once your application is approved and e-sign is completed, funds are typically disbursed within 2-4 hours during banking hours."
    },
    {
      question: "Can I sell or redeem my pledged mutual funds?",
      answer: "No, pledged units cannot be sold or redeemed until the loan is fully repaid and the lien is released. However, you can pledge additional units."
    },
    {
      question: "What happens if NAV drops significantly?",
      answer: "If NAV drops below a threshold, you may receive a margin call requiring you to pledge more units or repay part of the loan to maintain the required LTV ratio."
    },
    {
      question: "Are there any hidden charges?",
      answer: "Most LAMF providers have transparent pricing with no foreclosure charges. Processing fees typically range from 0.5-1% of the loan amount."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Loan Against Mutual Funds | Discvr Bullion</title>
        <meta name="description" content="Get instant loans against your mutual fund holdings. Lower rates, same-day disbursal, and no foreclosure charges." />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-7xl items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/bullion')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="font-semibold text-lg">Discvr Bullion</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <BullionNavTabs />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
              <Shield className="w-3.5 h-3.5 mr-1.5" />
              Secure liquidity without selling
            </Badge>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Loan Against<br />Mutual Funds
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Access funds quickly while staying invested.{' '}
              <span className="text-foreground font-medium">Lower rates (10.20-15% p.a.)</span>,{' '}
              <span className="text-foreground font-medium">same-day disbursal</span>, and{' '}
              <span className="text-foreground font-medium">no foreclosure charges</span>.
            </p>

            <Button 
              size="lg" 
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8"
              onClick={() => navigate('/lamf')}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                Ownership retained
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                RBI-regulated
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                Interest-only
              </div>
            </div>
          </div>

          {/* How it Works Card */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-cyan-500" />
                How it works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                      {step.icon}
                    </div>
                    {index < howItWorksSteps.length - 1 && (
                      <div className="absolute ml-4 mt-10 w-0.5 h-6 bg-border" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Understanding LAMF Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Understanding LAMF</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {understandingCards.map((card, index) => (
              <Card key={index} className="bg-card/50 border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    {card.icon}
                    <HelpCircle className="w-4 h-4 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">{card.title}</h3>
                  <ul className="space-y-2">
                    {card.points.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Calculator Section */}
        <section className="mb-16">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Loan Against Mutual Funds Calculator</CardTitle>
              <p className="text-muted-foreground">Estimate eligible limit and monthly interest. This is illustrative only.</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6 p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Simulate NAV drop</span>
                  <HelpCircle className="w-4 h-4 text-muted-foreground/50" />
                </div>
                <Switch 
                  checked={simulateNavDrop} 
                  onCheckedChange={setSimulateNavDrop}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Total MF holdings (₹)</label>
                    <Input
                      type="number"
                      value={mfHoldings}
                      onChange={(e) => setMfHoldings(Number(e.target.value))}
                      className="text-lg"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-muted-foreground">Eligible LTV (%)</label>
                      <span className="text-sm font-medium">{ltvPercent}%</span>
                    </div>
                    <Slider
                      value={[ltvPercent]}
                      onValueChange={(v) => setLtvPercent(v[0])}
                      min={50}
                      max={80}
                      step={5}
                      className="py-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Typical range varies by fund type and partner policy.</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-muted-foreground">Interest rate (p.a.)</label>
                      <span className="text-sm font-medium">{interestRate}%</span>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(v) => setInterestRate(v[0])}
                      min={9}
                      max={15}
                      step={0.5}
                      className="py-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-muted-foreground">Tenure (months)</label>
                      <span className="text-sm font-medium">{tenure}</span>
                    </div>
                    <Slider
                      value={[tenure]}
                      onValueChange={(v) => setTenure(v[0])}
                      min={3}
                      max={36}
                      step={3}
                      className="py-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-muted-foreground">Chosen loan amount (₹)</label>
                      <span className="text-sm font-medium">₹{chosenAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <Slider
                      value={[chosenAmount]}
                      onValueChange={handleChosenAmountChange}
                      min={25000}
                      max={eligibleLimit}
                      step={10000}
                      className="py-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Max eligible: ₹{eligibleLimit.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-muted/30 border-0">
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground mb-1">Eligible limit</p>
                      <p className="text-2xl font-bold text-foreground">₹{eligibleLimit.toLocaleString('en-IN')}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30 border-0">
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground mb-1">Chosen amount</p>
                      <p className="text-2xl font-bold text-cyan-500">₹{chosenAmount.toLocaleString('en-IN')}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30 border-0">
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground mb-1">Monthly interest (est.)</p>
                      <p className="text-2xl font-bold text-amber-500">₹{monthlyInterest.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-muted-foreground mt-1">Interest-only. Exact amount varies with lender policy.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30 border-0">
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground mb-1">Interest over tenure</p>
                      <p className="text-2xl font-bold text-foreground">₹{totalInterest.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-muted-foreground mt-1">Illustrative calculation for selected tenure.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Comparison Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Compare with Other Options</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-muted-foreground font-medium">Loan Type</th>
                  <th className="text-left py-4 px-4 text-muted-foreground font-medium">Interest Rate</th>
                  <th className="text-left py-4 px-4 text-muted-foreground font-medium">Disbursal Speed</th>
                  <th className="text-left py-4 px-4 text-muted-foreground font-medium">CIBIL Impact</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-border/50 ${row.highlight ? 'bg-cyan-500/5' : ''}`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {row.highlight && <BadgeCheck className="w-4 h-4 text-cyan-500" />}
                        <span className={row.highlight ? 'font-semibold text-cyan-500' : 'text-foreground'}>
                          {row.type}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-foreground">{row.rate}</td>
                    <td className="py-4 px-4 text-foreground">{row.speed}</td>
                    <td className="py-4 px-4">
                      <span className={row.highlight ? 'text-emerald-500 font-medium' : 'text-muted-foreground'}>
                        {row.cibil}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Card className="bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12 px-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-cyan-500/10 border border-cyan-500/20">
          <h2 className="text-3xl font-bold mb-4">Ready to unlock your mutual fund wealth?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get instant liquidity without selling your investments. Start your LAMF journey today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8"
              onClick={() => navigate('/lamf')}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-cyan-500/50 text-cyan-500 hover:bg-cyan-500/10"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Ask LAMF Agent
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BullionLoans;
