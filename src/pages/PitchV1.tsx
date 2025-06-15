
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ArrowLeft, Heart, Brain, Target, TrendingUp, Users, Shield, CheckCircle, Zap, Clock, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PitchV1 = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      type: 'title',
      title: "discvr.ai",
      subtitle: "Complete Financial Health Platform",
      tagline: "Know Your Financial Health in 30 Seconds",
      author: "by Shubham Srivastava"
    },
    {
      id: 2,
      type: 'problem',
      title: "Indians Don't Know Their Financial Health",
      stats: [
        { number: "78%", label: "No Health Awareness", description: "Don't know if they're financially healthy or not" },
        { number: "40+", label: "Hours Research", description: "Spent researching before any financial decision" },
        { number: "83%", label: "No Guidance", description: "Make financial decisions without professional help" }
      ]
    },
    {
      id: 3,
      type: 'solution',
      title: "Complete Financial Health in 30 Seconds",
      subtitle: "AI-Powered Assessment → Goal Setting → Guided Actions",
      features: [
        { icon: Heart, title: "Health Score", description: "Instant assessment across 4 key areas of financial wellness" },
        { icon: Target, title: "Goal-Oriented Planning", description: "Set life goals and get personalized strategies to achieve them" },
        { icon: Brain, title: "AI Health Coach", description: "Continuous guidance and recommendations for improvement" },
        { icon: Zap, title: "One-Click Execution", description: "Seamless connection to best financial products for your goals" }
      ]
    },
    {
      id: 4,
      type: 'health-areas',
      title: "4 Pillars of Financial Health",
      areas: [
        { name: "Wealth Building", icon: TrendingUp, description: "Investments and growth planning", color: "bg-green-100 text-green-600" },
        { name: "Protection Planning", icon: Shield, description: "Insurance and risk management", color: "bg-blue-100 text-blue-600" },
        { name: "Debt Optimization", icon: BarChart3, description: "Smart debt and credit management", color: "bg-orange-100 text-orange-600" },
        { name: "Goal Achievement", icon: Target, description: "Life goals and milestone tracking", color: "bg-purple-100 text-purple-600" }
      ]
    },
    {
      id: 5,
      type: 'user-journey',
      title: "From Confusion to Clarity in 3 Steps",
      steps: [
        { step: "1", title: "30-Second Health Check", description: "Complete assessment of financial wellness", icon: Heart, time: "30 sec" },
        { step: "2", title: "Set Personal Goals", description: "Define what matters most to you", icon: Target, time: "2 min" },
        { step: "3", title: "Get AI Guidance", description: "Personalized recommendations and execution", icon: Brain, time: "Ongoing" }
      ]
    },
    {
      id: 6,
      type: 'market-health',
      title: "Financial Wellness Market Opportunity",
      subtitle: "$50B+ Financial Health & Wellness Market",
      data: {
        totalMarket: "$1.2T Indian Financial Services",
        healthSegment: "$50B+ Financial Wellness & Planning",
        ourTarget: "$5B Addressable with Health-First Approach",
        growth: "25% YoY growth in financial wellness adoption"
      }
    },
    {
      id: 7,
      type: 'differentiation',
      title: "Why Health-First Approach Wins",
      comparisons: [
        { aspect: "Current Players", description: "Product-first: Sell mutual funds, insurance, stocks", limitation: "Users still confused about overall health" },
        { aspect: "discvr.ai", description: "Health-first: Assess wellness, then recommend products", advantage: "Complete picture before any financial decision" }
      ],
      benefits: [
        "Higher user engagement (health is personal)",
        "Better product recommendations (context-aware)",
        "Stronger retention (ongoing health monitoring)",
        "Premium positioning (wellness vs. transactions)"
      ]
    },
    {
      id: 8,
      type: 'revenue-health',
      title: "Health-Driven Revenue Model",
      subtitle: "Premium Products for Health-Conscious Users",
      streams: [
        { product: "Insurance (Health-driven)", commission: "25-40%", description: "Personalized coverage based on health assessment" },
        { product: "Goal-based Investments", commission: "15-25%", description: "Higher-margin products for specific life goals" },
        { product: "Credit Optimization", commission: "2-4%", description: "Debt consolidation and credit improvement" },
        { product: "Premium Health Plans", subscription: "₹999/month", description: "Advanced analytics and personal advisor access" }
      ]
    },
    {
      id: 9,
      type: 'traction',
      title: "Early Validation",
      metrics: [
        { metric: "Health Assessments", value: "2,500+ completed", growth: "in 3 months" },
        { metric: "User Engagement", value: "85% completion rate", growth: "vs 45% industry avg" },
        { metric: "Goal Setting", value: "78% set goals", growth: "after health check" },
        { metric: "Product Interest", value: "23% request products", growth: "vs 8% cold outreach" }
      ]
    },
    {
      id: 10,
      type: 'vision-health',
      title: "Vision: India's Financial Health OS",
      vision: "Every Indian knows their financial health score and has a personalized path to financial wellness",
      goals: [
        "1M+ Indians assess their financial health annually",
        "Average health score improvement of 25+ points",
        "₹100Cr+ in optimized financial decisions guided",
        "Become the trusted financial health standard for India"
      ]
    },
    {
      id: 11,
      type: 'funding',
      title: "₹25Cr Seed Round",
      subtitle: "Build India's Financial Health Infrastructure",
      allocation: [
        { category: "Health Tech & AI", percentage: "40%", description: "Advanced health scoring algorithms and AI coaching" },
        { category: "Team & Expertise", percentage: "35%", description: "Financial health experts and AI engineers" },
        { category: "User Acquisition", percentage: "20%", description: "Health-focused marketing and community building" },
        { category: "Compliance & Partnerships", percentage: "5%", description: "Regulatory approvals and product partnerships" }
      ],
      milestones: [
        "Month 6: 50K health assessments completed",
        "Month 12: ₹50L monthly revenue from health-driven products",
        "Month 18: 500K users with measurable health improvement"
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

  const renderSlide = (slide: any) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Heart className="w-20 h-20 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              {slide.title}
            </h1>
            <p className="text-2xl text-gray-700 font-semibold">{slide.subtitle}</p>
            <p className="text-xl text-red-600 font-medium">{slide.tagline}</p>
            <p className="text-lg text-gray-500">{slide.author}</p>
          </div>
        );

      case 'problem':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Heart className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {slide.stats.map((stat: any, index: number) => (
                <Card key={index} className="text-center p-6 border-red-200">
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
              <Heart className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {slide.features.map((feature: any, index: number) => (
                <Card key={index} className="p-6 h-full hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-4 h-full flex flex-col">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-green-600">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 flex-1">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'health-areas':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {slide.areas.map((area: any, index: number) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-4">
                    <div className={`w-16 h-16 ${area.color} rounded-2xl flex items-center justify-center mx-auto`}>
                      <area.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold">{area.name}</h3>
                    <p className="text-gray-600 text-sm">{area.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'user-journey':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {slide.steps.map((step: any, index: number) => (
                <Card key={index} className="text-center p-6 relative">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="absolute top-4 left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    <div className="text-sm text-blue-600 font-medium">{step.time}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">{slide.title}</h2>
            {slide.subtitle && <p className="text-xl text-gray-600">{slide.subtitle}</p>}
            <div className="text-gray-600">Slide content coming soon...</div>
          </div>
        );
    }
  };

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
            {renderSlide(slides[currentSlide])}
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
