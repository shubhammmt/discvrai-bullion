
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Brain, Target, Zap, Users, TrendingUp, Shield } from 'lucide-react';
import { AILayerIndicator } from '@/components/ai-indicators/AILayerIndicator';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Brain className="w-12 h-12 text-blue-600" />
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FinanceGPT
              </span>
            </h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            India's AI-Powered Financial Discovery Platform
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From "What should I invest in?" to the perfect financial product in seconds. 
            Our 4-layer AI stack personalizes every recommendation for India's 50M+ investors.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <AILayerIndicator layer={1} type="powered" size="md" />
            <AILayerIndicator layer={2} type="powered" size="md" />
            <AILayerIndicator layer={3} type="powered" size="md" />
            <AILayerIndicator layer={4} type="powered" size="md" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/feed')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
            >
              Try AI Discovery
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              onClick={() => navigate('/pitch')}
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg border-2"
            >
              View Investor Deck
            </Button>
          </div>
        </div>

        {/* AI Stack Demo */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="p-6 hover:shadow-lg transition-all border-l-4 border-l-orange-500">
            <CardContent className="p-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Layer 1</h3>
                  <p className="text-sm text-gray-600">Personalization</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Learns your risk tolerance, goals, and preferences to create a unique financial profile.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all border-l-4 border-l-green-500">
            <CardContent className="p-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Layer 2</h3>
                  <p className="text-sm text-gray-600">Risk & Goals</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Matches financial products to your specific goals and risk appetite with precision.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all border-l-4 border-l-blue-500">
            <CardContent className="p-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Layer 3</h3>
                  <p className="text-sm text-gray-600">Product Intelligence</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Deep analysis of 50,000+ financial products with real-time market intelligence.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all border-l-4 border-l-purple-500">
            <CardContent className="p-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Layer 4</h3>
                  <p className="text-sm text-gray-600">Conversational</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Natural language explanations that make complex financial decisions simple.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Value Proposition */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 text-center bg-gradient-to-b from-blue-50 to-white">
            <CardContent className="p-0">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">10x Faster Discovery</h3>
              <p className="text-gray-600">
                From weeks of research to perfect recommendations in seconds. Our AI eliminates choice paralysis.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8 text-center bg-gradient-to-b from-green-50 to-white">
            <CardContent className="p-0">
              <Shield className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Truly Personalized</h3>
              <p className="text-gray-600">
                Every recommendation considers your unique financial DNA. No generic advice, ever.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8 text-center bg-gradient-to-b from-purple-50 to-white">
            <CardContent className="p-0">
              <Brain className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Always Learning</h3>
              <p className="text-gray-600">
                Our AI gets smarter with every interaction, continuously improving your financial journey.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Market Size */}
        <Card className="p-8 mb-16 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
          <CardContent className="p-0 text-center">
            <h3 className="text-3xl font-bold mb-4">₹24,000 Cr Market Opportunity</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-bold text-blue-300">50M+</div>
                <div className="text-sm text-gray-300">Active Investors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-300">15%</div>
                <div className="text-sm text-gray-300">Annual Growth</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-300">₹4,200 Cr</div>
                <div className="text-sm text-gray-300">Future B2B Platform</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Transform Financial Discovery?
          </h3>
          <p className="text-gray-600 mb-8">
            Join thousands of investors already using our AI to make smarter financial decisions.
          </p>
          <Button 
            onClick={() => navigate('/onboarding')}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg"
          >
            Start Your AI Journey
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
