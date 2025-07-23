import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import Index from './pages/Index';
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
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
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
          <Route path="/portfolio-analysis" element={<PortfolioAnalysis />} />
          <Route path="/portfolio-update" element={<PortfolioUpdate />} />
          <Route path="/organize" element={<Organize />} />
          <Route path="/market" element={<Market />} />
          <Route path="/stock-market" element={<StockMarketPage />} />
          <Route path="/stock/:symbol" element={<StockProductPage />} />
          <Route path="/stock-v2/:symbol" element={<StockProductPageV2 />} />
          <Route path="/stock-v3/:symbol" element={<StockPage />} />
          <Route path="/stock-info/:symbol" element={<StockInfoPage />} />
          <Route path="/news" element={<NewsFeed />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
