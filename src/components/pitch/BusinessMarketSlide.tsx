import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface BusinessMarketSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    revenueStreams: Array<{
      name: string;
      percentage: number;
      amount: string;
      description: string;
    }>;
    market: {
      tam: string;
      sam: string;
      target: string;
      revenue: string;
    };
  };
}

export const BusinessMarketSlide: React.FC<BusinessMarketSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
        <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Streams */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold mb-4">Revenue Streams (M18)</h3>
          {slide.revenueStreams.map((stream, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-lg">{stream.name}</h4>
                  <span className="text-2xl font-bold text-primary">{stream.percentage}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 mb-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all" 
                    style={{ width: `${stream.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{stream.description}</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{stream.amount}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Monthly Revenue (M18)</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">₹26.5M</p>
              <p className="text-xl font-semibold text-green-600 dark:text-green-400 mt-1">₹318M ARR</p>
            </CardContent>
          </Card>
        </div>

        {/* Market Opportunity */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold mb-4">Market Opportunity</h3>
          
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Addressable Market (TAM)</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{slide.market.tam}</p>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-1">Serviceable Market (SAM)</p>
                  <p className="text-xl font-bold">{slide.market.sam}</p>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-1">Year 3 Target</p>
                  <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{slide.market.target}</p>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-1">Revenue Potential</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{slide.market.revenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">🎯</span>
                Key Advantages
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400">✓</span>
                  <span>Multiple revenue streams = lower risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400">✓</span>
                  <span>High-margin B2B complements B2C scale</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400">✓</span>
                  <span>AI enables 10x cost efficiency vs competitors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400">✓</span>
                  <span>Network effects from community & content</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
