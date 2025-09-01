import React from 'react';
import { AlertTriangle, TrendingDown, Users, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CredibleInformationCrisisSlideProps {
  slide: {
    title: string;
    subtitle: string;
    problemData: {
      hook: string;
      scale: string;
      coreIssue: string;
      quantifiedPain: {
        averageLoss: string;
        totalLoss: string;
        trustCrisis: string;
      };
      painPoints: Array<{
        category: string;
        severity: string;
        stats: string[];
      }>;
      currentSolutionGaps: string[];
      emotionalImpact: string;
    };
  };
}

export const CredibleInformationCrisisSlide: React.FC<CredibleInformationCrisisSlideProps> = ({ slide }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <AlertTriangle className="w-12 h-12 text-destructive" />
          <h1 className="text-4xl font-bold text-foreground">{slide.title}</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">{slide.subtitle}</p>
      </div>

      {/* Hook and Scale */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingDown className="w-8 h-8 text-destructive" />
              <h3 className="text-xl font-semibold text-foreground">Market Reality</h3>
            </div>
            <p className="text-lg font-medium text-destructive mb-2">{slide.problemData.hook}</p>
            <p className="text-base text-muted-foreground">{slide.problemData.scale}</p>
          </CardContent>
        </Card>

        <Card className="border-primary bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Core Problem</h3>
            </div>
            <p className="text-lg font-medium text-foreground mb-2">{slide.problemData.coreIssue}</p>
            <p className="text-base text-muted-foreground">{slide.problemData.quantifiedPain.trustCrisis}</p>
          </CardContent>
        </Card>
      </div>

      {/* Pain Points */}
      <div className="grid lg:grid-cols-3 gap-6">
        {slide.problemData.painPoints.map((point, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-foreground">{point.category}</h4>
                <Badge variant={point.severity === 'Critical' ? 'destructive' : 'secondary'}>
                  {point.severity}
                </Badge>
              </div>
              <ul className="space-y-2">
                {point.stats.map((stat, statIndex) => (
                  <li key={statIndex} className="text-sm text-muted-foreground flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-3 flex-shrink-0" />
                    {stat}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quantified Impact */}
      <Card className="bg-gradient-to-r from-destructive/10 to-orange-500/10 border-destructive/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="w-8 h-8 text-destructive" />
            <h3 className="text-xl font-semibold text-foreground">The Human Cost</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold text-destructive">{slide.problemData.quantifiedPain.totalLoss}</p>
              <p className="text-sm text-muted-foreground">Total collective loss</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">{slide.problemData.quantifiedPain.averageLoss}</p>
              <p className="text-sm text-muted-foreground">Average loss per trader</p>
            </div>
          </div>
          <p className="text-base text-foreground mt-4 italic">"{slide.problemData.emotionalImpact}"</p>
        </CardContent>
      </Card>
    </div>
  );
};