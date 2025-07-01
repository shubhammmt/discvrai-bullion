
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface IPOFilterPanelProps {
  onFilterChange: (status: string) => void;
  selectedStatus?: string;
}

const IPOFilterPanel = ({ onFilterChange, selectedStatus = 'upcoming' }: IPOFilterPanelProps) => {
  const [status, setStatus] = useState(selectedStatus);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    onFilterChange(newStatus);
  };

  const ipoStatuses = [
    { value: 'upcoming', label: 'Upcoming IPOs' },
    { value: 'live', label: 'Live IPOs' },
    { value: 'listed', label: 'Recently Listed' },
    { value: 'all', label: 'All IPOs' }
  ];

  return (
    <Card className="mb-4 bg-white/90 backdrop-blur-md border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">IPO Status:</span>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-48 bg-white border-gray-300">
              <SelectValue placeholder="Select IPO status" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
              {ipoStatuses.map((statusOption) => (
                <SelectItem key={statusOption.value} value={statusOption.value}>
                  {statusOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default IPOFilterPanel;
