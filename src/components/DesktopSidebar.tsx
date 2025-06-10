
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Brain, Bell, Target, ArrowRight, Zap, Shield, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DesktopSidebarProps {
  userProfile: any;
}

const DesktopSidebar = ({ userProfile }: DesktopSidebarProps) => {
  const navigate = useNavigate();

  const quickActions = [
    { icon: TrendingUp, label: 'Market Overview', path: '/research' },
    { icon: Target, label: 'Portfolio Analysis', path: '/portfolio' },
    { icon: Bell, label: 'Set Alerts', path: '/organize' },
    { icon: Brain, label: 'AI Strategy', path: '/ai-strategy' }
  ];

  const marketInsights = [
    { title: 'Nifty 50', value: '22,150', change: '+1.2%', positive: true },
    { title: 'Sensex', value: '73,248', change: '+0.8%', positive: true },
    { title: 'Bank Nifty', value: '47,850', change: '-0.5%', positive: false },
    { title: 'USD/INR', value: '83.25', change: '+0.1%', positive: false }
  ];

  const vegaInsights = [
    {
      icon: Zap,
      title: 'Market Momentum',
      insight: 'Tech stocks showing strong bullish signals. Consider increasing exposure.',
      action: 'Explore Tech Funds'
    },
    {
      icon: Shield,
      title: 'Risk Alert',
      insight: 'High volatility expected this week. Review stop-loss levels.',
      action: 'Check Portfolio'
    },
    {
      icon: DollarSign,
      title: 'Opportunity',
      insight: 'Banking stocks at attractive valuations. Good entry point for long-term.',
      action: 'View Recommendations'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => navigate(action.path)}
                className="w-full justify-start"
              >
                <action.icon size={16} className="mr-2" />
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp size={18} />
            Market Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marketInsights.map((market, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium">{market.title}</span>
                <div className="text-right">
                  <div className="text-sm font-bold">{market.value}</div>
                  <div className={`text-xs ${market.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {market.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vega AI Insights */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain size={18} className="text-blue-600" />
            Vega AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vegaInsights.map((insight, index) => (
              <div key={index} className="bg-white/70 p-3 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <insight.icon size={16} className="text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{insight.insight}</p>
                    <Button size="sm" variant="outline" className="text-xs">
                      {insight.action} <ArrowRight size={12} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Completeness */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profile Completeness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Overall Progress</span>
              <span className="text-sm font-bold">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full w-3/4"></div>
            </div>
            <Button 
              onClick={() => navigate('/onboarding')}
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              Complete Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DesktopSidebar;
