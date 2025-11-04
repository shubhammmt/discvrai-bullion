import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Brain, TrendingUp, Zap, Users, Target, Trophy, BarChart3, CheckCircle, Phone, Mail, Globe, Building2, Shield, Rocket, Database, Network, DollarSign, Eye, Link2 } from "lucide-react";

const B2BCapabilities = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      type: "cover",
      title: "DISCVR.AI - B2B Financial Intelligence Platform",
      subtitle: "Enterprise-Grade AI Research Infrastructure for Financial Services",
      tagline: "Stocks • Mutual Funds • Engagement • Distribution",
      contact: {
        phone: "+91 9873961591",
        email: "shubham@discvr.ai",
        website: "www.discvr.ai"
      }
    },
    {
      id: 2,
      type: "overview",
      title: "Who We Serve",
      subtitle: "AI-Powered Infrastructure for the Entire Financial Services Ecosystem",
      audiences: [
        {
          icon: Building2,
          title: "Asset Management Companies",
          needs: ["Digital presence for distributors", "D2C platform launch", "Engagement & retention", "Brand differentiation"],
          ourSolution: "White-labeled research platform with distributor tools & investor engagement"
        },
        {
          icon: Network,
          title: "Wealth Management & Distributors",
          needs: ["Client acquisition tools", "Research credibility", "Portfolio management", "Operational efficiency"],
          ourSolution: "CRM-integrated AI research with white-label capability for your clients"
        },
        {
          icon: TrendingUp,
          title: "Brokerage Firms",
          needs: ["Trading insights at scale", "Client retention", "Product differentiation", "Advisory automation"],
          ourSolution: "Multi-asset AI research engine (stocks, MF, IPOs) with real-time insights"
        },
        {
          icon: Users,
          title: "Financial Advisory Platforms",
          needs: ["Scalable advisory tools", "Client engagement", "Compliance-ready reports", "Technology infrastructure"],
          ourSolution: "Turnkey AI advisory platform with automated research & compliance"
        }
      ]
    },
    {
      id: 3,
      type: "problem",
      title: "The B2B Challenge in Financial Services",
      subtitle: "What We're Solving For",
      challenges: [
        {
          segment: "All Partners",
          pain: "Build vs Buy Dilemma",
          details: [
            "In-house AI development: ₹5-10 Cr investment + 18-24 months",
            "Research analyst teams: ₹1.5-3 Cr/year ongoing cost",
            "Technology talent shortage in financial AI",
            "Can't match Groww/Zerodha user experience"
          ]
        },
        {
          segment: "AMCs & Wealth Managers",
          pain: "Distributor & Client Activation",
          details: [
            "Low engagement on existing platforms (<20% DAU)",
            "Distributors use third-party tools (loss of control)",
            "D2C conversion challenges",
            "Poor content ROI despite high spending"
          ]
        },
        {
          segment: "Brokerages & Advisors",
          pain: "Research at Scale",
          details: [
            "Manual research doesn't scale beyond 50-100 clients",
            "Third-party research is generic (not differentiating)",
            "Multi-asset coverage gaps (stocks, MF, bonds, etc.)",
            "Real-time insights not feasible with human analysts"
          ]
        }
      ]
    },
    {
      id: 4,
      type: "solution",
      title: "DISCVR's 3-Engine Solution",
      subtitle: "Cross-Asset AI Intelligence Infrastructure",
      engines: [
        {
          icon: Brain,
          title: "Mutual Fund Intelligence Engine",
          coverage: "8,000+ funds analyzed",
          capabilities: [
            "Natural language fund search ('Best large-cap funds for SIPs')",
            "AI-powered fund scoring across 50+ parameters",
            "Automated portfolio analysis & recommendations",
            "Category comparison & peer benchmarking",
            "Fund manager track record analysis"
          ],
          useCases: "AMCs (product positioning), Distributors (client recommendations), Platforms (discovery)"
        },
        {
          icon: TrendingUp,
          title: "Stock Research Engine",
          coverage: "3,000+ stocks covered",
          capabilities: [
            "Multi-agent AI system (fundamental, technical, sentiment)",
            "Real-time price alerts & technical signals",
            "Natural language queries ('Growth stocks under ₹500')",
            "Automated earnings analysis & forecasts",
            "Peer comparison & industry analysis"
          ],
          useCases: "Brokerages (advisory automation), Wealth managers (portfolio construction)"
        },
        {
          icon: Trophy,
          title: "Engagement & Gamification Engine",
          coverage: "Contest infrastructure",
          capabilities: [
            "Stock picking contests & leaderboards",
            "Knowledge quizzes & certification programs",
            "Referral & viral mechanics built-in",
            "Performance tracking & rewards system",
            "White-label branding for partners"
          ],
          useCases: "All partners (user activation, retention, viral growth)"
        }
      ]
    },
    {
      id: 5,
      type: "integration",
      title: "3 Ways to Work With Us",
      subtitle: "Flexible Integration for Every Business Model",
      paths: [
        {
          icon: Rocket,
          title: "Turnkey Platform (For AMCs & New Entrants)",
          timeline: "Live in 4-6 weeks",
          pricing: "₹25-60L/month",
          includes: [
            "Complete white-labeled platform (yourwealth.com)",
            "Mobile app (iOS + Android) with your branding",
            "Investor portal + Distributor CRM",
            "Full AI research suite (stocks + MF)",
            "Contest & gamification engine",
            "Hosting, maintenance & support"
          ],
          bestFor: "AMCs without digital infrastructure, new wealth platforms"
        },
        {
          icon: Link2,
          title: "API Integration (For Existing Platforms)",
          timeline: "Live in 2-3 weeks",
          pricing: "₹8-25L/month",
          includes: [
            "RESTful APIs for all research engines",
            "Your UX + Our AI brain",
            "Real-time data sync",
            "Custom branding & workflows",
            "Technical support & documentation",
            "Usage-based scaling"
          ],
          bestFor: "Existing platforms, brokerages, wealth managers with apps"
        },
        {
          icon: Zap,
          title: "Widget Embed (Quick Launch)",
          timeline: "Live in 3-5 days",
          pricing: "₹5-15L/month",
          includes: [
            "Copy-paste embed code",
            "Pre-built UI components",
            "Fund screener widget",
            "Stock research widget",
            "Contest leaderboard widget",
            "Zero backend work required"
          ],
          bestFor: "Quick pilots, content sites, advisory platforms"
        }
      ]
    },
    {
      id: 6,
      type: "use-cases",
      title: "Implementation Examples",
      subtitle: "How Different Partners Use DISCVR",
      examples: [
        {
          partner: "Large AMC (Hypothetical)",
          objective: "Launch D2C platform & activate 5,000+ distributors",
          implementation: "Turnkey white-labeled platform",
          features: [
            "Investor app: AI fund recommendations, portfolio tracking",
            "Distributor portal: Client CRM, research library, performance tracking",
            "Monthly contests: 'Best Portfolio Builder' with ₹50K prizes",
            "Auto-generated client reports for distributors"
          ],
          outcome: "80% distributor activation, 15K D2C users in 6 months, 3x engagement vs industry"
        },
        {
          partner: "Wealth Management Platform",
          objective: "Scale advisory from 500 to 5,000 clients without hiring",
          implementation: "API integration into existing CRM",
          features: [
            "AI-generated portfolio recommendations",
            "Automated client risk profiling",
            "Research library accessible to all advisors",
            "Compliance-ready investment reports"
          ],
          outcome: "10x advisor productivity, 40% reduction in research costs, premium pricing justified"
        },
        {
          partner: "Regional Brokerage",
          objective: "Compete with discount brokers on research quality",
          implementation: "Widget embed + Custom branding",
          features: [
            "Stock screener on homepage",
            "Real-time market insights",
            "Educational quizzes for client onboarding",
            "Leaderboard for top-performing clients"
          ],
          outcome: "25% increase in client retention, 40% boost in trading volumes"
        }
      ]
    },
    {
      id: 7,
      type: "engagement",
      title: "The Engagement Advantage",
      subtitle: "Why Gamification Matters for Financial Services",
      problem: "Most B2B platforms suffer from <20% DAU despite high development costs",
      solution: "Contest-driven engagement mechanics",
      mechanics: [
        {
          type: "For Retail Investors (D2C)",
          examples: [
            "'Beat the Market' monthly stock picking contests",
            "Portfolio building challenges (₹1L virtual money)",
            "Quiz-to-unlock premium research",
            "Leaderboards with real cash prizes (₹10-50K)"
          ],
          impact: "3x daily active users, 5x time on platform, viral sharing"
        },
        {
          type: "For Distributors/Advisors (B2B)",
          examples: [
            "IFA rankings by client acquisition & AUM",
            "Knowledge contests on fund selection (win training trips)",
            "Certification gamification (badges unlock tools)",
            "Regional leaderboards with rewards"
          ],
          impact: "80%+ platform adoption, peer competition drives usage"
        }
      ],
      caseStudy: {
        title: "Hypothetical AMC Implementation",
        setup: "5,000 distributors, launched monthly contest",
        results: [
          "Week 1: 1,200 distributors registered (24% activation)",
          "Week 4: 3,500 active participants (70% activation)",
          "Ongoing: 60% monthly recurring engagement (vs 15% industry avg)"
        ]
      }
    },
    {
      id: 8,
      type: "technology",
      title: "Technology Foundation",
      subtitle: "Built for Scale, Security & Compliance",
      stack: [
        {
          category: "AI/ML Infrastructure",
          icon: Brain,
          details: [
            "Multi-agent LLM orchestration (GPT-4, Claude, Gemini)",
            "Proprietary financial data models trained on 10+ years market data",
            "Real-time sentiment analysis from 100+ news sources",
            "Automated backtesting & validation systems"
          ]
        },
        {
          category: "Data & Compliance",
          icon: Shield,
          details: [
            "Licensed data partnerships (BSE, NSE, AMFI, etc.)",
            "SEBI-compliant disclaimers & audit trails",
            "SOC 2 Type II compliant infrastructure",
            "Data encryption at rest & in transit (256-bit)"
          ]
        },
        {
          category: "Platform Scalability",
          icon: Database,
          details: [
            "Handles 1M+ API calls/day without degradation",
            "99.9% uptime SLA with automatic failover",
            "CDN-powered global delivery",
            "Horizontal scaling for peak traffic (market hours)"
          ]
        }
      ]
    },
    {
      id: 9,
      type: "competitive",
      title: "Why DISCVR vs Alternatives",
      comparisons: [
        {
          vs: "Building In-House",
          discvr: [
            "✅ Live in 3 weeks (vs 18 months)",
            "✅ ₹8-60L/month (vs ₹5 Cr/year)",
            "✅ Continuous AI improvements included",
            "✅ Zero hiring headaches"
          ],
          them: [
            "❌ 18-24 month build time",
            "❌ ₹5-10 Cr upfront + ₹3 Cr/year",
            "❌ Talent acquisition nightmare",
            "❌ Tech debt & maintenance burden"
          ]
        },
        {
          vs: "ValueResearch/Morningstar",
          discvr: [
            "✅ Stocks + Mutual Funds (multi-asset)",
            "✅ White-label capability",
            "✅ Engagement engine built-in",
            "✅ Custom integrations",
            "✅ AI-native from day 1"
          ],
          them: [
            "❌ MF-only focus (no stocks)",
            "❌ No white-labeling",
            "❌ Static content (no gamification)",
            "❌ Rigid APIs",
            "❌ Legacy tech stack"
          ]
        },
        {
          vs: "Generic AI Tools (ChatGPT wrappers)",
          discvr: [
            "✅ Domain-trained on financial data",
            "✅ Compliant with SEBI regulations",
            "✅ Real-time market data integration",
            "✅ Audit trails & explanations",
            "✅ Multi-asset coverage"
          ],
          them: [
            "❌ Generic AI (hallucinations risk)",
            "❌ No compliance framework",
            "❌ No live data access",
            "❌ Black-box outputs",
            "❌ Single-asset focus"
          ]
        }
      ],
      moats: [
        "18+ months AI development lead in financial domain",
        "Only platform with cross-asset AI (stocks + MF + IPOs + credit)",
        "Battle-tested engagement infrastructure (contests, gamification)",
        "Proven B2B integrations with financial institutions"
      ]
    },
    {
      id: 10,
      type: "roi",
      title: "ROI & Economics",
      subtitle: "How Partners Justify DISCVR Investment",
      investment: "₹8-60L/month (based on integration model)",
      costsAvoided: [
        { 
          category: "Technology Build", 
          internal: "₹5-10 Cr upfront + 18 months", 
          discvr: "₹0 (we provide infrastructure)",
          savings: "₹5-10 Cr one-time"
        },
        { 
          category: "AI/Tech Team", 
          internal: "₹3-5 Cr/year (10-15 engineers)", 
          discvr: "Included in subscription",
          savings: "₹3-5 Cr/year"
        },
        { 
          category: "Research Analysts", 
          internal: "₹1.5-2 Cr/year (5-8 analysts)", 
          discvr: "AI handles 90% of research",
          savings: "₹1-1.5 Cr/year"
        },
        { 
          category: "Content & Engagement", 
          internal: "₹50L-1 Cr/year (low ROI)", 
          discvr: "Gamification drives organic engagement",
          savings: "₹50L-1 Cr/year"
        }
      ],
      revenueImpact: [
        {
          metric: "Distributor Productivity",
          baseline: "5-10 clients per advisor",
          withDiscvr: "15-30 clients per advisor (AI automation)",
          impact: "2-3x revenue per FTE"
        },
        {
          metric: "D2C Conversion",
          baseline: "2-5% visitor-to-investor conversion",
          withDiscvr: "8-15% (AI recommendations + engagement)",
          impact: "3-4x conversion rate"
        },
        {
          metric: "User Retention",
          baseline: "15-25% monthly active users",
          withDiscvr: "40-60% (gamification & contests)",
          impact: "2.5x retention, lower CAC"
        },
        {
          metric: "AUM Growth (AMCs)",
          baseline: "Organic growth rate",
          withDiscvr: "Additional ₹100-500 Cr AUM from activated distributors",
          impact: "Management fees justify investment 10x"
        }
      ],
      netROI: "8-15x return in Year 1 for most partners"
    },
    {
      id: 11,
      type: "founder",
      title: "Built by Operators Who've Solved This Before",
      subtitle: "Founder Profile: Shubham Srivastava",
      founder: {
        name: "Shubham Srivastava",
        title: "2nd Time Founder | 15+ Years in Digital Transformation & AI/ML",
        expertise: "Rare combination of B2B digital transformation at scale + B2C platform scaling + AI/ML expertise",
        timeline: [
          {
            period: "2022-2024",
            role: "Eureka Forbes - CPTO/CIO",
            achievement: "Led digital transformation building D2C platform with 1M+ monthly users & IoT ecosystem. Optimized IT costs 20% YoY.",
            relevance: "B2B transformation for 10,000+ field agents + D2C scaling"
          },
          {
            period: "2019-2022",
            role: "HT Digital - CTO",
            achievement: "Scaled from few million to 100M+ users/month while turning profitable. Built ML-powered real-time publishing infrastructure.",
            relevance: "Content distribution at massive scale with AI/ML from day 1"
          },
          {
            period: "2015-2019",
            role: "Tekch (1st Startup) - Founder",
            achievement: "Built AI & IoT SaaS for commercial real estate, scaled to 10M+ sq. ft. management.",
            relevance: "Key learnings: distribution-first strategy & unit economics from Day 1"
          },
          {
            period: "2011-2015",
            role: "MakeMyTrip Hotels - Engineering Lead",
            achievement: "Built core product architecture handling millions of real-time transactions with dynamic ML-based e-commerce layer.",
            relevance: "High-scale transaction systems with ML optimization"
          },
          {
            period: "2008-2011",
            role: "iTrust - Engineering Lead",
            achievement: "Drove development across fintech products. Strong IP contributed to Karvy acquisition. Real estate division evolved into Housing.com.",
            relevance: "Financial services tech from early days"
          }
        ],
        whyItMatters: "Building India's largest financial intelligence distributor requires exactly this DNA: B2B transformation + B2C scaling + AI/ML expertise + fintech experience"
      }
    },
    {
      id: 12,
      type: "case-study",
      title: "Pilot Program Results",
      subtitle: "What Early Partners Are Seeing",
      disclaimer: "Based on pilot implementations and partner feedback",
      results: [
        {
          partner: "Regional Wealth Management Firm",
          challenge: "500 advisors, each manually researching for 5-8 clients max",
          implementation: "API integration into CRM + mobile app",
          timeline: "3 weeks integration, 8 weeks rollout",
          metrics: [
            "Advisor capacity: 5-8 clients → 20-25 clients",
            "Research time: 4 hours/week → 30 mins/week per advisor",
            "Client satisfaction: +35% (faster recommendations)",
            "Platform adoption: 78% of advisors active monthly"
          ],
          quote: "Our advisors now spend time on relationships, not research. DISCVR became our competitive moat."
        },
        {
          partner: "Mid-Size AMC (50+ Distributor Network)",
          challenge: "Distributors using competitor platforms, no engagement",
          implementation: "White-labeled distributor portal with contests",
          timeline: "6 weeks build, launched with monthly contest",
          metrics: [
            "Distributor activation: 18% → 65% in 3 months",
            "Contest participation: 500+ distributors monthly",
            "Research downloads: 5x increase",
            "AUM from pilot distributors: +₹120 Cr in 6 months"
          ],
          quote: "Gamification changed everything. Distributors now compete to use our platform, not avoid it."
        }
      ]
    },
    {
      id: 13,
      type: "next-steps",
      title: "Get Started",
      subtitle: "3 Ways to Engage",
      options: [
        {
          icon: Eye,
          title: "Quick Demo (15 Minutes)",
          duration: "This Week",
          cost: "Free",
          includes: [
            "Live walkthrough of AI engines",
            "See contests & gamification in action",
            "Technical Q&A",
            "Custom use-case discussion"
          ],
          cta: "Book demo call",
          bestFor: "Initial exploration, understanding capabilities"
        },
        {
          icon: Target,
          title: "Proof-of-Concept (60 Days)",
          duration: "2 Months",
          cost: "₹15-25L investment",
          includes: [
            "Limited rollout (10-50 users/distributors)",
            "Integration into your systems",
            "Success metrics tracking",
            "Quantify ROI before full commitment"
          ],
          cta: "Discuss POC scope",
          bestFor: "De-risking decision, proving value internally"
        },
        {
          icon: Rocket,
          title: "Full Partnership (Custom)",
          duration: "Ongoing",
          cost: "₹8-60L/month (based on model)",
          includes: [
            "Complete platform access",
            "White-labeling & customization",
            "Dedicated success manager",
            "Quarterly product roadmap input"
          ],
          cta: "Explore partnership models",
          bestFor: "Ready to scale, long-term strategic partnership"
        }
      ],
      contact: {
        phone: "+91 9873961591",
        email: "shubham@discvr.ai",
        website: "www.discvr.ai",
        calendly: "calendly.com/discvr-demo"
      }
    },
    {
      id: 14,
      type: "closing",
      title: "Why Now?",
      urgency: [
        {
          trend: "AI Race",
          insight: "Early movers in AI-powered advisory are capturing market share. 18-month lead = significant advantage."
        },
        {
          trend: "Regulatory Tailwinds",
          insight: "SEBI crackdown on finfluencers = demand shift to credible, compliant platforms."
        },
        {
          trend: "User Expectations",
          insight: "Groww/Zerodha set new UX standards. Traditional players must match or exceed."
        },
        {
          trend: "Distribution Economics",
          insight: "Cost of in-house build rising (AI talent shortage). Build-vs-buy tilting toward partnerships."
        }
      ],
      finalCta: "Let's discuss how DISCVR can become your AI research partner.",
      contact: {
        phone: "+91 9873961591",
        email: "shubham@discvr.ai",
        linkedin: "linkedin.com/in/shubham-srivastava"
      }
    }
  ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === " ") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex flex-col print:bg-white"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur print:hidden">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            DISCVR.AI - B2B Capabilities Deck
          </div>
          <div className="flex gap-4 text-sm">
            <a href="mailto:shubham@discvr.ai" className="text-primary hover:underline">shubham@discvr.ai</a>
            <span className="text-muted-foreground">+91 9873961591</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl">
          
          {/* Cover Slide */}
          {currentSlideData.type === "cover" && (
            <div className="text-center space-y-8 py-12">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  {currentSlideData.title}
                </h1>
                <p className="text-2xl md:text-4xl font-semibold text-foreground">
                  {currentSlideData.subtitle}
                </p>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                  {currentSlideData.tagline}
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-lg mt-16">
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>{currentSlideData.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>{currentSlideData.contact.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
                  <Globe className="w-5 h-5 text-primary" />
                  <span>{currentSlideData.contact.website}</span>
                </div>
              </div>
            </div>
          )}

          {/* Overview Slide */}
          {currentSlideData.type === "overview" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{currentSlideData.title}</h2>
                <p className="text-xl text-muted-foreground">{currentSlideData.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {currentSlideData.audiences.map((audience, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <audience.icon className="w-10 h-10 text-primary" />
                        <h3 className="text-2xl font-bold">{audience.title}</h3>
                      </div>
                      
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">Your Challenges:</p>
                        <ul className="space-y-1">
                          {audience.needs.map((need, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-destructive mt-0.5">•</span>
                              <span>{need}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t">
                        <p className="text-sm font-semibold text-primary mb-1">Our Solution:</p>
                        <p className="text-sm">{audience.ourSolution}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Problem Slide */}
          {currentSlideData.type === "problem" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{currentSlideData.title}</h2>
                <p className="text-xl text-muted-foreground">{currentSlideData.subtitle}</p>
              </div>

              <div className="space-y-6">
                {currentSlideData.challenges.map((challenge, idx) => (
                  <Card key={idx} className="bg-card/80 backdrop-blur">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-destructive/10 text-destructive px-3 py-1 rounded text-sm font-semibold">
                          {challenge.segment}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-3">{challenge.pain}</h3>
                          <ul className="grid md:grid-cols-2 gap-2">
                            {challenge.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span className="text-destructive mt-0.5">✗</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Solution Slide */}
          {currentSlideData.type === "solution" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{currentSlideData.title}</h2>
                <p className="text-xl text-muted-foreground">{currentSlideData.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {currentSlideData.engines.map((engine, idx) => (
                  <Card key={idx} className="hover:shadow-xl transition-all hover:scale-105">
                    <CardContent className="pt-6 space-y-4">
                      <engine.icon className="w-14 h-14 text-primary mx-auto" />
                      <h3 className="text-xl font-bold text-center">{engine.title}</h3>
                      <p className="text-center text-sm font-semibold text-primary">{engine.coverage}</p>
                      
                      <div className="space-y-2">
                        {engine.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t text-xs text-muted-foreground italic">
                        {engine.useCases}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Integration Slide */}
          {currentSlideData.type === "integration" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{currentSlideData.title}</h2>
                <p className="text-xl text-muted-foreground">{currentSlideData.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {currentSlideData.paths.map((path, idx) => (
                  <Card key={idx} className="hover:border-primary transition-colors">
                    <CardContent className="pt-6 space-y-4">
                      <path.icon className="w-12 h-12 text-primary mx-auto" />
                      <h3 className="text-lg font-bold text-center">{path.title}</h3>
                      
                      <div className="space-y-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold text-sm">{path.timeline}</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{path.pricing}</div>
                      </div>

                      <div className="space-y-2 pt-3 border-t">
                        {path.includes.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 text-xs text-muted-foreground italic text-center">
                        Best for: {path.bestFor}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Use Cases Slide */}
          {currentSlideData.type === "use-cases" && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{currentSlideData.title}</h2>
                <p className="text-xl text-muted-foreground">{currentSlideData.subtitle}</p>
              </div>

              <div className="space-y-6">
                {currentSlideData.examples.map((example, idx) => (
                  <Card key={idx} className="bg-gradient-to-br from-card to-secondary/5">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-primary mb-1">{example.partner}</h3>
                          <p className="text-sm text-muted-foreground mb-3">Objective: {example.objective}</p>
                          <p className="text-sm"><span className="font-semibold">Implementation:</span> {example.implementation}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold mb-2">Features Deployed:</p>
                          <ul className="space-y-1">
                            {example.features.map((feature, i) => (
                              <li key={i} className="text-xs flex items-start gap-2">
                                <span className="text-primary">▸</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-sm font-semibold mb-2">Results:</p>
                          <p className="text-sm bg-green-50 dark:bg-green-950/30 p-3 rounded border border-green-200 dark:border-green-900">
                            {example.outcome}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Engagement Slide */}
          {currentSlideData.type === "engagement" && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{currentSlideData.title}</h2>
                <p className="text-xl text-muted-foreground">{currentSlideData.subtitle}</p>
              </div>

              <Card className="bg-destructive/5 border-destructive/20">
                <CardContent className="pt-6 text-center">
                  <p className="text-lg"><span className="font-semibold">Problem:</span> {currentSlideData.problem}</p>
                  <p className="text-lg mt-2"><span className="font-semibold text-green-600">Solution:</span> {currentSlideData.solution}</p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {currentSlideData.mechanics.map((mechanic, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-6 space-y-3">
                      <h3 className="text-lg font-bold text-primary">{mechanic.type}</h3>
                      <ul className="space-y-2">
                        {mechanic.examples.map((example, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <Trophy className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm font-semibold text-green-600 pt-2 border-t">
                        Impact: {mechanic.impact}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-3">{currentSlideData.caseStudy.title}</h3>
                  <p className="text-sm mb-3">{currentSlideData.caseStudy.setup}</p>
                  <div className="space-y-1">
                    {currentSlideData.caseStudy.results.map((result, i) => (
                      <p key={i} className="text-sm flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{result}</span>
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Technology Slide */}
          {currentSlideData.type === "technology" && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{currentSlideData.title}</h2>
                <p className="text-xl text-muted-foreground">{currentSlideData.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {currentSlideData.stack.map((item, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 space-y-4">
                      <item.icon className="w-12 h-12 text-primary mx-auto" />
                      <h3 className="text-lg font-bold text-center">{item.category}</h3>
                      <ul className="space-y-2">
                        {item.details.map((detail, i) => (
                          <li key={i} className="text-xs flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Competitive Slide */}
          {currentSlideData.type === "competitive" && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{currentSlideData.title}</h2>
              </div>

              <div className="space-y-4">
                {currentSlideData.comparisons.map((comp, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-4 text-center">{comp.vs}</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="font-semibold text-green-600 mb-2">DISCVR Advantage:</p>
                          <ul className="space-y-1">
                            {comp.discvr.map((item, i) => (
                              <li key={i} className="text-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-muted-foreground mb-2">Alternatives:</p>
                          <ul className="space-y-1">
                            {comp.them.map((item, i) => (
                              <li key={i} className="text-sm text-muted-foreground">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-3 text-center">Our Competitive Moats:</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {currentSlideData.moats.map((moat, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{moat}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ROI Slide */}
          {currentSlideData.type === "roi" && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{currentSlideData.title}</h2>
                <p className="text-xl text-muted-foreground">{currentSlideData.subtitle}</p>
              </div>

              <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10">
                <CardContent className="pt-6 text-center">
                  <p className="text-lg font-semibold">Investment: {currentSlideData.investment}</p>
                </CardContent>
              </Card>

              <div>
                <h3 className="text-xl font-bold mb-4 text-center">Cost Avoidance:</h3>
                <div className="space-y-3">
                  {currentSlideData.costsAvoided.map((cost, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-4">
                        <div className="grid md:grid-cols-3 gap-4 items-center text-sm">
                          <div className="font-semibold">{cost.category}</div>
                          <div className="text-destructive">Internal: {cost.internal}</div>
                          <div className="text-green-600 font-semibold">Savings: {cost.savings}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-center">Revenue Impact:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentSlideData.revenueImpact.map((impact, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-4 space-y-2">
                        <p className="font-semibold text-sm">{impact.metric}</p>
                        <p className="text-xs text-muted-foreground">Baseline: {impact.baseline}</p>
                        <p className="text-xs text-primary">With DISCVR: {impact.withDiscvr}</p>
                        <p className="text-sm font-semibold text-green-600">{impact.impact}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30">
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl font-bold text-green-600">{currentSlideData.netROI}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Founder Slide */}
          {currentSlideData.type === "founder" && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{currentSlideData.title}</h2>
                <p className="text-lg text-muted-foreground">{currentSlideData.subtitle}</p>
              </div>

              <Card className="bg-gradient-to-br from-primary/5 to-blue-500/5">
                <CardContent className="pt-6 space-y-3">
                  <h3 className="text-2xl font-bold">{currentSlideData.founder.name}</h3>
                  <p className="text-sm font-semibold text-primary">{currentSlideData.founder.title}</p>
                  <p className="text-sm italic">{currentSlideData.founder.expertise}</p>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {currentSlideData.founder.timeline.map((exp, idx) => (
                  <Card key={idx} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded text-xs font-semibold whitespace-nowrap">
                          {exp.period}
                        </div>
                        <div className="flex-1 space-y-2">
                          <h4 className="font-bold text-sm">{exp.role}</h4>
                          <p className="text-xs">{exp.achievement}</p>
                          <p className="text-xs text-primary italic">→ {exp.relevance}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30">
                <CardContent className="pt-6">
                  <p className="text-sm font-semibold text-center">{currentSlideData.founder.whyItMatters}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Case Study Slide */}
          {currentSlideData.type === "case-study" && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{currentSlideData.title}</h2>
                <p className="text-lg text-muted-foreground">{currentSlideData.subtitle}</p>
                <p className="text-xs text-muted-foreground italic mt-2">{currentSlideData.disclaimer}</p>
              </div>

              <div className="space-y-6">
                {currentSlideData.results.map((result, idx) => (
                  <Card key={idx} className="bg-gradient-to-br from-card to-secondary/5">
                    <CardContent className="pt-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-2">{result.partner}</h3>
                        <p className="text-sm"><span className="font-semibold">Challenge:</span> {result.challenge}</p>
                        <p className="text-sm"><span className="font-semibold">Implementation:</span> {result.implementation}</p>
                        <p className="text-xs text-muted-foreground"><span className="font-semibold">Timeline:</span> {result.timeline}</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold mb-2">Key Metrics:</p>
                        <div className="grid md:grid-cols-2 gap-2">
                          {result.metrics.map((metric, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs bg-green-50 dark:bg-green-950/30 p-2 rounded">
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-primary/5 p-3 rounded border-l-4 border-primary">
                        <p className="text-sm italic">"{result.quote}"</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps Slide */}
          {currentSlideData.type === "next-steps" && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{currentSlideData.title}</h2>
                <p className="text-xl text-muted-foreground">{currentSlideData.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {currentSlideData.options.map((option, idx) => (
                  <Card key={idx} className="hover:shadow-xl transition-all hover:scale-105">
                    <CardContent className="pt-6 space-y-4 text-center">
                      <option.icon className="w-12 h-12 text-primary mx-auto" />
                      <h3 className="text-xl font-bold">{option.title}</h3>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Duration: {option.duration}</p>
                        <p className="text-2xl font-bold text-green-600">{option.cost}</p>
                      </div>

                      <ul className="space-y-2 text-left">
                        {option.includes.map((item, i) => (
                          <li key={i} className="text-xs flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <Button className="w-full">{option.cta}</Button>

                      <p className="text-xs text-muted-foreground italic">
                        {option.bestFor}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-3 text-center">Contact Us:</h3>
                  <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{currentSlideData.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>{currentSlideData.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <span>{currentSlideData.contact.website}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Closing Slide */}
          {currentSlideData.type === "closing" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">{currentSlideData.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {currentSlideData.urgency.map((item, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 space-y-2">
                      <h3 className="text-lg font-bold text-primary">{item.trend}</h3>
                      <p className="text-sm">{item.insight}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-primary to-blue-600 text-primary-foreground">
                <CardContent className="pt-8 pb-8 text-center">
                  <p className="text-3xl font-bold mb-6">{currentSlideData.finalCta}</p>
                  
                  <div className="flex flex-wrap justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      <span>{currentSlideData.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      <span>{currentSlideData.contact.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        </div>
      </div>

      {/* Navigation Controls */}
      <div className="border-t bg-card/50 backdrop-blur p-4 print:hidden">
        <div className="container mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {currentSlide + 1} / {totalSlides}
            </span>
            
            <div className="flex gap-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentSlide 
                      ? "bg-primary w-8" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default B2BCapabilities;
