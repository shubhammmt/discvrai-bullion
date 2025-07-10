import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProjectionSection: React.FC = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold">Projection</h2>
        <Badge variant="secondary">Pro</Badge>
      </div>
      <p className="text-muted-foreground">EPS & Revenue projections (premium feature) will be implemented in Phase 5...</p>
    </Card>
  );
};

export default ProjectionSection;