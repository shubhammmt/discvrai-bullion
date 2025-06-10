
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Heart, Users, CheckCircle, AlertTriangle, Target, Brain, MessageCircle, Bell, Plus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ViewToggle from '@/components/ViewToggle';
import InsuranceDetailedView from '@/components/InsuranceDetailedView';

const InsuranceResearch = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'quick' | 'detailed'>('quick');
  const [showCopilot, setShowCopilot] = useState(false);

  // Get user profile for personalized insights
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const insuranceData = {
    name: productId ? `${productId.replace('-', ' ').toUpperCase()}` : 'Term Life Insurance',
    provider: 'HDFC Life',
    premium: '₹12,000',
    coverage: '₹1 Crore',
    tenure: '30 Years',
    type: 'Term Life'
  };

  // Personalized contextual insights based on user profile
  const getPersonalizedContext = () => {
    const age = userProfile.age || 30;
    const dependents = userProfile.dependents || 2;
    const income = userProfile.income || 800000;

    const requiredCoverage = income * 10; // 10x income rule
    const coverageGap = Math.max(0, requiredCoverage - 10000000); // Current coverage is 1 Crore

    if (age < 25) {
      return {
        match: 95,
        reason: 'Excellent timing! Young age means lowest premiums and maximum coverage duration.',
        suggestion: 'Lock in these low premiums now. Consider increasing coverage as income grows.',
        coverageAdequacy: coverageGap > 0 ? 'Consider higher coverage' : 'Adequate coverage'
      };
    } else if (age < 35) {
      return {
        match: 90,
        reason: 'Great fit for your life stage. Optimal balance of coverage and affordability.',
        suggestion: 'Perfect time to secure comprehensive protection for your family.',
        coverageAdequacy: coverageGap > 0 ? 'May need additional coverage' : 'Good coverage level'
      };
    } else {
      return {
        match: 80,
        reason: 'Important protection needed. Premiums increase with age, so act soon.',
        suggestion: 'Don\'t delay - secure your family\'s financial future now.',
        coverageAdequacy: 'Review coverage based on current responsibilities'
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
              <h1 className="text-xl font-bold text-gray-900">{insuranceData.name}</h1>
              <p className="text-sm text-gray-600">AI-powered insurance analysis</p>
            </div>
            <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
          </div>

          {/* Personalized Match Score */}
          <Card className="mb-4 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">
                      {personalizedContext.match}% Match for You
                    </h3>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      Age {userProfile.age || 30}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{personalizedContext.reason}</p>
                  <p className="text-xs text-red-600 font-medium">{personalizedContext.suggestion}</p>
                </div>
                <Button 
                  onClick={handleCopilotClick}
                  size="sm"
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  <Brain size={16} className="mr-2" />
                  Ask AI
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Insurance Header */}
          <Card className="mb-6 bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{insuranceData.name}</h1>
                  <p className="text-gray-600">{insuranceData.provider}</p>
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-2">
                    {insuranceData.type}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">{insuranceData.coverage}</div>
                  <div className="text-sm text-gray-600">Sum Assured</div>
                  <div className="text-lg font-semibold text-gray-700 mt-1">{insuranceData.premium}/year</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Bar */}
          <div className="flex items-center justify-between mb-6 p-3 bg-white/70 backdrop-blur-md rounded-lg border border-white/20">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="text-gray-600">
                <Bell size={16} className="mr-2" />
                Alerts
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-600">
                <Heart size={16} className="mr-2" />
                Compare
              </Button>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus size={16} className="mr-2" />
              Get Quote
            </Button>
          </div>

          {currentView === 'quick' ? (
            <div className="space-y-6">
              {/* AI Analysis with enhanced personalization */}
              <div className="relative">
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-red-600" />
                      AI Analysis & Recommendation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                      <h4 className="font-semibold text-green-800 mb-2">Recommendation: HIGHLY RECOMMENDED</h4>
                      <p className="text-green-700">
                        Excellent coverage with affordable premiums. Perfect match for your age and income profile.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-sm">High coverage of ₹1 Crore with low premium for your age group</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-sm">Tax benefits under Section 80C and 10(10D) - save up to ₹46,800 annually</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-sm">Quick claim settlement with 98% success rate by HDFC Life</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                        <p className="text-sm">{personalizedContext.coverageAdequacy} - consider your current financial responsibilities</p>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                      <div className="flex items-start gap-2">
                        <Brain size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-red-800 mb-1">Personalized Insight:</p>
                          <p className="text-sm text-red-700">
                            Based on your profile, this policy provides {Math.round((10000000 / ((userProfile.income || 800000) * 10)) * 100)}% of recommended coverage (10x annual income rule). 
                            Premium represents only {((12000 / (userProfile.income || 800000)) * 100).toFixed(1)}% of your annual income - well within affordable range.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Button
                  onClick={handleCopilotClick}
                  className="absolute top-4 right-4 bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full shadow-lg"
                  size="sm"
                >
                  <MessageCircle size={16} />
                </Button>
              </div>

              {/* Key Features with AI Context */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <div className="text-xl font-bold">{insuranceData.coverage}</div>
                    <div className="text-sm text-gray-600">Coverage Amount</div>
                    <div className="text-xs text-red-600 mt-1">Strong protection</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <Heart className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                    <div className="text-xl font-bold">{insuranceData.premium}</div>
                    <div className="text-sm text-gray-600">Annual Premium</div>
                    <div className="text-xs text-pink-600 mt-1">Very affordable</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-xl font-bold">{insuranceData.tenure}</div>
                    <div className="text-sm text-gray-600">Policy Term</div>
                    <div className="text-xs text-blue-600 mt-1">Long-term security</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-xl font-bold">9.5/10</div>
                    <div className="text-sm text-gray-600">AI Score</div>
                    <div className="text-xs text-green-600 mt-1">Excellent choice</div>
                  </CardContent>
                </Card>
              </div>

              {/* Coverage Details & Benefits */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle>Coverage Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Death Benefit</span>
                        <span className="font-medium">{insuranceData.coverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maturity Benefit</span>
                        <span className="font-medium">None (Term)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Premium Payment</span>
                        <span className="font-medium">Annual</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Grace Period</span>
                        <span className="font-medium">30 Days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle>Key Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Tax deduction up to ₹1.5 lakhs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Tax-free death benefit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Online premium payment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Flexible premium payment terms</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed View CTA */}
              <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Need More Details?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Access detailed coverage analysis, premium calculator, and rider options
                  </p>
                  <Button 
                    onClick={() => setCurrentView('detailed')}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Shield size={16} className="mr-2" />
                    Detailed Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <InsuranceDetailedView />
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default InsuranceResearch;
