
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Zap, Target, TrendingUp, Shield, Globe } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  // Check if user has completed onboarding
  const userProfile = localStorage.getItem('userProfile');

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Discovery",
      description: "Discover personalized investment opportunities in 30 seconds with our advanced AI engine"
    },
    {
      icon: Zap,
      title: "Lightning Fast Insights",
      description: "Make smart investment choices quickly with instant analysis and clear recommendations"
    },
    {
      icon: Target,
      title: "Personalized Strategy",
      description: "AI learns your preferences and risk tolerance to discover perfect opportunities"
    }
  ];

  const offerings = [
    { name: "Stocks", description: "Individual company shares with AI discovery" },
    { name: "Mutual Funds", description: "Diversified portfolios managed by experts" },
    { name: "ETFs", description: "Exchange-traded funds for broad market exposure" },
    { name: "Credit Products", description: "Smart lending and credit solutions" },
    { name: "Insurance", description: "AI-recommended protection plans" },
    { name: "IPOs", description: "New listing opportunities and analysis" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <Brain className="w-16 h-16 text-blue-600" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full opacity-80"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            discvr.ai
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            AI-first, agentic investment discovery platform
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Discover smart investments in 30 seconds
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Built ground-up with AI at every layer. Your intelligent investment discovery assistant that learns, analyzes, and discovers opportunities on your behalf across all financial instruments.
          </p>
          
          <div className="flex justify-center gap-4">
            {!userProfile ? (
              <Button size="lg" onClick={() => navigate('/onboarding')} className="px-8 py-4 text-lg">
                Start Discovering
              </Button>
            ) : (
              <Button size="lg" onClick={() => navigate('/feed')} className="px-8 py-4 text-lg">
                Go to Dashboard
              </Button>
            )}
            <Button size="lg" variant="outline" onClick={() => navigate('/research')} className="px-8 py-4 text-lg">
              Explore Research
            </Button>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Product Offerings */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Complete Investment Universe</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((offering, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-2">{offering.name}</h4>
                  <p className="text-gray-600">{offering.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI-First Messaging */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center mb-16">
          <h3 className="text-2xl font-bold mb-4">Why discvr.ai is Different</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Shield className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Built Ground-Up with AI</h4>
              <p className="text-blue-100">Unlike traditional platforms that add AI features, we're AI-native from the core</p>
            </div>
            <div>
              <Brain className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Agentic Discovery</h4>
              <p className="text-blue-100">Your AI assistant learns your preferences and proactively discovers opportunities</p>
            </div>
            <div>
              <Globe className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Comprehensive Coverage</h4>
              <p className="text-blue-100">Single platform for stocks, funds, credit, insurance, crypto, and IPOs</p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-8">Trusted by Smart Investors</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <p className="text-4xl font-bold text-blue-600 mb-2">30s</p>
              <p className="text-gray-600">Average discovery time</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-blue-600 mb-2">95%</p>
              <p className="text-gray-600">User satisfaction rate</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-blue-600 mb-2">24/7</p>
              <p className="text-gray-600">AI discovery assistant</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Discover Smarter Investment Opportunities?</h3>
          <p className="text-gray-600 mb-6">Join thousands of investors using AI to discover and optimize their portfolios</p>
          {!userProfile ? (
            <Button size="lg" onClick={() => navigate('/onboarding')} className="px-8 py-4 text-lg">
              Start Your Discovery Journey
            </Button>
          ) : (
            <Button size="lg" onClick={() => navigate('/feed')} className="px-8 py-4 text-lg">
              Access Your Dashboard
            </Button>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 py-8 border-t border-gray-200">
          <p className="text-gray-500">
            discvr.ai • Making smart investment discovery simple and fast
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
