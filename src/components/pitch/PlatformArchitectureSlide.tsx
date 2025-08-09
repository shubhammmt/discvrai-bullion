import React from 'react';
import { Building2, Brain, Target, DollarSign, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PlatformArchitectureSlideProps {
  slide: {
    title: string;
    subtitle: string;
    platformLayers: {
      distribution: { title: string; channels: string[] };
      touchpoints: { title: string; channels: string[] };
      monetization: { title: string; streams: Array<{ type: string; description: string }> };
      useCases: { title: string; cases: string[] };
      intelligence: { title: string; description: string };
      dataEngine: { title: string; parameters: string[] };
      products: { title: string; categories: string[] };
      foundation: { title: string; description: string };
      engagement: { title: string; hooks: string[] };
    };
  };
}

export const PlatformArchitectureSlide: React.FC<PlatformArchitectureSlideProps> = ({ slide }) => {
  const { platformLayers } = slide;

  return (
    <div className="h-full bg-gradient-to-br from-background to-background/80 p-8 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Building2 className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {slide.title}
          </h1>
        </div>
        <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
      </div>

      {/* Platform Stack Grid */}
      <div className="flex-1 grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Distribution */}
          <Card className="h-fit">
            <CardContent className="p-4">
              <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {platformLayers.distribution.title}
              </h3>
              <div className="space-y-2">
                {platformLayers.distribution.channels.map((channel, idx) => (
                  <Badge key={idx} variant="secondary" className="mr-2 mb-1">
                    {channel}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Touchpoints */}
          <Card className="h-fit">
            <CardContent className="p-4">
              <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                {platformLayers.touchpoints.title}
              </h3>
              <div className="space-y-2">
                {platformLayers.touchpoints.channels.map((channel, idx) => (
                  <Badge key={idx} variant="outline" className="mr-2 mb-1">
                    {channel}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monetization */}
          <Card className="h-fit">
            <CardContent className="p-4">
              <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                {platformLayers.monetization.title}
              </h3>
              <div className="space-y-2">
                {platformLayers.monetization.streams.map((stream, idx) => (
                  <div key={idx} className="text-sm">
                    <Badge variant="default" className="mr-2 mb-1">
                      {stream.type}
                    </Badge>
                    <span className="text-muted-foreground">{stream.description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column */}
        <div className="space-y-4">
          {/* Use Cases */}
          <Card className="h-fit">
            <CardContent className="p-4">
              <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                {platformLayers.useCases.title}
              </h3>
              <div className="space-y-1">
                {platformLayers.useCases.cases.map((useCase, idx) => (
                  <div key={idx} className="text-sm font-medium">
                    • {useCase}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Intelligence Layer */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Brain className="h-4 w-4" />
                {platformLayers.intelligence.title}
              </h3>
              <p className="text-sm font-medium text-center">
                {platformLayers.intelligence.description}
              </p>
            </CardContent>
          </Card>

          {/* Dynamic Parameters */}
          <Card className="h-fit">
            <CardContent className="p-4">
              <h3 className="font-semibold text-primary mb-3">
                {platformLayers.dataEngine.title}
              </h3>
              <div className="grid grid-cols-2 gap-1">
                {platformLayers.dataEngine.parameters.map((param, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {param}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Products */}
          <Card className="h-fit">
            <CardContent className="p-4">
              <h3 className="font-semibold text-primary mb-3">
                {platformLayers.products.title}
              </h3>
              <div className="grid grid-cols-2 gap-1">
                {platformLayers.products.categories.map((product, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {product}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Foundation */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <h3 className="font-semibold text-primary mb-3">
                {platformLayers.foundation.title}
              </h3>
              <p className="text-sm font-medium text-center">
                {platformLayers.foundation.description}
              </p>
            </CardContent>
          </Card>

          {/* Engagement */}
          <Card className="h-fit">
            <CardContent className="p-4">
              <h3 className="font-semibold text-primary mb-3">
                {platformLayers.engagement.title}
              </h3>
              <div className="space-y-2">
                {platformLayers.engagement.hooks.map((hook, idx) => (
                  <Badge key={idx} variant="default" className="mr-2 mb-1">
                    {hook}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};