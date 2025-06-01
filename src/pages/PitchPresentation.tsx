
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Presentation, ArrowLeft, Brain, TrendingUp, Users, DollarSign, Target, Shield, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PitchPresentation = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "DISCVR.AI",
      subtitle: "India's AI-Powered Financial Platform",
      author: "by Shubham Srivastava",
      type: "title",
      icon: Brain
    },
    {
      id: 2,
      title: "The Financial Complexity Crisis",
      type: "problem",
      icon: Target,
      stats: [
        { number: "83%", label: "Without Guidance", description: "83% of Indians make financial decisions without professional guidance, leading to suboptimal choices" },
        { number: "40+", label: "Hours Research", description: "The average Indian spends over 40 hours researching before making financial decisions, highlighting the complexity" },
        { number: "3,000+", label: "Products", description: "There are over 3,000 financial products available, including 1,500+ mutual fund schemes and 800+ insurance policies" }
      ]
    },
    {
      id: 3,
      title: "AI-Powered Discovery → One-Click Execution",
      type: "solution",
      icon: Rocket,
      features: [
        { title: "Comprehensive Discovery", description: "All financial products on one platform" },
        { title: "AI-Powered Recommendations", description: "Based on income, goals, and risk profile" },
        { title: "Transparent Comparison", description: "Real-time pricing, fees, and performance data" },
        { title: "One-Click Execution", description: "Seamless purchase across all product categories" },
        { title: "Ongoing Optimisation", description: "Continuous portfolio monitoring and rebalancing" }
      ]
    },
    {
      id: 4,
      title: "Market Opportunity",
      subtitle: "$300 Billion Digital Financial Services",
      type: "market",
      icon: TrendingUp,
      marketData: [
        { amount: "$1.2T", label: "Total Market", description: "India's financial services market" },
        { amount: "$300B", label: "Digital Penetration", description: "Current digital market size (25% of total)" },
        { amount: "$180B", label: "Our Focus", description: "Opportunity in insurance, credit, and investments" },
        { amount: "$24B", label: "Addressable Share", description: "Our target market penetration (20%)" }
      ]
    },
    {
      id: 5,
      title: "Revenue Model",
      subtitle: "Transaction-Based, High-Margin Focus",
      type: "revenue",
      icon: DollarSign,
      revenueStreams: [
        {
          title: "Mutual Fund Distribution",
          launch: "Month 4",
          commission: "Trail Commission: 0.1-1% annually",
          target: "Strategy: Customer acquisition tool",
          revenue: "Annual Revenue: $1.2M by Month 12"
        },
        {
          title: "Credit Products", 
          launch: "Month 6",
          commission: "Commission: 1-3% of loan amount",
          target: "Target: 2,000 loans/month by Month 15",
          revenue: "Annual Revenue: $1.9M by Month 15"
        },
        {
          title: "Insurance Distribution",
          launch: "Month 9", 
          commission: "Commission: 5-25% of first-year premium",
          target: "Target: 1,000 policies/month by Month 12",
          revenue: "Annual Revenue: $3.2M by Month 18"
        }
      ]
    },
    {
      id: 6,
      title: "Competitive Analysis",
      subtitle: "Clear Differentiation",
      type: "competition",
      icon: Shield,
      competitors: [
        { platform: "PolicyBazaar", range: "Insurance-heavy", ux: "Poor", monetization: "High (insurance)", advantage: "Multi-product + better UX" },
        { platform: "Groww", range: "Investment-only", ux: "Good", monetization: "Low", advantage: "High-margin focus" },
        { platform: "Zerodha", range: "Trading-focused", ux: "Average", monetization: "Medium", advantage: "Discovery-first approach" },
        { platform: "CRED", range: "Credit-focused", ux: "Excellent", monetization: "Medium", advantage: "Broader product range" },
        { platform: "IndMoney", range: "Investment tracking + Execution", ux: "Poor to Average", monetization: "Low", advantage: "Full execution capability" },
        { platform: "Screener.in", range: "Research-only", ux: "Good", monetization: "Low", advantage: "Execution + Research" },
        { platform: "Dezerv", range: "HNI PMS", ux: "High-touch", monetization: "High", advantage: "Mass market accessibility" }
      ]
    },
    {
      id: 7,
      title: "Network Effects",
      subtitle: "Building Defensible Moats",
      type: "moats",
      icon: Shield,
      effects: [
        { title: "Supply-Side Network Effect", description: "Higher volume leads to better partner terms and exclusive access" },
        { title: "Social Proof Network Effect", description: "Research, Portfolio sharing and investment communities drive engagement" },
        { title: "Operational Network Effect", description: "Scale economics improve user experience and reduce acquisition costs" },
        { title: "Data Network Effect", description: "More users lead to better AI and higher conversion" }
      ]
    },
    {
      id: 8,
      title: "Go-to-Market Strategy",
      subtitle: "Multi-Product Discovery Platform",
      type: "gtm",
      icon: Rocket,
      phases: [
        {
          phase: "Phase 1: Foundation (Months 1-6)",
          description: "Free financial discovery and AI recommendations",
          details: "Stocks, IPO, Mutual Funds [India and US]",
          target: "End State Target: 50K users, $0 revenue"
        },
        {
          phase: "Phase 2: Monetisation (Months 6-12)",
          description: "Launch insurance, mutual fund, and credit platforms",
          details: "",
          target: "End State Target: 200K users, $1.2M annual revenue"
        },
        {
          phase: "Phase 3: Scale (Months 12-18)",
          description: "Advanced analytics, B2B partnerships",
          details: "",
          target: "End State Target: 500K users, $3.2M annual revenue"
        }
      ]
    },
    {
      id: 9,
      title: "Vision",
      subtitle: "India's Financial Operating System",
      type: "vision",
      icon: Brain,
      vision: "Build India's financial operating system, where every Indian accesses personalised AI-powered recommendations and executes seamlessly across all financial products",
      metrics: [
        { metric: "User Engagement", value: "80% of users return within 30 days" },
        { metric: "Conversion Rate", value: "15% of discovery leads to execution" },
        { metric: "Revenue per User", value: "$3.2M revenue run rate by Month 18" },
        { metric: "Market Share", value: "5% of digital financial services by 2027" }
      ]
    },
    {
      id: 10,
      title: "Key Risks",
      type: "risks",
      icon: Target,
      risks: [
        { assumption: "15% Discovery-to-Execution Conversion", level: "🔴 Critical", validation: "MVP with 1,000 users", metric: ">10% conversion rate" },
        { assumption: "$200+ Average Commission per User", level: "🔴 Critical", validation: "Partner with 3 insurers", metric: ">$150 actual commission" },
        { assumption: "AI Trust > Human Advisors", level: "🟡 High", validation: "A/B test recommendations", metric: ">70% AI preference" },
        { assumption: "<$50 Customer Acquisition Cost", level: "🟡 High", validation: "Digital marketing campaigns", metric: "<$75 blended CAC" },
        { assumption: "Regulatory Approval Timeline", level: "🟡 High", validation: "Parallel application process", metric: "<6 months approval" }
      ]
    },
    {
      id: 11,
      title: "Team",
      type: "team",
      icon: Users,
      founder: {
        name: "Shubham Srivastava, CEO & Co-Founder",
        points: [
          "Scale Expert: Built platforms serving 100M+ users at Hindustan Times and build 150+ member team in Makemytrip and HindustanTimes",
          "AI/ML Pioneer: Implemented machine learning at scale across MakeMyTrip and Hindustan Times platforms, now building AI-powered search with Discvr",
          "Leadership: IIT Dhanbad graduate who scaled MakeMyTrip's hotels division and drove 20% cost reduction at EurekaForbes"
        ]
      }
    },
    {
      id: 12,
      title: "Funding Requirements",
      subtitle: "$4M Seed Round",
      type: "funding",
      icon: DollarSign,
      allocation: [
        { percentage: "60%", category: "Team Building", description: "15 engineers + 10 business team members" },
        { percentage: "20%", category: "Technology & AI", description: "Cloud, data, and ML platforms infrastructure" },
        { percentage: "10%", category: "Regulatory & Compliance", description: "Licenses, legal, and compliance expenses" },
        { percentage: "10%", category: "Customer Acquisition", description: "Marketing and user acquisition efforts" }
      ],
      milestones: [
        "Launching insurance distribution by Month 6",
        "Achieving $1.2M annual revenue by Month 12", 
        "Series A ready by Month 18 with 500K users"
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  const renderSlideContent = (slide: any) => {
    const IconComponent = slide.icon;

    switch (slide.type) {
      case 'title':
        return (
          <div className="text-center space-y-8">
            <IconComponent className="w-24 h-24 mx-auto text-blue-600" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {slide.title}
            </h1>
            <p className="text-2xl text-gray-600">{slide.subtitle}</p>
            <p className="text-lg text-gray-500">{slide.author}</p>
          </div>
        );

      case 'problem':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {slide.stats.map((stat: any, index: number) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="space-y-4">
                    <div className="text-4xl font-bold text-red-600">{stat.number}</div>
                    <div className="text-xl font-semibold">{stat.label}</div>
                    <div className="text-gray-600">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'solution':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slide.features.map((feature: any, index: number) => (
                <Card key={index} className="p-6">
                  <CardContent className="space-y-3">
                    <h3 className="text-lg font-semibold text-green-600">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'market':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {slide.marketData.map((data: any, index: number) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold text-blue-600">{data.amount}</div>
                    <div className="text-lg font-semibold">{data.label}</div>
                    <div className="text-sm text-gray-600">{data.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'revenue':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {slide.revenueStreams.map((stream: any, index: number) => (
                <Card key={index} className="p-6">
                  <CardContent className="space-y-4">
                    <h3 className="text-xl font-bold text-green-600">{stream.title}</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Launch:</strong> {stream.launch}</p>
                      <p><strong>Commission:</strong> {stream.commission}</p>
                      <p><strong>Target:</strong> {stream.target}</p>
                      <p className="text-green-600 font-semibold">{stream.revenue}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'competition':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">Platform</th>
                    <th className="border border-gray-300 p-3 text-left">Product Range</th>
                    <th className="border border-gray-300 p-3 text-left">User Experience</th>
                    <th className="border border-gray-300 p-3 text-left">Monetization</th>
                    <th className="border border-gray-300 p-3 text-left">Our Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {slide.competitors.map((comp: any, index: number) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-3 font-semibold">{comp.platform}</td>
                      <td className="border border-gray-300 p-3">{comp.range}</td>
                      <td className="border border-gray-300 p-3">{comp.ux}</td>
                      <td className="border border-gray-300 p-3">{comp.monetization}</td>
                      <td className="border border-gray-300 p-3 text-purple-600 font-semibold">{comp.advantage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'moats':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slide.effects.map((effect: any, index: number) => (
                <Card key={index} className="p-6">
                  <CardContent className="space-y-3">
                    <h3 className="text-lg font-semibold text-purple-600">{effect.title}</h3>
                    <p className="text-gray-600">{effect.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'gtm':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {slide.phases.map((phase: any, index: number) => (
                <Card key={index} className="p-6">
                  <CardContent className="space-y-4">
                    <div className="text-2xl font-bold text-blue-600">{index + 1}</div>
                    <h3 className="text-lg font-semibold">{phase.phase}</h3>
                    <p className="text-gray-600">{phase.description}</p>
                    {phase.details && <p className="text-sm text-gray-500">{phase.details}</p>}
                    <p className="text-blue-600 font-semibold">{phase.target}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'vision':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            <Card className="p-8 mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent>
                <p className="text-xl text-center text-gray-700 leading-relaxed">{slide.vision}</p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {slide.metrics.map((metric: any, index: number) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="space-y-3">
                    <h3 className="text-lg font-semibold text-blue-600">{metric.metric}</h3>
                    <p className="text-gray-600">{metric.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'risks':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-orange-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">Assumption</th>
                    <th className="border border-gray-300 p-3 text-left">Risk Level</th>
                    <th className="border border-gray-300 p-3 text-left">Validation Method</th>
                    <th className="border border-gray-300 p-3 text-left">Success Metric</th>
                  </tr>
                </thead>
                <tbody>
                  {slide.risks.map((risk: any, index: number) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-3">{risk.assumption}</td>
                      <td className="border border-gray-300 p-3">{risk.level}</td>
                      <td className="border border-gray-300 p-3">{risk.validation}</td>
                      <td className="border border-gray-300 p-3 text-green-600 font-semibold">{risk.metric}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
            </div>
            <Card className="p-8 max-w-4xl mx-auto">
              <CardContent className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-600 text-center">{slide.founder.name}</h3>
                <div className="space-y-4">
                  {slide.founder.points.map((point: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'funding':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Budget Allocation:</h3>
                <div className="space-y-4">
                  {slide.allocation.map((item: any, index: number) => (
                    <Card key={index} className="p-4">
                      <CardContent className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-green-600">{item.percentage}</span>
                          <span className="text-lg font-semibold">{item.category}</span>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6">Key Milestones:</h3>
                <div className="space-y-4">
                  {slide.milestones.map((milestone: string, index: number) => (
                    <Card key={index} className="p-4">
                      <CardContent>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <p className="text-gray-700">{milestone}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Slide content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Button>
          
          <div className="flex items-center gap-3">
            <Presentation className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold">Pitch Presentation</h1>
          </div>

          <div className="text-sm text-gray-500">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Card className="min-h-[600px] p-8">
          <CardContent className="h-full">
            {renderSlideContent(slides[currentSlide])}
          </CardContent>
        </Card>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 px-6 py-3">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <ChevronLeft size={20} />
            </Button>

            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Keyboard Instructions */}
      <div className="fixed top-20 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
        <div className="text-xs text-gray-500 space-y-1">
          <div>→ or Space: Next slide</div>
          <div>← : Previous slide</div>
          <div>Esc: Exit presentation</div>
        </div>
      </div>
    </div>
  );
};

export default PitchPresentation;
