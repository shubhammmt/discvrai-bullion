
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Shield, AlertTriangle, Brain, Eye, Plus, Bookmark, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIFeedChat from '@/components/AIFeedChat';

const MutualFundFeed = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>({});

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  // SEBI-compliant mutual fund data with proper risk categorization
  const systemRecommendations = [
    {
      id: 1,
      name: 'HDFC Top 100 Fund',
      category: 'Large Cap Fund',
      aum: '₹45,230 Cr',
      expenseRatio: 1.05,
      nav: 645.20,
      returns: {
        '1Y': 18.5,
        '3Y': 12.3,
        '5Y': 14.2
      },
      riskLevel: 'Moderately High',
      riskColor: 'yellow',
      minSip: 500,
      lockIn: 'Nil',
      exitLoad: '1% if redeemed within 1 year',
      fundManager: 'Chirag Setalvad',
      benchmarkName: 'NIFTY 100 TRI',
      whyRecommended: 'Suitable for investors seeking long-term capital appreciation through investment in large-cap companies',
      sebiRisk: 'Equity schemes are subject to market risks. Investors should carefully read scheme documents before investing.'
    },
    {
      id: 2,
      name: 'SBI Bluechip Fund',
      category: 'Large Cap Fund',
      aum: '₹32,145 Cr',
      expenseRatio: 0.98,
      nav: 52.45,
      returns: {
        '1Y': 16.8,
        '3Y': 11.9,
        '5Y': 13.5
      },
      riskLevel: 'Moderately High',
      riskColor: 'yellow',
      minSip: 500,
      lockIn: 'Nil',
      exitLoad: '1% if redeemed within 1 year',
      fundManager: 'R. Srinivasan',
      benchmarkName: 'NIFTY 100 TRI',
      whyRecommended: 'Diversified large-cap portfolio with consistent performance track record',
      sebiRisk: 'Mutual fund investments are subject to market risks. Please read all scheme related documents carefully.'
    },
    {
      id: 3,
      name: 'Axis Long Term Equity Fund',
      category: 'ELSS',
      aum: '₹28,340 Cr',
      expenseRatio: 1.25,
      nav: 89.34,
      returns: {
        '1Y': 22.1,
        '3Y': 15.2,
        '5Y': 16.8
      },
      riskLevel: 'High',
      riskColor: 'red',
      minSip: 500,
      lockIn: '3 Years',
      exitLoad: 'Nil',
      fundManager: 'Jinesh Gopani',
      benchmarkName: 'NIFTY 500 TRI',
      whyRecommended: 'Tax-saving fund with potential for capital appreciation and tax benefits under Section 80C',
      sebiRisk: 'ELSS funds have a statutory lock-in of 3 years. Equity investments are subject to market volatility.'
    },
    {
      id: 4,
      name: 'ICICI Prudential Balanced Advantage Fund',
      category: 'Hybrid Fund',
      aum: '₹51,230 Cr',
      expenseRatio: 1.15,
      nav: 48.67,
      returns: {
        '1Y': 14.2,
        '3Y': 10.8,
        '5Y': 12.1
      },
      riskLevel: 'Moderate',
      riskColor: 'green',
      minSip: 500,
      lockIn: 'Nil',
      exitLoad: '1% if redeemed within 1 year',
      fundManager: 'Ihab Dalwai',
      benchmarkName: 'CRISIL Hybrid 25+75 - Aggressive Index',
      whyRecommended: 'Dynamic asset allocation between equity and debt based on market conditions',
      sebiRisk: 'Hybrid funds invest in both equity and debt. Returns may vary based on market conditions.'
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

  const MutualFundCard = ({ fund }: { fund: any }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">{fund.name}</CardTitle>
            <p className="text-sm text-gray-600">{fund.category} • AUM: {fund.aum}</p>
          </div>
          <Badge className={getRiskBadgeColor(fund.riskColor)}>
            {fund.riskLevel}
          </Badge>
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
            <p className="text-xs text-gray-500">1 Year Return*</p>
            <p className="text-lg font-bold text-green-600">{fund.returns['1Y']}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">3 Year Return*</p>
            <p className="text-lg font-bold text-green-600">{fund.returns['3Y']}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">5 Year Return*</p>
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
        <div className="flex gap-2 mb-4">
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

        {/* SEBI Compliance Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-amber-800 font-medium mb-1">Important Disclaimer:</p>
              <p className="text-xs text-amber-700">{fund.sebiRisk}</p>
              <p className="text-xs text-amber-700 mt-1">
                *Past performance may or may not be sustained in future. Please consult your financial advisor.
              </p>
            </div>
          </div>
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

          {/* SEBI Compliance Header */}
          <div className="bg-gray-50 border-l-4 border-l-gray-400 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <Shield className="text-gray-600 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Regulatory Information</h3>
                <p className="text-sm text-gray-700 mb-2">
                  This platform provides educational information only. All mutual fund investments are subject to market risks. 
                  Returns shown are historical and do not guarantee future performance.
                </p>
                <p className="text-xs text-gray-600">
                  Please read all scheme related documents carefully before investing. Consider consulting a certified financial advisor for personalized advice.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Chat Interface */}
        <AIFeedChat 
          onQuerySubmit={(query, context) => {
            console.log('MF Query:', query, context);
          }}
          userProfile={userProfile}
        />

        {/* System Recommendations */}
        <Card className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6" />
              AI-Curated Recommendations
            </CardTitle>
            <p className="text-blue-100 text-sm">
              Based on your risk profile: {userProfile.riskTolerance || 'Moderate'} • 
              Investment horizon: {userProfile.investmentHorizon || 'Long-term'}
            </p>
          </CardHeader>
        </Card>

        {/* Mutual Fund Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {systemRecommendations.map((fund) => (
            <MutualFundCard key={fund.id} fund={fund} />
          ))}
        </div>

        {/* Educational Section */}
        <Card className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Understanding Mutual Fund Risks</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-green-700">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Market Risk</h4>
                <p>Fund values fluctuate with market conditions. Equity funds carry higher volatility than debt funds.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Performance Risk</h4>
                <p>Past returns don't guarantee future performance. Fund performance depends on various economic factors.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Liquidity Risk</h4>
                <p>Some funds may have exit loads or lock-in periods. ELSS funds have 3-year mandatory lock-in.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MutualFundFeed;
