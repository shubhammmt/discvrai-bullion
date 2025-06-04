
import React from 'react';
import { Share2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResearchCTA = () => {
  const handleQuickShare = () => {
    const element = document.getElementById('research-sharing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleQuickShare}
        className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 text-xs px-2 py-1"
      >
        <Share2 size={12} className="mr-1" />
        Share
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleQuickShare}
        className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 text-xs px-2 py-1"
      >
        <FileText size={12} className="mr-1" />
        Notes
      </Button>
    </div>
  );
};

export default ResearchCTA;
