import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, ArrowRight } from 'lucide-react';

interface UseOfProceedsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
  };
}

export const UseOfProceedsSlide: React.FC<UseOfProceedsSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  const timeline = [
    {
      phase: 'Past',
      period: 'FY24–FY25',
      highlights: [
        'Product architecture, data integrations, content foundation',
        'Initial organic growth and user traction (0→170K cumulative users)'
      ],
      color: 'text-muted-foreground',
      bgColor: 'bg-secondary/30'
    },
    {
      phase: 'Now',
      period: 'FY26–FY27',
      highlights: [
        'Team expansion across content, tech, and marketing',
        'Strengthening brand visibility and user acquisition engine',
        'API partnerships for insurance, credit, and investment products'
      ],
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      phase: 'Future',
      period: 'FY28–FY30',
      highlights: [
        'National-scale distribution and monetization across LAMF, gold, and credit lines',
        'Launch of premium and B2B offerings',
        'AI-driven personalization and analytics platform for retail investors'
      ],
      color: 'text-foreground',
      bgColor: 'bg-secondary/50'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-4xl font-bold text-foreground mb-2">{slide.title}</h2>
        <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
      </div>

      {/* Timeline */}
      <div>
        <div className="flex items-center gap-2 mb-4 justify-center">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-2xl font-bold text-foreground">Journey Timeline</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {timeline.map((phase, index) => (
            <div key={index} className="relative">
              <Card className={phase.bgColor}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-2xl font-bold ${phase.color}`}>{phase.phase}</span>
                    {index < timeline.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-muted-foreground absolute -right-6 top-8 hidden md:block" />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground mb-3">{phase.period}</p>
                  <div className="space-y-2">
                    {phase.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${phase.color === 'text-primary' ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
                        <p className="text-sm text-foreground">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Allocation Grid */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-4 text-center">Allocation of Current Raise (₹4.2 Cr)</h3>
        
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Tech + Product</div>
              <div className="text-2xl font-bold text-primary mb-2">₹1.16 Cr <span className="text-sm text-muted-foreground">(27.60%)</span></div>
              <div className="text-xs text-muted-foreground">Platform enhancement, AI tools, data infrastructure</div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Content + SEO</div>
              <div className="text-2xl font-bold text-primary mb-2">₹0.84 Cr <span className="text-sm text-muted-foreground">(19.88%)</span></div>
              <div className="text-xs text-muted-foreground">Financial education, SEO scaling</div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Infra + Tools</div>
              <div className="text-2xl font-bold text-primary mb-2">₹0.42 Cr <span className="text-sm text-muted-foreground">(9.88%)</span></div>
              <div className="text-xs text-muted-foreground">Infrastructure, tools, technology stack</div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Sales</div>
              <div className="text-2xl font-bold text-primary mb-2">₹0.41 Cr <span className="text-sm text-muted-foreground">(9.76%)</span></div>
              <div className="text-xs text-muted-foreground">Sales team and growth</div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Marketing</div>
              <div className="text-2xl font-bold text-primary mb-2">₹0.31 Cr <span className="text-sm text-muted-foreground">(7.33%)</span></div>
              <div className="text-xs text-muted-foreground">Organic + performance channels</div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Support + Office</div>
              <div className="text-2xl font-bold text-primary mb-2">₹0.20 Cr <span className="text-sm text-muted-foreground">(4.74%)</span></div>
              <div className="text-xs text-muted-foreground">Operations, office, support</div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Compliance</div>
              <div className="text-2xl font-bold text-primary mb-2">₹0.07 Cr <span className="text-sm text-muted-foreground">(1.71%)</span></div>
              <div className="text-xs text-muted-foreground">Risk, legal, regulatory</div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Buffer</div>
              <div className="text-2xl font-bold text-primary mb-2">₹0.80 Cr <span className="text-sm text-muted-foreground">(19.10%)</span></div>
              <div className="text-xs text-muted-foreground">Contingency and runway buffer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-5">
          <p className="text-center text-foreground">
            <span className="font-bold">Focus:</span> Build the engine for discovery-led growth, expand product stack, and establish foundation for institutional monetization
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
