import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Heart, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import ViewToggle from '@/components/ViewToggle';
import InsuranceDetailedView from '@/components/InsuranceDetailedView';

const InsuranceResearch = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'quick' | 'detailed'>('quick');

  const insuranceData = {
    name: productId ? `${productId.replace('-', ' ').toUpperCase()}` : 'Term Life Insurance',
    provider: 'HDFC Life',
    premium: '₹12,000',
    coverage: '₹1 Crore',
    tenure: '30 Years',
    type: 'Term Life'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Insurance Research</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">AI-powered insurance analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Get Quote
            </Button>
          </div>
        </div>

        {/* Insurance Header */}
        <Card className="mb-6 bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{insuranceData.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{insuranceData.provider}</p>
                <span className="inline-block bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs px-2 py-1 rounded-full mt-2">
                  {insuranceData.type}
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600">{insuranceData.coverage}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Sum Assured</div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-1">{insuranceData.premium}/year</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {currentView === 'quick' ? (
          <div className="space-y-6">
            {/* Key Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-red-600" />
                  <div className="text-xl font-bold dark:text-white">{insuranceData.coverage}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Coverage Amount</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
                <CardContent className="p-4 text-center">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                  <div className="text-xl font-bold dark:text-white">{insuranceData.premium}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Annual Premium</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-xl font-bold dark:text-white">{insuranceData.tenure}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Policy Term</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-xl font-bold dark:text-white">9.5/10</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">AI Score</div>
                </CardContent>
              </Card>
            </div>

            {/* AI Analysis */}
            <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="dark:text-white">AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mb-4">
                  <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">Recommendation: HIGHLY RECOMMENDED</h4>
                  <p className="text-green-700 dark:text-green-300">
                    Excellent coverage with affordable premiums. Perfect match for your age and income profile.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm dark:text-gray-300">High coverage of ₹1 Crore with low premium</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm dark:text-gray-300">Tax benefits under Section 80C and 10(10D)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm dark:text-gray-300">Quick claim settlement with 98% success rate</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <p className="text-sm dark:text-gray-300">Consider adding critical illness rider for comprehensive coverage</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coverage Details & Benefits */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="dark:text-white">Coverage Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Death Benefit</span>
                      <span className="font-medium dark:text-white">{insuranceData.coverage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Maturity Benefit</span>
                      <span className="font-medium dark:text-white">None (Term)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Premium Payment</span>
                      <span className="font-medium dark:text-white">Annual</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Grace Period</span>
                      <span className="font-medium dark:text-white">30 Days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="dark:text-white">Key Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm dark:text-gray-300">Tax deduction up to ₹1.5 lakhs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm dark:text-gray-300">Tax-free death benefit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm dark:text-gray-300">Online premium payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm dark:text-gray-300">Flexible premium payment terms</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <InsuranceDetailedView />
        )}
      </div>
    </div>
  );
};

export default InsuranceResearch;
