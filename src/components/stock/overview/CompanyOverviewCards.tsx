import React from 'react';
import { Card } from '@/components/ui/card';

const CompanyOverviewCards: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-4">
          <h3 className="font-semibold">Overview Card {i}</h3>
          <p className="text-sm text-muted-foreground">Phase 2 implementation...</p>
        </Card>
      ))}
    </div>
  );
};

export default CompanyOverviewCards;