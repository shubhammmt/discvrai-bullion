
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Bell, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DesktopSidebarProps {
  userProfile: any;
}

const DesktopSidebar = ({ userProfile }: DesktopSidebarProps) => {
  const navigate = useNavigate();

  const quickActions = [
    { icon: TrendingUp, label: 'Market Overview', path: '/research' },
    { icon: Target, label: 'Portfolio Analysis', path: '/portfolio' },
    { icon: Bell, label: 'Set Alerts', path: '/organize' }
  ];

  const marketInsights = [
    { title: 'Nifty 50', value: '22,150', change: '+1.2%', positive: true },
    { title: 'Sensex', value: '73,248', change: '+0.8%', positive: true },
    { title: 'Bank Nifty', value: '47,850', change: '-0.5%', positive: false },
    { title: 'USD/INR', value: '83.25', change: '+0.1%', positive: false }
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
                size="sm"
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
    </div>
  );
};

export default DesktopSidebar;
