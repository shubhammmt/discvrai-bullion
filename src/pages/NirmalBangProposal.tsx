import React, { useState } from 'react';
import { ProposalLayout } from '@/components/proposal/nirmalbang/ProposalLayout';
import { CoverPage } from '@/components/proposal/nirmalbang/CoverPage';
import { ExecutiveSummaryPage } from '@/components/proposal/nirmalbang/ExecutiveSummaryPage';
import { ChallengesPage } from '@/components/proposal/nirmalbang/ChallengesPage';
import { SolutionPage } from '@/components/proposal/nirmalbang/SolutionPage';
import { AIInterviewPage } from '@/components/proposal/nirmalbang/AIInterviewPage';
import { DeliveryPlanPage } from '@/components/proposal/nirmalbang/DeliveryPlanPage';
import { CommercialsPage } from '@/components/proposal/nirmalbang/CommercialsPage';
import { CostControlPage } from '@/components/proposal/nirmalbang/CostControlPage';
import { NextStepsPage } from '@/components/proposal/nirmalbang/NextStepsPage';

const NirmalBangProposal: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    <CoverPage key="cover" />,
    <ExecutiveSummaryPage key="summary" />,
    <ChallengesPage key="challenges" />,
    <SolutionPage key="solution" />,
    <AIInterviewPage key="interview" />,
    <DeliveryPlanPage key="delivery" />,
    <CommercialsPage key="commercials" />,
    <CostControlPage key="cost" />,
    <NextStepsPage key="next" />,
  ];

  return (
    <ProposalLayout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      {pages}
    </ProposalLayout>
  );
};

export default NirmalBangProposal;
