import React from 'react';
import { Building2, Brain, Target, DollarSign, Users, TrendingUp, Layers, Zap, Eye, BarChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PlatformArchitectureSlideProps {
  slide: {
    title: string;
    subtitle: string;
    platformLayers: {
      distribution: { title: string; channels: string[] };
      channels: { title: string; items: string[] };
      monetization: { title: string; streams: string[] };
      hooks: { title: string; items: string[] };
      useCases: { title: string; cases: string[] };
      insights: { title: string; description: string };
      dynamicParams: { title: string; parameters: string[] };
      products: { title: string; categories: string[] };
      userdata: { title: string; description: string };
    };
  };
}

export const PlatformArchitectureSlide: React.FC<PlatformArchitectureSlideProps> = ({ slide }) => {
  const { platformLayers } = slide;

  const stackLayers = [
    { 
      layer: platformLayers.distribution, 
      icon: TrendingUp, 
      color: 'bg-blue-50 border-blue-200 dark:bg-blue-950/20', 
      data: platformLayers.distribution.channels 
    },
    { 
      layer: platformLayers.channels, 
      icon: Target, 
      color: 'bg-green-50 border-green-200 dark:bg-green-950/20', 
      data: platformLayers.channels.items 
    },
    { 
      layer: platformLayers.monetization, 
      icon: DollarSign, 
      color: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20', 
      data: platformLayers.monetization.streams 
    },
    { 
      layer: platformLayers.hooks, 
      icon: Zap, 
      color: 'bg-purple-50 border-purple-200 dark:bg-purple-950/20', 
      data: platformLayers.hooks.items 
    },
    { 
      layer: platformLayers.useCases, 
      icon: Users, 
      color: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20', 
      data: platformLayers.useCases.cases 
    },
    { 
      layer: platformLayers.insights, 
      icon: Brain, 
      color: 'bg-pink-50 border-pink-200 dark:bg-pink-950/20', 
      data: [platformLayers.insights.description] 
    },
    { 
      layer: platformLayers.dynamicParams, 
      icon: BarChart, 
      color: 'bg-cyan-50 border-cyan-200 dark:bg-cyan-950/20', 
      data: platformLayers.dynamicParams.parameters 
    },
    { 
      layer: platformLayers.products, 
      icon: Layers, 
      color: 'bg-orange-50 border-orange-200 dark:bg-orange-950/20', 
      data: platformLayers.products.categories 
    },
    { 
      layer: platformLayers.userdata, 
      icon: Building2, 
      color: 'bg-red-50 border-red-200 dark:bg-red-950/20', 
      data: [platformLayers.userdata.description] 
    }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-background to-background/80 p-6 flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Building2 className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {slide.title}
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">{slide.subtitle}</p>
      </div>

      {/* Layered Stack */}
      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 gap-3">
          {stackLayers.map((stack, idx) => {
            const IconComponent = stack.icon;
            return (
              <Card key={idx} className={`${stack.color} transition-all hover:shadow-md border-2`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground mb-3 text-lg">
                        {stack.layer.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {stack.data.map((item, itemIdx) => (
                          <Badge 
                            key={itemIdx} 
                            variant={idx % 2 === 0 ? "default" : "secondary"} 
                            className="text-sm px-3 py-1"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};