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

  const allocation = [
    { category: 'Product & Tech', percentage: 35, keyFocus: 'Platform enhancement, AI tools, data infra', color: 'bg-blue-500' },
    { category: 'Growth & Marketing', percentage: 30, keyFocus: 'Organic + performance channels', color: 'bg-green-500' },
    { category: 'Content & Community', percentage: 20, keyFocus: 'Financial education, SEO scaling', color: 'bg-purple-500' },
    { category: 'Operations & Compliance', percentage: 10, keyFocus: 'Infrastructure, risk, legal', color: 'bg-orange-500' },
    { category: 'Working Capital', percentage: 5, keyFocus: 'Contingency and runway buffer', color: 'bg-gray-500' }
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

      {/* Allocation Table */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-4 text-center">Allocation of Current Raise</h3>
        
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {allocation.map((item, index) => (
                <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="font-semibold text-foreground">{item.category}</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">{item.percentage}%</span>
                  </div>
                  <div className="ml-6">
                    <p className="text-sm text-muted-foreground">{item.keyFocus}</p>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2 mt-2 ml-6">
                    <div 
                      className={`${item.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
