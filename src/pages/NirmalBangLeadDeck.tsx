import React, { useState } from 'react';
import { ProposalLayout } from '@/components/proposal/nirmalbang/ProposalLayout';
import { LeadTitleSlide } from '@/components/proposal/nirmalbang-leads/LeadTitleSlide';
import { LeadProblemSlide } from '@/components/proposal/nirmalbang-leads/LeadProblemSlide';
import { LeadSolutionSlide } from '@/components/proposal/nirmalbang-leads/LeadSolutionSlide';
import { AICapabilitiesSlide } from '@/components/proposal/nirmalbang-leads/AICapabilitiesSlide';
import { SalesHeadVisibilitySlide } from '@/components/proposal/nirmalbang-leads/SalesHeadVisibilitySlide';
import { LeadCommercialsSlide } from '@/components/proposal/nirmalbang-leads/LeadCommercialsSlide';

const NirmalBangLeadDeck: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const slides = [
    <LeadTitleSlide key="title" />,
    <LeadProblemSlide key="problem" />,
    <LeadSolutionSlide key="solution" />,
    <AICapabilitiesSlide key="capabilities" />,
    <SalesHeadVisibilitySlide key="visibility" />,
    <LeadCommercialsSlide key="commercials" />,
  ];

  return (
    <ProposalLayout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      {slides}
    </ProposalLayout>
  );
};

export default NirmalBangLeadDeck;
