
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Brain, Sparkles, TrendingUp } from 'lucide-react';

interface AIPersonalizationMatchProps {
  personalizedInsights: any;
  userRiskProfile: string;
}

const AIPersonalizationMatch = ({ personalizedInsights, userRiskProfile }: AIPersonalizationMatchProps) => {
  return (
    <Card className="mb-8 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 border-0 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Target className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-2 border-white flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <h3 className="text-2xl font-bold text-gray-900">
                {personalizedInsights.matchScore}% Match for You
              </h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1">
                <Brain size={14} className="mr-1" />
                {personalizedInsights.aiConfidence}% AI Confidence
              </Badge>
              <Badge variant="outline" className="bg-white/50 border-purple-200 text-purple-700 px-3 py-1">
                {userRiskProfile} Risk Profile
              </Badge>
            </div>
            
            <Progress 
              value={personalizedInsights.matchScore} 
              className="h-3 mb-4 bg-white/50" 
            />
            
            <p className="text-gray-700 mb-2 leading-relaxed">{personalizedInsights.suitabilityReason}</p>
            <p className="text-sm text-blue-700 font-medium bg-blue-100/50 rounded-lg px-3 py-2 inline-block">
              💡 {personalizedInsights.recommendation}
            </p>
          </div>
          
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg px-6 py-3 h-auto">
            <Brain size={18} className="mr-2" />
            <div className="text-left">
              <div className="font-semibold">Ask AI Assistant</div>
              <div className="text-xs opacity-90">Get personalized insights</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIPersonalizationMatch;
