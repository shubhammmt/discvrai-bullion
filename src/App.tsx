import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import Index from './pages/Index';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import FeedV2 from './pages/FeedV2';
import FeedV3 from './pages/FeedV3';
import Research from './pages/Research';
import StockResearch from './pages/StockResearch';
import StockProductPage from './pages/StockProductPage';
import StockProductPageV2 from './pages/StockProductPageV2';
import StockInfoPage from './pages/StockInfoPage';
import MutualFundResearch from './pages/MutualFundResearch';
import IPOResearch from './pages/IPOResearch';
import CreditResearch from './pages/CreditResearch';
import CreditCardResearch from './pages/CreditCardResearch';
import InsuranceResearch from './pages/InsuranceResearch';
import SmallcaseResearch from './pages/SmallcaseResearch';
import MutualFundDetails from './pages/MutualFundDetails';
import MutualFundFeed from './pages/MutualFundFeed';
import Portfolio from './pages/Portfolio';
import PortfolioHome from './pages/PortfolioHome';
import PortfolioGoals from './pages/PortfolioGoals';
import MutualFundsLanding from './pages/MutualFundsLanding';
import MutualFundsPortfolio from './pages/MutualFundsPortfolio';
import PortfolioAnalysis from './pages/PortfolioAnalysis';
import PortfolioUpdate from './pages/PortfolioUpdate';
import Organize from './pages/Organize';
import Market from './pages/Market';
import StockMarketPage from './pages/StockMarketPage';
import NewsFeed from './pages/NewsFeed';
import FinancialProfile from './pages/FinancialProfile';
import Onboarding from './pages/Onboarding';
import HealthAssessment from './pages/HealthAssessment';
import HealthResults from './pages/HealthResults';
import HealthDashboard from './pages/HealthDashboard';
import FinancialScore from './pages/FinancialScore';
import FinancialCopilot from './pages/FinancialCopilot';
import AIConversationDemo from './pages/AIConversationDemo';
import AIStrategy from './pages/AIStrategy';
import USMarketHome from './pages/USMarketHome';
import USMarketBot from './pages/USMarketBot';
import IndiaMarketCopilot from './pages/IndiaMarketCopilot';
import StocksHome from './pages/StocksHome';
import PitchPresentation from './pages/PitchPresentation';
import PitchV1 from './pages/PitchV1';
import PitchV2 from './pages/PitchV2';
import PitchV3 from './pages/PitchV3';
import PitchV4 from './pages/PitchV4';
import StockPage from './pages/StockPage';
import LogoConcepts from './pages/LogoConcepts';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DataDeletionPolicy from './pages/DataDeletionPolicy';
import NotFound from './pages/NotFound';
import AdfCeoSalesDashboard from './pages/AdfCeoSalesDashboard';
import NewsHub from './pages/NewsHub';
import EngineerShowcase from './pages/EngineerShowcase';
import SRCCPitch from './pages/SRCCPitch';
import StartupCoveragePitch from './pages/StartupCoveragePitch';
import ContestSponsorshipPitch from './pages/ContestSponsorshipPitch';
import NewsFirstPitch from './pages/NewsFirstPitch';
import FamilyFriendsPitch from './pages/FamilyFriendsPitch';
import FamilyFriendsOnePager from './pages/FamilyFriendsOnePager';
import PreSeedOnePager from './pages/PreSeedOnePager';
import InvestorOnePager from './pages/InvestorOnePager';
import AIFintechOnePager from './pages/AIFintechOnePager';
import B2BPreIPOPitch from './pages/B2BPreIPOPitch';
import AMCPitch from './pages/AMCPitch';
import AMCEnterprisePitch from './pages/AMCEnterprisePitch';
import EnterprisePitch from './pages/EnterprisePitch';
import ExpoPitch from './pages/ExpoPitch';
import PartnerDistribution from './pages/PartnerDistribution';
import { B2BCapabilities } from './pages/B2BCapabilities';
import InvestorDeck from './pages/InvestorDeck';
import InvestorDeckFull from './pages/InvestorDeckFull';
import Chatbot from './pages/Chatbot';
import CryptoHub from './pages/CryptoHub';
import CryptoAsset from './pages/CryptoAsset';
import MetalsHub from './pages/MetalsHub';
import GoldPrices from './pages/GoldPrices';
import GoldPricesCity from './pages/GoldPricesCity';
import SilverPrices from './pages/SilverPrices';
import PlatinumPrices from './pages/PlatinumPrices';
import WeatherHub from './pages/WeatherHub';
import AIStockScreener from './pages/AIStockScreener';
import EmbedScreener from './pages/EmbedScreener';
import EmbedDocs from './pages/EmbedDocs';
import AIScreenerLanding from './pages/AIScreenerLanding';
import AIQueryLibrary from './pages/AIQueryLibrary';
import AIQueryResult from './pages/AIQueryResult';
import ChatbotDialog, { ChatbotTrigger } from './components/ChatbotDialog';
import GlobalFooter from './components/GlobalFooter';
import { NewsHubPage } from './pages/NewsHubPage';
import { NewsArticlePage } from './pages/NewsArticlePage';
import { NewsAuthorPage } from './pages/NewsAuthorPage';
import { PollsHub } from './pages/PollsHub';
import { QuizzesHub } from './pages/QuizzesHub';
import { Leaderboard } from './pages/Leaderboard';
import ProductFeaturePreview from './pages/ProductFeaturePreview';
import DistributionCaseStudy from './pages/DistributionCaseStudy';
import BullionInvestment from './pages/BullionInvestment';
import DiscvrHomepage from './pages/DiscvrHomepage';
import BullionProfile from './pages/BullionProfile';
import BullionPortfolio from './pages/BullionPortfolio';
import BullionNews from './pages/BullionNews';
import BullionContests from './pages/BullionContests';
 import BullionContestDetail from './pages/BullionContestDetail';
