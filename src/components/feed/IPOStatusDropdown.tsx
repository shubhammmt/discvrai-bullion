
import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface IPOStatusDropdownProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const IPOStatusDropdown = ({ selectedStatus, onStatusChange }: IPOStatusDropdownProps) => {
  const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'upcoming', label: 'Upcoming' }
  ];

  const handleStatusSelect = (status: string) => {
    onStatusChange(status);
    
    // Scroll to IPO section
    const ipoSection = document.querySelector('[data-section="ipos"]');
    if (ipoSection) {
      ipoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          IPO Status: {statusOptions.find(opt => opt.value === selectedStatus)?.label || 'All'}
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleStatusSelect(option.value)}
            className="cursor-pointer hover:bg-gray-100"
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default IPOStatusDropdown;
