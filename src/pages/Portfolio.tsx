
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, TrendingUp, Eye, Activity, Brain, AlertTriangle, Target, Star, Shield, CreditCard, Banknote, PiggyBank, Home, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HealthScoreCard from '@/components/HealthScoreCard';
import PortfolioOverview from '@/components/dashboard/PortfolioOverview';
import AIInsight from '@/components/AIInsight';
import { HealthScoreData } from '@/utils/healthScore';

const Portfolio = () => {
  const navigate = useNavigate();
  const [healthScore, setHealthScore] = useState<HealthScoreData | null>(null);

  useEffect(() => {
    const savedScore = localStorage.getItem('healthScore');
    if (savedScore) {
      setHealthScore(JSON.parse(savedScore));
    }
  }, []);

  // Comprehensive portfolio data
  const portfolioData = {
    totalValue: 2450000,
    totalGains: 156000,
    gainsPercent: 6.8,
    monthlyIncome: 180000,
    monthlyExpenses: 85000,
    investments: [
      { name: 'HDFC Top 100 Fund', value: 185000, gains: 18500, type: 'Mutual Fund', allocation: 15.5 },
      { name: 'ICICI Prudent Growth', value: 125000, gains: 8200, type: 'Mutual Fund', allocation: 10.2 },
      { name: 'SBI Bluechip Fund', value: 95000, gains: 4500, type: 'Mutual Fund', allocation: 7.8 },
      { name: 'HDFC Bank', value: 85000, gains: 12100, type: 'Stock', allocation: 6.9 },
      { name: 'TCS', value: 65000, gains: 8500, type: 'Stock', allocation: 5.3 },
      { name: 'Reliance Industries', value: 45000, gains: 2100, type: 'Stock', allocation: 3.7 },
      { name: 'Infosys', value: 35000, gains: -1200, type: 'Stock', allocation: 2.8 }
    ],
    fixedDeposits: [
      { bank: 'HDFC Bank', amount: 500000, rate: 6.8, maturity: '2025-03-15', type: 'FD' },
      { bank: 'SBI', amount: 300000, rate: 6.5, maturity: '2024-12-20', type: 'FD' },
      { bank: 'ICICI Bank', amount: 200000, rate: 6.9, maturity: '2025-06-10', type: 'FD' }
    ],
    creditCards: [
      { bank: 'HDFC Bank', limit: 500000, outstanding: 45000, utilization: 9, type: 'Credit Card' },
      { bank: 'SBI Card', limit: 300000, outstanding: 12000, utilization: 4, type: 'Credit Card' },
      { bank: 'ICICI Bank', limit: 200000, outstanding: 8000, utilization: 4, type: 'Credit Card' }
    ],
    loans: [
      { type: 'Home Loan', bank: 'HDFC Bank', outstanding: 2800000, emi: 28000, rate: 8.5 },
      { type: 'Car Loan', bank: 'ICICI Bank', outstanding: 450000, emi: 15000, rate: 9.2 }
    ],
    insurance: [
      { type: 'Term Life', company: 'LIC', coverage: 10000000, premium: 48000, status: 'Active' },
      { type: 'Health Insurance', company: 'Star Health', coverage: 1000000, premium: 24000, status: 'Active' },
      { type: 'Motor Insurance', company: 'HDFC Ergo', coverage: 500000, premium: 12000, status: 'Active' }
    ]
  };

  const financialScore = {
    overall: 78,
    wealth: 85,
    protection: 72,
    debt: 68,
    liquidity: 82
  };

  const getAssetIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'mutual fund': return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'stock': return <Activity className="w-5 h-5 text-green-600" />;
      case 'fd': return <PiggyBank className="w-5 h-5 text-purple-600" />;
      case 'credit card': return <CreditCard className="w-5 h-5 text-orange-600" />;
      case 'term life': case 'health insurance': case 'motor insurance': return <Shield className="w-5 h-5 text-indigo-600" />;
      case 'home loan': return <Home className="w-5 h-5 text-red-600" />;
      case 'car loan': return <Car className="w-5 h-5 text-yellow-600" />;
      default: return <Banknote className="w-5 h-5 text-gray-600" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-xl font-semibold">Complete Portfolio</h1>
          
          <Button onClick={() => navigate('/portfolio/update')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Investment
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* AI Analysis Section */}
        <AIInsight
          sentiment="bullish"
          confidence={82}
          summary="Your portfolio shows strong diversification across equity and debt instruments. The 68% equity allocation aligns well with your age and risk profile. However, consider increasing emergency fund coverage and reviewing high-interest debt."
          keyPoints={[
            "Excellent mutual fund diversification across large-cap and multi-cap categories",
            "Good stock selection with focus on quality blue-chip companies",
            "FD allocation provides stability but consider debt mutual funds for better tax efficiency",
            "Credit card utilization is healthy at 6% average across all cards",
            "Insurance coverage is adequate but consider increasing health coverage"
          ]}
          recommendation="Consider rebalancing by reducing FD allocation to 15% and increasing equity exposure through SIPs. Also, explore tax-saving instruments to optimize your tax liability."
        />

        {/* Financial Score Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
          <Card className="lg:col-span-1 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Overall Score</h3>
                <div className="text-3xl font-bold">{financialScore.overall}/100</div>
                <p className="text-sm opacity-90">Good Financial Health</p>
              </div>
            </CardContent>
          </Card>
          
          {Object.entries(financialScore).filter(([key]) => key !== 'overall').map(([category, score]) => (
            <Card key={category}>
              <CardContent className="p-4">
                <div className="text-center">
                  <h4 className="text-sm font-medium text-gray-600 capitalize mb-1">{category}</h4>
                  <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}/100</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Portfolio Overview */}
        <PortfolioOverview />

        {/* Detailed Holdings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Investments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Investments (₹{(portfolioData.investments.reduce((sum, inv) => sum + inv.value, 0)).toLocaleString()})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolioData.investments.map((investment, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getAssetIcon(investment.type)}
                      <div>
                        <h4 className="font-medium">{investment.name}</h4>
                        <p className="text-xs text-gray-600">{investment.type} • {investment.allocation}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{investment.value.toLocaleString()}</p>
                      <p className={`text-xs ${investment.gains > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {investment.gains > 0 ? '+' : ''}₹{investment.gains.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fixed Deposits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-purple-600" />
                Fixed Deposits (₹{(portfolioData.fixedDeposits.reduce((sum, fd) => sum + fd.amount, 0)).toLocaleString()})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolioData.fixedDeposits.map((fd, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{fd.bank}</h4>
                      <p className="text-xs text-gray-600">Maturity: {fd.maturity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{fd.amount.toLocaleString()}</p>
                      <p className="text-xs text-purple-600">{fd.rate}% p.a.</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Credit Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-600" />
                Credit Cards (₹{(portfolioData.creditCards.reduce((sum, cc) => sum + cc.outstanding, 0)).toLocaleString()} outstanding)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolioData.creditCards.map((cc, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{cc.bank}</h4>
                      <p className="text-xs text-gray-600">Limit: ₹{cc.limit.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{cc.outstanding.toLocaleString()}</p>
                      <p className="text-xs text-orange-600">{cc.utilization}% utilized</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Loans */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5 text-red-600" />
                Loans (₹{(portfolioData.loans.reduce((sum, loan) => sum + loan.outstanding, 0)).toLocaleString()} outstanding)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolioData.loans.map((loan, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getAssetIcon(loan.type)}
                      <div>
                        <h4 className="font-medium">{loan.type}</h4>
                        <p className="text-xs text-gray-600">{loan.bank} • {loan.rate}% p.a.</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{loan.outstanding.toLocaleString()}</p>
                      <p className="text-xs text-red-600">EMI: ₹{loan.emi.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insurance */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                Insurance Coverage (₹{(portfolioData.insurance.reduce((sum, ins) => sum + ins.coverage, 0) / 10000000).toFixed(1)}Cr Total Coverage)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {portfolioData.insurance.map((insurance, index) => (
                  <div key={index} className="p-4 bg-indigo-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {getAssetIcon(insurance.type)}
                      <h4 className="font-medium">{insurance.type}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{insurance.company}</p>
                    <p className="font-bold">₹{(insurance.coverage / 100000).toFixed(1)}L Coverage</p>
                    <p className="text-xs text-indigo-600">₹{insurance.premium.toLocaleString()}/year</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cash Flow Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-1">Monthly Income</h4>
                <p className="text-2xl font-bold text-green-600">₹{portfolioData.monthlyIncome.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-1">Monthly Expenses</h4>
                <p className="text-2xl font-bold text-red-600">₹{portfolioData.monthlyExpenses.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-1">EMI Outflow</h4>
                <p className="text-2xl font-bold text-orange-600">₹{portfolioData.loans.reduce((sum, loan) => sum + loan.emi, 0).toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-1">Net Surplus</h4>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{(portfolioData.monthlyIncome - portfolioData.monthlyExpenses - portfolioData.loans.reduce((sum, loan) => sum + loan.emi, 0)).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
