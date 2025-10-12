import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, TrendingUp } from 'lucide-react';

interface TractionFinancialsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    traction: {
      product: string[];
      metrics: string[];
    };
    financials: {
      projections: Array<{
        month: string;
        maus: string;
        revenue: string;
        profit: string;
      }>;
      highlights: string[];
    };
    unitEconomics: {
      india: { cac: string; arpu: string; ltv: string; ratio: string };
      us: { cac: string; arpu: string; ltv: string; ratio: string };
      blended: { cac: string; arpu: string; margin: string };
    };
  };
}

export const TractionFinancialsSlide: React.FC<TractionFinancialsSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
        <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traction */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Current Traction</h3>
          
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Product Status
              </h4>
              <ul className="space-y-2">
                {slide.traction.product.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-600 dark:text-blue-400">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Early Metrics
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {slide.traction.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-background/50 rounded-lg p-2 text-sm font-medium">
                    {metric}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Unit Economics */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Unit Economics</h4>
              <div className="space-y-3 text-xs">
                <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                  <p className="font-semibold mb-2">India</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div><span className="text-muted-foreground">CAC:</span> <span className="font-bold">{slide.unitEconomics.india.cac}</span></div>
                    <div><span className="text-muted-foreground">ARPU:</span> <span className="font-bold">{slide.unitEconomics.india.arpu}</span></div>
                    <div><span className="text-muted-foreground">LTV:</span> <span className="font-bold">{slide.unitEconomics.india.ltv}</span></div>
                    <div><span className="text-muted-foreground">Ratio:</span> <span className="font-bold text-green-600">{slide.unitEconomics.india.ratio}</span></div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                  <p className="font-semibold mb-2">US</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div><span className="text-muted-foreground">CAC:</span> <span className="font-bold">{slide.unitEconomics.us.cac}</span></div>
                    <div><span className="text-muted-foreground">ARPU:</span> <span className="font-bold">{slide.unitEconomics.us.arpu}</span></div>
                    <div><span className="text-muted-foreground">LTV:</span> <span className="font-bold">{slide.unitEconomics.us.ltv}</span></div>
                    <div><span className="text-muted-foreground">Ratio:</span> <span className="font-bold text-blue-600">{slide.unitEconomics.us.ratio}</span></div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
                  <p className="font-semibold mb-2">Blended (M18)</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div><span className="text-muted-foreground">CAC:</span> <span className="font-bold">{slide.unitEconomics.blended.cac}</span></div>
                    <div><span className="text-muted-foreground">ARPU:</span> <span className="font-bold">{slide.unitEconomics.blended.arpu}</span></div>
                    <div><span className="text-muted-foreground">Margin:</span> <span className="font-bold text-purple-600">{slide.unitEconomics.blended.margin}</span></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financials */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">18-Month Projections</h3>
          
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Month</th>
                      <th className="text-right py-2">MAUs</th>
                      <th className="text-right py-2">Revenue</th>
                      <th className="text-right py-2">Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slide.financials.projections.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-3 font-semibold">{row.month}</td>
                        <td className="text-right">{row.maus}</td>
                        <td className="text-right text-blue-600 dark:text-blue-400">{row.revenue}</td>
                        <td className={`text-right font-bold ${row.profit.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {row.profit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">📊</span>
                Key Highlights
              </h4>
              <div className="space-y-2">
                {slide.financials.highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-background/50 rounded-lg p-2">
                    <p className="text-sm font-medium">{highlight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Break-even Point</p>
                <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">Month 11</p>
                <p className="text-xs text-muted-foreground mt-2">Cash flow positive from M11 onwards</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
