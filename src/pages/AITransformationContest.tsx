import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  DollarSign,
  MapPin,
  Target,
  TrendingUp,
  Shield,
  Sparkles,
  Clock,
  Trophy,
  ArrowRight,
  CheckCircle,
  Brain,
  Zap,
  BarChart3,
  UserCheck
} from 'lucide-react';

const AITransformationContest = () => {
  const navigate = useNavigate();

  const transformationGoals = [
    {
      category: "Customer Experience",
      priority: "30%",
      icon: UserCheck,
      color: "bg-blue-500",
      goals: [
        "AI-powered personal banking assistant for 10M customers",
        "Instant loan approvals using advanced credit risk models",
        "Hyper-personalized product recommendations",
        "Voice and chat interfaces for seamless interaction"
      ]
    },
    {
      category: "Operational Efficiency",
      priority: "35%",
      icon: Zap,
      color: "bg-green-500",
      goals: [
        "Automated document processing for loans and KYC",
        "AI-driven fraud detection reducing losses by 60%",
        "Predictive maintenance for ATM operations",
        "Intelligent workforce management automation"
      ]
    },
    {
      category: "Risk Management",
      priority: "25%",
      icon: Shield,
      color: "bg-orange-500",
      goals: [
        "Real-time credit risk assessment",
        "Market risk prediction for portfolios",
        "Regulatory compliance automation",
        "Enhanced AI-powered cyber security"
      ]
    },
    {
      category: "Innovation & Growth",
      priority: "10%",
      icon: Sparkles,
      color: "bg-purple-500",
      goals: [
        "New AI-powered products like robo-advisory",
        "Data monetization through insights",
        "Fintech partnerships and ecosystem development",
        "R&D for next-generation banking"
      ]
    }
  ];

  const aiCompanies = [
    { name: "OpenAI", focus: "Generative AI & Language Models", range: "15-30%", fit: "High" },
    { name: "DataRobot", focus: "Enterprise AutoML Platform", range: "20-35%", fit: "Very High" },
    { name: "UiPath", focus: "Robotic Process Automation", range: "15-25%", fit: "High" },
    { name: "Palantir", focus: "Big Data Analytics", range: "10-20%", fit: "Medium-High" },
    { name: "Anthropic", focus: "AI Safety & Responsible AI", range: "5-15%", fit: "Medium" },
    { name: "Databricks", focus: "Unified Analytics Platform", range: "10-25%", fit: "High" }
  ];

  const contestSteps = [
    { step: "Company Analysis", description: "Analyze TechnoFin Corp's transformation challenge" },
    { step: "AI Portfolio Allocation", description: "Allocate $100M across AI companies strategically" },
    { step: "Strategy Memo", description: "Submit 2-page McKinsey-style strategic analysis" },
    { step: "Community Voting", description: "Public and peer evaluation of submissions" },
    { step: "Expert Review", description: "Industry professionals assess strategies" },
    { step: "Results & Recognition", description: "Winners announced with career opportunities" }
  ];

  const prizes = [
    { category: "Grand Prize Winner", amount: "₹50,000", description: "Best Overall Strategy + McKinsey Mentorship" },
    { category: "Most Innovative", amount: "₹15,000", description: "Creative AI Technology Approach" },
    { category: "Best Financial Analysis", amount: "₹15,000", description: "Strongest ROI & Business Case" },
    { category: "Community Choice", amount: "₹15,000", description: "Highest Public Voting Score" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              McKinsey-Style Business Strategy Contest
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI Transformation Challenge
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Design the strategic roadmap to transform TechnoFin Corp into India's most AI-powered bank
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <DollarSign className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">$100M</div>
              <div className="text-blue-100">Budget to Allocate</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <Trophy className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">₹95,000</div>
              <div className="text-blue-100">Total Prize Pool</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">21 Days</div>
              <div className="text-blue-100">Contest Duration</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Company Profile */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-slate-800 mb-6">
              Meet TechnoFin Corp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Building2 className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="font-semibold">Industry</div>
                    <div className="text-sm text-slate-600">Digital Banking & Financial Services</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <div className="font-semibold">Revenue</div>
                    <div className="text-sm text-slate-600">₹75,000 crores ($9B USD)</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <div className="font-semibold">Employees</div>
                    <div className="text-sm text-slate-600">45,000 across India & SEA</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <div className="font-semibold">Market Position</div>
                    <div className="text-sm text-slate-600">#3 Private Sector Bank</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800">Business Lines:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Retail Banking</span>
                      <span className="text-sm font-medium">40% revenue</span>
                    </div>
                    <Progress value={40} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Corporate Banking</span>
                      <span className="text-sm font-medium">35% revenue</span>
                    </div>
                    <Progress value={35} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Investment Services</span>
                      <span className="text-sm font-medium">15% revenue</span>
                    </div>
                    <Progress value={15} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Digital Payments</span>
                      <span className="text-sm font-medium">10% revenue</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-red-800 mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Strategic Challenge
                  </h4>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• Fintech competition from Paytm, PhonePe, Razorpay</li>
                    <li>• Customer demand for 24/7 digital services</li>
                    <li>• RBI mandating AI-driven fraud detection</li>
                    <li>• Need to reduce operational costs by 25%</li>
                    <li>• Limited AI deployment despite 50 data scientists</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Board Mandate
                  </h4>
                  <blockquote className="text-blue-700 italic text-sm">
                    "Transform TechnoFin into India's most AI-powered bank within 3 years. 
                    Budget approved: $100M for strategic AI partnerships and technology acquisition."
                  </blockquote>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transformation Goals */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">AI Transformation Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {transformationGoals.map((goal, index) => {
                const IconComponent = goal.icon;
                return (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className={`${goal.color} p-2 rounded-lg mr-3`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{goal.category}</h4>
                        <Badge variant="outline">{goal.priority} Priority</Badge>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {goal.goals.map((item, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* AI Companies Portfolio */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Available AI Companies for Allocation</CardTitle>
            <p className="text-slate-600">Choose 4-7 companies and allocate the $100M budget strategically</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiCompanies.map((company, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">{company.name}</h4>
                    <Badge variant={company.fit === 'Very High' ? 'default' : company.fit === 'High' ? 'secondary' : 'outline'}>
                      {company.fit} Fit
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{company.focus}</p>
                  <div className="text-sm font-medium text-blue-600">{company.range} allocation range</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contest Process */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Contest Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {contestSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">{step.step}</h4>
                  <p className="text-sm text-slate-600">{step.description}</p>
                  {index < contestSteps.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-slate-400 mx-auto mt-4 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prizes & Recognition */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Prizes & Recognition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {prizes.map((prize, index) => (
                <div key={index} className="text-center border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-800 mb-2">{prize.category}</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{prize.amount}</div>
                  <p className="text-sm text-slate-600">{prize.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-slate-800 mb-4">Additional Benefits:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    LinkedIn feature & professional recognition
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Case study publication on platform blog
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Industry networking opportunities
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Placement assistance with consulting firms
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card>
          <CardContent className="text-center py-12">
            <Brain className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Ready to Transform the Future of Banking?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of strategists in designing the AI transformation roadmap for India's next digital banking leader. 
              Apply your strategic thinking and compete for career-changing opportunities.
            </p>
            
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={() => navigate('/engineer-showcase')}
              >
                Start Contest
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg"
              >
                Learn More
              </Button>
            </div>
            
            <div className="mt-6 text-sm text-slate-500">
              Contest ends in <span className="font-semibold text-slate-700">20 days, 14 hours</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AITransformationContest;