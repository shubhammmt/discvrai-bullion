
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, Gift, Percent, CheckCircle, Star } from 'lucide-react';

const CreditCardResearch = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const cardData = {
    name: cardId ? `${cardId.replace('-', ' ').toUpperCase()}` : 'HDFC Regalia Credit Card',
    bank: 'HDFC Bank',
    annualFee: '₹2,500',
    joiningFee: '₹2,500',
    creditLimit: '₹5 Lakhs',
    rewardRate: '4%'
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Credit Card Research</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">AI-powered card analysis</p>
            </div>
          </div>
          
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Apply Now
          </Button>
        </div>

        {/* Card Header */}
        <Card className="mb-6 bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{cardData.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{cardData.bank}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">4.5/5 Rating</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-teal-600">{cardData.rewardRate}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Reward Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
            <CardContent className="p-4 text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-teal-600" />
              <div className="text-xl font-bold dark:text-white">{cardData.creditLimit}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Credit Limit</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
            <CardContent className="p-4 text-center">
              <Gift className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-xl font-bold dark:text-white">{cardData.annualFee}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Annual Fee</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
            <CardContent className="p-4 text-center">
              <Percent className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-xl font-bold dark:text-white">{cardData.rewardRate}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Reward Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-xl font-bold dark:text-white">9.0/10</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">AI Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits & Rewards */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="dark:text-white">Key Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <p className="text-sm dark:text-gray-300">4 reward points per ₹150 spent</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <p className="text-sm dark:text-gray-300">Complimentary airport lounge access</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <p className="text-sm dark:text-gray-300">No foreign currency markup</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <p className="text-sm dark:text-gray-300">Insurance coverage up to ₹1 crore</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="dark:text-white">Eligibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="dark:text-gray-300">Minimum Income</span>
                  <span className="font-medium dark:text-white">₹6 Lakhs/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="dark:text-gray-300">Age</span>
                  <span className="font-medium dark:text-white">21-60 years</span>
                </div>
                <div className="flex justify-between">
                  <span className="dark:text-gray-300">CIBIL Score</span>
                  <span className="font-medium dark:text-white">750+</span>
                </div>
                <div className="flex justify-between">
                  <span className="dark:text-gray-300">Employment</span>
                  <span className="font-medium dark:text-white">Salaried/Self-employed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreditCardResearch;
