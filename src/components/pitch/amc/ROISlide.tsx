import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ROISlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    buildInHouse: {
      cost: string;
      timeline: string;
      team: string;
      risk: string;
    };
    withDiscvr: {
      cost: string;
      timeline: string;
      team: string;
      risk: string;
    };
    savings: string[];
  };
}

export const ROISlide: React.FC<ROISlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-screen flex flex-col justify-center p-12 bg-gradient-to-br from-background to-muted/20">
      <div className="text-center mb-6">
        <IconComponent className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
        <p className="text-lg text-muted-foreground">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto mb-6">
        <Card className="border-2 border-destructive/30 bg-destructive/5">
          <CardContent className="p-5">
            <h3 className="text-xl font-bold mb-4 text-destructive">Build In-House</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Cost:</span>
                <p className="font-semibold text-base">{slide.buildInHouse.cost}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Timeline:</span>
                <p className="font-semibold">{slide.buildInHouse.timeline}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Team:</span>
                <p className="font-semibold">{slide.buildInHouse.team}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Risk:</span>
                <p className="font-semibold text-destructive">{slide.buildInHouse.risk}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-primary bg-primary/5">
          <CardContent className="p-5">
            <h3 className="text-xl font-bold mb-4 text-primary">With DISCVR</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Cost:</span>
                <p className="font-semibold text-base">{slide.withDiscvr.cost}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Timeline:</span>
                <p className="font-semibold">{slide.withDiscvr.timeline}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Team:</span>
                <p className="font-semibold">{slide.withDiscvr.team}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Risk:</span>
                <p className="font-semibold text-primary">{slide.withDiscvr.risk}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="max-w-4xl mx-auto border-2 border-primary">
        <CardContent className="p-4">
          <h4 className="font-bold mb-2 text-primary">Total Savings:</h4>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {slide.savings.map((saving, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>{saving}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
