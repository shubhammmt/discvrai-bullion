
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MessageCircle, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PortfolioOverview from '@/components/dashboard/PortfolioOverview';
import PaymentReminders from '@/components/dashboard/PaymentReminders';
import AccountLinking from '@/components/dashboard/AccountLinking';
import AIInsights from '@/components/dashboard/AIInsights';
import HealthScoreCard from '@/components/HealthScoreCard';
import { HealthScoreData } from '@/utils/healthScore';
import FinanceCopilot from '@/components/FinanceCopilot';

const Dashboard = () => {
  const navigate = useNavigate();
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [healthScore, setHealthScore] = useState<HealthScoreData | null>(null);

  useEffect(() => {
    const savedScore = localStorage.getItem('healthScore');
    if (savedScore) {
      setHealthScore(JSON.parse(savedScore));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-xl font-semibold">Dashboard</h1>
          
          <Button 
            onClick={() => setCopilotOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Ask AI
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Health Score and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {healthScore ? (
            <>
              <div className="lg:col-span-1">
                <HealthScoreCard score={healthScore} />
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate('/health-dashboard')}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Full Health Report
                </Button>
              </div>
              <div className="lg:col-span-3">
                <AIInsights />
              </div>
            </>
          ) : (
            <div className="lg:col-span-4">
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-6 text-center">
                  <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Get Your Financial Health Score</h3>
                  <p className="text-gray-600 mb-4">
                    Complete a 2-minute assessment to get personalized insights
                  </p>
                  <Button onClick={() => setCopilotOpen(true)}>
                    Start Assessment
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioOverview />
          <PaymentReminders />
        </div>

        <AccountLinking />
      </div>

      {/* AI Copilot */}
      <FinanceCopilot 
        isOpen={copilotOpen} 
        onToggle={setCopilotOpen}
      />
    </div>
  );
};

export default Dashboard;
