
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Shield, AlertTriangle, Brain, Eye, Plus, Bookmark, Calculator, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIFeedChat from '@/components/AIFeedChat';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const MutualFundFeed = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>({});
  const [activeCategory, setActiveCategory] = useState('recommended');
  const [loadedFunds, setLoadedFunds] = useState(4);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Category filters
  const categories = [
    { id: 'recommended', label: 'Recommended', description: 'AI-curated for your profile' },
    { id: 'tax-saving', label: 'Tax Saving', description: 'ELSS funds with 80C benefits' },
    { id: 'large-cap', label: 'Large Cap', description: 'Stable blue-chip investments' },
    { id: 'hybrid', label: 'Hybrid', description: 'Balanced equity-debt mix' },
    { id: 'debt', label: 'Debt', description: 'Fixed income focused' },
    { id: 'sip-friendly', label: 'SIP Friendly', description: 'Perfect for systematic investing' }
  ];

  // Enhanced mutual fund data
  const allMutualFunds = [
    {
      id: 1,
      name: 'HDFC Top 100 Fund',
      category: 'Large Cap Fund',
      categoryType: ['recommended', 'large-cap', 'sip-friendly'],
      aum: '₹45,230 Cr',
      expenseRatio: 1.05,
      nav: 645.20,
      returns: { '1Y': 18.5, '3Y': 12.3, '5Y': 14.2 },
      riskLevel: 'Moderately High',
      riskColor: 'yellow',
      minSip: 500,
      lockIn: 'Nil',
      exitLoad: '1% if redeemed within 1 year',
      fundManager: 'Chirag Setalvad',
      whyRecommended: 'Suitable for investors seeking long-term capital appreciation through investment in large-cap companies'
    },
    {
      id: 2,
      name: 'SBI Bluechip Fund',
      category: 'Large Cap Fund',
      categoryType: ['recommended', 'large-cap', 'sip-friendly'],
      aum: '₹32,145 Cr',
      expenseRatio: 0.98,
      nav: 52.45,
      returns: { '1Y': 16.8, '3Y': 11.9, '5Y': 13.5 },
      riskLevel: 'Moderately High',
      riskColor: 'yellow',
      minSip: 500,
      lockIn: 'Nil',
      exitLoad: '1% if redeemed within 1 year',
      fundManager: 'R. Srinivasan',
      whyRecommended: 'Diversified large-cap portfolio with consistent performance track record'
    },
    {
      id: 3,
      name: 'Axis Long Term Equity Fund',
      category: 'ELSS',
      categoryType: ['recommended', 'tax-saving'],
      aum: '₹28,340 Cr',
      expenseRatio: 1.25,
      nav: 89.34,
      returns: { '1Y': 22.1, '3Y': 15.2, '5Y': 16.8 },
      riskLevel: 'High',
      riskColor: 'red',
      minSip: 500,
      lockIn: '3 Years',
      exitLoad: 'Nil',
      fundManager: 'Jinesh Gopani',
      whyRecommended: 'Tax-saving fund with potential for capital appreciation and tax benefits under Section 80C'
    },
    {
      id: 4,
      name: 'ICICI Prudential Balanced Advantage Fund',
      category: 'Hybrid Fund',
      categoryType: ['recommended', 'hybrid', 'sip-friendly'],
      aum: '₹51,230 Cr',
      expenseRatio: 1.15,
      nav: 48.67,
      returns: { '1Y': 14.2, '3Y': 10.8, '5Y': 12.1 },
      riskLevel: 'Moderate',
      riskColor: 'green',
      minSip: 500,
      lockIn: 'Nil',
      exitLoad: '1% if redeemed within 1 year',
      fundManager: 'Ihab Dalwai',
      whyRecommended: 'Dynamic asset allocation between equity and debt based on market conditions'
    },
    {
      id: 5,
      name: 'HDFC Corporate Bond Fund',
      category: 'Debt Fund',
      categoryType: ['debt', 'sip-friendly'],
      aum: '₹18,450 Cr',
      expenseRatio: 0.45,
      nav: 23.87,
      returns: { '1Y': 7.2, '3Y': 6.8, '5Y': 7.5 },
      riskLevel: 'Low',
      riskColor: 'green',
      minSip: 1000,
      lockIn: 'Nil',
      exitLoad: '0.25% if redeemed within 3 months',
      fundManager: 'Manish Banthia',
      whyRecommended: 'Conservative debt investment with stable returns for risk-averse investors'
    },
    {
      id: 6,
      name: 'Mirae Asset Tax Saver Fund',
      category: 'ELSS',
      categoryType: ['tax-saving'],
      aum: '₹22,150 Cr',
      expenseRatio: 1.35,
      nav: 67.89,
      returns: { '1Y': 19.8, '3Y': 13.9, '5Y': 15.2 },
      riskLevel: 'High',
      riskColor: 'red',
      minSip: 500,
      lockIn: '3 Years',
      exitLoad: 'Nil',
      fundManager: 'Neelesh Surana',
      whyRecommended: 'High-growth ELSS fund focusing on quality stocks with tax benefits'
    },
    {
      id: 7,
      name: 'Kotak Standard Multicap Fund',
      category: 'Multi Cap Fund',
      categoryType: ['recommended', 'sip-friendly'],
      aum: '₹15,680 Cr',
      expenseRatio: 1.80,
      nav: 45.23,
      returns: { '1Y': 17.5, '3Y': 12.8, '5Y': 14.8 },
      riskLevel: 'High',
      riskColor: 'red',
      minSip: 500,
      lockIn: 'Nil',
      exitLoad: '1% if redeemed within 1 year',
      fundManager: 'Harsha Upadhyaya',
      whyRecommended: 'Diversified across market caps for balanced risk-reward potential'
    },
    {
      id: 8,
      name: 'DSP Equity & Bond Fund',
      category: 'Aggressive Hybrid Fund',
      categoryType: ['hybrid'],
      aum: '₹8,950 Cr',
      expenseRatio: 1.95,
      nav: 89.76,
      returns: { '1Y': 15.3, '3Y': 11.2, '5Y': 13.1 },
      riskLevel: 'Moderately High',
      riskColor: 'yellow',
      minSip: 500,
      lockIn: 'Nil',
      exitLoad: '1% if redeemed within 1 year',
      fundManager: 'Apurva Shah',
      whyRecommended: 'Aggressive hybrid approach for growth-oriented conservative investors'
    }
  ];

  const getRiskBadgeColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-100 text-green-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      case 'red': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter funds based on active category
  const getFilteredFunds = () => {
    if (activeCategory === 'recommended') {
      return allMutualFunds.filter(fund => fund.categoryType.includes('recommended'));
    }
    return allMutualFunds.filter(fund => fund.categoryType.includes(activeCategory));
  };

  const filteredFunds = getFilteredFunds().slice(0, loadedFunds);

  const loadMoreFunds = () => {
    setLoadedFunds(prev => Math.min(prev + 4, getFilteredFunds().length));
  };

  const MutualFundCard = ({ fund }: { fund: any }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">{fund.name}</CardTitle>
            <p className="text-sm text-gray-600">{fund.category} • AUM: {fund.aum}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getRiskBadgeColor(fund.riskColor)}>
              {fund.riskLevel}
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={16} className="text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">Risk levels are indicative. Past performance doesn't guarantee future returns.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800 font-medium mb-1">Why This Fund:</p>
          <p className="text-xs text-blue-700">{fund.whyRecommended}</p>
        </div>
      </CardHeader>
      <CardContent>
        {/* Performance Section */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-xs text-gray-500">1 Year*</p>
            <p className="text-lg font-bold text-green-600">{fund.returns['1Y']}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">3 Year*</p>
            <p className="text-lg font-bold text-green-600">{fund.returns['3Y']}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">5 Year*</p>
            <p className="text-lg font-bold text-green-600">{fund.returns['5Y']}%</p>
          </div>
        </div>

        {/* Fund Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-gray-600">NAV</p>
            <p className="font-medium">₹{fund.nav}</p>
          </div>
          <div>
            <p className="text-gray-600">Expense Ratio</p>
            <p className="font-medium">{fund.expenseRatio}%</p>
          </div>
          <div>
            <p className="text-gray-600">Min SIP</p>
            <p className="font-medium">₹{fund.minSip}</p>
          </div>
          <div>
            <p className="text-gray-600">Lock-in</p>
            <p className="font-medium">{fund.lockIn}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            <Plus size={16} className="mr-1" />
            Start SIP
          </Button>
          <Button variant="outline" className="flex-1">
            <Calculator size={16} className="mr-1" />
            Calculate
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/research/mutual-fund/hdfc-top-100')}>
            <Eye size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Mutual Fund Discovery
              </h1>
              <p className="text-gray-600 mt-1">Curated recommendations based on your investment profile</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/feed')}>
              View All Assets
            </Button>
          </div>

          {/* Subtle SEBI Compliance */}
          <Alert className="mb-4 border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 text-sm">
              <strong>Investment Advisory:</strong> Mutual funds are subject to market risks. 
              <span className="text-blue-600 cursor-pointer hover:underline ml-1">
                Read all scheme documents carefully before investing.
              </span>
            </AlertDescription>
          </Alert>
        </div>

        {/* AI Chat Interface */}
        <AIFeedChat 
          onQuerySubmit={(query, context) => {
            console.log('MF Query:', query, context);
          }}
          userProfile={userProfile}
        />

        {/* Category Filters */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Browse by Category</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <TooltipProvider key={category.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activeCategory === category.id ? 'default' : 'outline'}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setLoadedFunds(4);
                      }}
                      className="whitespace-nowrap"
                      size="sm"
                    >
                      {category.label}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{category.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* AI Recommendations Header */}
        <Card className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6" />
              {activeCategory === 'recommended' ? 'AI-Curated Recommendations' : `${categories.find(c => c.id === activeCategory)?.label} Funds`}
            </CardTitle>
            <p className="text-blue-100 text-sm">
              {activeCategory === 'recommended' 
                ? `Based on your risk profile: ${userProfile.riskTolerance || 'Moderate'} • Investment horizon: ${userProfile.investmentHorizon || 'Long-term'}`
                : categories.find(c => c.id === activeCategory)?.description
              }
            </p>
          </CardHeader>
        </Card>

        {/* Mutual Fund Cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {filteredFunds.map((fund) => (
            <MutualFundCard key={fund.id} fund={fund} />
          ))}
        </div>

        {/* Load More Button */}
        {loadedFunds < getFilteredFunds().length && (
          <div className="text-center mb-6">
            <Button onClick={loadMoreFunds} variant="outline" className="px-8">
              Load More Funds ({getFilteredFunds().length - loadedFunds} remaining)
            </Button>
          </div>
        )}

        {/* Educational Footer - Subtle */}
        <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
          <p>* Past performance may or may not be sustained in the future. Please consult your financial advisor.</p>
          <p className="mt-1">Mutual fund investments are subject to market risks. Please read all scheme related documents carefully.</p>
        </div>
      </div>
    </div>
  );
};

export default MutualFundFeed;
