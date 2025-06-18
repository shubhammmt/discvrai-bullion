
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Bot, TrendingUp, Search, ArrowRight, DollarSign, 
  PieChart, Upload, MessageSquare, Target, 
  BarChart3, AlertTriangle, FileSpreadsheet,
  Camera, Zap, Heart, Shield, Brain, Activity,
  CheckCircle, ArrowLeft
} from 'lucide-react';
import HealthScoreCard from '@/components/HealthScoreCard';
import FinanceCopilot from '@/components/FinanceCopilot';
import { HealthScoreData } from '@/utils/healthScore';

const USMarketBot = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [healthScore, setHealthScore] = useState<HealthScoreData | null>(null);

  useEffect(() => {
    const savedScore = localStorage.getItem('healthScore');
    if (savedScore) {
      setHealthScore(JSON.parse(savedScore));
    }
  }, []);

  // Combined features from Index.tsx and USMarketHome.tsx
  const allFeatures = [
    {
      icon: Heart,
      title: "Complete Health Check",
      description: "Assess your entire financial wellbeing with AI-powered analysis",
      color: "bg-red-100 text-red-600",
      category: "health"
    },
    {
      icon: Brain,
      title: "AI-Powered Guidance",
      description: "Smart recommendations for portfolio improvement and wealth building",
      color: "bg-blue-100 text-blue-600",
      category: "health"
    },
    {
      icon: Target,
      title: "Goal-Oriented Planning",
      description: "Build wealth strategically toward your life goals",
      color: "bg-green-100 text-green-600",
      category: "health"
    },
    {
      icon: PieChart,
      title: "Portfolio Health Monitoring",
      description: "Real-time portfolio health tracking with personalized alerts",
      color: "bg-teal-100 text-teal-600",
      category: "portfolio"
    },
    {
      icon: Search,
      title: "Smart Investment Screening",
      description: "AI-curated watchlists based on your preferences and market opportunities",
      color: "bg-indigo-100 text-indigo-600",
      category: "screening"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Automated risk assessment and portfolio rebalancing suggestions",
      color: "bg-purple-100 text-purple-600",
      category: "portfolio"
    }
  ];

  const sampleQueries = [
    "Find dividend stocks under $50 with 5%+ yield",
    "Show me tech stocks that dropped 10% this week",
    "Best performing mutual funds in healthcare",
    "IPOs launching next month"
  ];

  const portfolioMetrics = [
    { label: "Portfolio Value", value: "$125,400", change: "+2.4%" },
    { label: "Expected Return", value: "12.8%", change: "+0.3%" },
    { label: "Risk Score", value: "Medium", change: "Stable" },
    { label: "Diversification", value: "85%", change: "+5%" }
  ];

  const healthBenefits = [
    "Complete financial health assessment in 30 seconds",
    "AI identifies gaps and opportunities automatically", 
    "Personalized action plan for wealth building",
    "Track progress across all financial aspects",
    "Expert guidance without expensive advisors"
  ];

  const portfolioFeatures = [
    "Real-time portfolio tracking and analysis",
    "Risk assessment with personalized recommendations",
    "Diversification optimization across asset classes",
    "Performance benchmarking against market indices",
    "Automated rebalancing suggestions"
  ];

  const screeningFeatures = [
    "Natural language investment search (no jargon)",
    "AI-powered stock and fund screening",
    "Custom watchlists based on your criteria",
    "Real-time market alerts and opportunities",
    "Technical and fundamental analysis integration"
  ];

  const goalExamples = [
    { name: "Home Purchase", amount: "$500K", timeline: "5 years", color: "bg-blue-50 border-blue-200" },
    { name: "Retirement", amount: "$2M", timeline: "25 years", color: "bg-green-50 border-green-200" },
    { name: "Emergency Fund", amount: "$50K", timeline: "2 years", color: "bg-orange-50 border-orange-200" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-teal-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button variant="ghost" onClick={() => navigate('/us-market')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to US Market
          </Button>
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
            Complete US Market Intelligence Platform
          </h1>
          
          <Button 
            onClick={() => setCopilotOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <Brain className="w-4 h-4 mr-2" />
            AI Assistant
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-indigo-500 rounded-3xl flex items-center justify-center shadow-xl">
              <Bot className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
            Your Complete US Market Intelligence Hub
          </h1>
          
          <p className="text-xl text-neutral-700 mb-8 max-w-4xl mx-auto">
            Comprehensive financial health monitoring, intelligent portfolio management, and smart investment screening - all powered by AI
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              onClick={() => setCopilotOpen(true)} 
              className="px-8 py-4 text-lg bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
            >
              <Heart className="mr-2" size={20} />
              Start Health Assessment
            </Button>
            <Button 
              size="lg" 
              onClick={() => setCopilotOpen(true)} 
              className="px-8 py-4 text-lg bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700"
            >
              <PieChart className="mr-2" size={20} />
              Analyze My Portfolio
            </Button>
          </div>
        </div>

        {/* Health Score Section - if available */}
        {healthScore && (
          <div className="mb-16">
            <div className="max-w-2xl mx-auto">
              <HealthScoreCard score={healthScore} showDetails={true} />
              <div className="text-center mt-6">
                <Button 
                  onClick={() => navigate('/health-dashboard')}
                  className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
                >
                  <Activity className="mr-2 w-4 h-4" />
                  View Full Health Dashboard
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* All Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Complete Feature Suite</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allFeatures.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-all duration-300 bg-white border border-neutral-200 hover:-translate-y-1">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-900">{feature.title}</h3>
                <p className="text-neutral-600 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Financial Health Deep Dive */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-red-50 to-purple-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-center mb-12">Complete Financial Health Intelligence</h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Why Financial Health Matters</h4>
                {healthBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-lg text-gray-700">{benefit}</p>
                  </div>
                ))}
                <Button 
                  size="lg" 
                  onClick={() => setCopilotOpen(true)}
                  className="mt-6 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
                >
                  Start Health Assessment
                </Button>
              </div>
              <div className="text-center">
                <div className="w-40 h-40 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-20 h-20 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Get Your Health Score</h4>
                <p className="text-gray-600 mb-6">Comprehensive assessment of your financial wellbeing in one simple score covering investments, protection, debt, and goals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Management Deep Dive */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-center mb-12">Advanced Portfolio Management</h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center">
                <div className="w-40 h-40 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PieChart className="w-20 h-20 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Health Monitor</h4>
                <p className="text-gray-600 mb-6">Real-time tracking and analysis of your investment portfolio with AI-powered insights and recommendations</p>
                
                {/* Sample Portfolio Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {portfolioMetrics.map((metric, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm">
                      <p className="text-sm text-neutral-600 font-medium">{metric.label}</p>
                      <p className="text-xl font-bold text-neutral-900">{metric.value}</p>
                      <p className="text-sm text-teal-600 font-semibold">{metric.change}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Features</h4>
                {portfolioFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-teal-600" />
                    </div>
                    <p className="text-lg text-gray-700">{feature}</p>
                  </div>
                ))}
                <Button 
                  size="lg" 
                  onClick={() => setCopilotOpen(true)}
                  className="mt-6 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                >
                  Analyze My Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Investment Screening Deep Dive */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-center mb-12">Smart Investment Screening</h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Intelligent Search Features</h4>
                {screeningFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-indigo-600" />
                    </div>
                    <p className="text-lg text-gray-700">{feature}</p>
                  </div>
                ))}

                {/* Search Interface */}
                <div className="mt-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Try: 'Find growth stocks under $100 with good ratings'"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full p-4 pr-12 border-2 border-neutral-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                    />
                    <Search className="absolute right-4 top-4 w-6 h-6 text-neutral-400" />
                  </div>
                </div>

                <Button 
                  size="lg" 
                  onClick={() => setCopilotOpen(true)}
                  className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  Start Smart Screening
                </Button>
              </div>
              <div className="text-center">
                <div className="w-40 h-40 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-20 h-20 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Find Perfect Investments</h4>
                <p className="text-gray-600 mb-6">Use plain English to find stocks, funds, and opportunities that match your criteria - no financial jargon required</p>
                
                {/* Sample Queries */}
                <div className="space-y-3 mt-8">
                  <p className="text-sm font-medium text-neutral-700">Try these searches:</p>
                  {sampleQueries.slice(0, 3).map((query, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(query)}
                      className="block w-full text-left p-3 bg-white rounded-lg border border-neutral-200 hover:border-indigo-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all text-sm"
                    >
                      "{query}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Goal-Oriented Planning Section */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl p-12 shadow-lg">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Start with Your Financial Goals</h3>
              <p className="text-xl text-gray-600">Our AI creates personalized investment strategies based on what matters to you</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {goalExamples.map((goal, index) => (
                <Card key={index} className={`border-2 ${goal.color} hover:shadow-lg transition-shadow`}>
                  <CardContent className="p-6 text-center">
                    <Target className="w-10 h-10 mx-auto mb-4 text-gray-700" />
                    <h4 className="text-lg font-semibold mb-2">{goal.name}</h4>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{goal.amount}</p>
                    <p className="text-sm text-gray-600">in {goal.timeline}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => setCopilotOpen(true)}
                className="px-8 py-4 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Target className="mr-2" size={20} />
                Set My Financial Goals
              </Button>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <Card className="bg-gradient-to-r from-neutral-900 via-teal-900 to-indigo-900 text-white p-12 text-center shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <Bot className="w-20 h-20 mx-auto mb-8 opacity-90" />
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Financial Future?</h2>
            <p className="text-xl text-neutral-300 mb-8">
              Join thousands using our AI-powered platform for complete financial health monitoring, intelligent portfolio management, and smart investment decisions
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => setCopilotOpen(true)} 
                className="px-8 py-4 text-lg bg-white text-neutral-900 hover:bg-neutral-100 shadow-lg"
              >
                <Heart className="mr-2" size={20} />
                Complete Health Check
              </Button>
              <Button 
                size="lg" 
                onClick={() => setCopilotOpen(true)} 
                className="px-8 py-4 text-lg bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 shadow-lg"
              >
                <BarChart3 className="mr-2" size={20} />
                Analyze Portfolio
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setCopilotOpen(true)} 
                className="px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-neutral-900 shadow-lg"
              >
                <MessageSquare className="mr-2" size={20} />
                Chat with AI Advisor
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Copilot */}
      <FinanceCopilot 
        isOpen={copilotOpen} 
        onToggle={setCopilotOpen}
      />
    </div>
  );
};

export default USMarketBot;
