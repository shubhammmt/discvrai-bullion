
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Target, Zap } from 'lucide-react';

interface StatsCardsProps {
  isEnglish: boolean;
}

const StatsCards = ({ isEnglish }: StatsCardsProps) => {
  const stats = {
    hindi: [
      { icon: TrendingUp, label: "रिटर्न", value: "12.8%", change: "+0.3%", color: "text-green-600" },
      { icon: Users, label: "यूजर्स", value: "50K+", change: "+15%", color: "text-blue-600" },
      { icon: Target, label: "गोल पूरे", value: "89%", change: "+5%", color: "text-purple-600" },
      { icon: Zap, label: "AI सुझाव", value: "1000+", change: "+25%", color: "text-orange-600" }
    ],
    english: [
      { icon: TrendingUp, label: "Avg Returns", value: "12.8%", change: "+0.3%", color: "text-green-600" },
      { icon: Users, label: "Active Users", value: "50K+", change: "+15%", color: "text-blue-600" },
      { icon: Target, label: "Goals Met", value: "89%", change: "+5%", color: "text-purple-600" },
      { icon: Zap, label: "AI Insights", value: "1000+", change: "+25%", color: "text-orange-600" }
    ]
  };

  const currentStats = isEnglish ? stats.english : stats.hindi;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {currentStats.map((stat, index) => (
        <Card key={index} className="bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className={`text-xs ${stat.color}`}>{stat.change}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
