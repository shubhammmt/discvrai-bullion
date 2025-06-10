
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, Gift, Percent, CheckCircle, Star, Brain, MessageCircle, AlertCircle, Target, Plus, Heart, Bell } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const CreditCardResearch = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [showCopilot, setShowCopilot] = useState(false);

  // Get user profile for personalized insights
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const cardData = {
    name: cardId ? `${cardId.replace('-', ' ').toUpperCase()}` : 'HDFC Regalia Credit Card',
    bank: 'HDFC Bank',
    annualFee: '₹2,500',
    joiningFee: '₹2,500',
    creditLimit: '₹5 Lakhs',
    rewardRate: '4%'
  };

  // Personalized contextual insights based on user profile
  const getPersonalizedContext = () => {
    const income = userProfile.income || 600000;
    const spendingPattern = userProfile.spendingPattern || 'moderate';
    const creditScore = userProfile.creditScore || 750;

    if (income > 1000000 && spendingPattern === 'high') {
      return {
        match: 88,
        reason: 'Premium features and high reward rate perfect for your high-income, high-spending profile.',
        suggestion: 'Excellent choice - annual fee easily justified by rewards and premium benefits.',
        eligibility: `Eligible for ₹${Math.min(income * 0.3, 1500000).toLocaleString()} credit limit`
      };
    } else if (income > 600000 && creditScore >= 750) {
      return {
        match: 80,
        reason: 'Good fit for your income level with attractive reward rate and premium benefits.',
        suggestion: 'Consider if you can utilize premium benefits to offset annual fee.',
        eligibility: `Eligible for ₹${Math.min(income * 0.25, 1000000).toLocaleString()} credit limit`
      };
    } else {
      return {
        match: 65,
        reason: 'High annual fee may not justify rewards for lower spending patterns.',
        suggestion: 'Consider entry-level cards with lower fees for better value.',
        eligibility: 'May qualify but consider fee-to-benefit ratio carefully'
      };
    }
  };

  const personalizedContext = getPersonalizedContext();

  const handleCopilotClick = () => {
    setShowCopilot(true);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto p-3 sm:p-4">
          {/* Simplified Header */}
          <div className="flex items-center gap-3 mb-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-white/70 backdrop-blur-md border-white/20"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">Credit Card Research</h1>
              <p className="text-sm text-gray-600">AI-powered card analysis</p>
            </div>
          </div>

          {/* Personalized Match Score */}
          <Card className="mb-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">
                      {personalizedContext.match}% Match for You
                    </h3>
                    <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                      Income ₹{Math.round((userProfile.income || 600000)/100000)}L
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{personalizedContext.reason}</p>
                  <p className="text-xs text-teal-600 font-medium">{personalizedContext.suggestion}</p>
                </div>
                <Button 
                  onClick={handleCopilotClick}
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  <Brain size={16} className="mr-2" />
                  Ask AI
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card Header */}
          <Card className="mb-6 bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{cardData.name}</h1>
                  <p className="text-gray-600">{cardData.bank}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.5/5 Rating</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-600">{cardData.rewardRate}</div>
                  <div className="text-sm text-gray-600">Reward Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Bar */}
          <div className="flex items-center justify-between mb-6 p-3 bg-white/70 backdrop-blur-md rounded-lg border border-white/20">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="text-gray-600">
                <Bell size={16} className="mr-2" />
                Offers Alert
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-600">
                <Heart size={16} className="mr-2" />
                Compare Cards
              </Button>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus size={16} className="mr-2" />
              Apply Now
            </Button>
          </div>

          <div className="space-y-6">
            {/* AI Analysis with enhanced personalization */}
            <div className="relative">
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-teal-600" />
                    AI Analysis & Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                    <h4 className="font-semibold text-green-800 mb-2">Recommendation: APPLY</h4>
                    <p className="text-green-700">
                      Premium card with excellent reward structure and comprehensive benefits package.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm">4 reward points per ₹150 spent - excellent redemption value</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm">Complimentary airport lounge access worldwide</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm">No foreign currency markup - great for international travel</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                      <p className="text-sm">High annual fee - ensure you utilize benefits fully</p>
                    </div>
                  </div>
                  
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 mt-4">
                    <div className="flex items-start gap-2">
                      <Brain size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-teal-800 mb-1">Personalized Insight:</p>
                        <p className="text-sm text-teal-700">
                          {personalizedContext.eligibility}. With your spending pattern, you can earn 
                          ₹{Math.round(((userProfile.income || 600000) * 0.1 * 0.04)).toLocaleString()} annually in rewards. 
                          Annual fee pays for itself if you spend ₹{Math.round(2500/0.04).toLocaleString()}+ yearly.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Button
                onClick={handleCopilotClick}
                className="absolute top-4 right-4 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full shadow-lg"
                size="sm"
              >
                <MessageCircle size={16} />
              </Button>
            </div>

            {/* Key Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-teal-600" />
                  <div className="text-xl font-bold">{cardData.creditLimit}</div>
                  <div className="text-sm text-gray-600">Credit Limit</div>
                  <div className="text-xs text-teal-600 mt-1">High limit available</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <Gift className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-xl font-bold">{cardData.annualFee}</div>
                  <div className="text-sm text-gray-600">Annual Fee</div>
                  <div className="text-xs text-purple-600 mt-1">Premium benefits</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <Percent className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-xl font-bold">{cardData.rewardRate}</div>
                  <div className="text-sm text-gray-600">Reward Rate</div>
                  <div className="text-xs text-green-600 mt-1">High earning rate</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-xl font-bold">9.0/10</div>
                  <div className="text-sm text-gray-600">AI Score</div>
                  <div className="text-xs text-blue-600 mt-1">Excellent choice</div>
                </CardContent>
              </Card>
            </div>

            {/* Benefits & Eligibility */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle>Key Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm">4 reward points per ₹150 spent on all categories</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm">Complimentary airport lounge access (domestic & international)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm">Zero foreign currency markup on international transactions</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm">Comprehensive insurance coverage up to ₹1 crore</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle>Eligibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Minimum Income</span>
                      <span className="font-medium">₹6 Lakhs/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Age</span>
                      <span className="font-medium">21-60 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CIBIL Score</span>
                      <span className="font-medium">750+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Employment</span>
                      <span className="font-medium">Salaried/Self-employed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CreditCardResearch;
