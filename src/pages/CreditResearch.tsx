
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Heart, CreditCard, Calculator, CheckCircle, AlertCircle, Target, Brain, MessageCircle, Bell } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ViewToggle from '@/components/ViewToggle';
import CreditDetailedView from '@/components/CreditDetailedView';

const CreditResearch = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'quick' | 'detailed'>('quick');
  const [showCopilot, setShowCopilot] = useState(false);

  // Get user profile for personalized insights
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const creditData = {
    name: productId ? `${productId.replace('-', ' ').toUpperCase()}` : 'Personal Loan',
    provider: 'HDFC Bank',
    interestRate: '10.5%',
    processingFee: '1.5%',
    maxAmount: '₹40 Lakhs',
    tenure: '7 Years'
  };

  // Personalized contextual insights based on user profile
  const getPersonalizedContext = () => {
    const income = userProfile.income || 600000;
    const creditScore = userProfile.creditScore || 750;
    const purpose = userProfile.loanPurpose || 'general';

    const maxEligibleAmount = Math.min(income * 6, 4000000); // 6x income or 40L max
    const recommendedEMI = income * 0.4 / 12; // 40% of monthly income

    if (creditScore >= 800) {
      return {
        match: 95,
        reason: 'Excellent credit score qualifies you for the best rates and terms available.',
        suggestion: 'You qualify for premium rates. Consider negotiating for even better terms.',
        eligibility: `You're eligible for up to ₹${Math.round(maxEligibleAmount/100000)} Lakhs`
      };
    } else if (creditScore >= 750) {
      return {
        match: 85,
        reason: 'Good credit profile ensures smooth approval with competitive rates.',
        suggestion: 'Great fit for your credit profile. Quick approval expected.',
        eligibility: `You're eligible for up to ₹${Math.round(maxEligibleAmount/100000)} Lakhs`
      };
    } else {
      return {
        match: 70,
        reason: 'Consider improving credit score for better rates in future applications.',
        suggestion: 'Still eligible but work on credit improvement for better terms next time.',
        eligibility: 'Eligibility subject to detailed verification'
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
              <h1 className="text-xl font-bold text-gray-900">{creditData.name}</h1>
              <p className="text-sm text-gray-600">AI-powered credit analysis</p>
            </div>
            <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
          </div>

          {/* Personalized Match Score */}
          <Card className="mb-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">
                      {personalizedContext.match}% Match for You
                    </h3>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      CIBIL {userProfile.creditScore || 750}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{personalizedContext.reason}</p>
                  <p className="text-xs text-orange-600 font-medium">{personalizedContext.suggestion}</p>
                </div>
                <Button 
                  onClick={handleCopilotClick}
                  size="sm"
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  <Brain size={16} className="mr-2" />
                  Ask AI
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Credit Header */}
          <Card className="mb-6 bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{creditData.name}</h1>
                  <p className="text-gray-600">{creditData.provider}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">{creditData.interestRate}</div>
                  <div className="text-sm text-gray-600">Interest Rate (p.a.)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Bar */}
          <div className="flex items-center justify-between mb-6 p-3 bg-white/70 backdrop-blur-md rounded-lg border border-white/20">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="text-gray-600">
                <Bell size={16} className="mr-2" />
                Rate Alerts
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-600">
                <Heart size={16} className="mr-2" />
                Compare
              </Button>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus size={16} className="mr-2" />
              Apply Now
            </Button>
          </div>

          {currentView === 'quick' ? (
            <div className="space-y-6">
              {/* AI Analysis with enhanced personalization */}
              <div className="relative">
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-orange-600" />
                      AI Analysis & Recommendation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                      <h4 className="font-semibold text-green-800 mb-2">Recommendation: APPLY</h4>
                      <p className="text-green-700">
                        Competitive interest rates with flexible tenure options. Good match for your credit profile.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-sm">Competitive interest rate of 10.5% p.a. - below market average</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-sm">Quick approval process (24-48 hours) with minimal documentation</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-sm">No hidden charges or prepayment penalties after 12 months</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                        <p className="text-sm">{personalizedContext.eligibility}</p>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-4">
                      <div className="flex items-start gap-2">
                        <Brain size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-orange-800 mb-1">Personalized Insight:</p>
                          <p className="text-sm text-orange-700">
                            Based on your credit score of {userProfile.creditScore || 750}, you qualify for the advertised rate. 
                            Recommended EMI: ₹{Math.round(((userProfile.income || 600000) * 0.4) / 12).toLocaleString()} 
                            (40% of monthly income rule for comfortable repayment).
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Button
                  onClick={handleCopilotClick}
                  className="absolute top-4 right-4 bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-full shadow-lg"
                  size="sm"
                >
                  <MessageCircle size={16} />
                </Button>
              </div>

              {/* Key Features with AI Context */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-xl font-bold">{creditData.maxAmount}</div>
                    <div className="text-sm text-gray-600">Max Amount</div>
                    <div className="text-xs text-orange-600 mt-1">High limit available</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <Calculator className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-xl font-bold">{creditData.processingFee}</div>
                    <div className="text-sm text-gray-600">Processing Fee</div>
                    <div className="text-xs text-blue-600 mt-1">Reasonable charges</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-xl font-bold">{creditData.tenure}</div>
                    <div className="text-sm text-gray-600">Max Tenure</div>
                    <div className="text-xs text-green-600 mt-1">Flexible repayment</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-xl font-bold">9.2/10</div>
                    <div className="text-sm text-gray-600">AI Score</div>
                    <div className="text-xs text-purple-600 mt-1">Excellent choice</div>
                  </CardContent>
                </Card>
              </div>

              {/* Eligibility & Requirements */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle>Eligibility Criteria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Age</span>
                        <span className="font-medium">21-60 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minimum Income</span>
                        <span className="font-medium">₹25,000/month</span>
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

                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle>Required Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">PAN Card</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Aadhaar Card</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Salary Slips (3 months)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Bank Statements (6 months)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed View CTA */}
              <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Need Detailed Analysis?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Access EMI calculator, interest rate comparison, and detailed terms
                  </p>
                  <Button 
                    onClick={() => setCurrentView('detailed')}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Calculator size={16} className="mr-2" />
                    Deep Dive Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <CreditDetailedView />
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CreditResearch;
