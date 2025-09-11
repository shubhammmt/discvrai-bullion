import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/mutualfunds/HeroSection';
import NewsCarousel from '@/components/mutualfunds/NewsCarousel';
import ThreePillars from '@/components/mutualfunds/ThreePillars';
import PortfolioAnalysisCarousel from '@/components/mutualfunds/PortfolioAnalysisCarousel';
import CommunityShowcase from '@/components/mutualfunds/CommunityShowcase';
import TrustSignals from '@/components/mutualfunds/TrustSignals';
import SecurityCompliance from '@/components/mutualfunds/SecurityCompliance';
import FundThemes from '@/components/mutualfunds/FundThemes';
import HowItWorks from '@/components/mutualfunds/HowItWorks';
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

  const handleFeatureClick = (featureId: string) => {
    switch (featureId) {
      case 'ai-research':
        navigate('/mutual-fund-research');
        break;
      case 'community':
        navigate('/community');
        break;
      case 'discovery':
        navigate('/mutual-funds-portfolio');
        break;
      default:
        navigate('/mutual-fund-research');
    }
  };

  const handleJoinCommunity = () => {
    navigate('/community');
  };

  const handleViewAnalysisDetails = (analysisId: string) => {
    navigate(`/portfolio/analysis?section=${analysisId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* 1. Hero Section - First Viewport */}
      <HeroSection 
        onStartInvesting={handleStartInvesting}
        onTakeAssessment={handleTakeAssessment}
      />

      {/* 2. News Carousel - Full Width */}
      <NewsCarousel />

      {/* 3. Three Pillars of Smart Investing */}
      <ThreePillars />

      {/* 4. Portfolio Analysis Carousel */}
      <PortfolioAnalysisCarousel onViewDetails={handleViewAnalysisDetails} />

      {/* 5. Security & Compliance - Trust Building */}
      <SecurityCompliance />

      {/* 6. Community Showcase */}
      <CommunityShowcase onJoinCommunity={handleJoinCommunity} />

      {/* 7. Trust Signals */}
      <TrustSignals />

      {/* 8. Fund Themes */}
      <FundThemes onExploreTheme={handleExploreTheme} />

      {/* 9. How It Works */}
      <HowItWorks />

      {/* SEO Elements */}
      <div className="sr-only">
        <h1>AI-Powered Mutual Funds Investment Platform - DiscvrAI</h1>
        <p>Discover the best mutual funds with AI-powered analysis and human expertise. Get personalized recommendations, track performance, and invest smarter with DiscvrAI's intelligent platform.</p>
      </div>
    </div>
  );
};

export default MutualFundsLanding;