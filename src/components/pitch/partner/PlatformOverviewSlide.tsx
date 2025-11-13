import React from 'react';
import { Card } from '@/components/ui/card';

interface PlatformOverviewSlideProps {
  slide: any;
}

export const PlatformOverviewSlide: React.FC<PlatformOverviewSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 p-12 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <IconComponent className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h1 className="text-4xl font-bold text-foreground mb-2">{slide.title}</h1>
        <p className="text-lg text-muted-foreground">{slide.subtitle}</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {slide.metrics.map((metric: any, index: number) => (
          <Card key={index} className="p-4 text-center bg-card/80 backdrop-blur">
            <div className="text-3xl font-bold text-primary mb-1">{metric.value}</div>
            <div className="text-sm font-semibold text-foreground mb-1">{metric.label}</div>
            <div className="text-xs text-muted-foreground">{metric.subtext}</div>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6 flex-1">
        {/* Left: Audience Profile */}
        <Card className="p-6 bg-card/80 backdrop-blur">
          <h3 className="text-xl font-bold text-foreground mb-4">{slide.audienceProfile.title}</h3>
          <div className="space-y-3">
            {slide.audienceProfile.segments.map((seg: any, index: number) => (
              <div key={index} className="border-l-4 border-primary pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-foreground text-sm">{seg.segment}</span>
                  <span className="text-primary font-bold text-sm">{seg.size}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {seg.traits.map((trait: string, i: number) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Ecosystem */}
        <Card className="p-6 bg-card/80 backdrop-blur">
          <h3 className="text-xl font-bold text-foreground mb-4">{slide.ecosystem.title}</h3>
          <ul className="space-y-2">
            {slide.ecosystem.points.map((point: string, index: number) => (
              <li key={index} className="flex items-start text-sm">
                <span className="text-primary mr-2 mt-0.5">✓</span>
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Bottom Line */}
      <div className="mt-6 text-center">
        <p className="text-base font-semibold text-primary italic">
          {slide.bottomLine}
        </p>
      </div>
    </div>
  );
};
