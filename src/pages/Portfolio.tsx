import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, TrendingUp, Eye, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HealthScoreCard from '@/components/HealthScoreCard';
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

  const portfolioData = {
    totalValue: 245000,
    totalGains: 15600,
    gainsPercent: 6.8,
    holdings: [
      { name: 'HDFC Top 100', value: 85000, gains: 8500, type: 'Mutual Fund' },
      { name: 'ICICI Bank', value: 45000, gains: 2100, type: 'Stock' },
      { name: 'Government Bond 2030', value: 50000, gains: 1200, type: 'Bond' },
      { name: 'HDFC FD', value: 65000, gains: 3800, type: 'FD' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-xl font-semibold">Portfolio</h1>
          
          <Button onClick={() => navigate('/portfolio/update')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Investment
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Health Score Section */}
        {healthScore && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <HealthScoreCard score={healthScore} />
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/health-dashboard')}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  View Full Health Report
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {/* Portfolio Overview will go here */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Your portfolio performance data will be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* If no health score, show prompt */}
        {!healthScore && (
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Complete Your Financial Health Assessment</h3>
              <p className="text-gray-600 mb-4">
                Get personalized portfolio recommendations based on your financial health score
              </p>
              <Button onClick={() => navigate('/health-dashboard')}>
                Start Health Assessment
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Rest of portfolio content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio holdings, charts, etc. */}
          <Card>
            <CardHeader>
              <CardTitle>Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Your investment holdings will be displayed here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
