import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ArrowLeft, Heart, Brain, Target, TrendingUp, Users, Shield, CheckCircle, Zap, Clock, BarChart3, DollarSign, Lightbulb, Star, MapPin, Smartphone, MessageCircle, Camera, Calculator, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SlideRenderer } from '@/components/pitch/SlideRenderer';

const PitchV1 = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      type: 'title',
      title: "DiscvrAI",
      subtitle: "Complete Financial Health Platform",
      author: "by Shubham Srivastava",
      icon: Heart
    },
    {
      id: 2,
      type: 'problem',
      title: "Young IT Professionals Face Financial Confusion",
      icon: Heart,
      stats: [
        { number: "42%", label: "Knowledge Barrier", description: "Don't invest due to lack of understanding" },
        { number: "40+", label: "Hours Research", description: "Spent researching before any financial decision" },
        { number: "83%", label: "No Guidance", description: "Make financial decisions without professional help" }
      ]
    },
    {
      id: 3,
      type: 'solution',
      title: "Complete Financial Health in 30 Seconds",
      icon: Heart,
      features: [
        { title: "Instant Health Score", description: "Free assessment across wealth, protection, debt, and goals" },
        { title: "Conversational AI Coach", description: "Chat, upload images, or manual entry - we understand it all" },
        { title: "Seamless Execution", description: "One-click from health check to product purchase" },
        { title: "Unified Portfolio View", description: "All accounts (stocks, insurance, bank) in one dashboard" }
      ]
    },
    {
      id: 4,
      type: 'competition',
      title: "Competitive Analysis",
      subtitle: "Clear Differentiation in Crowded Market",
      icon: Lightbulb,
      competitors: [
        { 
          platform: "Jupiter", 
          range: "Banking + Investment tracking",
          ux: "Excellent",
          monetization: "Medium",
          funding: "$171M",
          advantage: "Health-first + multi-product execution"
        },
        { 
          platform: "PolicyBazaar", 
          range: "Insurance-heavy",
          ux: "Poor",
          monetization: "High",
          funding: "$366M",
          advantage: "Multi-product + better UX"
        },
        { 
          platform: "Groww", 
          range: "Investment-only",
          ux: "Good",
          monetization: "Low",
          funding: "$393M",
          advantage: "Health assessment + execution"
        },
        { 
          platform: "INDmoney", 
          range: "Investment tracking",
          ux: "Average",
          monetization: "Low",
          funding: "$136M",
          advantage: "Health-first + conversational AI"
        },
        { 
          platform: "CRED", 
          range: "Credit-focused",
          ux: "Excellent",
          monetization: "Medium",
          funding: "$681M",
          advantage: "Broader range + financial health"
        }
      ]
    },
    {
      id: 5,
      type: 'market-opportunity',
      title: "49M Demat Accounts, Targeting 5M Active Users",
      subtitle: "Data-backed market sizing with clear path to 1M users",
      icon: TrendingUp,
      marketData: {
        tam: { number: "49M", label: "Total Demat Accounts", description: "Active demat accounts in India (SEBI data)" },
        sam: { number: "25M", label: "Serviceable Addressable Market", description: "Urban, digitally active investors with >₹5L income" },
        som: { number: "5M", label: "Serviceable Obtainable Market", description: "20% of SAM - realistic fintech penetration target" }
      },
      validation: [
        "49M active demat accounts (SEBI FY24)",
        "102M mutual fund SIP accounts",
        "92M income tax filers",
        "75% prefer digital investment platforms"
      ]
    },
    {
      id: 6,
      type: 'target-persona',
      title: "Young IT Professional: Our Primary Target",
      icon: Users,
      persona: {
        demographics: {
          age: "25-32 years",
          income: "₹6-15 LPA",
          location: "Bangalore, Hyderabad, Mumbai, NCR",
          role: "Software Engineer, Analyst, Designer"
        },
        behavior: {
          tech: "Heavy smartphone user, follows fintech apps",
          finance: "Has SIPs, small equity investments, learning phase",
          goals: "Wealth creation, EMI planning, travel goals",
          preferences: "Self-service, rewards (CRED-style), mobile alerts"
        },
        painPoints: [
          "Knows how to invest but unsure about overall financial health",
          "Multiple apps for different products - no unified view",
          "Spends 40+ hours researching before decisions",
          "Wants guidance but not expensive advisory fees"
        ]
      }
    },
    {
      id: 7,
      type: 'revenue-model',
      title: "Commission + Subscription Revenue Model",
      subtitle: "Targeting ₹2,600 annual revenue per user",
      icon: DollarSign,
      revenueStreams: [
        { title: "Insurance Commission", launch: "Month 1", commission: "15-25%", target: "40% users buy", revenue: "₹1,200/user/year", details: "Focus on term life, health insurance" },
        { title: "Investment Commission", launch: "Month 3", commission: "0.5-1%", target: "60% users active", revenue: "₹600/user/year", details: "Mutual fund trail commissions" },
        { title: "Credit Commission", launch: "Month 6", commission: "₹2,000/referral", target: "20% conversion", revenue: "₹400/user/year", details: "Personal loans, credit cards" },
        { title: "Premium Subscription", launch: "Month 2", commission: "₹499/month", target: "8% users upgrade", revenue: "₹400/user/year", details: "Advanced analytics, priority support" }
      ],
      userProjections: {
        month6: { users: "100K", revenue: "₹26Cr", description: "Bangalore launch, freemium + premium model" },
        month12: { users: "400K", revenue: "₹104Cr", description: "Multi-city expansion, all revenue streams" },
        month18: { users: "1M", revenue: "₹260Cr", description: "Scale optimization, premium features mature" },
        month24: { users: "1.5M", revenue: "₹390Cr", description: "Market leadership in young professional segment" }
      },
      unitEconomics: {
        revenuePerUser: "₹2,600/year",
        revenuePerMAU: "₹217/month",
        conversionRate: "18% to revenue",
        cac: "₹1,200 target"
      }
    },
    {
      id: 8,
      type: 'unit-economics',
      title: "Strong Unit Economics: 5.9x LTV/CAC",
      subtitle: "Realistic projections for sustainable growth",
      icon: BarChart3,
      economics: {
        cac: { value: "₹1,200", description: "Digital marketing + referrals" },
        ltv: { value: "₹7,046", description: "3-year user lifetime value" },
        ratio: { value: "5.9x", description: "LTV/CAC ratio" },
        payback: { value: "6 months", description: "CAC payback period" }
      },
      breakdown: {
        title: "3-Year LTV Breakdown (₹7,046)",
        components: [
          { source: "Commission Revenue", amount: "₹5,646", description: "Insurance, investment, credit commissions over 3 years" },
          { source: "Premium Subscriptions", amount: "₹1,200", description: "8% users at ₹5,000/year (churn adjusted)" },
          { source: "Advanced Features", amount: "₹200", description: "Additional premium services and analytics" }
        ]
      }
    },
    {
      id: 9,
      type: 'go-to-market',
      title: "Tech Hub Launch Strategy",
      subtitle: "Target young professionals where they work and live",
      icon: MapPin,
      phases: [
        {
          phase: "Phase 1: Bangalore Launch",
          timeline: "Months 1-6",
          target: "100K users",
          strategy: [
            "LinkedIn ads targeting software engineers",
            "Tech company partnerships (HR wellness programs)",
            "Content marketing on finance + tech blogs",
            "Referral program: ₹500 cashback per friend"
          ]
        },
        {
          phase: "Phase 2: Multi-city Expansion",
          timeline: "Months 6-12",
          target: "400K users",
          strategy: [
            "Expand to Hyderabad, Mumbai, NCR",
            "Campus partnerships with engineering colleges",
            "Influencer collaborations (finance YouTubers)",
            "App store optimization + viral features"
          ]
        },
        {
          phase: "Phase 3: Scale to 1M Users",
          timeline: "Months 12-18",
          target: "1M users",
          strategy: [
            "Lookalike audiences from best users",
            "B2B white-label for corporate partners",
            "Banking API integrations",
            "Advanced AI features rollout"
          ]
        }
      ]
    },
    {
      id: 10,
      type: 'competitive-moats',
      title: "Building Defensible Moats",
      icon: Shield,
      moats: [
        {
          type: "Data Network Effect",
          icon: Brain,
          description: "More users → Better AI recommendations → Higher conversions",
          timeline: "Months 6-12"
        },
        {
          type: "Young Professional Community",
          icon: Users,
          description: "Peer-to-peer financial discussions and social proof",
          timeline: "Months 12-18"
        },
        {
          type: "Financial Institution Partnerships",
          icon: Shield,
          description: "Exclusive product access and better commission rates",
          timeline: "Months 18-24"
        },
        {
          type: "Switching Costs",
          icon: Target,
          description: "Complete financial data integration makes switching painful",
          timeline: "Months 24+"
        }
      ]
    },
    {
      id: 11,
      type: 'traction',
      title: "Market Validation & Target Metrics",
      icon: Star,
      metrics: [
        { metric: "Target Health Assessments", value: "100K+ in Month 6", growth: "Based on Bangalore IT professional density" },
        { metric: "Expected Completion Rate", value: "75-80%", growth: "vs 45% industry average for fintech onboarding" },
        { metric: "Projected Revenue Conversion", value: "18-22%", growth: "Conservative vs 25% best-in-class fintech" },
        { metric: "Expected User Retention", value: "65% Month-3", growth: "Research shows high engagement post-assessment" }
      ]
    },
    {
      id: 12,
      type: 'vision-new',
      title: "Vision: India's Financial Health OS",
      icon: Target,
      vision: "Every young professional knows their financial health score and has a personalized path to financial wellness",
      goals: [
        "5M+ young professionals assess their financial health annually",
        "Average health score improvement of 30+ points per user",
        "₹10,000Cr+ in optimized financial decisions guided",
        "Become the trusted financial health standard for Urban India"
      ],
      impact: {
        individual: "Personal wealth creation acceleration",
        societal: "Financially literate young India",
        economic: "Efficient capital allocation across markets"
      }
    },
    {
      id: 13,
      type: 'funding',
      title: "$2M Seed Round at $16M Valuation",
      subtitle: "Build India's Financial Health Infrastructure",
      icon: TrendingUp,
      allocation: [
        { category: "Tech & AI Development", percentage: "40%", description: "Health scoring algorithms, conversational AI, mobile app ($800K)" },
        { category: "Team & Expertise", percentage: "35%", description: "Engineers, data scientists, financial experts ($700K)" },
        { category: "User Acquisition", percentage: "20%", description: "Digital marketing focused on young professionals ($400K)" },
        { category: "Compliance & Partnerships", percentage: "5%", description: "Regulatory approvals and financial institution tie-ups ($100K)" }
      ],
      milestones: [
        "Month 6: 100K users across 4 cities with freemium + premium model",
        "Month 12: ₹104Cr ARR from commissions and subscriptions",
        "Month 18: 1M users, Series A ready with proven unit economics"
      ],
      competitiveContext: {
        title: "Comparable Funding Rounds",
        examples: [
          "Jupiter: $171M Series C (2023)",
          "INDmoney: $136M Series D (2022)",
          "Groww: $393M Series E (2021)"
        ]
      },
      exitStrategy: [
        "Strategic acquisition by fintech/bank ($500M-1B valuation by year 5)",
        "IPO pathway following Indian fintech success stories",
        "Platform expansion to become financial super-app"
      ]
    },
    {
      id: 14,
      type: 'financial-assumptions',
      title: "Financial Model Assumptions",
      subtitle: "Conservative estimates with room for upside",
      icon: Calculator,
      assumptions: [
        {
          category: "User Acquisition",
          items: [
            "CAC: ₹1,200 (vs ₹800-2,000 industry range)",
            "Monthly signup rate: 5% of total addressable in each city",
            "Organic growth: 20% of total acquisitions",
            "Churn rate: 5% monthly (stabilizing to 3% by Month 18)"
          ]
        },
        {
          category: "Revenue Conversion",
          items: [
            "Insurance: 40% users buy (₹15,000 avg premium, 20% commission)",
            "Investments: 60% users active (₹1,000 avg trail commission)",
            "Credit: 20% users convert (₹2,000 avg commission)",
            "Premium subscription: 8% users pay (₹5,000/year)"
          ]
        },
        {
          category: "Market Penetration",
          items: [
            "Bangalore: 15% of 500K IT professionals by Month 6",
            "Tier-1 cities: 5% penetration of target segment",
            "Growth rate: 40% month-over-month for first 12 months",
            "Market saturation: 20% of SAM (5M users) by year 3"
          ]
        }
      ]
    },
    {
      id: 15,
      type: 'team-breakdown',
      title: "Team Building Roadmap",
      subtitle: "18-month hiring plan for 1M user scale",
      icon: Users,
      teamPlan: {
        month6: {
          total: 15,
          breakdown: [
            { role: "Founder + Co-founder", count: 2, description: "CEO (Shubham) + Co-founder hire" },
            { role: "Engineering Team", count: 6, description: "4 Full-stack, 1 Mobile, 1 AI/ML" },
            { role: "Product & Design", count: 2, description: "1 Product Manager, 1 UI/UX Designer" },
            { role: "Business Development", count: 3, description: "1 BD Head, 2 Partnership Managers" },
            { role: "Compliance & Legal", count: 1, description: "Regulatory affairs specialist" },
            { role: "Marketing", count: 1, description: "Growth marketing lead" }
          ]
        },
        month12: {
          total: 35,
          breakdown: [
            { role: "Leadership", count: 4, description: "CEO, Co-founder, VP Product, VP Business" },
            { role: "Engineering", count: 15, description: "Full-stack, Mobile, AI/ML, DevOps" },
            { role: "Product & Design", count: 5, description: "Product managers, designers, researchers" },
            { role: "Business & Partnerships", count: 6, description: "BD, partnerships, financial advisors" },
            { role: "Compliance & Legal", count: 2, description: "Legal team, compliance officers" },
            { role: "Marketing & Growth", count: 3, description: "Performance marketing, content, brand" }
          ]
        },
        month18: {
          total: 60,
          breakdown: [
            { role: "Leadership", count: 6, description: "C-suite + VP level across functions" },
            { role: "Engineering", count: 25, description: "Scaled tech team across all verticals" },
            { role: "Product & Design", count: 8, description: "Product, design, UX research teams" },
            { role: "Business Operations", count: 12, description: "BD, partnerships, customer success" },
            { role: "Compliance & Risk", count: 4, description: "Legal, compliance, risk management" },
            { role: "Marketing & Analytics", count: 5, description: "Growth, brand, data analytics" }
          ]
        }
      },
      keyhires: [
        "Co-founder: Strong AI/ML background, fintech experience",
        "VP Product: Consumer fintech product expertise",
        "Head of Business Development: Financial services partnerships",
        "Lead AI Engineer: Recommendation systems, NLP expertise",
        "Compliance Head: SEBI, IRDAI regulatory experience"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
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
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Brain className="w-1.5 h-1.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold">DiscvrAI</h1>
              <p className="text-sm text-gray-500">Complete Financial Health Platform</p>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Card className="min-h-[600px] p-8">
          <CardContent className="h-full flex items-center justify-center">
            <SlideRenderer slide={slides[currentSlide]} />
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-white rounded-full shadow-lg border border-gray-200 px-6 py-3">
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
                    index === currentSlide ? 'bg-red-600' : 'bg-gray-300'
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

      {/* Keyboard Shortcuts */}
      <div className="fixed top-20 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <div className="text-xs text-gray-500 space-y-1">
          <div>→ or Space: Next slide</div>
          <div>← : Previous slide</div>
          <div>Esc: Exit presentation</div>
        </div>
      </div>
    </div>
  );
};

export default PitchV1;
