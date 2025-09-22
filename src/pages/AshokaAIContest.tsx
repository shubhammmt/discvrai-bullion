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
  UserCheck,
  GraduationCap,
  Globe,
  Lightbulb
} from 'lucide-react';

const AshokaAIContest = () => {
  const navigate = useNavigate();

  const transformationGoals = [
    {
      category: "Digital Transformation",
      priority: "40%",
      icon: Zap,
      color: "bg-blue-500",
      goals: [
        "AI-powered customer service for 15M+ users globally",
        "Automated supply chain optimization using predictive analytics",
        "Smart inventory management reducing waste by 40%",
        "Real-time market sentiment analysis for strategic decisions"
      ]
    },
    {
      category: "Sustainability & ESG",
      priority: "30%",
      icon: Globe,
      color: "bg-green-500",
      goals: [
        "Carbon footprint reduction through AI-optimized logistics",
        "Sustainable product recommendation algorithms",
        "Energy-efficient AI models for operational efficiency",
        "ESG compliance monitoring and reporting automation"
      ]
    },
    {
      category: "Innovation & Growth",
      priority: "20%",
      icon: Lightbulb,
      color: "bg-purple-500",
      goals: [
        "New AI-driven product categories and services",
        "Personalized customer experience at scale",
        "Market expansion through data-driven insights",
        "R&D acceleration with AI-assisted research"
      ]
    },
    {
      category: "Risk & Compliance",
      priority: "10%",
      icon: Shield,
      color: "bg-orange-500",
      goals: [
        "AI-powered fraud detection and prevention",
        "Regulatory compliance automation across markets",
        "Risk assessment for new market entries",
        "Data privacy and security enhancement"
      ]
    }
  ];

  const aiCompanies = [
    { name: "OpenAI", focus: "Generative AI & Language Models", range: "15-25%", fit: "High" },
    { name: "Palantir", focus: "Big Data Analytics & Intelligence", range: "20-30%", fit: "Very High" },
    { name: "UiPath", focus: "Robotic Process Automation", range: "10-20%", fit: "High" },
    { name: "Databricks", focus: "Unified Analytics Platform", range: "15-25%", fit: "High" },
    { name: "Scale AI", focus: "ML Data Infrastructure", range: "5-15%", fit: "Medium-High" },
    { name: "Anthropic", focus: "AI Safety & Ethics", range: "10-20%", fit: "High" },
    { name: "C3.ai", focus: "Enterprise AI Applications", range: "10-15%", fit: "Medium" }
  ];

  const contestSteps = [
    { step: "Company Analysis", description: "Analyze GlobalTech Innovations' transformation challenge" },
    { step: "AI Strategy Design", description: "Allocate $150M across AI companies and initiatives" },
    { step: "Implementation Plan", description: "Create detailed 18-month execution roadmap" },
    { step: "Peer Review", description: "Collaborative evaluation and feedback process" },
    { step: "Expert Judging", description: "Industry leaders assess strategic depth" },
    { step: "Showcase & Awards", description: "Present to industry panel and receive recognition" }
  ];

  const prizes = [
    { category: "Grand Prize Winner", amount: "₹5,000", description: "Best Overall Strategy + BCG Mentorship" },
    { category: "Most Innovative Approach", amount: "₹5,000", description: "Creative AI Integration Strategy" },
    { category: "Best Sustainability Focus", amount: "₹5,000", description: "Outstanding ESG & AI Combination" },
    { category: "Peer Choice Award", amount: "₹5,000", description: "Highest Collaborative Score" },
    { category: "Rising Strategist", amount: "₹5,000", description: "Best First-Year Student Strategy" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              <GraduationCap className="h-4 w-4 mr-2" />
              Ashoka University AI Strategy Challenge
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Global AI Transformation Contest
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
              Design the strategic AI roadmap to transform GlobalTech Innovations into the world's most intelligent enterprise
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <DollarSign className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">$150M</div>
              <div className="text-emerald-100">Strategic Investment</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <Trophy className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">₹25,000</div>
              <div className="text-emerald-100">Total Prize Pool</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">28 Days</div>
              <div className="text-emerald-100">Contest Duration</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Company Profile */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-slate-800 mb-6">
              Meet GlobalTech Innovations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Building2 className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                    <div className="font-semibold">Industry</div>
                    <div className="text-sm text-slate-600">Technology & Innovation Solutions</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <div className="font-semibold">Revenue</div>
                    <div className="text-sm text-slate-600">$12B USD (Global)</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <div className="font-semibold">Workforce</div>
                    <div className="text-sm text-slate-600">85,000 across 40 countries</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <div className="font-semibold">Market Position</div>
                    <div className="text-sm text-slate-600">Top 5 Global Tech Innovator</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800">Business Segments:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enterprise Solutions</span>
                      <span className="text-sm font-medium">45% revenue</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Consumer Technology</span>
                      <span className="text-sm font-medium">30% revenue</span>
                    </div>
                    <Progress value={30} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cloud & Infrastructure</span>
                      <span className="text-sm font-medium">15% revenue</span>
                    </div>
                    <Progress value={15} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AI & Research</span>
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
                    <li>• Intense competition from AI-native companies</li>
                    <li>• Customer demand for intelligent, autonomous systems</li>
                    <li>• Regulatory pressure for responsible AI deployment</li>
                    <li>• Need to reduce operational costs by 35% while growing</li>
                    <li>• Fragmented AI initiatives across business units</li>
                    <li>• Sustainability commitments requiring innovative solutions</li>
                  </ul>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                  <h4 className="font-semibold text-emerald-800 mb-4 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    CEO Vision
                  </h4>
                  <blockquote className="text-emerald-700 italic text-sm">
                    "Transform GlobalTech into the world's most intelligent enterprise by 2027. 
                    Budget approved: $150M for strategic AI transformation and partnerships. 
                    We must lead the age of intelligent business."
                  </blockquote>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transformation Goals */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">AI Transformation Priorities</CardTitle>
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
                        <Badge variant="outline">{goal.priority} Weight</Badge>
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
            <CardTitle className="text-2xl text-slate-800">Strategic AI Partner Options</CardTitle>
            <p className="text-slate-600">Select 5-8 companies and allocate the $150M budget strategically</p>
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
                  <div className="text-sm font-medium text-emerald-600">{company.range} allocation range</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contest Process */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Contest Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {contestSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
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
            <CardTitle className="text-2xl text-slate-800">Recognition & Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prizes.map((prize, index) => (
                <div key={index} className="text-center border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-800 mb-2">{prize.category}</h4>
                  <div className="text-2xl font-bold text-emerald-600 mb-2">{prize.amount}</div>
                  <p className="text-sm text-slate-600">{prize.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-slate-800 mb-4">Exclusive Ashoka Benefits:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Direct access to BCG & McKinsey mentors
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Featured case study publication
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Alumni network integration opportunities
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Industry leader networking sessions
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Priority internship referrals
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Strategic thinking certification
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ashoka-Specific Call to Action */}
        <Card>
          <CardContent className="text-center py-12">
            <div className="flex justify-center items-center mb-6">
              <GraduationCap className="h-16 w-16 text-emerald-600 mr-4" />
              <Brain className="h-16 w-16 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Ashoka Minds, Shape the Future of Business
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Join your fellow Ashokan strategists in designing the AI transformation that will define the next decade of business. 
              Apply the liberal arts thinking that makes Ashoka unique to solve real-world corporate challenges.
            </p>
            
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg bg-emerald-600 hover:bg-emerald-700"
                onClick={() => navigate('/engineer-showcase')}
              >
                Join the Challenge
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              >
                Download Brief
              </Button>
            </div>
            
            <div className="mt-6 text-sm text-slate-500">
              Registration closes in <span className="font-semibold text-slate-700">25 days, 10 hours</span>
            </div>
            
            <div className="mt-4 text-xs text-slate-400">
              Exclusively for Ashoka University students | Liberal Arts meets Business Strategy
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AshokaAIContest;