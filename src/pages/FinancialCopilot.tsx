
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Bot, TrendingUp, Search, ArrowRight, DollarSign, 
  PieChart, Upload, MessageSquare, Target, 
  BarChart3, AlertTriangle, FileSpreadsheet,
  Camera, Zap, Heart, Shield, Brain, Activity
} from 'lucide-react';
import USMarketStats from '@/components/USMarketStats';
import USMarketAnalysis from '@/components/USMarketAnalysis';
import USMarketHeatmap from '@/components/USMarketHeatmap';

const FinancialCopilot = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const sampleQueries = [
    "Find growth stocks with P/E under 25",
    "Options strategies for TSLA earnings",
    "Best dividend ETFs for retirement",
    "ESG funds outperforming S&P 500"
  ];

  const portfolioMetrics = [
    { label: "Total Assets", value: "$2.4M", change: "+5.2%" },
    { label: "Annualized Return", value: "14.8%", change: "+2.1%" },
    { label: "Volatility", value: "12.4%", change: "-0.8%" },
    { label: "Max Drawdown", value: "-8.2%", change: "+1.1%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Advanced Portfolio Intelligence
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Professional-grade portfolio analytics, sophisticated screening tools, and institutional-quality research powered by AI
          </p>
        </div>

        {/* Advanced Stats */}
        <USMarketStats />

        {/* Market Analysis Charts */}
        <USMarketAnalysis />

        {/* Market Heatmap */}
        <div className="mb-12">
          <USMarketHeatmap />
        </div>

        {/* Main Interactive Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Advanced Portfolio Analytics */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 hover:border-blue-200 transition-all">
            <CardHeader className="p-0 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Portfolio Analytics</CardTitle>
                  <p className="text-gray-600">Institutional-grade risk metrics and performance attribution</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Advanced Portfolio Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {portfolioMetrics.map((metric, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                    <p className="text-sm text-gray-600 font-medium">{metric.label}</p>
                    <p className="text-xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-sm text-green-600">{metric.change}</p>
                  </div>
                ))}
              </div>

              {/* Advanced Analytics Features */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-700">Risk Attribution</div>
                  </div>
                  <div>
                    <Target className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-700">Factor Analysis</div>
                  </div>
                  <div>
                    <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-700">Stress Testing</div>
                  </div>
                </div>
              </div>

              <Button onClick={() => navigate('/portfolio')} className="w-full bg-blue-600 hover:bg-blue-700">
                Advanced Portfolio Analysis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Sophisticated Stock Screening */}
          <Card className="p-8 bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-100 hover:border-indigo-200 transition-all">
            <CardHeader className="p-0 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">AI Research Assistant</CardTitle>
                  <p className="text-gray-600">Sophisticated screening with natural language queries</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Advanced Search Interface */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Try: 'Find undervalued tech stocks with strong free cash flow and low debt'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none text-sm"
                  />
                  <Search className="absolute right-4 top-4 w-6 h-6 text-gray-400" />
                </div>
              </div>

              {/* Professional Query Examples */}
              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-gray-700">Professional Queries:</p>
                {sampleQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(query)}
                    className="block w-full text-left p-3 bg-white rounded-lg border hover:border-indigo-200 hover:bg-indigo-50 transition-all text-sm"
                  >
                    "{query}"
                  </button>
                ))}
              </div>

              {/* Research Tools */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <Shield className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
                    <div className="text-xs font-medium text-gray-700">Risk Analysis</div>
                  </div>
                  <div>
                    <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <div className="text-xs font-medium text-gray-700">Valuation Models</div>
                  </div>
                  <div>
                    <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                    <div className="text-xs font-medium text-gray-700">Technical Analysis</div>
                  </div>
                </div>
              </div>

              <Button onClick={() => navigate('/research')} className="w-full bg-indigo-600 hover:bg-indigo-700">
                Advanced Research Tools
                <Zap className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Professional Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6 hover:shadow-xl transition-shadow bg-white border-2 border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered Insights</h3>
            <p className="text-gray-600 text-sm">Advanced machine learning models for market prediction and risk assessment</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-xl transition-shadow bg-white border-2 border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Risk Management</h3>
            <p className="text-gray-600 text-sm">Sophisticated risk metrics including VaR, CVaR, and scenario analysis</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-xl transition-shadow bg-white border-2 border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-gray-600 text-sm">Live market data integration with institutional-grade execution analytics</p>
          </Card>
        </div>

        {/* Professional AI Assistant CTA */}
        <Card className="bg-gradient-to-r from-slate-900 to-blue-900 text-white p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Brain className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">Ready for Professional-Grade Analysis?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Access institutional-quality research, advanced portfolio analytics, and AI-powered market insights
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/portfolio')} 
                className="px-8 py-4 bg-white text-slate-900 hover:bg-gray-100"
              >
                <BarChart3 className="mr-2" size={20} />
                Analyze Portfolio
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/research')} 
                className="px-8 py-4 border-white text-white hover:bg-white hover:text-slate-900"
              >
                <MessageSquare className="mr-2" size={20} />
                Research Assistant
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FinancialCopilot;
