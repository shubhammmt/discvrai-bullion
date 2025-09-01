import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, TrendingDown, Users, IndianRupee } from 'lucide-react';

interface CredibleInformationCrisisSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    marketData: {
      hook: string;
      scale: string;
      coreProblem: string;
      validationPoints: Array<{
        category: string;
        data: string;
        insight: string;
      }>;
      marketEvidence: string;
      emotionalImpact: string;
    };
  };
}

export const CredibleInformationCrisisSlideV2: React.FC<CredibleInformationCrisisSlideProps> = ({ slide }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          {React.createElement(slide.icon, { className: "h-12 w-12 text-primary" })}
        </div>
        <h1 className="text-4xl font-bold text-foreground">{slide.title}</h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">{slide.subtitle}</p>
      </div>

      {/* Hook & Scale */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingDown className="h-8 w-8 text-destructive" />
              <h3 className="text-2xl font-bold text-destructive">Market Disaster</h3>
            </div>
            <p className="text-lg font-semibold mb-2">{slide.marketData.hook}</p>
            <p className="text-base text-muted-foreground">{slide.marketData.scale}</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-500/10 border-orange-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <IndianRupee className="h-8 w-8 text-orange-500" />
              <h3 className="text-2xl font-bold text-orange-500">Financial Impact</h3>
            </div>
            <p className="text-lg font-semibold mb-2">{slide.marketData.marketEvidence}</p>
            <p className="text-base text-muted-foreground">Per retail trader average loss</p>
          </CardContent>
        </Card>
      </div>

      {/* Core Problem */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <h3 className="text-2xl font-bold">The Root Cause</h3>
          </div>
          <p className="text-xl font-semibold text-center mb-6">{slide.marketData.coreProblem}</p>
          
          {/* Validation Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.marketData.validationPoints.map((point, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                  <h4 className="font-semibold text-sm text-primary">{point.category}</h4>
                </div>
                <p className="text-base font-medium mb-1">{point.data}</p>
                <p className="text-sm text-muted-foreground">{point.insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emotional Impact */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-8 w-8 text-blue-500" />
            <h3 className="text-2xl font-bold text-blue-500">The Human Cost</h3>
          </div>
          <blockquote className="text-2xl font-semibold text-center italic">
            "{slide.marketData.emotionalImpact}"
          </blockquote>
        </CardContent>
      </Card>
    </div>
  );
};

