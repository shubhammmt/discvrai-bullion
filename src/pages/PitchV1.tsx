import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ArrowLeft, Heart, Brain, Target, TrendingUp, Users, Shield, CheckCircle, Zap, Clock, BarChart3, DollarSign, Lightbulb, Star, MapPin, Smartphone, MessageCircle, Camera } from 'lucide-react';
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
      title: "Young IT Professionals Face Financial Confusion",
      subtitle: "Despite earning ₹6-12 LPA, they struggle with financial decisions",
      stats: [
        { number: "42%", label: "Knowledge Barrier", description: "Don't invest due to lack of understanding" },
        { number: "40+", label: "Hours Research", description: "Spent researching before any financial decision" },
        { number: "83%", label: "No Guidance", description: "Make financial decisions without professional help" }
      ],
      persona: {
        name: "Rahul, 28, Software Engineer",
        salary: "₹8 LPA, Bangalore",
        pain: "Has SIPs but unsure if financially healthy overall"
      }
    },
    {
      id: 3,
      type: 'solution',
      title: "Complete Financial Health in 30 Seconds",
      subtitle: "Freemium Health Check → Goal Setting → One-Click Execution",
      features: [
        { icon: Heart, title: "Instant Health Score", description: "Free assessment across wealth, protection, debt, and goals" },
        { icon: Brain, title: "Conversational AI Coach", description: "Chat, upload images, or manual entry - we understand it all" },
        { icon: Zap, title: "Seamless Execution", description: "One-click from health check to product purchase" },
        { icon: Target, title: "Unified Portfolio View", description: "All accounts (stocks, insurance, bank) in one dashboard" }
      ]
    },
    {
      id: 4,
      type: 'differentiation',
      title: "Why We Win vs INDmoney & PolicyBazaar",
      competitors: [
        { 
          name: "INDmoney", 
          approach: "Portfolio tracking + execution",
          limitation: "No health-first approach, complex UX for young users"
        },
        { 
          name: "PolicyBazaar", 
          approach: "Insurance comparison + sales",
          limitation: "Product-first, no holistic financial view"
        }
      ],
      ourAdvantage: {
        title: "Health-First Financial OS",
        points: [
          "Conversational AI + Multi-modal input (chat, image, manual)",
          "Complete health score before any product recommendation",
          "Built for young professionals: mobile-first, rewards-driven",
          "Seamless immediate execution from health check to purchase"
        ]
      }
    },
    {
      id: 5,
      type: 'market-opportunity',
      title: "₹30-40M Young Professionals Market",
      subtitle: "Massive opportunity in Tier-1 tech hubs",
      marketData: {
        tam: { number: "50-70M", label: "Total Salaried Indians", description: "Earning >₹5L/year with investable surplus" },
        sam: { number: "30-40M", label: "Tier-1 Urban Professionals", description: "Digital-savvy with existing investments" },
        som: { number: "3-4M", label: "Our 5-Year Target", description: "10% of SAM - realistic fintech penetration" }
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
      model: {
        freemium: {
          title: "Free Health Check",
          features: ["Basic financial health score", "Goal setting tools", "Educational content"],
          purpose: "User acquisition & validation"
        },
        premium: {
          title: "₹499/month Premium",
          features: ["Advanced analytics", "Personal advisor calls", "Priority support"],
          purpose: "Early revenue & product validation"
        },
        commission: {
          title: "Product Commissions",
          streams: [
            { product: "Insurance", rate: "5-25%", description: "Life, health, term plans" },
            { product: "Mutual Funds", rate: "0.1-1%", description: "SIP registrations, ongoing trail" },
            { product: "Credit Products", rate: "1-3%", description: "Personal loans, credit cards" },
            { product: "Stocks/Trading", rate: "₹200-500", description: "Per new demat account" }
          ]
        }
      }
    },
    {
      id: 8,
      type: 'unit-economics',
      title: "Strong Unit Economics: 20x LTV/CAC",
      subtitle: "Research-backed projections for sustainable growth",
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
      title: "Early Validation Signals",
      metrics: [
        { metric: "Health Assessments", value: "2,500+ completed", growth: "in 3 months" },
        { metric: "User Engagement", value: "85% completion rate", growth: "vs 45% industry avg" },
        { metric: "Goal Setting", value: "78% set goals", growth: "after health check" },
        { metric: "Product Interest", value: "23% request products", growth: "vs 8% cold outreach" }
      ],
      testimonials: [
        {
          name: "Priya S., Software Engineer",
          company: "Microsoft Bangalore",
          quote: "Finally understood my financial health in 30 seconds. Bought term insurance the same day!"
        },
        {
          name: "Arjun K., Product Manager", 
          company: "Flipkart Bangalore",
          quote: "Love the conversational AI - just uploaded my salary slip and got a complete financial plan."
        }
      ]
    },
    {
      id: 12,
      type: 'vision',
      title: "Vision: India's Financial Health OS",
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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

            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent>
                <h3 className="text-xl font-bold mb-4 text-center">Meet Our Target User</h3>
                <div className="flex items-center justify-center gap-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{slide.persona.name}</h4>
                    <p className="text-gray-600">{slide.persona.salary}</p>
                    <p className="text-sm text-blue-600 italic">"{slide.persona.pain}"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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

      case 'differentiation':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Lightbulb className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {slide.competitors.map((comp: any, index: number) => (
                <Card key={index} className="p-6 border-red-200 bg-red-50">
                  <CardContent className="space-y-4">
                    <h3 className="text-xl font-bold text-red-600">{comp.name}</h3>
                    <p className="text-gray-700"><strong>Approach:</strong> {comp.approach}</p>
                    <p className="text-sm text-red-500"><strong>Limitation:</strong> {comp.limitation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent>
                <h3 className="text-2xl font-bold text-center mb-6 text-green-800">{slide.ourAdvantage.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slide.ourAdvantage.points.map((point: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'market-opportunity':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-600">TAM</h3>
                  <div className="text-3xl font-bold text-blue-800">{slide.marketData.tam.number}</div>
                  <div className="text-lg font-semibold">{slide.marketData.tam.label}</div>
                  <p className="text-gray-600 text-sm">{slide.marketData.tam.description}</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-blue-50">
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-bold text-green-600">SAM</h3>
                  <div className="text-3xl font-bold text-green-800">{slide.marketData.sam.number}</div>
                  <div className="text-lg font-semibold">{slide.marketData.sam.label}</div>
                  <p className="text-gray-600 text-sm">{slide.marketData.sam.description}</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-bold text-purple-600">SOM</h3>
                  <div className="text-3xl font-bold text-purple-800">{slide.marketData.som.number}</div>
                  <div className="text-lg font-semibold">{slide.marketData.som.label}</div>
                  <p className="text-gray-600 text-sm">{slide.marketData.som.description}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-r from-gray-50 to-blue-50">
              <CardContent>
                <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Market Validation</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {slide.validation.map((point: string, index: number) => (
                    <div key={index} className="text-center p-3 bg-white rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'target-persona':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardContent className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-600">Demographics</h3>
                    <div className="space-y-2">
                      <p><strong>Age:</strong> {slide.persona.demographics.age}</p>
                      <p><strong>Income:</strong> {slide.persona.demographics.income}</p>
                      <p><strong>Location:</strong> {slide.persona.demographics.location}</p>
                      <p><strong>Role:</strong> {slide.persona.demographics.role}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50">
                  <CardContent className="space-y-4">
                    <h3 className="text-xl font-bold text-green-600">Behavior</h3>
                    <div className="space-y-2">
                      <p><strong>Tech:</strong> {slide.persona.behavior.tech}</p>
                      <p><strong>Finance:</strong> {slide.persona.behavior.finance}</p>
                      <p><strong>Goals:</strong> {slide.persona.behavior.goals}</p>
                      <p><strong>Preferences:</strong> {slide.persona.behavior.preferences}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="p-6 h-fit">
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-bold text-red-600">Key Pain Points</h3>
                  <div className="space-y-3">
                    {slide.persona.painPoints.map((pain: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                        <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{pain}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'revenue-model':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <DollarSign className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-green-50">
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-600">{slide.model.freemium.title}</h3>
                  <ul className="space-y-2">
                    {slide.model.freemium.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-blue-600 font-medium">{slide.model.freemium.purpose}</p>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-bold text-purple-600">{slide.model.premium.title}</h3>
                  <ul className="space-y-2">
                    {slide.model.premium.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-purple-600 font-medium">{slide.model.premium.purpose}</p>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-yellow-50">
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-bold text-green-600">{slide.model.commission.title}</h3>
                  <div className="space-y-3">
                    {slide.model.commission.streams.map((stream: any, index: number) => (
                      <div key={index} className="p-2 bg-white rounded">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{stream.product}</span>
                          <span className="text-sm text-green-600">{stream.rate}</span>
                        </div>
                        <p className="text-xs text-gray-600">{stream.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'unit-economics':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 text-center bg-gradient-to-br from-red-50 to-orange-50">
                <CardContent className="space-y-3">
                  <h3 className="text-lg font-bold text-red-600">CAC</h3>
                  <div className="text-3xl font-bold text-red-800">{slide.economics.cac.value}</div>
                  <p className="text-sm text-gray-600">{slide.economics.cac.description}</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-blue-50">
                <CardContent className="space-y-3">
                  <h3 className="text-lg font-bold text-green-600">LTV</h3>
                  <div className="text-3xl font-bold text-green-800">{slide.economics.ltv.value}</div>
                  <p className="text-sm text-gray-600">{slide.economics.ltv.description}</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="space-y-3">
                  <h3 className="text-lg font-bold text-blue-600">LTV/CAC</h3>
                  <div className="text-3xl font-bold text-blue-800">{slide.economics.ratio.value}</div>
                  <p className="text-sm text-gray-600">{slide.economics.ratio.description}</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="space-y-3">
                  <h3 className="text-lg font-bold text-purple-600">Payback</h3>
                  <div className="text-3xl font-bold text-purple-800">{slide.economics.payback.value}</div>
                  <p className="text-sm text-gray-600">{slide.economics.payback.description}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent>
                <h3 className="text-2xl font-bold text-center mb-6 text-green-800">{slide.breakdown.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slide.breakdown.components.map((comp: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <div>
                        <p className="font-semibold">{comp.source}</p>
                        <p className="text-sm text-gray-600">{comp.description}</p>
                      </div>
                      <div className="text-xl font-bold text-green-600">{comp.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'go-to-market':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            
            <div className="space-y-6">
              {slide.phases.map((phase: any, index: number) => (
                <Card key={index} className="p-6">
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-600">{phase.phase}</h3>
                        <p className="text-gray-600">{phase.timeline} • Target: {phase.target}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase.strategy.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'competitive-moats':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slide.moats.map((moat: any, index: number) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <moat.icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-purple-600">{moat.type}</h3>
                    </div>
                    <p className="text-gray-600">{moat.description}</p>
                    <div className="text-sm text-blue-600 font-medium">Timeline: {moat.timeline}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'traction':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Star className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {slide.metrics.map((metric: any, index: number) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">{metric.metric}</h3>
                    <div className="text-3xl font-bold text-blue-600">{metric.value}</div>
                    <p className="text-gray-600">{metric.growth}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
              <CardContent>
                <h3 className="text-2xl font-bold text-center mb-6 text-blue-800">User Testimonials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {slide.testimonials.map((testimonial: any, index: number) => (
                    <div key={index} className="p-4 bg-white rounded-lg">
                      <p className="text-gray-700 italic mb-3">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'vision':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
            </div>
            
            <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 mb-8">
              <CardContent>
                <p className="text-xl text-center text-gray-800 font-medium leading-relaxed">
                  "{slide.vision}"
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {slide.goals.map((goal: string, index: number) => (
                <Card key={index} className="p-6">
                  <CardContent className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{goal}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-blue-50">
                <CardContent className="space-y-3">
                  <h3 className="text-lg font-bold text-green-600">Individual Impact</h3>
                  <p className="text-gray-700">{slide.impact.individual}</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="space-y-3">
                  <h3 className="text-lg font-bold text-blue-600">Societal Impact</h3>
                  <p className="text-gray-700">{slide.impact.societal}</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="space-y-3">
                  <h3 className="text-lg font-bold text-purple-600">Economic Impact</h3>
                  <p className="text-gray-700">{slide.impact.economic}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'funding':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{slide.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Fund Allocation</h3>
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
                <h3 className="text-2xl font-bold mb-6">18-Month Milestones</h3>
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

            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-green-800">Investment Opportunity</h3>
                <div className="flex justify-center gap-8 flex-wrap">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">$2M</div>
                    <div className="text-gray-600">Raising</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">$16M</div>
                    <div className="text-gray-600">Valuation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">12.5%</div>
                    <div className="text-gray-600">Equity</div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
