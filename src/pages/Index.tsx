
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Zap, Target, TrendingUp, Shield, Globe, ArrowRight, Sparkles, BarChart3, LogIn, Heart, Activity, CheckCircle } from 'lucide-react';
import CryptoNewsCards from '@/components/CryptoNewsCards';

const Index = () => {
  const navigate = useNavigate();
  const userProfile = localStorage.getItem('userProfile');

  // Sample crypto news data for preview
  const sampleCryptoNews = [
    {
      "symbol": "SOLUSD",
      "published_date": "2025-06-11T17:36:19",
      "publisher": "Tokenpost",
      "title": "Solana Price Rises Amid Cooling Volume, ETF Speculation Fuels Bullish Outlook",
      "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop",
      "site": "tokenpost.com",
      "text": "Solana (SOL), the sixth-largest cryptocurrency by market cap, is experiencing a cooling trend in both spot and futures trading volumes, according to blockchain analytics firm CryptoQuant. Recent bubble chart analysis shows a decrease in volume across all exchanges.",
      "url": "https://www.tokenpost.com/news/investing/15826",
      "metadata": {
        "last_updated": "2025-06-11T21:58:35.495125",
        "fetch_timestamp": "2025-06-11T21:45:07.005738",
        "last_migrated": "2025-06-11T21:58:35.495135",
        "source": "fmp"
      }
    },
    {
      "symbol": "BTCUSD",
      "published_date": "2025-06-11T17:34:27",
      "publisher": "Tokenpost",
      "title": "Paul Tudor Jones Recommends Bitcoin, Gold, and Stocks to Hedge Inflation",
      "image": "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop",
      "site": "tokenpost.com",
      "text": "Billionaire hedge fund manager Paul Tudor Jones reaffirmed his bullish stance on Bitcoin during a recent appearance on Bloomberg. He emphasized that a volatility-adjusted portfolio consisting of Bitcoin, gold, and stocks is the optimal strategy for investors aiming to hedge against inflation.",
      "url": "https://www.tokenpost.com/news/people/15825",
      "metadata": {
        "last_updated": "2025-06-11T21:58:35.495160",
        "fetch_timestamp": "2025-06-11T21:45:07.008845",
        "last_migrated": "2025-06-11T21:58:35.495166",
        "source": "fmp"
      }
    },
    {
      "symbol": "BTCUSD",
      "published_date": "2025-06-11T17:31:01",
      "publisher": "Tokenpost",
      "title": "Robert Kiyosaki Buys More Bitcoin as BTC Eyes New All-Time High",
      "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop",
      "site": "tokenpost.com",
      "text": "Rich Dad Poor Dad author Robert Kiyosaki has once again made headlines with a fresh Bitcoin (BTC) purchase, fueling bullish sentiment as the cryptocurrency nears its all-time high. While he didnt disclose the amount of BTC bought or a specific price target, his previous prediction of Bitcoin reaching $500,000 to $1 million by the end of 2025 continues to spark debate across financial media.",
      "url": "https://www.tokenpost.com/news/insights/15824",
      "metadata": {
        "last_updated": "2025-06-11T21:58:35.495179",
        "fetch_timestamp": "2025-06-11T21:45:07.011216",
        "last_migrated": "2025-06-11T21:58:35.495184",
        "source": "fmp"
      }
    }
  ];

  const features = [
    {
      icon: Heart,
      title: "Complete Health Check",
      description: "Assess your entire financial wellbeing",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Brain,
      title: "AI-Powered Guidance",
      description: "Smart recommendations for improvement",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Target,
      title: "Goal-Oriented Planning",
      description: "Build wealth toward your life goals",
      color: "bg-green-100 text-green-600"
    }
  ];

  const healthAreas = [
    { name: "Wealth Building", description: "Stocks, funds, and growth investments", icon: TrendingUp },
    { name: "Protection Planning", description: "Insurance and risk management", icon: Shield },
    { name: "Debt Optimization", description: "Loans and credit management", icon: Activity },
    { name: "Goal Achievement", description: "Retirement, education, and life goals", icon: Target }
  ];

  const healthBenefits = [
    "Complete financial health assessment in 30 seconds",
    "AI identifies gaps and opportunities automatically", 
    "Personalized action plan for wealth building",
    "Track progress across all financial aspects",
    "Expert guidance without expensive advisors"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section - First Viewport */}
      <div className="min-h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Main Hero Content */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              discvr.ai
            </h1>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Complete Financial Health<br />in 30 seconds
            </h2>
            
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              AI-powered platform that assesses your entire financial wellbeing and guides you toward optimal wealth building across investments, protection, debt, and goals
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              {!userProfile ? (
                <>
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/onboarding')} 
                    className="px-8 py-4 text-lg bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
                  >
                    Check My Financial Health <ArrowRight className="ml-2" size={20} />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => navigate('/feed')} 
                    className="px-8 py-4 text-lg border-2"
                  >
                    <LogIn className="mr-2" size={20} />
                    Sign In
                  </Button>
                </>
              ) : (
                <Button 
                  size="lg" 
                  onClick={() => navigate('/portfolio')} 
                  className="px-8 py-4 text-lg bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
                >
                  View My Health Dashboard <ArrowRight className="ml-2" size={20} />
                </Button>
              )}
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/research/stock/AAPL')} 
                className="px-8 py-4 text-lg border-2"
              >
                Try Sample Analysis
              </Button>
            </div>
          </div>

          {/* Key Features - Visual Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Crypto News Section */}
      <div className="py-16 bg-white">
        <CryptoNewsCards newsData={sampleCryptoNews} />
      </div>

      {/* Financial Health Areas Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-6">Complete Financial Health Coverage</h3>
          <p className="text-xl text-gray-600">Monitor and optimize every aspect of your financial wellbeing</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthAreas.map((area, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <area.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h4 className="text-lg font-semibold mb-2">{area.name}</h4>
                <p className="text-gray-600">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Health Benefits Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-red-50 to-purple-50 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-center mb-12">Why Financial Health Matters</h3>
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
                onClick={() => navigate(userProfile ? '/portfolio' : '/onboarding')}
                className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
              >
                {userProfile ? 'View Dashboard' : 'Start Assessment'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* AI-First Messaging */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-8">AI-Powered Financial Health Platform</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Holistic Assessment</h4>
              <p className="text-blue-100">Complete picture of your financial health, not just investments</p>
            </div>
            <div>
              <Brain className="w-12 h-12 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Smart Recommendations</h4>
              <p className="text-blue-100">AI identifies gaps and suggests specific improvements automatically</p>
            </div>
            <div>
              <Target className="w-12 h-12 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Goal-Oriented Guidance</h4>
              <p className="text-blue-100">Build wealth strategically toward your life goals and dreams</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-12">Trusted by Health-Conscious Investors</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8">
              <p className="text-5xl font-bold text-red-600 mb-4">30s</p>
              <p className="text-gray-600 text-lg">Complete health assessment</p>
            </div>
            <div className="p-8">
              <p className="text-5xl font-bold text-red-600 mb-4">4</p>
              <p className="text-gray-600 text-lg">Key health areas covered</p>
            </div>
            <div className="p-8">
              <p className="text-5xl font-bold text-red-600 mb-4">24/7</p>
              <p className="text-gray-600 text-lg">AI health monitoring</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h3 className="text-3xl font-bold mb-6">Ready to Optimize Your Financial Health?</h3>
        <p className="text-xl text-gray-600 mb-8">Join thousands using AI to build comprehensive financial wellbeing</p>
        {!userProfile ? (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/onboarding')} 
              className="px-8 py-4 text-lg bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
            >
              Start Health Assessment <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/feed')} 
              className="px-8 py-4 text-lg border-2"
            >
              <LogIn className="mr-2" size={20} />
              Already have an account?
            </Button>
          </div>
        ) : (
          <Button 
            size="lg" 
            onClick={() => navigate('/portfolio')} 
            className="px-8 py-4 text-lg bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
          >
            Access Health Dashboard <ArrowRight className="ml-2" size={20} />
          </Button>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-200 bg-white/50">
        <p className="text-gray-500">
          discvr.ai • Complete Financial Health Platform for Smart Wealth Building
        </p>
      </footer>
    </div>
  );
};

export default Index;