import BullionGoals from './pages/BullionGoals';
import BullionGoalNew from './pages/BullionGoalNew';
import BullionPremium from './pages/BullionPremium';
import BullionArticlePage from './pages/BullionArticlePage';
import BullionLearn from './pages/BullionLearn';
import BullionTax from './pages/BullionTax';
import BullionTrends from './pages/BullionTrends';
import BullionCalculators from './pages/BullionCalculators';
import BullionLoans from './pages/BullionLoans';
import BullionNotifications from './pages/BullionNotifications';
import BullionNotificationsPRD from './pages/BullionNotificationsPRD';
import BullionCalculatorsPRD from './pages/BullionCalculatorsPRD';
import BullionLaunchOffers from './pages/BullionLaunchOffers';
import BullionDesignSystem from './pages/BullionDesignSystem';
import KYCFailurePage from './pages/bullion/KYCFailurePage';
import OrderFailurePage from './pages/bullion/OrderFailurePage';
import NirmalBangProposal from './pages/NirmalBangProposal';
import NirmalBangLeadDeck from './pages/NirmalBangLeadDeck';
import JindalProposal from './pages/JindalProposal';
import MasterTrustProposal from './pages/MasterTrustProposal';
import YatharthPitch from './pages/YatharthPitch';
import XaltProposal from './pages/XaltProposal';
import ManufacturingPitch from './pages/ManufacturingPitch';
import ManufacturingPitchNew from './pages/ManufacturingPitchNew';
import AptechProposal from './pages/AptechProposal';
import AptechPostSales from './pages/AptechPostSales';
import REAProposal from './pages/REAProposal';
import AptechCounsellor from './pages/AptechCounsellor';
import AptechNurtureDemo from './pages/AptechNurtureDemo';
import AptechPostSalesDemo from './pages/AptechPostSalesDemo';
import DeepDiveProposal from './pages/DeepDiveProposal';
import ParisRegionPitch from './pages/ParisRegionPitch';
import CMSDemo from './pages/CMSDemo';
import CMSDynamicDemo from './pages/CMSDynamicDemo';
import AptechExecutionPlan from './pages/AptechExecutionPlan';
import AdfMisDashboard from './pages/AdfMisDashboard';
import EnterpriseBrochure from './pages/EnterpriseBrochure';
import DeepIndustriesProposal from './pages/DeepIndustriesProposal';
import NbfcProposal from './pages/NbfcProposal';
import AdfStrategicDashboard from './pages/AdfStrategicDashboard';
import NbfcNbaDemo from './pages/NbfcNbaDemo';
import NbfcCollectionsDemo from './pages/NbfcCollectionsDemo';
import NbfcKycDemo from './pages/NbfcKycDemo';
import NbfcAltCreditDemo from './pages/NbfcAltCreditDemo';
import SIPManagement from './pages/SIPManagement';
import MFAnalyticsDashboard from './pages/MFAnalyticsDashboard';
import AIAICProposal from './pages/AIAICProposal';
import TredsFinopsDemo from './pages/TredsFinopsDemo';
import RajaRailwaysDeck from './pages/RajaRailwaysDeck';
import RajaRailwaysDemo from './pages/RajaRailwaysDemo';
import AmitM1xchangeDeck from './pages/AmitM1xchangeDeck';
import EmamiRealtyDeck from './pages/EmamiRealtyDeck';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

