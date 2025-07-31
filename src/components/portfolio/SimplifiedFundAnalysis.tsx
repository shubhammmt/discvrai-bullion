import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  DollarSign, 
  Users, 
  Star,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import TrendIndicator from '@/components/stock/shared/TrendIndicator';

interface SimplifiedFundAnalysisProps {
  funds: Array<{
    id: number;
    name: string;
    category: string;
    scheme: string;
    currentValue: number;
    gainsPercentage: number;
    expenseRatio: number;
    returns: Record<string, number>;
    suitability_score?: {
      final_score: number;
      category: string;
      sub_scores: {
        one_year_return: number;
        expense_ratio: number;
        manager_tenure: number;
        aum: number;
      };
      metrics_used: {
        one_year_return: number;
        expense_ratio: number;
        manager_tenure_years: number;
        aum_crore: number;
      };
    };
    recommendation: string;
    insights: Array<{
      type: string;
      message: string;
    }>;
  }>;
  formatCurrency: (amount: number) => string;
}

const SimplifiedFundAnalysis: React.FC<SimplifiedFundAnalysisProps> = ({ 
  funds, 
  formatCurrency 
}) => {
  const getSuitabilityColor = (score: number) => {
    if (score >= 70) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'INCREASE': return 'bg-green-100 text-green-800 border-green-200';
      case 'MAINTAIN': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'REDUCE': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'info': return <Info className="w-4 h-4 text-blue-600" />;
      default: return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const generateKeyInsights = (fund: any) => {
    const insights = [];
    const suitability = fund.suitability_score;
    
    if (!suitability) return fund.insights.slice(0, 2);

    // Performance insight
    if (suitability.sub_scores.one_year_return > 60) {
      insights.push({
        type: 'success',
        message: `Strong 1Y return of ${suitability.metrics_used.one_year_return.toFixed(1)}%`
      });
    } else if (suitability.sub_scores.one_year_return < 30) {
      insights.push({
        type: 'warning',
        message: `Below average 1Y return of ${suitability.metrics_used.one_year_return.toFixed(1)}%`
      });
    }

    // Cost efficiency insight
    if (suitability.sub_scores.expense_ratio < 30) {
      insights.push({
        type: 'warning',
        message: `High expense ratio of ${suitability.metrics_used.expense_ratio}%`
      });
    }

    // Manager experience insight
    if (suitability.sub_scores.manager_tenure > 80) {
      insights.push({
        type: 'success',
        message: `Experienced manager (${suitability.metrics_used.manager_tenure_years.toFixed(0)}+ years)`
      });
    }

    // Overall suitability
    if (suitability.final_score >= 60) {
      insights.push({
        type: 'success',
        message: `Well-suited for your profile (${suitability.final_score}/100)`
      });
    } else if (suitability.final_score < 40) {
      insights.push({
        type: 'warning',
        message: `Lower suitability score (${suitability.final_score}/100)`
      });
    }

    return insights.slice(0, 3);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          Individual Fund Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {funds.map((fund) => {
            const suitability = fund.suitability_score;
            const keyInsights = generateKeyInsights(fund);
            
            return (
              <Card key={fund.id} className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    
                    {/* Fund Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm">{fund.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {fund.category}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getRecommendationColor(fund.recommendation)}`}
                          >
                            {fund.recommendation}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(fund.currentValue)}</p>
                        <TrendIndicator 
                          value={fund.gainsPercentage}
                          size="sm"
                          className="text-xs"
                        />
                      </div>
                    </div>

                    {/* Suitability Score */}
                    {suitability && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Suitability Score</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getSuitabilityColor(suitability.final_score)}`}
                          >
                            {suitability.final_score}/100
                          </Badge>
                        </div>
                        <Progress 
                          value={suitability.final_score} 
                          className="h-2"
                        />
                        
                        {/* Key Metrics Row */}
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div className="text-center p-2 bg-background rounded">
                            <TrendingUp className="w-3 h-3 mx-auto mb-1 text-blue-600" />
                            <p className="font-medium">Performance</p>
                            <p className="text-muted-foreground">
                              {suitability.sub_scores.one_year_return.toFixed(0)}/100
                            </p>
                          </div>
                          
                          <div className="text-center p-2 bg-background rounded">
                            <DollarSign className="w-3 h-3 mx-auto mb-1 text-green-600" />
                            <p className="font-medium">Cost</p>
                            <p className="text-muted-foreground">
                              {suitability.sub_scores.expense_ratio.toFixed(0)}/100
                            </p>
                          </div>
                          
                          <div className="text-center p-2 bg-background rounded">
                            <Users className="w-3 h-3 mx-auto mb-1 text-purple-600" />
                            <p className="font-medium">Experience</p>
                            <p className="text-muted-foreground">
                              {suitability.sub_scores.manager_tenure.toFixed(0)}/100
                            </p>
                          </div>
                          
                          <div className="text-center p-2 bg-background rounded">
                            <Shield className="w-3 h-3 mx-auto mb-1 text-orange-600" />
                            <p className="font-medium">Scale</p>
                            <p className="text-muted-foreground">
                              {suitability.sub_scores.aum.toFixed(0)}/100
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Key Insights */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Key Insights</h5>
                      <div className="space-y-1">
                        {keyInsights.map((insight, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs">
                            {getInsightIcon(insight.type)}
                            <span className="text-muted-foreground">{insight.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Returns */}
                    <div className="flex items-center justify-between text-xs border-t pt-2">
                      <div className="flex gap-4">
                        <div>
                          <span className="text-muted-foreground">1Y: </span>
                          <span className="font-medium">{fund.returns['1Y']}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">3Y: </span>
                          <span className="font-medium">{fund.returns['3Y']}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">ER: </span>
                          <span className="font-medium">{fund.expenseRatio}%</span>
                        </div>
                      </div>
                      
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${fund.scheme.includes('Direct') 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        }`}
                      >
                        {fund.scheme.includes('Direct') ? 'Direct' : 'Regular'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimplifiedFundAnalysis;