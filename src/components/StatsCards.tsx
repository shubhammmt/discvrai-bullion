
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Target, Zap } from 'lucide-react';

interface StatsCardsProps {
  isEnglish: boolean;
}

const StatsCards = ({ isEnglish }: StatsCardsProps) => {
  const stats = {
    hindi: [
      { icon: TrendingUp, label: "रिटर्न", value: "12.8%", change: "+0.3%", color: "text-emerald-600", bgColor: "bg-emerald-100", borderColor: "border-emerald-200" },
      { icon: Users, label: "यूजर्स", value: "50K+", change: "+15%", color: "text-blue-600", bgColor: "bg-blue-100", borderColor: "border-blue-200" },
      { icon: Target, label: "गोल पूरे", value: "89%", change: "+5%", color: "text-purple-600", bgColor: "bg-purple-100", borderColor: "border-purple-200" },
      { icon: Zap, label: "AI सुझाव", value: "1000+", change: "+25%", color: "text-amber-600", bgColor: "bg-amber-100", borderColor: "border-amber-200" }
    ],
    english: [
      { icon: TrendingUp, label: "Avg Returns", value: "12.8%", change: "+0.3%", color: "text-emerald-600", bgColor: "bg-emerald-100", borderColor: "border-emerald-200" },
      { icon: Users, label: "Active Users", value: "50K+", change: "+15%", color: "text-blue-600", bgColor: "bg-blue-100", borderColor: "border-blue-200" },
      { icon: Target, label: "Goals Met", value: "89%", change: "+5%", color: "text-purple-600", bgColor: "bg-purple-100", borderColor: "border-purple-200" },
      { icon: Zap, label: "AI Insights", value: "1000+", change: "+25%", color: "text-amber-600", bgColor: "bg-amber-100", borderColor: "border-amber-200" }
    ]
  };

  const currentStats = isEnglish ? stats.english : stats.hindi;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {currentStats.map((stat, index) => (
        <Card key={index} className={`bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 ${stat.borderColor}`}>
          <CardContent className="p-4 text-center">
            <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center mx-auto mb-3 shadow-sm`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
            <div className={`text-xs font-semibold ${stat.color} bg-white px-2 py-1 rounded-full border ${stat.borderColor}`}>
              {stat.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
