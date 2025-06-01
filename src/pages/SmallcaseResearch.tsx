
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Layers, TrendingUp, Shield, Target, BarChart3 } from 'lucide-react';

const SmallcaseResearch = () => {
  const { smallcaseId } = useParams();
  const navigate = useNavigate();

  const smallcaseData = {
    name: smallcaseId ? `${smallcaseId.replace('-', ' ').toUpperCase()}` : 'Electric Mobility Smallcase',
    manager: 'Windmill Capital',
    minInvestment: '₹2,000',
    returns: '24.5%',
    stocks: 15,
    volatility: 'High'
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Smallcase Research</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">AI-powered thematic portfolio analysis</p>
            </div>
          </div>
          
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Invest Now
          </Button>
        </div>

        {/* Smallcase Header */}
        <Card className="mb-6 bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{smallcaseData.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{smallcaseData.manager}</p>
                <span className="inline-block bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400 text-xs px-2 py-1 rounded-full mt-2">
                  Thematic Portfolio
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{smallcaseData.returns}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Annual Returns</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
              <div className="text-xl font-bold dark:text-white">{smallcaseData.minInvestment}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Min Investment</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
            <CardContent className="p-4 text-center">
              <Layers className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-xl font-bold dark:text-white">{smallcaseData.stocks}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Stocks</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-xl font-bold dark:text-white">{smallcaseData.returns}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">CAGR</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <div className="text-xl font-bold dark:text-white">{smallcaseData.volatility}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Risk Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Composition & Performance */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="dark:text-white">Top Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { stock: 'Tesla Motors', weight: '12.5%', price: '₹15,240' },
                  { stock: 'Tata Motors', weight: '10.8%', price: '₹642' },
                  { stock: 'Mahindra & Mahindra', weight: '9.2%', price: '₹2,845' },
                  { stock: 'Bajaj Auto', weight: '8.7%', price: '₹8,965' },
                  { stock: 'Hero MotoCorp', weight: '7.9%', price: '₹4,123' }
                ].map((holding, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium dark:text-white">{holding.stock}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{holding.price}</div>
                    </div>
                    <div className="font-semibold text-indigo-600">{holding.weight}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="dark:text-white">Investment Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 dark:text-indigo-400 mb-2">Theme: Electric Mobility</h4>
                  <p className="text-indigo-700 dark:text-indigo-300 text-sm">
                    Invest in the future of transportation with companies leading the electric vehicle revolution.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="dark:text-gray-300">Rebalancing</span>
                    <span className="font-medium dark:text-white">Quarterly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-gray-300">Investment Horizon</span>
                    <span className="font-medium dark:text-white">3-5 Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-gray-300">Risk Category</span>
                    <span className="font-medium text-red-600">High Risk</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SmallcaseResearch;
