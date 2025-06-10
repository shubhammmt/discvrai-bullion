import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ArrowLeft, Brain, TrendingUp, Users, DollarSign, Target, Shield, Rocket, Zap, MousePointer, CreditCard, FileText, Globe, BarChart, Cpu, Database, Network, Download, MessageCircle, Search, PieChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SlideRenderer } from '@/components/pitch/SlideRenderer';
import { PDFExportView } from '@/components/pitch/PDFExportView';
import { useReactToPrint } from 'react-to-print';

const PitchPresentation = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

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
      subtitle: "Consumer-First, B2B-Ready Platform",
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
        month24: { users: "1.5M", revenue: "₹756L ($9.07M)", description: "B2B pilots begin" }
      },
      unitEconomics: {
        revenuePerUser: "₹605 ($72.6) annually",
        revenuePerMAU: "₹756 ($90.8) annually",
        conversionRate: "15% discovery-to-execution", 
        cac: "<₹4,200 ($50) per user"
      },
      b2bOpportunity: {
        title: "Future B2B Platform Opportunity",
        description: "Consumer AI creates ₹4,200 Cr ($500M) B2B addressable market",
        timing: "Post-Series A with dedicated team and resources",
        rationale: "Consumer behavioral data becomes B2B competitive moat"
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
      userJourneyMapping: {
        title: "From User Intent to AI Intelligence",
        steps: [
          {
            userAction: "\"Best mutual funds for retirement\"",
            aiResponse: "Contextual understanding & profile analysis",
            layers: ["Layer 1", "Layer 2"],
            example: "Natural language query with intent recognition"
          },
          {
            userAction: "Profile Assessment",
            aiResponse: "Risk profiling & goal alignment",
            layers: ["Layer 2", "Layer 3"],
            example: "Income ₹8L, 30 years, moderate risk → 88% match score"
          },
          {
            userAction: "Product Discovery",
            aiResponse: "Personalized recommendations with reasoning",
            layers: ["Layer 3", "Layer 4"],
            example: "Top 3 SIP options with clear explanations"
          },
          {
            userAction: "Decision Support",
            aiResponse: "Contextual guidance across research pages",
            layers: ["Layer 1", "Layer 4"],
            example: "AI memory flows from Feed → Stock Research → Execution"
          }
        ]
      },
      aiLayers: [
        {
          layer: "Layer 4",
          title: "Conversational Intelligence",
          description: "Natural Language Understanding & Context Management",
          capabilities: ["Intent Recognition", "Context Persistence", "Explanation Generation"],
          userValue: "Talk to AI like a financial advisor",
          icon: MessageCircle,
          color: "from-purple-600 to-purple-800"
        },
        {
          layer: "Layer 3", 
          title: "Financial Product Intelligence",
          description: "Product Matching & Portfolio Optimization",
          capabilities: ["Product Discovery", "Performance Analysis", "Cross-Asset Optimization"],
          userValue: "Find perfect products from 3000+ options",
          icon: Search,
          color: "from-blue-600 to-blue-800"
        },
        {
          layer: "Layer 2",
          title: "Risk & Goal Intelligence", 
          description: "Behavioral Risk Assessment & Life Goal Mapping",
          capabilities: ["Risk Profiling", "Goal Alignment", "Life Stage Analysis"],
          userValue: "Investments that match your life goals",
          icon: Target,
          color: "from-green-600 to-green-800"
        },
        {
          layer: "Layer 1",
          title: "Personalization Engine",
          description: "Individual Financial DNA & Learning Memory",
          capabilities: ["Behavioral Learning", "Cultural Context", "Personal Preferences"],
          userValue: "AI that knows your financial personality",
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
      id: 11,
      title: "Key Risks - Simplified",
      type: "risks",
      icon: Target,
      criticalRisk: {
        title: "🚨 THE CRITICAL RISK: Discovery-to-Execution Conversion",
        description: "Will users actually buy financial products after discovering them on our platform?",
        concerns: [
          "Free Discovery Trap: Research on our platform, execute elsewhere",
          "Commission Reality: Most mutual fund sales are ₹0 commission direct plans", 
          "Price Sensitivity: Users may choose cheapest option after discovery"
        ]
      },
      risks: [
        { assumption: "15% Discovery-to-Execution", level: "🔴 Critical", validation: "MVP with 1,000 users", metric: ">10% conversion" },
        { assumption: "₹15,000+ Commission per User", level: "🔴 Critical", validation: "Partner with insurers", metric: ">₹12,000 actual" },
        { assumption: "<₹4,200 Customer Acquisition", level: "🟡 High", validation: "Digital marketing test", metric: "<₹6,300 blended CAC" }
      ],
      warningSignals: {
        redFlags: [
          "Conversion <5% after 6 months",
          "CAC >₹8,400 consistently", 
          "Big Tech enters financial discovery"
        ],
        greenFlags: [
          "Conversion >10% consistently",
          "Organic growth >30% monthly",
          "Revenue per user >₹4,200 annually"
        ]
      }
    },
    {
      id: 12,
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
      id: 13,
      title: "Vision & Market Evolution", 
      subtitle: "Consumer AI → B2B Platform Infrastructure",
      type: "vision",
      icon: Brain,
      vision: "Build India's financial operating system that starts with consumer discovery and evolves into B2B financial AI infrastructure",
      consumerVision: {
        title: "Phase 1: Consumer Financial OS (Months 1-18)",
        description: "Every Indian accesses personalized AI-powered financial recommendations and executes seamlessly",
        metrics: [
          "1M users by Month 18, 1.5M by Month 24", 
          "15% discovery-to-execution conversion",
          "₹504L ($6.05M) monthly revenue by Month 18"
        ]
      },
      b2bEvolution: {
        title: "Phase 2: B2B Financial AI Platform (Post Series A)",
        description: "Consumer behavioral intelligence becomes enterprise financial AI infrastructure",
        opportunities: [
          "White-label AI for bank customer acquisition",
          "API-first product recommendation engines", 
          "Compliance & risk assessment automation",
          "Contact center AI for financial services"
        ],
        marketSize: "Additional ₹4,200 Cr ($500M) addressable market",
        differentiation: "Consumer behavioral data creates unmatched AI intelligence"
      }
    },
    {
      id: 14,
      title: "Appendix: Why Big Tech Won't Win Here",
      subtitle: "Domain Expertise vs Tech Tourists",
      type: "big-tech",
      icon: Shield,
      whyBigTechWontWin: [
        {
          reason: "Regulatory Barriers",
          explanation: "Financial services requires IRDAI, SEBI licenses and partnerships that take years to build. We're already applying for these licenses."
        },
        {
          reason: "Financial AI is Different",
          explanation: "Our models learn from actual Indian investment behavior - festival timing, family influences, regional patterns. General AI doesn't understand Indian financial culture."
        },
        {
          reason: "Execution is Everything",
          explanation: "Building search is 20% of the problem. Getting insurance rates, credit approvals, and user trust - that's the other 80%. We're building these relationships now."
        },
        {
          reason: "Domain Expertise Required",
          explanation: "Our team has built financial platforms serving millions. We understand both technology AND regulatory landscape that takes years to develop."
        }
      ],
      whyCredWontPivot: {
        title: "Why CRED Won't Pivot Here",
        points: [
          "Different markets: CRED serves premium users, we serve mass market",
          "Different problems: They solve convenience, we solve complexity",
          "Different optimization: They optimize rewards, we optimize life goals",
          "Pivot difficulty: When profitable with one model, changing is extremely hard",
          "Would need new licenses, partnerships, AI models, and different user base"
        ]
      },
      ourAdvantage: {
        title: "The Big Tech Threat Actually Validates Our Market",
        points: [
          "When investors worry about Google, it confirms we're solving a massive problem",
          "By the time they navigate regulations, we'll have behavioral data moat",
          "Financial services has room for multiple players - PolicyBazaar, Paytm, PhonePe co-exist",
          "Our AI gets better with more users - network effects create defensibility"
        ]
      }
    },
    {
      id: 15,
      title: "Appendix: Network Effects",
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

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'DISCVR-AI-Pitch-Presentation',
    onBeforePrint: () => {
      setIsDownloading(true);
      // Add a small delay to ensure the component is fully rendered
      return new Promise(resolve => {
        setTimeout(resolve, 500);
      });
    },
    onAfterPrint: () => {
      setIsDownloading(false);
    },
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `
  });

  const downloadPDF = () => {
    console.log('Starting PDF download...');
    if (handlePrint) {
      handlePrint();
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* PDF Export Component - Always rendered but hidden on screen */}
      <div ref={printRef}>
        <PDFExportView slides={slides} />
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 no-print">
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

          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={downloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              {isDownloading ? 'Generating PDF...' : 'Download PDF'}
            </Button>
            <div className="text-sm text-gray-500">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 no-print">
        <Card className="min-h-[600px] p-8">
          <CardContent className="h-full" data-slide-content>
            <SlideRenderer slide={slides[currentSlide]} />
          </CardContent>
        </Card>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 no-print">
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
      <div className="fixed top-20 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 no-print">
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
