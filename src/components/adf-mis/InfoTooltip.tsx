import React from 'react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InfoTooltipProps {
  text: string;
  className?: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ text, className }) => (
  <TooltipProvider delayDuration={200}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className={`w-3 h-3 text-gray-400 hover:text-gray-600 cursor-help inline-block ml-1 ${className || ''}`} />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs leading-relaxed">
        {text}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// Tooltip texts from spec
export const TOOLTIPS = {
  ytdPct: 'Year-to-date achievement: (Dispatch + Open Orders) ÷ FY26 Projected × 100. Shows how much of the annual target is achieved so far.',
  balance: 'Amount or quantity still to achieve to meet FY26 target. Balance = FY26 Projected − (Dispatch + Open Orders).',
  growthVsFy25: 'Year-over-year change: (Current Dispatch+Open − FY25 Actual) ÷ FY25 Actual × 100. Positive = growth; negative = decline.',
  fullYearGap: 'Primary deficit to act on. Full Year Balance = FY26 Projected − (Dispatch + Open Orders) for the entire year. Q4 may look achieved but full year can still have gap.',
  q4Gap: 'Q4 Projected − (Q4 Dispatch + Q4 Open Orders). Q4 achieved ≠ full year achieved — always check fullYearGap.',
  quarterTrajectory: 'Plan: Q1 20%, Q2 30%, Q3 30%, Q4 20% of annual target. Actual: what % of annual was achieved in each quarter.',
  salesmanVarianceStd: 'Standard deviation of YTD % across salesmen. Higher = more spread (some ahead, some behind).',
  salesmanVarianceMean: 'Mean = average YTD % across team. Min = lowest performer; Max = highest. Large gap = uneven performance.',
  concentration: '% of total balance held by top 3 or top 5 customers. High % = risk concentrated in few customers.',
  q4PipelineCoverage: 'Q4 Open Orders ÷ Q4 Balance. ≥1 = pipeline sufficient to close Q4 gap; <1 = need more orders.',
  atRisk: 'Customer/category/SKU below 70% of target. Red zone — needs immediate focus.',
  statusBadges: 'Green: YTD ≥90% (on track). Yellow: 70–89% (at risk). Red: <70% (behind).',
  q4ProductionHeadsUp: 'Indicative list of SKUs/categories with highest Q4 balance — what may come for delivery in remaining Q4 days.',
  zeroQ4Dispatch: 'No dispatch and no open orders in Q4. Verify with sales — customer may have shifted or order pending.',
  fc: 'Foreign Currency (USD/GBP). All amounts in this dashboard are in FC.',
  qty: 'Quantity in cases (not individual units).',
  categoryMixShift: 'YoY growth % per category. Shows which categories are growing or declining vs last year.',
  growthDistribution: 'Mean, min, max of Growth vs FY25 across customers. Shows spread of performance.',
  dispatchPlusOpen: 'Dispatched (invoiced) + Open Orders (confirmed but not yet shipped). Represents committed/achieved revenue.',
  region: 'Geographic grouping (e.g. NORTH AMERICA, WESTERN EUROPE). From zone master + customer overrides.',
  country: 'Customer country (e.g. UNITED STATES, GREAT BRITAIN). From zone master + customer overrides.',
  productFamily: 'Product grouping (e.g. Jumbo Punjabi Samosa, Mango Chutney). From PF Master + item overrides.',
} as const;
