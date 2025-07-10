
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Brain } from 'lucide-react';

interface AIPersonalizationMatchProps {
  personalizedInsights: any;
  userRiskProfile: string;
}

const AIPersonalizationMatch = ({ personalizedInsights, userRiskProfile }: AIPersonalizationMatchProps) => {
  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900">
                {personalizedInsights.matchScore}% Match for You
              </h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {personalizedInsights.aiConfidence}% AI Confidence
              </Badge>
              <Badge variant="outline">
                {userRiskProfile} Risk Profile
              </Badge>
            </div>
            <p className="text-gray-700 mb-2">{personalizedInsights.suitabilityReason}</p>
            <p className="text-sm text-blue-600 font-medium">{personalizedInsights.recommendation}</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Brain size={16} className="mr-2" />
            Ask AI Assistant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIPersonalizationMatch;
