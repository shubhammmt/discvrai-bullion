
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle } from 'lucide-react';

interface AIRiskAssessmentProps {
  personalizedInsights: any;
}

const AIRiskAssessment = ({ personalizedInsights }: AIRiskAssessmentProps) => {
  const riskValue = personalizedInsights.riskAssessment === 'Low' ? 30 : 
                   personalizedInsights.riskAssessment === 'Medium' ? 60 : 90;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          AI Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Overall Risk</span>
            <Badge variant="secondary">{personalizedInsights.riskAssessment}</Badge>
          </div>
          <Progress value={riskValue} className="h-2" />
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Key Risk Factors:</h4>
            {personalizedInsights.keyDrivers.map((factor: string, index: number) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-xs text-gray-600">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRiskAssessment;
