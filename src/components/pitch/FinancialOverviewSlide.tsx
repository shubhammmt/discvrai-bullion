import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, DollarSign } from 'lucide-react';

interface FinancialOverviewSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
  };
}

export const FinancialOverviewSlide: React.FC<FinancialOverviewSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  const investmentsToDate = {
    total: '₹1.0 crore',
    breakdown: [
      { label: 'Direct business investment', amount: '₹50 lakh', detail: 'Product, tech, operations, marketing' },
      { label: 'Self-funded founder salary', amount: '₹50 lakh', detail: 'No salary drawn from company' }
    ],
    externalFunding: 'None (bootstrapped to date)'
  };

  const projections = [
    { period: 'Dec25-Mar26', revenue: '₹7,439', grossMargin: '93.76%', ebitda: '-₹40.19 L', ebitdaMargin: '-54033%', yoyGrowth: '—', highlight: false },
    { period: 'FY27', revenue: '₹0.12 Cr', grossMargin: '95.80%', ebitda: '-₹2.27 Cr', ebitdaMargin: '-1839%', yoyGrowth: '16517%', highlight: false },
    { period: 'FY28', revenue: '₹1.89 Cr', grossMargin: '96.12%', ebitda: '-₹1.64 Cr', ebitdaMargin: '-87%', yoyGrowth: '1430%', highlight: false },
    { period: 'FY29', revenue: '₹14.14 Cr', grossMargin: '95.88%', ebitda: '₹7.95 Cr', ebitdaMargin: '56.17%', yoyGrowth: '648%', highlight: true, label: 'BREAK-EVEN' },
    { period: 'FY30', revenue: '₹44.77 Cr', grossMargin: '96.19%', ebitda: '₹35.62 Cr', ebitdaMargin: '79.55%', yoyGrowth: '217%', highlight: true, label: 'PROFITABILITY' },
    { period: 'FY31', revenue: '₹86.70 Cr', grossMargin: '95.59%', ebitda: '₹73.67 Cr', ebitdaMargin: '84.97%', yoyGrowth: '94%', highlight: true }
  ];

  const revenueMix = [
    { category: 'LAMF', percentage: '27.60%', color: 'bg-blue-500' },
    { category: 'Digital Gold', percentage: '32.41%', color: 'bg-yellow-500' },
    { category: 'Digital Silver', percentage: '13.15%', color: 'bg-gray-400' },
    { category: 'Personal Loans', percentage: '26.84%', color: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-4xl font-bold text-foreground mb-2">{slide.title}</h2>
        <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
      </div>

      {/* Investments to Date */}
      <Card className="bg-secondary/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Investments to Date:</h3>
            <p className="text-lg font-bold text-primary">{investmentsToDate.total}</p>
            <span className="text-sm text-muted-foreground">(Founder-funded, bootstrapped to date)</span>
          </div>
        </CardContent>
      </Card>

      {/* 5-Year Projections */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-4 text-center">5-Year Financial Projections</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-semibold text-foreground">Period</th>
                <th className="text-right py-2 px-2 font-semibold text-foreground">Revenue</th>
                <th className="text-right py-2 px-2 font-semibold text-foreground">Gross Margin</th>
                <th className="text-right py-2 px-2 font-semibold text-foreground">EBITDA</th>
                <th className="text-right py-2 px-2 font-semibold text-foreground">EBITDA %</th>
                <th className="text-right py-2 px-2 font-semibold text-foreground">YoY Growth</th>
              </tr>
            </thead>
            <tbody>
              {projections.map((row, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-border ${row.highlight ? 'bg-primary/10' : ''}`}
                >
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{row.period}</span>
                      {row.label && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                          {row.label}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-right py-2 px-2 font-semibold text-foreground">{row.revenue}</td>
                  <td className="text-right py-2 px-2 text-muted-foreground">{row.grossMargin}</td>
                  <td className={`text-right py-2 px-2 font-semibold ${row.highlight ? 'text-primary' : 'text-foreground'}`}>
                    {row.ebitda}
                  </td>
                  <td className="text-right py-2 px-2 text-muted-foreground">{row.ebitdaMargin}</td>
                  <td className="text-right py-2 px-2 text-muted-foreground">{row.yoyGrowth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Highlights & Revenue Mix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Key Highlights */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Key Highlights
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <p className="text-foreground"><span className="font-semibold">Break-Even:</span> FY29 (₹7.95 Cr EBITDA, 56.17% margin)</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <p className="text-foreground"><span className="font-semibold">Profitability:</span> FY30 (₹35.62 Cr EBITDA, 79.55% margin)</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <p className="text-foreground"><span className="font-semibold">Peak Efficiency:</span> FY31 (₹73.67 Cr EBITDA, 84.97% margin)</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <p className="text-foreground"><span className="font-semibold">Gross Margins:</span> Consistently above 95%</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <p className="text-foreground"><span className="font-semibold">Cost Structure:</span> Lean team + high tech leverage</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Mix */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-foreground mb-3">Revenue Mix (FY31)</h3>
            <div className="space-y-3">
              {revenueMix.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">{item.category}</span>
                    <span className="text-sm font-bold text-foreground">{item.percentage}</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: item.percentage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
