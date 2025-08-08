import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface RiskAnalysisSlideProps {
  slide: any;
}

export const RiskAnalysisSlide: React.FC<RiskAnalysisSlideProps> = ({ slide }) => {
  const { title, subtitle, icon: Icon, risks, overallRiskProfile, keyStrengths } = slide;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const getProbabilityValue = (probability: string) => {
    switch (probability) {
      case 'High': return 80;
      case 'Medium': return 50;
      case 'Low': return 20;
      default: return 0;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Icon className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-foreground">{title}</h1>
            <p className="text-xl text-muted-foreground mt-2">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Risk Analysis Grid */}
      <div className="grid gap-6">
        {risks.map((risk: any, index: number) => (
          <Card key={index} className="border-l-4 border-l-orange-400">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{risk.risk}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant={getSeverityColor(risk.severity)}>{risk.severity}</Badge>
                  <Badge variant="outline">{risk.timeline}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">Probability: {risk.probability}</p>
                  <Progress value={getProbabilityValue(risk.probability)} className="h-2" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Impact</p>
                <p className="text-sm">{risk.impact}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-green-600 mb-2">Mitigation Strategies</p>
                <ul className="space-y-1">
                  {risk.mitigation.map((strategy: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 text-xs">✓</span>
                      <span>{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overall Assessment */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Risk Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">{overallRiskProfile}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Risk Mitigation Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {keyStrengths.map((strength: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};