const AppContent = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const location = useLocation();
  
  // Hide footer and chatbot on pitch deck pages, one-pagers, investor deck, and proposals
  const isPitchPage = location.pathname.includes('-pitch') || 
                      location.pathname.includes('-1pager') || 
                      location.pathname.includes('/proposal/') ||
                      location.pathname === '/investor-deck' ||
                      location.pathname === '/investor-deck-full' ||
                      location.pathname === '/partner-distribution' ||
                      location.pathname === '/b2b-capabilities' ||
                       location.pathname === '/aptech-counsellor' ||
                       location.pathname === '/aptech-nurture-demo' ||
                       location.pathname === '/aptech-postsales-demo' ||
                       location.pathname === '/pitch/paris-region' ||
                       location.pathname === '/demo/cms' ||
                       location.pathname === '/demo/cms-dynamic' ||
                       location.pathname === '/proposal/aptech-execution' ||
                       location.pathname === '/dashboard/adf-mis' ||
                       location.pathname === '/brochure/enterprise' ||
                       location.pathname === '/proposal/deep-industries' ||
                       location.pathname === '/proposal/nbfc' ||
                       location.pathname === '/dashboard/adf-strategic' ||
                       location.pathname === '/demo/nbfc-nba' ||
                       location.pathname === '/demo/nbfc-collections' ||
                       location.pathname === '/demo/nbfc-kyc' ||
                       location.pathname === '/demo/nbfc-alt-credit' ||
                       location.pathname === '/dashboard/adf-ceo-sales' ||
                       location.pathname.startsWith('/embed/') ||
                       location.pathname === '/demo/treds-finops' ||
                       location.pathname === '/pitch/raja-railways' ||
                       location.pathname === '/demo/raja-railways' ||
                       location.pathname === '/pitch/amit-m1xchange';
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed-v2" element={<FeedV2 />} />
          <Route path="/feed-v3" element={<FeedV3 />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/stock/:symbol" element={<StockResearch />} />
          <Route path="/research/mutual-fund/:symbol" element={<MutualFundResearch />} />
          <Route path="/research/ipo/:symbol" element={<IPOResearch />} />
          <Route path="/research/credit/:type" element={<CreditResearch />} />
          <Route path="/research/credit-card/:cardId" element={<CreditCardResearch />} />
          <Route path="/research/insurance/:type" element={<InsuranceResearch />} />
          <Route path="/research/smallcase/:caseId" element={<SmallcaseResearch />} />
          <Route path="/mutual-fund/:symbol" element={<MutualFundDetails />} />
          <Route path="/mutual-fund-feed" element={<MutualFundFeed />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio-home" element={<PortfolioHome />} />
          <Route path="/portfolio/goals" element={<PortfolioGoals />} />
          <Route path="/mutual-funds" element={<MutualFundsLanding />} />
          <Route path="/mutual-funds-portfolio" element={<MutualFundsPortfolio />} />
          <Route path="/portfolio-analysis" element={<PortfolioAnalysis />} />
          <Route path="/portfolio-update" element={<PortfolioUpdate />} />
          <Route path="/organize" element={<Organize />} />
          <Route path="/market" element={<Market />} />
          <Route path="/stock-market" element={<StockMarketPage />} />
          <Route path="/stock/:symbol" element={<StockProductPage />} />
          <Route path="/stock-v2/:symbol" element={<StockProductPageV2 />} />
          <Route path="/stock-v3/:symbol" element={<StockPage />} />
          <Route path="/stock-info/:symbol" element={<StockInfoPage />} />
          <Route path="/news" element={<NewsHubPage />} />
          <Route path="/news/article/:slug" element={<NewsArticlePage />} />
          <Route path="/news/author/:authorId" element={<NewsAuthorPage />} />
          <Route path="/polls" element={<PollsHub />} />
          <Route path="/quizzes" element={<QuizzesHub />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/news-old" element={<NewsFeed />} />
          <Route path="/financial-profile" element={<FinancialProfile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/health-assessment" element={<HealthAssessment />} />
          <Route path="/health-results" element={<HealthResults />} />
          <Route path="/health-dashboard" element={<HealthDashboard />} />
          <Route path="/financial-score" element={<FinancialScore />} />
          <Route path="/financial-copilot" element={<FinancialCopilot />} />
          <Route path="/ai-conversation" element={<AIConversationDemo />} />
          <Route path="/ai-strategy" element={<AIStrategy />} />
          <Route path="/us-market" element={<USMarketHome />} />
          <Route path="/us-market-bot" element={<USMarketBot />} />
          <Route path="/india-market-copilot" element={<IndiaMarketCopilot />} />
          <Route path="/stocks" element={<StocksHome />} />
          <Route path="/pitch" element={<PitchPresentation />} />
          <Route path="/pitch-v1" element={<PitchV1 />} />
          <Route path="/pitch-v2" element={<PitchV2 />} />
          <Route path="/pitch-v3" element={<PitchV3 />} />
          <Route path="/pitch-v4" element={<PitchV4 />} />
          <Route path="/logo-concepts" element={<LogoConcepts />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/data-deletion-policy" element={<DataDeletionPolicy />} />
          <Route path="/news-hub" element={<NewsHub />} />
          <Route path="/engineer-showcase" element={<EngineerShowcase />} />
          <Route path="/srcc-pitch" element={<SRCCPitch />} />
          <Route path="/startup-coverage-pitch" element={<StartupCoveragePitch />} />
          <Route path="/contest-sponsorship-pitch" element={<ContestSponsorshipPitch />} />
          <Route path="/news-first-pitch" element={<NewsFirstPitch />} />
          <Route path="/family-friends-pitch" element={<FamilyFriendsPitch />} />
          <Route path="/family-friends-1pager" element={<FamilyFriendsOnePager />} />
          <Route path="/preseed-1pager" element={<PreSeedOnePager />} />
          <Route path="/investor-1pager" element={<InvestorOnePager />} />
          <Route path="/ai-fintech-1pager" element={<AIFintechOnePager />} />
          <Route path="/b2b-preipo-pitch" element={<B2BPreIPOPitch />} />
          <Route path="/amc-pitch" element={<AMCPitch />} />
          <Route path="/amc-enterprise-pitch" element={<AMCEnterprisePitch />} />
          <Route path="/enterprise-pitch" element={<EnterprisePitch />} />
          <Route path="/expo-pitch" element={<ExpoPitch />} />
          <Route path="/partner-distribution" element={<PartnerDistribution />} />
          <Route path="/b2b-capabilities" element={<B2BCapabilities />} />
          <Route path="/investor-deck" element={<InvestorDeck />} />
          <Route path="/investor-deck-full" element={<InvestorDeckFull />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/crypto" element={<CryptoHub />} />
          <Route path="/crypto/:symbol" element={<CryptoAsset />} />
        <Route path="/metals" element={<MetalsHub />} />
        <Route path="/discvr" element={<DiscvrHomepage />} />
        <Route path="/bullion" element={<BullionInvestment />} />
        <Route path="/bullion/trade" element={<BullionInvestment />} />
        <Route path="/bullion/profile" element={<BullionProfile />} />
        <Route path="/bullion/portfolio" element={<BullionPortfolio />} />
        <Route path="/bullion/news" element={<BullionNews />} />
        <Route path="/bullion/contests" element={<BullionContests />} />
         <Route path="/bullion/contests/:id" element={<BullionContestDetail />} />
        <Route path="/bullion/goals" element={<BullionGoals />} />
        <Route path="/bullion/goals/new" element={<BullionGoalNew />} />
        <Route path="/bullion/loans" element={<BullionLoans />} />
        <Route path="/bullion/premium" element={<BullionPremium />} />
        <Route path="/bullion/premium/article/:slug" element={<BullionArticlePage />} />
        <Route path="/bullion/learn" element={<BullionPremium />} />
        <Route path="/bullion/tax" element={<BullionTax />} />
        <Route path="/bullion/kyc-failure" element={<KYCFailurePage />} />
        <Route path="/bullion/order-failure" element={<OrderFailurePage />} />
        <Route path="/bullion/trends" element={<BullionTrends />} />
        <Route path="/bullion/calculators" element={<BullionCalculators />} />
        <Route path="/bullion/calculators/prd" element={<BullionCalculatorsPRD />} />
        <Route path="/bullion/notifications" element={<BullionNotifications />} />
        <Route path="/bullion/notifications/prd" element={<BullionNotificationsPRD />} />
        <Route path="/bullion/launch-offers" element={<BullionLaunchOffers />} />
        <Route path="/bullion/design-system" element={<BullionDesignSystem />} />
        <Route path="/metals/gold" element={<GoldPrices />} />
        <Route path="/metals/gold/:city" element={<GoldPricesCity />} />
        <Route path="/metals/silver" element={<SilverPrices />} />
        <Route path="/metals/platinum" element={<PlatinumPrices />} />
          <Route path="/weather" element={<WeatherHub />} />
          <Route path="/ai" element={<AIScreenerLanding />} />
          <Route path="/ai/chat" element={<AIStockScreener />} />
          <Route path="/ai/queries" element={<AIQueryLibrary />} />
          <Route path="/ai/queries/:queryId" element={<AIQueryResult />} />
          <Route path="/product-features-preview" element={<ProductFeaturePreview />} />
          <Route path="/distribution-case-study" element={<DistributionCaseStudy />} />
          <Route path="/proposal/nirmalbang" element={<NirmalBangProposal />} />
          <Route path="/proposal/nirmalbang-leads" element={<NirmalBangLeadDeck />} />
          <Route path="/proposal/jindal" element={<JindalProposal />} />
          <Route path="/proposal/mastertrust" element={<MasterTrustProposal />} />
          <Route path="/proposal/yatharth" element={<YatharthPitch />} />
          <Route path="/proposal/xalt" element={<XaltProposal />} />
          <Route path="/manufacturing-pitch" element={<ManufacturingPitch />} />
          <Route path="/manufacturing-pitch-new" element={<ManufacturingPitchNew />} />
          <Route path="/proposal/aptech" element={<AptechProposal />} />
          <Route path="/proposal/aptech-postsales" element={<AptechPostSales />} />
          <Route path="/proposal/rea" element={<REAProposal />} />
          <Route path="/proposal/deep-dive" element={<DeepDiveProposal />} />
          <Route path="/aptech-counsellor" element={<AptechCounsellor />} />
          <Route path="/aptech-nurture-demo" element={<AptechNurtureDemo />} />
          <Route path="/aptech-postsales-demo" element={<AptechPostSalesDemo />} />
          <Route path="/pitch/paris-region" element={<ParisRegionPitch />} />
          <Route path="/demo/cms" element={<CMSDemo />} />
          <Route path="/demo/cms-dynamic" element={<CMSDynamicDemo />} />
          <Route path="/proposal/aptech-execution" element={<AptechExecutionPlan />} />
          <Route path="/dashboard/adf-mis" element={<AdfMisDashboard />} />
           <Route path="/brochure/enterprise" element={<EnterpriseBrochure />} />
           <Route path="/proposal/deep-industries" element={<DeepIndustriesProposal />} />
           <Route path="/proposal/nbfc" element={<NbfcProposal />} />
           <Route path="/dashboard/adf-strategic" element={<AdfStrategicDashboard />} />
           <Route path="/demo/nbfc-nba" element={<NbfcNbaDemo />} />
           <Route path="/demo/nbfc-collections" element={<NbfcCollectionsDemo />} />
           <Route path="/demo/nbfc-kyc" element={<NbfcKycDemo />} />
            <Route path="/demo/nbfc-alt-credit" element={<NbfcAltCreditDemo />} />
            <Route path="/dashboard/adf-ceo-sales" element={<AdfCeoSalesDashboard />} />
             <Route path="/sip-management" element={<SIPManagement />} />
             <Route path="/dashboard/mf-analytics" element={<MFAnalyticsDashboard />} />
             <Route path="/proposal/aiaic" element={<AIAICProposal />} />
           <Route path="/embed/screener" element={<EmbedScreener />} />
            <Route path="/embed/docs" element={<EmbedDocs />} />
            <Route path="/demo/treds-finops" element={<TredsFinopsDemo />} />
            <Route path="/pitch/raja-railways" element={<RajaRailwaysDeck />} />
            <Route path="/demo/raja-railways" element={<RajaRailwaysDemo />} />
            <Route path="/pitch/amit-m1xchange" element={<AmitM1xchangeDeck />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Global Chatbot Dialog - Hidden on pitch pages */}
        {!isPitchPage && (
          <>
            <ChatbotDialog 
              isOpen={isChatbotOpen} 
              onClose={() => setIsChatbotOpen(false)} 
            />
            <ChatbotTrigger onClick={() => setIsChatbotOpen(true)} />
          </>
        )}
        
        {/* Global Footer - Hidden on pitch pages */}
        {!isPitchPage && <GlobalFooter />}
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppContent />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
