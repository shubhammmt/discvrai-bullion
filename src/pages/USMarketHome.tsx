
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Bot, TrendingUp, Search, ArrowRight, DollarSign, Globe, Zap } from 'lucide-react';

const USMarketHome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BarChart3,
      title: "Real-time Market Data",
      description: "Live stock prices, market indices, and trading volumes"
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Technical indicators, charts, and market trends"
    },
    {
      icon: Search,
      title: "Comprehensive Research",
      description: "Company profiles, financial statements, and news"
    },
    {
      icon: Bot,
      title: "AI-Powered Insights",
      description: "Get instant answers to your market questions"
    }
  ];

  const stats = [
    { value: "500+", label: "Listed Companies" },
    { value: "24/7", label: "Market Monitoring" },
    { value: "Real-time", label: "Data Updates" },
    { value: "AI-Powered", label: "Market Insights" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            US Market Hub
          </h1>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Your Gateway to US Financial Markets
          </h2>
          
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Access comprehensive US market data, analytics, and AI-powered insights all in one place. 
            Make informed investment decisions with real-time information and intelligent analysis.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              onClick={() => navigate('/us-market')} 
              className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <BarChart3 className="mr-2" size={20} />
              Explore Markets
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/us-market-bot')} 
              className="px-8 py-4 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Bot className="mr-2" size={20} />
              Ask AI Assistant
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Everything You Need for Market Analysis</h3>
            <p className="text-xl text-gray-600">Comprehensive tools and data for successful trading and investing</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 bg-gray-50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Sections */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Market Data CTA */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 overflow-hidden relative">
            <CardContent className="p-8">
              <div className="relative z-10">
                <BarChart3 className="w-12 h-12 mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-4">Market Dashboard</h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Access real-time market data, track your favorite stocks, and analyze market trends with our comprehensive dashboard.
                </p>
                <Button 
                  onClick={() => navigate('/us-market')}
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  View Markets <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
              <Globe className="absolute -bottom-4 -right-4 w-32 h-32 text-blue-500 opacity-10" />
            </CardContent>
          </Card>

          {/* AI Bot CTA */}
          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white border-0 overflow-hidden relative">
            <CardContent className="p-8">
              <div className="relative z-10">
                <Bot className="w-12 h-12 mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-4">AI Market Assistant</h3>
                <p className="text-purple-100 mb-6 leading-relaxed">
                  Get instant answers to your market questions, research companies, and receive personalized investment insights powered by AI.
                </p>
                <Button 
                  onClick={() => navigate('/us-market-bot')}
                  variant="secondary"
                  className="bg-white text-purple-600 hover:bg-purple-50"
                >
                  Start Chatting <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
              <Zap className="absolute -bottom-4 -right-4 w-32 h-32 text-purple-500 opacity-10" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Start Your Market Journey?</h3>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of traders and investors using our platform to make smarter decisions
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/us-market')} 
              className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700"
            >
              Explore Markets Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/us-market-bot')} 
              className="px-8 py-4 text-lg border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Try AI Assistant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USMarketHome;
