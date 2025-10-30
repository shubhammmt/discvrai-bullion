import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Brain, TrendingUp, Zap, Users, Target, Trophy, BarChart3, CheckCircle, Phone, Mail, Globe } from "lucide-react";

const AMCPitch = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      type: "cover",
      title: "AI Research Infrastructure for AMCs",
      subtitle: "Power Your Digital Journey - Stocks, Funds & Engagement",
      contact: {
        phone: "+91 9873961591",
        email: "shubham@discvr.ai",
        website: "www.discvr.ai"
      }
    },
    {
      id: 2,
      type: "challenge",
      title: "Your Digital Challenge",
      subtitle: "Pick Your Path",
      scenarios: [
        {
          title: "Scenario A: No Platform Yet",
          points: [
            "Need to launch digital presence fast",
            "Can't spend ₹5 Cr + 18 months building",
            "Distributors demanding modern tools",
            "Missing D2C opportunity"
          ]
        },
        {
          title: "Scenario B: Have Platform, Need Intelligence",
          points: [
            "Existing app/portal lacks AI",
            "Poor engagement and conversions",
            "Distributors not using it actively",
            "Competing with Groww/Zerodha UX"
          ]
        }
      ],
      solution: "One Solution for Both: DISCVR = Your AI Brain"
    },
    {
      id: 3,
      type: "engines",
      title: "What We Provide",
      subtitle: "3 Core Engines",
      engines: [
        {
          icon: Brain,
          title: "Mutual Fund Intelligence",
          points: [
            "8,000+ funds AI-scored",
            "Natural language search",
            "Auto-generated reports"
          ]
        },
        {
          icon: TrendingUp,
          title: "Stock Research Intelligence",
          points: [
            "3,000+ stocks analyzed",
            "Multi-agent AI system",
            "Real-time insights"
          ]
        },
        {
          icon: Trophy,
          title: "Engagement Engine",
          badge: "NEW",
          points: [
            "Contests & leaderboards",
            "Gamified learning",
            "Viral distribution mechanics"
          ]
        }
      ]
    },
    {
      id: 4,
      type: "flywheel",
      title: "The Engagement Flywheel",
      problem: "AMCs spend lakhs on content but get low engagement",
      solution: "Gamification that drives action",
      sections: [
        {
          title: "For Retail Investors (D2C)",
          items: [
            "Stock Picking Contests: 'Beat the Market' monthly challenges",
            "Leaderboards: Top performers win rewards (₹10K prizes)",
            "Learning Quizzes: Earn points, unlock premium research",
            "Portfolio Challenges: 'Build best ₹1L portfolio'"
          ]
        },
        {
          title: "For Distributors (B2B)",
          items: [
            "IFA Rankings: Top research users get featured",
            "Knowledge Contests: Test on fund selection, win trips",
            "Client Acquisition Race: Leaderboard by AUM added",
            "Certification Gamification: Earn badges, unlock tools"
          ]
        }
      ],
      outcomes: [
        "3x daily active users",
        "40% increase in time spent",
        "Viral sharing (contests drive referrals)",
        "Data on engaged distributors"
      ]
    },
    {
      id: 5,
      type: "integration",
      title: "How It Works",
      subtitle: "3 Integration Paths",
      paths: [
        {
          title: "No Platform? Get Turnkey Solution",
          timeline: "Live in 6 weeks",
          pricing: "₹25-50L/month",
          features: ["Co-branded platform (yourwealth.com)", "Complete digital infrastructure", "D2C + Distributor portals"]
        },
        {
          title: "Have Website/App? Add AI Brain",
          timeline: "Live in 2 weeks",
          pricing: "₹8-20L/month",
          features: ["API integration", "Your UX + Our AI", "Seamless embedding"]
        },
        {
          title: "Quick Win? Embed Widgets",
          timeline: "Live in 3 days",
          pricing: "₹5-12L/month",
          features: ["Copy-paste code", "Instant AI features", "Zero backend work"]
        }
      ]
    },
    {
      id: 6,
      type: "distributor" as const,
      title: "Distributor Platform",
      subtitle: "White-Labeled for Your 5,000+ Distributors",
      problem: {
        title: "The Problem",
        points: [
          "Distributors use third-party tools",
          "You lose control of narrative",
          "Can't track what they recommend",
          "They eventually move clients to direct platforms"
        ]
      },
      solution: {
        title: "DISCVR Solution: Give them YOUR platform",
        distributorsGet: [
          "AI stock + fund research",
          "Client CRM",
          "Contest participation (win prizes)",
          "Leaderboard status",
          "Auto-generated client reports",
          "White-labeled app (their branding)"
        ],
        youGet: [
          "Control research narrative (your funds featured)",
          "Track engagement (which distributors active)",
          "Reward top performers (contest-based incentives)",
          "Distributor lock-in (they need your tools)"
        ]
      },
      integration: "Works with their BSE StAR/MFCentral (we don't touch transactions)"
    },
    {
      id: 7,
      type: "contests",
      title: "Sample Engagement Mechanics",
      examples: [
        {
          title: 'Contest: "Beat the Fund Manager"',
          points: [
            "Monthly stock-picking contest",
            "Users build virtual portfolios",
            "Top 10 win rewards",
            "Sponsor: Your AMC (brand visibility)"
          ],
          result: "10,000+ participants, 50,000 app opens"
        },
        {
          title: 'Contest: "IFA Champions League"',
          points: [
            "Distributors compete on research quiz",
            "Leaderboard by region",
            "Top performers win conference trips"
          ],
          result: "80% distributor activation"
        },
        {
          title: 'Quiz: "Mutual Fund Mastery"',
          points: [
            "Daily quizzes on fund selection",
            "Earn points → Unlock AI reports",
            "Educational + engaging"
          ],
          result: "2x retention, better-informed investors"
        }
      ]
    },
    {
      id: 8,
      type: "roi",
      title: "ROI Calculator",
      investment: "₹8-60L/month (based on package)",
      costsAvoided: [
        { item: "AI/Tech team", amount: "₹3 Cr/year" },
        { item: "Research analysts", amount: "₹1.5 Cr/year" },
        { item: "Platform development", amount: "₹50L one-time" }
      ],
      totalSaved: "₹5 Cr/year",
      revenueImpact: [
        "Distributor productivity ↑ 30%",
        "D2C conversion ↑ 15-25%",
        "AUM growth: ₹10-20 Cr additional",
        "Contest-driven viral growth"
      ],
      netROI: "10-15x in Year 1"
    },
    {
      id: 9,
      type: "competitive",
      title: "Why DISCVR Wins",
      comparisons: [
        {
          title: "vs Internal Build",
          points: [
            "20x faster (3 weeks vs 18 months)",
            "10x cheaper (₹8L/mo vs ₹5 Cr/year)"
          ]
        },
        {
          title: "vs ValueResearch/Morningstar",
          points: [
            "✅ Stocks + Funds (they don't have both)",
            "✅ White-label (they can't)",
            "✅ Engagement engine (they don't)",
            "✅ Multi-agent AI (unique to us)"
          ]
        }
      ],
      moat: [
        "Only platform with cross-asset AI",
        "Contest/leaderboard infrastructure",
        "18 months ahead in AI development"
      ]
    },
    {
      id: 10,
      type: "cta",
      title: "Get Started",
      options: [
        {
          title: "Full Pilot (60 Days)",
          price: "₹20L investment",
          features: [
            "10-20 distributors OR D2C launch",
            "Prove ROI before commitment"
          ]
        },
        {
          title: "Quick Demo (Next Week)",
          price: "Free",
          features: [
            "15-min live demo",
            "See AI + contests in action",
            "Technical Q&A",
            "No commitment"
          ]
        },
        {
          title: "Custom Discussion",
          price: "Flexible",
          features: [
            "Your specific needs",
            "Hybrid models",
            "Revenue share options"
          ]
        }
      ],
      contact: {
        phone: "+91 9873961591",
        email: "shubham@discvr.ai",
        website: "www.discvr.ai"
      },
      cta: "See the AI in action - Book 15-min demo"
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
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 flex flex-col"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {/* Main Slide Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-7xl">
          {currentSlideData.type === "cover" && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold text-primary mb-4">
                  {currentSlideData.title}
                </h1>
                <p className="text-3xl text-muted-foreground">
                  {currentSlideData.subtitle}
                </p>
              </div>
              
              <div className="flex justify-center gap-8 text-xl mt-12">
                <div className="flex items-center gap-2">
                  <Phone className="w-6 h-6 text-primary" />
                  <span>{currentSlideData.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-6 h-6 text-primary" />
                  <span>{currentSlideData.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-6 h-6 text-primary" />
                  <span>{currentSlideData.contact.website}</span>
                </div>
              </div>
            </div>
          )}

          {currentSlideData.type === "challenge" && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-primary mb-2">{currentSlideData.title}</h2>
                <p className="text-2xl text-muted-foreground">{currentSlideData.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {currentSlideData.scenarios.map((scenario, idx) => (
                  <Card key={idx} className="bg-background/80 backdrop-blur border-2">
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-bold text-primary mb-6">{scenario.title}</h3>
                      <ul className="space-y-4">
                        {scenario.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-lg">
                            <span className="text-destructive text-2xl">✗</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <div className="inline-block bg-primary text-primary-foreground px-12 py-6 rounded-lg text-3xl font-bold">
                  {currentSlideData.solution}
                </div>
              </div>
            </div>
          )}

          {currentSlideData.type === "engines" && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-5xl font-bold text-primary mb-2">{currentSlideData.title}</h2>
                <p className="text-2xl text-muted-foreground">{currentSlideData.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {currentSlideData.engines.map((engine, idx) => (
                  <Card key={idx} className="bg-background/80 backdrop-blur border-2 relative">
                    {engine.badge && (
                      <div className="absolute -top-3 right-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                        {engine.badge}
                      </div>
                    )}
                    <CardContent className="pt-8">
                      <engine.icon className="w-16 h-16 text-primary mb-4 mx-auto" />
                      <h3 className="text-2xl font-bold text-center mb-6">{engine.title}</h3>
                      <ul className="space-y-3">
                        {engine.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-lg">
                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentSlideData.type === "flywheel" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold text-primary mb-4">{currentSlideData.title}</h2>
                <p className="text-xl text-destructive mb-2">Problem: {currentSlideData.problem}</p>
                <p className="text-xl text-green-600 font-semibold">Solution: {currentSlideData.solution}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {currentSlideData.sections.map((section, idx) => (
                  <Card key={idx} className="bg-background/80 backdrop-blur">
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-bold text-primary mb-4">{section.title}</h3>
                      <ul className="space-y-3">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                            <span className="text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-2 border-green-500">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold text-center mb-4">Outcome</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {currentSlideData.outcomes.map((outcome, i) => (
                      <div key={i} className="text-center">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="font-semibold">{outcome}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSlideData.type === "integration" && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-5xl font-bold text-primary mb-2">{currentSlideData.title}</h2>
                <p className="text-2xl text-muted-foreground">{currentSlideData.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {currentSlideData.paths.map((path, idx) => (
                  <Card key={idx} className="bg-background/80 backdrop-blur border-2 hover:border-primary transition-colors">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold text-primary mb-4">{path.title}</h3>
                      
                      <div className="mb-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-yellow-500" />
                          <span className="font-semibold text-lg">{path.timeline}</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{path.pricing}</div>
                      </div>

                      <ul className="space-y-2">
                        {path.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentSlideData.type === "distributor" && (
            (() => {
              const slideData = currentSlideData as any;
              return (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-5xl font-bold text-primary mb-2">{slideData.title}</h2>
                    <p className="text-2xl text-muted-foreground">{slideData.subtitle}</p>
                  </div>

                  <Card className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 mb-8">
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-bold text-red-600 mb-4">{slideData.problem.title}</h3>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {slideData.problem.points.map((point: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-red-500 text-xl">✗</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 border-2 border-green-500">
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-bold text-primary mb-6">{slideData.solution.title}</h3>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-xl font-semibold mb-4 text-blue-600">What Distributors Get:</h4>
                          <ul className="space-y-2">
                            {slideData.solution.distributorsGet.map((item: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-xl font-semibold mb-4 text-green-600">What YOU Get:</h4>
                          <ul className="space-y-2">
                            {slideData.solution.youGet.map((item: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="text-center">
                    <div className="inline-block bg-blue-100 dark:bg-blue-900 px-8 py-4 rounded-lg">
                      <p className="text-lg"><strong>Integration:</strong> {slideData.integration}</p>
                    </div>
                  </div>
                </div>
              );
            })()
          )}

          {currentSlideData.type === "contests" && (
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-5xl font-bold text-primary">{currentSlideData.title}</h2>
              </div>

              <div className="space-y-6">
                {currentSlideData.examples.map((example, idx) => (
                  <Card key={idx} className="bg-background/80 backdrop-blur border-2">
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-bold text-primary mb-4">{example.title}</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <ul className="space-y-2">
                            {example.points.map((point, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg flex items-center">
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">Result:</p>
                            <p className="text-lg font-bold text-green-600">{example.result}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentSlideData.type === "roi" && (
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-5xl font-bold text-primary mb-4">{currentSlideData.title}</h2>
                <p className="text-2xl font-semibold">{currentSlideData.investment}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-red-50 dark:bg-red-950/20 border-2">
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-bold mb-6 text-red-600">Costs Avoided</h3>
                    <ul className="space-y-4">
                      {currentSlideData.costsAvoided.map((cost, i) => (
                        <li key={i} className="flex justify-between items-center text-lg">
                          <span>{cost.item}</span>
                          <span className="font-bold text-red-600">{cost.amount}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t-2 border-red-300 mt-6 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">Total Saved:</span>
                        <span className="text-2xl font-bold text-red-600">{currentSlideData.totalSaved}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-950/20 border-2">
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-bold mb-6 text-green-600">Revenue Impact</h3>
                    <ul className="space-y-4">
                      {currentSlideData.revenueImpact.map((impact, i) => (
                        <li key={i} className="flex items-start gap-2 text-lg">
                          <TrendingUp className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span>{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-16 py-8 rounded-lg">
                  <p className="text-xl mb-2">Net ROI:</p>
                  <p className="text-5xl font-bold">{currentSlideData.netROI}</p>
                </div>
              </div>
            </div>
          )}

          {currentSlideData.type === "competitive" && (
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-5xl font-bold text-primary">{currentSlideData.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {currentSlideData.comparisons.map((comp, idx) => (
                  <Card key={idx} className="bg-background/80 backdrop-blur border-2">
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-bold text-primary mb-4">{comp.title}</h3>
                      <ul className="space-y-3">
                        {comp.points.map((point, i) => (
                          <li key={i} className="text-lg flex items-start gap-2">
                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2 border-primary">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold text-center mb-6">Our Moat</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {currentSlideData.moat.map((item, i) => (
                      <div key={i} className="text-center">
                        <Target className="w-12 h-12 text-primary mx-auto mb-3" />
                        <p className="font-semibold text-lg">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSlideData.type === "cta" && (
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-5xl font-bold text-primary">{currentSlideData.title}</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {currentSlideData.options.map((option, idx) => (
                  <Card key={idx} className="bg-background/80 backdrop-blur border-2 hover:border-primary transition-colors">
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-bold text-primary mb-2">{option.title}</h3>
                      <p className="text-3xl font-bold text-green-600 mb-6">{option.price}</p>
                      <ul className="space-y-3">
                        {option.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center space-y-6">
                <div className="inline-block bg-primary text-primary-foreground px-12 py-6 rounded-lg">
                  <p className="text-2xl font-bold">{currentSlideData.cta}</p>
                </div>

                <div className="flex justify-center gap-8 text-xl">
                  <div className="flex items-center gap-2">
                    <Phone className="w-6 h-6 text-primary" />
                    <span>{currentSlideData.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-6 h-6 text-primary" />
                    <span>{currentSlideData.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-6 h-6 text-primary" />
                    <span>{currentSlideData.contact.website}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls - Hidden for screenshots */}
      <div className="p-4 bg-background/80 backdrop-blur border-t print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide
                    ? "bg-primary"
                    : "bg-muted hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {currentSlide + 1} / {totalSlides}
            </span>
            <Button
              variant="outline"
              size="lg"
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AMCPitch;