import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Presentation, ArrowLeft, Brain, TrendingUp, Users, DollarSign, Target, Shield, Rocket, CheckCircle, XCircle, Zap, ArrowRight, Smartphone, CreditCard, FileText, MousePointer, Database, Network, Cpu, BarChart, Globe } from 'lucide-react';
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
          title: "Insurance Distribution",
          launch: "Month 6",
          commission: "Commission: 15-40% of first-year premium + renewal trails",
          target: "Target: 1,600 policies/month by Month 18",
          revenue: "Monthly Revenue: ₹360L ($4.32M) by Month 18",
          details: "Real market data: Term Life 35-40%, Health 15-20%, ULIP 25-30%"
        },
        {
          title: "Credit Products", 
          launch: "Month 9",
          commission: "Commission: 2-4% of loan amount + card fees",
          target: "Target: 5,000 loans/cards/month by Month 18", 
          revenue: "Monthly Revenue: ₹120L ($1.44M) by Month 18",
          details: "Personal loans ₹2L average, Credit cards ₹500-2,000 per application"
        },
        {
          title: "Digital Gold & Others",
          launch: "Month 8",
          commission: "Commission: 0.5-1% per transaction + FD referrals",
          target: "Target: Variable based on user engagement",
          revenue: "Monthly Revenue: ₹24L ($288K) by Month 18",
          details: "Digital gold, fixed deposits, and other financial products"
        }
      ],
      userProjections: {
        month6: { users: "50K", revenue: "₹0", description: "Free discovery platform" },
        month12: { users: "300K", revenue: "₹96L ($1.15M)", description: "Insurance launch" },
        month18: { users: "1M", revenue: "₹504L ($6.05M)", description: "Full product suite" },
        month24: { users: "1.5M", revenue: "₹756L ($9.07M)", description: "Scale phase" }
      },
      unitEconomics: {
        revenuePerUser: "₹605 ($72.6) annually",
        revenuePerMAU: "₹756 ($90.8) annually", 
        conversionRate: "15% discovery-to-execution",
        cac: "<₹4,200 ($50) per user"
      }
    },
    {
      id: 6,
      title: "What We Do vs. What We Don't",
      subtitle: "Asset-Light Digital Enablement Platform",
      type: "business-model",
      icon: Zap,
      whatWeDo: [
        { title: "AI-Powered Discovery", description: "Help users find the right financial products through intelligent recommendations" },
        { title: "Transparent Comparison", description: "Provide unbiased comparison of products across providers" },
        { title: "Decision Acceleration", description: "Guide users from research to execution in minutes, not hours" },
        { title: "Seamless Referrals", description: "Connect users directly to licensed providers for execution" },
        { title: "Portfolio Tracking", description: "Monitor and optimize user investments across all providers" }
      ],
      whatWeDont: [
        { title: "Direct Insurance Sales", description: "We don't sell insurance policies directly" },
        { title: "Demat Account Management", description: "We don't open or manage demat accounts" },
        { title: "Fund Management", description: "We don't manage user funds or assets" },
        { title: "Regulatory Compliance", description: "Partners handle all licensing and compliance" },
        { title: "Customer Support", description: "Product-specific support handled by providers" }
      ]
    },
    {
      id: 7,
      title: "AI Technology Stack",
      subtitle: "Four-Layer Intelligence Engine That Creates Exponential Moats",
      type: "ai-tech-stack",
      icon: Brain,
      aiLayers: [
        {
          layer: "Layer 4",
          title: "Communication Intelligence",
          description: "Financial NLP & Multi-language Processing",
          capabilities: ["Document Analysis", "Conversational AI", "Regional Language Support"],
          icon: Globe,
          color: "from-purple-600 to-purple-800"
        },
        {
          layer: "Layer 3", 
          title: "Market Intelligence",
          description: "Real-time Sentiment & Predictive Analytics",
          capabilities: ["100+ Data Sources", "Alternative Data", "Volatility Prediction"],
          icon: BarChart,
          color: "from-blue-600 to-blue-800"
        },
        {
          layer: "Layer 2",
          title: "Risk Profiling & Asset Matching", 
          description: "Dynamic Risk Assessment & Portfolio AI",
          capabilities: ["Behavioral Risk Models", "Multi-Asset Optimization", "Tax Intelligence"],
          icon: Target,
          color: "from-green-600 to-green-800"
        },
        {
          layer: "Layer 1",
          title: "Personalization Engine",
          description: "Behavioral Learning & Financial DNA",
          capabilities: ["50+ Interaction Patterns", "Adaptive Learning", "Cultural Insights"],
          icon: Brain,
          color: "from-orange-600 to-orange-800"
        }
      ],
      networkEffects: {
        title: "Exponential Learning Network",
        effects: [
          { label: "500K+ User Patterns", value: "Cold Start Elimination" },
          { label: "Real Transaction Data", value: "Behavioral Intelligence" },
          { label: "Cross-Asset Learning", value: "Holistic Optimization" },
          { label: "Cultural Finance Patterns", value: "India-Specific Insights" }
        ]
      },
      competitiveMoats: [
        { 
          type: "Data Moat", 
          description: "Actual transaction behavior vs stated preferences",
          strength: "Impossible to replicate without real money decisions",
          icon: Database
        },
        { 
          type: "Network Moat", 
          description: "Each user improves recommendations for all users", 
          strength: "Exponential value creation with scale",
          icon: Network
        },
        { 
          type: "Technology Moat", 
          description: "Indian Financial AI models & cultural intelligence",
          strength: "Years of R&D investment to match",
          icon: Cpu
        }
      ]
    },
    {
      id: 8,
      title: "User Flow",
      subtitle: "From Discovery to Execution in 3 Simple Steps",
      type: "user-flow",
      icon: MousePointer,
      steps: [
        {
          step: "1",
          title: "Discovery & Personalization",
          description: "AI analyzes user profile, goals, and risk appetite",
          details: ["Income assessment", "Goal mapping", "Risk profiling", "Preference analysis"],
          icon: Brain
        },
        {
          step: "2", 
          title: "Intelligent Recommendations",
          description: "Get personalized product suggestions with transparent comparisons",
          details: ["AI-powered matching", "Real-time pricing", "Performance data", "Fee comparison"],
          icon: Target
        },
        {
          step: "3",
          title: "One-Click Execution",
          description: "Seamless redirect to partner platforms for instant purchase",
          details: ["Partner integration", "Pre-filled forms", "Instant execution", "Portfolio tracking"],
          icon: Zap
        }
      ]
    },
    {
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
      title: "Vision",
      subtitle: "India's Financial Operating System",
      type: "vision",
      icon: Brain,
      vision: "Build India's financial operating system, where every Indian accesses personalised AI-powered recommendations and executes seamlessly across all financial products",
      metrics: [
        { metric: "User Base", value: "1M users by Month 18, 1.5M by Month 24" },
        { metric: "User Engagement", value: "80% monthly active user retention" },
        { metric: "Conversion Rate", value: "15% discovery-to-execution conversion" },
        { metric: "Revenue Target", value: "₹504L ($6.05M) monthly by Month 18" },
        { metric: "Market Share", value: "2% of digital financial services by 2027" }
      ]
    },
    {
      id: 13,
      title: "Key Risks & Validation",
      type: "risks",
      icon: Target,
      criticalRisk: {
        title: "🚨 THE MAKE-OR-BREAK RISK: Discovery-to-Execution Conversion",
        description: "The Critical Question: Will users actually buy financial products on our platform after discovering them?",
        concerns: [
          "Free Discovery Trap: Users research on our platform but execute elsewhere",
          "Commission Reality: 80% of mutual fund sales are direct plans (₹0 commission)",
          "Price Sensitivity: Indians may choose cheapest option after discovery",
          "Trust Gap: Users may prefer 'trusted' traditional sources for execution"
        ]
      },
      risks: [
        { assumption: "15% Discovery-to-Execution Conversion", level: "🔴 Critical", validation: "MVP with 1,000 users", metric: ">10% conversion rate" },
        { assumption: "₹15,000+ Average Commission per User", level: "🔴 Critical", validation: "Partner with 3 insurers", metric: ">₹12,000 actual commission" },
        { assumption: "AI Trust > Human Advisors", level: "🟡 High", validation: "A/B test recommendations", metric: ">70% AI preference" },
        { assumption: "<₹4,200 Customer Acquisition Cost", level: "🟡 High", validation: "Digital marketing campaigns", metric: "<₹6,300 blended CAC" },
        { assumption: "Regulatory Approval Timeline", level: "🟡 High", validation: "Parallel application process", metric: "<6 months approval" }
      ],
      warningSignals: {
        redFlags: [
          "Conversion rate <5% after 6 months",
          "Customer acquisition cost >₹8,400 ($100)",
          "Commission rates drop below projections",
          "Big Tech enters financial discovery"
        ],
        greenFlags: [
          "Conversion rate >10% consistently", 
          "Organic growth >30% monthly",
          "Partner exclusivity agreements",
          "Revenue per user >₹4,200 ($50) annually"
        ]
      }
    },
    {
      id: 14,
      title: "Team",
      type: "team",
      icon: Users,
      founder: {
        name: "Shubham Srivastava, CEO & Co-Founder",
        experience: "15+ years building scalable technology platforms | 3x successful exits",
        points: [
          "Scale Expert: Chief Technology & Product Officer at EurekaForbes - built D2C platform with 1M+ MAUs, achieved 20% YoY cost reduction",
          "AI/ML Pioneer: CTO at Hindustan Times Digital - led rocket growth of digital media platforms using AI at scale",
          "Platform Builder: Founded Tekch - SaaS platform managing 10M+ sq ft using AI and IoT. Led MakeMyTrip hotels engineering (100+ engineers)",
          "Current Vision: Building Discvr.ai as India's AI search engine for efficient research and discovery"
        ]
      },
      keyStrengths: [
        "✅ Proven Track Record: 15+ years scaling platforms to millions of users",
        "✅ Domain Expertise: Deep fintech and AI experience with successful platform launches", 
        "✅ Technical Leadership: Led 100+ engineering teams, managed $100M+ technology budgets",
        "✅ Entrepreneurial Success: 3 successful platform exits and technology company scaling"
      ],
      plannedHires: [
        "Financial Services Veteran: Former SEBI/RBI regulatory expert (Month 6)",
        "AI/ML Advisor: Former Google/Microsoft AI researcher (in discussions)",
        "Business Development Head: Ex-PolicyBazaar/Paytm growth leader (Month 9)",
        "Compliance Officer: AMFI/IRDAI certified professional (Month 12)"
      ]
    },
    {
      id: 15,
      title: "Funding Requirements",
      subtitle: "₹33Cr ($4M) Seed Round",
      type: "funding",
      icon: DollarSign,
      allocation: [
        { percentage: "50%", category: "Team Building", description: "20 engineers + 15 business team members" },
        { percentage: "25%", category: "Customer Acquisition", description: "Marketing to reach 1M users by Month 18" },
        { percentage: "15%", category: "Technology & AI Infrastructure", description: "Cloud, data, ML platforms, and regulatory compliance" },
        { percentage: "10%", category: "Regulatory & Compliance", description: "IRDAI, SEBI, RBI licenses and legal expenses" }
      ],
      milestones: [
        "Month 6: Insurance distribution launch with 50K users",
        "Month 12: ₹96L ($1.15M) monthly revenue with 300K users", 
        "Month 18: ₹504L ($6.05M) monthly revenue with 1M users",
        "Series A ready: Clear path to profitability with proven unit economics"
      ],
      competitiveContext: {
        title: "Competitive Funding Landscape",
        examples: [
          "Sahi: Raised $7M (trading-only platform)",
          "Univest: Raised $10M+ (Buy-Sell Tip Execution)",
          "Our Ask: ₹33Cr ($4M) for broader market, higher-margin focus"
        ]
      },
      exitStrategy: [
        "Strategic Acquisition: By major bank or fintech (₹4,200Cr+ / $500M+ valuation)",
        "IPO Path: Public listing after ₹840Cr ($100M) annual revenue", 
        "Market Comparables: PolicyBazaar (₹16,800Cr / $2B), Paytm (₹42,000Cr / $5B peak)"
      ]
    },
    {
      id: 16,
      title: "Appendix: End-to-End Execution",
      subtitle: "Mutual Fund Investment Example",
      type: "execution-example",
      icon: FileText,
      example: {
        title: "Mutual Fund Investment Journey",
        steps: [
          {
            step: "Discovery",
            description: "User searches for 'best mutual funds for retirement'",
            screenshot: "AI shows personalized SIP recommendations based on 30-year timeline",
            time: "30 seconds"
          },
          {
            step: "Comparison", 
            description: "Compare top 3 recommended funds",
            screenshot: "Side-by-side comparison of returns, expense ratios, and risk metrics",
            time: "2 minutes"
          },
          {
            step: "Selection",
            description: "User selects HDFC Equity Fund",
            screenshot: "Detailed fund overview with investment amount selector",
            time: "1 minute"
          },
          {
            step: "Execution",
            description: "Redirect to Groww/Zerodha with pre-filled details",
            screenshot: "Partner platform opens with fund selected and KYC details pre-filled",
            time: "2 minutes"
          },
          {
            step: "Tracking",
            description: "Investment appears in Discvr portfolio",
            screenshot: "Real-time portfolio tracking with performance analytics",
            time: "Ongoing"
          }
        ]
      }
    },
    {
      id: 17,
      title: "Appendix: End-to-End Execution",
      subtitle: "Term Insurance Purchase Example",
      type: "execution-example",
      icon: Shield,
      example: {
        title: "Term Insurance Purchase Journey",
        steps: [
          {
            step: "Need Assessment",
            description: "AI calculates insurance requirement based on income and dependents",
            screenshot: "Smart calculator showing ₹1.5Cr coverage recommendation",
            time: "1 minute"
          },
          {
            step: "Product Discovery",
            description: "Compare policies from top insurers",
            screenshot: "Premium comparison across HDFC Life, ICICI Pru, and Max Life",
            time: "3 minutes"
          },
          {
            step: "Customization",
            description: "Adjust coverage amount and riders",
            screenshot: "Policy builder with critical illness and accidental death riders",
            time: "2 minutes"
          },
          {
            step: "Execution",
            description: "Redirect to PolicyBazaar/insurer with details",
            screenshot: "Partner platform with application form 80% pre-filled",
            time: "5 minutes"
          },
          {
            step: "Tracking",
            description: "Policy status and premium reminders",
            screenshot: "Insurance dashboard with renewal alerts and claim assistance",
            time: "Ongoing"
          }
        ]
      }
    },
    {
      id: 18,
      title: "Appendix: End-to-End Execution", 
      subtitle: "Personal Loan Application Example",
      type: "execution-example",
      icon: CreditCard,
      example: {
        title: "Personal Loan Application Journey",
        steps: [
          {
            step: "Eligibility Check",
            description: "AI pre-qualifies user based on income and credit profile",
            screenshot: "Instant eligibility for ₹5L loan at 11.5% interest",
            time: "30 seconds"
          },
          {
            step: "Lender Comparison",
            description: "Compare offers from multiple banks",
            screenshot: "Rate comparison from HDFC, ICICI, and Kotak with processing fees",
            time: "2 minutes"
          },
          {
            step: "Application",
            description: "Select preferred lender and loan terms",
            screenshot: "Loan configurator with EMI calculator and tenure selector",
            time: "1 minute"
          },
          {
            step: "Execution",
            description: "Redirect to bank's digital application",
            screenshot: "Bank portal with income details and documents auto-populated",
            time: "10 minutes"
          },
          {
            step: "Tracking",
            description: "Application status and disbursement tracking",
            screenshot: "Loan dashboard showing approval status and EMI schedule",
            time: "Ongoing"
          }
        ]
      }
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
      case 'ai-tech-stack':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>

            {/* AI Layers Stack */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-center mb-6">Four-Layer AI Intelligence Stack</h3>
              <div className="space-y-3">
                {slide.aiLayers.map((layer: any, index: number) => {
                  const LayerIcon = layer.icon;
                  return (
                    <Card key={index} className={`p-4 bg-gradient-to-r ${layer.color} text-white`}>
                      <CardContent className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <LayerIcon className="w-8 h-8" />
                          <div>
                            <div className="text-sm font-semibold opacity-90">{layer.layer}</div>
                            <h4 className="text-lg font-bold">{layer.title}</h4>
                            <p className="text-sm opacity-90">{layer.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="grid grid-cols-1 gap-1 text-xs">
                            {layer.capabilities.map((capability: string, i: number) => (
                              <div key={i} className="bg-white/20 px-2 py-1 rounded text-center">
                                {capability}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Network Effects Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50">
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Network className="w-8 h-8 text-green-600" />
                    <h3 className="text-xl font-bold text-green-800">{slide.networkEffects.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {slide.networkEffects.effects.map((effect: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="font-semibold text-green-700">{effect.label}</span>
                        <span className="text-green-600 text-sm">{effect.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-purple-600" />
                    <h3 className="text-xl font-bold text-purple-800">Competitive Moats</h3>
                  </div>
                  <div className="space-y-4">
                    {slide.competitiveMoats.map((moat: any, index: number) => {
                      const MoatIcon = moat.icon;
                      return (
                        <div key={index} className="p-3 bg-white rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <MoatIcon className="w-6 h-6 text-purple-600" />
                            <h4 className="font-bold text-purple-800">{moat.type}</h4>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{moat.description}</p>
                          <p className="text-xs text-purple-600 font-semibold">{moat.strength}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Metrics */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-2xl font-bold mb-6">AI Performance Targets</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-3xl font-bold">{"<2s"}</div>
                  <div className="text-sm opacity-90">Response Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">15%+</div>
                  <div className="text-sm opacity-90">Conversion Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">95%+</div>
                  <div className="text-sm opacity-90">Prediction Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">500K+</div>
                  <div className="text-sm opacity-90">Learning Dataset</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'title':
        return (
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl">
                  <IconComponent className="w-20 h-20 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              {slide.title}
            </h1>
            <p className="text-2xl text-gray-600">{slide.subtitle}</p>
            <p className="text-lg text-gray-500">{slide.author}</p>
          </div>
        );

      case 'business-model':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* What We Do */}
              <Card className="p-6 border-2 border-green-200 bg-green-50">
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <h3 className="text-2xl font-bold text-green-800">What We Do</h3>
                  </div>
                  <div className="space-y-4">
                    {slide.whatWeDo.map((item: any, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-green-800">{item.title}</h4>
                          <p className="text-green-700 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* What We Don't Do */}
              <Card className="p-6 border-2 border-red-200 bg-red-50">
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="w-8 h-8 text-red-600" />
                    <h3 className="text-2xl font-bold text-red-800">What We Don't Do</h3>
                  </div>
                  <div className="space-y-4">
                    {slide.whatWeDont.map((item: any, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-red-800">{item.title}</h4>
                          <p className="text-red-700 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center bg-blue-50 p-6 rounded-lg">
              <p className="text-lg text-blue-800 font-semibold">
                We are the intelligent bridge between users and financial providers - enabling faster, smarter decisions without the operational complexity.
              </p>
            </div>
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
            
            {/* Revenue Streams */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {slide.revenueStreams.map((stream: any, index: number) => (
                <Card key={index} className="p-6">
                  <CardContent className="space-y-4">
                    <h3 className="text-xl font-bold text-green-600">{stream.title}</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Launch:</strong> {stream.launch}</p>
                      <p><strong>Commission:</strong> {stream.commission}</p>
                      <p><strong>Target:</strong> {stream.target}</p>
                      <p className="text-green-600 font-semibold">{stream.revenue}</p>
                      {stream.details && <p className="text-gray-500 italic">{stream.details}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* User Projections Timeline */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
              <CardContent>
                <h3 className="text-2xl font-bold text-center mb-6 text-blue-800">User Growth & Revenue Timeline</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">Month 6</div>
                    <div className="text-lg font-semibold">{slide.userProjections.month6.users}</div>
                    <div className="text-sm text-green-600">{slide.userProjections.month6.revenue}</div>
                    <div className="text-xs text-gray-600">{slide.userProjections.month6.description}</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">Month 12</div>
                    <div className="text-lg font-semibold">{slide.userProjections.month12.users}</div>
                    <div className="text-sm text-green-600">{slide.userProjections.month12.revenue}</div>
                    <div className="text-xs text-gray-600">{slide.userProjections.month12.description}</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">Month 18</div>
                    <div className="text-lg font-semibold">{slide.userProjections.month18.users}</div>
                    <div className="text-sm text-green-600">{slide.userProjections.month18.revenue}</div>
                    <div className="text-xs text-gray-600">{slide.userProjections.month18.description}</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">Month 24</div>
                    <div className="text-lg font-semibold">{slide.userProjections.month24.users}</div>
                    <div className="text-sm text-green-600">{slide.userProjections.month24.revenue}</div>
                    <div className="text-xs text-gray-600">{slide.userProjections.month24.description}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Unit Economics */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent>
                <h3 className="text-2xl font-bold text-center mb-6 text-green-800">Unit Economics (Month 18)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">Revenue/User</div>
                    <div className="text-sm">{slide.unitEconomics.revenuePerUser}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">Revenue/MAU</div>
                    <div className="text-sm">{slide.unitEconomics.revenuePerMAU}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">Conversion</div>
                    <div className="text-sm">{slide.unitEconomics.conversionRate}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">CAC Target</div>
                    <div className="text-sm">{slide.unitEconomics.cac}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
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

            {/* Critical Risk Callout */}
            <Card className="p-6 border-2 border-red-500 bg-red-50">
              <CardContent>
                <h3 className="text-xl font-bold text-red-800 mb-4">{slide.criticalRisk.title}</h3>
                <p className="text-red-700 font-semibold mb-4">{slide.criticalRisk.description}</p>
                <div className="space-y-2">
                  {slide.criticalRisk.concerns.map((concern: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-red-700 text-sm">{concern}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment Table */}
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

            {/* Warning Signals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-2 border-red-200 bg-red-50">
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="w-8 h-8 text-red-600" />
                    <h3 className="text-xl font-bold text-red-800">🚩 Red Flags (Pivot Triggers)</h3>
                  </div>
                  <div className="space-y-2">
                    {slide.warningSignals.redFlags.map((flag: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-red-700 text-sm">{flag}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 border-2 border-green-200 bg-green-50">
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <h3 className="text-xl font-bold text-green-800">✅ Green Flags (Scale Indicators)</h3>
                  </div>
                  <div className="space-y-2">
                    {slide.warningSignals.greenFlags.map((flag: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-green-700 text-sm">{flag}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
            
            {/* Founder Profile */}
            <Card className="p-8 max-w-5xl mx-auto">
              <CardContent className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-600">{slide.founder.name}</h3>
                  <p className="text-lg text-gray-600 font-semibold">{slide.founder.experience}</p>
                </div>
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

            {/* Key Strengths */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
              <CardContent>
                <h3 className="text-xl font-bold text-center mb-6 text-blue-800">Why This Team Can Execute</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slide.keyStrengths.map((strength: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-sm">{strength}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Planned Hires */}
            <Card className="p-6">
              <CardContent>
                <h3 className="text-xl font-bold text-center mb-6 text-purple-800">Key Hires Planned</h3>
                <div className="space-y-3">
                  {slide.plannedHires.map((hire: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 border border-purple-200 rounded-lg">
                      <Users className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-sm">{hire}</p>
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Budget Allocation */}
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
              
              {/* Milestones */}
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

            {/* Competitive Context */}
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardContent>
                <h3 className="text-xl font-bold text-center mb-4 text-purple-800">{slide.competitiveContext.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {slide.competitiveContext.examples.map((example: string, index: number) => (
                    <div key={index} className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-700">{example}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Exit Strategy */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent>
                <h3 className="text-xl font-bold text-center mb-4 text-green-800">Exit Strategy & Valuation</h3>
                <div className="space-y-3">
                  {slide.exitStrategy.map((strategy: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-sm">{strategy}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'user-flow':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            
            <div className="relative">
              {/* Flow Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {slide.steps.map((step: any, index: number) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={index} className="relative">
                      <Card className="p-6 h-full">
                        <CardContent className="space-y-4 text-center">
                          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <StepIcon className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-3xl font-bold text-blue-600">{step.step}</div>
                          <h3 className="text-xl font-bold">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                          <div className="space-y-2">
                            {step.details.map((detail: string, i: number) => (
                              <div key={i} className="flex items-center justify-center gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                <span className="text-sm text-gray-500">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Arrow to next step */}
                      {index < slide.steps.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                          <ArrowRight className="w-8 h-8 text-blue-600" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <p className="text-lg text-gray-700 font-semibold">
                <span className="text-blue-600">Average Time:</span> Under 5 minutes from discovery to execution
              </p>
              <p className="text-md text-gray-600 mt-2">
                Traditional process takes 40+ hours • Our AI-powered flow reduces it by 99%
              </p>
            </div>
          </div>
        );

      case 'execution-example':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardContent>
                <h3 className="text-2xl font-bold text-center mb-8 text-purple-800">{slide.example.title}</h3>
                
                <div className="space-y-6">
                  {slide.example.steps.map((step: any, index: number) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-purple-800 mb-2">{step.step}</h4>
                        <p className="text-gray-700 mb-2">{step.description}</p>
                        <p className="text-sm text-gray-600 italic mb-2">"{step.screenshot}"</p>
                        <div className="text-xs text-purple-600 font-medium">⏱️ {step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center bg-purple-100 p-4 rounded-lg">
                  <p className="text-purple-800 font-semibold">
                    Total Time: {slide.example.steps.reduce((acc: any, step: any) => acc + " + " + step.time, "").slice(3)}
                  </p>
                </div>
              </CardContent>
            </Card>
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
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Zap className="w-1.5 h-1.5 text-white" />
              </div>
            </div>
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
