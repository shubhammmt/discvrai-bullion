import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface Props {
  text: string;
}

const InfoTooltip: React.FC<Props> = ({ text }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-3 w-3 text-slate-400 hover:text-slate-600 cursor-help inline-block ml-1" />
      </TooltipTrigger>
      <TooltipContent className="max-w-[250px] text-xs">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default InfoTooltip;
