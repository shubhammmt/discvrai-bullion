import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SRCCValuePropositionSlideProps {
  slide: any;
}

export const SRCCValuePropositionSlide: React.FC<SRCCValuePropositionSlideProps> = ({ slide }) => {
  const { valueProps, stats } = slide;

  return (
    <div className="w-full h-full flex flex-col justify-center space-y-8 p-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <slide.icon className="h-12 w-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-primary">{slide.title}</h1>
            <p className="text-xl text-muted-foreground mt-2">{slide.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Immediate Benefits */}
        <Card className="h-full">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <span className="text-3xl">⚡</span>
              Immediate Benefits (Day 1)
            </h3>
            <div className="space-y-4">
              {valueProps.immediate.map((item: any, index: number) => (
                <div key={index} className="border-l-4 border-primary pl-4 space-y-2">
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">{item.value}</Badge>
                    <span className="text-sm text-green-600 font-medium">{item.timeline}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strategic Benefits */}
        <Card className="h-full">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <span className="text-3xl">🎯</span>
              Strategic Advantages
            </h3>
            <div className="space-y-4">
              {valueProps.strategic.map((item: any, index: number) => (
                <div key={index} className="border-l-4 border-secondary pl-4 space-y-2">
                  <h4 className="font-bold text-lg">{item.benefit}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                  <p className="text-primary font-medium text-sm">{item.impact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Stats */}
      <Card className="bg-primary/5">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-center mb-4">Program Summary</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{stats.targetUsers}</div>
              <div className="text-sm text-muted-foreground">Target Students</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.expectedAdoption}</div>
              <div className="text-sm text-muted-foreground">Expected Adoption</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.costPerStudent}</div>
              <div className="text-sm text-muted-foreground">Cost Per Student</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.totalValue}</div>
              <div className="text-sm text-muted-foreground">Total Program Value</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};