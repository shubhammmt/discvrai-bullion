
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

interface CompanyOverviewCardProps {
  stockData: any;
}

const CompanyOverviewCard = ({ stockData }: CompanyOverviewCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Company Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed">
          {stockData.description}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Sector</p>
            <p className="font-medium">{stockData.sector}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Exchange</p>
            <p className="font-medium">{stockData.exchange}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverviewCard;
