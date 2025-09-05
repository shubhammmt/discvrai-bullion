import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/mutualfunds/HeroSection';
import TrustSignals from '@/components/mutualfunds/TrustSignals';
import FundThemes from '@/components/mutualfunds/FundThemes';
import PersonalizationCTA from '@/components/mutualfunds/PersonalizationCTA';
import Header from '@/components/Header';

const MutualFundsLanding = () => {
  const navigate = useNavigate();

  const handleStartInvesting = () => {
    navigate('/mutual-fund-research');
  };

  const handleTakeAssessment = () => {
    navigate('/financial-profile');
  };

  const handleExploreTheme = (themeId: string) => {
    // Navigate to specific theme page or filter
    navigate(`/mutual-fund-research?theme=${themeId}`);
  };

  const handleStartAssessment = () => {
    navigate('/financial-profile');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection 
        onStartInvesting={handleStartInvesting}
        onTakeAssessment={handleTakeAssessment}
      />

      {/* Trust Signals */}
      <TrustSignals />

      {/* Fund Themes */}
      <FundThemes onExploreTheme={handleExploreTheme} />

      {/* Personalization CTA */}
      <PersonalizationCTA onStartAssessment={handleStartAssessment} />

      {/* SEO Elements */}
      <div className="sr-only">
        <h1>AI-Powered Mutual Funds Investment Platform - DiscvrAI</h1>
        <p>Discover the best mutual funds with AI-powered analysis and human expertise. Get personalized recommendations, track performance, and invest smarter with DiscvrAI's intelligent platform.</p>
      </div>
    </div>
  );
};

export default MutualFundsLanding;