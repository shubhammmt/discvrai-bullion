
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Zap, Target, TrendingUp, Shield, Globe, ArrowRight, Sparkles, BarChart3 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const userProfile = localStorage.getItem('userProfile');

  const features = [
    {
      icon: Brain,
      title: "AI Discovery",
      description: "Find perfect investments in seconds",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Get smart insights immediately",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Target,
      title: "Personalized",
      description: "Tailored to your goals & risk",
      color: "bg-green-100 text-green-600"
    }
  ];

  const offerings = [
    { name: "Stocks", description: "Individual company shares", icon: TrendingUp },
    { name: "Mutual Funds", description: "Expert-managed portfolios", icon: BarChart3 },
    { name: "ETFs", description: "Diversified market exposure", icon: Globe },
    { name: "IPOs", description: "New listing opportunities", icon: Sparkles }
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
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              discvr.ai
            </h1>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Discover smart investments<br />in 30 seconds
            </h2>
            
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              AI-powered investment discovery that learns your preferences and finds opportunities across stocks, funds, and more
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              {!userProfile ? (
                <Button 
                  size="lg" 
                  onClick={() => navigate('/onboarding')} 
                  className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Start Discovering <ArrowRight className="ml-2" size={20} />
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  onClick={() => navigate('/feed')} 
                  className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Go to Dashboard <ArrowRight className="ml-2" size={20} />
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

      {/* Second Section - Investment Universe */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-6">Complete Investment Universe</h3>
          <p className="text-xl text-gray-600">Discover opportunities across all major asset classes</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerings.map((offering, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <offering.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h4 className="text-lg font-semibold mb-2">{offering.name}</h4>
                <p className="text-gray-600">{offering.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI-First Messaging */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-8">Why discvr.ai is Different</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Shield className="w-12 h-12 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">AI-Native Platform</h4>
              <p className="text-blue-100">Built from the ground up with AI, not just added features</p>
            </div>
            <div>
              <Brain className="w-12 h-12 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Smart Discovery</h4>
              <p className="text-blue-100">Learns your preferences and finds opportunities automatically</p>
            </div>
            <div>
              <Globe className="w-12 h-12 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Everything in One Place</h4>
              <p className="text-blue-100">Stocks, funds, crypto, insurance - all in one platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-12">Trusted by Smart Investors</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8">
              <p className="text-5xl font-bold text-blue-600 mb-4">30s</p>
              <p className="text-gray-600 text-lg">Average discovery time</p>
            </div>
            <div className="p-8">
              <p className="text-5xl font-bold text-blue-600 mb-4">95%</p>
              <p className="text-gray-600 text-lg">User satisfaction rate</p>
            </div>
            <div className="p-8">
              <p className="text-5xl font-bold text-blue-600 mb-4">24/7</p>
              <p className="text-gray-600 text-lg">AI discovery assistant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h3 className="text-3xl font-bold mb-6">Ready to Discover Smarter Investments?</h3>
        <p className="text-xl text-gray-600 mb-8">Join thousands using AI to optimize their portfolios</p>
        {!userProfile ? (
          <Button 
            size="lg" 
            onClick={() => navigate('/onboarding')} 
            className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Start Your Journey <ArrowRight className="ml-2" size={20} />
          </Button>
        ) : (
          <Button 
            size="lg" 
            onClick={() => navigate('/feed')} 
            className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Access Dashboard <ArrowRight className="ml-2" size={20} />
          </Button>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-200 bg-white/50">
        <p className="text-gray-500">
          discvr.ai • Making smart investment discovery simple and fast
        </p>
      </footer>
    </div>
  );
};

export default Index;
