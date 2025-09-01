import React from 'react';
import { Brain, Users, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HumanAISolutionSlideProps {
  slide: {
    title: string;
    subtitle: string;
    solutionData: {
      coreConcept: string;
      keyDifferentiator: string;
      simpleStart: string;
      threeLayers: Array<{
        layer: string;
        description: string;
        components: string[];
      }>;
      flowDiagram: {
        userJourney: string;
        dataFlow: string;
      };
      valueProposition: string[];
    };
  };
}

export const HumanAISolutionSlide: React.FC<HumanAISolutionSlideProps> = ({ slide }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Brain className="w-12 h-12 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">{slide.title}</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">{slide.subtitle}</p>
      </div>

      {/* Core Concept */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">{slide.solutionData.coreConcept}</h3>
            <p className="text-lg text-primary font-medium">"{slide.solutionData.keyDifferentiator}"</p>
            <p className="text-base text-muted-foreground italic">{slide.solutionData.simpleStart}</p>
          </div>
        </CardContent>
      </Card>

      {/* Three Layers Architecture */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-center text-foreground">Three-Layer Intelligence Architecture</h3>
        <div className="grid lg:grid-cols-3 gap-6">
          {slide.solutionData.threeLayers.map((layer, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow relative">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {index + 1}
                  </Badge>
                  <h4 className="text-lg font-semibold text-foreground">{layer.layer}</h4>
                </div>
                <p className="text-base text-muted-foreground mb-4">{layer.description}</p>
                <ul className="space-y-2">
                  {layer.components.map((component, compIndex) => (
                    <li key={compIndex} className="text-sm text-foreground flex items-start">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      {component}
                    </li>
                  ))}
                </ul>
              </CardContent>
              {index < slide.solutionData.threeLayers.length - 1 && (
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden lg:block">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-primary bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-primary" />
              <h4 className="text-lg font-semibold text-foreground">User Journey</h4>
            </div>
            <p className="text-base text-foreground font-mono bg-background/50 p-3 rounded border">
              {slide.solutionData.flowDiagram.userJourney}
            </p>
          </CardContent>
        </Card>

        <Card className="border-secondary bg-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-8 h-8 text-secondary" />
              <h4 className="text-lg font-semibold text-foreground">Data Flow</h4>
            </div>
            <p className="text-base text-foreground font-mono bg-background/50 p-3 rounded border">
              {slide.solutionData.flowDiagram.dataFlow}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Value Proposition */}
      <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
        <CardContent className="p-6">
          <h4 className="text-xl font-semibold text-foreground mb-4 text-center">Our Value Proposition</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {slide.solutionData.valueProposition.map((prop, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-base text-foreground">{prop}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};