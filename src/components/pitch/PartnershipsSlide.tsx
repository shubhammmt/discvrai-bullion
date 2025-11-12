import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Building2 } from 'lucide-react';

export const PartnershipsSlide: React.FC = () => {
  const partnerships = [
    {
      name: 'CMOTS',
      description: 'Data feed for Indian exchanges',
      category: 'Data Provider'
    },
    {
      name: 'FMP',
      description: 'US exchanges data',
      category: 'Data Provider'
    },
    {
      name: 'Smallcase',
      description: 'LAMF & Smallcases integration',
      category: 'Investment Products'
    },
    {
      name: 'Augmont',
      description: 'Gold/Silver buy/sell',
      category: 'Precious Metals'
    },
    {
      name: 'ETMoney',
      description: 'WIP',
      category: 'Financial Platform'
    },
    {
      name: 'mPokket',
      description: 'WIP',
      category: 'Loan Lender'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Handshake className="w-12 h-12 text-primary" />
          <h2 className="text-5xl font-bold">Strategic Partnerships</h2>
        </div>
        <p className="text-xl text-muted-foreground">
          Building the ecosystem for comprehensive financial services
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {partnerships.map((partner, index) => (
          <Card key={index} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-secondary rounded-md">
                  {partner.category}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">{partner.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-4">
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-primary">End-to-End Financial Ecosystem</p>
            <p className="text-muted-foreground">
              Strategic partnerships enabling seamless user experience across content, discovery, and transactions
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
