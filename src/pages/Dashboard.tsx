
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Plus, Bell, ArrowRight, Wallet, CreditCard, Building, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PortfolioOverview from '@/components/dashboard/PortfolioOverview';
import PaymentReminders from '@/components/dashboard/PaymentReminders';
import AIInsights from '@/components/dashboard/AIInsights';
import AccountLinking from '@/components/dashboard/AccountLinking';

const Dashboard = () => {
  const navigate = useNavigate();
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const quickActions = [
    { icon: Plus, label: 'Link Account', action: 'link-account', color: 'bg-blue-600' },
    { icon: TrendingUp, label: 'Rebalance', action: 'rebalance', color: 'bg-green-600' },
    { icon: Bell, label: 'Set Alert', action: 'alert', color: 'bg-orange-600' },
    { icon: Wallet, label: 'Add Investment', action: 'invest', color: 'bg-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userProfile.name || 'Investor'}!</h1>
          <p className="text-gray-600">Here's your personalized financial dashboard</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-20 flex-col gap-2 ${action.color} text-white border-none`}
            >
              <action.icon size={20} />
              <span className="text-sm">{action.label}</span>
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <PortfolioOverview />
            <PaymentReminders />
            <AIInsights />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AccountLinking />
            
            {/* Market Quick View */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Market Pulse</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Nifty 50</span>
                    <span className="text-sm font-bold text-green-600">+1.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Your Portfolio</span>
                    <span className="text-sm font-bold text-blue-600">+2.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
