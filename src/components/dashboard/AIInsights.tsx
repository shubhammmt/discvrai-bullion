
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Shield, Target, ArrowRight } from 'lucide-react';

const AIInsights = () => {
  const insights = [
    {
      icon: TrendingUp,
      title: 'Rebalancing Opportunity',
      message: 'Your equity allocation is 75%. Consider moving 10% to debt for better risk management.',
      action: 'Rebalance Now',
      priority: 'high'
    },
    {
      icon: Target,
      title: 'Goal Achievement',
      message: 'You\'re on track to achieve your house purchase goal by 2026. Keep up the SIPs!',
      action: 'View Progress',
      priority: 'positive'
    },
    {
      icon: Shield,
      title: 'Insurance Gap',
      message: 'Your life cover is 8x your annual income. Consider increasing to 10x for better protection.',
      action: 'Explore Plans',
      priority: 'medium'
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain size={20} className="text-blue-600" />
          DiscvrAI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="bg-white/70 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <insight.icon size={20} className={
                  insight.priority === 'high' ? 'text-red-600' :
                  insight.priority === 'positive' ? 'text-green-600' :
                  'text-blue-600'
                } />
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{insight.message}</p>
                  <Button size="sm" variant="outline">
                    {insight.action} <ArrowRight size={12} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
