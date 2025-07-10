
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Bell, 
  Heart, 
  Share2, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  Brain,
  Target,
  MessageCircle,
  BarChart3,
  Calendar,
  FileText,
  Users,
  AlertTriangle,
  Info,
  ChevronRight,
  Star,
  GitCompare,
  BookmarkPlus,
  StickyNote,
  Zap,
  Activity,
  Eye,
  Volume2
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import PriceQuickStats from '@/components/stock/PriceQuickStats';
import InteractivePriceChart from '@/components/stock/InteractivePriceChart';
import CompanyOverviewCard from '@/components/stock/CompanyOverviewCard';
import KeyFinancialMetrics from '@/components/stock/KeyFinancialMetrics';
import NewsEventsCard from '@/components/stock/NewsEventsCard';
import EarningsResultsCard from '@/components/stock/EarningsResultsCard';
import FinancialStatementsCard from '@/components/stock/FinancialStatementsCard';
import AnalystRatingsCard from '@/components/stock/AnalystRatingsCard';
import PeerComparisonCard from '@/components/stock/PeerComparisonCard';
import TechnicalIndicatorsCard from '@/components/stock/TechnicalIndicatorsCard';
import CorporateActionsCard from '@/components/stock/CorporateActionsCard';
import SocialSentimentCard from '@/components/stock/SocialSentimentCard';
import AIPersonalizationMatch from '@/components/stock/AIPersonalizationMatch';
import QuickActionsCard from '@/components/stock/QuickActionsCard';
import AIRiskAssessment from '@/components/stock/AIRiskAssessment';
import AIConversationWidget from '@/components/stock/AIConversationWidget';
import { useStockData } from '@/hooks/useStockData';

const StockInfoPage = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  // Get user profile for AI personalization
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const userRiskProfile = userProfile.riskTolerance || 'moderate';

  // Use custom hook for stock data
  const { stockData, aiAnalysis, personalizedInsights, isLoading, error } = useStockData(symbol);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading stock data...</p>
        </div>
      </div>
    );
  }

  if (error || !stockData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading stock data</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto p-4">
          {/* Header with Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{stockData.symbol}</h1>
                <p className="text-sm text-gray-600">AI-powered research & analysis</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <GitCompare size={16} className="mr-2" />
                Compare
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsWatchlisted(!isWatchlisted)}
              >
                <Heart size={16} className={`mr-2 ${isWatchlisted ? 'fill-red-500 text-red-500' : ''}`} />
                Watchlist
              </Button>
              <Button variant="outline" size="sm">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* AI Personalization Match Score */}
          <AIPersonalizationMatch 
            personalizedInsights={personalizedInsights}
            userRiskProfile={userRiskProfile}
          />

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Price & Quick Stats */}
              <PriceQuickStats stockData={stockData} aiAnalysis={aiAnalysis} />

              {/* Interactive Price Chart */}
              <InteractivePriceChart stockData={stockData} aiAnalysis={aiAnalysis} />

              {/* Company Overview */}
              <CompanyOverviewCard stockData={stockData} />

              {/* Key Financial Ratios & Metrics */}
              <KeyFinancialMetrics stockData={stockData} aiAnalysis={aiAnalysis} />

              {/* News & Recent Events */}
              <NewsEventsCard symbol={stockData.symbol} />

              {/* Earnings & Financial Results Summary */}
              <EarningsResultsCard symbol={stockData.symbol} />

              {/* Detailed Financial Statements */}
              <FinancialStatementsCard symbol={stockData.symbol} />

              {/* Analyst Ratings & Research */}
              <AnalystRatingsCard symbol={stockData.symbol} />

              {/* Peer and Sector Comparison */}
              <PeerComparisonCard stockData={stockData} />

              {/* Technical Indicators & Patterns */}
              <TechnicalIndicatorsCard stockData={stockData} aiAnalysis={aiAnalysis} />

              {/* Corporate Actions & Calendar */}
              <CorporateActionsCard symbol={stockData.symbol} />

              {/* Social & Sentiment Widget */}
              <SocialSentimentCard symbol={stockData.symbol} />
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActionsCard 
                symbol={stockData.symbol}
                isWatchlisted={isWatchlisted}
                onWatchlistToggle={setIsWatchlisted}
              />

              {/* AI Risk Assessment */}
              <AIRiskAssessment personalizedInsights={personalizedInsights} />

              {/* Corporate Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Q4 Results</p>
                        <p className="text-xs text-gray-600">Apr 18, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">AGM</p>
                        <p className="text-xs text-gray-600">Jun 28, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Ex-Dividend</p>
                        <p className="text-xs text-gray-600">Jul 15, 2024</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Conversation Widget */}
              <AIConversationWidget symbol={stockData.symbol} />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StockInfoPage;
