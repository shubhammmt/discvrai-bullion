
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
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
            US Market Intelligence
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
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
            Complete Financial Health & Investment Intelligence
          </h1>
          
          <p className="text-xl text-neutral-700 mb-8 max-w-4xl mx-auto">
            AI-powered platform combining comprehensive financial health monitoring with intelligent US market screening and personalized investment insights
          </p>
        </div>

        {/* Health Score Section - if available */}
        {healthScore && (
          <div className="mb-12">
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

        {/* Main Interactive Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Portfolio Health Interactive Section */}
          <Card className="p-8 bg-gradient-to-br from-teal-50 via-white to-teal-50 border-2 border-teal-200 hover:border-teal-300 hover:shadow-xl transition-all duration-300">
            <CardHeader className="p-0 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-neutral-900">Portfolio Health Check</CardTitle>
                  <p className="text-neutral-600">Monitor, analyze, and optimize your investments</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Sample Portfolio Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {portfolioMetrics.map((metric, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-sm text-neutral-600 font-medium">{metric.label}</p>
                    <p className="text-xl font-bold text-neutral-900">{metric.value}</p>
                    <p className="text-sm text-teal-600 font-semibold">{metric.change}</p>
                  </div>
                ))}
              </div>

              {/* Upload Options */}
              <div className="bg-gradient-to-r from-white to-neutral-50 rounded-lg p-6 border-2 border-dashed border-teal-200 mb-6 hover:border-teal-300 transition-colors">
                <div className="text-center">
                  <div className="flex justify-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-neutral-600 mb-4">Upload your portfolio via Excel, screenshots, or chat with our AI</p>
                  <Button onClick={() => setCopilotOpen(true)} className="bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white shadow-md">
                    Check My Portfolio Health
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intelligent Screening Section */}
          <Card className="p-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-2 border-indigo-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
            <CardHeader className="p-0 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-neutral-900">Smart Investment Screening</CardTitle>
                  <p className="text-neutral-600">Find investments using plain English - no jargon</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Search Interface */}
              <div className="mb-6">
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

              {/* Sample Queries */}
              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-neutral-700">Try these searches:</p>
                {sampleQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(query)}
                    className="block w-full text-left p-3 bg-white rounded-lg border border-neutral-200 hover:border-indigo-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all text-sm"
                  >
                    "{query}"
                  </button>
                ))}
              </div>

              <Button onClick={() => setCopilotOpen(true)} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md">
                Start Smart Screening
                <Zap className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Goal-Oriented Planning Section */}
        <div className="py-16 bg-white rounded-3xl mb-12">
          <div className="max-w-6xl mx-auto px-8">
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

        {/* Health Benefits Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-red-50 to-purple-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-center mb-12">Complete Financial Health Intelligence</h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                {healthBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-lg text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-16 h-16 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Get Your Health Score</h4>
                <p className="text-gray-600 mb-6">Comprehensive assessment of your financial wellbeing in one simple score</p>
                <Button 
                  size="lg" 
                  onClick={() => setCopilotOpen(true)}
                  className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
                >
                  Start Assessment
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 bg-white border border-neutral-200 hover:border-teal-200 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-neutral-900">Health Monitoring</h3>
            <p className="text-neutral-600 text-sm">Real-time portfolio health tracking with personalized alerts and recommendations</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 bg-white border border-neutral-200 hover:border-indigo-200 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-neutral-900">Smart Watchlists</h3>
            <p className="text-neutral-600 text-sm">AI-curated watchlists based on your preferences and market opportunities</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 bg-white border border-neutral-200 hover:border-purple-200 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-neutral-900">Risk Management</h3>
            <p className="text-neutral-600 text-sm">Automated risk assessment and portfolio rebalancing suggestions</p>
          </Card>
        </div>

        {/* AI Assistant CTA */}
        <Card className="bg-gradient-to-r from-neutral-900 via-teal-900 to-indigo-900 text-white p-8 text-center shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <Bot className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Ready to Meet Your AI Investment & Health Advisor?</h2>
            <p className="text-xl text-neutral-300 mb-8">
              Get personalized investment advice, complete financial health analysis, portfolio optimization, and market insights - all through natural conversation
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => setCopilotOpen(true)} 
                className="px-8 py-4 bg-white text-neutral-900 hover:bg-neutral-100 shadow-lg"
              >
                <BarChart3 className="mr-2" size={20} />
                Complete Health Check
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setCopilotOpen(true)} 
                className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-neutral-900 shadow-lg"
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
