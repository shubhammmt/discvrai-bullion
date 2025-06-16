import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ArrowLeft, Heart, Brain, Target, TrendingUp, Users, Shield, CheckCircle, Zap, Clock, BarChart3, DollarSign, Lightbulb, Star, MapPin, Smartphone, MessageCircle, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SlideRenderer } from '@/components/pitch/SlideRenderer';

const PitchV1 = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      type: 'title',
      title: "discvr.ai",
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
      subtitle: "Clear Differentiation",
      icon: Lightbulb,
      competitors: [
        { 
          platform: "Jupiter", 
          range: "Banking + Investment tracking",
          ux: "Excellent",
          monetization: "Medium (banking fees)",
          advantage: "Health-first + multi-product execution"
        },
        { 
          platform: "PolicyBazaar", 
          range: "Insurance-heavy",
          ux: "Poor",
          monetization: "High (insurance)",
          advantage: "Multi-product + better UX"
        },
        { 
          platform: "Groww", 
          range: "Investment-only",
          ux: "Good",
          monetization: "Low",
          advantage: "Health assessment + high-margin focus"
        },
        { 
          platform: "INDmoney", 
          range: "Investment tracking + Execution",
          ux: "Poor to Average",
          monetization: "Low",
          advantage: "Health-first approach + conversational AI"
        },
        { 
          platform: "CRED", 
          range: "Credit-focused",
          ux: "Excellent",
          monetization: "Medium",
          advantage: "Broader product range + financial health"
        },
        { 
          platform: "Zerodha", 
          range: "Trading-focused",
          ux: "Average",
          monetization: "Medium",
          advantage: "Discovery-first + young professional focus"
        }
      ]
    },
    {
      id: 5,
      type: 'market-opportunity',
      title: "50-70M Indians in TAM, Targeting 30-40M SAM",
      subtitle: "Research-backed market sizing with clear path to 3-4M users",
      icon: TrendingUp,
      marketData: {
        tam: { number: "50-70M", label: "Total Addressable Market", description: "Salaried taxpayers earning >₹5L with investable surplus" },
        sam: { number: "30-40M", label: "Serviceable Addressable Market", description: "Tier-1 urban professionals, digitally savvy with existing investments" },
        som: { number: "3-4M", label: "Serviceable Obtainable Market", description: "10% of SAM - realistic fintech penetration in 3-5 years" }
      },
      validation: [
        "9.2 Cr income tax filers (FY24-25)",
        "4.9 Cr active demat accounts",
        "10.2 Cr mutual fund SIP accounts",
        "68% prefer digital investment platforms"
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
          income: "₹6-12 LPA",
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
      title: "Freemium → Commission Revenue Model",
      subtitle: "Product validation through subscriptions, scale through commissions",
      icon: DollarSign,
      revenueStreams: [
        { title: "Insurance Commission", launch: "Month 1", commission: "5-25%", target: "₹20k avg premium", revenue: "₹3k per policy", details: "Focus on term life, health insurance" },
        { title: "Investment Commission", launch: "Month 3", commission: "0.1-1%", target: "₹50k avg SIP", revenue: "₹500 per user annually", details: "Mutual fund trail commissions" },
        { title: "Credit Commission", launch: "Month 6", commission: "₹200-500", target: "10% conversion", revenue: "₹300 per referral", details: "Personal loans, credit cards" }
      ],
      userProjections: {
        month6: { users: "10,000", revenue: "₹2L", description: "Bangalore launch, freemium adoption" },
        month12: { users: "50,000", revenue: "₹15L", description: "Multi-city expansion, commission ramp" },
        month18: { users: "150,000", revenue: "₹50L", description: "Scale optimization, premium tier" },
        month24: { users: "300,000", revenue: "₹2Cr", description: "Market leadership in young professional segment" }
      },
      unitEconomics: {
        revenuePerUser: "₹800/year",
        revenuePerMAU: "₹67/month",
        conversionRate: "15% to paid",
        cac: "₹1,500 target"
      }
    },
    {
      id: 8,
      type: 'unit-economics',
      title: "Strong Unit Economics: 20x LTV/CAC",
      subtitle: "Research-backed projections for sustainable growth",
      icon: BarChart3,
      economics: {
        cac: { value: "₹1,500", description: "Digital marketing + referrals" },
        ltv: { value: "₹30,000", description: "3-year subscription + commissions" },
        ratio: { value: "20x", description: "LTV/CAC ratio" },
        payback: { value: "6 months", description: "CAC payback period" }
      },
      breakdown: {
        title: "3-Year LTV Breakdown",
        components: [
          { source: "Premium Subscription", amount: "₹12,000", description: "₹499/month × 24 months avg tenure" },
          { source: "Insurance Commission", amount: "₹8,000", description: "₹40,000 premium × 20% commission" },
          { source: "Investment Commission", amount: "₹6,000", description: "Trail commissions on SIPs" },
          { source: "Credit Commission", amount: "₹4,000", description: "Loan/credit card referrals" }
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
          target: "10,000 users",
          strategy: [
            "LinkedIn ads targeting software engineers",
            "Tech company partnerships (HR wellness programs)",
            "Content marketing on finance + tech blogs",
            "Referral program: ₹300 cashback per friend"
          ]
        },
        {
          phase: "Phase 2: Multi-city Expansion",
          timeline: "Months 6-12",
          target: "50,000 users",
          strategy: [
            "Expand to Hyderabad, Mumbai, NCR",
            "Campus partnerships with engineering colleges",
            "Influencer collaborations (finance YouTubers)",
            "App store optimization + viral features"
          ]
        },
        {
          phase: "Phase 3: Scale & Optimize",
          timeline: "Months 12-18",
          target: "200,000 users",
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
        { metric: "Target Health Assessments", value: "10K+ in Month 6", growth: "Based on Bangalore IT professional density" },
        { metric: "Expected Completion Rate", value: "70-80%", growth: "vs 45% industry average for fintech onboarding" },
        { metric: "Projected Goal Setting", value: "65% users", growth: "Research shows high intent post-assessment" },
        { metric: "Expected Product Interest", value: "18-25%", growth: "vs 8% cold outreach conversion rates" }
      ]
    },
    {
      id: 12,
      type: 'vision-new',
      title: "Vision: India's Financial Health OS",
      icon: Target,
      vision: "Every young professional knows their financial health score and has a personalized path to financial wellness",
      goals: [
        "3M+ young professionals assess their financial health annually",
        "Average health score improvement of 25+ points per user",
        "₹5,000Cr+ in optimized financial decisions guided",
        "Become the trusted financial health standard for Tier-1 India"
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
        { category: "Tech & AI Development", percentage: "40%", description: "Health scoring algorithms, conversational AI, mobile app" },
        { category: "Team & Expertise", percentage: "35%", description: "Engineers, data scientists, financial experts" },
        { category: "User Acquisition", percentage: "20%", description: "Digital marketing focused on young professionals" },
        { category: "Compliance & Partnerships", percentage: "5%", description: "Regulatory approvals and financial institution tie-ups" }
      ],
      milestones: [
        "Month 6: 50K users across 4 cities with freemium model",
        "Month 12: $500K ARR from premium subscriptions + commissions",
        "Month 18: 200K users, Series A ready with proven unit economics"
      ],
      competitiveContext: {
        title: "Comparable Funding Rounds",
        examples: [
          "INDmoney: $86M Series B (2023)",
          "Jupiter: $86M Series C (2022)",
          "Payme: $4.1M Series A (2022)"
        ]
      },
      exitStrategy: [
        "Strategic acquisition by fintech/bank ($500M-1B valuation by year 5)",
        "IPO pathway following Indian fintech success stories",
        "Platform expansion to become financial super-app"
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
              <h1 className="text-xl font-semibold">Financial Health Pitch v1</h1>
              <p className="text-sm text-gray-500">Health-First Approach</p>
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
