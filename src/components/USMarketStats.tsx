
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, DollarSign, BarChart3, Target, Zap, Shield } from 'lucide-react';

const USMarketStats = () => {
  const stats = [
    { 
      icon: TrendingUp, 
      label: "S&P 500 YTD", 
      value: "+24.8%", 
      change: "+1.2%", 
      color: "text-emerald-600", 
      bgColor: "bg-emerald-50", 
      borderColor: "border-emerald-200",
      subtext: "Above historical avg"
    },
    { 
      icon: DollarSign, 
      label: "Portfolio Value", 
      value: "$2.4M", 
      change: "+$127K", 
      color: "text-blue-600", 
      bgColor: "bg-blue-50", 
      borderColor: "border-blue-200",
      subtext: "30-day gain"
    },
    { 
      icon: BarChart3, 
      label: "Sharpe Ratio", 
      value: "1.42", 
      change: "+0.08", 
      color: "text-purple-600", 
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200",
      subtext: "Risk-adjusted return"
    },
    { 
      icon: Target, 
      label: "Alpha", 
      value: "2.8%", 
      change: "+0.4%", 
      color: "text-amber-600", 
      bgColor: "bg-amber-50", 
      borderColor: "border-amber-200",
      subtext: "Outperforming market"
    },
    { 
      icon: Shield, 
      label: "Beta", 
      value: "0.85", 
      change: "-0.02", 
      color: "text-teal-600", 
      bgColor: "bg-teal-50", 
      borderColor: "border-teal-200",
      subtext: "Lower volatility"
    },
    { 
      icon: Zap, 
      label: "Options Premium", 
      value: "$18.5K", 
      change: "+$2.1K", 
      color: "text-indigo-600", 
      bgColor: "bg-indigo-50", 
      borderColor: "border-indigo-200",
      subtext: "Monthly income"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className={`bg-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border ${stat.borderColor} relative overflow-hidden`}>
          <div className={`absolute top-0 left-0 w-full h-1 ${stat.bgColor.replace('bg-', 'bg-gradient-to-r from-')}`} />
          <CardContent className="p-4">
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-lg font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-xs text-gray-600 mb-2 font-medium">{stat.label}</div>
            <div className="flex items-center justify-between">
              <div className={`text-xs font-semibold ${stat.color}`}>
                {stat.change}
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">{stat.subtext}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default USMarketStats;
