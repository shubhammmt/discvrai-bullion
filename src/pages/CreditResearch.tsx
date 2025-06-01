
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Heart, CreditCard, Calculator, CheckCircle, AlertCircle } from 'lucide-react';
import ViewToggle from '@/components/ViewToggle';

const CreditResearch = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'quick' | 'detailed'>('quick');

  const creditData = {
    name: productId ? `${productId.replace('-', ' ').toUpperCase()}` : 'Personal Loan',
    provider: 'HDFC Bank',
    interestRate: '10.5%',
    processingFee: '1.5%',
    maxAmount: '₹40 Lakhs',
    tenure: '7 Years'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-white/70 backdrop-blur-md border-white/20"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Credit Research</h1>
              <p className="text-gray-600 text-sm">AI-powered credit analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              Apply Now
            </Button>
          </div>
        </div>

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

        {currentView === 'quick' ? (
          <div className="space-y-6">
            {/* Key Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-xl font-bold">{creditData.maxAmount}</div>
                  <div className="text-sm text-gray-600">Max Amount</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <Calculator className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-xl font-bold">{creditData.processingFee}</div>
                  <div className="text-sm text-gray-600">Processing Fee</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-xl font-bold">{creditData.tenure}</div>
                  <div className="text-sm text-gray-600">Max Tenure</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-xl font-bold">9.2/10</div>
                  <div className="text-sm text-gray-600">AI Score</div>
                </CardContent>
              </Card>
            </div>

            {/* AI Analysis */}
            <Card className="bg-white/70 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle>AI Analysis</CardTitle>
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
                    <p className="text-sm">Competitive interest rate of 10.5% p.a.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm">Quick approval process (24-48 hours)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm">No hidden charges or prepayment penalties</p>
                  </div>
                </div>
              </CardContent>
            </Card>

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
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">Detailed Analysis Coming Soon</h3>
            <p className="text-gray-600">Advanced credit analysis features will be available in the next update.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditResearch;
